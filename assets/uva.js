/* La uva se desprende del racimo.
   1) Latido: cuando nadie toca nada, una uva por vez se ilumina para mostrar que se pueden tocar.
   2) Transición: al tocar una uva que tiene página, crece hasta cubrir la pantalla y la página del
      producto arranca adentro de esa uva (producto.js la achica hasta su lugar). */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero-contornos');
  const grains = hero ? [...hero.querySelectorAll('.grano')] : [];
  if (!grains.length) return;

  let quieto = performance.now(), i = 0, enVista = true;
  const tocar = () => { quieto = performance.now(); };
  hero.addEventListener('pointermove', tocar, { passive: true });
  hero.addEventListener('focusin', tocar);
  new IntersectionObserver(es => { enVista = es[0].isIntersecting; }, { threshold: .2 }).observe(hero);
  if (!reduce) setInterval(() => {
    if (!enVista || document.hidden || performance.now() - quieto < 5000) return;
    const g = grains[i++ % grains.length];
    g.querySelector('.grape-signal')?.animate(
      [{ opacity: .9, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.5)' }],
      { duration: 1100, easing: 'cubic-bezier(.23,1,.32,1)' });
    g.querySelector('.grape-body')?.animate(
      [{ fill: 'rgba(0,240,104,0)' }, { fill: 'rgba(0,240,104,.16)' }, { fill: 'rgba(0,240,104,0)' }],
      { duration: 1100, easing: 'ease-in-out' });
  }, 1400);

  grains.filter(g => g.dataset.pagina).forEach(g => g.addEventListener('click', e => {
    const href = g.getAttribute('href');
    if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    const r = g.querySelector('.grape-body').getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const cubre = 2.5 * Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    const c = document.createElement('div');
    Object.assign(c.style, { position: 'fixed', zIndex: 90, left: 0, top: 0, width: r.width + 'px', height: r.width + 'px',
      borderRadius: '50%', background: 'radial-gradient(circle closest-side,#121212 0%,#121212 84%,rgba(0,240,104,.35) 95%,#00f068 99%,rgba(0,240,104,0) 100%)', pointerEvents: 'none', transform: `translate(${cx - r.width / 2}px,${cy - r.width / 2}px)` });
    document.body.appendChild(c);
    grains.forEach(o => { if (o !== g) o.animate([{ opacity: 1 }, { opacity: .15 }], { duration: 500, fill: 'forwards' }); });
    try { sessionStorage.setItem('racimo-uva', '1'); } catch (err) {}
    c.animate([
      { transform: `translate(${cx - r.width / 2}px,${cy - r.width / 2}px) scale(1)` },
      { transform: `translate(${cx - r.width / 2}px,${cy - r.width / 2}px) scale(${cubre / r.width})` }
    ], { duration: 760, easing: 'cubic-bezier(.55,0,.85,.35)', fill: 'forwards' }).onfinish = () => { location.href = href; };
  }));
  // al volver con «atrás», la página puede venir de la caché con la cortina puesta
  addEventListener('pageshow', e => { if (e.persisted) location.reload(); });
})();
