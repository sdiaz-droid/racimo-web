// Racimo · Marketing Digital. Twist: tres capítulos numerados (Redes · MyLinks · Email) con índice en pantalla.
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, GRIS, MOTION, tw, Ic, BtnVerde, BtnLinea, toStage, camAt, Video, enter, num, LCard, Tag, Stat, Head, Std, Img, Phone } = window.RC;
const SCOPE = [['bank', 'RESELLER', 'Reseller Marketing'], ['grid', 'ESTABLECIMIENTO', 'Hotel Las Moras'], ['card', 'PUNTO DE VENTA', 'Las Moras · Marketing']];
const nw = { whiteSpace: 'nowrap' };
const CAPS = [['01', 'Redes sociales'], ['02', 'MyLinks'], ['03', 'Email marketing']];
const DAYS = ['lun 10', 'mar 11', 'mié 12', 'jue 13', 'vie 14', 'sáb 15', 'dom 16'];
const POSTS = [[0, 'Desayuno de campo', 'IG'], [1, 'Tour de bodegas', 'FB'], [2, 'Suite con balcón', 'IG'], [5, 'Brunch del sábado', 'IG'], [6, 'Atardecer en la terraza', 'FB']];
const CAPTION = 'Escapada de fin de semana entre viñedos. Reservá directo en nuestra web.';
const FOTOS = ['assets/fotos/habitacion.png', 'assets/fotos/domo.png', 'assets/fotos/colonial.png', 'assets/fotos/cabana.png', 'assets/fotos/living.png', 'assets/fotos/edificio.png'];
const COLW = 158, CX = 36, CY = 200;

function Redes({ T, C }) {
  const s0 = C.A, prog = s0 + 2.3;
  const n = Math.floor(tw(T, s0 + 0.4, s0 + 1.8, 0, CAPTION.length, Easing.linear));
  const fly = tw(T, prog + 0.1, prog + 0.7, 0, 1, MOTION.move);
  const post = (l, ch, i, src) => (
    <div style={{ width: COLW - 12, height: 170, borderRadius: 14, border: '1px solid ' + GRIS.borde, background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Img style={{ height: 96 }} src={src || FOTOS[i % FOTOS.length]} />
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}><div style={{ fontSize: 13, fontWeight: 600, color: NEGRO, lineHeight: 1.25 }}>{l}</div><div style={{ fontSize: 11, fontWeight: 700, color: GRIS.mut }}>{ch} · 19:00</div></div>
    </div>
  );
  const tgt = { x: CX + 4 * COLW + 6, y: CY + 60 };
  const src = { x: 1230, y: 150 };
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Redes sociales" icon="mega" sub="Planificá y publicá en Instagram y Facebook desde un solo lugar.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid ' + GRIS.borde, borderRadius: 12, padding: '8px 14px' }}><span style={{ fontSize: 15, fontWeight: 600, color: NEGRO }}>Meta</span><span style={{ fontSize: 14, color: VERDE_TX, fontWeight: 600 }}>Conectado</span></div>
      </Head>
      {DAYS.map((d, i) => (
        <div key={d} style={{ position: 'absolute', left: CX + i * COLW, top: 140, width: COLW - 12, height: 740, borderRadius: 16, background: i === 4 ? VIOLETA_T : '#fafafa', ...enter(T, s0 - 0.3 + i * 0.04, 10) }}>
          <div style={{ padding: '16px 12px', fontSize: 15, fontWeight: 600, color: i === 4 ? VIOLETA_TX : NEGRO }}>{d}</div>
        </div>
      ))}
      {POSTS.map(([c, l, ch], i) => <div key={l} style={{ position: 'absolute', left: CX + c * COLW + 6, top: CY + 60 + (i % 2) * 190, ...enter(T, s0 - 0.1 + i * 0.07, 14) }}>{post(l, ch, i)}</div>)}
      {T > prog + 0.1 && <div style={{ position: 'absolute', left: src.x + (tgt.x - src.x) * fly, top: src.y + (tgt.y - src.y) * fly, transform: `scale(${1 + 0.1 * Math.sin(Math.PI * fly)})`, zIndex: 3 }}><div style={{ borderRadius: 14, outline: `3px solid ${VERDE}` }}>{post('Escapada entre viñedos', 'IG + FB', 1, 'assets/fotos/domo.png')}</div></div>}
      <LCard style={{ position: 'absolute', left: 1180, width: 584, top: 140, height: 740, gap: 16, ...enter(T, s0) }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut }}>NUEVA PUBLICACIÓN</div>
        <Img style={{ height: 260, borderRadius: 16 }} src="assets/fotos/domo.png" pos="65% 60%" />
        <div style={{ fontSize: 18, lineHeight: 1.5, color: NEGRO, minHeight: 81 }}>{CAPTION.slice(0, n)}{n < CAPTION.length && <span style={{ display: 'inline-block', width: 2, height: 20, background: VIOLETA, verticalAlign: -3 }} />}</div>
        <div style={{ display: 'flex', gap: 10 }}><Tag tone="V">Instagram</Tag><Tag tone="V">Facebook</Tag></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, color: GRIS.tx }}><Ic n="cal" s={18} c={VIOLETA} />Viernes 14 de agosto · 19:00</div>
        <div style={{ marginTop: 'auto' }}>{T > prog ? <Tag tone="G">✓ PROGRAMADA</Tag> : <BtnVerde icon="send" p={1 - 0.07 * Math.sin(Math.PI * tw(T, prog - 0.12, prog + 0.03, 0, 1))}>PROGRAMAR</BtnVerde>}</div>
      </LCard>
    </div>
  );
}

