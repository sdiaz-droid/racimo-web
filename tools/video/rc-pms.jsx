// Racimo · PMS: pantallas (Panel de bienvenida, Plano de ocupación, tarjeta del día) + video
(function () {
const { VERDE, VIOLETA, NEGRO, VERDE_TX, VIOLETA_TX, VERDE_T, VIOLETA_T, VIOLETA_TD, GRIS, MOTION, tw, Ic, Shell, PanelTitle, BtnVerde, BtnLinea, camAt, toStage, World, Cursor, Titulo, Cierre, Bug, Caption, Video, Frame } = window.RC;
const Z = { Intro: 0, Panel: 0, Titulo: 0, Plano: 0, Cierre: 0 };
const BIG = 999;

const ARRIBOS = [['IN', 'Valentina Acosta', 'Suite 302', '10/08 → 12/08'], ['IN', 'Mateo Galarza', 'Doble 218', '10/08 → 14/08'], ['IN', 'Camila Ferreyra', 'Doble 221', '10/08 → 13/08'], ['OUT', 'Renata Ovalle', 'Clásica 105', '07/08 → 10/08'], ['OUT', 'Bruno Saavedra', 'Superior 204', '08/08 → 10/08'], ['OUT', 'Ignacio Peralta', 'Suite 301', '05/08 → 10/08']];
const Kind = ({ k, dark }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 58, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: k === 'IN' ? (dark ? VERDE : VERDE_TX) : (dark ? '#a9a4ff' : VIOLETA_TX) }}>
    <Ic n={k === 'IN' ? 'inArrow' : 'outArrow'} s={14} c={k === 'IN' ? (dark ? VERDE : VERDE_TX) : (dark ? '#a9a4ff' : VIOLETA_TX)} />{k}
  </div>
);
const Card = ({ children, style }) => <div style={{ border: '1px solid ' + GRIS.borde, borderRadius: 16, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14, ...style }}>{children}</div>;
const CardTitle = ({ icon, children }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 19, fontWeight: 600, color: NEGRO }}>{icon && <Ic n={icon} />}{children}</div>;
const Tag = ({ children, violeta }) => <span style={{ fontSize: 13, fontWeight: 600, color: violeta ? VIOLETA_TX : VERDE_TX, background: violeta ? VIOLETA_T : VERDE_T, borderRadius: 8, padding: '4px 10px' }}>{children}</span>;

