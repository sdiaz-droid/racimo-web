// Racimo · kit compartido para videos de producto (horizontal 2560×1048 / vertical 1080×1920)
(function () {
const VERDE = '#00f068', VIOLETA = '#6c63ff', NEGRO = '#121212';
const VERDE_TX = '#00b34e', VIOLETA_TX = '#5049cc', VERDE_T = '#e6fef1', VIOLETA_T = '#f0efff', VIOLETA_TD = '#1c1b3a';
const GRIS = { borde: '#e4e4e4', suave: '#f4f4f4', tx: '#3a3a3a', mut: '#6e6e6e', claro: '#b4b4b4' };
const MOTION = { enter: Easing.easeOutCubic, move: Easing.easeInOutCubic, pop: Easing.easeOutBack };
const tw = (T, s, e, from, to, ease) => animate({ from, to, start: s, end: e, ease: ease || MOTION.enter })(T);

const ICONS = {
  msg: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  cal: ["M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  calPlus: ["M8 2v4M16 2v4M3 10h18M12 14v4M10 16h4M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  cloud: ["M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"],
  mega: ["M11.6 16.8a3 3 0 1 1-5.8-1.6", "M3 11l18-5v12L3 14v-3z"],
  bank: ["M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z"],
  martini: ["M8 22h8M12 11v11M12 11l7-8H5z"],
  chart: ["M3 3v16a2 2 0 0 0 2 2h16M18 17V9M13 17V5M8 17v-3"],
  users: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"],
  user: ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"],
  spark: ["M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"],
  search: ["M21 21l-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"],
  bell: ["M10.3 21a2 2 0 0 0 3.4 0", "M3.3 15.3A1 1 0 0 0 4 17h16a1 1 0 0 0 .7-1.7C19.4 14 18 12.5 18 8a6 6 0 0 0-12 0c0 4.5-1.4 6-2.7 7.3z"],
  refresh: ["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M16 8h5V3", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M3 21v-5h5"],
  pencil: ["M15 5l4 4", "M21.17 6.81a2.83 2.83 0 0 0-4-4L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"],
  down: ["M6 9l6 6 6-6"], left: ["M15 18l-6-6 6-6"], right: ["M9 18l6-6-6-6"],
  check: ["M9 12l2 2 4-4", "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"],
  tick: ["M5 12l5 5 9-10"],
  alert: ["M12 8v4M12 16h.01", "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"],
  info: ["M12 16v-4M12 8h.01", "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"],
  plus: ["M5 12h14M12 5v14"], dots: ["M12 5h.01M12 12h.01M12 19h.01"],
  grid: ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"],
  card: ["M2 10h20", "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"],
  arrow: ["M5 12h14M12 5l7 7-7 7"],
  star: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"],
  globe: ["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z", "M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
  image: ["M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M10 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM21 15l-3.1-3.1a2 2 0 0 0-2.8 0L6 21"],
  pin: ["M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z", "M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"],
  mail: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M22 6l-10 7L2 6"],
  send: ["M22 2L11 13M22 2l-7 20-4-9-9-4z"],
  phone: ["M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"],
  key: ["M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"],
  layers: ["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5M2 12l10 5 10-5"],
  move: ["M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"],
  qr: ["M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z", "M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4"],
  fork: ["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20", "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"],
  box: ["M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", "M3.3 7L12 12l8.7-5M12 22V12"],
  clock: ["M12 6v6l4 2", "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"],
  truck: ["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14", "M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM19 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"],
  flame: ["M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"],
  coffee: ["M10 2v2M14 2v2M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"],
  glass: ["M8 22h8M7 10h10M12 15v7M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z"],
  inArrow: ["M7 7l10 10M17 7v10H7"], outArrow: ["M7 17L17 7M7 7h10v10"],
  building: ["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z", "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4"],
  tag: ["M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z", "M7.5 7.5h.01"],
  receipt: ["M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z", "M16 8H8M16 12H8M13 16H8"],
  eye: ["M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z", "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"],
  logIn: ["M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", "M10 17l5-5-5-5M15 12H3"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"]
};
function Ic({ n, s = 20, c = '#3a3a3a', w = 2 }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', display: 'block' }}>
      {(ICONS[n] || ICONS.dots).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

const NAV = [['msg', 'CRM', 17], ['cal', 'Reservas', 8], ['link', 'Canales'], ['cloud', 'Operaciones'], ['mega', 'Marketing'], ['bank', 'Administra...'], ['martini', 'Servicios'], ['receipt', 'POS'], ['chart', 'RMS'], ['users', 'Huésped+'], ['spark', 'Racimo IA']];

// Pantalla completa de Racimo en coordenadas de mundo 1920×1000
function Shell({ active = 'Operaciones', scope, children, overlay }) {
  const sc = scope || [['bank', 'RESELLER', 'Reseller PMS'], ['grid', 'ESTABLECIMIENTO', 'Hotel Las Moras'], ['card', 'PUNTO DE VENTA', 'Las Moras · Recepción']];
  return (
    <div style={{ position: 'relative', width: 1920, height: 1000, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ position: 'absolute', inset: 0, background: NEGRO, borderRadius: 28, border: '1px solid #242424', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 112, height: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ height: 92, display: 'flex', alignItems: 'center' }}><img src="assets/racimo-monograma.svg" style={{ width: 44, height: 44 }} /></div>
          {NAV.map(([ic, label, badge]) => {
            const act = label === active;
            return (
              <div key={label} style={{ position: 'relative', width: 112, padding: '12px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: act ? VIOLETA_TD : 'transparent' }}>
                {act && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: VERDE }} />}
                <Ic n={ic} s={24} c={act ? '#fff' : GRIS.claro} />
                <div style={{ fontSize: 12, color: act ? '#fff' : GRIS.claro, fontWeight: act ? 600 : 400 }}>{label}</div>
                {badge ? <div style={{ position: 'absolute', top: 8, left: 62, background: VIOLETA, color: '#fff', fontSize: 11, fontWeight: 600, borderRadius: 9, padding: '1px 7px' }}>{badge}</div> : null}
              </div>
            );
          })}
        </div>
        <div style={{ position: 'absolute', left: 112, top: 0, right: 0, height: 92, display: 'flex', alignItems: 'center', gap: 28, padding: '0 28px 0 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: 492, height: 52, background: '#1a1a1a', border: '1px solid #242424', borderRadius: 14, padding: '0 18px', boxSizing: 'border-box' }}>
            <Ic n="search" c={GRIS.mut} /><div style={{ fontSize: 16, color: GRIS.mut }}>Buscar</div>
          </div>
          <div style={{ flex: 1 }} />
          {sc.map(([ic, k, v]) => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Ic n={ic} s={14} c={GRIS.mut} />
                <div style={{ fontSize: 11, letterSpacing: '0.14em', color: GRIS.claro, fontWeight: 600, whiteSpace: 'nowrap' }}>{k}</div>
                <Ic n="refresh" s={13} c={VIOLETA} />
              </div>
              <div style={{ fontSize: 17, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>{v}</div>
            </div>
          ))}
          <Ic n="down" c={GRIS.claro} />
          <div style={{ position: 'relative' }}>
            <Ic n="bell" s={24} c="#fff" />
            <div style={{ position: 'absolute', top: -10, left: 11, background: VIOLETA, color: '#fff', fontSize: 11, fontWeight: 600, borderRadius: 9, padding: '1px 6px' }}>423</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #242424', color: '#fff', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>LC</div>
        </div>
        <div style={{ position: 'absolute', left: 112, top: 92, right: 0, bottom: 0, background: '#fff', borderTopLeftRadius: 32, overflow: 'hidden' }}>{children}</div>
      </div>
      {overlay}
    </div>
  );
}

function PanelTitle({ children, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {icon && <Ic n={icon} s={26} />}
      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 36, letterSpacing: '-0.02em', color: NEGRO, whiteSpace: 'nowrap' }}>{children}</div>
    </div>
  );
}
function BtnVerde({ children, icon, p = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: VERDE, borderRadius: 14, padding: '14px 26px', transform: `scale(${p})` }}>
      {icon && <Ic n={icon} s={19} c={NEGRO} />}
      <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.04em', color: NEGRO, whiteSpace: 'nowrap' }}>{children}</div>
    </div>
  );
}
function BtnLinea({ children, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid ' + GRIS.borde, borderRadius: 12, padding: '10px 16px', fontSize: 15, color: NEGRO, whiteSpace: 'nowrap' }}>
      {children}{icon && <Ic n={icon} s={16} />}
    </div>
  );
}

// ---------- cámara ----------
// K: [[t, {x,y,s}, {x,y,s}?vertical], ...]. Si no hay vertical se deriva.
function camAt(T, K, v) {
  const pick = k => {
    if (!v) return k[1];
    if (k[2]) return k[2];
    const h = k[1];
    return h.s <= 1.05 ? { x: 960, y: h.y, s: 0.53 } : { x: h.x, y: h.y, s: h.s * 0.72 };
  };
  if (T <= K[0][0]) return pick(K[0]);
  for (let i = 0; i < K.length - 1; i++) {
    const t0 = K[i][0], t1 = K[i + 1][0], a = pick(K[i]), b = pick(K[i + 1]);
    if (T <= t1) {
      const p = t1 === t0 ? 1 : MOTION.move(clamp((T - t0) / (t1 - t0), 0, 1));
      return { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p, s: a.s + (b.s - a.s) * p };
    }
  }
  return pick(K[K.length - 1]);
}
const toStage = (cam, W, H, wx, wy) => ({ x: W / 2 + cam.s * (wx - cam.x), y: H / 2 + cam.s * (wy - cam.y) });
function World({ cam, W, H, op = 1, children }) {
  return (
    <div data-world="1" style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1000, transformOrigin: '0 0', transform: `translate(${W / 2}px, ${H / 2}px) scale(${cam.s}) translate(${-cam.x}px, ${-cam.y}px)`, opacity: op }}>{children}</div>
  );
}

// Un punto puede ser {x,y} o {sel:'confirmar', dx, dy}: se centra sobre el elemento real [data-cur=…] (o selector CSS).
const CUR_CACHE = {}, CUR_PREV = {};
function resolvePt(p) {
  if (!p || (!p.sel && !p.txt)) return p;
  const key = (p.txt || p.sel) + (p.last ? '#l' : '') + '#' + (p.nth || 0) + '#' + (p.fb ? Math.round(p.fb.x) + ',' + Math.round(p.fb.y) : '');
  const w = document.querySelector('[data-world]');
  let el = null;
  if (p.txt && w) {
    const all = [...w.querySelectorAll('*')].filter(e => (e.textContent || '').trim() === p.txt);
    const leaf = all.filter(e => !all.some(o => o !== e && e.contains(o)));
    if (p.last) el = leaf[leaf.length - 1];
    else if (p.nth != null) el = leaf[p.nth];
    else if (p.fb && leaf.length > 1) {
      const wr0 = w.getBoundingClientRect(), k0 = wr0.width / 1920;
      const d = e => { const r = e.getBoundingClientRect(); return Math.hypot((r.left + r.width / 2 - wr0.left) / k0 - p.fb.x, (r.top + r.height / 2 - wr0.top) / k0 - p.fb.y); };
      el = leaf.filter(e => e.getBoundingClientRect().width).sort((x, y) => d(x) - d(y))[0];
    } else el = leaf[0];
  } else if (p.sel) el = document.querySelector(`[data-cur="${p.sel}"]`) || document.querySelector(p.sel);
  const base = CUR_CACHE[key];
  if (!w || !el || !el.getBoundingClientRect().width) return base ? { x: base.x + (p.dx || 0), y: base.y + (p.dy || 0) } : (p.fb || { x: 960, y: 500 });
  const wr = w.getBoundingClientRect(), r = el.getBoundingClientRect(), k = wr.width / 1920;
  const m = { x: (r.left + r.width * (p.fx ?? 0.5) - wr.left) / k, y: (r.top + r.height * (p.fy ?? 0.5) - wr.top) / k };
  CUR_CACHE[key] = m;
  return { x: m.x + (p.dx || 0), y: m.y + (p.dy || 0) };
}
function Cursor({ T, cam, W, H, path: path0, clicks = [], vis }) {
  const path = path0.map(([t, p]) => [t, resolvePt(p)]);
  let pt = path[0][1];
  for (let i = 0; i < path.length - 1; i++) {
    const [t0, a] = path[i], [t1, b] = path[i + 1];
    if (T >= t0 && T <= t1) { const p = MOTION.move((T - t0) / Math.max(0.001, t1 - t0)); pt = { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p }; }
    else if (T > t1) pt = b;
  }
  const op = Math.min(tw(T, vis[0], vis[0] + 0.3, 0, 1), 1 - tw(T, vis[1], vis[1] + 0.3, 0, 1));
  if (op <= 0) return null;
  let press = 1, ring = 0, ringOp = 0;
  clicks.forEach(c => {
    const hold = Array.isArray(c) ? c : [c, c];
    if (T >= hold[0] - 0.08 && T <= hold[1] + 0.12) press = 0.82;
    const rp = clamp((T - hold[0]) / 0.45, 0, 1);
    if (T >= hold[0] && rp < 1) { ring = rp; ringOp = 1 - rp; }
  });
  const s = toStage(cam, W, H, pt.x, pt.y);
  return (
    <div style={{ position: 'absolute', left: s.x, top: s.y, opacity: op, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: -30, top: -30, width: 60, height: 60, borderRadius: '50%', border: `3px solid ${VIOLETA}`, transform: `scale(${0.4 + ring})`, opacity: ringOp }} />
      <svg width="40" height="40" viewBox="0 0 24 24" style={{ position: 'absolute', left: -6, top: -4, transform: `scale(${press})`, transformOrigin: '6px 4px' }}>
        <path d="M5 3l14 8-6.5 1.5L9.5 19z" fill={NEGRO} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Placa tipográfica tipeada. "|" marca dónde arranca el verde.
function Titulo({ T, t0, t1, texto, W, H, v }) {
  const op = Math.min(tw(T, t0, t0 + 0.35, 0, 1), 1 - tw(T, t1, t1 + 0.15, 0, 1));
  if (op <= 0) return null;
  const [a, b = ''] = texto.split('|');
  const full = a + b;
  const n = Math.floor(tw(T, t0 + 0.35, t0 + 1.35, 0, full.length, Easing.linear));
  const caretOn = Math.floor(T * 3) % 2 === 0 || n < full.length;
  const push = tw(T, t0, t1 + 0.4, 1, 1.04, Easing.linear);
  const fs = Math.round(v ? Math.min(150, 900 * 4 / (full.length * 0.52)) : Math.min(240, 2240 * 2 / (full.length * 0.5)));
  const caret = <span key="c" style={{ display: 'inline-block', width: 0, position: 'relative' }}><span style={{ position: 'absolute', left: 6, top: fs * -0.82, width: 8, height: fs * 0.88, background: VERDE, opacity: caretOn ? 1 : 0 }} /></span>;
  const chars = [];
  for (let i = 0; i < full.length; i++) {
    if (i === n) chars.push(caret);
    chars.push(<span key={i} style={{ opacity: i < n ? 1 : 0, color: i >= a.length ? VERDE : '#fff' }}>{full[i]}</span>);
  }
  if (n >= full.length) chars.push(caret);
  return (
    <div style={{ position: 'absolute', inset: 0, background: NEGRO, opacity: op }}>
      <div style={{ position: 'absolute', left: v ? 90 : 160, right: v ? 90 : 160, top: 0, height: H, display: 'flex', alignItems: 'center', transform: `scale(${push})`, transformOrigin: v ? '50% 50%' : '0 50%' }}>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: fs, letterSpacing: '-0.02em', lineHeight: 1.05, textWrap: 'pretty' }}>{chars}</div>
      </div>
    </div>
  );
}

function Cierre({ T, t0, total, producto, bajada, v }) {
  const op = tw(T, t0, t0 + 0.4, 0, 1);
  if (op <= 0) return null;
  const out = 1 - tw(T, total - 0.45, total - 0.05, 0, 1);
  const logo = tw(T, t0 + 0.3, t0 + 0.75, 0, 1);
  const tit = tw(T, t0 + 0.45, t0 + 0.95, 0, 1);
  const baj = tw(T, t0 + 0.7, t0 + 1.15, 0, 1);
  const circ = tw(T, t0 + 0.1, t0 + 0.9, 0, 1, MOTION.move);
  const push = tw(T, t0, total, 1, 1.02, Easing.linear);
  const len = (producto || '').length;
  const fs = v ? (len > 12 ? 150 : 190) : (len > 16 ? 180 : 240);
  const D = v ? 820 : 1100;
  return (
    <div style={{ position: 'absolute', inset: 0, background: NEGRO, opacity: op, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: D, height: D, borderRadius: '50%', background: VIOLETA, right: v ? -D * 0.42 : -D * 0.38, bottom: v ? -D * 0.42 : -D * 0.5, transform: `scale(${circ})`, transformOrigin: '100% 100%', opacity: out }} />
      <div style={{ position: 'absolute', inset: 0, padding: v ? '150px 90px' : '110px 160px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: out, transform: `scale(${push})`, transformOrigin: '0 50%' }}>
        <img src="assets/logos/svg/racimo-horizontal-blanco.svg" style={{ height: v ? 110 : 120, alignSelf: 'flex-start', opacity: logo, transform: `translateY(${(1 - logo) * 24}px)` }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: v ? 36 : 40, maxWidth: v ? 900 : 1700 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: fs, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.0, opacity: tit, transform: `translateY(${(1 - tit) * 40}px)`, textWrap: 'balance' }}>{producto}</div>
          <div style={{ fontSize: v ? 48 : 52, color: VERDE, fontWeight: 500, opacity: baj, transform: `translateY(${(1 - baj) * 24}px)` }}>{bajada}</div>
        </div>
        <div style={{ height: v ? 260 : 0 }} />
      </div>
    </div>
  );
}

// Rótulo de pantalla, solo en vertical: llena el aire de arriba y nombra la vista
function Caption({ T, v, items }) {
  if (!v) return null;
  return items.map(([a, b, eb, tit]) => {
    const op = Math.min(tw(T, a, a + 0.4, 0, 1), 1 - tw(T, b - 0.3, b, 0, 1));
    if (op <= 0) return null;
    return (
      <div key={tit} style={{ position: 'absolute', left: 90, right: 90, top: 150, opacity: op, transform: `translateY(${tw(T, a, a + 0.5, 30, 0)}px)` }}>
        <div style={{ fontSize: 20, letterSpacing: '0.18em', fontWeight: 600, color: GRIS.claro }}>{eb}</div>
        <div style={{ marginTop: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 72, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff' }}>{tit}</div>
      </div>
    );
  });
}

// Marca chica arriba a la izquierda; se oculta en placas negras
function Bug({ T, label, hide = [], end }) {
  let h = 0;
  hide.forEach(([a, b]) => { h = Math.max(h, tw(T, a, a + 0.3, 0, 1) * (1 - tw(T, b, b + 0.3, 0, 1))); });
  const op = tw(T, 0, 0.4, 0, 1) * (1 - tw(T, end, end + 0.3, 0, 1)) * (1 - h);
  return (
    <div style={{ position: 'absolute', left: 56, top: 44, display: 'flex', alignItems: 'center', gap: 14, opacity: op }}>
      <img src="assets/racimo-monograma.svg" style={{ width: 36, height: 36 }} />
      <div style={{ fontSize: 15, letterSpacing: '0.18em', color: GRIS.claro, fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</div>
    </div>
  );
}


// ---------- piezas comunes de pantalla ----------
const enter = (T, a, d = 24) => ({ opacity: tw(T, a, a + 0.45, 0, 1), transform: `translateY(${tw(T, a, a + 0.5, d, 0)}px)` });
const num = (T, a, b, to, from = 0) => Math.round(tw(T, a, b, from, to, MOTION.move));
function LCard({ children, style }) { return <div style={{ border: '1px solid ' + GRIS.borde, borderRadius: 16, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', boxSizing: 'border-box', ...style }}>{children}</div>; }
function Tag({ children, tone = 'g' }) {
  const m = { g: [VERDE_T, VERDE_TX], v: [VIOLETA_T, VIOLETA_TX], n: [GRIS.suave, GRIS.tx], G: [VERDE, NEGRO], V: [VIOLETA, '#fff'] }[tone];
  return <span style={{ fontSize: 13, fontWeight: 600, color: m[1], background: m[0], borderRadius: 8, padding: '5px 11px', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>{children}</span>;
}
function Stat({ label, value, sub, style, accent }) {
  return (
    <LCard style={{ gap: 8, ...style }}>
      <div style={{ fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut }}>{label}</div>
      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 44, letterSpacing: '-0.02em', lineHeight: 1, color: accent ? VIOLETA_TX : NEGRO, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      {sub && <div style={{ fontSize: 14, color: GRIS.mut }}>{sub}</div>}
    </LCard>
  );
}
function Phone({ children, w = 400, h = 820, style }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 60, background: NEGRO, border: '2px solid #242424', padding: 14, boxSizing: 'border-box', ...style }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 46, overflow: 'hidden', background: '#fff' }}>{children}</div>
    </div>
  );
}
function Browser({ url, children }) {
  return (
    <div style={{ position: 'relative', width: 1920, height: 1000, borderRadius: 28, overflow: 'hidden', background: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ height: 64, background: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 12, padding: '0 26px' }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 14, height: 14, borderRadius: 7, background: '#3a3a3a' }} />)}
        <div style={{ marginLeft: 30, height: 38, width: 620, borderRadius: 19, background: NEGRO, border: '1px solid #242424', display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 16, color: GRIS.claro }}>{url}</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 64, bottom: 0 }}>{children}</div>
    </div>
  );
}
function Img({ style, tone = 'v', icon = 'building', src, pos = 'center' }) {
  if (src) return <div style={{ backgroundColor: GRIS.suave, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: pos, ...style }} />;
  return <div style={{ background: tone === 'v' ? VIOLETA_T : VERDE_T, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}><Ic n={icon} s={40} c={tone === 'v' ? VIOLETA : VERDE_TX} w={1.5} /></div>;
}
function Head({ title, icon, sub, children }) {
  return (
    <div style={{ position: 'absolute', left: 36, right: 44, top: 30, display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <PanelTitle icon={icon}>{title}</PanelTitle>
        {sub && <div style={{ fontSize: 16, color: GRIS.mut }}>{sub}</div>}
      </div>
      <div style={{ flex: 1 }} />
      {children}
    </div>
  );
}

// Estructura estándar de la serie: Intro → A → Titulo → B → Cierre
function Std({ T, C, total, tweaks, W, H, v, keys, A, B, active, scope, overlayB, intro, cursor, producto, label, captions = [], bareA, bareB, over }) {
  const cam = camAt(T, keys(C), v);
  const b = T >= C.Titulo + 0.3;
  const appOp = tw(T, C.A - 0.25, C.A + 0.25, 0, 1);
  return (
    <React.Fragment>
      <World cam={cam} W={W} H={H}>
        <div style={{ opacity: appOp }}>
          {(b ? bareB : bareA) ? (b ? B : A) : <Shell active={active} scope={scope} overlay={b && overlayB ? overlayB : null}>{b ? B : A}</Shell>}
        </div>
      </World>
      {intro && intro(cam)}
      {over && over(cam)}
      {cursor && <Cursor T={T} cam={cam} W={W} H={H} {...cursor} />}
      <Caption T={T} v={v} items={captions} />
      <Titulo T={T} t0={C.Titulo} t1={C.B} texto={tweaks.titular} W={W} H={H} v={v} />
      <Cierre T={T} t0={C.Cierre} total={total} producto={producto} bajada={tweaks.bajada} v={v} />
      <Bug T={T} label={label} end={C.A - 0.3} />
    </React.Fragment>
  );
}

function Scene({ Piece, tweaks, W, H, v }) {
  const comp = useComposition();
  return (
    <div data-screen-label={`t=${Math.floor(comp.time)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: NEGRO, fontFamily: 'Inter, sans-serif',
      backgroundImage: tweaks.fondo === 'Trama' ? 'radial-gradient(rgba(108,99,255,0.13) 1.5px, transparent 1.6px)' : 'none', backgroundSize: '34px 34px' }}>
      <Piece T={comp.T} C={comp.CUES} total={comp.authoredTotal} tweaks={tweaks} W={W} H={H} v={v} />
    </div>
  );
}

function Video({ Piece }) {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const v = t.formato === 'Vertical';
  const W = v ? 1080 : 2560, H = v ? 1920 : 1048;
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0a0a' }}>
      <CompositionStage key={t.formato} width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={NEGRO}>
        <Scene Piece={Piece} tweaks={t} W={W} H={H} v={v} />
      </CompositionStage>
      <TweaksPanel>
        <TweakRadio label="Formato" value={t.formato} options={['Horizontal', 'Vertical']} onChange={x => setTweak('formato', x)} />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={x => setTweak('motionEditor', x)} />
        <TweakRadio label="Fondo" value={t.fondo} options={['Negro', 'Trama']} onChange={x => setTweak('fondo', x)} />
        <TweakText label="Titular (| marca el verde)" value={t.titular} onChange={x => setTweak('titular', x)} />
        <TweakText label="Bajada de cierre" value={t.bajada} onChange={x => setTweak('bajada', x)} />
      </TweaksPanel>
    </div>
  );
}

// Presenta una pantalla de mundo 1920×1000 escalada en una página de referencia
function Frame({ scale = 0.8, children }) {
  return (
    <div style={{ width: 1920 * scale, height: 1000 * scale, flex: 'none' }}>
      <div style={{ width: 1920, height: 1000, transform: `scale(${scale})`, transformOrigin: '0 0' }}>{children}</div>
    </div>
  );
}

window.RC = { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, VIOLETA_TD, GRIS, MOTION, tw, Ic, ICONS, Shell, PanelTitle, BtnVerde, BtnLinea, camAt, toStage, World, Cursor, Titulo, Cierre, Bug, Caption, Video, Frame, enter, num, LCard, Tag, Stat, Phone, Head, Std, Browser, Img };
})();
