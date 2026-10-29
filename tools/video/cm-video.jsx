// Channel Manager · video de producto para resellers (Racimo.tech)
let W = 2560, H = 1048, VERT = false;
const VERDE = '#00f068', VIOLETA = '#6c63ff', NEGRO = '#121212';
const MOTION = { enter: Easing.easeOutCubic, move: Easing.easeInOutCubic, pop: Easing.easeOutBack };
const tw = (T, s, e, from, to, ease) => animate({ from, to, start: s, end: e, ease: ease || MOTION.enter })(T);

const ICONS = {
  msg: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  cal: ["M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  cloud: ["M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"],
  mega: ["M11.6 16.8a3 3 0 1 1-5.8-1.6", "M3 11l18-5v12L3 14v-3z"],
  bank: ["M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z"],
  martini: ["M8 22h8M12 11v11M12 11l7-8H5z"],
  chart: ["M3 3v16a2 2 0 0 0 2 2h16M18 17V9M13 17V5M8 17v-3"],
  users: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"],
  spark: ["M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"],
  search: ["M21 21l-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"],
  bell: ["M10.3 21a2 2 0 0 0 3.4 0", "M3.3 15.3A1 1 0 0 0 4 17h16a1 1 0 0 0 .7-1.7C19.4 14 18 12.5 18 8a6 6 0 0 0-12 0c0 4.5-1.4 6-2.7 7.3z"],
  refresh: ["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M16 8h5V3", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M3 21v-5h5"],
  pencil: ["M15 5l4 4", "M21.17 6.81a2.83 2.83 0 0 0-4-4L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"],
  down: ["M6 9l6 6 6-6"],
  left: ["M15 18l-6-6 6-6"],
  right: ["M9 18l6-6-6-6"],
  check: ["M9 12l2 2 4-4", "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"],
  alert: ["M12 8v4M12 16h.01", "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"],
  info: ["M12 16v-4M12 8h.01", "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"],
  plus: ["M5 12h14M12 5v14"],
  dots: ["M12 5h.01M12 12h.01M12 19h.01"],
  grid: ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"],
  card: ["M2 10h20", "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"],
  arrow: ["M5 12h14M12 5l7 7-7 7"]
};
function Ic({ n, s = 20, c = '#3a3a3a', w = 2 }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', display: 'block' }}>
      {ICONS[n].map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

const OTAS = [
  { id: 'booking', nombre: 'Booking.com', logo: 'logos/booking.svg', pid: '292671', con: 'Channex' },
  { id: 'expedia', nombre: 'Expedia', logo: 'logos/expedia.svg', pid: '1231725', con: 'Channex' },
  { id: 'airbnb', nombre: 'Airbnb', logo: 'logos/airbnb.svg', pid: '4471903', con: 'Channex' },
  { id: 'despegar', nombre: 'Despegar', logo: 'logos/despegar.svg', pid: '88214', con: 'Automático', neg: true },
  { id: 'agoda', nombre: 'Agoda', logo: 'logos/agoda.svg', pid: '3820114', con: 'Automático', alto: true },
  { id: 'tripadvisor', nombre: 'Tripadvisor', logo: 'logos/tripadvisor.svg', pid: '—', con: 'Automático' },
  { id: 'hotelbeds', nombre: 'Hotelbeds', logo: 'logos/hotelbeds.png', pid: '77120', con: 'Automático' },
  { id: 'hyperguest', nombre: 'HyperGuest', logo: 'logos/hyperguest.svg', pid: '99933', con: 'Channex' }
];

function Logo({ o, h = 30 }) {
  if (o.neg) return (
    <div style={{ background: NEGRO, borderRadius: 8, padding: '7px 12px', display: 'flex' }}>
      <img src={o.logo} style={{ height: h * 0.62, display: 'block' }} />
    </div>
  );
  return <img src={o.logo} style={{ maxWidth: 170, height: o.alto ? h * 1.5 : h, objectFit: 'contain', objectPosition: 'left center', display: 'block' }} />;
}

// ---------- cámara ----------
function camAt(T, C) {
  const c = camAtH(T, C);
  if (!VERT) return c;
  const k = clamp((c.s - 0.98) / 0.4, 0, 1);
  const s = Math.max(0.56, c.s * 0.64);
  let x = 960 + (clamp(c.x, 540 / s, 1920 - 540 / s) - 960) * k;
  if (c.x < 1000 && k > 0) x = 960 + (Math.min(clamp(c.x, 540 / s, 1920 - 540 / s), 60 + 540 / s) - 960) * k;
  return { x, y: c.y + (1 - k) * 300 / s, s };
}
function camAtH(T, C) {
  const K = [
    [C.Listado, { x: 900, y: 430, s: 1.25 }],
    [C.Listado + 1.6, { x: 880, y: 450, s: 1.2 }],
    [C.Listado + 3.0, { x: 960, y: 500, s: 0.98 }],
    [C.Titulo + 0.4, { x: 960, y: 500, s: 1.0 }],
    [C.Titulo + 0.5, { x: 700, y: 300, s: 1.6 }],
    [C.Tarifas, { x: 760, y: 310, s: 1.6 }],
    [C.Tarifas + 1.4, { x: 1150, y: 260, s: 1.7 }],
    [C.Tarifas + 2.2, { x: 1400, y: 410, s: 1.5 }],
    [C.Tarifas + 4.2, { x: 1450, y: 425, s: 1.52 }],
    [C.Sync + 0.9, { x: 1300, y: 500, s: 0.9 }],
    [C.Cierre + 0.4, { x: 1270, y: 500, s: 0.93 }]
  ];
  if (T <= K[0][0]) return K[0][1];
  for (let i = 0; i < K.length - 1; i++) {
    const [t0, a] = K[i], [t1, b] = K[i + 1];
    if (T <= t1) {
      const p = MOTION.move(clamp((T - t0) / (t1 - t0), 0, 1));
      return { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p, s: a.s + (b.s - a.s) * p };
    }
  }
  return K[K.length - 1][1];
}
const toStage = (cam, wx, wy) => ({ x: W / 2 + cam.s * (wx - cam.x), y: H / 2 + cam.s * (wy - cam.y) });

// ---------- app ----------
const NAV = [['msg', 'CRM', 17], ['cal', 'Reservas', 8], ['link', 'Canales', 0, true], ['cloud', 'Operaciones'], ['mega', 'Marketing'], ['bank', 'Administra...'], ['martini', 'Servicios'], ['chart', 'RMS'], ['users', 'Huésped+'], ['spark', 'Racimo IA']];

function Chrome() {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 112, height: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ height: 92, display: 'flex', alignItems: 'center' }}><img src="assets/racimo-monograma.svg" style={{ width: 44, height: 44 }} /></div>
        {NAV.map(([ic, label, badge, act]) => (
          <div key={label} style={{ position: 'relative', width: 112, padding: '14px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, background: act ? '#1c1b3a' : 'transparent' }}>
            {act && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: VERDE }} />}
            <Ic n={ic} s={24} c={act ? '#fff' : '#b4b4b4'} />
            <div style={{ fontSize: 12, color: act ? '#fff' : '#b4b4b4', fontWeight: act ? 600 : 400 }}>{label}</div>
            {badge ? <div style={{ position: 'absolute', top: 8, left: 62, background: VIOLETA, color: '#fff', fontSize: 11, fontWeight: 600, borderRadius: 9, padding: '1px 7px' }}>{badge}</div> : null}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 112, top: 0, right: 0, height: 92, display: 'flex', alignItems: 'center', gap: 28, padding: '0 28px 0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: 492, height: 52, background: '#1a1a1a', border: '1px solid #242424', borderRadius: 14, padding: '0 18px' }}>
          <Ic n="search" c="#6e6e6e" /><div style={{ fontSize: 16, color: '#6e6e6e' }}>Buscar</div>
        </div>
        <div style={{ flex: 1 }} />
        {[['bank', 'RESELLER', 'Reseller Agencia LJ'], ['grid', 'ESTABLECIMIENTO', 'Hotel Los Álamos'], ['card', 'PUNTO DE VENTA', 'Los Álamos · Recepción']].map(([ic, k, v]) => (
          <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Ic n={ic} s={14} c="#6e6e6e" />
              <div style={{ fontSize: 11, letterSpacing: '0.14em', color: '#b4b4b4', fontWeight: 600, whiteSpace: 'nowrap' }}>{k}</div>
              <Ic n="refresh" s={13} c={VIOLETA} />
            </div>
            <div style={{ fontSize: 17, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>{v}</div>
          </div>
        ))}
        <Ic n="down" c="#b4b4b4" />
        <div style={{ position: 'relative' }}>
          <Ic n="bell" s={24} c="#fff" />
          <div style={{ position: 'absolute', top: -10, left: 11, background: VIOLETA, color: '#fff', fontSize: 11, fontWeight: 600, borderRadius: 9, padding: '1px 6px' }}>423</div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #242424', color: '#fff', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>LC</div>
      </div>
    </React.Fragment>
  );
}

function Pill({ ok, p = 1 }) {
  return (
    <span style={{ display: 'inline-block', transform: `scale(${p})`, transformOrigin: 'left center', opacity: clamp(p, 0, 1), background: ok ? '#e6fef1' : '#f0efff', borderRadius: 8, padding: '7px 14px', fontSize: 14, color: ok ? '#00863c' : '#5049cc', fontWeight: 600, whiteSpace: 'nowrap' }}>● {ok ? 'Activo' : 'Atención requerida'}</span>
  );
}

function CanalesView({ T, C }) {
  const cols = { pid: 760, con: 1010, est: 1280 };
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 36, top: 34, right: 44, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Ic n="refresh" s={26} />
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 36, letterSpacing: '-0.02em', color: NEGRO }}>Canales de venta</div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: VERDE, borderRadius: 14, padding: '16px 28px' }}>
          <Ic n="plus" c={NEGRO} /><div style={{ fontSize: 17, fontWeight: 600, whiteSpace: 'nowrap', color: NEGRO }}>Nueva Conexión</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 36, top: 120, display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 270, height: 48, border: '1px solid #e4e4e4', borderRadius: 12, padding: '0 16px' }}>
          <Ic n="search" s={18} c="#6e6e6e" /><div style={{ fontSize: 15, color: '#6e6e6e', whiteSpace: 'nowrap' }}>Buscar canal de venta...</div>
        </div>
        <div style={{ display: 'flex', gap: 4, background: '#f4f4f4', borderRadius: 12, padding: 5 }}>
          <div style={{ background: '#fff', borderRadius: 9, padding: '9px 22px', fontSize: 15, fontWeight: 600, color: NEGRO }}>Todos</div>
          <div style={{ padding: '9px 22px', fontSize: 15, color: '#6e6e6e' }}>Activos</div>
          <div style={{ padding: '9px 22px', fontSize: 15, color: '#6e6e6e', whiteSpace: 'nowrap' }}>Atención requerida</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 196, height: 30, borderBottom: '1px solid #e4e4e4', fontSize: 12, letterSpacing: '0.12em', color: '#6e6e6e', fontWeight: 600 }}>
        <div style={{ position: 'absolute', left: 0 }}>OTA</div>
        <div style={{ position: 'absolute', left: cols.pid - 36 }}>PROPERTY ID</div>
        <div style={{ position: 'absolute', left: cols.con - 36 }}>CONEXIÓN</div>
        <div style={{ position: 'absolute', left: cols.est - 36 }}>ESTADO</div>
        <div style={{ position: 'absolute', right: 0 }}>ACCIONES</div>
      </div>
      {OTAS.map((o, i) => {
        const s0 = C.Listado + 0.6 + i * 0.07;
        const op = tw(T, s0, s0 + 0.45, 0, 1);
        const dx = tw(T, s0, s0 + 0.45, 30, 0);
        const pp = tw(T, C.Listado + 1.3 + i * 0.08, C.Listado + 1.75 + i * 0.08, 0, 1, MOTION.pop);
        return (
          <div key={o.id} style={{ position: 'absolute', left: 36, right: 44, top: 230 + i * 76, height: 76, borderBottom: '1px solid #e4e4e4', opacity: op, transform: `translateX(${dx}px)` }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center' }}><Logo o={o} /></div>
            <div style={{ position: 'absolute', left: cols.pid - 36, top: 27, fontSize: 16, color: '#3a3a3a', fontVariantNumeric: 'tabular-nums' }}>{o.pid}</div>
            <div style={{ position: 'absolute', left: cols.con - 36, top: 20 }}><span style={{ background: '#f4f4f4', borderRadius: 8, padding: '7px 14px', fontSize: 14, color: '#3a3a3a' }}>{o.con}</span></div>
            <div style={{ position: 'absolute', left: cols.est - 36, top: 20 }}><Pill ok={o.id !== 'hotelbeds'} p={pp} /></div>
            <div style={{ position: 'absolute', right: 0, top: 28 }}><Ic n="dots" c="#6e6e6e" /></div>
          </div>
        );
      })}
    </div>
  );
}

