// Racimo · POS / Punto de venta. Twist: la comanda se imprime y viaja por las columnas.
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, GRIS, MOTION, tw, Ic, BtnVerde, BtnLinea, toStage, camAt, Video, enter, num, LCard, Tag, Stat, Head, Std } = window.RC;
const SCOPE = [['bank', 'RESELLER', 'Reseller PMS'], ['grid', 'ESTABLECIMIENTO', 'Hotel Las Moras'], ['card', 'PUNTO DE VENTA', 'Las Moras · Restaurante']];
const COLX = [36, 618, 1200], CW = 564, CY = 340, CH = 150, GAP = 14;
const M = ['302', 'Valentina Acosta', '#A-1042', '2× Milanesa napolitana · 1× Agua mineral', '$ 32.400'];
const COLS = [['Nuevos', 'inArrow'], ['En cocina', 'flame'], ['En camino', 'truck']];
const STATIC = [[0, ['118', 'Tomás Bidegain', '#A-1039', '1× Café con medialunas', '$ 7.800']], [1, ['210', 'Camila Ferreyra', '#A-1036', '1× Risotto de hongos · 1× Malbec', '$ 26.100']], [1, ['105', 'Renata Ovalle', '#A-1035', '2× Sorrentinos', '$ 25.600']], [2, ['221', 'Mateo Galarza', '#A-1031', '1× Bife de chorizo', '$ 18.900']]];

function Pedido({ d, col, T, btnAt }) {
  const press = btnAt ? 1 - 0.08 * Math.sin(Math.PI * tw(T, btnAt, btnAt + 0.15, 0, 1)) : 1;
  return (
    <div style={{ width: CW, height: CH, background: '#fff', border: '1px solid ' + GRIS.borde, borderRadius: 16, padding: '18px 22px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 26, color: NEGRO }}>Hab. {d[0]}</div>
        <div style={{ fontSize: 15, color: GRIS.tx, whiteSpace: 'nowrap' }}>{d[1]}</div>
        <div style={{ marginLeft: 'auto', fontSize: 13, color: GRIS.mut, whiteSpace: 'nowrap' }}>{d[2]}</div>
      </div>
      <div style={{ fontSize: 15, color: GRIS.tx, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d[3]}</div>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: NEGRO, fontVariantNumeric: 'tabular-nums' }}>{d[4]}</div>
        {col === 0 ? <BtnVerde p={press}>ACEPTAR</BtnVerde> : col === 1 ? <div style={{ transform: `scale(${press})` }}><BtnLinea icon="tick">Listo</BtnLinea></div> : <Tag tone="v">Subiendo</Tag>}
      </div>
    </div>
  );
}
const slotY = i => CY + i * (CH + GAP);

function RoomService({ T, C }) {
  const s0 = C.A;
  const t1 = s0 + 1.4, t2 = s0 + 2.7, tDel = s0 + 3.4;
  const p1 = tw(T, t1, t1 + 0.6, 0, 1, MOTION.move), p2 = tw(T, t2, t2 + 0.6, 0, 1, MOTION.move);
  const mCol = T < t1 + 0.3 ? 0 : T < t2 + 0.3 ? 1 : 2;
  const mx = COLX[0] + (COLX[1] - COLX[0]) * p1 + (COLX[2] - COLX[1]) * p2;
  const shift = [1 - p1, p1 - p2, p2];
  const cnt = [T < t1 ? 2 : 1, T < t1 + 0.6 ? 2 : T < t2 ? 3 : 2, T < t2 + 0.6 ? 1 : T < tDel ? 2 : 1];
  const entregados = T < tDel ? 23 : 24;
  const mIn = tw(T, s0 + 0.15, s0 + 0.5, 0, 1, MOTION.pop);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {COLS.map((_, c) => <div key={c} style={{ position: 'absolute', left: COLX[c] - 10, top: 326, width: CW + 20, height: 540, background: '#fafafa', borderRadius: 20 }} />)}
      <Head title="Room Service" icon="fork" sub="Los pedidos de la app llegan con habitación, reserva y hora.">
        <BtnLinea icon="eye">Ver cocina</BtnLinea><Tag>● en vivo</Tag>
      </Head>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 140, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 18 }}>
        <Stat label="NUEVOS SIN ACEPTAR" value={cnt[0]} sub="Desde la app del huésped" accent={T > t1 && T < t1 + 0.6} />
        <Stat label="EN COCINA" value={cnt[1]} sub="Por punto de despacho" />
        <Stat label="EN CAMINO" value={cnt[2]} sub="Subiendo a la habitación" />
        <Stat label="ENTREGADOS HOY" value={entregados} sub="Tiempo medio 18 min" accent={T > tDel} />
      </div>
      {COLS.map(([l, ic], c) => (
        <div key={l} style={{ position: 'absolute', left: COLX[c], top: 290, width: CW, display: 'flex', alignItems: 'center', gap: 10, ...enter(T, s0 - 0.3 + c * 0.1) }}>
          <Ic n={ic} s={20} c={c === 0 ? VERDE_TX : VIOLETA} /><div style={{ fontSize: 17, fontWeight: 600, color: NEGRO, whiteSpace: 'nowrap' }}>{l}</div>
          <div style={{ fontSize: 14, color: GRIS.mut }}>{cnt[c]}</div>
        </div>
      ))}
      {STATIC.map(([c, d], i) => {
        const before = STATIC.filter((s, j) => s[0] === c && j < i).length;
        const del = d[0] === '221';
        const op = del ? 1 - tw(T, tDel, tDel + 0.4, 0, 1) : 1;
        const y = slotY(before + shift[c]) + (del ? -tw(T, tDel, tDel + 0.4, 0, 30) : 0);
        return <div key={d[0]} style={{ position: 'absolute', left: COLX[c], top: y, opacity: op, ...(T < s0 ? {} : {}) }}><div style={enter(T, s0 - 0.2 + i * 0.08)}><Pedido d={d} col={c} T={T} /></div></div>;
      })}
      {T > s0 && (
        <div style={{ position: 'absolute', left: mx, top: slotY(0) - Math.sin(Math.PI * Math.max(p1 % 1, p2 % 1)) * 40, opacity: mIn, transform: `scale(${0.96 + 0.04 * mIn})`, zIndex: 2 }}>
          <div style={{ borderRadius: 16, outline: `3px solid ${VERDE}`, outlineOffset: 2 }}><Pedido d={M} col={mCol} T={T} btnAt={mCol === 0 ? s0 + 1.25 : mCol === 1 ? s0 + 2.55 : 0} /></div>
        </div>
      )}
    </div>
  );
}