const LINKS = [['cal', 'Reservar ahora', 'Mejor precio garantizado', 11, 64], ['msg', 'Escribinos por WhatsApp', '+54 9 261 555 0142', 7, 38], ['image', 'Instagram', '@hotellasmoras', 4, 21], ['pin', 'Cómo llegar', 'Chacras de Coria, Mendoza', 2, 15]];
function MyLinks({ T, s0 }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="MyLinks" icon="link" sub="La página de enlaces del hotel para la bio de Instagram."><BtnLinea icon="eye">hotellasmoras.com/mylinks</BtnLinea><Tag tone="G">✓ Publicado</Tag></Head>
      {LINKS.map(([ic, l, d, c0, c1], i) => (
        <LCard key={l} style={{ position: 'absolute', left: 36, width: 1080, top: 150 + i * 150, height: 132, flexDirection: 'row', alignItems: 'center', gap: 18, ...enter(T, s0 - 0.2 + i * 0.08, 14) }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: i === 0 ? VERDE_T : GRIS.suave, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n={ic} s={24} c={i === 0 ? VERDE_TX : NEGRO} /></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 19, fontWeight: 600, color: NEGRO }}>{l}</div><div style={{ fontSize: 15, color: GRIS.mut }}>{d}</div></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 17, color: GRIS.tx, ...nw }}><Ic n="chart" s={18} c={GRIS.mut} /><span style={{ fontWeight: 600, color: NEGRO, fontVariantNumeric: 'tabular-nums' }}>{num(T, s0 + 0.4, s0 + 2.2, c1, c0)}</span> clics</div>
          <div style={{ width: 56, height: 32, borderRadius: 16, background: VERDE, position: 'relative' }}><div style={{ position: 'absolute', right: 4, top: 4, width: 24, height: 24, borderRadius: 12, background: '#fff' }} /></div>
        </LCard>
      ))}
      <div style={{ position: 'absolute', left: 1250, top: 110 }}>
        <Phone w={380} h={780}>
          <div style={{ position: 'absolute', inset: 0, background: NEGRO, padding: '60px 26px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 96, height: 96, borderRadius: 48, background: VIOLETA, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 36, color: '#fff' }}>LM</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 28, color: '#fff' }}>Hotel Las Moras</div>
            <div style={{ fontSize: 14, color: GRIS.claro, textAlign: 'center', lineHeight: 1.5 }}>Hotel boutique entre viñedos, en Chacras de Coria.</div>
            {LINKS.map(([ic, l], i) => {
              const tap = i === 0 ? 1 - 0.05 * Math.sin(Math.PI * ((T - s0) % 0.9 / 0.9)) : 1;
              return <div key={l} style={{ alignSelf: 'stretch', height: 58, borderRadius: 16, background: i === 0 ? VERDE : '#1a1a1a', border: '1px solid ' + (i === 0 ? VERDE : '#242424'), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 16, fontWeight: 600, color: i === 0 ? NEGRO : '#fff', transform: `scale(${tap})`, ...enter(T, s0 + 0.2 + i * 0.1, 10) }}><Ic n={ic} s={18} c={i === 0 ? NEGRO : '#fff'} />{l}</div>;
            })}
          </div>
        </Phone>
      </div>
    </div>
  );
}

