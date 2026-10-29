// Racimo · Publicidad para hoteles (Hotel Ads + Racimo Ads). Twist: todo arranca con una búsqueda tipeada.
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, GRIS, MOTION, tw, Ic, BtnVerde, BtnLinea, toStage, camAt, Video, enter, num, LCard, Tag, Stat, Head, Std, Browser, Img } = window.RC;
const SCOPE = [['bank', 'RESELLER', 'Reseller Marketing'], ['grid', 'ESTABLECIMIENTO', 'Hotel Las Moras'], ['card', 'PUNTO DE VENTA', 'Las Moras · Marketing']];
const nw = { whiteSpace: 'nowrap' };
const Q = 'hotel en chacras de coria';
const PRICES = [[null, 'Sitio oficial', 130], ['logos/booking.svg', 'Booking.com', 142], ['logos/expedia.svg', 'Expedia', 145], ['logos/despegar.svg', 'Despegar', 148]];
const OTHERS = [['Posada del Olivo', '4,5', 118], ['Finca Los Sauces', '4,6', 156], ['Hostería Cordón', '4,3', 92]];
const ROWY = 64 + 300;

function Busqueda({ T, C }) {
  const s0 = C.A, click = s0 + 2.4;
  return (
    <Browser url="buscador · hotel en chacras de coria">
      <div style={{ position: 'absolute', left: 80, top: 34, width: 820, height: 64, borderRadius: 32, border: '1px solid ' + GRIS.borde, display: 'flex', alignItems: 'center', gap: 14, padding: '0 26px' }}><Ic n="search" c={GRIS.mut} /><div style={{ fontSize: 20, color: NEGRO }}>{Q}</div></div>
      <div style={{ position: 'absolute', left: 80, top: 124, display: 'flex', gap: 10 }}>{['Hoteles', '14 → 18 ago', '2 adultos', 'Precio'].map((x, i) => <div key={x} style={{ whiteSpace: 'nowrap', fontSize: 15, padding: '8px 16px', borderRadius: 20, border: '1px solid ' + GRIS.borde, background: i === 0 ? VIOLETA_T : '#fff', color: i === 0 ? VIOLETA_TX : GRIS.tx }}>{x}</div>)}</div>
      <LCard style={{ position: 'absolute', left: 80, top: 190, width: 1060, gap: 18, border: `2px solid ${VIOLETA}`, ...enter(T, s0 - 0.2, 20) }}>
        <div style={{ display: 'flex', gap: 22 }}>
          <Img style={{ width: 220, height: 150, borderRadius: 14, flex: 'none' }} src="assets/fotos/domos-vinedo.jpg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 32, color: NEGRO }}>Hotel Las Moras</div><Tag tone="n">Anuncio</Tag></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, color: GRIS.tx }}>{[0, 1, 2, 3, 4].map(i => <Ic key={i} n="star" s={16} c={VERDE_TX} />)}<span style={{ marginLeft: 6 }}>4,8 · 1.204 opiniones</span></div>
            <div style={{ fontSize: 16, color: GRIS.mut }}>Hotel boutique · Chacras de Coria, Mendoza · desayuno incluido</div>
          </div>
        </div>
        {PRICES.map(([logo, l, p], i) => {
          const a = s0 + 0.3 + i * 0.12, of = i === 0;
          const hit = of && T > click, pr = of ? 1 - 0.04 * Math.sin(Math.PI * tw(T, click - 0.1, click + 0.05, 0, 1)) : 1;
          return (
            <div key={l} style={{ height: 70, borderRadius: 14, border: `${of ? 2 : 1}px solid ${of ? VERDE : GRIS.borde}`, background: hit ? VERDE_T : '#fff', display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', boxSizing: 'border-box', transform: `scale(${pr})`, ...enter(T, a, 12) }}>
              {logo ? (logo.includes('despegar') ? <div style={{ width: 150 }}><div style={{ display: 'inline-flex', background: NEGRO, borderRadius: 8, padding: '7px 12px' }}><img src={logo} style={{ height: 18, display: 'block' }} /></div></div> : <img src={logo} style={{ height: 24, width: 150, objectFit: 'contain', objectPosition: 'left center' }} />) : <div style={{ width: 150 }}><Tag tone="G">Sitio oficial</Tag></div>}
              <div style={{ fontSize: 16, color: GRIS.mut, flex: 1, ...nw }}>{of ? (hit ? 'Abriendo reservas.hotellasmoras.com…' : 'Reserva directa · cancelación flexible') : 'Tarifa estándar'}</div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 30, color: NEGRO, ...nw }}>US$ {p}</div>
              {of && <Tag tone="v">Mejor precio</Tag>}
            </div>
          );
        })}
      </LCard>
      {OTHERS.map(([n, r, p], i) => (
        <LCard key={n} style={{ position: 'absolute', left: 1180, width: 660, top: 190 + i * 150, height: 132, flexDirection: 'row', alignItems: 'center', gap: 18, ...enter(T, s0 + 0.2 + i * 0.1, 14) }}>
          <Img style={{ width: 110, height: 88, borderRadius: 12, flex: 'none' }} src={['assets/fotos/tina-noche.jpg', 'assets/fotos/cabana-lago.jpg', 'assets/fotos/piscina-finca.jpg', 'assets/fotos/ecolodge.jpg'][i % 4]} />
          <div style={{ flex: 1 }}><div style={{ fontSize: 19, fontWeight: 600, color: NEGRO }}>{n}</div><div style={{ fontSize: 15, color: GRIS.mut }}>{r} · Chacras de Coria</div></div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 26, color: GRIS.tx }}>US$ {p}</div>
        </LCard>
      ))}
      <Img style={{ position: 'absolute', left: 1180, width: 660, top: 650, height: 250, borderRadius: 20 }} src="assets/fotos/restaurante.jpg" pos="center 45%" />
    </Browser>
  );
}

