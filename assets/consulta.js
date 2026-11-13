/* Formulario de consulta de precio → resellers@racimo.tech (vía FormSubmit).
   Regla de UX (Aldana, 13/11): al tocar «Enviar» SIEMPRE pasa algo visible, justo debajo del botón:
   falta un dato (cuál y por qué) · enviando · enviado · no enviado (con el motivo y qué hacer).
   Cualquier link con data-consulta="Producto" marca ese producto antes de bajar al formulario. */
(() => {
  'use strict';
  const form = document.getElementById('form');
  if (!form) return;
  const marcar = nombre => form.querySelectorAll('input[name="Productos"]').forEach(i => { if (i.value === nombre) i.checked = true; });
  document.addEventListener('click', e => { const a = e.target.closest('[data-consulta]'); if (a) marcar(a.dataset.consulta); });
  const q = new URLSearchParams(location.search).get('producto');
  if (q) marcar(q);

  const btn = form.querySelector('button[type=submit]');
  const textoBtn = btn ? btn.innerHTML : '';
  const enviar = form.querySelector('.enviar');
  // línea de estado única, debajo del botón (los avisos viejos .faltan / .error quedan ocultos)
  const linea = document.createElement('p');
  linea.className = 'estado-envio'; linea.setAttribute('role', 'status'); linea.setAttribute('aria-live', 'polite');
  (enviar || form).insertAdjacentElement(enviar ? 'afterend' : 'beforeend', linea);
  form.querySelectorAll('.faltan, .error').forEach(p => p.remove());

  const decir = (tipo, html) => { linea.dataset.tipo = tipo; linea.innerHTML = html; };
  const callar = () => { linea.dataset.tipo = ''; linea.innerHTML = ''; };
  const boton = ocupado => {
    if (!btn) return;
    if (ocupado) { btn.innerHTML = '<span class="girando" aria-hidden="true"></span>Enviando…'; btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
    else { btn.innerHTML = textoBtn; btn.disabled = false; btn.removeAttribute('aria-busy'); }
  };

  // ── validación con mensaje por campo ──
  const nombreCampo = el => {
    const l = el.closest('.campo')?.querySelector('label');
    return l ? l.childNodes[0].textContent.trim() : (el.name || 'un dato');
  };
  const motivo = el => {
    const v = el.validity;
    if (el.tagName === 'SELECT' && v.valueMissing) return 'Elige una opción.';
    if (v.valueMissing) return 'Completa este dato.';
    if (v.typeMismatch && el.type === 'email') return 'Revisa el email, por ejemplo: nombre@empresa.com';
    return el.validationMessage || 'Revisa este dato.';
  };
  const limpiarCampo = c => { c.classList.remove('falta'); c.querySelector('.msg-campo')?.remove(); };
  form.addEventListener('input', e => { const c = e.target.closest('.campo'); if (c && c.classList.contains('falta') && e.target.checkValidity()) limpiarCampo(c); });
  form.addEventListener('change', e => { const c = e.target.closest('.campo'); if (c && c.classList.contains('falta') && e.target.checkValidity()) limpiarCampo(c); });

  // ── éxito (AJAX o vuelta del envío clásico) ──
  const guardar = d => { try { sessionStorage.setItem('racimo-consulta', String(d['Nombre'] || '')); } catch (e) {} };
  function listo(datos) {
    form.style.minHeight = form.offsetHeight + 'px';
    const g = form.querySelector('.gracias');
    if (g && !g.querySelector('.ok-ic')) g.insertAdjacentHTML('afterbegin', '<span class="ok-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 12.5 4 4 8-9"/></svg></span>');
    const nombre = String(datos['Nombre'] || '').trim().split(' ')[0];
    const h = g && g.querySelector('h3');
    if (h && nombre) h.textContent = `¡Listo, ${nombre}! Recibimos tu consulta.`;
    callar();
    form.dataset.estado = 'ok';
    if (g) {
      g.tabIndex = -1;
      const r = g.getBoundingClientRect();
      if (r.top < 80 || r.bottom > innerHeight) g.scrollIntoView({ behavior: 'smooth', block: 'center' });
      g.focus({ preventScroll: true });
    }
  }
  // plan B: envío clásico de FormSubmit (el action del form); vuelve acá con ?enviado=1
  function clasico() {
    const pon = (n, v) => { let i = form.querySelector(`input[type=hidden][name="${n}"]`); if (!i) { i = document.createElement('input'); i.type = 'hidden'; i.name = n; form.appendChild(i); } i.value = v; };
    pon('_captcha', 'false');
    pon('_next', location.origin + location.pathname + '?enviado=1#form');
    decir('enviando', 'El servidor de formularios está lento: lo enviamos por otra vía, ya vuelves a esta página…');
    HTMLFormElement.prototype.submit.call(form);
  }
  if (new URLSearchParams(location.search).get('enviado') === '1') {
    let n = ''; try { n = sessionStorage.getItem('racimo-consulta') || ''; } catch (e) {}
    listo({ Nombre: n });
    history.replaceState(null, '', location.pathname + '#form');
  }

  // al volver con «Atrás» Chrome puede restaurar la página a mitad de un envío: se reinicia
  addEventListener('pageshow', e => { if (e.persisted && form.dataset.estado === 'enviando') { form.dataset.estado = ''; boton(false); callar(); } });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.dataset.estado === 'enviando') { decir('enviando', 'Ya estamos enviando tu consulta, espera unos segundos…'); return; }
    form.querySelectorAll('.campo.falta').forEach(limpiarCampo);

    // 1 · falta algo: cada campo dice qué le falta y la línea de estado resume cuáles
    const malos = [...form.querySelectorAll('input, select, textarea')].filter(el => el.name && el.type !== 'hidden' && !el.checkValidity());
    if (malos.length) {
      malos.forEach(el => {
        const c = el.closest('.campo'); if (!c) return;
        c.classList.add('falta');
        c.insertAdjacentHTML('beforeend', `<small class="msg-campo">${motivo(el)}</small>`);
      });
      const nombres = malos.map(nombreCampo);
      const lista = nombres.length === 1 ? nombres[0] : nombres.slice(0, -1).join(', ') + ' y ' + nombres[nombres.length - 1];
      form.dataset.estado = 'incompleto';
      decir('falta', `<b>No se envió todavía.</b> ${malos.length === 1 ? 'Falta un dato' : `Faltan ${malos.length} datos`}: ${lista}. Están marcados en rojo.`);
      malos[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      malos[0].focus({ preventScroll: true });
      return;
    }

    const fd = new FormData(form);
    // sin campo trampa: el autocompletado de Chrome lo llenaba y el envío se cortaba en silencio (13/11)
    const datos = {};
    for (const [k, v] of fd.entries()) { if (k === '_honey' || k === '_next' || k === '_captcha') continue; datos[k] = datos[k] ? datos[k] + ', ' + v : v; }

    // 2 · enviando
    boton(true);
    form.dataset.estado = 'enviando';
    decir('enviando', 'Enviando tu consulta…');
    const lento = setTimeout(() => decir('enviando', 'Enviando tu consulta… puede tardar unos segundos más.'), 4000);
    guardar(datos);
    const corte = new AbortController();
    const reloj = setTimeout(() => corte.abort(), 12000);
    try {
      const r = await fetch('https://formsubmit.co/ajax/resellers@racimo.tech', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(datos), signal: corte.signal
      });
      if (!r.ok) throw Object.assign(new Error('http'), { razon: `el servidor de formularios respondió con un error (${r.status})` });
      const j = await r.json().catch(() => ({}));
      if (String(j.success) !== 'true') throw Object.assign(new Error('fs'), { razon: j.message ? `el servidor de formularios dijo: «${j.message}»` : 'el servidor de formularios no confirmó el envío' });
      // 3 · enviado
      listo(datos);
    } catch (err) {
      // sin conexión: no tiene sentido el plan B
      if (!navigator.onLine) {
        form.dataset.estado = 'error'; boton(false);
        decir('error', '<b>No se envió.</b> No hay conexión a internet. Revisa tu conexión y vuelve a tocar «Enviar consulta».');
        return;
      }
      // 4 · el AJAX falló o tardó: plan B (envío clásico); si ni eso se puede, el motivo y qué hacer
      try { return clasico(); } catch (e2) {}
      const razon = err.name === 'AbortError' ? 'el servidor de formularios no respondió a tiempo' : (err.razon || 'no pudimos conectar con el servidor de formularios');
      form.dataset.estado = 'error'; boton(false);
      decir('error', `<b>No se envió:</b> ${razon}. Vuelve a intentarlo en un momento o escríbenos a <a href="mailto:resellers@racimo.tech">resellers@racimo.tech</a>.`);
    } finally { clearTimeout(reloj); clearTimeout(lento); }
  });
})();