const INV = [['Agua mineral 500 ml', '0021', 'Bebidas', 'Bar', 48, 45, 'u'], ['Milanesa (porción)', '0102', 'Cocina', 'Cocina', 30, 28, 'u'], ['Papas rústicas', '0107', 'Cocina', 'Cocina', 12.4, 11.9, 'kg'], ['Café en grano', '0033', 'Desayuno', 'Bar', 2.4, 1.8, 'kg', true], ['Vino Malbec 750 ml', '0045', 'Bebidas', 'Cava', 64, 64, 'u'], ['Medialunas', '0011', 'Desayuno', 'Pastelería', 120, 120, 'u'], ['Queso muzzarella', '0118', 'Cocina', 'Cocina', 8.5, 8.5, 'kg'], ['Frigobar · gaseosa', '0052', 'Frigobar', 'Pisos', 96, 96, 'u'], ['Kit de amenities', '0077', 'Habitaciones', 'Pisos', 210, 210, 'u']];
function Inventario({ T, C }) {
  const s0 = C.B;
  const cols = [['INSUMO', 36], ['CATEGORÍA', 640], ['DEPÓSITO', 900], ['STOCK', 1160], ['ALERTA', 1380], ['ÚLTIMO MOVIMIENTO', 1560]];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Inventario" icon="box" sub="El stock se descuenta por receta con cada venta.">
        <BtnLinea>Depósitos</BtnLinea><BtnLinea>Importar Excel</BtnLinea><BtnVerde icon="plus">NUEVO INSUMO</BtnVerde>
      </Head>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 150, height: 44, borderBottom: '1px solid ' + GRIS.borde, fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut }}>
        {cols.map(([l, x]) => <div key={l} style={{ position: 'absolute', left: x - 36, top: 14 }}>{l}</div>)}
      </div>
      {INV.map((r, i) => {
        const a = s0 + 0.9 + i * 0.25;
        const ch = r[4] !== r[5];
        const val = ch ? r[4] + (r[5] - r[4]) * tw(T, a, a + 0.6, 0, 1, MOTION.move) : r[4];
        const shown = r[6] === 'kg' ? val.toFixed(1).replace('.', ',') : Math.round(val);
        const hot = ch && T > a;
        const alert = r[7] && T > a + 0.4;
        return (
          <div key={r[0]} style={{ position: 'absolute', left: 36, right: 44, top: 196 + i * 72, height: 72, borderBottom: '1px solid ' + GRIS.suave, background: hot ? `rgba(108,99,255,${0.07 * (1 - tw(T, a + 0.8, a + 1.6, 0, 1))})` : 'transparent', ...enter(T, s0 - 0.2 + i * 0.05, 14) }}>
            <div style={{ position: 'absolute', left: 0, top: 14 }}><div style={{ fontSize: 17, fontWeight: 600, color: NEGRO, whiteSpace: 'nowrap' }}>{r[0]}</div><div style={{ fontSize: 13, color: GRIS.mut }}>{r[1]}</div></div>
            <div style={{ position: 'absolute', left: 604, top: 24, fontSize: 16, color: GRIS.tx }}>{r[2]}</div>
            <div style={{ position: 'absolute', left: 864, top: 24, fontSize: 16, color: GRIS.tx }}>{r[3]}</div>
            <div style={{ position: 'absolute', left: 1124, top: 20, fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 24, color: hot ? VIOLETA_TX : NEGRO, fontVariantNumeric: 'tabular-nums' }}>{shown} {r[6]}</div>
            <div style={{ position: 'absolute', left: 1344, top: 22, transform: `scale(${alert ? tw(T, a + 0.4, a + 0.8, 0.6, 1, MOTION.pop) : 1})`, transformOrigin: 'left center' }}>{alert ? <Tag tone="V">Stock bajo</Tag> : <span style={{ color: GRIS.claro }}>—</span>}</div>
            <div style={{ position: 'absolute', left: 1524, top: 24, fontSize: 16, color: hot ? NEGRO : GRIS.mut, fontWeight: hot ? 600 : 400 }}>{hot ? 'Hoy 13:42 · #A-1042' : '16 jul 2026'}</div>
          </div>
        );
      })}
    </div>
  );
}

