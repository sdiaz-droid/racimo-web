(() => {
  'use strict';
  const hero = document.querySelector('.hero-contornos');
  const stage = document.getElementById('stage');
  const grains = [...stage.querySelectorAll('.grano')];
  const chips = [...hero.querySelectorAll('.chip')];
  const status = document.getElementById('selectionStatus');
  const name = document.getElementById('capN');
  const price = document.getElementById('capP');
  const catalog = {
    channel: ['Channel Manager',39], motor: ['Motor de Reservas',40],
    web: ['Sitio Web para Hoteles',35], ads: ['Google Ads',30],
    crm: ['CRM',60], pms: ['PMS',125], pos: ['POS',13],
    marketing: ['Marketing Digital',null], agentes: ['Agentes de IA',null],
    guestapp: ['GuestApp',null], consultoria: ['Consultorías',null]
  };
  const products = new Set(grains.map(grain => grain.dataset.k));
  const byKey = new Map(grains.map(grain => [grain.dataset.k, grain]));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const easeOut = getComputedStyle(hero).getPropertyValue('--ease-out').trim();
  const signalsInFlight = new Map();
  const own = new Set();
  let consulting = false;
  let pinned = null;

  function showProduct(key) {
    if (key && own.has(key)) {
      name.textContent = 'Eso ya lo vendés vos.';
      price.replaceChildren();
      return;
    }
    if (!catalog[key]) {
      name.textContent = 'Tocá una uva para ver su precio.';
      price.replaceChildren();
      return;
    }
    name.textContent = catalog[key][0];
    if (catalog[key][1] === null) { price.textContent = 'Precio a confirmar'; return; }
    const unit = document.createElement('small');
    unit.textContent = '/ mes por hotel';
    price.replaceChildren('Desde USD ' + catalog[key][1], unit);
  }

  // Same finite feedback as the original site: only the thin ring expands.
  // Replace an in-flight signal on repeated presses; never scale the fruit.
  function ping(key, pointerInitiated) {
    signalsInFlight.get(key)?.cancel();
    signalsInFlight.delete(key);
    if (reducedMotion.matches || !pointerInitiated) return;
    const ring = byKey.get(key).querySelector('.grape-signal');
    const animation = ring.animate([
      {opacity: .85, transform: 'scale(1)'},
      {opacity: 0, transform: 'scale(1.55)'}
    ], {duration: 620, easing: easeOut});
    signalsInFlight.set(key, animation);
    animation.onfinish = () => signalsInFlight.delete(key);
  }

  function paintSelection() {
    grains.forEach(grain => {
      const selected = String(own.has(grain.dataset.k));
      grain.dataset.own = selected;
      grain.setAttribute('aria-pressed', selected);
    });
    chips.forEach(chip => {
      chip.setAttribute('aria-pressed', String(chip.dataset.off ? own.has(chip.dataset.off) : consulting));
    });
    const remaining = products.size - own.size;
    status.textContent = own.size
      ? (remaining === 0 ? 'Ya vendés todos los productos.' : remaining + (remaining === 1 ? ' producto disponible.' : ' productos disponibles.'))
      : '';
  }

  function toggleProduct(key, pointerInitiated) {
    if (!products.has(key)) return;
    hero.dataset.input = pointerInitiated ? 'pointer' : 'keyboard';
    own.has(key) ? own.delete(key) : own.add(key);
    paintSelection();
    pinned = own.has(key) ? null : key;   // si pasó a ser tuyo, no queda fijado
    showProduct(pinned);
    ping(key, pointerInitiated);
  }

  chips.forEach(chip => chip.addEventListener('click', event => {
    if (chip.dataset.off) toggleProduct(chip.dataset.off, event.detail > 0);
    else {
      consulting = !consulting;
      paintSelection();
      if (consulting) { name.textContent = 'La consultoría es tuya. Nosotros no la vendemos.'; price.replaceChildren(); }
      else showProduct(pinned);
    }
  }));
  grains.forEach(grain => {
    grain.setAttribute('role', 'button');
    grain.addEventListener('click', event => {
      event.preventDefault();
      toggleProduct(grain.dataset.k, event.detail > 0);
    });
    grain.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch' && matchMedia('(hover: hover) and (pointer: fine)').matches) showProduct(grain.dataset.k);
    });
    grain.addEventListener('focus', () => showProduct(grain.dataset.k));
    grain.addEventListener('keydown', event => {
      if (event.key === ' ') {
        event.preventDefault();
        if (!event.repeat) toggleProduct(grain.dataset.k);
      }
    });
  });
  stage.addEventListener('pointerleave', () => showProduct(pinned));
  stage.addEventListener('focusout', event => {
    if (!stage.contains(event.relatedTarget)) showProduct(pinned);
  });
  const preselected = new URLSearchParams(location.search).get('vendes');
  if (preselected) preselected.split(',').forEach(value => {
    const key = value.trim();
    if (products.has(key)) own.add(key);
  });
  paintSelection();

  // The published hero's wave: a 5.4 s cycle, peak at 4%, gone at 14%,
  // delayed by distance / 340 around the bunch. Opacity overlays preserve
  // the static violet grid and avoid animating its geometry or stroke color.
  const grid = document.getElementById('brandGrid');
  const gridSquare = document.getElementById('gridSquare');
  const gridCircle = document.getElementById('gridCircle');
  const signals = document.getElementById('gridSignals');
  const motionButton = document.getElementById('motionToggle');
  let userPaused = false;
  let inView = true;
  let gridSignature = '';

  function syncMotion() {
    if (reducedMotion.matches || document.hidden) {
      signalsInFlight.forEach(animation => animation.cancel());
      signalsInFlight.clear();
    }
    hero.dataset.motion = !userPaused && inView && !document.hidden && !reducedMotion.matches ? 'running' : 'paused';
    if (motionButton) {
      motionButton.hidden = reducedMotion.matches;
      motionButton.setAttribute('aria-pressed', String(userPaused));
    }
  }

  function alignGrid() {
    const matrix = stage.getScreenCTM();
    if (!matrix) return;
    const box = (document.querySelector('.page-grid') || hero).getBoundingClientRect();
    const module = 82 * matrix.a;
    if (module <= 0) return;
    const anchor = new DOMPoint(340,406).matrixTransform(matrix);
    const ax = anchor.x - box.left, ay = anchor.y - box.top;
    const signature = [box.width, box.height, module, ax, ay].map(value => value.toFixed(2)).join(',');
    if (signature === gridSignature) return;
    gridSignature = signature;
    const x0 = ax % module, y0 = ay % module;
    grid.setAttribute('x', String(x0));
    grid.setAttribute('y', String(y0));
    grid.setAttribute('width', String(module));
    grid.setAttribute('height', String(module));
    gridSquare.setAttribute('d', `M${module} 0H0V${module}`);
    gridCircle.setAttribute('cx', String(module / 2));
    gridCircle.setAttribute('cy', String(module / 2));
    gridCircle.setAttribute('r', String(module / 2));

    const fragment = document.createDocumentFragment();
    for (let y = y0 - module / 2; y < box.height + module; y += module) {
      for (let x = x0 - module / 2; x < box.width + module; x += module) {
        const distance = Math.hypot(x - ax, y - ay);
        if (distance >= 5.2 * module) continue;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'grid-signal');
        circle.setAttribute('cx', String(x));
        circle.setAttribute('cy', String(y));
        circle.setAttribute('r', String(module / 2));
        circle.style.animationDelay = `${distance / 340}s`;
        fragment.append(circle);
      }
    }
    signals.replaceChildren(fragment);
  }

  motionButton?.addEventListener('click', () => { userPaused = !userPaused; syncMotion(); });
  reducedMotion.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncMotion(); }, {threshold: .05}).observe(hero);
  const gridObserver = new ResizeObserver(alignGrid);
  gridObserver.observe(hero);
  gridObserver.observe(stage);
  document.fonts.ready.then(alignGrid);
  alignGrid();
  syncMotion();

  const nav = document.getElementById('nav');
  function stuck() { nav.dataset.stuck = String(scrollY > 24 ? 1 : 0); }
  addEventListener('scroll', stuck, {passive: true});
  stuck();
})();
