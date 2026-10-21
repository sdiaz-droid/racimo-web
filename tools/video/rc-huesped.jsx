// Racimo · Huésped+. Twist: el teléfono es el protagonista; la app del huésped en primer plano.
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, GRIS, MOTION, tw, Ic, BtnVerde, BtnLinea, toStage, camAt, Video, enter, num, LCard, Tag, Stat, Head, Std, Phone } = window.RC;
const SCOPE = [['bank', 'RESELLER', 'Reseller PMS'], ['grid', 'ESTABLECIMIENTO', 'Hotel Las Moras'], ['card', 'PUNTO DE VENTA', 'Las Moras · Recepción']];
const nw = { whiteSpace: 'nowrap' };
const OUT = { fontFamily: 'Outfit, sans-serif', fontWeight: 500, letterSpacing: '-0.02em', color: NEGRO };
const PH = { x: 760, y: 90, w: 400, h: 820 };
const TILES = [['check', 'Check-in online'], ['key', 'Llave digital'], ['fork', 'Room service'], ['msg', 'Chat con recepción']];

function Home({ T, s0 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '56px 22px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><div style={{ fontSize: 14, fontWeight: 600, color: GRIS.mut, letterSpacing: '0.1em' }}>HOTEL LAS MORAS</div><Ic n="bell" s={20} /></div>
      <div style={{ ...OUT, fontSize: 36 }}>Hola, Valentina</div>
      <div style={{ background: VIOLETA, borderRadius: 22, padding: '20px 22px', color: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 13, letterSpacing: '0.1em', fontWeight: 600, color: '#e0deff' }}>TU PRÓXIMA ESTADÍA</div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 26 }}>Suite 302</div>
        <div style={{ fontSize: 15 }}>Vie 14 ago → Mar 18 ago · 2 adultos</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {TILES.map(([ic, l], i) => (
          <div key={l} style={{ height: 118, borderRadius: 20, border: `${i === 0 ? 2 : 1}px solid ${i === 0 ? VERDE : GRIS.borde}`, background: i === 0 ? VERDE_T : '#fff', padding: 16, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: `scale(${i === 0 ? 1 - 0.06 * Math.sin(Math.PI * tw(T, s0 + 1.15, s0 + 1.3, 0, 1)) : 1})`, ...enter(T, s0 - 0.2 + i * 0.08, 12) }}>
            <Ic n={ic} s={24} c={i === 0 ? VERDE_TX : NEGRO} /><div style={{ fontSize: 15, fontWeight: 600, color: NEGRO }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Checkin({ T, s0 }) {
  const steps = [['user', 'Datos personales', 1.8], ['card', 'Documento escaneado', 2.15], ['pencil', 'Firma digital', 2.5]];
  const prog = tw(T, s0 + 1.7, s0 + 2.6, 0, 1, MOTION.move);
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '56px 22px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Ic n="left" /><div style={{ fontSize: 17, fontWeight: 600, color: NEGRO, ...nw }}>Check-in online</div></div>
      <div style={{ ...OUT, fontSize: 30, lineHeight: 1.15 }}>Llegá y andá directo a tu habitación</div>
      <div style={{ height: 8, borderRadius: 4, background: GRIS.suave, overflow: 'hidden' }}><div style={{ width: prog * 100 + '%', height: '100%', background: VERDE }} /></div>
      {steps.map(([ic, l, t]) => {
        const ok = T > s0 + t;
        return (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 16px', borderRadius: 18, border: '1px solid ' + GRIS.borde }}>
            <Ic n={ic} s={22} c={GRIS.mut} /><div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: NEGRO }}>{l}</div>
            <div style={{ width: 30, height: 30, borderRadius: 15, background: ok ? VERDE : GRIS.suave, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${ok ? tw(T, s0 + t, s0 + t + 0.3, 0.5, 1, MOTION.pop) : 1})` }}>{ok && <Ic n="tick" s={16} c={NEGRO} w={3} />}</div>
          </div>
        );
      })}
      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}><BtnVerde p={1 - 0.07 * Math.sin(Math.PI * tw(T, s0 + 2.75, s0 + 2.9, 0, 1))}>FINALIZAR CHECK-IN</BtnVerde></div>
    </div>
  );
}
function Llave({ T, s0 }) {
  const a = s0 + 3.1;
  const ring = i => { const p = ((T - a - i * 0.5) % 1.5) / 1.5; return T > a + i * 0.5 ? p : 0; };
  return (
    <div style={{ position: 'absolute', inset: 0, background: NEGRO, padding: '56px 22px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ alignSelf: 'stretch', fontSize: 14, fontWeight: 600, color: GRIS.claro, letterSpacing: '0.1em' }}>LLAVE DIGITAL</div>
      <div style={{ position: 'relative', width: 300, height: 300, marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {[0, 1].map(i => <div key={i} style={{ position: 'absolute', width: 300, height: 300, borderRadius: 150, border: `3px solid ${VERDE}`, transform: `scale(${0.45 + ring(i) * 0.6})`, opacity: ring(i) ? 1 - ring(i) : 0 }} />)}
        <div style={{ width: 150, height: 150, borderRadius: 75, background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${tw(T, a, a + 0.4, 0.6, 1, MOTION.pop)})` }}><Ic n="key" s={64} c={NEGRO} /></div>
      </div>
      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 40, color: '#fff' }}>Suite 302</div>
      <div style={{ fontSize: 17, color: GRIS.claro, textAlign: 'center' }}>Acercá el teléfono a la cerradura para abrir.</div>
    </div>
  );
}
function App({ T, C }) {
  const s0 = C.A;
  const p1 = tw(T, s0 + 1.35, s0 + 1.75, 0, 1, MOTION.move), p2 = tw(T, s0 + 2.95, s0 + 3.35, 0, 1, MOTION.move);
  const w = PH.w - 28;
  const chipOn = [T > s0 + 1.3 && T < s0 + 3.0, T > s0 + 3.0, false, false];
  const CH = [[-1, 300], [-1, 520], [1, 300], [1, 520]];
  return (
    <div style={{ position: 'relative', width: 1920, height: 1000 }}>
      {TILES.map(([ic, l], i) => {
        const [side, y] = CH[i], on = chipOn[i];
        return (
          <div key={l} style={{ position: 'absolute', top: y, [side < 0 ? 'right' : 'left']: side < 0 ? 1920 - PH.x + 60 : PH.x + PH.w + 60, height: 76, display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px', borderRadius: 38, background: on ? VERDE : '#1a1a1a', border: '1px solid ' + (on ? VERDE : '#242424'), ...enter(T, s0 + 0.1 + i * 0.12, 16) }}>
            <Ic n={ic} s={24} c={on ? NEGRO : '#fff'} /><div style={{ fontSize: 20, fontWeight: 600, color: on ? NEGRO : '#fff', ...nw }}>{l}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: PH.x, top: PH.y }}>
        <Phone w={PH.w} h={PH.h}>
          <div style={{ position: 'absolute', inset: 0, transform: `translateX(${-(p1 + p2) * w}px)` }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: '100%' }}><Home T={T} s0={s0} /></div>
            <div style={{ position: 'absolute', left: w, top: 0, width: w, height: '100%' }}><Checkin T={T} s0={s0} /></div>
            <div style={{ position: 'absolute', left: 2 * w, top: 0, width: w, height: '100%' }}><Llave T={T} s0={s0} /></div>
          </div>
        </Phone>
      </div>
    </div>
  );
}

const ARR = [['Valentina Acosta', 'Suite 302', '14/08 → 18/08'], ['Mateo Galarza', 'Doble 218', '14/08 → 16/08'], ['Camila Ferreyra', 'Clásica 104', '14/08 → 18/08'], ['Ignacio Peralta', 'Superior 203', '14/08 → 17/08'], ['Renata Ovalle', 'Suite 301', '14/08 → 20/08'], ['Bruno Saavedra', 'Clásica 102', '14/08 → 15/08']];
const ST = [['Check-in completo', 'G'], ['Check-in completo', 'g'], ['Documento pendiente', 'v'], ['Check-in completo', 'g'], ['Sin iniciar', 'n'], ['Check-in completo', 'g']];
function Panel({ T, C }) {
  const s0 = C.B, up = s0 + 1.0;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Huésped+" icon="users" sub="Check-in online, llave digital y pedidos desde la app del hotel."><BtnLinea icon="qr">QR de la app</BtnLinea></Head>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 140, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 18 }}>
        <Stat label="CHECK-IN ONLINE · HOY" value={(T > up ? 12 : 11) + ' de 15'} sub="Arribos con check-in completo" accent={T > up} />
        <Stat label="LLAVES DIGITALES ACTIVAS" value={T > up ? 38 : 37} sub="Habitaciones sin tarjeta física" />
        <Stat label="PEDIDOS DESDE LA APP · HOY" value={num(T, s0 + 0.4, s0 + 1.6, 27)} sub="Room service y servicios" />
      </div>
      {ARR.map(([n, r, d], i) => {
        const st = i === 0 && T < up ? ['Documento pendiente', 'v'] : ST[i];
        const hi = i === 0 ? `rgba(0,240,104,${T > up ? 0.14 * (1 - tw(T, up + 1.2, up + 2.2, 0, 1)) : 0})` : 'transparent';
        return (
          <div key={n} style={{ position: 'absolute', left: 36, right: 44, top: 320 + i * 84, height: 84, borderBottom: '1px solid ' + GRIS.suave, background: hi, ...enter(T, s0 - 0.2 + i * 0.06, 14) }}>
            <div style={{ position: 'absolute', left: 16, top: 28, fontSize: 18, fontWeight: 600, color: NEGRO, ...nw }}>{n}</div>
            <div style={{ position: 'absolute', left: 460, top: 30, fontSize: 16, color: GRIS.tx }}>{r}</div>
            <div style={{ position: 'absolute', left: 720, top: 30, fontSize: 16, color: GRIS.tx }}>{d}</div>
            <div style={{ position: 'absolute', left: 1000, top: 26, transform: `scale(${i === 0 && T > up ? tw(T, up, up + 0.35, 0.7, 1, MOTION.pop) : 1})`, transformOrigin: 'left center' }}><Tag tone={st[1]}>{st[0]}</Tag></div>
            <div style={{ position: 'absolute', left: 1320, top: 26 }}>{st[0] === 'Check-in completo' ? <Tag tone="v">Llave enviada</Tag> : <span style={{ color: GRIS.claro }}>—</span>}</div>
          </div>
        );
      })}
    </div>
  );
}

const tap1 = { txt: 'Check-in online', fb: { x: PH.x + 116, y: PH.y + 314 } }, tap2 = { txt: 'FINALIZAR CHECK-IN', fb: { x: PH.x + PH.w / 2, y: PH.y + 614 } };
const keys = C => [
  [C.A - 0.3, { x: 960, y: 500, s: 1.0 }, { x: 960, y: 500, s: 0.95 }],
  [C.A + 1.0, { x: 960, y: 500, s: 1.18 }, { x: 960, y: 500, s: 1.6 }],
  [C.A + 3.9, { x: 960, y: 500, s: 1.22 }, { x: 960, y: 500, s: 1.65 }],
  [C.A + 4.5, { x: 960, y: 500, s: 1.0 }, { x: 960, y: 500, s: 1.2 }],
  [C.Titulo + 0.3, { x: 760, y: 470, s: 1.4 }, { x: 560, y: 470, s: 1.1 }],
  [C.B + 1.8, { x: 900, y: 520, s: 1.35 }, { x: 900, y: 560, s: 1.1 }],
  [C.B + 2.8, { x: 1300, y: 520, s: 1.35 }, { x: 1300, y: 560, s: 1.1 }],
  [C.B + 3.8, { x: 960, y: 500, s: 0.98 }]
];
function Piece(P) {
  const { T, C, W, H, v } = P;
  const intro = () => {
    const op = 1 - tw(T, C.A - 0.4, C.A, 0, 1);
    if (op <= 0) return null;
    const ic = tw(T, 0.2, 0.7, 0, 1, MOTION.pop);
    const NOTIS = [['users', 'Tu check-in está listo para completar.', 'ahora'], ['key', 'Tu llave digital ya está activa. Habitación 204.', '1 min'], ['martini', 'Desayuno confirmado para mañana a las 8:30.', '2 min']];
    const cen = (n, s, c, w) => <div style={{ transform: `translateX(${s * 0.125}px)`, display: 'flex' }}><Ic n={n} s={s} c={c} w={w} /></div>;
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: op }}>
        <div style={{ width: 200, height: 200, borderRadius: 56, background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${ic})` }}>{cen('users', 100, NEGRO, 1.8)}</div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 80, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff', opacity: tw(T, 0.5, 0.9, 0, 1) }}>Huésped+</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 760, maxWidth: W - 120 }}>
          {NOTIS.map(([icn, txt, t], i) => {
            const nt = tw(T, 0.7 + i * 0.2, 1.05 + i * 0.2, 0, 1, MOTION.move);
            return (
              <div key={i} style={{ background: '#1a1a1a', border: '1px solid #242424', borderRadius: 24, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16, boxSizing: 'border-box', opacity: nt, transform: `translateY(${(1 - nt) * 40}px)` }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{icn === 'users' ? cen('users', 26, NEGRO) : <Ic n={icn} s={26} c={NEGRO} />}</div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 19, fontWeight: 600, color: '#fff' }}>Hotel Las Moras</div><div style={{ fontSize: 18, color: GRIS.claro }}>{txt}</div></div>
                <div style={{ fontSize: 15, color: '#6e6e6e', flex: 'none' }}>{t}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return <Std {...P} keys={keys} active="Huésped+" scope={SCOPE} label="HUÉSPED+" producto="Huésped+ · GuestApp" bareA A={<App T={T} C={C} />} B={<Panel T={T} C={C} />} intro={intro}
    cursor={{ vis: [C.A + 0.6, C.A + 3.1], path: [[C.A + 0.6, { x: 1250, y: 900 }], [C.A + 1.1, tap1], [C.A + 1.3, tap1], [C.A + 2.65, tap2], [C.A + 3.3, { txt: 'FINALIZAR CHECK-IN', fb: { x: PH.x + PH.w / 2, y: PH.y + 614 }, dx: 40, dy: 80 }]], clicks: [C.A + 1.2, C.A + 2.8] }}
    captions={[[C.A + 0.3, C.Titulo, 'APP DEL HUÉSPED', 'Check-in y llave digital'], [C.B + 0.2, C.Cierre, 'EN RACIMO', 'Arribos del día']]} />;
}
window.RC_HUESPED = { Video: () => <Video Piece={Piece} /> };
})();
