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
    const corte = new AbortController();
    const reloj = setTimeout(() => corte.abort(), 20000);
    try {
      const r = await fetch('https://formsubmit.co/ajax/resellers@racimo.tech', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(datos), signal: corte.signal
      });
      if (!r.ok) throw new Error(r.status);
      const j = await r.json().catch(() => ({}));
      if (String(j.success) !== 'true') throw new Error(j.message || 'sin éxito');
      // Listo: el formulario conserva su alto (nada salta) y el aviso aparece en el mismo lugar
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
    } catch (err) {
      form.dataset.estado = 'error';
      if (btn) { btn.innerHTML = textoBtn; btn.disabled = false; btn.removeAttribute('aria-busy'); }
      const er = form.querySelector('.error');
      if (er && er.getBoundingClientRect().bottom > innerHeight) er.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally { clearTimeout(reloj); }
  });
})();