// Intro: la comanda se imprime
function Ticket({ T, p }) {
  const lines = [['ROOM SERVICE', 'Hab. 302', true], ['Valentina Acosta', '#A-1042'], ['2× Milanesa napolitana', '$ 29.000'], ['1× Agua mineral', '$ 3.400'], ['TOTAL', '$ 32.400', true]];
  return (
    <div style={{ width: 520, background: '#fff', borderRadius: '0 0 18px 18px', padding: '28px 34px 34px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <img src="assets/racimo-monograma.svg" style={{ width: 40, height: 40 }} />
      {lines.map(([a, b, bold], i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, fontSize: bold ? 22 : 20, fontWeight: bold ? 700 : 400, color: NEGRO, borderTop: i === 4 ? '2px dashed ' + GRIS.borde : 'none', paddingTop: i === 4 ? 16 : 0, opacity: p > (i + 1) / 6 ? 1 : 0 }}>
          <span>{a}</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{b}</span>
        </div>
      ))}
    </div>
  );
}
const keys = C => [
  [C.A - 0.4, { x: 520, y: 520, s: 1.5 }, { x: 420, y: 560, s: 1.1 }],
  [C.A + 1.4, { x: 700, y: 520, s: 1.45 }, { x: 420, y: 560, s: 1.1 }],
  [C.A + 2.0, { x: 1100, y: 540, s: 1.45 }, { x: 1010, y: 580, s: 1.1 }],
  [C.A + 2.7, { x: 1100, y: 540, s: 1.45 }, { x: 1010, y: 580, s: 1.1 }],
  [C.A + 3.3, { x: 1500, y: 540, s: 1.45 }, { x: 1590, y: 580, s: 1.1 }],
  [C.A + 4.3, { x: 960, y: 500, s: 0.98 }, { x: 1590, y: 580, s: 1.0 }],
  [C.Titulo + 0.3, { x: 760, y: 420, s: 1.55 }, { x: 560, y: 500, s: 1.1 }],
  [C.B + 1.2, { x: 1350, y: 420, s: 1.5 }, { x: 1300, y: 480, s: 1.1 }],
  [C.B + 2.6, { x: 1300, y: 560, s: 1.5 }, { x: 1300, y: 560, s: 1.1 }],
  [C.B + 3.8, { x: 960, y: 500, s: 0.98 }]
];
function Piece(P) {
  const { T, C, W, H, v } = P;
  const intro = () => {
    const pr = tw(T, 0.3, 1.8, 0, 1, Easing.linear);
    const m = tw(T, C.A - 0.5, C.A + 0.2, 0, 1, MOTION.move);
    const tg = toStage(camAt(C.A + 0.2, keys(C), v), W, H, 112 + COLX[0] + CW / 2, 92 + slotY(0) + CH / 2);
    const op = 1 - tw(T, C.A + 0.05, C.A + 0.3, 0, 1);
    if (op <= 0) return null;
    const hTicket = 470 * tw(T, 0.3, 1.8, 0, 1, Easing.easeOutQuad);
    const stamp = tw(T, 1.9, 2.25, 0, 1, MOTION.pop);
    const cx = W / 2 + (tg.x - W / 2) * m, cy = H / 2 + (tg.y - H / 2) * m;
    const sc = (v ? 1.35 : 1.2) * (1 - m * 0.35);
    return (
      <div style={{ position: 'absolute', left: cx, top: cy, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op }}>
        <div style={{ position: 'relative', width: 600, height: 540 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 600, height: 34, background: '#1a1a1a', border: '1px solid #242424', borderRadius: 17, opacity: 1 - m }} />
          <div style={{ position: 'absolute', left: 40, top: 17, height: hTicket, overflow: 'hidden' }}><Ticket T={T} p={pr} /></div>
          <div style={{ position: 'absolute', right: 30, top: 300, transform: `rotate(-8deg) scale(${stamp})`, opacity: stamp > 0 ? 1 - m : 0, background: VERDE, color: NEGRO, fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 12, padding: '12px 20px' }}>NUEVO PEDIDO</div>
        </div>
      </div>
    );
  };
  const s0 = C.A;
  const btn1 = { txt: 'ACEPTAR', fb: { x: 112 + COLX[0] + CW - 80, y: 92 + slotY(0) + CH - 38 } }, btn2 = { txt: 'Listo', fb: { x: 112 + COLX[1] + CW - 70, y: 92 + slotY(0) + CH - 38 } };
  return <Std {...P} keys={keys} active="POS" scope={SCOPE} label="POS · PUNTO DE VENTA" producto="POS · Punto de venta"
    A={<RoomService T={T} C={C} />} B={<Inventario T={T} C={C} />} intro={intro}
    cursor={{ vis: [s0 + 0.6, s0 + 3.0], path: [[s0 + 0.6, { x: 900, y: 900 }], [s0 + 1.15, btn1], [s0 + 1.4, btn1], [s0 + 2.0, { ...btn2, dx: -40, dy: 60 }], [s0 + 2.45, btn2], [s0 + 3.2, { ...btn2, dx: 60, dy: 80 }]], clicks: [s0 + 1.25, s0 + 2.55] }}
    captions={[[C.A + 0.3, C.Titulo, 'POS', 'Room service'], [C.B + 0.2, C.Cierre, 'POS', 'Inventario']]} />;
}
window.RC_POS = { Video: () => <Video Piece={Piece} />, RoomService, Inventario };
})();
