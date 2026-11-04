// Racimo · RMS. Twist: las tarifas giran como un contador mecánico hasta el precio sugerido.
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, GRIS, MOTION, tw, Ic, BtnVerde, BtnLinea, toStage, camAt, Video, enter, num, LCard, Tag, Stat, Head, Std } = window.RC;
const SCOPE = [['bank', 'RESELLER', 'Reseller Agencia LJ'], ['grid', 'ESTABLECIMIENTO', 'Hotel Los Álamos'], ['card', 'PUNTO DE VENTA', 'Los Álamos · Recepción']];
const nw = { whiteSpace: 'nowrap' };
const DOW = ['lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.'];
const OCC = [62, 68, 74, 81, 88, 93, 90, 71, 65, 63, 69, 77, 86, 91];
const COMP = [98, 98, 105, 112, 121, 128, 126, 104, 99, 99, 103, 110, 120, 126];
const ACT = [105, 105, 105, 110, 110, 110, 110, 105, 105, 105, 105, 110, 110, 110];
const SUG = [99, 102, 108, 116, 124, 132, 129, 105, 101, 99, 104, 113, 122, 130];
const GX = 300, DW = 105, RY = 214, RH = 84;
const ROWS = ['Ocupación prevista', 'Demanda', 'Competencia (mediana)', 'Tarifa actual', 'Tarifa sugerida'];

function Roll({ v, fs = 22, color = NEGRO }) {
  const digits = String(Math.floor(v + 1e-6)).length;
  const cols = [];
  for (let k = digits - 1; k >= 0; k--) {
    const p = Math.pow(10, k);
    let d = Math.floor(v / p) % 10;
    const below = (v % p) / p;
    const frac = k === 0 ? v % 1 : Math.max(0, (below - (1 - 1 / p)) * p);
    d += k === 0 ? v % 1 : frac;
    cols.push(
      <span key={k} style={{ display: 'inline-block', height: fs * 1.15, overflow: 'hidden', verticalAlign: 'top' }}>
        <span style={{ display: 'flex', flexDirection: 'column', transform: `translateY(${-d * fs * 1.15}px)` }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((x, i) => <span key={i} style={{ height: fs * 1.15, lineHeight: `${fs * 1.15}px` }}>{x}</span>)}
        </span>
      </span>
    );
  }
  return <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: fs, color, fontVariantNumeric: 'tabular-nums', display: 'inline-flex', alignItems: 'flex-start', ...nw }}><span style={{ marginRight: fs * 0.2 }}>US$</span>{cols}</span>;
}