const CAMP = [['Hotel Ads · metabuscador', 3920, 96, '9,1x'], ['Racimo Ads · búsqueda', 1840, 34, '7,6x'], ['Racimo Ads · remarketing', 550, 12, '6,2x']];
function Ads({ T, C }) {
  const s0 = C.B;
  const wk = [38, 44, 41, 52, 58, 63, 70, 78];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Racimo Ads" icon="chart" sub="Hotel Ads y campañas de búsqueda, gestionadas desde Racimo."><BtnLinea icon="cal">Últimos 60 días</BtnLinea><BtnVerde icon="plus">NUEVA CAMPAÑA</BtnVerde></Head>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 140, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 18 }}>
        <Stat label="IMPRESIONES" value={num(T, s0 + 0.2, s0 + 1.4, 184200).toLocaleString('es-AR')} sub="En buscadores y mapas" />
        <Stat label="CLICS" value={num(T, s0 + 0.3, s0 + 1.5, 6310).toLocaleString('es-AR')} sub="Hacia la web oficial" />
        <Stat label="RESERVAS" value={num(T, s0 + 0.4, s0 + 1.6, 142)} sub="Directas, sin comisión" accent />
        <Stat label="RETORNO (ROAS)" value={(num(T, s0 + 0.5, s0 + 1.7, 84) / 10).toFixed(1).replace('.', ',') + 'x'} sub="Ingreso por dólar invertido" />
      </div>
      <LCard style={{ position: 'absolute', left: 36, width: 760, top: 320, height: 560 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut }}>RESERVAS POR SEMANA</div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 22, paddingTop: 20 }}>
          {wk.map((h, i) => <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}><div style={{ width: '100%', height: h * 5 * tw(T, s0 + 0.5 + i * 0.08, s0 + 1.0 + i * 0.08, 0, 1, MOTION.move), borderRadius: 10, background: i === wk.length - 1 ? VERDE : VIOLETA_T }} /><div style={{ fontSize: 13, color: GRIS.mut }}>S{i + 1}</div></div>)}
        </div>
      </LCard>
      <div style={{ position: 'absolute', left: 820, right: 44, top: 320, height: 40, borderBottom: '1px solid ' + GRIS.borde, fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut }}>
        {[['CAMPAÑA', 0], ['CLICS', 440], ['RESERVAS', 580], ['ROAS', 740]].map(([l, x]) => <div key={l} style={{ position: 'absolute', left: x + 16, top: 12 }}>{l}</div>)}
      </div>
      {CAMP.map(([n, c, r, ro], i) => (
        <div key={n} style={{ position: 'absolute', left: 820, right: 44, top: 362 + i * 96, height: 96, borderBottom: '1px solid ' + GRIS.suave, ...enter(T, s0 + 0.8 + i * 0.12, 14) }}>
          <div style={{ position: 'absolute', left: 16, top: 22 }}><div style={{ fontSize: 18, fontWeight: 600, color: NEGRO, ...nw }}>{n}</div><div style={{ marginTop: 6 }}><Tag>● Activa</Tag></div></div>
          <div style={{ position: 'absolute', left: 456, top: 34, fontSize: 18, color: NEGRO, fontVariantNumeric: 'tabular-nums' }}>{num(T, s0 + 0.9, s0 + 2.0, c).toLocaleString('es-AR')}</div>
          <div style={{ position: 'absolute', left: 596, top: 34, fontSize: 18, color: NEGRO }}>{num(T, s0 + 0.9, s0 + 2.0, r)}</div>
          <div style={{ position: 'absolute', left: 756, top: 30, fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 24, color: VIOLETA_TX }}>{ro}</div>
        </div>
      ))}
    </div>
  );
}

