// Racimo · CRM. Twist: los mensajes de todos los canales convergen en una sola bandeja.
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, GRIS, MOTION, tw, Ic, BtnVerde, BtnLinea, toStage, camAt, Video, enter, num, LCard, Tag, Stat, Head, Std } = window.RC;
const SCOPE = [['bank', 'RESELLER', 'Reseller PMS'], ['grid', 'ESTABLECIMIENTO', 'Hotel Las Moras'], ['card', 'PUNTO DE VENTA', 'Las Moras · Recepción']];
const nw = { whiteSpace: 'nowrap' };
const CONV = [['VA', 'Valentina Acosta', 'WhatsApp', '¿Tienen cochera para el 14?', '10:02'], ['TB', 'Tomás Bidegain', 'Email', 'Consulta por factura de la estadía', '09:48'], ['CF', 'Camila Ferreyra', 'Instagram', '¿Aceptan mascotas pequeñas?', '09:31'], ['IP', 'Ignacio Peralta', 'Booking.com', 'Llegamos tarde, cerca de las 23 h', '09:12'], ['MR', 'Malena Ruiz Díaz', 'WhatsApp', 'Gracias por todo, volvemos pronto', 'Ayer'], ['BS', 'Bruno Saavedra', 'Email', 'Pedido de cuna para la habitación', 'Ayer']];
const REPLY = '¡Hola Valentina! Sí, tenemos cochera cubierta sin cargo. Te la dejamos reservada para tu llegada del 14.';
const chip = { txt: 'Cochera', fb: { x: 762, y: 868 } };