// ---------- Panel de bienvenida ----------
function Bienvenida({ T = BIG, C = Z }) {
  const s0 = C.Panel;
  const enter = (i) => { const a = s0 - 0.4 + i * 0.07; return { opacity: tw(T, a, a + 0.45, 0, 1), transform: `translateY(${tw(T, a, a + 0.5, 24, 0)}px)` }; };
  const meter = tw(T, s0 + 0.5, s0 + 1.6, 0, 75, MOTION.move);
  const apps = [['grid', 'Plano de ocupación'], ['calPlus', 'Nueva reserva'], ['tag', 'Tarifas'], ['link', 'Canales de venta'], ['receipt', 'Facturación'], ['chart', 'Informes']];
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 22, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 22, alignContent: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card style={{ ...enter(0), padding: '26px 28px', gap: 6 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 32, letterSpacing: '-0.02em', color: NEGRO }}>Hola, Valentina</div>
          <div style={{ fontSize: 17, color: GRIS.mut }}>Lunes, 10 de agosto de 2026</div>
        </Card>
        <Card style={{ ...enter(1), flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: NEGRO }}>Nivel de usabilidad</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, height: 9, borderRadius: 9, background: GRIS.suave, overflow: 'hidden' }}><div style={{ width: meter + '%', height: '100%', borderRadius: 9, background: VERDE }} /></div>
              <div style={{ fontSize: 20, fontWeight: 600, color: VERDE_TX, fontVariantNumeric: 'tabular-nums', width: 50 }}>{Math.round(meter)}%</div>
            </div>
          </div>
          <BtnLinea>Aumentá tu nivel</BtnLinea>
        </Card>
        <Card style={enter(2)}>
          <CardTitle icon="logIn">Arribos y salidas de hoy</CardTitle>
          <div>
            {ARRIBOS.slice(0, 4).map(([k, n, r, d], i) => {
              const a = s0 + 0.25 + i * 0.08;
              return (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0', borderTop: '1px solid ' + GRIS.suave, opacity: tw(T, a, a + 0.35, 0, 1) }}>
                  <Kind k={k} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ fontSize: 17, fontWeight: 600, color: NEGRO }}>{n}</div>
                    <div style={{ fontSize: 14, color: GRIS.mut }}>{r} · {d}</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}><Ic n="right" s={18} c={GRIS.claro} /></div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 600, letterSpacing: '0.06em', color: VIOLETA_TX }}><span>ARRIBOS</span><span>SALIDAS</span></div>
        </Card>
        <Card style={enter(3)}>
          <CardTitle icon="cal">Reservas de hoy</CardTitle>
          {[['Tomás Bidegain', '13/08 → 14/08'], ['Malena Ruiz Díaz', '14/08 → 18/08']].map(([n, d]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '9px 0', borderTop: '1px solid ' + GRIS.suave }}>
              <Tag>NUEVA</Tag>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}><div style={{ fontSize: 17, fontWeight: 600, color: NEGRO, whiteSpace: 'nowrap' }}>{n}</div><div style={{ fontSize: 14, color: GRIS.mut, whiteSpace: 'nowrap' }}>{d}</div></div>
            </div>
          ))}
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card style={enter(1)}>
          <CardTitle>Aplicaciones más usadas</CardTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
            {apps.map(([ic, l], i) => {
              const a = s0 - 0.1 + i * 0.06;
              return (
                <div key={l} style={{ border: '1px solid ' + GRIS.borde, borderRadius: 14, padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, opacity: tw(T, a, a + 0.35, 0, 1), transform: `scale(${tw(T, a, a + 0.45, 0.9, 1, MOTION.pop)})` }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: i === 0 ? VIOLETA_T : GRIS.suave, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n={ic} c={i === 0 ? VIOLETA : NEGRO} /></div>
                  <div style={{ fontSize: 14, color: GRIS.tx, textAlign: 'center' }}>{l}</div>
                </div>
              );
            })}
          </div>
        </Card>
        <div style={{ ...enter(2), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 24, color: NEGRO }}>Novedades</div>
          <BtnLinea icon="plus">Nueva novedad</BtnLinea>
        </div>
        {[['10 de agosto de 2026', 'Llegaron los paquetes', 'Combiná estadía y servicios en una sola reserva, con precios, cupos y extras configurables.'], ['9 de agosto de 2026', 'Más información en el Plano de ocupación', 'Recepción ve el estado operativo de cada habitación directamente desde la grilla.']].map(([d, t, b], i) => (
          <Card key={t} style={enter(3 + i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 14, color: GRIS.mut }}>{d}</span><Tag>Mejora</Tag></div>
            <div style={{ fontSize: 19, fontWeight: 600, color: NEGRO }}>{t}</div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: GRIS.tx }}>{b}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card style={{ ...enter(2), flexDirection: 'row', gap: 16 }}>
          <Ic n="check" s={26} c={NEGRO} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 19, fontWeight: 600, color: NEGRO }}>Tu próxima tarea</div>
            <div style={{ fontSize: 16, color: GRIS.tx }}>Confirmar 3 arribos sin garantía para hoy</div>
            <div style={{ display: 'flex', gap: 12 }}><BtnLinea icon="eye">Ver tareas pendientes</BtnLinea><BtnLinea icon="plus">Agregar</BtnLinea></div>
          </div>
        </Card>
        <Card style={enter(3)}>
          <CardTitle icon="grid">Ocupación de hoy</CardTitle>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 64, letterSpacing: '-0.02em', color: NEGRO, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{Math.round(tw(T, s0 + 0.6, s0 + 1.7, 0, 87, MOTION.move))}%</div>
            <div style={{ fontSize: 16, color: GRIS.mut }}>42 de 48 habitaciones</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}><Tag>12 check-in</Tag><Tag violeta>9 check-out</Tag></div>
        </Card>
        <div style={{ ...enter(4), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 24, color: NEGRO }}>Avisos del sistema</div>
        </div>
        {[['Mantenimiento', '10 de agosto de 2026', 'Ventana de mantenimiento programada', 'Martes 12/08 entre las 03:00 y las 04:00. El sistema sigue operativo.'], ['Seguridad', '8 de agosto de 2026', 'Verificación en dos pasos disponible', 'Activá el segundo factor para todos los usuarios desde Administración.']].map(([tg, d, t, b], i) => (
          <Card key={t} style={enter(5 + i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 14, color: GRIS.mut }}>{d}</span><Tag violeta={i === 0}>{tg}</Tag></div>
            <div style={{ fontSize: 18, fontWeight: 600, color: NEGRO }}>{t}</div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: GRIS.tx }}>{b}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------- Plano de ocupación ----------
const GX = 286, DW = 105, GY = 120, RH = 34, ROW0 = GY + 58 + 3 * 28;
const DIAS = ['mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.', 'lun.'];
const CAT = [['Clásica', 101], ['Superior', 201], ['Suite', 301]];
const ROOMS = []; CAT.forEach(([c, b]) => { for (let i = 0; i < 6; i++) ROOMS.push([c, b + i]); });
// [fila, desde, noches, huésped, pax, tipo]  tipo: c confirmada · i check-in hoy · p pendiente · o en casa
const BARS = [
  [0, 0, 3, 'Ferreyra', 2, 'o'], [0, 5, 4, 'Bidegain', 2, 'c'], [0, 10, 3, 'Luna', 1, 'p'],
  [1, 0, 2, 'Galarza', 2, 'i'], [1, 3, 5, 'Sosa', 3, 'c'], [1, 9, 5, 'Acuña', 2, 'c'],
  [2, 1, 3, 'Molina', 2, 'c'], [2, 6, 2, 'Ríos', 1, 'p'], [2, 8, 6, 'Ortiz', 2, 'c'],
  [3, 0, 1, 'Ovalle', 1, 'o'], [3, 2, 4, 'Paz', 2, 'c'], [3, 7, 3, 'Vera', 2, 'c'],
  [4, 0, 6, 'Herrera', 2, 'c'], [4, 8, 4, 'Quiroga', 3, 'p'],
  [5, 2, 3, 'Díaz', 2, 'i'], [5, 6, 7, 'Aguirre', 2, 'c'],
  [6, 0, 4, 'Saavedra', 3, 'o'], [6, 5, 3, 'Funes', 2, 'c'], [6, 9, 4, 'Castro', 2, 'c'],
  [7, 1, 2, 'Rey', 1, 'c'], [7, 4, 6, 'Medina', 2, 'c'], [7, 11, 3, 'Soto', 2, 'p'],
  [8, 0, 3, 'Ferrer', 2, 'i'], [8, 4, 3, 'Lagos', 2, 'c'], [8, 8, 5, 'Blanco', 4, 'c'],
  [9, 2, 5, 'Méndez', 2, 'c'], [9, 9, 3, 'Ibarra', 2, 'p'],
  [10, 0, 2, 'Arias', 2, 'c'], [10, 3, 4, 'Villa', 3, 'c'], [10, 8, 6, 'Toledo', 2, 'c'],
  [11, 1, 6, 'Rojas', 2, 'c'], [11, 9, 4, 'Cano', 1, 'c'],
  [12, 0, 5, 'Peralta', 2, 'o'], [12, 6, 3, 'Núñez', 2, 'p'], [12, 10, 4, 'Gil', 2, 'c'],
  [13, 0, 2, 'Benítez', 2, 'c'], [13, 8, 4, 'Ponce', 2, 'c'],
  [14, 1, 4, 'Moreno', 2, 'c'], [14, 7, 7, 'Rivas', 2, 'c'],
  [15, 0, 3, 'Campos', 3, 'i'], [15, 5, 5, 'Suárez', 2, 'c'],
  [16, 2, 6, 'Figueroa', 2, 'c'], [16, 10, 3, 'Luque', 2, 'p'],
  [17, 0, 4, 'Cabrera', 2, 'c'], [17, 6, 2, 'Olmos', 1, 'c'], [17, 9, 5, 'Giménez', 2, 'c']
];
const NEW = { row: 13, from: 3, len: 4 };
const STY = { c: [VIOLETA, '#fff'], i: [VERDE, NEGRO], p: [VIOLETA_T, VIOLETA_TX], o: [GRIS.suave, GRIS.tx] };
const newCell = (col) => ({ x: 112 + GX + col * DW, y: 92 + ROW0 + NEW.row * RH + RH / 2 });

function Plano({ T = BIG, C = Z }) {
  const s0 = C.Plano;
  const drag = clamp((T - (s0 + 2.25)) / 0.65, 0, 1);
  const dragLen = T < s0 + 2.2 ? 0 : 0.35 + MOTION.move(drag) * (NEW.len - 0.35);
  const confirmed = T >= s0 + 3.85;
  const occ = DIAS.map((_, d) => BARS.filter(b => d >= b[1] && d < b[1] + b[2]).length + (confirmed && d >= NEW.from && d < NEW.from + NEW.len ? 1 : 0));
  const bump = d => confirmed && d >= NEW.from && d < NEW.from + NEW.len ? tw(T, s0 + 3.9 + (d - NEW.from) * 0.06, s0 + 4.25 + (d - NEW.from) * 0.06, 0, 1, MOTION.pop) : 1;
  const summary = [['Libres', d => 18 - occ[d]], ['Ocupadas', d => occ[d]], ['Ocupación', d => Math.round(occ[d] / 18 * 100) + '%']];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 36, right: 44, top: 32, display: 'flex', alignItems: 'center', gap: 22 }}>
        <PanelTitle icon="grid">Plano de ocupación</PanelTitle>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 50, background: GRIS.suave, borderRadius: 14, padding: '0 20px' }}><Ic n="cal" c={VIOLETA} /><div style={{ fontSize: 16 }}>11/08/2026</div></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, height: 50, border: '1px solid ' + GRIS.borde, borderRadius: 14, padding: '0 18px', boxSizing: 'border-box' }}><div style={{ fontSize: 16, whiteSpace: 'nowrap' }}>14 días</div><Ic n="down" s={18} c={GRIS.mut} /></div>
        <BtnLinea>Hoy</BtnLinea>
        <BtnLinea icon="settings">Filtrar habitaciones</BtnLinea>
        <BtnVerde icon="plus">NUEVA RESERVA</BtnVerde>
      </div>
      <div style={{ position: 'absolute', left: 36, top: GY, width: GX - 36, height: 58, display: 'flex', alignItems: 'center', fontSize: 12, letterSpacing: '0.12em', fontWeight: 600, color: GRIS.mut }}>HABITACIÓN</div>
      {DIAS.map((d, i) => (
        <div key={i} style={{ position: 'absolute', left: GX + i * DW, top: GY, width: DW, height: 58, borderLeft: '1px solid ' + GRIS.borde, textAlign: 'center', background: i === 0 ? VIOLETA_T : 'transparent', boxSizing: 'border-box', paddingTop: 6 }}>
          <div style={{ fontSize: 13, color: GRIS.mut }}>{d}</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 22, color: i === 0 ? VIOLETA_TX : NEGRO }}>{11 + i}</div>
        </div>
      ))}
      {summary.map(([l, f], r) => (
        <div key={l} style={{ position: 'absolute', left: 36, right: 44, top: GY + 58 + r * 28, height: 28, borderTop: '1px solid ' + GRIS.borde }}>
          <div style={{ position: 'absolute', left: 0, top: 5, fontSize: 13, color: GRIS.tx }}>{l}</div>
          {DIAS.map((_, d) => (
            <div key={d} style={{ position: 'absolute', left: GX - 36 + d * DW, width: DW, top: 0, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontVariantNumeric: 'tabular-nums', color: bump(d) < 1 || (confirmed && d >= NEW.from && d < NEW.from + NEW.len) ? VIOLETA_TX : GRIS.tx, fontWeight: confirmed && d >= NEW.from && d < NEW.from + NEW.len ? 600 : 400, transform: `scale(${0.8 + 0.2 * bump(d)})` }}>{f(d)}</div>
          ))}
        </div>
      ))}
      {ROOMS.map(([c, n], r) => {
        const catStart = r % 6 === 0;
        return (
          <div key={n} style={{ position: 'absolute', left: 36, right: 44, top: ROW0 + r * RH, height: RH, borderTop: '1px solid ' + (catStart ? GRIS.borde : GRIS.suave) }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: RH, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: r % 5 === 2 ? VIOLETA : VERDE }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: NEGRO, width: 36 }}>{n}</div>
              <div style={{ fontSize: 13, color: GRIS.mut }}>{c}</div>
            </div>
            {DIAS.map((_, d) => <div key={d} style={{ position: 'absolute', left: GX - 36 + d * DW, top: 0, bottom: 0, borderLeft: '1px solid ' + GRIS.suave }} />)}
          </div>
        );
      })}
      {BARS.map(([r, from, len, g, pax, k], i) => {
        const a = s0 + 0.25 + from * 0.07 + r * 0.012;
        const p = tw(T, a, a + 0.5, 0, 1, MOTION.move);
        if (p <= 0) return null;
        const [bg, fg] = STY[k];
        return (
          <div key={i} style={{ position: 'absolute', left: GX + from * DW + 3, top: ROW0 + r * RH + 4, width: (len * DW - 6) * p, height: RH - 8, borderRadius: 13, background: bg, color: fg, overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', boxSizing: 'border-box', whiteSpace: 'nowrap' }}>
            <Ic n="user" s={12} c={fg} /><span style={{ fontSize: 12, fontWeight: 700 }}>{pax}</span><span style={{ fontSize: 13, fontWeight: 600 }}>{g}</span>
          </div>
        );
      })}
      {dragLen > 0 && (
        <div style={{ position: 'absolute', left: GX + NEW.from * DW + 3, top: ROW0 + NEW.row * RH + 4, width: dragLen * DW - 6, height: RH - 8, borderRadius: 13, boxSizing: 'border-box', background: confirmed ? VIOLETA : VIOLETA_T, border: confirmed ? 'none' : `2px dashed ${VIOLETA}`, color: confirmed ? '#fff' : VIOLETA_TX, display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', overflow: 'hidden', whiteSpace: 'nowrap', transform: `scale(${confirmed ? 1 + 0.08 * Math.sin(Math.PI * tw(T, s0 + 3.85, s0 + 4.2, 0, 1)) : 1})` }}>
          {confirmed ? <React.Fragment><Ic n="user" s={12} c="#fff" /><span style={{ fontSize: 12, fontWeight: 700 }}>2</span><span style={{ fontSize: 13, fontWeight: 600 }}>Acosta</span></React.Fragment> : <span style={{ fontSize: 13, fontWeight: 600 }}>{Math.max(1, Math.round(dragLen))} noches</span>}
        </div>
      )}
    </div>
  );
}

const POP = { x: 112 + GX + NEW.from * DW - 10, y: 92 + ROW0 + NEW.row * RH - 318, w: 500 };
function Popover({ T = BIG, C = Z }) {
  const s0 = C.Plano;
  const op = Math.min(tw(T, s0 + 2.95, s0 + 3.25, 0, 1), 1 - tw(T, s0 + 4.0, s0 + 4.3, 0, 1));
  if (op <= 0) return null;
  const sc = tw(T, s0 + 2.95, s0 + 3.3, 0.94, 1, MOTION.pop);
  const btn = 1 - 0.06 * Math.sin(Math.PI * tw(T, s0 + 3.7, s0 + 3.85, 0, 1));
  const rows = [['user', 'Huésped', 'Valentina Acosta'], ['grid', 'Habitación', 'Suite 302'], ['cal', 'Fechas', '14/08 → 18/08 · 4 noches'], ['tag', 'Tarifa', 'Flexible · 2 personas']];
  return (
    <div style={{ position: 'absolute', left: POP.x, top: POP.y, width: POP.w, background: '#fff', border: '1px solid ' + GRIS.borde, borderRadius: 20, padding: '22px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12, opacity: op, transform: `scale(${sc})`, transformOrigin: '20% 100%' }}>
      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 24, color: NEGRO }}>Nueva reserva</div>
      {rows.map(([ic, k, v]) => (
        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Ic n={ic} s={18} c={GRIS.mut} /><div style={{ fontSize: 14, color: GRIS.mut, width: 96 }}>{k}</div><div style={{ fontSize: 16, fontWeight: 600, color: NEGRO }}>{v}</div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12, marginTop: 4 }}>
        <div style={{ fontSize: 15, color: GRIS.mut, padding: '10px 14px' }}>Cancelar</div>
        <BtnVerde p={btn}>CONFIRMAR</BtnVerde>
      </div>
    </div>
  );
}

// Tarjeta del día (formato oscuro, entra en el intro)
function TarjetaDia({ T = BIG, t0 = -BIG }) {
  const cnt = Math.round(tw(T, t0 + 0.4, t0 + 1.4, 0, 6, MOTION.move));
  const occ = tw(T, t0 + 0.8, t0 + 1.9, 0, 87, MOTION.move);
  return (
    <div style={{ width: 720, background: '#1a1a1a', border: '1px solid #242424', borderRadius: 24, padding: '34px 36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 22, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n="building" s={28} c={NEGRO} /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 30, letterSpacing: '-0.02em', color: '#fff' }}>PMS</div>
          <div style={{ fontSize: 16, color: GRIS.claro }}>Arribos y salidas de hoy</div>
        </div>
        <div style={{ marginLeft: 'auto', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 48, color: VERDE, fontVariantNumeric: 'tabular-nums' }}>{cnt}</div>
      </div>
      <div>
        {ARRIBOS.map(([k, n, r, d], i) => {
          const a = t0 + 0.3 + i * 0.12;
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '15px 2px', borderTop: '1px solid #242424', opacity: tw(T, a, a + 0.35, 0, 1), transform: `translateX(${tw(T, a, a + 0.45, 30, 0)}px)` }}>
              <Kind k={k} dark />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>{n}</div><div style={{ fontSize: 15, color: GRIS.claro }}>{r}</div></div>
              <div style={{ marginLeft: 'auto', fontSize: 16, color: GRIS.claro, fontVariantNumeric: 'tabular-nums' }}>{d}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, paddingTop: 16, borderTop: '1px solid #242424' }}>
        <div style={{ fontSize: 16, color: GRIS.claro, whiteSpace: 'nowrap' }}>Ocupación de hoy</div>
        <div style={{ flex: 1, height: 10, borderRadius: 10, background: '#242424', overflow: 'hidden' }}><div style={{ width: occ + '%', height: '100%', borderRadius: 10, background: VERDE }} /></div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 28, color: VERDE, fontVariantNumeric: 'tabular-nums', width: 70, textAlign: 'right' }}>{Math.round(occ)}%</div>
      </div>
    </div>
  );
}

// ---------- video ----------
const camKeys = C => [
  [C.Panel, { x: 470, y: 560, s: 1.3 }, { x: 450, y: 560, s: 1.25 }],
  [C.Panel + 1.3, { x: 960, y: 500, s: 0.98 }, { x: 700, y: 560, s: 0.82 }],
  [C.Titulo, { x: 980, y: 500, s: 1.0 }, { x: 1150, y: 560, s: 0.82 }],
  [C.Titulo + 0.3, { x: 700, y: 360, s: 1.6 }, { x: 560, y: 420, s: 1.05 }],
  [C.Plano + 1.6, { x: 1250, y: 380, s: 1.45 }, { x: 1200, y: 520, s: 1.05 }],
  [C.Plano + 2.3, { x: 900, y: 700, s: 1.5 }, { x: 900, y: 560, s: 1.35 }],
  [C.Plano + 4.1, { x: 920, y: 690, s: 1.52 }, { x: 920, y: 545, s: 1.38 }],
  [C.Plano + 5.0, { x: 960, y: 500, s: 0.98 }, { x: 960, y: 560, s: 0.56 }]
];

function Piece({ T, C, total, tweaks, W, H, v }) {
  const cam = camAt(T, camKeys(C), v);
  const plano = T >= C.Titulo + 0.3;
  const appOp = tw(T, C.Panel - 0.2, C.Panel + 0.3, 0, 1);
  // intro: tarjeta al centro, luego vuela al widget de arribos
  const m = tw(T, C.Panel - 0.5, C.Panel + 0.25, 0, 1, MOTION.move);
  const target = toStage(camAt(C.Panel, camKeys(C), v), W, H, 420, 560);
  const inS = tw(T, 0.15, 0.7, 0.9, 1, MOTION.pop);
  const cardSc = (v ? 1.2 : 1.05) * inS * (1 - m * 0.2);
  const cx = W / 2 + (target.x - W / 2) * m, cy = H / 2 + (target.y - H / 2) * m;
  const cardOp = tw(T, 0.1, 0.5, 0, 1) * (1 - tw(T, C.Panel + 0.22, C.Panel + 0.34, 0, 1));
  const sx = 112, sy = 92;
  const s0 = C.Plano;
  return (
    <React.Fragment>
      <World cam={cam} W={W} H={H} op={appOp}>
        <Shell active="Operaciones" overlay={plano ? <Popover T={T} C={C} /> : null}>
          {plano ? <Plano T={T} C={C} /> : <Bienvenida T={T} C={C} />}
        </Shell>
      </World>
      {cardOp > 0 && (
        <div style={{ position: 'absolute', left: cx - 360, top: cy - 330, opacity: cardOp, transform: `scale(${cardSc}) translateY(${tw(T, 0.1, 0.7, 60, 0)}px)` }}>
          <TarjetaDia T={T} t0={0.2} />
        </div>
      )}
      <Cursor T={T} cam={cam} W={W} H={H} vis={[s0 + 1.5, s0 + 4.3]}
        path={[[s0 + 1.5, { x: 1500, y: 960 }], [s0 + 2.15, newCell(NEW.from + 0.25)], [s0 + 2.25, newCell(NEW.from + 0.25)], [s0 + 2.9, newCell(NEW.from + NEW.len - 0.1)], [s0 + 3.3, newCell(NEW.from + NEW.len - 0.1)], [s0 + 3.7, { txt: 'CONFIRMAR', fb: { x: POP.x + POP.w - 90, y: POP.y + 268 } }], [s0 + 4.6, { txt: 'CONFIRMAR', dx: 40, dy: 70 }]]}
        clicks={[[s0 + 2.25, s0 + 2.9], s0 + 3.75]} />
      <Titulo T={T} t0={C.Titulo} t1={C.Plano} texto={tweaks.titular} W={W} H={H} v={v} />
      <Cierre T={T} t0={C.Cierre} total={total} producto="PMS" bajada={tweaks.bajada} v={v} />
      <Caption T={T} v={v} items={[[C.Panel + 0.4, C.Titulo, 'OPERACIONES', 'Panel de bienvenida'], [C.Plano + 0.3, C.Cierre, 'OPERACIONES', 'Plano de ocupación']]} />
      <Bug T={T} label="PMS" hide={[[C.Titulo, C.Plano + 4.9]]} end={C.Cierre} />
    </React.Fragment>
  );
}

window.RC_PMS = {
  Bienvenida: () => <Shell active="Operaciones"><Bienvenida /></Shell>,
  Plano: () => <Shell active="Operaciones" overlay={<Popover T={0} C={{ ...Z, Plano: -3.5 }} />}><Plano T={0} C={{ ...Z, Plano: -3.5 }} /></Shell>,
  Tarjeta: () => <TarjetaDia />,
  Video: () => <Video Piece={Piece} />
};
})();
