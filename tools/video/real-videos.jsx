// Los diez videos de producto de Racimo, armados con el PMS REAL (capturas anonimizadas a 2x).
// Cada toma: src, d (segundos), cam [[t, {x,y,s}]], marcos y pops (tarjetas que salen de la pantalla).
// Coordenadas de mundo: la pantalla mide 1920×1000.
(function () {
const R = '/video/comun/real/';
const T = (n, d, cam, extra = {}) => ({ src: R + n + '.webp', d, cam, ...extra });
const c = (x, y, s) => ({ x, y, s });
const todo = c(960, 500, 1.18);

const VIDEOS = {
  PMS: {
    label: 'PMS', producto: 'PMS',
    intro: { eb: 'PMS · CON TU MARCA', tx: 'Todo el hotel, |en un solo lugar.' },
    A: [
      T('pms-inicio', 2.4, [[0, todo], [1.0, c(420, 500, 1.85)]], { srcV: R + 'pms-inicio-cel.webp',
        marcos: [{ t: 0.9, x: 120, y: 320, w: 1010, h: 300 }],
        pops: [{ t: 1.3, x: 600, y: 330, eb: 'HOY', tx: 'Arribos y salidas del día', icon: 'cal', tone: 'b' }] }),
      T('pms-plano', 2.8, [[0, c(960, 470, 1.25)], [1.4, c(700, 420, 1.7)], [2.8, c(1100, 420, 1.7)]], {
        pops: [{ t: 0.6, x: 640, y: 160, eb: 'PLANO DE OCUPACIÓN', tx: 'Todas las habitaciones, en tiempo real', icon: 'grid', tone: 'v' }],
        cursor: { path: [[0.4, { x: 1500, y: 600 }], [1.4, { x: 1730, y: 24 }], [2.3, { x: 1730, y: 24 }]], clicks: [1.6] } }),
    ],
    B: [
      T('pms-caja', 2.5, [[0, todo], [0.9, c(330, 380, 1.95)]], { srcV: R + 'pms-caja-cel.webp',
        marcos: [{ t: 0.8, x: 110, y: 170, w: 300, h: 420 }],
        pops: [{ t: 1.2, x: 420, y: 260, eb: 'CAJA DIARIA', tx: 'Efectivo, tarjeta y transferencia, en $ y US$', icon: 'bank', tone: 'g' }] }),
      T('pms-facturas', 2.3, [[0, c(960, 480, 1.2)], [1.0, c(1300, 300, 1.7)]], {
        pops: [{ t: 0.7, x: 1260, y: 200, eb: 'FACTURACIÓN', tx: 'Comprobantes electrónicos con CAE', icon: 'receipt', tone: 'v' }] }),
    ],
  },
  CHANNEL: {
    label: 'CHANNEL MANAGER', producto: 'Channel Manager',
    intro: { eb: 'CHANNEL MANAGER · CON TU MARCA', tx: 'Una tarifa, |todos los canales.' },
    A: [
      T('ch-canales', 2.8, [[0, todo], [1.0, c(470, 420, 1.75)], [2.8, c(1250, 420, 1.55)]], {
        marcos: [{ t: 0.9, x: 120, y: 120, w: 560, h: 560, hasta: 1.9 }],
        pops: [{ t: 1.1, x: 420, y: 140, eb: 'RENDIMIENTO', tx: 'Ventas por canal, en un solo panel', icon: 'chart', tone: 'b' },
               { t: 2.0, x: 1300, y: 140, eb: 'CANALES', tx: 'Booking, Expedia, Despegar y más', icon: 'link', tone: 'v' }] }),
      T('ch-tarifas', 2.4, [[0, c(960, 480, 1.2)], [1.2, c(900, 330, 1.7)]], {
        pops: [{ t: 0.8, x: 900, y: 170, eb: 'TARIFAS Y DISPONIBILIDAD', tx: 'Una carga, todos los canales', icon: 'refresh', tone: 'g' }],
        cursor: { path: [[0.5, { x: 600, y: 600 }], [1.4, { x: 1820, y: 96 }], [2.2, { x: 1820, y: 96 }]], clicks: [1.6] } }),
    ],
    B: [
      T('ch-canales', 2.4, [[0, c(1300, 520, 1.5)], [2.4, c(1300, 700, 1.75)]], {
        pops: [{ t: 0.6, x: 1300, y: 330, eb: 'SIN SOBREVENTA', tx: 'El inventario se actualiza solo', icon: 'check', tone: 'g' }] }),
      T('pms-reservas', 2.4, [[0, todo], [1.0, c(900, 330, 1.6)]], {
        pops: [{ t: 0.8, x: 1150, y: 230, eb: 'RESERVAS', tx: 'Todas entran al mismo lugar', icon: 'cal', tone: 'v' }] }),
    ],
  },
  MOTOR: {
    label: 'MOTOR DE RESERVAS', producto: 'Motor de reservas',
    intro: { eb: 'MOTOR DE RESERVAS · CON TU MARCA', tx: 'Más reservas directas, |desde tu propio motor.' },
    A: [
      T('mo-motor', 2.8, [[0, c(960, 470, 1.2)], [1.2, c(900, 650, 1.7)]], { srcV: R + 'mo-motor-cel.webp',
        marcos: [{ t: 1.0, x: 400, y: 560, w: 1140, h: 90 }],
        pops: [{ t: 1.3, x: 1180, y: 520, eb: 'RESERVA DIRECTA', tx: 'El huésped reserva en la web del hotel', icon: 'cal', tone: 'g' }],
        cursor: { path: [[0.5, { x: 900, y: 300 }], [1.6, { x: 1430, y: 608 }], [2.4, { x: 1430, y: 608 }]], clicks: [1.8] } }),
      T('mo-motor', 2.2, [[0, c(800, 720, 1.7)], [2.2, c(800, 760, 1.8)]], {
        pops: [{ t: 0.4, x: 700, y: 640, eb: 'PROMOCIONES', tx: 'Mejor tarifa garantizada', icon: 'spark', tone: 'v' }] }),
    ],
    B: [
      T('mo-motor', 2.4, [[0, c(960, 640, 1.3)], [1.2, c(900, 820, 1.7)]], {
        pops: [{ t: 0.7, x: 900, y: 700, eb: 'CON LA MARCA DEL HOTEL', tx: 'Habitaciones, fotos y tarifas propias', icon: 'grid', tone: 'b' }] }),
      T('mo-promos', 2.4, [[0, todo], [1.0, c(700, 300, 1.6)]], {
        pops: [{ t: 0.8, x: 760, y: 170, eb: 'PROMOCIONES Y PAQUETES', tx: 'Ofertas propias, distintas a las OTAs', icon: 'tag', tone: 'g' }] }),
    ],
  },
  WEB: {
    label: 'SITIO WEB', producto: 'Sitio web',
    intro: { eb: 'SITIO WEB · CON TU MARCA', tx: 'La web del hotel, |lista en minutos.' },
    A: [
      T('web-sitio-foto', 2.8, [[0, c(960, 500, 1.15)], [2.8, c(960, 470, 1.35)]], { srcV: R + 'web-sitio-cel-foto.webp',
        pops: [{ t: 1.0, x: 1500, y: 300, eb: 'SITIO DEL HOTEL', tx: 'Rápido, lindo y listo para Google', icon: 'globe', tone: 'b' }] }),
      T('web-sitio-foto', 2.2, [[0, c(1400, 130, 1.9)], [2.2, c(1500, 135, 2.0)]], {
        pops: [{ t: 0.4, x: 1500, y: 230, eb: 'MOTOR INTEGRADO', tx: 'Se reserva sin salir de la web', icon: 'cal', tone: 'g' }],
        cursor: { path: [[0.3, { x: 1300, y: 300 }], [1.2, { x: 1730, y: 145 }], [2.0, { x: 1730, y: 145 }]], clicks: [1.4] } }),
    ],
    B: [
      T('web-mylinks', 2.6, [[0, todo], [1.0, c(1520, 520, 1.7)]], {
        pops: [{ t: 0.8, x: 1300, y: 330, eb: 'MY LINKS', tx: 'Todos los links del hotel, en su dominio', icon: 'link', tone: 'v' }] }),
      T('web-sitio-foto', 2.2, [[0, c(960, 500, 1.2)], [2.2, c(960, 520, 1.25)]], {
        pops: [{ t: 0.4, x: 960, y: 420, eb: 'EN CELULAR Y EN COMPU', tx: 'Se adapta a cualquier pantalla', icon: 'grid', tone: 'g' }] }),
    ],
  },
  RMS: {
    label: 'RMS', producto: 'RMS',
    intro: { eb: 'RMS · REVENUE MANAGEMENT', tx: 'La tarifa justa, |cada día.' },
    A: [
      T('rms-diario', 2.6, [[0, todo], [1.0, c(560, 230, 1.8)]], {
        marcos: [{ t: 0.9, x: 110, y: 140, w: 1100, h: 170 }],
        pops: [{ t: 1.2, x: 700, y: 150, eb: 'DIARIO DE REVENUE', tx: 'Ocupación, ADR y RevPAR al día', icon: 'chart', tone: 'b' }] }),
      T('rms-diario', 2.6, [[0, c(800, 600, 1.6)], [1.4, c(700, 640, 1.8)]], {
        pops: [{ t: 0.6, x: 800, y: 470, eb: 'OPORTUNIDADES', tx: 'Tarifas sugeridas con IA', icon: 'spark', tone: 'v' }],
        cursor: { path: [[0.4, { x: 400, y: 800 }], [1.4, { x: 563, y: 679 }], [2.3, { x: 563, y: 679 }]], clicks: [1.6] } }),
    ],
    B: [
      T('rms-compset', 2.4, [[0, todo], [1.0, c(700, 420, 1.6)]], {
        pops: [{ t: 0.8, x: 700, y: 250, eb: 'SET COMPETITIVO', tx: 'Las tarifas de la competencia, solas', icon: 'users', tone: 'g' }] }),
      T('rms-agente', 2.4, [[0, todo], [1.0, c(700, 420, 1.6)]], {
        pops: [{ t: 0.8, x: 800, y: 270, eb: 'AGENTE DE REVENUE', tx: 'Sugiere y aplica, con tus reglas', icon: 'spark', tone: 'v' }] }),
    ],
  },
  CRM: {
    label: 'CRM', producto: 'CRM',
    intro: { eb: 'CRM · CON TU MARCA', tx: 'Ninguna consulta |sin respuesta.' },
    A: [
      T('crm-conversa', 2.6, [[0, todo], [1.0, c(1240, 420, 1.55)]], {
        marcos: [{ t: 1.6, x: 680, y: 790, w: 1120, h: 110 }],
        pops: [{ t: 0.7, x: 1100, y: 120, eb: 'WHATSAPP, INSTAGRAM Y WEB', tx: 'Todas las consultas en una bandeja', icon: 'msg', tone: 'b' },
               { t: 1.7, x: 1240, y: 760, eb: 'RACIMO IA', tx: 'Te sugiere la respuesta', icon: 'spark', tone: 'v' }] }),
      T('crm-conversa', 2.6, [[0, c(1240, 500, 1.6)], [2.6, c(1240, 560, 1.75)]], {
        pops: [{ t: 0.5, x: 1240, y: 470, eb: 'RESERVA CONFIRMADA', tx: 'La consulta termina en reserva directa', icon: 'check', tone: 'g' }] }),
    ],
    B: [
      T('crm-mailing', 2.4, [[0, todo], [1.0, c(700, 360, 1.7)]], {
        pops: [{ t: 0.8, x: 700, y: 230, eb: 'EMAIL MARKETING', tx: 'Campañas antes, durante y después', icon: 'mail', tone: 'v' }] }),
      T('ia-agentes', 2.4, [[0, todo], [1.0, c(560, 430, 1.8)]], {
        pops: [{ t: 0.8, x: 760, y: 320, eb: 'AGENTE DE IA', tx: 'Responde solo, con tus reglas', icon: 'spark', tone: 'g' }] }),
    ],
  },
  POS: {
    label: 'POS', producto: 'POS',
    intro: { eb: 'POS · PUNTO DE VENTA', tx: 'Del pedido a la habitación, |sin papeles.' },
    A: [
      T('pos-menus', 2.6, [[0, todo], [1.0, c(1150, 520, 1.6)]], { srcV: R + 'pos-menus-cel.webp',
        pops: [{ t: 0.8, x: 900, y: 360, eb: 'CARTA DIGITAL', tx: 'El menú del hotel, por QR', icon: 'grid', tone: 'b' }] }),
      T('pos-room', 2.4, [[0, todo], [1.0, c(760, 560, 1.45)]], {
        pops: [{ t: 0.8, x: 760, y: 330, eb: 'ROOM SERVICE', tx: 'Pedidos que llegan solos a cocina', icon: 'bell', tone: 'v' }] }),
    ],
    B: [
      T('pos-inventario', 2.6, [[0, todo], [1.0, c(760, 420, 1.6)]], {
        pops: [{ t: 0.8, x: 760, y: 230, eb: 'INVENTARIO', tx: 'El stock se descuenta con cada venta', icon: 'box', tone: 'g' }] }),
      T('pms-caja', 2.2, [[0, c(960, 500, 1.2)], [1.0, c(1000, 760, 1.6)]], {
        pops: [{ t: 0.6, x: 1000, y: 640, eb: 'A LA CUENTA', tx: 'El consumo pasa a la cuenta del huésped', icon: 'receipt', tone: 'v' }] }),
    ],
  },
  GUESTAPP: {
    label: 'GUESTAPP', producto: 'GuestApp',
    intro: { eb: 'GUESTAPP · CON TU MARCA', tx: 'El hotel, |en el teléfono del huésped.' },
    A: [
      T('hu-llaves', 2.8, [[0, todo], [1.0, c(700, 360, 1.6)]], {
        pops: [{ t: 0.8, x: 760, y: 220, eb: 'LLAVE DIGITAL', tx: 'La habitación se abre con el teléfono', icon: 'key', tone: 'b' }] }),
      T('hu-mensajes', 2.4, [[0, todo], [1.0, c(760, 300, 1.6)]], {
        pops: [{ t: 0.8, x: 760, y: 180, eb: 'MENSAJES', tx: 'El huésped escribe desde la app', icon: 'msg', tone: 'v' }] }),
    ],
    B: [
      T('pos-room', 2.4, [[0, todo], [1.0, c(760, 560, 1.45)]], {
        pops: [{ t: 0.8, x: 760, y: 330, eb: 'ROOM SERVICE', tx: 'Pide desde la habitación', icon: 'bell', tone: 'g' }] }),
      T('hu-llaves', 2.4, [[0, c(960, 500, 1.2)], [2.4, c(1100, 600, 1.5)]], {
        pops: [{ t: 0.6, x: 1100, y: 450, eb: 'CHECK-IN Y CHECK-OUT', tx: 'Sin pasar por recepción', icon: 'check', tone: 'v' }] }),
    ],
  },
  AGENTES: {
    label: 'AGENTES DE IA', producto: 'Agentes de IA',
    intro: { eb: 'AGENTES DE IA · CON TU MARCA', tx: 'Un equipo de IA |en cada puesto del hotel.' },
    A: [
      T('ia-inicio', 2.8, [[0, todo], [1.0, c(1150, 330, 1.6)]], {
        pops: [{ t: 0.8, x: 1150, y: 200, eb: 'RACIMO IA', tx: 'Pregúntale lo que necesites del hotel', icon: 'spark', tone: 'b' }],
        cursor: { path: [[0.4, { x: 900, y: 800 }], [1.6, { x: 1150, y: 915 }], [2.5, { x: 1150, y: 915 }]], clicks: [1.8] } }),
      T('ia-agentes', 2.4, [[0, todo], [1.0, c(560, 430, 1.8)]], {
        pops: [{ t: 0.8, x: 760, y: 320, eb: 'AGENTES', tx: 'Recepción, reservas y CRM', icon: 'users', tone: 'v' }] }),
    ],
    B: [
      T('ia-rutinas', 2.4, [[0, todo], [1.0, c(700, 260, 1.7)]], {
        pops: [{ t: 0.8, x: 760, y: 150, eb: 'RUTINAS', tx: 'Tareas que el agente hace solo', icon: 'refresh', tone: 'g' }] }),
      T('rms-agente', 2.4, [[0, todo], [1.0, c(700, 420, 1.6)]], {
        pops: [{ t: 0.8, x: 800, y: 270, eb: 'TÚ DECIDES', tx: 'Supervisado o autónomo', icon: 'check', tone: 'v' }] }),
    ],
  },
  ADS: {
    label: 'PUBLICIDAD DIGITAL', producto: 'Publicidad digital',
    intro: { eb: 'PUBLICIDAD DIGITAL', tx: 'Primero en Google, |no la OTA.' },
    A: [
      T('ads-ads', 2.8, [[0, todo], [1.0, c(700, 230, 1.6)]], {
        marcos: [{ t: 0.9, x: 70, y: 120, w: 1180, h: 110 }],
        pops: [{ t: 1.1, x: 700, y: 110, eb: 'RESULTADOS', tx: 'Impresiones, clics y conversiones', icon: 'chart', tone: 'b' }] }),
      T('ads-ads', 2.4, [[0, c(700, 600, 1.5)], [2.4, c(700, 640, 1.65)]], {
        pops: [{ t: 0.5, x: 700, y: 470, eb: 'EMBUDO', tx: 'De la búsqueda a la reserva', icon: 'grid', tone: 'v' }] }),
    ],
    B: [
      T('ads-inversion', 2.6, [[0, todo], [1.0, c(960, 230, 1.6)]], {
        pops: [{ t: 0.8, x: 960, y: 120, eb: 'COSTO DE DISTRIBUCIÓN', tx: 'Mucho menos que la comisión de la OTA', icon: 'bank', tone: 'g' }] }),
      T('ads-inversion', 2.2, [[0, c(960, 480, 1.5)], [2.2, c(960, 500, 1.6)]], {
        pops: [{ t: 0.5, x: 960, y: 380, eb: 'RESERVAS POR CANAL', tx: 'Directo, OTA y otros', icon: 'cal', tone: 'v' }] }),
    ],
  },
};
window.RACIMO_REAL = VIDEOS;
})();
