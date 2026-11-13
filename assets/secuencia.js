/* Catálogo de la home: el racimo y la lista de productos, sólo con hover.
   Pedido de Racimo y de Aldana (11/11): nada de scroll ni selecciones que
   queden «pegadas». Sin el mouse encima, el panel muestra un estado neutro.
   Al pasar por un renglón o por su uva, se encienden los dos y el panel
   muestra el producto; al salir de la sección, vuelve al estado neutro.
   Un clic en el renglón o en la uva entra a la página del producto.
   Regla que se respeta aquí: NADA arranca invisible desde el CSS a secas. Si
   el script no corre, la sección queda como una lista legible. */
(() => {
  'use strict';
  const seq = document.getElementById('seq');
  if (!seq) return;
  const grid = seq.querySelector('.seq-grid') || seq;
  const items = [...seq.querySelectorAll('.seq-li')];
  const panels = [...seq.querySelectorAll('.seq-panel')];
  const grapes = [...seq.querySelectorAll('.sgrape')];
  const n = panels.length;
  if (n < 2 || items.length !== n) return;

  let activo = false, i = -1, salida = 0;

  function pintar(k) {
    clearTimeout(salida);
    if (k === i) return;
    i = k;
    items.forEach((el, j) => el.classList.toggle('is-on', j === k));
    panels.forEach((el, j) => el.classList.toggle('is-on', j === k));
    const claves = k >= 0 ? (panels[k].dataset.uvas || '').split(' ').filter(Boolean) : [];
    grapes.forEach(g => g.classList.toggle('is-on', claves.includes(g.dataset.k)));
    if (claves.length > 1) seq.dataset.final = '1'; else seq.removeAttribute('data-final');
    if (k >= 0) seq.dataset.elegido = '1'; else seq.removeAttribute('data-elegido');
  }
  const neutro = () => pintar(-1);

  // cada uva lleva al paso cuyo panel la tiene sola (no al del racimo completo)
  const pasoDeUva = {};
  panels.forEach((p, j) => {
    const c = (p.dataset.uvas || '').split(' ').filter(Boolean);
    if (c.length === 1) pasoDeUva[c[0]] = j;
  });
  const hrefDePaso = panels.map(p => p.querySelector('.seq-ver')?.getAttribute('href') || null);

  items.forEach((el, j) => {
    el.addEventListener('pointerenter', () => activo && pintar(j));
    el.addEventListener('focusin', () => activo && pintar(j));
    if (!el.querySelector('a')) el.addEventListener('click', () => activo && pintar(j));
  });
  grapes.forEach(g => {
    const j = pasoDeUva[g.dataset.k];
    if (j == null) return;
    g.addEventListener('pointerenter', () => activo && pintar(j));
    g.addEventListener('click', () => {
      if (!activo) return;
      if (i !== j) { pintar(j); return; }          // táctil: el primer toque enciende
      if (hrefDePaso[j]) location.href = hrefDePaso[j];
    });
  });
  // al salir de la sección (lista, racimo y panel), vuelve al estado neutro
  grid.addEventListener('pointerleave', () => { if (activo) { clearTimeout(salida); salida = setTimeout(neutro, 220); } });
  grid.addEventListener('pointerenter', () => clearTimeout(salida));

  function encender() {
    if (activo) return;
    seq.dataset.seqOn = '1';
    activo = true;
    i = 99;
    neutro();
  }
  function apagar() {
    if (!activo) return;
    seq.removeAttribute('data-seq-on');
    seq.removeAttribute('data-final');
    seq.removeAttribute('data-elegido');
    activo = false;
    i = -1;
    [...items, ...panels, ...grapes].forEach(el => el.classList.remove('is-on'));
  }
  function sincronizar() { innerWidth > 900 ? encender() : apagar(); }
  addEventListener('resize', sincronizar);
  sincronizar();
})();