const DIAS = ['lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'];
const LIBRES = [9, 0, 13, 22, 20, 22, 1, 3, 4, 9, 36, 41, 38];
const INV = [4, 0, 8, 7, 4, 8, 1, 3, 3, 8, 16, 21, 18];
const P1 = ['47,20', '47,20', '42,40', '42,40', '42,40', '52,80', '52,80', '52,80', '52,80', '52,80', '42,40', '42,40', '42,40'];
const P2 = ['59,00', '59,00', '53,00', '53,00', '53,00', '66,00', '66,00', '66,00', '66,00', '66,00', '53,00', '53,00', '53,00'];
const GX = 300, GW = 110; // columna de días dentro del panel

function Row({ top, h = 42, label, indent = 0, icon, bold, children }) {
  return (
    <div style={{ position: 'absolute', left: 36, right: 44, top, height: h }}>
      <div style={{ position: 'absolute', left: indent, top: 0, height: h, display: 'flex', alignItems: 'center', gap: 9 }}>
        {icon}
        <div style={{ fontSize: bold ? 16 : 15, color: bold ? NEGRO : '#3a3a3a', fontWeight: bold ? 600 : 400, whiteSpace: 'nowrap' }}>{label}</div>
      </div>
      {children}
    </div>
  );
}
function Cells({ vals, h = 42, render }) {
  return vals.map((v, i) => (
    <div key={i} style={{ position: 'absolute', left: GX - 36 + i * GW, width: GW, top: 0, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: NEGRO, fontVariantNumeric: 'tabular-nums' }}>{render ? render(v, i) : v}</div>
  ));
}

