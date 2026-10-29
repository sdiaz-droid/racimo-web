// Racimo · Agentes de IA. Twist: no hay cursor; el agente resuelve solo, de punta a punta.
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, GRIS, MOTION, tw, Ic, BtnVerde, BtnLinea, toStage, camAt, Video, enter, num, LCard, Tag, Stat, Head, Std } = window.RC;
const SCOPE = [['bank', 'RESELLER', 'Reseller PMS'], ['grid', 'ESTABLECIMIENTO', 'Hotel Las Moras'], ['card', 'PUNTO DE VENTA', 'Las Moras · Recepción']];
const nw = { whiteSpace: 'nowrap' };
const A1 = '¡Hola! Sí. Tengo la Superior con vista a la montaña a US$ 110 por noche, desayuno incluido. Son 3 noches, total US$ 330. ¿Te la reservo?';
const ACC = [[0.5, 'Detectó la intención: reserva'], [1.0, 'Consultó disponibilidad · 20 → 23 ago'], [1.4, 'Cotizó tarifa flexible · 2 adultos'], [2.9, 'Creó la reserva #MR-20957'], [3.3, 'Envió el link de pago']];
const Avatar = ({ s = 44 }) => <div style={{ width: s, height: s, borderRadius: s / 2, background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ic n="spark" s={s * 0.5} c={NEGRO} /></div>;

function Chat({ T, C }) {
  const s0 = C.A;
  const n = Math.floor(tw(T, s0 + 1.3, s0 + 2.3, 0, A1.length, Easing.linear));
  const typing = T > s0 + 0.75 && T < s0 + 1.3;
  const dots = [0, 1, 2].map(i => 0.4 + 0.6 * Math.abs(Math.sin((T * 6) + i)));
  const guest = (tx, t, top) => T > t && <div style={{ position: 'absolute', right: 28, top, maxWidth: 560, background: GRIS.suave, borderRadius: '20px 20px 6px 20px', padding: '16px 20px', fontSize: 19, lineHeight: 1.5, color: NEGRO, ...enter(T, t, 14) }}>{tx}</div>;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Agente de reservas" icon="spark" sub="Racimo IA · atiende por WhatsApp, web e Instagram, las 24 horas."><Tag>● En línea</Tag><BtnLinea icon="settings">Configurar</BtnLinea></Head>
      <div style={{ position: 'absolute', left: 36, width: 1060, top: 130, height: 760, border: '1px solid ' + GRIS.borde, borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ height: 84, borderBottom: '1px solid ' + GRIS.borde, display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px' }}>
          <Avatar /><div style={{ fontSize: 18, fontWeight: 600, color: NEGRO }}>Agente del Hotel Las Moras</div><div><Tag tone="n">WhatsApp</Tag></div>
          <div style={{ marginLeft: 'auto', fontSize: 15, color: GRIS.mut, ...nw }}>+54 9 261 555 0142</div>
        </div>
        {guest('Hola, ¿tienen lugar del 20 al 23 de agosto para dos?', s0 + 0.15, 112)}
        {typing && <div style={{ position: 'absolute', left: 28, top: 210, display: 'flex', alignItems: 'center', gap: 12 }}><Avatar s={36} /><div style={{ background: VIOLETA_T, borderRadius: 18, padding: '14px 18px', display: 'flex', gap: 6 }}>{dots.map((o, i) => <div key={i} style={{ width: 9, height: 9, borderRadius: 5, background: VIOLETA, opacity: o }} />)}</div></div>}
        {n > 0 && <div style={{ position: 'absolute', left: 28, top: 210, display: 'flex', gap: 12, alignItems: 'flex-start' }}><Avatar s={36} /><div style={{ width: 620, background: VIOLETA, color: '#fff', borderRadius: '20px 20px 20px 6px', padding: '16px 20px', fontSize: 19, lineHeight: 1.5, boxSizing: 'border-box' }}>{A1.slice(0, n)}</div></div>}
        {guest('Sí, dale.', s0 + 2.6, 400)}
        {T > s0 + 3.0 && (
          <div style={{ position: 'absolute', left: 28, top: 480, display: 'flex', gap: 12, alignItems: 'flex-start', ...enter(T, s0 + 3.0, 14) }}>
            <Avatar s={36} />
            <div style={{ width: 520, border: `2px solid ${VIOLETA}`, borderRadius: 20, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box' }}>
              <div style={{ fontSize: 19, color: NEGRO }}>Listo, te la reservé. Confirmás con el pago:</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa', borderRadius: 14, padding: '14px 16px' }}>
                <div><div style={{ fontSize: 16, fontWeight: 600, color: NEGRO }}>Reserva #MR-20957</div><div style={{ fontSize: 14, color: GRIS.mut }}>Superior · 20 → 23 ago · US$ 330</div></div>
                <BtnVerde>PAGAR</BtnVerde>
              </div>
            </div>
          </div>
        )}
      </div>
      <LCard style={{ position: 'absolute', left: 1120, width: 644, top: 130, height: 760, gap: 0, padding: '26px 28px' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut, marginBottom: 12 }}>ACCIONES DEL AGENTE</div>
        {ACC.map(([t, l]) => {
          const on = T > s0 + t, p = tw(T, s0 + t, s0 + t + 0.35, 0, 1, MOTION.pop);
          return (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 0', borderBottom: '1px solid ' + GRIS.suave, opacity: on ? 1 : 0.35 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: on ? VERDE : GRIS.suave, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? p : 1})` }}>{on ? <Ic n="tick" s={20} c={NEGRO} w={3} /> : null}</div>
              <div style={{ fontSize: 19, fontWeight: on ? 600 : 400, color: NEGRO, ...nw }}>{l}</div>
            </div>
          );
        })}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 14, opacity: tw(T, s0 + 3.5, s0 + 3.9, 0, 1) }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 56, color: NEGRO }}>38 s</div>
          <div style={{ fontSize: 17, color: GRIS.mut }}>resuelto sin intervención del equipo</div>
        </div>
      </LCard>
    </div>
  );
}

const AGENTS = [['spark', 'Agente de reservas', 'WhatsApp · web · Instagram', [['Conversaciones', 1284], ['Reservas generadas', 212]]], ['msg', 'Agente de recepción', 'Consultas durante la estadía', [['Conversaciones', 846], ['Derivadas al equipo', 41]]], ['star', 'Agente de reputación', 'Responde reseñas en las OTAs', [['Reseñas respondidas', 318], ['Tiempo medio', '2 h']]]];
function Panel({ T, C }) {
  const s0 = C.B;
  const fmt = x => x.toLocaleString('es-AR');
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Racimo IA" icon="spark" sub="Agentes activos del establecimiento."><BtnVerde icon="plus">NUEVO AGENTE</BtnVerde></Head>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 140, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 18 }}>
        <Stat label="CONVERSACIONES RESUELTAS · AGOSTO" value={fmt(num(T, s0 + 0.3, s0 + 1.6, 2448))} sub="Sin intervención del equipo" accent />
        <Stat label="TIEMPO MEDIO DE RESPUESTA" value={num(T, s0 + 0.4, s0 + 1.6, 12) + ' s'} sub="Las 24 horas, todos los días" />
        <Stat label="RESERVAS GENERADAS POR IA" value={'US$ ' + fmt(num(T, s0 + 0.5, s0 + 1.8, 68900))} sub="Ingreso directo del mes" />
      </div>
      {AGENTS.map(([ic, nm, d, ks], i) => {
        const a = s0 + 0.8 + i * 0.3, on = tw(T, a + 0.4, a + 0.7, 0, 1, MOTION.move);
        return (
          <LCard key={nm} style={{ position: 'absolute', left: 36 + i * 584, top: 320, width: 566, height: 340, gap: 18, ...enter(T, a, 24) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: i === 0 ? VERDE : VIOLETA_T, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n={ic} s={28} c={i === 0 ? NEGRO : VIOLETA} /></div>
              <div style={{ flex: 1 }}><div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 26, color: NEGRO, ...nw }}>{nm}</div><div style={{ fontSize: 15, color: GRIS.mut }}>{d}</div></div>
              <div style={{ width: 60, height: 34, borderRadius: 17, background: on > 0.5 ? VERDE : GRIS.borde, position: 'relative' }}><div style={{ position: 'absolute', top: 4, left: 4 + on * 26, width: 26, height: 26, borderRadius: 13, background: '#fff' }} /></div>
            </div>
            {ks.map(([k, val]) => (
              <div key={k} style={{ borderTop: '1px solid ' + GRIS.suave, paddingTop: 16 }}>
                <div style={{ fontSize: 14, color: GRIS.mut }}>{k}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 44, color: NEGRO, fontVariantNumeric: 'tabular-nums' }}>{typeof val === 'number' ? fmt(num(T, a + 0.4, a + 1.6, val)) : val}</div>
              </div>
            ))}
          </LCard>
        );
      })}
    </div>
  );
}

