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

  panel.addEventListener('click', function (ev) { if (ev.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && abierto()) { set(false); (cel.matches ? burger : abre).focus(); }
  });
  document.addEventListener('click', function (ev) { if (abierto() && !nav.contains(ev.target)) set(false); });
  cel.addEventListener('change', function () { set(false); });
})();
