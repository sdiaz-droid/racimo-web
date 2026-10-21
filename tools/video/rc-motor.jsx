// Racimo · Motor de reservas. Twist: el rango de fechas se marca en un calendario que aterriza en el buscador.
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, GRIS, MOTION, tw, Ic, BtnVerde, BtnLinea, toStage, camAt, Video, enter, num, LCard, Tag, Stat, Head, Std, Browser, Img } = window.RC;
const SCOPE = [['bank', 'RESELLER', 'Reseller PMS'], ['grid', 'ESTABLECIMIENTO', 'Hotel Las Moras'], ['card', 'PUNTO DE VENTA', 'Las Moras · Web']];
const ROOMS = [['Clásica', '1 cama doble · 22 m² · desayuno incluido', 95], ['Suite Las Moras', 'Cama king · balcón · 38 m² · desayuno incluido', 130], ['Superior', '2 camas · vista a la montaña · 28 m²', 110]];
const Y0 = 64;
const nw = { whiteSpace: 'nowrap' };

function Motor({ T, C }) {
  const s0 = C.A, sel = s0 + 1.35, conf = s0 + 2.75;
  const chosen = T > sel, done = T > conf;
  const fld = (k, v, i) => (
    <div key={k} style={{ flex: 1, padding: '0 28px', borderLeft: i ? '1px solid ' + GRIS.borde : 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 13, letterSpacing: '0.1em', fontWeight: 600, color: GRIS.mut }}>{k}</div>
      <div style={{ fontSize: 20, fontWeight: 600, color: NEGRO, ...nw }}>{v}</div>
    </div>
  );
  return (
    <Browser url="reservas.hotellasmoras.com">
      <div style={{ position: 'absolute', left: 80, right: 80, top: 34, display: 'flex', alignItems: 'center', gap: 36 }}>
        <div><div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 40, letterSpacing: '-0.02em', color: NEGRO }}>Hotel Las Moras</div><div style={{ fontSize: 16, color: GRIS.mut }}>Mendoza · Argentina</div></div>
        <div style={{ flex: 1 }} />
        {['Habitaciones', 'Servicios', 'Ubicación', 'Contacto'].map(x => <div key={x} style={{ fontSize: 17, color: GRIS.tx }}>{x}</div>)}
        <div style={{ fontSize: 15, color: GRIS.mut }}>ES · USD</div>
      </div>
      <div style={{ position: 'absolute', left: 80, right: 80, top: 156, height: 92, border: '1px solid ' + GRIS.borde, borderRadius: 20, display: 'flex', alignItems: 'center', paddingRight: 14 }}>
        {fld('LLEGADA', 'Vie 14 ago 2026', 0)}{fld('SALIDA', 'Mar 18 ago 2026', 1)}{fld('HUÉSPEDES', '2 adultos', 2)}
        <BtnVerde icon="search">BUSCAR</BtnVerde>
      </div>
      <div style={{ position: 'absolute', left: 80, top: 280, fontSize: 17, color: GRIS.tx }}>3 habitaciones disponibles · 4 noches · mejor precio garantizado en la web oficial</div>
      {ROOMS.map(([n, f, p], i) => {
        const on = chosen && i === 1;
        return (
          <div key={n} style={{ position: 'absolute', left: 80, width: 1160, top: 320 + i * 196, height: 180, border: `${on ? 2 : 1}px solid ${on ? VIOLETA : GRIS.borde}`, borderRadius: 20, overflow: 'hidden', display: 'flex', boxSizing: 'border-box', ...enter(T, s0 - 0.1 + i * 0.1) }}>
            <Img style={{ width: 280, height: '100%', flex: 'none' }} src={['assets/fotos/cabana-patagonia.jpg', 'assets/fotos/tina-lago.jpg', 'assets/fotos/domos-vinedo.jpg', 'assets/fotos/bata-deck.jpg'][i % 4]} />
            <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 28, color: NEGRO }}>{n}</div>
              <div style={{ fontSize: 16, color: GRIS.mut, ...nw }}>{f}</div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}><Tag>Cancelación flexible</Tag>{i === 1 && <Tag tone="v">Quedan 2</Tag>}</div>
            </div>
            <div style={{ width: 250, padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'right' }}><div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 36, color: NEGRO, ...nw }}>US$ {p}</div><div style={{ fontSize: 14, color: GRIS.mut }}>por noche</div></div>
              {on ? <Tag tone="V">Elegida</Tag> : <BtnVerde p={i === 1 ? 1 - 0.08 * Math.sin(Math.PI * tw(T, sel - 0.1, sel + 0.05, 0, 1)) : 1}>RESERVAR</BtnVerde>}
            </div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 1280, right: 80, top: 320, height: 572, borderRadius: 20, background: done ? VERDE_T : '#fafafa', border: '1px solid ' + GRIS.borde, padding: '30px 32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 28, color: NEGRO }}>{done ? 'Reserva confirmada' : 'Tu reserva'}</div>
        {!chosen && <div style={{ fontSize: 17, color: GRIS.mut }}>Elegí una habitación para continuar.</div>}
        {chosen && [['grid', 'Suite Las Moras'], ['cal', '14/08 → 18/08 · 4 noches'], ['users', '2 adultos'], ['tag', 'Tarifa flexible · desayuno']].map(([ic, t], i) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 18, color: NEGRO, ...enter(T, sel + 0.05 + i * 0.07, 12) }}><Ic n={ic} s={20} c={GRIS.mut} /><span style={nw}>{t}</span></div>
        ))}
        {chosen && <div style={{ marginTop: 'auto', borderTop: '1px solid ' + GRIS.borde, paddingTop: 18, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', ...enter(T, sel + 0.35, 12) }}><div style={{ fontSize: 17, color: GRIS.tx }}>Total</div><div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 44, color: NEGRO }}>US$ 520</div></div>}
        {chosen && !done && <div style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'center', ...enter(T, sel + 0.45, 12) }}><BtnVerde p={1 - 0.06 * Math.sin(Math.PI * tw(T, conf - 0.1, conf + 0.05, 0, 1))}>CONFIRMAR RESERVA</BtnVerde></div>}
        {done && <div style={{ display: 'flex', alignItems: 'center', gap: 12, transform: `scale(${tw(T, conf, conf + 0.4, 0.7, 1, MOTION.pop)})`, transformOrigin: 'left center' }}><div style={{ width: 44, height: 44, borderRadius: 22, background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n="tick" s={24} c={NEGRO} w={3} /></div><div style={{ fontSize: 18, fontWeight: 600, color: NEGRO }}>#MR-20931 · pago con tarjeta</div></div>}
      </div>
    </Browser>
  );
}

const RES = [['Tomás Bidegain', 'Doble 218', '13/08 → 14/08', 'logos/booking.svg', 'Confirmada', 'US$ 110'], ['Camila Ferreyra', 'Clásica 104', '14/08 → 18/08', 'logos/expedia.svg', 'Confirmada', 'US$ 380'], ['Ignacio Peralta', 'Superior 203', '15/08 → 17/08', null, 'Confirmada', 'US$ 220'], ['Renata Ovalle', 'Suite 301', '16/08 → 20/08', 'logos/airbnb.svg', 'Pendiente', 'US$ 540'], ['Bruno Saavedra', 'Clásica 102', '17/08 → 19/08', 'logos/despegar.svg', 'Confirmada', 'US$ 190'], ['Malena Ruiz Díaz', 'Superior 205', '18/08 → 22/08', null, 'Confirmada', 'US$ 440']];
function Reservas({ T, C }) {
  const s0 = C.B, ins = s0 + 1.0;
  const push = tw(T, ins, ins + 0.5, 0, 1, MOTION.move);
  const cols = [['HUÉSPED', 0], ['HABITACIÓN', 460], ['FECHAS', 720], ['CANAL', 1000], ['ESTADO', 1300], ['TOTAL', 1560]];
  const row = (r, y, extra, hi) => (
    <div key={r[0]} style={{ position: 'absolute', left: 36, right: 44, top: y, height: 72, borderBottom: '1px solid ' + GRIS.suave, background: hi, ...extra }}>
      <div style={{ position: 'absolute', left: 16, top: 24, fontSize: 17, fontWeight: 600, color: NEGRO, ...nw }}>{r[0]}</div>
      <div style={{ position: 'absolute', left: 460, top: 24, fontSize: 16, color: GRIS.tx, ...nw }}>{r[1]}</div>
      <div style={{ position: 'absolute', left: 720, top: 24, fontSize: 16, color: GRIS.tx, ...nw }}>{r[2]}</div>
      <div style={{ position: 'absolute', left: 1000, top: 22 }}>{r[3] === 'direct' ? <Tag tone="G">Motor de reservas</Tag> : r[3] ? <img src={r[3]} style={{ height: 24, display: 'block', maxWidth: 150, objectFit: 'contain' }} /> : <Tag>Motor de reservas</Tag>}</div>
      <div style={{ position: 'absolute', left: 1300, top: 22 }}><Tag tone={r[4] === 'Pendiente' ? 'v' : 'g'}>{r[4]}</Tag></div>
      <div style={{ position: 'absolute', left: 1560, top: 20, fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 22, color: NEGRO, ...nw }}>{r[5]}</div>
    </div>
  );
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Reservas" icon="cal" sub="Todas las reservas del establecimiento, de todos los canales."><BtnLinea icon="settings">Filtrar</BtnLinea><BtnVerde icon="plus">NUEVA RESERVA</BtnVerde></Head>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 140, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 18 }}>
        <Stat label="RESERVAS DIRECTAS · AGOSTO" value={T > ins ? 135 : 134} accent={T > ins} sub="Desde la web oficial del hotel" />
        <Stat label="INGRESOS DIRECTOS · AGOSTO" value={'US$ ' + (T > ins ? '48.840' : '48.320')} accent={T > ins} sub="Sin comisión de intermediarios" />
        <Stat label="PRÓXIMOS ARRIBOS" value="12" sub="En los próximos 7 días" />
      </div>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 296, height: 40, borderBottom: '1px solid ' + GRIS.borde }}>
        {cols.map(([l, x]) => <div key={l} style={{ position: 'absolute', left: x + 16, top: 12, fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut }}>{l}</div>)}
      </div>
      {T > ins && row(['Valentina Acosta', 'Suite 302', '14/08 → 18/08', 'direct', 'Confirmada', 'US$ 520'], 340, { opacity: push, transform: `translateX(${(1 - push) * -60}px)` }, `rgba(0,240,104,${0.14 * (1 - tw(T, ins + 1.2, ins + 2.4, 0, 1))})`)}
      {RES.map((r, i) => row(r, 340 + (i + push) * 72, enter(T, s0 - 0.2 + i * 0.05, 14)))}
    </div>
  );
}