const keys = C => [
  [C.A - 0.3, { x: 560, y: 380, s: 1.45 }, { x: 600, y: 420, s: 1.25 }],
  [C.A + 2.2, { x: 620, y: 520, s: 1.4 }, { x: 640, y: 560, s: 1.2 }],
  [C.A + 3.1, { x: 640, y: 640, s: 1.4 }, { x: 640, y: 680, s: 1.2 }],
  [C.A + 3.7, { x: 1440, y: 540, s: 1.35 }, { x: 1440, y: 560, s: 1.2 }],
  [C.A + 4.4, { x: 960, y: 500, s: 0.98 }],
  [C.Titulo + 0.3, { x: 700, y: 360, s: 1.45 }, { x: 560, y: 420, s: 1.0 }],
  [C.B + 1.6, { x: 800, y: 560, s: 1.3 }, { x: 440, y: 640, s: 1.15 }],
  [C.B + 2.8, { x: 1350, y: 560, s: 1.3 }, { x: 1600, y: 640, s: 1.15 }],
  [C.B + 3.8, { x: 960, y: 500, s: 0.98 }]
];
function Piece(P) {
  const { T, C, W, H, v } = P;
  const intro = () => {
    const m = tw(T, C.A - 0.5, C.A + 0.15, 0, 1, MOTION.move);
    const op = 1 - tw(T, C.A - 0.05, C.A + 0.2, 0, 1);
    if (op <= 0) return null;
    const cam = camAt(C.A, keys(C), v);
    const tg = toStage(cam, W, H, 112 + 36 + 46, 92 + 130 + 42);
    const txt = 'Hola, soy el agente del Hotel Las Moras.';
    const n = Math.floor(tw(T, 0.9, 1.9, 0, txt.length, Easing.linear));
    const draw = tw(T, 0.1, 0.9, 0, 1, MOTION.move);
    const glow = 1 + 0.06 * Math.sin(T * 5);
    const S = v ? 260 : 300;
    const cx = W / 2 + (tg.x - W / 2) * m, cy = (H / 2 - (v ? 160 : 90)) + (tg.y - (H / 2 - (v ? 160 : 90))) * m;
    return (
      <React.Fragment>
        <div style={{ position: 'absolute', left: cx, top: cy, transform: `translate(-50%,-50%) scale(${(1 - m * 0.85) * glow})`, opacity: op, width: S, height: S, borderRadius: S / 2, background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width={S * 0.5} height={S * 0.5} fill="none" stroke={NEGRO} strokeWidth="1.6" strokeLinejoin="round"><path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" strokeDasharray="60" strokeDashoffset={60 * (1 - draw)} /></svg>
        </div>
        <div style={{ position: 'absolute', left: 80, right: 80, top: H / 2 + (v ? 60 : 110), textAlign: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: v ? 60 : 72, letterSpacing: '-0.02em', color: '#fff', opacity: 1 - m }}>{txt.slice(0, n)}</div>
      </React.Fragment>
    );
  };
  return <Std {...P} keys={keys} active="Racimo IA" scope={SCOPE} label="AGENTES DE IA" producto="Agentes de IA" A={<Chat T={T} C={C} />} B={<Panel T={T} C={C} />} intro={intro}
    captions={[[C.A + 0.3, C.Titulo, 'RACIMO IA', 'Reserva por WhatsApp'], [C.B + 0.2, C.Cierre, 'RACIMO IA', 'Agentes activos']]} />;
}
window.RC_IA = { Video: () => <Video Piece={Piece} /> };
})();
