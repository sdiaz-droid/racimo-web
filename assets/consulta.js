/* Formulario de consulta de precio → resellers@racimo.tech (vía FormSubmit).
   El primer envío dispara un mail de activación a esa casilla; después llegan solos.
   Cualquier link con data-consulta="Producto" marca ese producto antes de bajar al formulario. */
(() => {
  'use strict';
  const form = document.getElementById('form');
  if (!form) return;
  const marcar = nombre => form.querySelectorAll('input[name="Productos"]').forEach(i => { if (i.value === nombre) i.checked = true; });
  document.addEventListener('click', e => { const a = e.target.closest('[data-consulta]'); if (a) marcar(a.dataset.consulta); });
  const q = new URLSearchParams(location.search).get('producto');
  if (q) marcar(q);
  // ── ayudantes ──
  const guardar = d => { try { sessionStorage.setItem('racimo-consulta', String(d['Nombre'] || '')); } catch (e) {} };
  function listo(datos) {
    // el formulario conserva su alto (nada salta) y el aviso aparece en el mismo lugar
    form.style.minHeight = form.offsetHeight + 'px';
    const g = form.querySelector('.gracias');
    if (g && !g.querySelector('.ok-ic')) g.insertAdjacentHTML('afterbegin', '<span class="ok-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 12.5 4 4 8-9"/></svg></span>');
    const nombre = String(datos['Nombre'] || datos['Nombre y apellido'] || '').trim().split(' ')[0];
    const h = g && g.querySelector('h3');
    if (h && nombre) h.textContent = `¡Listo, ${nombre}! Recibimos tu consulta.`;
    form.dataset.estado = 'ok';
    if (g) {
      g.tabIndex = -1;
      const r2 = g.getBoundingClientRect();
      if (r2.top < 80 || r2.bottom > innerHeight) g.scrollIntoView({ behavior: 'smooth', block: 'center' });
      g.focus({ preventScroll: true });
    }
  }
  function clasico() {
    const pon = (n, v) => { let i = form.querySelector(`input[type=hidden][name="${n}"]`); if (!i) { i = document.createElement('input'); i.type = 'hidden'; i.name = n; form.appendChild(i); } i.value = v; };
    pon('_captcha', 'false');
    pon('_next', location.origin + location.pathname + '?enviado=1#form');
    HTMLFormElement.prototype.submit.call(form);
  }
  // vuelta del envío clásico: «¡Listo!» a la vista
  if (new URLSearchParams(location.search).get('enviado') === '1') {
    let n = ''; try { n = sessionStorage.getItem('racimo-consulta') || ''; } catch (e) {}
    listo({ Nombre: n });
    history.replaceState(null, '', location.pathname + '#form');
  }
  form.addEventListener('submit', async e => {
    e.preventDefault();
    form.querySelectorAll('.falta').forEach(c => c.classList.remove('falta'));
    if (!form.checkValidity()) {
      const malos = [...form.querySelectorAll(':invalid')].filter(i => i.name);
      malos.forEach(i => i.closest('.campo')?.classList.add('falta'));
      form.dataset.estado = 'incompleto';
      malos[0]?.focus();
      return;
    }
    const fd = new FormData(form);
    if (fd.get('_honey')) return;
    const datos = {};
    for (const [k, v] of fd.entries()) { if (k === '_honey') continue; datos[k] = datos[k] ? datos[k] + ', ' + v : v; }
    // Enviando: el botón lo dice (FormSubmit tarda unos segundos y antes parecía que no pasaba nada)
    const btn = form.querySelector('button[type=submit]');
    const textoBtn = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '<span class="girando" aria-hidden="true"></span>Enviando…'; btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
    form.dataset.estado = 'enviando';
    // Si FormSubmit tarda, se avisa (nadie tiene que pensar que se colgó) y, si no contesta en 12 s, la consulta
    // sale por el envío clásico de FormSubmit (el mismo action del form) y la persona vuelve acá con el «¡Listo!».
    const nota = form.querySelector('.enviar small');
    const textoNota = nota ? nota.textContent : '';
    const lento = setTimeout(() => { if (nota) nota.textContent = 'Estamos enviando tu consulta, puede tardar unos segundos…'; }, 4000);
    guardar(datos);
    const corte = new AbortController();
    const reloj = setTimeout(() => corte.abort(), 12000);
    try {
      const r = await fetch('https://formsubmit.co/ajax/resellers@racimo.tech', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(datos), signal: corte.signal
      });
      if (!r.ok) throw new Error(r.status);
      const j = await r.json().catch(() => ({}));
      if (String(j.success) !== 'true') throw new Error(j.message || 'sin éxito');
      listo(datos);
    } catch (err) {
      // plan B: envío clásico (sin depender de la respuesta del AJAX). Si eso tampoco se puede, el error visible.
      try { return clasico(); } catch (e2) {}
      form.dataset.estado = 'error';
      if (btn) { btn.innerHTML = textoBtn; btn.disabled = false; btn.removeAttribute('aria-busy'); }
      const er = form.querySelector('.error');
      if (er && er.getBoundingClientRect().bottom > innerHeight) er.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally { clearTimeout(reloj); clearTimeout(lento); if (nota && form.dataset.estado !== 'enviando') nota.textContent = textoNota; }
  });
})();
