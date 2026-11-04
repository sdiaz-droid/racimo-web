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
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    if (fd.get('_honey')) return;
    const datos = {};
    for (const [k, v] of fd.entries()) { if (k === '_honey') continue; datos[k] = datos[k] ? datos[k] + ', ' + v : v; }
    form.dataset.estado = 'enviando';
    try {
      const r = await fetch('https://formsubmit.co/ajax/resellers@racimo.tech', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(datos)
      });
      if (!r.ok) throw new Error(r.status);
      form.dataset.estado = 'ok';
    } catch (err) { form.dataset.estado = 'error'; }
  });
})();