const offBtn = { txt: 'Sitio oficial', fb: { x: 200, y: 481 } };
const keys = C => [
  [C.A - 0.3, { x: 560, y: 180, s: 1.6 }, { x: 520, y: 200, s: 1.2 }],
  [C.A + 1.1, { x: 640, y: 440, s: 1.4 }, { x: 620, y: 470, s: 0.95 }],
  [C.A + 2.0, { x: 560, y: 420, s: 1.6 }, { x: 500, y: 430, s: 1.25 }],
  [C.A + 3.2, { x: 560, y: 420, s: 1.6 }, { x: 500, y: 430, s: 1.25 }],
  [C.A + 4.0, { x: 960, y: 500, s: 0.98 }],
  [C.Titulo + 0.3, { x: 700, y: 330, s: 1.45 }, { x: 560, y: 420, s: 1.0 }],
  [C.B + 1.6, { x: 900, y: 420, s: 1.35 }, { x: 1300, y: 380, s: 1.0 }],
  [C.B + 2.6, { x: 1400, y: 560, s: 1.4 }, { x: 1420, y: 560, s: 1.1 }],
  [C.B + 3.8, { x: 960, y: 500, s: 0.98 }]
];
function Piece(P) {
  const { T, C, W, H, v } = P;
  const intro = () => {
    const m = tw(T, C.A - 0.55, C.A + 0.15, 0, 1, MOTION.move);
    const op = 1 - tw(T, C.A - 0.05, C.A + 0.2, 0, 1);
    if (op <= 0) return null;
    const cam = camAt(C.A, keys(C), v);
    const tg = toStage(cam, W, H, 80 + 410, 64 + 66);
    const n = Math.floor(tw(T, 0.4, 1.6, 0, Q.length, Easing.linear));
    const sc = (v ? 1.05 : 1.5) * (1 - m * (1 - cam.s / (v ? 1.05 : 1.5)));
    return (
      <div style={{ position: 'absolute', left: W / 2 + (tg.x - W / 2) * m, top: H / 2 + (tg.y - H / 2) * m, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op }}>
        <div style={{ width: 820, height: 64, borderRadius: 32, background: m > 0.5 ? '#fff' : '#1a1a1a', border: '1px solid ' + (m > 0.5 ? GRIS.borde : '#242424'), display: 'flex', alignItems: 'center', gap: 14, padding: '0 26px', boxSizing: 'border-box', opacity: tw(T, 0.1, 0.4, 0, 1) }}>
          <Ic n="search" c={m > 0.5 ? GRIS.mut : GRIS.claro} />
          <div style={{ fontSize: 20, color: m > 0.5 ? NEGRO : '#fff' }}>{Q.slice(0, n)}{n < Q.length && <span style={{ display: 'inline-block', width: 2, height: 22, background: VERDE, verticalAlign: -4, marginLeft: 2 }} />}</div>
        </div>
        <div style={{ position: 'absolute', left: 0, top: 90, display: 'flex', gap: 12, opacity: 1 - m }}>
          {PRICES.map(([logo, l, p], i) => { const a = 1.7 + i * 0.1; return <div key={l} style={{ padding: '10px 16px', borderRadius: 14, background: i === 0 ? VERDE : '#1a1a1a', border: '1px solid ' + (i === 0 ? VERDE : '#242424'), color: i === 0 ? NEGRO : '#fff', fontSize: 17, fontWeight: 600, ...nw, ...enter(T, a, 12) }}>{l} · US$ {p}</div>; })}
        </div>
      </div>
    );
  };
  return <Std {...P} keys={keys} active="Marketing" scope={SCOPE} label="PUBLICIDAD PARA HOTELES" producto="Publicidad para hoteles" bareA A={<Busqueda T={T} C={C} />} B={<Ads T={T} C={C} />} intro={intro}
    cursor={{ vis: [C.A + 1.5, C.A + 3.0], path: [[C.A + 1.5, { x: 1000, y: 900 }], [C.A + 2.25, offBtn], [C.A + 3.2, { txt: 'Sitio oficial', dx: 70, dy: 90 }]], clicks: [C.A + 2.4] }}
    captions={[[C.A + 0.3, C.Titulo, 'HOTEL ADS', 'El sitio oficial, primero'], [C.B + 0.2, C.Cierre, 'EN RACIMO', 'Racimo Ads']]} />;
}
window.RC_ADS = { Video: () => <Video Piece={Piece} /> };
})();