function Grilla({ T, C }) {
  const s0 = C.A, apply = s0 + 2.3;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Tarifas sugeridas" icon="chart" sub="Recomendación diaria según demanda, pickup y competencia.">
        <BtnLinea icon="cal">10/08 → 23/08</BtnLinea>
        {T > apply ? <Tag tone="G">✓ 14 TARIFAS APLICADAS</Tag> : <BtnVerde icon="tick" p={1 - 0.07 * Math.sin(Math.PI * tw(T, apply - 0.12, apply + 0.03, 0, 1))}>APLICAR SUGERENCIAS</BtnVerde>}
      </Head>
      {DOW.map((d, i) => (
        <div key={i} style={{ position: 'absolute', left: GX + i * DW, top: 140, width: DW, textAlign: 'center', ...enter(T, s0 - 0.3 + i * 0.03, 10) }}>
          <div style={{ fontSize: 14, color: GRIS.mut }}>{d}</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 26, color: i === 5 ? VIOLETA_TX : NEGRO }}>{10 + i}</div>
        </div>
      ))}
      {ROWS.map((l, r) => (
        <div key={l} style={{ position: 'absolute', left: 36, right: 44, top: RY + r * RH, height: RH, borderTop: '1px solid ' + GRIS.borde, background: r === 4 ? VERDE_T : 'transparent' }}>
          <div style={{ position: 'absolute', left: 16, top: 0, height: RH, display: 'flex', alignItems: 'center', fontSize: 16, fontWeight: r >= 3 ? 600 : 400, color: NEGRO, ...nw }}>{l}</div>
        </div>
      ))}
      {DOW.map((_, i) => {
        const a = s0 + 0.2 + i * 0.05;
        const occ = num(T, a, a + 0.8, OCC[i]);
        const dem = OCC[i] >= 85 ? ['Alta', 'V'] : OCC[i] >= 70 ? ['Media', 'v'] : ['Baja', 'n'];
        const ra = apply + 0.15 + i * 0.05;
        const v = ACT[i] + (SUG[i] - ACT[i]) * tw(T, ra, ra + 0.9, 0, 1, MOTION.move);
        const x = GX + i * DW, cell = { position: 'absolute', left: x, width: DW, height: RH, display: 'flex', alignItems: 'center', justifyContent: 'center' };
        const up = SUG[i] >= ACT[i];
        return (
          <React.Fragment key={i}>
            <div style={{ ...cell, top: RY, flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 17, fontWeight: 600, color: NEGRO, fontVariantNumeric: 'tabular-nums' }}>{occ}%</div>
              <div style={{ width: 60, height: 6, borderRadius: 3, background: GRIS.suave, overflow: 'hidden' }}><div style={{ width: occ + '%', height: '100%', background: VIOLETA }} /></div>
            </div>
            <div style={{ ...cell, top: RY + RH, opacity: tw(T, a + 0.4, a + 0.8, 0, 1) }}><Tag tone={dem[1]}>{dem[0]}</Tag></div>
            <div style={{ ...cell, top: RY + RH * 2, fontSize: 16, color: GRIS.tx, ...nw }}>US$ {COMP[i]}</div>
            <div style={{ ...cell, top: RY + RH * 3 }}><Roll v={v} fs={20} color={T > ra ? VIOLETA_TX : NEGRO} /></div>
            <div style={{ ...cell, top: RY + RH * 4, gap: 4, ...enter(T, a + 0.6, 10) }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 20, color: NEGRO, ...nw }}>{SUG[i]}</span>
              <Ic n={up ? 'outArrow' : 'inArrow'} s={14} c={up ? VERDE_TX : VIOLETA} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Pronostico({ T, C }) {
  const s0 = C.B;
  const W = 1180, H = 560, N = 30;
  const occ = Array.from({ length: N }, (_, i) => 58 + 28 * Math.sin((i - 2) / 4.5) ** 2 + (i % 7 >= 4 ? 10 : 0));
  const pts = occ.map((o, i) => [40 + i * (W - 80) / (N - 1), H - 60 - (o / 100) * (H - 120)]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const draw = tw(T, s0 + 0.4, s0 + 2.2, 0, 1, MOTION.move);
  const today = 9;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Pronóstico" icon="chart" sub="Agosto 2026 · ocupación prevista y reservas nuevas por día."><BtnLinea icon="down">Agosto 2026</BtnLinea></Head>
      <LCard style={{ position: 'absolute', left: 36, top: 130, width: 1260, height: 760, ...enter(T, s0 - 0.2) }}>
        <div style={{ display: 'flex', gap: 22, fontSize: 15, color: GRIS.tx, whiteSpace: 'nowrap' }}><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 22, height: 4, borderRadius: 2, background: VIOLETA }} />Ocupación prevista</span><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, borderRadius: 4, background: VERDE }} />Reservas nuevas</span></div>
        <svg width={W} height={H} style={{ display: 'block', marginTop: 20 }}>
          {[0, 25, 50, 75, 100].map(g => { const y = H - 60 - (g / 100) * (H - 120); return <g key={g}><line x1="40" x2={W - 40} y1={y} y2={y} stroke={GRIS.suave} /><text x="0" y={y + 5} fontSize="13" fill={GRIS.mut} fontFamily="Inter">{g}%</text></g>; })}
          {pts.map((p, i) => { const h = (6 + ((i * 37) % 23)) * 3 * tw(T, s0 + 0.3 + i * 0.04, s0 + 0.7 + i * 0.04, 0, 1, MOTION.move); return <rect key={i} x={p[0] - 11} y={H - 60 - h} width="22" height={h} rx="5" fill={i === today ? VERDE : VERDE_T} />; })}
          <path d={d} fill="none" stroke={VIOLETA} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - draw} />
          {draw > 0.97 && pts.filter((_, i) => i % 7 === 5).map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="7" fill="#fff" stroke={VIOLETA} strokeWidth="3" />)}
          {[1, 8, 15, 22, 29].map(dd => <text key={dd} x={pts[dd - 1][0]} y={H - 28} fontSize="14" textAnchor="middle" fill={GRIS.mut} fontFamily="Inter">{dd} ago</text>)}
        </svg>
      </LCard>
      <div style={{ position: 'absolute', left: 1320, width: 444, top: 130, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Stat label="OCUPACIÓN PREVISTA" value={num(T, s0 + 1.0, s0 + 2.2, 84) + '%'} sub="+9 pts vs. agosto 2025" style={enter(T, s0 + 0.8)} />
        <Stat label="REVPAR PROYECTADO" value={'US$ ' + num(T, s0 + 1.2, s0 + 2.4, 108, 96)} sub="Con las tarifas sugeridas" accent style={enter(T, s0 + 1.0)} />
        <Stat label="INGRESO PROYECTADO" value={'US$ ' + num(T, s0 + 1.4, s0 + 2.6, 184300).toLocaleString('es-AR')} sub="Agosto 2026" style={enter(T, s0 + 1.2)} />
      </div>
    </div>
  );
}