function Email({ T, s0 }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Email marketing" icon="mail" sub="Campaña «Escapada de primavera» · enviada a 4.820 contactos."><Tag tone="G">✓ Enviada</Tag></Head>
      <LCard style={{ position: 'absolute', left: 36, width: 700, top: 140, height: 750, padding: 0, overflow: 'hidden', gap: 0, ...enter(T, s0) }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid ' + GRIS.borde }}><div style={{ fontSize: 14, color: GRIS.mut }}>Asunto</div><div style={{ fontSize: 18, fontWeight: 600, color: NEGRO }}>Primavera entre viñedos: 3 noches, pagás 2</div></div>
        <Img style={{ height: 400 }} src="assets/fotos/colonial.png" pos="center 56%" />
        <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 34, color: NEGRO, lineHeight: 1.1 }}>Llegó la primavera a Las Moras</div>
          <div style={{ fontSize: 17, lineHeight: 1.6, color: GRIS.tx }}>Del 21 de septiembre al 15 de octubre, reservando directo en nuestra web, la tercera noche es sin cargo.</div>
          <div style={{ display: 'flex' }}><BtnVerde>RESERVAR</BtnVerde></div>
        </div>
      </LCard>
      <div style={{ position: 'absolute', left: 764, right: 44, top: 140, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 18 }}>
        <Stat label="APERTURA" value={num(T, s0 + 0.3, s0 + 1.5, 46) + '%'} sub="2.217 contactos abrieron" style={enter(T, s0 + 0.1)} />
        <Stat label="CLICS" value={num(T, s0 + 0.4, s0 + 1.6, 12) + '%'} sub="578 clics en Reservar" style={enter(T, s0 + 0.2)} />
        <Stat label="RESERVAS" value={num(T, s0 + 0.5, s0 + 1.7, 38)} sub="Atribuidas a la campaña" accent style={enter(T, s0 + 0.3)} />
        <Stat label="INGRESOS" value={'US$ ' + num(T, s0 + 0.6, s0 + 1.8, 14820).toLocaleString('es-AR')} sub="Venta directa, sin comisión" style={enter(T, s0 + 0.4)} />
      </div>
    </div>
  );
}
function Tramo({ T, C }) {
  const s0 = C.B, sw = s0 + 2.8;
  const p = tw(T, sw - 0.2, sw + 0.2, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {p < 1 && <div style={{ position: 'absolute', inset: 0, opacity: 1 - p }}><MyLinks T={T} s0={s0} /></div>}
      {p > 0 && <div style={{ position: 'absolute', inset: 0, opacity: p }}><Email T={T} s0={sw} /></div>}
    </div>
  );
}

