// Racimo · videos con el PMS REAL (devolución del 04/11/2026).
// Cada toma es una captura anonimizada del PMS de Racimo a 2x (3840×2000 → mundo de 1920×1000):
// la cámara recorre la pantalla, el cursor hace lo que haría el hotelero, un marco violeta señala
// y las tarjetas salen de la pantalla con lo que importa. Nada de datos reales: todo pasó por anon.js.
(function () {
const { VERDE, VIOLETA, NEGRO, GRIS, MOTION, tw, camAt, toStage, World, Cursor, Titulo, Cierre, Bug, Ic } = window.RC;

// ── tomas en fila dentro de un tramo (A o B), con fundido entre una y otra ──
function tomaActiva(T, t0, shots) {
  let acc = t0;
  return shots.map(s => { const a = acc; acc += s.d; return { ...s, a, b: acc }; });
}

// marco que señala una zona de la pantalla (coordenadas de mundo)
function Marco({ T, a, b, x, y, w, h }) {
  const op = Math.min(tw(T, a, a + 0.35, 0, 1), 1 - tw(T, b - 0.3, b, 0, 1));
  if (op <= 0) return null;
  const k = tw(T, a, a + 0.5, 1.06, 1, MOTION.move);
  return <div style={{ position: 'absolute', left: x - 8, top: y - 8, width: w + 16, height: h + 16, borderRadius: 14, border: `4px solid ${VIOLETA}`, boxShadow: `0 0 0 9999px rgba(18,18,18,${0.28 * op}), 0 0 40px rgba(108,99,255,.55)`, opacity: op, transform: `scale(${k})`, transformOrigin: 'center' }} />;
}

// tarjeta que sale de la pantalla (coordenadas de escenario)
function Pop({ T, a, b, sx, sy, ox = 0, oy = -120, eb, tx, tone = 'b', icon, W, v }) {
  const p = tw(T, a, a + 0.55, 0, 1, MOTION.pop);
  const out = 1 - tw(T, b - 0.3, b, 0, 1);
  if (p <= 0 || out <= 0) return null;
  const fondo = tone === 'g' ? VERDE : tone === 'v' ? VIOLETA : tone === 'n' ? NEGRO : '#fff';
  const tinta = tone === 'v' || tone === 'n' ? '#fff' : NEGRO;
  const sub = tone === 'v' || tone === 'n' ? 'rgba(255,255,255,.72)' : GRIS.mut;
  const fs = v ? 34 : 30;
  return (
    <div style={{ position: 'absolute', left: sx + ox * p, top: sy + oy * p, transform: `translate(-50%,-50%) scale(${0.55 + 0.45 * p})`, opacity: Math.min(1, p * 1.6) * out, pointerEvents: 'none' }}>
      <div style={{ background: fondo, color: tinta, borderRadius: 22, padding: v ? '22px 30px' : '20px 28px', boxShadow: '0 2px 4px rgba(0,0,0,.18), 0 18px 42px rgba(0,0,0,.32), 0 40px 80px rgba(0,0,0,.22)', display: 'flex', alignItems: 'center', gap: 18, whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>
        {icon && <div style={{ width: v ? 54 : 50, height: v ? 54 : 50, borderRadius: '50%', background: tone === 'b' ? '#f0efff' : 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ic n={icon} s={v ? 28 : 26} c={tone === 'b' ? VIOLETA : tinta} /></div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {eb && <div style={{ fontSize: v ? 17 : 15, letterSpacing: '0.14em', fontWeight: 600, color: sub }}>{eb}</div>}
          <div style={{ fontSize: fs, fontWeight: 600, letterSpacing: '-0.01em' }}>{tx}</div>
        </div>
      </div>
    </div>
  );
}

// una pantalla larga que se scrollea dentro de un rectángulo de la captura (el celular de vista previa)
// k: [[t, fracción del recorrido]] relativos a la toma; entre claves, easeInOut
function Desliza({ T, a, src, x, y, w, h, r, alto, k }) {
  let f = k[0][1];
  for (let i = 1; i < k.length; i++) if (T >= a + k[i - 1][0]) f = tw(T, a + k[i - 1][0], a + k[i][0], k[i - 1][1], k[i][1], MOTION.move);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: r, overflow: 'hidden', background: '#f5efe6' }}>
      <img src={src} style={{ position: 'absolute', left: 0, top: -f * (alto - h), width: w, height: alto }} />
    </div>
  );
}

// una pantalla real dentro del mundo
function Pantalla({ src }) {
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1000, borderRadius: 28, overflow: 'hidden', background: '#fff', boxShadow: '0 30px 80px rgba(0,0,0,.45)' }}>
      <img src={src} style={{ width: 1920, height: 1000, display: 'block' }} />
    </div>
  );
}

// en vertical, la captura del celular dentro de un teléfono
function Telefono({ T, a, b, src, W, H, r }) {
  const w = 760, h = w * (r || 2532 / 1170);
  const op = Math.min(tw(T, a, a + 0.4, 0, 1), 1 - tw(T, b - 0.35, b, 0, 1));
  const y = tw(T, a, b, 0, -Math.max(0, h - 1500) * 0.9, MOTION.move);
  return (
    <div style={{ position: 'absolute', left: (W - w - 28) / 2, top: 250, width: w + 28, height: 1500, borderRadius: 72, background: NEGRO, border: '2px solid #2a2a2a', padding: 14, boxSizing: 'border-box', opacity: op, boxShadow: '0 40px 90px rgba(0,0,0,.5)' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 58, overflow: 'hidden', background: '#fff' }}>
        <img src={src} style={{ position: 'absolute', left: 0, top: y, width: w, height: h }} />
      </div>
    </div>
  );
}

function hacer(cfg) {
  return function Piece(P) {
    const { T, C, total, tweaks, W, H, v } = P;
    const tramos = [['A', C.A, cfg.A], ['B', C.B, cfg.B]];
    const capas = [];
    let cam = { x: 960, y: 500, s: 1 }, cursor = null;
    for (const [nombre, t0, shots] of tramos) {
      for (const s of tomaActiva(T, t0, shots)) {
        if (T < s.a - 0.4 || T > s.b + 0.4) continue;
        const op = Math.min(tw(T, s.a - 0.35, s.a + 0.05, 0, 1), 1 - tw(T, s.b - 0.05, s.b + 0.3, 0, 1));
        if (op <= 0) continue;
        if (v && s.srcV) {
          capas.push(<Telefono key={s.src + 'v'} T={T} a={s.a} b={s.b} src={s.srcV} r={s.srcVr} W={W} H={H} />);
        } else {
          const K = s.cam.map(([t, c, cv]) => [s.a + t, c, cv]);
          const c = camAt(T, K, v);
          if (T >= s.a && T <= s.b) cam = c;
          capas.push(
            <div key={s.src} style={{ position: 'absolute', inset: 0, opacity: op }}>
              <World cam={c} W={W} H={H}>
                <Pantalla src={s.src} />
                {s.desliza && <Desliza T={T} a={s.a} {...s.desliza} />}
                {(s.marcos || []).map((m, i) => <Marco key={i} T={T} a={s.a + m.t} b={s.a + (m.hasta ?? s.d)} {...m} />)}
              </World>
            </div>
          );
          if (s.cursor && T >= s.a && T <= s.b) cursor = { cam: c, path: s.cursor.path.map(([t, p]) => [s.a + t, p]), clicks: (s.cursor.clicks || []).map(t => s.a + t), vis: [s.a + s.cursor.path[0][0], s.a + s.cursor.path[s.cursor.path.length - 1][0] + 0.4] };
        }
        // tarjetas: en horizontal salen del punto de la pantalla; en vertical se apilan abajo
        (s.pops || []).forEach((p, i) => {
          const a = s.a + p.t, b = s.a + (p.hasta ?? s.d);
          if (v) {
            capas.push(<Pop key={s.src + 'p' + i} T={T} a={a} b={b} sx={W / 2} sy={1520 + i * 0} ox={0} oy={-40 - (i % 2) * 150} {...p} W={W} v={v} />);
          } else {
            const K = s.cam.map(([t, c, cv]) => [s.a + t, c, cv]);
            const st = toStage(camAt(T, K, v), W, H, p.x, p.y);
            capas.push(<Pop key={s.src + 'p' + i} T={T} a={a} b={b} sx={st.x} sy={st.y} {...p} W={W} v={v} />);
          }
        });
      }
    }
    // intro: el dato del producto, grande, sobre negro
    const io = 1 - tw(T, C.A - 0.4, C.A, 0, 1);
    const intro = cfg.intro && io > 0 ? (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: v ? 34 : 26, opacity: io }}>
        <div style={{ fontSize: v ? 26 : 24, letterSpacing: '0.18em', fontWeight: 600, color: GRIS.claro, opacity: tw(T, 0.2, 0.7, 0, 1) }}>{cfg.intro.eb}</div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: v ? 132 : 150, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1, textAlign: 'center', maxWidth: v ? 900 : 1900, opacity: tw(T, 0.35, 0.9, 0, 1), transform: `translateY(${tw(T, 0.35, 1.0, 30, 0)}px)` }}>
          {cfg.intro.tx.split('|').map((x, i) => <span key={i} style={{ color: i ? VERDE : '#fff' }}>{x}</span>)}
        </div>
      </div>
    ) : null;
    return (
      <React.Fragment>
        {intro}
        {capas}
        {cursor && <Cursor T={T} cam={cursor.cam} W={W} H={H} path={cursor.path} clicks={cursor.clicks} vis={cursor.vis} />}
        <Titulo T={T} t0={C.Titulo} t1={C.B} texto={tweaks.titular} W={W} H={H} v={v} />
        <Cierre T={T} t0={C.Cierre} total={total} producto={cfg.producto} bajada={tweaks.bajada} v={v} />
        <Bug T={T} label={cfg.label} end={C.Cierre - 0.3} hide={[[C.Titulo, C.B]]} />
      </React.Fragment>
    );
  };
}
window.RCREAL = { hacer };
})();
