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
    // Revisión 2 de Racimo: «una imagen más general del motor». Hotel inventado (Hotel Los Álamos, Valle Escondido),
    // con la estética del motor real: arranca con el motor completo y recién después se acerca.
    A: [
      T('mo-motor-v2', 2.8, [[0, todo], [1.0, todo], [1.9, c(960, 430, 1.55)]], { srcV: R + 'mo-motor-cel-v2.webp',
        marcos: [{ t: 1.7, x: 395, y: 385, w: 1130, h: 78 }],
        pops: [{ t: 1.9, x: 760, y: 360, eb: 'RESERVA DIRECTA', tx: 'El huésped reserva en la web del hotel', icon: 'cal', tone: 'g' }],
        cursor: { path: [[0.4, { x: 900, y: 720 }], [1.9, { x: 1438, y: 424 }], [2.6, { x: 1438, y: 424 }]], clicks: [2.1] } }),
      T('mo-motor-v2', 2.2, [[0, c(1170, 540, 1.6)], [2.2, c(1190, 545, 1.7)]], {
        pops: [{ t: 0.4, x: 1400, y: 700, eb: 'MEJOR TARIFA GARANTIZADA', tx: 'Más barato reservando directo', icon: 'spark', tone: 'v' }] }),
    ],
    B: [
      T('mo-motor-v2', 2.4, [[0, todo], [0.7, todo], [2.4, c(960, 790, 1.45)]], {
        pops: [{ t: 1.1, x: 960, y: 690, eb: 'CON LA MARCA DEL HOTEL', tx: 'Habitaciones, fotos y tarifas propias', icon: 'grid', tone: 'b' }] }),
      T('mo-promos', 2.4, [[0, todo], [1.0, c(700, 300, 1.6)]], {
        pops: [{ t: 0.8, x: 760, y: 170, eb: 'PROMOCIONES Y PAQUETES', tx: 'Ofertas propias, distintas a las OTAs', icon: 'tag', tone: 'g' }] }),
    ],
  },
  WEB: {
    label: 'SITIO WEB', producto: 'Sitio web',
    intro: { eb: 'SITIO WEB · CON TU MARCA', tx: 'La web del hotel, |que vende directo.' },
    A: [
      T('web-sitio-foto', 2.8, [[0, c(960, 500, 1.15)], [2.8, c(960, 470, 1.35)]], { srcV: R + 'web-sitio-cel-foto.webp',
        pops: [{ t: 1.0, x: 1500, y: 300, eb: 'SITIO DEL HOTEL', tx: 'Rápido, lindo y listo para Google', icon: 'globe', tone: 'b' }] }),
      T('web-sitio-foto', 2.2, [[0, c(1400, 130, 1.9)], [2.2, c(1500, 135, 2.0)]], {
        pops: [{ t: 0.4, x: 1500, y: 230, eb: 'MOTOR INTEGRADO', tx: 'Se reserva sin salir de la web', icon: 'cal', tone: 'g' }],
        cursor: { path: [[0.3, { x: 1300, y: 300 }], [1.2, { x: 1730, y: 145 }], [2.0, { x: 1730, y: 145 }]], clicks: [1.4] } }),
    ],
    B: [
      // MyLinks: la vista previa del editor muestra el MyLinks del Hotel Los Álamos con la cara real del producto
      // (foto a sangre, botones de vidrio). Fuente: tools/pantallas-inventadas/mylinks-real.html + mylinks-video.py
      T('web-mylinks', 3.1, [[0, todo], [0.8, c(1089, 484, 1.5)]], {
        srcV: R + 'web-mylinks-cel.webp', srcVr: 2184 / 1012,
        desliza: { src: R + 'web-mylinks-cel.webp', x: 1570, y: 172, w: 289, h: 623.5, r: 26, alto: 623.5,
          k: [[0, 0], [3.1, 0]] },
        pops: [{ t: 0.8, x: 1100, y: 330, eb: 'MY LINKS', tx: 'Todos los links del hotel, en su dominio', icon: 'link', tone: 'v' }] }),
      T('web-sitio-foto', 1.7, [[0, c(960, 500, 1.2)], [1.7, c(960, 520, 1.25)]], {
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
      T('crm-centraliza', 2.8, [[0, todo], [1.2, c(960, 420, 1.12)]], {
        pops: [{ t: 0.6, x: 400, y: 150, eb: 'WHATSAPP, INSTAGRAM, FACEBOOK, WEB Y EMAIL', tx: 'Todas las consultas llegan a un lugar', icon: 'inArrow', tone: 'b' },
               { t: 1.6, x: 1440, y: 140, eb: 'CONVERSA', tx: 'Una sola bandeja para todo el equipo', icon: 'msg', tone: 'v' }] }),
      T('crm-centraliza', 2.4, [[0, c(1000, 410, 1.4)], [2.4, c(1060, 420, 1.55)]], {
        marcos: [{ t: 0.5, x: 1636, y: 279, w: 158, h: 38 }],
        pops: [{ t: 0.6, x: 1440, y: 620, eb: 'RACIMO IA', tx: 'Responde al instante, a cualquier hora', icon: 'spark', tone: 'g' }] }),
    ],
    B: [
      T('crm-mailing', 2.4, [[0, todo], [1.0, c(700, 360, 1.7)]], {
        pops: [{ t: 0.8, x: 700, y: 230, eb: 'EMAIL MARKETING', tx: 'Campañas antes, durante y después', icon: 'mail', tone: 'v' }] }),
      T('crm-bandeja', 2.4, [[0, todo], [1.0, c(860, 400, 1.4)]], {
        pops: [{ t: 0.8, x: 860, y: 200, eb: 'BANDEJA DE ENTRADA', tx: 'Ninguna consulta se pierde', icon: 'check', tone: 'g' }] }),
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
    label: 'HUÉSPED+', producto: 'Huésped+',
    intro: { eb: 'HUÉSPED+ · CON TU MARCA', tx: 'El hotel, |en el teléfono del huésped.' },
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
    bugOculto: [[-0.2, 2.6]], // durante el tipeo, la cámara está pegada al logo de Google
    // Pedido de Aldana (11/11): la búsqueda se tipea y recién ahí aparecen los resultados;
    // después, los conjuntos de anuncios por canal (pantalla: tools/pantallas-inventadas/ads-conjuntos.html).
    A: [
      T('ads-google', 4.4, [[0, c(660, 262, 2.0), c(526, 230, 1.25)], [2.1, c(660, 262, 2.0), c(526, 230, 1.25)], [2.9, todo], [3.6, c(560, 330, 1.5)]], {
        tipea: { x: 134, y: 34, w: 660, h: 34, txt: 'hotel los álamos valle escondido', t0: 0.35, t1: 1.6, fs: 17, enter: 1.95, cubre: { y: 84 } },
        cursor: { path: [[1.3, { x: 700, y: 230 }], [1.9, { x: 905, y: 51 }], [2.4, { x: 905, y: 51 }]], clicks: [1.95] },
        marcos: [{ t: 3.5, x: 190, y: 188, w: 720, h: 282 }],
        pops: [{ t: 3.6, x: 560, y: 160, eb: 'PRIMERO EN GOOGLE', tx: 'El sitio oficial, arriba de la OTA', icon: 'search', tone: 'v' }] }),
      T('ads-google', 2.2, [[0, c(1160, 540, 1.6)], [2.2, c(1180, 560, 1.75)]], {
        marcos: [{ t: 0.4, x: 1000, y: 486, w: 478, h: 56 }],
        pops: [{ t: 0.5, x: 1240, y: 780, eb: 'HOTEL ADS', tx: 'La tarifa directa, al lado de la OTA', icon: 'tag', tone: 'g' }] }),
    ],
    B: [
      T('ads-conjuntos', 3.6, [[0, todo], [0.8, c(700, 420, 1.9)], [2.8, c(1240, 420, 1.9)], [3.6, c(1240, 440, 1.95)]], {
        pops: [{ t: 0.9, x: 640, y: 150, eb: 'CONJUNTOS DE ANUNCIOS', tx: 'Google, Meta y ChatGPT, en un solo panel', icon: 'grid', tone: 'v', hasta: 2.2 },
               { t: 2.3, x: 1300, y: 150, eb: 'CADA CANAL, SU ANUNCIO', tx: 'Con las fotos y la marca del hotel', icon: 'spark', tone: 'g' }] }),
      T('ads-ads', 1.8, [[0, todo], [0.7, c(700, 230, 1.6)]], {
        marcos: [{ t: 0.6, x: 70, y: 120, w: 1180, h: 110 }],
        pops: [{ t: 0.7, x: 700, y: 110, eb: 'RESULTADOS', tx: 'Impresiones, clics y reservas', icon: 'chart', tone: 'b' }] }),
      T('ads-inversion', 1.8, [[0, todo], [0.7, c(960, 230, 1.6)]], {
        pops: [{ t: 0.6, x: 960, y: 120, eb: 'PAGAS POR RESERVAS', tx: 'Comisión sólo por reservas reales, no por clics', icon: 'bank', tone: 'g' }] }),
    ],
  },
};
window.RACIMO_REAL = VIDEOS;
})();