const keys = C => [
  [C.A - 0.3, { x: 700, y: 480, s: 1.3 }, { x: 420, y: 520, s: 1.0 }],
  [C.A + 1.0, { x: 1560, y: 520, s: 1.3 }, { x: 1580, y: 560, s: 1.2 }],
  [C.A + 2.3, { x: 1560, y: 520, s: 1.3 }, { x: 1580, y: 560, s: 1.2 }],
  [C.A + 3.0, { x: 900, y: 460, s: 1.3 }, { x: 800, y: 460, s: 1.1 }],
  [C.A + 3.9, { x: 960, y: 500, s: 0.98 }],
  [C.Titulo + 0.3, { x: 720, y: 460, s: 1.3 }, { x: 560, y: 500, s: 1.0 }],
  [C.B + 1.4, { x: 1500, y: 520, s: 1.2 }, { x: 1550, y: 500, s: 1.3 }],
  [C.B + 2.6, { x: 1500, y: 520, s: 1.2 }, { x: 1550, y: 500, s: 1.3 }],
  [C.B + 3.0, { x: 960, y: 500, s: 1.0 }, { x: 500, y: 520, s: 0.95 }],
  [C.B + 3.9, { x: 1300, y: 420, s: 1.35 }, { x: 1420, y: 420, s: 1.05 }],
  [C.B + 5.4, { x: 960, y: 500, s: 0.98 }]
];
function Piece(P) {
  const { T, C, W, H, v } = P;
  const intro = () => {
    const op = 1 - tw(T, C.A - 0.4, C.A, 0, 1);
    if (op <= 0) return null;
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: v ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: v ? 70 : 110, opacity: op }}>
        {CAPS.map(([nn, l], i) => {
          const a = 0.2 + i * 0.3, on = i === 0 && T > 1.6;
          return (
            <div key={nn} style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: v ? 'center' : 'flex-start', ...enter(T, a, 40) }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: v ? 150 : 190, lineHeight: 1, color: on ? VERDE : i === 0 ? '#fff' : '#3a3a3a' }}>{nn}</div>
              <div style={{ fontSize: v ? 34 : 36, fontWeight: 600, color: on ? '#fff' : GRIS.claro, ...nw }}>{l}</div>
            </div>
          );
        })}
      </div>
    );
  };
  const over = () => {
    const ch = T < C.Titulo ? 0 : T < C.B + 2.8 ? 1 : 2;
    const op = Math.min(tw(T, C.A, C.A + 0.4, 0, 1), 1 - tw(T, C.Cierre - 0.3, C.Cierre, 0, 1)) * (T > C.Titulo && T < C.B ? 0 : 1);
    if (op <= 0) return null;
    return (
      <div style={{ position: 'absolute', left: v ? 50 : 60, top: v ? 60 : 44, display: 'flex', gap: 8, opacity: op }}>
        {CAPS.map(([nn, l], i) => <div key={nn} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 52, padding: '0 20px', borderRadius: 26, background: i === ch ? VERDE : NEGRO, border: '1px solid ' + (i === ch ? VERDE : '#3a3a3a'), color: i === ch ? NEGRO : GRIS.claro, fontSize: 17, fontWeight: 600, ...nw }}><span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20 }}>{nn}</span>{(i === ch || !v) && l}</div>)}
      </div>
    );
  };
  const btn = { txt: 'PROGRAMAR', fb: { x: 1406, y: 922 } };
  return <Std {...P} keys={keys} active="Marketing" scope={SCOPE} label="MARKETING DIGITAL" producto="Marketing Digital" A={<Redes T={T} C={C} />} B={<Tramo T={T} C={C} />} intro={intro} over={over}
    cursor={{ vis: [C.A + 1.4, C.A + 2.6], path: [[C.A + 1.4, { x: 1700, y: 700 }], [C.A + 2.15, btn], [C.A + 2.9, { txt: 'PROGRAMAR', dx: 60, dy: 60, fb: { x: 1466, y: 982 } }]], clicks: [C.A + 2.3] }}
    captions={[]} />;
}
window.RC_MKT = { Video: () => <Video Piece={Piece} /> };
})();
