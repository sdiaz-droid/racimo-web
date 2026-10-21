/* Secuencia del catálogo: el racimo queda fijo y los productos se encienden de
   a uno con el scroll. Copiado de clickup.com/brain/agents.
   Regla que se respeta acá: NADA arranca invisible desde el CSS a secas. El
   apagado y el pin sólo existen si este script puso data-seq-on; si el script
   no corre, la sección queda como una lista legible con los ocho productos. */
(() => {
  'use strict';
  const seq = document.getElementById('seq');
  if (!seq) return;
  const stage = seq.querySelector('.seq-stage');
  const items = [...seq.querySelectorAll('.seq-li')];
  const panels = [...seq.querySelectorAll('.seq-panel')];
  const grapes = [...seq.querySelectorAll('.sgrape')];
  const n = panels.length;
  if (!stage || n < 2 || items.length !== n) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let activo = false, i = -1;

  // El apagado es GRADUAL segun la distancia al paso activo, no encendido/apagado.
  // Es lo que hace que se lea como una secuencia y no como "aparecen cosas":
  // en ClickUp los items que todavia no tocan estan atenuados, no ausentes.
  const HALO = [1, .5, .3, .18];

  function pintar(k) {
    if (k === i) return;
    i = k;
    items.forEach((el, j) => {
      el.classList.toggle('is-on', j === k);
      el.style.opacity = String(HALO[Math.min(Math.abs(j - k), HALO.length - 1)]);
    });
    panels.forEach((el, j) => el.classList.toggle('is-on', j === k));
    const claves = (panels[k].dataset.uvas || '').split(' ').filter(Boolean);
    grapes.forEach(g => g.classList.toggle('is-on', claves.includes(g.dataset.k)));
    if (claves.length > 1) seq.dataset.final = '1'; else seq.removeAttribute('data-final');
  }

  let recorrido = 0, arranque = 0;
  function recalcular() {
    recorrido = seq.offsetHeight - stage.offsetHeight;
    // se cachea el offset del documento para NO leer layout en cada scroll:
    // getBoundingClientRect() en el listener fuerza un reflow por evento y es
    // lo que hacia que el scroll se sintiera trabado.
    let y = 0;
    for (let el = seq; el; el = el.offsetParent) y += el.offsetTop;
    arranque = y;
  }

  function medir() {
    if (!activo || recorrido <= 0) return;
    const avance = (scrollY - arranque) / recorrido;
    // El ultimo paso se alcanza al 86% del recorrido y se queda ahi hasta el
    // final. Antes se alcanzaba justo cuando el sticky se suelta, asi que el
    // paso final se iba para arriba solo: se sentia como que "scrollea solo".
    const progreso = Math.max(0, Math.min(1, avance / 0.86));
    pintar(Math.round(progreso * (n - 1)));
  }

  // Sin requestAnimationFrame a proposito: si el rAF no corre —pestana en
  // segundo plano, headless, throttling— el coalescer se queda con el pedido
  // puesto y el handler no vuelve a medir NUNCA. medir() es una lectura y un
  // toggle de clases solo cuando cambia el paso, asi que va directo.
  function encender() {
    if (activo) return;
    seq.style.setProperty('--n', String(n));
    seq.dataset.seqOn = '1';
    activo = true;
    i = -1;
    recalcular();
    pintar(0);
  }

  function apagar() {
    if (!activo) return;
    seq.removeAttribute('data-seq-on');
    seq.removeAttribute('data-final');
    activo = false;
    i = -1;
    [...items, ...panels, ...grapes].forEach(el => el.classList.remove('is-on'));
    items.forEach(el => { el.style.opacity = ''; });
  }

  // El pin pide alto y ancho: en mobile, en pantallas bajas y con movimiento
  // reducido se queda la versión estática, que dice lo mismo.
  function sincronizar() {
    (innerWidth > 900 && innerHeight > 520 && !reduce.matches) ? encender() : apagar();
    recalcular();
    medir();
  }

  addEventListener('scroll', medir, {passive: true});
  addEventListener('resize', sincronizar);
  document.fonts && document.fonts.ready.then(() => { recalcular(); medir(); });
  reduce.addEventListener('change', sincronizar);
  sincronizar();
})();