function Bandeja({ T, C }) {
  const s0 = C.A, click = s0 + 1.35, sent = s0 + 2.9;
  const n = Math.floor(tw(T, click + 0.15, sent - 0.15, 0, REPLY.length, Easing.linear));
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Bandeja" icon="msg" sub="Todos los canales del hotel en una sola bandeja."><BtnLinea icon="settings">Filtrar</BtnLinea><Tag tone="v">{T > sent ? 3 : 4} sin responder</Tag></Head>
      {CONV.map(([ini, nm, ch, pv, h], i) => {
        const act = i === 0;
        return (
          <div key={nm} style={{ position: 'absolute', left: 36, width: 520, top: 130 + i * 104, height: 94, borderRadius: 16, background: act ? VIOLETA_T : '#fff', border: `1px solid ${act ? VIOLETA : GRIS.borde}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', boxSizing: 'border-box', ...enter(T, s0 - 0.3 + i * 0.07, 14) }}>
            <div style={{ width: 50, height: 50, borderRadius: 25, background: act ? VIOLETA : GRIS.suave, color: act ? '#fff' : NEGRO, fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{ini}</div>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ fontSize: 17, fontWeight: 600, color: NEGRO, ...nw }}>{nm}</div><div style={{ fontSize: 12, fontWeight: 600, color: GRIS.mut, border: '1px solid ' + GRIS.borde, borderRadius: 6, padding: '2px 7px', ...nw }}>{ch}</div></div>
              <div style={{ fontSize: 15, color: GRIS.tx, ...nw, overflow: 'hidden', textOverflow: 'ellipsis' }}>{act && T > sent ? 'Vos: ¡Hola Valentina! Sí, tenemos cochera…' : pv}</div>
            </div>
            <div style={{ fontSize: 13, color: GRIS.mut }}>{h}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 580, width: 720, top: 130, height: 760, border: '1px solid ' + GRIS.borde, borderRadius: 20, overflow: 'hidden', ...enter(T, s0 - 0.1) }}>
        <div style={{ height: 84, borderBottom: '1px solid ' + GRIS.borde, display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px' }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 24, color: NEGRO, ...nw }}>Valentina Acosta</div><div><Tag tone="n">WhatsApp</Tag></div>
          <div style={{ marginLeft: 'auto' }}><Tag tone="v">Reserva #MR-20931</Tag></div>
        </div>
        <div style={{ position: 'absolute', left: 24, top: 110, maxWidth: 480, background: GRIS.suave, borderRadius: '20px 20px 20px 6px', padding: '16px 20px', fontSize: 18, lineHeight: 1.5, color: NEGRO, ...enter(T, s0 + 0.3, 12) }}>Hola! Llegamos el 14 en auto. ¿Tienen cochera?<div style={{ fontSize: 13, color: GRIS.mut, marginTop: 6 }}>10:02</div></div>
        {n > 0 && <div style={{ position: 'absolute', right: 24, top: 250, width: 500, background: VIOLETA, color: '#fff', borderRadius: '20px 20px 6px 20px', padding: '16px 20px', fontSize: 18, lineHeight: 1.5, boxSizing: 'border-box' }}>{REPLY.slice(0, n)}{T > sent && <div style={{ fontSize: 13, marginTop: 6, color: '#e0deff' }}>10:04 · Enviado ✓✓</div>}</div>}
        <div style={{ position: 'absolute', left: 24, right: 24, bottom: 94, display: 'flex', gap: 10 }}>
          {['Cochera', 'Check-in online', 'Late check-out', 'Cómo llegar'].map((c, i) => {
            const on = i === 0 && T > click - 0.05 && T < sent;
            return <div key={c} style={{ fontSize: 15, fontWeight: 600, padding: '9px 14px', borderRadius: 10, border: `1px solid ${on ? VIOLETA : GRIS.borde}`, background: on ? VIOLETA_T : '#fff', color: on ? VIOLETA_TX : GRIS.tx, transform: `scale(${i === 0 ? 1 - 0.07 * Math.sin(Math.PI * tw(T, click - 0.1, click + 0.05, 0, 1)) : 1})`, ...nw }}>{c}</div>;
          })}
        </div>
        <div style={{ position: 'absolute', left: 24, right: 24, bottom: 20, height: 60, borderRadius: 16, border: '1px solid ' + GRIS.borde, display: 'flex', alignItems: 'center', padding: '0 12px 0 20px', gap: 12 }}>
          <div style={{ flex: 1, fontSize: 16, color: GRIS.mut }}>Escribí una respuesta…</div>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n="send" s={18} c={NEGRO} /></div>
        </div>
      </div>
      <LCard style={{ position: 'absolute', left: 1320, width: 444, top: 130, gap: 16, ...enter(T, s0 + 0.1) }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut }}>HUÉSPED</div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 28, color: NEGRO }}>Valentina Acosta</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Tag>Cliente frecuente</Tag><Tag tone="v">Viaja en auto</Tag><Tag tone="n">Argentina</Tag></div>
        {[['cal', 'Próxima estadía', '14/08 → 18/08'], ['grid', 'Habitación', 'Suite 302'], ['chart', 'Estadías anteriores', '3'], ['tag', 'Gasto total', 'US$ 1.480']].map(([ic, k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid ' + GRIS.suave, paddingTop: 12 }}><Ic n={ic} s={18} c={GRIS.mut} /><div style={{ fontSize: 15, color: GRIS.mut, flex: 1 }}>{k}</div><div style={{ fontSize: 16, fontWeight: 600, color: NEGRO }}>{v}</div></div>
        ))}
      </LCard>
    </div>
  );
}

const STEPS = [['spark', 'Reserva confirmada', 'Disparador', 'Activa'], ['mail', '3 días antes', 'Email: preparate para tu viaje', 'Enviado'], ['msg', '1 día antes', 'WhatsApp: check-in online', 'Enviado'], ['star', 'Día de salida', 'Encuesta de satisfacción', 'Programado'], ['send', '30 días después', 'Oferta para volver', 'Programado']];
function Autom({ T, C }) {
  const s0 = C.B;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Automatizaciones" icon="refresh" sub="Viaje del huésped · se ejecuta solo con cada reserva."><Tag>● Activa</Tag><BtnVerde icon="plus">NUEVA AUTOMATIZACIÓN</BtnVerde></Head>
      {STEPS.map(([ic, k, d, st], i) => {
        const a = s0 + 0.5 + i * 0.45, ok = T > a + 0.2;
        const done = st !== 'Programado';
        return (
          <LCard key={k} style={{ position: 'absolute', left: 36 + i * 350, top: 170, width: 330, height: 260, gap: 14, border: `${ok ? 2 : 1}px solid ${ok ? (done ? VERDE : VIOLETA) : GRIS.borde}`, ...enter(T, a - 0.3, 20) }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: i === 0 ? VIOLETA_T : GRIS.suave, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n={ic} s={24} c={i === 0 ? VIOLETA : NEGRO} /></div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 22, color: GRIS.claro }}>0{i + 1}</div>
            </div>
            <div style={{ fontSize: 14, letterSpacing: '0.08em', fontWeight: 600, color: GRIS.mut }}>{k.toUpperCase()}</div>
            <div style={{ fontSize: 19, fontWeight: 600, color: NEGRO, lineHeight: 1.3 }}>{d}</div>
            <div style={{ marginTop: 'auto', transform: `scale(${ok ? tw(T, a + 0.2, a + 0.5, 0.7, 1, MOTION.pop) : 1})`, transformOrigin: 'left center' }}>{ok ? <Tag tone={done ? 'G' : 'v'}>{done ? '✓ ' : ''}{st}</Tag> : <Tag tone="n">En espera</Tag>}</div>
          </LCard>
        );
      })}
      <div style={{ position: 'absolute', left: 36, right: 44, top: 470, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 18 }}>
        <Stat label="TASA DE APERTURA" value={num(T, s0 + 2.2, s0 + 3.2, 68) + '%'} sub="Emails del viaje del huésped" />
        <Stat label="CHECK-IN ONLINE" value={num(T, s0 + 2.3, s0 + 3.3, 74) + '%'} sub="Completado antes de llegar" />
        <Stat label="RESEÑAS NUEVAS" value={num(T, s0 + 2.4, s0 + 3.4, 212)} sub="Desde la encuesta de salida" accent />
      </div>
    </div>
  );
}

// Intro: mensajes de cuatro canales que convergen
const MSGS = [['WhatsApp', '¿Tienen cochera para el 14?', -1, -1], ['Email', 'Consulta por factura', 1, -1], ['Instagram', '¿Aceptan mascotas?', -1, 1], ['Booking.com', 'Llegamos cerca de las 23 h', 1, 1]];
function Piece(P) {
  const { T, C, W, H, v } = P;
  const intro = () => {
    const m = tw(T, C.A - 0.55, C.A + 0.15, 0, 1, MOTION.move);
    const op = 1 - tw(T, C.A - 0.05, C.A + 0.2, 0, 1);
    if (op <= 0) return null;
    const cam = camAt(C.A, keys(C), v);
    const sc = v ? 1.25 : 1.35;
    return MSGS.map(([ch, tx, dx, dy], i) => {
      const a = 0.25 + i * 0.22, p = tw(T, a, a + 0.6, 0, 1, MOTION.move);
      const gather = tw(T, 1.7, 2.2, 0, 1, MOTION.move);
      const far = { x: W / 2 + dx * (v ? 260 : 620), y: H / 2 + dy * (v ? 420 : 250) };
      const start = { x: W / 2 + dx * W * 0.7, y: H / 2 + dy * H * 0.7 };
      const stack = { x: W / 2, y: H / 2 - 180 * sc + i * 120 * sc };
      let x = start.x + (far.x - start.x) * p, y = start.y + (far.y - start.y) * p;
      x += (stack.x - x) * gather; y += (stack.y - y) * gather;
      const tg = toStage(cam, W, H, 112 + 36 + 260, 92 + 130 + i * 104 + 47);
      x += (tg.x - x) * m; y += (tg.y - y) * m;
      const s = sc * (1 - m * (1 - cam.s / sc));
      return (
        <div key={ch} style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})`, opacity: op * Math.min(1, p * 2), width: 520, height: 94, background: '#1a1a1a', border: '1px solid #242424', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', boxSizing: 'border-box' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? NEGRO : '#fff', background: i === 0 ? VERDE : VIOLETA, borderRadius: 8, padding: '5px 10px', ...nw }}>{ch}</div>
          <div style={{ fontSize: 19, color: '#fff', ...nw }}>{tx}</div>
        </div>
      );
    });
  };
  return <Std {...P} keys={keys} active="CRM" scope={SCOPE} label="CRM" producto="CRM" A={<Bandeja T={T} C={C} />} B={<Autom T={T} C={C} />} intro={intro}
    cursor={{ vis: [C.A + 0.6, C.A + 1.9], path: [[C.A + 0.6, { x: 900, y: 980 }], [C.A + 1.25, chip], [C.A + 2.2, { txt: 'Cochera', dx: 60, dy: 90 }]], clicks: [C.A + 1.35] }}
    captions={[[C.A + 0.3, C.Titulo, 'CRM', 'Bandeja unificada'], [C.B + 0.2, C.Cierre, 'CRM', 'Viaje del huésped']]} />;
}
const keys = C => [
  [C.A - 0.3, { x: 480, y: 500, s: 1.35 }, { x: 420, y: 520, s: 1.2 }],
  [C.A + 1.0, { x: 900, y: 620, s: 1.35 }, { x: 900, y: 700, s: 1.2 }],
  [C.A + 2.0, { x: 1000, y: 460, s: 1.35 }, { x: 990, y: 520, s: 1.3 }],
  [C.A + 3.2, { x: 1000, y: 460, s: 1.35 }, { x: 1540, y: 420, s: 1.2 }],
  [C.A + 4.0, { x: 960, y: 500, s: 0.98 }],
  [C.Titulo + 0.3, { x: 560, y: 400, s: 1.5 }, { x: 330, y: 420, s: 1.2 }],
  [C.B + 2.4, { x: 1450, y: 400, s: 1.5 }, { x: 1610, y: 420, s: 1.2 }],
  [C.B + 3.6, { x: 960, y: 500, s: 0.98 }]
];
window.RC_CRM = { Video: () => <Video Piece={Piece} /> };
})();
