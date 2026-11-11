/* Catálogo de la home: el racimo y la lista de productos, sin pin de scroll.
   Pedido de Racimo (reunión 11/11): recorrer los productos con el scroll
   confundía. Ahora se elige con el puntero: al pasar por un producto de la
   lista o por su uva, se enciende el panel con la bajada y el precio; con un
   clic se entra a la página del producto.
   Regla que se respeta aquí: NADA arranca invisible desde el CSS a secas. El
   apagado sólo existe si este script puso data-seq-on; si el script no corre,
   la sección queda como una lista legible con todos los productos. */
(() => {
  'use strict';
  const seq = document.getElementById('seq');
  if (!seq) return;
  const items = [...seq.querySelectorAll('.seq-li')];
  const panels = [...seq.querySelectorAll('.seq-panel')];
  const grapes = [...seq.querySelectorAll('.sgrape')];
  const n = panels.length;
  if (n < 2 || items.length !== n) return;

  let activo = false, i = -1;

  function pintar(k) {
    if (k === i || k < 0 || k >= n) return;
    i = k;
    items.forEach((el, j) => el.classList.toggle('is-on', j === k));
    panels.forEach((el, j) => el.classList.toggle('is-on', j === k));
    const claves = (panels[k].dataset.uvas || '').split(' ').filter(Boolean);
    grapes.forEach(g => g.classList.toggle('is-on', claves.includes(g.dataset.k)));
    if (claves.length > 1) seq.dataset.final = '1'; else seq.removeAttribute('data-final');
  }

  // Cada uva lleva al paso cuyo panel la tiene sola (no al del racimo completo).
  const pasoDeUva = {};
  panels.forEach((p, j) => {
    const c = (p.dataset.uvas || '').split(' ').filter(Boolean);
    if (c.length === 1) pasoDeUva[c[0]] = j;
  });
  const hrefDePaso = panels.map(p => (p.querySelector('.seq-ver') || {}).getAttribute?.('href') || null);

  items.forEach((el, j) => {
    el.addEventListener('pointerenter', () => activo && pintar(j));
    el.addEventListener('focusin', () => activo && pintar(j));
    // «El racimo completo» no tiene página: el clic sólo lo enciende
    if (!el.querySelector('a')) el.addEventListener('click', () => activo && pintar(j));
  });
  grapes.forEach(g => {
    const j = pasoDeUva[g.dataset.k];
    if (j == null) return;
    g.addEventListener('pointerenter', () => activo && pintar(j));
    g.addEventListener('click', () => {
      if (!activo) return;
      // táctil: el primer toque enciende, el segundo entra
      if (i !== j) { pintar(j); return; }
      if (hrefDePaso[j]) location.href = hrefDePaso[j];
    });
  });

  function encender() {
    if (activo) return;
    seq.dataset.seqOn = '1';
    activo = true;
    i = -1;
    pintar(0);
  }

  function apagar() {
    if (!activo) return;
    seq.removeAttribute('data-seq-on');
    seq.removeAttribute('data-final');
    activo = false;
    i = -1;
    [...items, ...panels, ...grapes].forEach(el => el.classList.remove('is-on'));
  }

  // En pantallas angostas el racimo no entra al lado de la lista: queda la
  // versión estática, que dice lo mismo.
  function sincronizar() { innerWidth > 900 ? encender() : apagar(); }
  addEventListener('resize', sincronizar);
  sincronizar();
})();