const DOW = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
function Calendario({ T }) {
  const a = 14, b = 18;
  return (
    <div style={{ width: 700, background: '#1a1a1a', border: '1px solid #242424', borderRadius: 28, padding: '34px 38px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Ic n="left" c={GRIS.claro} /><div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 34, color: '#fff' }}>Agosto 2026</div><Ic n="right" c={GRIS.claro} /></div>
      <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 6 }}>
        {DOW.map((d, i) => <div key={'d' + i} style={{ textAlign: 'center', fontSize: 15, color: GRIS.mut, paddingBottom: 8 }}>{d}</div>)}
        {Array.from({ length: 5 }).map((_, i) => <div key={'e' + i} />)}
        {Array.from({ length: 31 }).map((_, i) => {
          const d = i + 1, k = d - a, t = 0.7 + k * 0.16;
          const inR = d >= a && d <= b && T > t, edge = d === a || d === b;
          const p = inR ? tw(T, t, t + 0.3, 0, 1, MOTION.pop) : 0;
          return (
            <div key={d} style={{ position: 'relative', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {inR && !edge && <div style={{ position: 'absolute', inset: '6px -1px', background: '#1c1b3a', opacity: p }} />}
              {inR && edge && <div style={{ position: 'absolute', width: 56, height: 56, borderRadius: 28, background: VERDE, transform: `scale(${p})` }} />}
              <div style={{ position: 'relative', fontSize: 20, fontWeight: inR ? 700 : 400, color: inR && edge ? NEGRO : d < a - 3 ? '#555' : '#fff' }}>{d}</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 14, opacity: tw(T, 1.5, 1.8, 0, 1) }}>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 44, color: VERDE }}>{num(T, 1.4, 1.9, 4)} noches</div>
        <div style={{ fontSize: 18, color: GRIS.claro }}>14 → 18 de agosto</div>
      </div>
    </div>
  );
}

const keys = C => [
  [C.A - 0.3, { x: 560, y: 300, s: 1.6 }, { x: 460, y: 300, s: 1.3 }],
  [C.A + 0.9, { x: 780, y: 560, s: 1.25 }, { x: 680, y: 600, s: 0.85 }],
  [C.A + 1.7, { x: 1350, y: 620, s: 1.4 }, { x: 1560, y: 620, s: 1.3 }],
  [C.A + 3.1, { x: 1350, y: 620, s: 1.4 }, { x: 1560, y: 620, s: 1.3 }],
  [C.A + 4.0, { x: 960, y: 500, s: 0.98 }],
  [C.Titulo + 0.3, { x: 700, y: 330, s: 1.5 }, { x: 560, y: 420, s: 1.05 }],
  [C.B + 1.0, { x: 900, y: 470, s: 1.45 }, { x: 800, y: 480, s: 1.0 }],
  [C.B + 2.4, { x: 1300, y: 480, s: 1.45 }, { x: 1400, y: 480, s: 1.1 }],
  [C.B + 3.6, { x: 960, y: 500, s: 0.98 }]
];
function Piece(P) {
  const { T, C, W, H, v } = P;
  const intro = () => {
    const m = tw(T, C.A - 0.55, C.A + 0.15, 0, 1, MOTION.move);
    const op = 1 - tw(T, C.A - 0.05, C.A + 0.2, 0, 1);
    if (op <= 0) return null;
    const tg = toStage(camAt(C.A, keys(C), v), W, H, 400, Y0 + 202);
    const sc = (v ? 1.3 : 1.15) * tw(T, 0.1, 0.6, 0.92, 1, MOTION.pop) * (1 - 0.7 * m);
    return <div style={{ position: 'absolute', left: W / 2 + (tg.x - W / 2) * m, top: H / 2 + (tg.y - H / 2) * m, opacity: op * tw(T, 0.05, 0.4, 0, 1), transform: `translate(-50%,-50%) scale(${sc})` }}><Calendario T={T} /></div>;
  };
  const s0 = C.A;
  const r1 = { txt: 'RESERVAR', nth: 1, fb: { x: 1160, y: Y0 + 661 } }, cf = { txt: 'CONFIRMAR RESERVA', fb: { x: 1560, y: Y0 + 790 } };
  return <Std {...P} keys={keys} active="Reservas" scope={SCOPE} label="MOTOR DE RESERVAS" producto="Motor de Reservas" bareA
    A={<Motor T={T} C={C} />} B={<Reservas T={T} C={C} />} intro={intro}
    cursor={{ vis: [s0 + 0.5, s0 + 3.1], path: [[s0 + 0.5, { x: 700, y: 900 }], [s0 + 1.2, r1], [s0 + 1.45, r1], [s0 + 2.5, cf], [s0 + 3.3, { txt: 'CONFIRMAR RESERVA', dx: 50, dy: 80 }]], clicks: [s0 + 1.3, s0 + 2.7] }}
    captions={[[C.A + 0.3, C.Titulo, 'WEB DEL HOTEL', 'Motor de reservas'], [C.B + 0.2, C.Cierre, 'EN RACIMO', 'Reservas']]} />;
}
window.RC_MOTOR = { Video: () => <Video Piece={Piece} /> };
})();
