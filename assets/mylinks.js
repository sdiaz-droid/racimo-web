/* MyLinks del hotel en Huésped+: el celular se scrollea por dentro (rueda,
   arrastre con el mouse o el dedo). Mientras nadie lo toca, hace un recorrido
   solo y lento por la página; al primer gesto del usuario, el recorrido se
   detiene para siempre y manda la persona. El relato de la noche (02:14)
   enciende el check-in y abre la llave cuando llega a esos renglones. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-ml]').forEach(cel => {
    const pan = cel.querySelector('.ml-pantalla');
    const portada = cel.querySelector('.ml-portada');
    const carril = cel.querySelector('.ml-carril');
    if (!pan) return;

    /* ── estado visual según el scroll interno ── */
    let ocultar = 0;
    function alScroll() {
      const max = pan.scrollHeight - pan.clientHeight;
      const y = pan.scrollTop;
      cel.style.setProperty('--ml-p', max > 0 ? (y / max).toFixed(3) : 0);
      cel.style.setProperty('--ml-zoom', Math.min(1, y / 300).toFixed(3));
      cel.classList.toggle('pasada', y > portada.offsetHeight - 130);
      cel.style.setProperty('--ml-barra', 1);
      clearTimeout(ocultar);
      ocultar = setTimeout(() => cel.style.setProperty('--ml-barra', 0), 900);
    }
    pan.addEventListener('scroll', alScroll, { passive: true });

    /* ── recorrido automático hasta que el usuario toma el control ── */
    let manda = reduce, anim = 0;
    function tomar() {
      if (manda) return;
      manda = true;
      cancelAnimationFrame(anim);
    }
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(ev => pan.addEventListener(ev, tomar, { passive: true }));

    const io = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    function ir(el, prop, a, ms) {
      return new Promise(res => {
        if (manda) return res();
        const de = el[prop], t0 = performance.now();
        const paso = (now) => {
          if (manda) return res();
          const k = Math.min(1, (now - t0) / ms);
          el[prop] = de + (a - de) * io(k);
          k < 1 ? (anim = requestAnimationFrame(paso)) : res();
        };
        anim = requestAnimationFrame(paso);
      });
    }
    const espera = (ms) => new Promise(r => setTimeout(r, ms));
    const topDe = (sel) => {
      const el = cel.querySelector(sel);
      return el ? Math.min(el.offsetTop + (el.offsetParent === pan ? 0 : el.offsetParent.offsetTop) - 58, pan.scrollHeight - pan.clientHeight) : 0;
    };

    let enVista = false, corriendo = false;
    async function recorrido() {
      if (corriendo || manda) return;
      corriendo = true;
      while (!manda && enVista) {
        await espera(1600);
        await ir(pan, 'scrollTop', topDe('.ml-hola'), 1500); await espera(2200);
        await ir(pan, 'scrollTop', topDe('.ml-grilla'), 1300); await espera(2000);
        await ir(pan, 'scrollTop', topDe('.ml-carril') - 40, 1500); await espera(900);
        if (carril) {
          const w = carril.querySelector('.ml-exp')?.offsetWidth + 9 || 180;
          for (let i = 1; i < 4 && !manda; i++) { await ir(carril, 'scrollLeft', w * i, 900); await espera(900); }
          await ir(carril, 'scrollLeft', 0, 900);
        }
        await ir(pan, 'scrollTop', topDe('.ml-banner') - 120, 1800); await espera(1800);
        await ir(pan, 'scrollTop', pan.scrollHeight, 1500); await espera(1800);
        await ir(pan, 'scrollTop', 0, 2200); await espera(2400);
      }
      corriendo = false;
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        enVista = en.intersectionRatio >= .55;
        if (enVista) recorrido();
      }, { threshold: [0, .55, 1] }).observe(cel);
    }

    /* ── arrastre con el mouse (el dedo y la rueda ya scrollean solos) ── */
    let arr = null;
    pan.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      const enCarril = carril && carril.contains(e.target);
      arr = { x: e.clientX, y: e.clientY, top: pan.scrollTop, left: carril ? carril.scrollLeft : 0, enCarril, eje: null, v: 0, ly: e.clientY, lt: performance.now(), movio: false };
      pan.setPointerCapture(e.pointerId);
    });
    pan.addEventListener('pointermove', (e) => {
      if (!arr) return;
      const dx = e.clientX - arr.x, dy = e.clientY - arr.y;
      if (!arr.eje && Math.hypot(dx, dy) > 4) arr.eje = (arr.enCarril && Math.abs(dx) > Math.abs(dy)) ? 'x' : 'y';
      if (!arr.eje) return;
      arr.movio = true;
      pan.classList.add('arrastra');
      if (arr.eje === 'x') { carril.style.scrollSnapType = 'none'; carril.scrollLeft = arr.left - dx; }
      else {
        pan.scrollTop = arr.top - dy;
        const now = performance.now();
        arr.v = (e.clientY - arr.ly) / Math.max(1, now - arr.lt); arr.ly = e.clientY; arr.lt = now;
      }
    });
    function soltar() {
      if (!arr) return;
      const a = arr; arr = null;
      pan.classList.remove('arrastra');
      if (a.eje === 'x' && carril) {
        const w = carril.querySelector('.ml-exp').offsetWidth + 9;
        ir2(carril, 'scrollLeft', Math.round(carril.scrollLeft / w) * w, 380).then(() => { carril.style.scrollSnapType = ''; });
      } else if (a.eje === 'y' && Math.abs(a.v) > .2) {
        ir2(pan, 'scrollTop', pan.scrollTop - a.v * 320, 650);
      }
      if (a.movio) pan.addEventListener('click', (ev) => ev.preventDefault(), { capture: true, once: true });
    }
    pan.addEventListener('pointerup', soltar);
    pan.addEventListener('pointercancel', soltar);
    // inercia del arrastre (independiente del recorrido automático)
    function ir2(el, prop, a, ms) {
      return new Promise(res => {
        const de = el[prop], t0 = performance.now();
        const out = (t) => 1 - Math.pow(1 - t, 3);
        const paso = (now) => { const k = Math.min(1, (now - t0) / ms); el[prop] = de + (a - de) * out(k); k < 1 ? requestAnimationFrame(paso) : res(); };
        requestAnimationFrame(paso);
      });
    }

    /* ── la llave se puede tocar ── */
    cel.querySelector('.ml-llave')?.addEventListener('click', () => { if (!pan.classList.contains('arrastra')) cel.classList.toggle('abierta'); });

    /* ── el relato de la noche enciende el check-in y abre la llave ── */
    const seccion = cel.closest('.noche');
    const renglones = seccion ? [...seccion.querySelectorAll('.relato [data-paso]')] : [];
    function sincronizar() {
      const n = renglones.filter(p => p.classList.contains('on')).length;
      cel.classList.toggle('checkin', n >= 3);
      if (n >= 4) cel.classList.add('abierta');
      else if (n < 3) cel.classList.remove('abierta');
    }
    if (renglones.length) {
      const mo = new MutationObserver(sincronizar);
      renglones.forEach(p => mo.observe(p, { attributes: true, attributeFilter: ['class'] }));
      sincronizar();
    } else cel.classList.add('checkin');

    alScroll();
    cel.style.setProperty('--ml-barra', 0);
  });
})();
