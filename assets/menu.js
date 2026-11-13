/* Menú de Racimo: abre y cierra el panel del racimo (escritorio) y la hoja del celular.
   Sin este script los enlaces siguen funcionando: el panel sólo no se despliega. */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var abre = nav.querySelector('.m-abre');
  var burger = nav.querySelector('.m-burger');
  var panel = nav.querySelector('.m-panel');
  if (!panel) return;
  var cel = window.matchMedia('(max-width:960px)');
  var cierreT;

  function set(abierto, quien) {
    nav.dataset.menu = abierto ? 'abierto' : '';
    if (abre) abre.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    if (burger) burger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    document.documentElement.classList.toggle('m-trabado', abierto && cel.matches);
    if (ind) { if (abierto && !cel.matches) mover(abre); else if (!links.matches(':hover')) links.removeAttribute('data-ind'); }
    if (!abierto) encender(null);
    if (abierto && quien === 'teclado') {
      var primero = panel.querySelector('a');
      if (primero) primero.focus();
    }
  }
  function abierto() { return nav.dataset.menu === 'abierto'; }

  if (abre) {
    // en escritorio con mouse, también se abre al pasar
    var fino = window.matchMedia('(hover:hover) and (pointer:fine)');
    abre.addEventListener('click', function (ev) {
      if (ev.detail === 0) return set(!abierto(), 'teclado');
      // con mouse ya se abrió al pasar: el clic no lo cierra
      set(fino.matches && !cel.matches ? true : !abierto(), 'mouse');
    });
    [abre, panel].forEach(function (el) {
      el.addEventListener('mouseenter', function () { if (fino.matches && !cel.matches) { clearTimeout(cierreT); set(true); } });
      el.addEventListener('mouseleave', function () { if (fino.matches && !cel.matches) { cierreT = setTimeout(function () { set(false); }, 180); } });
    });
  }
  if (burger) burger.addEventListener('click', function () { set(!abierto()); });

  // la pastilla que sigue al mouse por los enlaces de la barra
  var links = nav.querySelector('.m-links');
  var ind = links && links.querySelector('.m-ind');
  function mover(el, sinAnim) {
    if (!ind) return;
    if (!el) { if (!abierto()) links.removeAttribute('data-ind'); else mover(abre); return; }
    var vacio = !links.hasAttribute('data-ind');
    links.style.setProperty('--x', el.offsetLeft + 'px');
    links.style.setProperty('--w', el.offsetWidth + 'px');
    links.setAttribute('data-ind', vacio || sinAnim ? 'sin-anim' : '1');
    if (vacio) requestAnimationFrame(function () { links.setAttribute('data-ind', '1'); });
  }
  if (links) {
    links.querySelectorAll('a, .m-abre').forEach(function (el) {
      el.addEventListener('mouseenter', function () { mover(el); });
      el.addEventListener('focus', function () { mover(el); });
    });
    links.addEventListener('mouseleave', function () { mover(null); });
  }

  // cada producto de la lista enciende su uva en el racimo (y al revés)
  function encender(k) {
    nav.querySelectorAll('.m-g, .m-item').forEach(function (el) { el.classList.toggle('on', !!k && el.dataset.k === k); });
  }
  nav.querySelectorAll('.m-item, .m-g').forEach(function (el) {
    el.addEventListener('mouseenter', function () { encender(el.dataset.k); });
    el.addEventListener('focus', function () { encender(el.dataset.k); });
  });
  panel.addEventListener('mouseleave', function () { encender(null); });
  panel.addEventListener('focusout', function (ev) { if (!panel.contains(ev.relatedTarget)) encender(null); });

  panel.addEventListener('click', function (ev) { if (ev.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && abierto()) { set(false); (cel.matches ? burger : abre).focus(); }
  });
  document.addEventListener('click', function (ev) { if (abierto() && !nav.contains(ev.target)) set(false); });
  cel.addEventListener('change', function () { set(false); });
})();
