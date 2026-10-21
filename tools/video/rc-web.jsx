// Racimo · Sitio web. Twist: la página se arma por bloques, del boceto al sitio publicado.
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, GRIS, MOTION, tw, Ic, BtnVerde, BtnLinea, toStage, camAt, Video, enter, Tag, Head, Std, Browser, Img, Phone } = window.RC;
const SCOPE = [['bank', 'RESELLER', 'Reseller Marketing'], ['grid', 'ESTABLECIMIENTO', 'Hotel Las Moras'], ['card', 'PUNTO DE VENTA', 'Las Moras · Web']];
const nw = { whiteSpace: 'nowrap' };
const OUT = { fontFamily: 'Outfit, sans-serif', fontWeight: 500, letterSpacing: '-0.02em', color: NEGRO };
const REV = [['“La atención fue impecable y el desayuno, lo mejor del viaje.”', 'Lucía · Rosario'], ['“A minutos de los viñedos y con una vista increíble.”', 'Daniel · Santiago'], ['“Reservamos directo en la web y nos esperaron con todo listo.”', 'Paula · Córdoba']];

function Site({ narrow, reviews = 1, T = 99, a = -99 }) {
  const e = i => enter(T, a + i * 0.12, 18);
  const pad = narrow ? 20 : 48;
  return (
    <div style={{ width: '100%', background: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ height: narrow ? 64 : 76, display: 'flex', alignItems: 'center', gap: 28, padding: `0 ${pad}px`, ...e(0) }}>
        <div style={{ ...OUT, fontSize: narrow ? 20 : 26, ...nw }}>Hotel Las Moras</div>
        <div style={{ flex: 1 }} />
        {!narrow && ['Habitaciones', 'Servicios', 'Opiniones', 'Contacto'].map(x => <div key={x} style={{ fontSize: 16, color: GRIS.tx }}>{x}</div>)}
        {narrow ? <Ic n="dots" /> : <BtnVerde>RESERVAR</BtnVerde>}
      </div>
      <div style={{ position: 'relative', margin: `0 ${pad}px`, height: narrow ? 300 : 380, borderRadius: 24, overflow: 'hidden', ...e(1) }}>
        <Img style={{ position: 'absolute', inset: 0 }} src="assets/fotos/domos-vinedo.jpg" pos="center 60%" />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,18,18,0.38)' }} />
        <div style={{ position: 'absolute', left: narrow ? 22 : 48, bottom: narrow ? 24 : 44, right: 22 }}>
          <div style={{ ...OUT, color: '#fff', fontSize: narrow ? 38 : 68, lineHeight: 1.05 }}>Tu lugar en Mendoza</div>
          <div style={{ marginTop: 10, fontSize: narrow ? 15 : 19, color: '#fff' }}>A diez minutos de los viñedos de Chacras de Coria.</div>
        </div>
      </div>
      <div style={{ padding: `${narrow ? 28 : 40}px ${pad}px 0`, ...e(2) }}>
        <div style={{ ...OUT, fontSize: narrow ? 26 : 34 }}>Habitaciones</div>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'repeat(3, minmax(0,1fr))', gap: 18 }}>
          {[['Clásica', 95], ['Suite Las Moras', 130], ['Superior', 110]].slice(0, narrow ? 2 : 3).map(([n, p], i) => (
            <div key={n} style={{ border: '1px solid ' + GRIS.borde, borderRadius: 18, overflow: 'hidden' }}>
              <Img style={{ height: narrow ? 120 : 170 }} src={['assets/fotos/cabana-patagonia.jpg', 'assets/fotos/tina-lago.jpg', 'assets/fotos/cabana-lago.jpg'][i]} />
              <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><div style={{ fontSize: 18, fontWeight: 600, color: NEGRO, ...nw }}>{n}</div><div style={{ fontSize: 15, color: GRIS.mut, ...nw }}>desde US$ {p}</div></div>
            </div>
          ))}
        </div>
      </div>
      {reviews > 0 && (
        <div style={{ padding: `${narrow ? 28 : 44}px ${pad}px 40px`, height: narrow ? 'auto' : 300 * reviews, overflow: 'hidden', boxSizing: 'border-box', opacity: Math.min(1, reviews * 1.4) }}>
          <div style={{ ...OUT, fontSize: narrow ? 26 : 34 }}>Lo que dicen nuestros huéspedes</div>
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'repeat(3, minmax(0,1fr))', gap: 18 }}>
            {REV.slice(0, narrow ? 2 : 3).map(([q, w]) => (
              <div key={w} style={{ background: '#fafafa', borderRadius: 18, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 3 }}>{[0, 1, 2, 3, 4].map(i => <Ic key={i} n="star" s={16} c={VERDE_TX} />)}</div>
                <div style={{ fontSize: 16, lineHeight: 1.5, color: NEGRO }}>{q}</div>
                <div style={{ fontSize: 14, color: GRIS.mut }}>{w}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const LIB = [['image', 'Portada'], ['grid', 'Habitaciones'], ['star', 'Opiniones'], ['pin', 'Ubicación'], ['layers', 'Servicios'], ['image', 'Galería']];
const libPos = i => ({ x: 112 + 36 + 150, y: 92 + 190 + i * 74 + 32 });
const CAN = { x: 390, y: 130, w: 1374, h: 750 };
const pubBtn = { x: 1700, y: 92 + 54 };

function Editor({ T, C, cur }) {
  const s0 = C.A, grab = s0 + 1.0, drop = s0 + 1.9, pub = s0 + 3.0;
  const scroll = tw(T, s0 + 0.5, s0 + 1.3, 0, -300, MOTION.move);
  const rev = tw(T, drop, drop + 0.5, 0, 1, MOTION.move);
  const dragging = T > grab && T < drop;
  const published = T > pub;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Head title="Sitio web" icon="globe" sub="hotellasmoras.com · editor de bloques">
        <BtnLinea icon="eye">Vista previa</BtnLinea>
        {published ? <div style={{ transform: `scale(${tw(T, pub, pub + 0.35, 0.85, 1, MOTION.pop)})` }}><Tag tone="G">✓ PUBLICADO</Tag></div> : <BtnVerde icon="send" p={1 - 0.07 * Math.sin(Math.PI * tw(T, pub - 0.12, pub + 0.03, 0, 1))}>PUBLICAR</BtnVerde>}
      </Head>
      <div style={{ position: 'absolute', left: 36, top: CAN.y, width: 330, fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut }}>BLOQUES</div>
      {LIB.map(([ic, l], i) => (
        <div key={l} style={{ position: 'absolute', left: 36, top: 190 - 92 + 92 - 0 + i * 74 - 32 + 32 - 0, width: 330, height: 64, border: `1px solid ${i === 2 && dragging ? VIOLETA : GRIS.borde}`, background: i === 2 && dragging ? VIOLETA_T : '#fff', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', boxSizing: 'border-box', ...enter(T, s0 - 0.3 + i * 0.06, 12) }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: GRIS.suave, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n={ic} s={18} /></div>
          <div style={{ fontSize: 16, fontWeight: 600, color: NEGRO }}>{l}</div>
          <div style={{ marginLeft: 'auto' }}><Ic n="move" s={16} c={GRIS.claro} /></div>
        </div>
      ))}
      <div style={{ position: 'absolute', left: CAN.x, top: CAN.y, width: CAN.w, height: CAN.h, border: '1px solid ' + GRIS.borde, borderRadius: 20, overflow: 'hidden', background: '#fafafa' }}>
        <div style={{ transform: `translateY(${scroll}px)` }}>
          <Site T={T} a={s0 - 0.4} reviews={rev} />
          {rev < 1 && <div style={{ margin: '24px 48px', height: 150 * (1 - rev), border: `2px dashed ${dragging ? VIOLETA : GRIS.borde}`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 18, color: dragging ? VIOLETA_TX : GRIS.mut, background: dragging ? VIOLETA_T : 'transparent', opacity: 1 - rev }}><Ic n="plus" c={dragging ? VIOLETA : GRIS.mut} />Soltá un bloque acá</div>}
        </div>
      </div>
      {dragging && cur && (
        <div style={{ position: 'absolute', left: cur.x - 112 - 150, top: cur.y - 92 - 32, width: 300, height: 64, background: '#fff', border: `2px solid ${VIOLETA}`, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', boxSizing: 'border-box', transform: 'rotate(-2deg)' }}>
          <Ic n="star" s={18} c={VIOLETA} /><div style={{ fontSize: 16, fontWeight: 600, color: NEGRO }}>Opiniones</div>
        </div>
      )}
    </div>
  );
}

function Publicado({ T, C }) {
  const s0 = C.B;
  const sc = tw(T, s0 + 0.6, s0 + 3.6, 0, -330, MOTION.move);
  const phIn = tw(T, s0 + 0.3, s0 + 0.9, 0, 1, MOTION.pop);
  return (
    <div style={{ position: 'relative', width: 1920, height: 1000 }}>
      <Browser url="hotellasmoras.com"><div style={{ transform: `translateY(${sc}px)`, width: 1300 }}><Site /></div></Browser>
      <div style={{ position: 'absolute', left: 1400, top: 90, transform: `translateY(${(1 - phIn) * 80}px)`, opacity: Math.min(1, phIn) }}>
        <Phone w={420} h={840}><div style={{ paddingTop: 30, transform: `translateY(${sc * 1.6}px)` }}><Site narrow /></div></Phone>
      </div>
    </div>
  );
}

// Intro: boceto en bloques
function Boceto({ T }) {
  const B = [[0, 0, 900, 44, ''], [0, 64, 900, 250, 'Portada'], [0, 334, 286, 130, ''], [307, 334, 286, 130, 'Habitaciones'], [614, 334, 286, 130, ''], [0, 484, 440, 90, 'Opiniones'], [460, 484, 440, 90, '']];
  return (
    <div style={{ position: 'relative', width: 900, height: 574 }}>
      {B.map(([x, y, w, h, l], i) => {
        const a = 0.2 + i * 0.16, p = tw(T, a, a + 0.4, 0, 1, MOTION.pop);
        const n = Math.floor(tw(T, a + 0.2, a + 0.6, 0, l.length, Easing.linear));
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 16, background: '#1a1a1a', border: `2px solid ${l ? VIOLETA : '#242424'}`, boxSizing: 'border-box', transform: `scale(${p})`, opacity: Math.min(1, p), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {l && <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 30, color: '#fff' }}>{l.slice(0, n)}</div>}
          </div>
        );
      })}
    </div>
  );
}

const keys = C => [
  [C.A - 0.3, { x: 1150, y: 560, s: 1.2 }, { x: 1180, y: 560, s: 0.72 }],
  [C.A + 0.9, { x: 700, y: 520, s: 1.3 }, { x: 420, y: 520, s: 1.1 }],
  [C.A + 1.9, { x: 1000, y: 600, s: 1.3 }, { x: 1000, y: 620, s: 0.95 }],
  [C.A + 2.6, { x: 1450, y: 300, s: 1.45 }, { x: 1500, y: 360, s: 1.2 }],
  [C.A + 3.3, { x: 1450, y: 300, s: 1.45 }, { x: 1500, y: 360, s: 1.2 }],
  [C.A + 4.1, { x: 960, y: 500, s: 0.98 }],
  [C.Titulo + 0.3, { x: 700, y: 420, s: 1.3 }, { x: 560, y: 480, s: 0.95 }],
  [C.B + 1.8, { x: 900, y: 480, s: 1.15 }, { x: 800, y: 480, s: 0.8 }],
  [C.B + 2.6, { x: 1600, y: 510, s: 1.15 }, { x: 1610, y: 510, s: 1.5 }],
  [C.B + 3.8, { x: 960, y: 500, s: 0.98 }, { x: 1610, y: 510, s: 1.2 }]
];
function curPath(C) {
  const s0 = C.A;
  return [[s0 + 0.5, { x: 700, y: 900 }], [s0 + 0.95, libPos(2)], [s0 + 1.05, libPos(2)], [s0 + 1.85, { x: 1100, y: 700 }], [s0 + 2.0, { x: 1100, y: 700 }], [s0 + 2.85, pubBtn], [s0 + 3.6, { x: pubBtn.x + 40, y: pubBtn.y + 80 }]];
}
function posAt(T, path) {
  let pt = path[0][1];
  for (let i = 0; i < path.length - 1; i++) { const [t0, a] = path[i], [t1, b] = path[i + 1]; if (T >= t0 && T <= t1) { const p = MOTION.move((T - t0) / (t1 - t0)); pt = { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p }; } else if (T > t1) pt = b; }
  return pt;
}
function Piece(P) {
  const { T, C, W, H, v } = P;
  const path = curPath(C);
  const intro = () => {
    const m = tw(T, C.A - 0.55, C.A + 0.2, 0, 1, MOTION.move);
    const op = 1 - tw(T, C.A - 0.05, C.A + 0.25, 0, 1);
    if (op <= 0) return null;
    const cam = camAt(C.A, keys(C), v);
    const tg = toStage(cam, W, H, 112 + CAN.x + CAN.w / 2, 92 + CAN.y + CAN.h / 2);
    const s1 = v ? 1.05 : 1.35, s2 = (CAN.w / 900) * cam.s * 0.8;
    return <div style={{ position: 'absolute', left: W / 2 + (tg.x - W / 2) * m, top: H / 2 + (tg.y - H / 2) * m, opacity: op, transform: `translate(-50%,-50%) scale(${s1 + (s2 - s1) * m})` }}><Boceto T={T} /></div>;
  };
  return <Std {...P} keys={keys} active="Marketing" scope={SCOPE} label="SITIO WEB" producto="Sitio Web" bareB
    A={<Editor T={T} C={C} cur={posAt(T, path)} />} B={<Publicado T={T} C={C} />} intro={intro}
    cursor={{ vis: [C.A + 0.5, C.A + 3.4], path, clicks: [[C.A + 1.0, C.A + 1.9], C.A + 2.95] }}
    captions={[[C.A + 0.3, C.Titulo, 'EN RACIMO', 'Editor de bloques'], [C.B + 0.2, C.Cierre, 'PUBLICADO', 'Web y mobile']]} />;
}
window.RC_WEB = { Video: () => <Video Piece={Piece} /> };
})();