const cellW = (i, r) => ({ x: 112 + GX + i * DW + DW / 2, y: 92 + RY + r * RH + RH / 2 });
const applyBtn = { txt: 'APLICAR SUGERENCIAS', fb: { x: 1640, y: 150 } };
const keys = C => [
  [C.A - 0.3, { x: 880, y: 560, s: 1.35 }, { x: 800, y: 560, s: 1.1 }],
  [C.A + 1.4, { x: 1000, y: 440, s: 1.2 }, { x: 1000, y: 460, s: 0.95 }],
  [C.A + 2.1, { x: 1400, y: 360, s: 1.4 }, { x: 1480, y: 420, s: 1.1 }],
  [C.A + 2.6, { x: 1000, y: 620, s: 1.3 }, { x: 800, y: 620, s: 1.0 }],
  [C.A + 3.6, { x: 1250, y: 620, s: 1.3 }, { x: 1300, y: 620, s: 1.0 }],
  [C.A + 4.3, { x: 960, y: 500, s: 0.98 }],
  [C.Titulo + 0.3, { x: 700, y: 560, s: 1.25 }, { x: 560, y: 560, s: 0.9 }],
  [C.B + 2.2, { x: 900, y: 560, s: 1.2 }, { x: 1000, y: 560, s: 0.85 }],
  [C.B + 3.0, { x: 1500, y: 520, s: 1.35 }, { x: 1540, y: 480, s: 1.3 }],
  [C.B + 3.9, { x: 960, y: 500, s: 0.98 }]
];
function Piece(P) {
  const { T, C, W, H, v } = P;
  const intro = () => {
    const m = tw(T, C.A - 0.55, C.A + 0.15, 0, 1, MOTION.move);
    const op = 1 - tw(T, C.A - 0.05, C.A + 0.2, 0, 1);
    if (op <= 0) return null;
    const cam = camAt(C.A, keys(C), v);
    const tg = toStage(cam, W, H, cellW(5, 4).x, cellW(5, 4).y);
    const val = 110 + 22 * tw(T, 0.9, 2.0, 0, 1, MOTION.move);
    const sc = (v ? 1 : 1.25) * (1 - m * 0.8);
    const bars = [40, 55, 62, 78, 90, 96, 88];
    return (
      <div style={{ position: 'absolute', left: W / 2 + (tg.x - W / 2) * m, top: H / 2 + (tg.y - H / 2) * m, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 150, opacity: 1 - m }}>
          {bars.map((b, i) => <div key={i} style={{ width: 44, height: 1.5 * b * tw(T, 0.2 + i * 0.07, 0.7 + i * 0.07, 0, 1, MOTION.move), borderRadius: 10, background: i === 5 ? VERDE : '#1c1b3a' }} />)}
        </div>
        <div style={{ fontSize: 22, letterSpacing: '0.16em', fontWeight: 600, color: GRIS.claro, opacity: 1 - m }}>TARIFA SUGERIDA · SÁB 15 AGO</div>
        <Roll v={val} fs={150} color="#fff" />
      </div>
    );
  };
  return <Std {...P} keys={keys} active="RMS" scope={SCOPE} label="RMS" producto="RMS" A={<Grilla T={T} C={C} />} B={<Pronostico T={T} C={C} />} intro={intro}
    cursor={{ vis: [C.A + 1.3, C.A + 2.7], path: [[C.A + 1.3, { x: 1300, y: 500 }], [C.A + 2.15, applyBtn], [C.A + 2.9, { txt: 'APLICAR SUGERENCIAS', dx: -40, dy: 90 }]], clicks: [C.A + 2.3] }}
    captions={[[C.A + 0.3, C.Titulo, 'RMS', 'Tarifas sugeridas'], [C.B + 0.2, C.Cierre, 'RMS', 'Pronóstico del mes']]} />;
}
window.RC_RMS = { Video: () => <Video Piece={Piece} /> };
})();
