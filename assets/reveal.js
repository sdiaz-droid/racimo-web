/* Aparición por scroll y conteo de las cifras del margen.
   Nada decorativo: cada bloque entra una sola vez, y las cifras cuentan porque
   el salto de 40 a 70 y el margen de 30 son el argumento de esa sección. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const targets = [...document.querySelectorAll('[data-reveal],[data-reveal-group]')];
  // la bandera habilita el estado oculto: sin script, todo queda visible
  if (!reduce.matches && 'IntersectionObserver' in window) {
    document.documentElement.dataset.revealOn = '';
  }

  function contar(scope) {
    scope.querySelectorAll('[data-count]').forEach(node => {
      const end = Number(node.dataset.count);
      const prefijo = node.dataset.prefijo || '';
      if (reduce.matches) { node.textContent = prefijo + end; return; }
      const t0 = performance.now(), dur = 900;
      (function paso(now) {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = prefijo + Math.round(end * eased);
        if (p < 1) requestAnimationFrame(paso);
      })(t0);
    });
  }

  if (reduce.matches) {
    targets.forEach(el => el.classList.add('is-in'));
    contar(document);
    return;
  }
  const io = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      contar(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
  targets.forEach(el => io.observe(el));
})();