function TarifasView({ T, C }) {
  const wave = i => tw(T, C.Sync + 0.5 + i * 0.07, C.Sync + 0.9 + i * 0.07, 0, 1, MOTION.pop);
  const resolved = tw(T, C.Sync + 0.55, C.Sync + 0.8, 0, 1);
  const status = (i, open) => {
    const alerta = i === 1 && resolved < 1;
    const p = wave(i);
    const sc = 1 + 0.12 * Math.sin(Math.PI * clamp(p, 0, 1));
    if (open) return <div style={{ transform: `scale(${sc})`, background: alerta ? VIOLETA : VERDE, color: alerta ? '#fff' : NEGRO, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 8, width: 92, textAlign: 'center', padding: '9px 0' }}>ABIERTA</div>;
    return <div style={{ transform: `scale(${sc})`, background: alerta ? '#f0efff' : '#e6fef1', borderRadius: 8, width: 92, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n={alerta ? 'alert' : 'check'} s={19} c={alerta ? VIOLETA : '#00b34e'} /></div>;
  };
  const plan = (top, nombre) => (
    <React.Fragment>
      <Row top={top} h={56} label={nombre} bold indent={34} icon={<React.Fragment><Ic n="down" s={16} c="#6e6e6e" /><Ic n="card" s={18} c="#00b34e" /></React.Fragment>}>
        <Cells vals={DIAS} h={56} render={(v, i) => status(i, false)} />
      </Row>
      <Row top={top + 58} h={40} label="Tarifas" indent={62} icon={<Ic n="down" s={14} c="#6e6e6e" />}>
        <Cells vals={DIAS} h={40} render={() => <span style={{ fontSize: 13, color: '#6e6e6e', letterSpacing: '0.04em' }}>USD NET</span>} />
      </Row>
      <Row top={top + 98} label="1 persona" indent={86} icon={<Ic n="card" s={16} c="#6e6e6e" />}><Cells vals={P1} render={v => v + ' US$'} /></Row>
      <Row top={top + 140} label="2 personas" indent={86} icon={<Ic n="card" s={16} c="#6e6e6e" />}><Cells vals={P2} render={v => v + ' US$'} /></Row>
    </React.Fragment>
  );
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 36, top: 34, fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 36, letterSpacing: '-0.02em', color: NEGRO, whiteSpace: 'nowrap' }}>Tarifas y Disponibilidad</div>
      {[['refresh', 'Actualizar', 528], ['cal', 'Actualizar disponibilidad', 690], ['cal', 'Sincronizar masivamente', 978], ['down', 'Mas acciones', 1256]].map(([ic, l, x]) => (
        <div key={l} style={{ position: 'absolute', left: x, top: 44, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Ic n={ic} /><div style={{ fontSize: 16, color: '#3a3a3a', whiteSpace: 'nowrap' }}>{l}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', right: 44, top: 30, display: 'flex', alignItems: 'center', gap: 10, background: VERDE, borderRadius: 14, padding: '14px 26px' }}>
        <Ic n="pencil" s={19} c={NEGRO} /><div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.04em', color: NEGRO }}>EDITAR</div>
      </div>
      <div style={{ position: 'absolute', left: 36, top: 104, fontSize: 13, color: '#6e6e6e' }}>Restricciones</div>
      {[['Tarifas y Disp...', 188], ['Habitaciones', 188], ['Tarifarios', 150]].map(([l, w], i) => (
        <div key={l} style={{ position: 'absolute', left: 36 + [0, 208, 416][i], top: 126, width: w, height: 48, border: '1px solid #e4e4e4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ fontSize: 15, color: NEGRO, whiteSpace: 'nowrap' }}>{l}</div><Ic n="down" s={18} c="#6e6e6e" />
        </div>
      ))}
      <div style={{ position: 'absolute', right: 44, top: 122, height: 54, background: '#f4f4f4', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px' }}>
        <Ic n="cal" c={VIOLETA} /><div style={{ fontSize: 17 }}>10/08/2026</div><Ic n="arrow" c="#6e6e6e" /><div style={{ fontSize: 17 }}>25/08/2026</div>
      </div>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 196, height: 90 }}>
        {DIAS.map((d, i) => (
          <div key={i} style={{ position: 'absolute', left: GX - 36 + i * GW, width: GW, textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: '#6e6e6e' }}>{d}</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 28, color: NEGRO, lineHeight: 1.2 }}>{10 + i}</div>
            <div style={{ fontSize: 14, color: '#6e6e6e' }}>ago.</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 290, borderTop: '1px solid #e4e4e4' }} />
      <Row top={292} h={46} label="Habitaciones libres tot..."><Cells vals={LIBRES} h={46} /></Row>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 338, borderTop: '1px solid #e4e4e4' }} />
      <Row top={340} h={56} label="Clásica (1417)" bold icon={<React.Fragment><Ic n="down" s={16} c="#6e6e6e" /><Ic n="grid" s={19} /></React.Fragment>}>
        <Cells vals={DIAS} h={56} render={(v, i) => status(i, true)} />
      </Row>
      <Row top={398} h={46} label="Inventario" indent={34} icon={<Ic n="grid" s={17} c="#6e6e6e" />}><Cells vals={INV} h={46} /></Row>
      {plan(446, 'Flexible')}
      {plan(640, 'No reembolsable')}
    </div>
  );
}

// popover (coordenadas de mundo)
const PX = 1040, PY = 196;
const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEPT', 'OCT', 'NOV', 'DIC'];
const monthPos = (col, m) => ({ x: PX + 26 + col * 384 + 58 + (m % 3) * 117, y: PY + 94 + 28 + Math.floor(m / 3) * 56 });

function Popover({ T, C }) {
  const op = Math.min(tw(T, C.Tarifas + 1.5, C.Tarifas + 1.85, 0, 1), 1 - tw(T, C.Sync, C.Sync + 0.3, 0, 1));
  const sc = tw(T, C.Tarifas + 1.5, C.Tarifas + 1.9, 0.94, 1, MOTION.pop);
  const agoSel = tw(T, C.Tarifas + 2.45, C.Tarifas + 2.7, 0, 1, MOTION.pop);
  const k = tw(T, C.Tarifas + 2.5, C.Tarifas + 2.95, 0, 5, MOTION.move);
  const febSel = tw(T, C.Tarifas + 2.95, C.Tarifas + 3.2, 0, 1, MOTION.pop);
  const applied = tw(T, C.Tarifas + 3.7, C.Tarifas + 3.85, 0, 1);
  const cell = (year, m) => {
    const order = year === 2026 ? m - 8 : 4 + m;
    const inRange = (year === 2026 && m > 7 && order < k) || (year === 2027 && m === 0 && k > 4);
    const sel = (year === 2026 && m === 7) ? agoSel : (year === 2027 && m === 1 ? febSel : 0);
    const dim = year === 2026 && m < 7;
    return (
      <div key={m} style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {(inRange || (sel > 0.5 && ((year === 2026) || k > 4.5))) && <div style={{ position: 'absolute', inset: '0 0', background: '#f0efff' }} />}
        {sel > 0 && <div style={{ position: 'absolute', width: 50, height: 50, borderRadius: '50%', background: VIOLETA, transform: `scale(${sel})` }} />}
        <div style={{ position: 'relative', fontSize: 15, letterSpacing: '0.04em', color: sel > 0.5 ? '#fff' : (dim ? '#c8c8c8' : '#3a3a3a'), fontWeight: sel > 0.5 ? 600 : 400 }}>{MESES[m]}</div>
      </div>
    );
  };
  const col = (year, x) => (
    <div style={{ position: 'absolute', left: x, top: 26, width: 350 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40 }}>
        <Ic n="left" /><div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 24, color: NEGRO }}>{year}</div><Ic n="right" />
      </div>
      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>{MESES.map((_, m) => cell(year, m))}</div>
    </div>
  );
  const btn = 1 - 0.06 * Math.sin(Math.PI * applied);
  return (
    <div style={{ position: 'absolute', left: PX, top: PY, width: 780, height: 472, background: '#fff', border: '1px solid #e4e4e4', borderRadius: 20, opacity: op, transform: `scale(${sc})`, transformOrigin: '50% 0' }}>
      {col(2026, 26)}{col(2027, 410)}
      <div style={{ position: 'absolute', left: 26, right: 26, top: 330, background: '#f0efff', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Ic n="info" c={VIOLETA} /><div style={{ fontSize: 16, color: '#5049cc' }}>Esta acción empujará los datos existentes hacia los canales de venta conectados.</div>
      </div>
      <div style={{ position: 'absolute', left: 26, right: 26, top: 398, display: 'flex', alignItems: 'center', gap: 14 }}>
        <Ic n="cal" c="#6e6e6e" />
        <div style={{ fontSize: 17, fontWeight: 600, color: NEGRO, whiteSpace: 'nowrap' }}>{k > 4.5 ? '7 meses' : '—'}</div>
        <div style={{ fontSize: 17, color: '#3a3a3a', whiteSpace: 'nowrap' }}>{k > 4.5 ? '08/2026 → 02/2027' : ''}</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 16, color: '#6e6e6e', padding: '12px 18px' }}>Borrar</div>
        <div style={{ transform: `scale(${btn})`, background: VERDE, color: NEGRO, borderRadius: 14, padding: '15px 40px', fontSize: 16, fontWeight: 600, letterSpacing: '0.04em' }}>APLICAR</div>
      </div>
    </div>
  );
}

const CUR_CACHE = {}, CUR_PREV = {};
function rp(p) {
  if (!p.txt) return p;
  const k0 = p.txt + (p.nth || 0);
  if (CUR_CACHE[k0]) return { x: CUR_CACHE[k0].x + (p.dx || 0), y: CUR_CACHE[k0].y + (p.dy || 0) };
  const w = document.querySelector('[data-world]');
  let el = null;
  if (w) { const all = [...w.querySelectorAll('*')].filter(e => (e.textContent || '').trim() === p.txt); const leaf = all.filter(e => !all.some(o => o !== e && e.contains(o))); el = leaf[p.nth || 0]; }
  const key = p.txt + (p.nth || 0), b = CUR_CACHE[key];
  if (!el || !el.getBoundingClientRect().width) return b ? { x: b.x + (p.dx || 0), y: b.y + (p.dy || 0) } : p.fb;
  const wr = w.getBoundingClientRect(), r = el.getBoundingClientRect(), k = wr.width / 1920;
  const m = { x: (r.left + r.width / 2 - wr.left) / k, y: (r.top + r.height / 2 - wr.top) / k }, pv = CUR_PREV[key];
  CUR_PREV[key] = m;
  if (pv && Math.abs(pv.x - m.x) < 0.5 && Math.abs(pv.y - m.y) < 0.5) CUR_CACHE[key] = m;
  return { x: m.x + (p.dx || 0), y: m.y + (p.dy || 0) };
}
const rpS = () => rp({ txt: 'Sincronizar masivamente', fb: { x: 1200, y: 150 } });
function Cursor({ T, C, cam }) {
  const P = [
    [C.Tarifas + 0.5, { x: 1560, y: 760 }],
    [C.Tarifas + 1.3, rpS()],
    [C.Tarifas + 1.9, rpS()],
    [C.Tarifas + 2.35, { txt: 'AGO', nth: 0, fb: monthPos(0, 7) }],
    [C.Tarifas + 2.5, { txt: 'AGO', nth: 0, fb: monthPos(0, 7) }],
    [C.Tarifas + 2.9, { txt: 'FEB', nth: 1, fb: monthPos(1, 1) }],
    [C.Tarifas + 3.1, { txt: 'FEB', nth: 1, fb: monthPos(1, 1) }],
    [C.Tarifas + 3.6, { txt: 'APLICAR', fb: { x: PX + 674, y: PY + 420 } }],
    [C.Sync + 0.4, { txt: 'APLICAR', dx: 40, dy: 70, fb: { x: PX + 694, y: PY + 490 } }]
  ].map(([t, p]) => [t, rp(p)]);
  let pt = P[0][1];
  for (let i = 0; i < P.length - 1; i++) {
    const [t0, a] = P[i], [t1, b] = P[i + 1];
    if (T >= t0 && T <= t1) { const p = MOTION.move((T - t0) / (t1 - t0)); pt = { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p }; }
    else if (T > t1) pt = b;
  }
  const op = Math.min(tw(T, C.Tarifas + 0.4, C.Tarifas + 0.7, 0, 1), 1 - tw(T, C.Sync + 0.2, C.Sync + 0.5, 0, 1));
  const clicks = [1.4, 2.45, 2.95, 3.7].map(c => C.Tarifas + c);
  let press = 1, ring = 0, ringOp = 0;
  clicks.forEach(c => {
    if (T >= c - 0.08 && T <= c + 0.12) press = 0.82;
    const rp = clamp((T - c) / 0.45, 0, 1);
    if (T >= c && rp < 1) { ring = rp; ringOp = 1 - rp; }
  });
  const s = toStage(cam, pt.x, pt.y);
  return (
    <div style={{ position: 'absolute', left: s.x, top: s.y, opacity: op, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: -30, top: -30, width: 60, height: 60, borderRadius: '50%', border: `3px solid ${VIOLETA}`, transform: `scale(${0.4 + ring})`, opacity: ringOp }} />
      <svg width="40" height="40" viewBox="0 0 24 24" style={{ position: 'absolute', left: -6, top: -4, transform: `scale(${press})`, transformOrigin: '6px 4px' }}>
        <path d="M5 3l14 8-6.5 1.5L9.5 19z" fill={NEGRO} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function App({ T, C, cam }) {
  const op = tw(T, C.Listado - 0.1, C.Listado + 0.6, 0, 1);
  const tarifas = T >= C.Titulo + 0.45;
  return (
    <div data-world="1" style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1000, transformOrigin: '0 0', transform: `translate(${W / 2}px, ${H / 2}px) scale(${cam.s}) translate(${-cam.x}px, ${-cam.y}px)`, opacity: op }}>
      <div style={{ position: 'absolute', inset: 0, background: NEGRO, borderRadius: 28, border: '1px solid #242424', overflow: 'hidden' }}>
        <Chrome />
        <div style={{ position: 'absolute', left: 112, top: 92, right: 0, bottom: 0, background: '#fff', borderTopLeftRadius: 32, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, display: tarifas ? 'none' : 'block' }}><CanalesView T={T} C={C} /></div>
          <div style={{ position: 'absolute', inset: 0, display: tarifas ? 'block' : 'none' }}><TarifasView T={T} C={C} /></div>
        </div>
      </div>
      <Popover T={T} C={C} />
    </div>
  );
}

// ---------- escenas en pantalla ----------
const TARJ = (id) => 'assets/tarjetas-ota/tarjeta-' + id + '.png';
const introPos = () => {
  const w = 440;
  if (VERT) return [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({ x: 60 + (i % 2) * 520, y: 330 + Math.floor(i / 2) * 330, w, h: w * 432 / 732 }));
  const r1 = [250, 770, 1290, 1810].map(x => ({ x, y: 190 }));
  const r2 = [510, 1030, 1550, 2070].map(x => ({ x, y: 520 }));
  return [r1[0], r2[0], r1[1], r2[1], r1[2], r2[2], r1[3], r2[3]].map(p => ({ ...p, w, h: w * 432 / 732 }));
};

function Intro({ T, C }) {
  const camT = camAt(C.Listado + 0.9, C);
  const drift = tw(T, 0, C.Listado, 0, 1, Easing.linear);
  return OTAS.map((o, i) => {
    const p = introPos()[i];
    const s0 = 0.25 + i * 0.13;
    const inOp = tw(T, s0, s0 + 0.5, 0, 1);
    const inY = tw(T, s0, s0 + 0.6, 90, 0);
    const inS = tw(T, s0, s0 + 0.6, 0.9, 1, MOTION.pop);
    const target = toStage(camT, 112 + 36 + 90, 92 + 230 + 38 + i * 76);
    const m = tw(T, C.Listado, C.Listado + 0.9, 0, 1, MOTION.move);
    const cx0 = p.x + p.w / 2, cy0 = p.y + p.h / 2 - drift * 30;
    const cx = cx0 + (target.x - cx0) * m, cy = cy0 + (target.y - cy0) * m;
    const sc = inS * (1 + drift * 0.04) * (1 - 0.62 * m);
    const op = inOp * (1 - tw(T, C.Listado + 0.45, C.Listado + 0.9, 0, 1));
    if (op <= 0) return null;
    return <img key={o.id} src={TARJ(o.id)} style={{ position: 'absolute', left: cx - p.w / 2, top: cy - p.h / 2 + inY, width: p.w, height: p.h, opacity: op, transform: `scale(${sc})` }} />;
  });
}

function Titulo({ T, C, texto }) {
  const [a, b = ''] = texto.split('|');
  const full = a + b;
  const op = Math.min(tw(T, C.Titulo, C.Titulo + 0.35, 0, 1), 1 - tw(T, C.Tarifas, C.Tarifas + 0.4, 0, 1));
  if (op <= 0) return null;
  const line = tw(T, C.Titulo + 0.15, C.Titulo + 0.75, 0, 1, MOTION.move);
  const n = Math.floor(tw(T, C.Titulo + 0.5, C.Titulo + 1.5, 0, full.length, Easing.linear));
  const shownA = full.slice(0, Math.min(n, a.length)), shownB = n > a.length ? full.slice(a.length, n) : '';
  const caret = Math.floor(T * 3) % 2 === 0 || n < full.length;
  const push = tw(T, C.Titulo, C.Tarifas + 0.4, 1, 1.04, Easing.linear);
  return (
    <div style={{ position: 'absolute', inset: 0, background: NEGRO, opacity: op }}>
      <div style={{ position: 'absolute', left: VERT ? 90 : 200, right: VERT ? 90 : 0, top: 0, height: H, display: 'flex', alignItems: 'center', transform: `scale(${push})`, transformOrigin: '0 50%', opacity: 1 - tw(T, C.Tarifas, C.Tarifas + 0.15, 0, 1) }}>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: VERT ? 112 : 150, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff', whiteSpace: VERT ? 'normal' : 'nowrap' }}>
          {shownA}<span style={{ color: VERDE }}>{shownB}</span>
          <span style={{ display: 'inline-block', width: 8, height: VERT ? 98 : 130, background: VERDE, marginLeft: 10, verticalAlign: '-14px', opacity: caret ? 1 : 0 }} />
        </div>
      </div>
    </div>
  );
}

function SyncStack({ T, C }) {
  const vis = 1 - tw(T, C.Cierre, C.Cierre + 0.4, 0, 1);
  if (T < C.Sync || vis <= 0) return null;
  const w = VERT ? 225 : 290, h = w * 432 / 732;
  const pops = OTAS.map((_, i) => tw(T, C.Sync + 0.9 + i * 0.16, C.Sync + 1.2 + i * 0.16, 0, 1, MOTION.pop));
  const count = pops.filter(p => p > 0.5).length;
  const labOp = tw(T, C.Sync + 0.3, C.Sync + 0.7, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: vis }}>
      <div style={{ position: 'absolute', left: VERT ? 70 : 1905, top: VERT ? 1180 : 56, opacity: labOp }}>
        <div style={{ fontSize: 16, letterSpacing: '0.16em', color: count === 8 ? VERDE : '#b4b4b4', fontWeight: 600 }}>{count === 8 ? 'SINCRONIZADO' : 'SINCRONIZANDO'}</div>
        <div style={{ marginTop: 6, fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 72, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.05, fontVariantNumeric: 'tabular-nums' }}>{count}<span style={{ color: '#6e6e6e' }}> / 8 canales</span></div>
      </div>
      {OTAS.map((o, i) => {
        const s0 = C.Sync + 0.3 + i * 0.08;
        const op = tw(T, s0, s0 + 0.4, 0, 1), dx = tw(T, s0, s0 + 0.5, 60, 0);
        const x = VERT ? 50 + (i % 4) * 250 : 1880 + (i % 2) * 320, y = VERT ? 1360 + Math.floor(i / 4) * 170 : 190 + Math.floor(i / 2) * 190;
        return (
          <div key={o.id} style={{ position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, transform: `translateX(${dx}px)` }}>
            <img src={TARJ(o.id)} style={{ width: w, height: h, display: 'block' }} />
            <div style={{ position: 'absolute', right: 18, top: 4, width: 40, height: 40, borderRadius: '50%', background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pops[i]})` }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NEGRO} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Cierre({ T, C, total, bajada }) {
  const op = tw(T, C.Cierre, C.Cierre + 0.4, 0, 1);
  if (op <= 0) return null;
  const out = 1 - tw(T, total - 0.45, total - 0.05, 0, 1);
  const logo = tw(T, C.Cierre + 0.35, C.Cierre + 0.8, 0, 1);
  const tit = tw(T, C.Cierre + 0.55, C.Cierre + 1.0, 0, 1);
  const push = tw(T, C.Cierre, total, 1, 1.03, Easing.linear);
  return (
    <div style={{ position: 'absolute', inset: 0, background: NEGRO, opacity: op }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 34, opacity: out, transform: `scale(${push})` }}>
        <img src="assets/logos/svg/racimo-horizontal-blanco.svg" style={{ height: 190, opacity: logo, transform: `translateY(${(1 - logo) * 24}px)` }} />
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 104, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.1, opacity: tit, transform: `translateY(${(1 - tit) * 24}px)` }}>Channel Manager</div>
        <div style={{ fontSize: 34, color: '#b4b4b4', opacity: tit }}>{bajada}</div>
      </div>
    </div>
  );
}

function Bug({ T, C }) {
  const hide1 = tw(T, C.Listado + 0.1, C.Listado + 0.4, 0, 1) * (1 - tw(T, C.Titulo, C.Titulo + 0.3, 0, 1));
  const hide2 = tw(T, C.Tarifas, C.Tarifas + 0.2, 0, 1) * (1 - tw(T, C.Sync + 0.6, C.Sync + 0.9, 0, 1));
  const op = tw(T, 0, 0.4, 0, 1) * (1 - tw(T, C.Cierre, C.Cierre + 0.3, 0, 1)) * (1 - Math.max(hide1, hide2));
  return (
    <div style={{ position: 'absolute', left: 56, top: 44, display: 'flex', alignItems: 'center', gap: 14, opacity: op }}>
      <img src="assets/racimo-monograma.svg" style={{ width: 36, height: 36 }} />
      <div style={{ fontSize: 15, letterSpacing: '0.18em', color: '#b4b4b4', fontWeight: 600 }}>CHANNEL MANAGER</div>
    </div>
  );
}

function Piece({ tweaks }) {
  const { T, CUES: C, time, authoredTotal } = useComposition();
  const cam = camAt(T, C);
  const trama = tweaks.fondo === 'Trama';
  return (
    <div data-screen-label={`t=${Math.floor(time)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: NEGRO, fontFamily: 'Inter, sans-serif',
      backgroundImage: trama ? 'radial-gradient(rgba(108,99,255,0.13) 1.5px, transparent 1.6px)' : 'none', backgroundSize: '34px 34px' }}>
      <App T={T} C={C} cam={cam} />
      <Intro T={T} C={C} />
      <SyncStack T={T} C={C} />
      <Cursor T={T} C={C} cam={cam} />
      <Titulo T={T} C={C} texto={tweaks.titular} />
      <Cierre T={T} C={C} total={authoredTotal} bajada={tweaks.bajada} />
      <Bug T={T} C={C} />
    </div>
  );
}

function CMVideo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  VERT = t.formato === 'Vertical'; W = VERT ? 1080 : 2560; H = VERT ? 1920 : 1048;
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0a0a' }}>
      <CompositionStage key={t.formato} width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={NEGRO}>
        <Piece tweaks={t} />
      </CompositionStage>
      <TweaksPanel>
        <TweakRadio label="Formato" value={t.formato || 'Horizontal'} options={['Horizontal', 'Vertical']} onChange={v => setTweak('formato', v)} />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} />
        <TweakRadio label="Fondo" value={t.fondo} options={['Negro', 'Trama']} onChange={v => setTweak('fondo', v)} />
        <TweakText label="Titular (| marca el verde)" value={t.titular} onChange={v => setTweak('titular', v)} />
        <TweakText label="Bajada de cierre" value={t.bajada} onChange={v => setTweak('bajada', v)} />
      </TweaksPanel>
    </div>
  );
}
window.CMVideo = CMVideo;
