/* Página de producto de Racimo.
   La historia: la uva del producto se desprende del racimo de la home, se enciende,
   se abre en el video (que avanza con el scroll) y al final vuelve a un racimo chico.
   Reglas: nada queda invisible si el script no corre; con «reducir movimiento» el video
   se reproduce solo y no hay scroll atado; todo lo que se anima es transform, opacity o clip-path. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = t => 1 - Math.pow(1 - t, 3);
  const easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  /* ── scroll suave ─────────────────────────────────────────── */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: .1, smoothWheel: true, wheelMultiplier: .9 });
    root.classList.add('lenis', 'lenis-smooth');
  }
  const scrollTo = (target, opts = {}) => {
    if (lenis) lenis.scrollTo(target, { offset: -8, duration: 1.4, easing: easeIO, ...opts });
    else (typeof target === 'number' ? scrollTo_(target) : target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }));
  };
  const scrollTo_ = y => window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (id === 'historia-fin') return;
    const el = id ? document.getElementById(id) : null;
    if (!el) return;
    e.preventDefault();
    scrollTo(el, { offset: id === 'consulta' ? -40 : -8 });
    history.replaceState(null, '', '#' + id);
  });

  /* ── navegación ───────────────────────────────────────────── */
  const nav = $('#nav');
  const stuck = () => { nav.dataset.stuck = scrollY > 24 ? '1' : '0'; };

  /* ── apariciones ──────────────────────────────────────────── */
  const entran = [...document.querySelectorAll('[data-entra]')];
  if (!reduce && 'IntersectionObserver' in window) {
    root.dataset.anim = '';
    // en el hero, en orden y escalonado; en el resto, cuando entran
    [...document.querySelectorAll('.p-hero [data-entra]')].forEach((el, i) => { el.style.transitionDelay = (0.08 + i * 0.09) + 's'; });
    document.querySelectorAll('.items, .tres, .racimito').forEach(g => {
      [...g.querySelectorAll('[data-entra], a, .yo')].forEach((el, i) => { el.style.transitionDelay = (i * 0.08) + 's'; });
    });
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in'); io.unobserve(e.target);
    }), { threshold: .14, rootMargin: '0px 0px -6% 0px' });
    entran.forEach(el => io.observe(el));
  } else entran.forEach(el => el.classList.add('is-in'));

  /* ── la uva llega desde la home ───────────────────────────── */
  addEventListener('pageshow', () => document.documentElement.classList.remove('desde-uva'));
  if (!(document.querySelector('#uva')) || reduce) document.documentElement.classList.remove('desde-uva');
  const uva = $('#uva');
  const heroEntra = () => document.querySelectorAll('.p-hero [data-entra]').forEach(el => el.classList.add('is-in'));
  let desde = null;
  try { desde = JSON.parse(sessionStorage.getItem('racimo-uva') || 'null'); sessionStorage.removeItem('racimo-uva'); } catch (e) {}
  if (desde && !reduce && uva) {
    const r = uva.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const cubre = 2.5 * Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    const c = document.createElement('div');
    c.className = 'cortina-uva';
    c.style.width = c.style.height = r.width + 'px';
    c.style.transform = `translate(${cx - r.width / 2}px, ${cy - r.height / 2}px) scale(${cubre / r.width})`;
    document.body.appendChild(c);
    document.documentElement.classList.remove('desde-uva');
    document.querySelectorAll('.p-hero [data-entra]').forEach(el => { el.style.transitionDelay = (0.45 + parseFloat(el.style.transitionDelay || 0)) + 's'; });
    requestAnimationFrame(() => {
      c.animate([
        { transform: `translate(${cx - r.width / 2}px, ${cy - r.height / 2}px) scale(${cubre / r.width})` },
        { transform: `translate(${cx - r.width / 2}px, ${cy - r.height / 2}px) scale(1)` }
      ], { duration: 1000, easing: 'cubic-bezier(.15,.65,.25,1)', fill: 'forwards' }).onfinish = () => {
        c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: 'forwards' }).onfinish = () => c.remove();
      };
      heroEntra();
    });
  } else if (!reduce && uva) {
    // la uva se desprende del racimo: sale de su lugar vacío y viaja hasta adelante
    requestAnimationFrame(() => {
      const hueco = document.querySelector('#racimoFondo .vacio');
      const a = hueco.getBoundingClientRect(), b = uva.getBoundingClientRect();
      const dx = (a.left + a.width / 2) - (b.left + b.width / 2), dy = (a.top + a.height / 2) - (b.top + b.height / 2);
      const k = a.width / b.width;
      const opts = { duration: 1400, delay: 250, easing: 'cubic-bezier(.65,0,.2,1)', fill: 'backwards' };
      uva.animate([{ translate: `${dx}px ${dy}px`, scale: k }, { translate: '0 0', scale: 1 }], opts);
      $('#uvaBrillo').animate([{ translate: `${dx}px ${dy}px`, scale: k, opacity: 0 }, { translate: '0 0', scale: 1, opacity: 1 }], opts);
      $('#orbita').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 1150, easing: 'ease-out', fill: 'backwards' });
      heroEntra();
    });
  } else requestAnimationFrame(heroEntra);

  /* ── las OTAs giran alrededor de la uva ───────────────────── */
  const escena = $('#escenaUva');
  const orbitaEl = $('#orbita');
  const otas = orbitaEl ? [...orbitaEl.children] : [];
  const constelacion = orbitaEl && orbitaEl.dataset.modo === 'constelacion';
  const racimoFondo = $('#racimoFondo');
  let ang = 0, heroVisible = true;
  let reloj0 = 0;
  function flotar(dt, salida) {
    // constelación: cada objeto en su lugar, flota apenas y se abre con el scroll según su profundidad
    const w = escena.clientWidth;
    reloj0 += reduce ? 0 : dt;
    otas.forEach((el, i) => {
      // en el celular la constelación se cierra para no salirse de la pantalla ni tapar el texto
      const fx = innerWidth < 700 ? .86 : 1, fy = innerWidth < 700 ? .74 : 1;
      const x = parseFloat(el.dataset.x) * w * fx, y = parseFloat(el.dataset.y) * w * fy, z = parseFloat(el.dataset.z || .5);
      const bob = Math.sin(reloj0 * (.55 + z * .25) + i * 1.7) * (5 + z * 6);
      const abre = 1 + salida * (.25 + z * .35);
      el.style.transform = `translate(-50%,-50%) translate3d(${x * abre}px, ${y * abre + bob - salida * z * 60}px, 0) scale(${.86 + z * .18})`;
      el.style.opacity = String(1 - salida * .95);
      el.style.zIndex = z > .55 && innerWidth >= 700 ? '3' : '1';   // en el celular, el nombre de la uva siempre adelante
    });
  }
  function orbitar(dt, salida) {
    if (!escena) return;
    if (constelacion) return flotar(dt, salida);
    const w = escena.clientWidth;
    const ancho = otas[0] && otas[0].classList.contains('obj') ? .38 : .47;   // las tarjetas de texto, más cerca de la uva
    const chico = ancho < .4 && innerWidth < 700;
    const rx = w * (ancho * (chico ? .82 : 1) + salida * .12), ry = w * ((chico ? .24 : .3) + salida * .06);
    const vis = otas.filter(el => el.offsetParent !== null);
    vis.forEach((el, i) => {
      const a = ang + (i / vis.length) * Math.PI * 2;
      const z = Math.sin(a);                       // -1 atrás, 1 adelante
      const k = (z + 1) / 2;
      const s = .74 + .3 * k;
      el.style.transform = `translate(-50%,-50%) translate3d(${Math.cos(a) * rx}px, ${z * ry}px, 0) scale(${s})`;
      el.style.opacity = String((.42 + .58 * k) * (1 - salida * .9));
      el.style.zIndex = z > 0 && !chico ? '3' : '1';
    });
    if (!reduce) ang += dt * .16;
  }

  /* ── la rejilla se ilumina donde está la uva ──────────────── */
  function luz(x, y, o) {
    root.style.setProperty('--gx', x.toFixed(1) + 'px');
    root.style.setProperty('--gy', y.toFixed(1) + 'px');
    root.style.setProperty('--luz', o.toFixed(3));
  }

  /* ── la historia: video que avanza con el scroll ──────────── */
  const hist = $('#historia');
  const cfg = window.RACIMO_VIDEO;
  const pantalla = $('#pantalla'), lienzo = $('#lienzo'), marco = $('#marco'), pUva = $('#pantallaUva');
  const pasos = [...document.querySelectorAll('#pasosVideo li')];
  const barra = $('#progreso');
  let VH = innerHeight, anchoPrevio = innerWidth;
  let video = null, vertical = null, segs = [], abrir = .7, totalPantallas = 0;
  let tObjetivo = 0, tActual = 0, modoReloj = reduce;

  function armarTramos() {
    // la línea de scroll: abrir la uva, después el video con sus pausas de lectura
    segs = [];
    let t = 0, u = abrir;
    // si la página no trae pausas, se frena al final de cada escena (más en la placa del titular)
    if (!cfg.pausas) {
      let acc = 0; cfg.pausas = [];
      cfg.escenas.forEach(s => { acc += s.dur; cfg.pausas.push([+(acc - .25).toFixed(2), s.name === 'Titulo' ? .8 : .5]); });
      cfg.fin = cfg.pausas[cfg.pausas.length - 1][0];
      cfg.pasosPorSegundo = cfg.pantallasPorSegundo = cfg.pantallasPorSegundo || .22;
    }
    const pausas = cfg.pausas.slice().sort((a, b) => a[0] - b[0]);
    for (const [tp, quieto] of pausas) {
      if (tp > t) { const d = (tp - t) * cfg.pantallasPorSegundo; segs.push({ u0: u, u1: u + d, t0: t, t1: tp }); u += d; t = tp; }
      segs.push({ u0: u, u1: u + quieto, t0: tp, t1: tp }); u += quieto;
    }
    totalPantallas = u;
  }

  function montar() {
    const v = innerWidth <= 760 && innerHeight > innerWidth;
    if (v === vertical && video) return;
    vertical = v;
    if (video) video.unmount();
    lienzo.replaceChildren();
    video = window.RacimoVideo.mount(lienzo, { scenes: cfg.escenas, tweaks: cfg.ajustes, vertical: v, pieza: cfg.pieza });
    medir();
    video.set(tActual);
  }

  function medir() {
    if (!video) return;
    const box = marco.getBoundingClientRect();
    const ar = video.width / video.height;
    let w = box.width, h = w / ar;
    if (h > box.height) { h = box.height; w = h * ar; }
    pantalla.style.width = w + 'px'; pantalla.style.height = h + 'px';
    lienzo.style.width = video.width + 'px'; lienzo.style.height = video.height + 'px';
    lienzo.style.transform = `scale(${w / video.width})`;
    pUva.style.setProperty('--uva-d', Math.min(w, h) * .22 + 'px');
    if (!modoReloj) hist.style.height = ((totalPantallas + 1) * VH) + 'px';
  }

  function tiempoDe(u) {
    if (u <= abrir) return 0;
    for (const s of segs) if (u <= s.u1) return s.t1 === s.t0 ? s.t0 : s.t0 + (s.t1 - s.t0) * ((u - s.u0) / (s.u1 - s.u0));
    return cfg.fin;
  }

  function pintarPasos(t) {
    let k = 0;
    pasos.forEach((li, i) => { if (t >= parseFloat(li.dataset.t) - .05) k = i; });
    pasos.forEach((li, i) => { li.classList.toggle('on', i === k); li.classList.toggle('ok', i < k); });
  }

  let histTop = 0;
  function cachear() { let y = 0; for (let el = hist; el; el = el.offsetParent) y += el.offsetTop; histTop = y; }

  function historia(dt) {
    if (!video) return;
    if (modoReloj) return;
    const u = (scrollY - histTop) / VH;           // pantallas recorridas dentro de la sección
    // abrir: la uva verde se convierte en la pantalla
    const a = ease(clamp(u / abrir, 0, 1));
    pantalla.style.setProperty('--abre', (9 + a * 63).toFixed(2) + '%');
    pUva.style.setProperty('--uva-o', (1 - clamp((a - .15) * 1.5, 0, 1)).toFixed(3));
    pUva.style.setProperty('--uva-s', (1 + a * 2.2).toFixed(3));
    tObjetivo = tiempoDe(u);
    // el video persigue al scroll con inercia: nunca salta aunque la rueda pegue un tirón
    // y con un tope de velocidad (6 s de video por segundo): un tirón largo se ve como un avance rápido, no como un corte
    const k = 1 - Math.exp(-dt * 9);
    const paso = clamp((tObjetivo - tActual) * k, -6 * dt, 6 * dt);
    tActual += paso;
    if (Math.abs(tObjetivo - tActual) < .002) tActual = tObjetivo;
    video.set(tActual);
    pintarPasos(tActual);
    if (barra) barra.style.transform = `scaleX(${(tActual / cfg.fin).toFixed(4)})`;
  }

  // con «reducir movimiento»: el video corre solo, en loop, cuando se ve
  let relojOn = false, relojT = 0;
  function reloj(dt) {
    if (!video || !modoReloj || !relojOn) return;
    relojT = (relojT + dt) % cfg.fin;
    video.set(relojT); pintarPasos(relojT);
  }

  if (hist && cfg && window.RacimoVideo) {
    armarTramos();
    if (modoReloj) { hist.dataset.modo = 'reloj'; pantalla.style.setProperty('--abre', '100%'); }
    montar();
    new IntersectionObserver(es => { relojOn = es[0].isIntersecting; }, { threshold: .3 }).observe(pantalla);
    $('#saltear')?.addEventListener('click', e => {
      e.preventDefault();
      scrollTo(histTop + totalPantallas * VH + VH * .02, { duration: 1.6 });
    });
  } else if (hist) hist.hidden = true;

  /* ── el lazo con tu PMS ───────────────────────────────────── */
  const lazo = $('#lazo');
  if (lazo && !reduce) {
    new IntersectionObserver((es, o) => es.forEach(e => {
      if (!e.isIntersecting) return;
      lazo.animate([{ strokeDashoffset: 140 }, { strokeDashoffset: 0 }], { duration: 2200, easing: 'linear', iterations: Infinity });
      o.disconnect();
    }), { threshold: .4 }).observe(lazo);
  }

  const hero = $('.p-hero');

  /* ── UGC: la sección aparece sólo si el video existe ──────── */
  const ugc = $('#ugc'), uv = $('#ugcVideo'), up = $('#ugcPlay');
  if (ugc && uv) {
    fetch(uv.querySelector('source').src, { method: 'HEAD' }).then(r => { if (r.ok) { uv.poster = uv.dataset.poster || ''; ugc.hidden = false; } }).catch(() => {});
    up?.addEventListener('click', () => { uv.controls = true; uv.play(); up.remove(); });
  }

  /* ── piezas que avanzan con el scroll (el día, el chat, la noche, la perilla, la foto) ── */
  const piezas = [...document.querySelectorAll('[data-progreso]')];
  function progresoDe(el) {
    const r = el.getBoundingClientRect();
    return clamp((VH * .82 - r.top) / (r.height * .9 + VH * .25), 0, 1);
  }
  function pintarPiezas() {
    for (const el of piezas) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > VH + 200) continue;
      const p = reduce ? 1 : progresoDe(el);
      const tipo = el.dataset.progreso;
      if (tipo === 'foto') { const img = el.querySelector('img'); if (img && !reduce) img.style.transform = `translate3d(0, ${(r.top / VH) * -60}px, 0)`; continue; }
      const hijos = [...el.querySelectorAll(':scope > [data-paso], :scope [data-paso]')];
      const n = hijos.length;
      if (tipo === 'dia') el.style.setProperty('--avance', p.toFixed(3));
      hijos.forEach((h, i) => {
        const on = tipo === 'dial' ? (i === Math.min(n - 1, Math.floor(p * n * .999))) : p >= (i + .4) / n;
        h.classList.toggle('on', on);
      });
    }
  }

  window.__racimo = { t: () => tActual };

  /* ── un solo bucle para todo ──────────────────────────────── */
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (lenis) lenis.raf(now);
    stuck();
    const hb = hero.getBoundingClientRect();
    const salida = clamp(-hb.top / (hb.height * .9), 0, 1);
    heroVisible = hb.bottom > 0;
    if (heroVisible) {
      orbitar(dt, salida);
      // al bajar, el racimo se queda atrás y la uva avanza hacia la historia
      racimoFondo.style.transform = `translate3d(0, ${-salida * 90}px, 0) scale(${1 - salida * .08})`;
      racimoFondo.style.opacity = String(.6 * (1 - salida));
      uva.style.scale = String(1 + salida * .18);
    }
    // la luz sigue a la uva en el hero y a la pantalla en la historia
    if (heroVisible && salida < .6) {
      const r = uva.getBoundingClientRect();
      luz(r.left + r.width / 2, r.top + r.height / 2, 1 - salida);
    } else if (hist && !hist.hidden) {
      const r = pantalla.getBoundingClientRect();
      const dentro = r.top < innerHeight && r.bottom > 0;
      luz(r.left + r.width / 2, r.top + r.height / 2, dentro ? .55 : 0);
    }
    historia(dt);
    reloj(dt);
    pintarPiezas();
    requestAnimationFrame(frame);
  }

  function rearmar(e) {
    // en el celular la barra del navegador cambia el alto al scrollear: eso no rearma nada
    if (e && e.type === 'resize' && innerWidth === anchoPrevio && Math.abs(innerHeight - VH) < 160) return;
    anchoPrevio = innerWidth; VH = innerHeight;
    if (video) { montar(); medir(); }
    cachear();
  }
  addEventListener('resize', rearmar);
  document.fonts && document.fonts.ready.then(rearmar);
  addEventListener('load', rearmar);
  cachear();
  orbitar(0, 0);
  requestAnimationFrame(frame);
})();
