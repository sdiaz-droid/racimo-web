"""Genera las páginas de producto de Racimo (todas menos Channel Manager, que está hecha a mano).

Uso:  python tools/paginas/generar.py

Cada producto elige sus piezas y su orden (ver PRODUCTOS): así ninguna página repite la
composición de otra. El contenido sale de las fichas de producto de Nexus (21/10/2026),
reescrito para el reseller y sin nombrar a Pxsol. Las rutas son absolutas (/assets, /video).
"""
import json, re, html
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
ESCENAS = json.loads((RAIZ / 'tools/video/escenas.json').read_text(encoding='utf-8'))
WORDMARK = re.search(r'<svg class="wordmark".*?</svg>', (RAIZ / 'index.html').read_text(encoding='utf-8'), re.S).group(0)
FOTO = '/video/comun/assets/fotos/'
FLECHA = '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>'
ABAJO = '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5v11M3.5 9 8 13.5 12.5 9"/></svg>'

# los diez productos: clave → (nombre, url, valor del formulario)
CATALOGO = {
    'channel': ('Channel Manager', '/channel-manager/', 'Channel Manager'),
    'motor': ('Motor de reservas', '/motor-de-reservas/', 'Motor de reservas'),
    'web': ('Sitio web', '/sitio-web/', 'Sitio web'),
    'pms': ('PMS', '/pms/', 'PMS'),
    'crm': ('CRM', '/crm/', 'CRM'),
    'marketing': ('Marketing Digital', '/marketing-digital/', 'Marketing Digital'),
    'ads': ('Google Ads', '/google-ads/', 'Google Ads'),
    'pos': ('POS', '/pos/', 'POS'),
    'guestapp': ('GuestApp', '/guestapp/', 'GuestApp'),
    'agentes': ('Agentes de IA', '/agentes-de-ia/', 'Agentes de IA'),
}
# lugar de cada uva en el racimo de la home (mismo viewBox)
RACIMO = [('channel', 94, 190), ('motor', 258, 190), ('web', 422, 190), ('pms', 586, 190), ('crm', 176, 332),
          ('marketing', 340, 332), ('ads', 504, 332), ('pos', 258, 474), ('guestapp', 422, 474), ('agentes', 340, 616)]

e = html.escape


# ─────────────────────────── piezas ───────────────────────────
def tarj(html_, x, y, z=.5, cls=''):
    x = min(max(x, -.36), .42)   # que ninguna tarjeta se meta en el texto ni se salga de la pantalla
    return f'<div class="obj" data-x="{x}" data-y="{y}" data-z="{z}"><div class="tarj {cls}">{html_}</div></div>'


def hero(p):
    k = p['k']
    circ = ''.join(f'<circle class="{"vacio" if kk == k else "g"}" cx="{x}" cy="{y}" r="78"/>' for kk, x, y in RACIMO)
    nombre_uva = p.get('uva', CATALOGO[k][0]).replace(' ', '<br>', 1) if len(CATALOGO[k][0]) > 9 else CATALOGO[k][0]
    modo = ' data-modo="constelacion"' if p.get('constelacion', True) else ''
    conf = ''.join(f'<span>{c}</span>' for c in p['confianza'])
    return f'''<section class="p-hero" id="top">
  <div class="shell">
    <div class="copy">
      <p class="volanta" data-entra><i></i>{p['volanta']}</p>
      <h1 data-entra{' class="largo"' if len(re.sub('<[^>]+>', '', p['h1'])) > 34 else ''}>{p['h1']}</h1>
      <p class="deck" data-entra>{p['deck']}</p>
      <div class="acciones" data-entra>
        <a class="btn" href="#consulta">Consultá el precio y ponele tu markup{FLECHA}</a>
        <a class="link-baja" href="#historia">Mirá cómo funciona{ABAJO}</a>
      </div>
      <p class="confianza" data-entra>{conf}</p>
    </div>
    <div class="escena-uva" id="escenaUva" aria-hidden="true">
      <svg class="racimo-fondo" id="racimoFondo" viewBox="6 -52 668 762">
        <path class="t" d="M337.5-44C328 32 332 112 333.5 190L346.5 190C348 112 342 32 342.5-44Z"/>
        <path class="h" d="M338 12C364-26 406-48 446-38C428-4 384 18 338 12Z"/>
        <path class="hl2" d="M330 64C310 38 272 26 242 42C260 70 296 82 330 64Z"/>
        {circ}
      </svg>
      <div class="orbita" id="orbita"{modo}>
        {''.join(p['objetos'])}
      </div>
      <div class="uva" id="uva"><p class="nombre">{nombre_uva}</p></div>
      <div class="uva-brillo" id="uvaBrillo"></div>
    </div>
  </div>
</section>'''


def historia(p):
    pasos = ''.join(f'<li data-t="{t}">{e(n)}</li>' for t, n in p['pasos'])
    return f'''<section class="historia" id="historia" aria-label="Cómo funciona {e(CATALOGO[p['k']][0])}">
  <div class="pin">
    <div class="cab">
      <div>
        <h2>{p['historia_h2']}</h2>
        <p>Bajá despacio: el video avanza con vos y frena donde hay algo para leer.</p>
      </div>
      <div class="derecha"><ol class="pasos-video" id="pasosVideo" aria-hidden="true">{pasos}</ol>
      <a class="saltear" id="saltear" href="#s1">Saltear el video<svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5v11M3.5 9 8 13.5 12.5 9"/></svg></a></div>
    </div>
    <div class="progreso" aria-hidden="true"><span id="progreso"></span></div>
    <div class="marco" id="marco">
      <div class="pantalla" id="pantalla" role="img" aria-label="{e(p['video_alt'])}">
        <div class="lienzo" id="lienzo"></div>
        <div class="pantalla-uva" id="pantallaUva"></div>
      </div>
    </div>
  </div>
</section>'''


def lista(id_, h2, bajada, items, extra=''):
    li = ''
    for it in items:
        cuerpo = f'<p>{it[1]}</p>' + (it[2] if len(it) > 2 else '')
        li += f'<li data-entra><span class="pip"></span><div><h3>{it[0]}</h3>{cuerpo}</div></li>'
    return f'''<section class="banda" id="{id_}">
  <div class="shell vendes">
    <div class="fijo">
      <h2 data-entra>{h2}</h2>
      <p class="bajada" data-entra>{bajada}</p>{extra}
    </div>
    <div><ul class="items">{li}</ul></div>
  </div>
</section>'''


def planes(cols, tres=False):
    c = ''
    for i, (n, feats) in enumerate(cols):
        cls = ' class="ent"' if i == len(cols) - 1 else ''
        c += f'<div{cls}><b>{n}</b><ul>' + ''.join(f'<li>{f}</li>' for f in feats) + '</ul></div>'
    return f'<div class="planes{" tres-col" if tres else ""}">{c}</div>'


def chips(nombres):
    return '<div class="chips-int">' + ''.join(f'<span>{n}</span>' for n in nombres) + '</div>'


def manifiesto(id_, frase, bajada):
    return f'''<section class="banda manifiesto" id="{id_}">
  <div class="bleed-u" aria-hidden="true"></div>
  <div class="shell">
    <p class="frase" data-entra>{frase}</p>
    <p class="bajada" data-entra>{bajada}</p>
  </div>
</section>'''


def antes(id_, h2, bajada, sin, con):
    s = ''.join(f'<li>{x}</li>' for x in sin[1])
    c = ''.join(f'<li>{x}</li>' for x in con[1])
    return f'''<section class="banda" id="{id_}">
  <div class="shell">
    <h2 data-entra>{h2}</h2>
    <p class="bajada" data-entra>{bajada}</p>
    <div class="antes">
      <div class="sin" data-entra><small>Hoy</small><h3>{sin[0]}</h3><ul>{s}</ul></div>
      <div class="con" data-entra><small>Con lo que le vendés</small><h3>{con[0]}</h3><ul>{c}</ul></div>
    </div>
  </div>
</section>'''


def dia(id_, h2, bajada, hitos):
    h = ''.join(f'<div class="hito" data-paso><span class="h">{a}</span><h3>{b}</h3><p>{c}</p></div>' for a, b, c in hitos)
    return f'''<section class="banda" id="{id_}">
  <div class="shell">
    <h2 data-entra>{h2}</h2>
    <p class="bajada" data-entra>{bajada}</p>
    <div class="dia" data-progreso="dia">{h}</div>
  </div>
</section>'''


def ticket(id_, h2, bajada, cab, lineas, total, extra=''):
    li = ''.join(f'<li><span>{a}</span><span>{b}</span></li>' for a, b in lineas)
    return f'''<section class="banda" id="{id_}">
  <div class="shell ticket-wrap">
    <div>
      <h2 data-entra>{h2}</h2>
      <p class="bajada" data-entra>{bajada}</p>{extra}
    </div>
    <div class="ticket" data-entra>
      <div class="cab-t"><b>{cab[0]}</b><span>{cab[1]}</span></div>
      <ul>{li}</ul>
      <div class="total"><span>{total[0]}</span><em>{total[1]}</em></div>
    </div>
  </div>
</section>'''


def chat(id_, h2, bajada, quien, mensajes, extra=''):
    m = ''
    for lado, canal, txt in mensajes:
        cn = f'<span class="canal">{canal}</span>' if canal else ''
        m += f'<div class="m {lado}" data-paso>{cn}{txt}</div>'
    return f'''<section class="banda" id="{id_}">
  <div class="shell chat-wrap">
    <div>
      <h2 data-entra>{h2}</h2>
      <p class="bajada" data-entra>{bajada}</p>{extra}
    </div>
    <div class="chat" data-progreso="chat">
      <div class="top"><i>{quien[0][0]}</i><div><b>{quien[0]}</b><span>{quien[1]}</span></div></div>
      {m}
    </div>
  </div>
</section>'''


def noche(id_, hora, relato, puerta):
    r = ''.join(f'<p data-paso>{x}</p>' for x in relato)
    return f'''<section class="banda noche" id="{id_}">
  <div class="shell">
    <div data-progreso="noche">
      <p class="hora" data-entra>{hora}</p>
      <div class="relato">{r}</div>
    </div>
    <div class="puerta" data-entra>
      <div class="llave"><svg viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="M10.8 12.2 20 3M17 6l3 3M14 9l2 2"/></svg></div>
      <div class="txt"><b>{puerta[0]}</b><span>{puerta[1]}</span></div>
    </div>
  </div>
</section>'''


def dial(id_, h2, bajada, niveles):
    d = ''
    for i, (t, x) in enumerate(niveles):
        barras = ''.join(f'<i class="{"l" if j <= i else ""}"></i>' for j in range(3))
        d += f'<div data-paso><div class="nivel">{barras}</div><h3>{t}</h3><p>{x}</p></div>'
    return f'''<section class="banda" id="{id_}">
  <div class="shell">
    <h2 data-entra>{h2}</h2>
    <p class="bajada" data-entra>{bajada}</p>
    <div class="dial" data-progreso="dial">{d}</div>
  </div>
</section>'''


def foto(id_, img, h2, bajada):
    return f'''<section class="banda foto-banda" id="{id_}" data-progreso="foto">
  <img src="{FOTO}{img}.webp" alt="" loading="lazy" decoding="async">
  <div class="shell">
    <h2 data-entra>{h2}</h2>
    <p class="bajada" data-entra>{bajada}</p>
  </div>
</section>'''


def pilares(id_, h2, bajada, cols):
    a = ''.join(f'<article data-entra><div class="vis">{v}</div><div class="txt"><h3>{t}</h3><p>{x}</p></div></article>' for v, t, x in cols)
    return f'''<section class="banda" id="{id_}">
  <div class="shell">
    <h2 data-entra>{h2}</h2>
    <p class="bajada" data-entra>{bajada}</p>
    <div class="pilares">{a}</div>
  </div>
</section>'''


def como(h2='Lo vendés como propio'):
    return f'''<section class="banda" id="como">
  <div class="shell">
    <h2 data-entra>{h2}</h2>
    <p class="bajada" data-entra>Racimo no interviene en el precio final ni en la cobranza al hotel. La diferencia es tuya, todos los meses.</p>
    <div class="tres">
      <article data-entra><span class="ico"><svg viewBox="0 0 24 24"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg></span>
        <h3>Con tu marca</h3><p>Tus hoteles ven tu propuesta. El producto es marca blanca.</p></article>
      <article data-entra><span class="ico"><svg viewBox="0 0 24 24"><path d="M3 12h18M15 6l6 6-6 6"/></svg></span>
        <h3>A tu precio</h3><p>Comprás a precio reseller y le ponés tu markup. El precio al hotel lo definís vos.</p></article>
      <article data-entra><span class="ico"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
        <h3>Con o sin soporte</h3><p>Elegís si el soporte al hotel lo das vos o lo damos nosotros.</p><a href="/#modelos">Ver los dos modelos →</a></article>
    </div>
  </div>
</section>'''


def ugc(p):
    return f'''<section class="banda ugc" id="ugc" hidden>
  <div class="shell">
    <div>
      <h2 data-entra>Te lo contamos en un minuto</h2>
      <p class="bajada" data-entra>Qué gana un reseller cuando suma {e(CATALOGO[p['k']][0])} a su cartera.</p>
    </div>
    <div class="ugc-video" data-entra>
      <video id="ugcVideo" preload="none" playsinline poster="/video/{p['video']}/ugc-portada.webp"><source src="/video/{p['video']}/ugc.mp4" type="video/mp4"></video>
      <button type="button" id="ugcPlay" aria-label="Reproducir el video con sonido"><span class="play"><i><svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg></i>Ver con sonido</span></button>
    </div>
  </div>
</section>'''


def combina(p):
    k = p['k']
    vec = p['combina']
    pos = [(22, 25), (78, 25), (22, 78), (78, 78)]
    a = ''.join(f'<a href="{CATALOGO[v][1]}" style="left:{x}%;top:{y}%" data-k="{v}">{e(CATALOGO[v][0])}</a>' for v, (x, y) in zip(vec, pos))
    yo = CATALOGO[k][0].replace(' ', '<br>', 1) if len(CATALOGO[k][0]) > 9 else CATALOGO[k][0]
    return f'''<section class="banda combina" id="combina">
  <div class="shell">
    <div>
      <h2 data-entra>{p['combina_h2']}</h2>
      <p class="bajada" data-entra>{p['combina_txt']}</p>
      <a class="btn btn-ghost todo" href="/#catalogo" data-entra>Ver todo el catálogo</a>
    </div>
    <div class="racimito" id="racimito">
      <svg viewBox="0 0 100 87" preserveAspectRatio="none" aria-hidden="true"><path d="M50 44 L22 22 M50 44 L78 22 M50 44 L22 68 M50 44 L78 68"/></svg>
      {a}
      <span class="yo" style="left:50%;top:50%">{yo}</span>
    </div>
  </div>
</section>'''


def consulta(p):
    k = p['k']
    prods = ''.join(f'<label><input type="checkbox" name="Productos" value="{v[2]}"{" checked" if kk == k else ""}>{e(v[0])}</label>' for kk, v in CATALOGO.items())
    prods += '<label><input type="checkbox" name="Productos" value="El racimo completo">El racimo completo</label>'
    n = CATALOGO[k][0]
    return f'''<section class="consulta" id="consulta">
  <div class="shell">
    <div class="caja">
      <div>
        <h2 data-entra>Consultá el precio y ponele tu markup</h2>
        <p class="bajada" data-entra>Contanos de tu empresa y te mandamos el precio reseller y cómo trabajamos.</p>
        <ul class="lleva" data-entra>
          <li>El precio reseller de lo que elijas</li>
          <li>Los dos modelos de trabajo, con y sin soporte</li>
          <li>Una prueba gratis para un hotel de tu cartera</li>
        </ul>
      </div>
      <form class="f" id="form" action="https://formsubmit.co/resellers@racimo.tech" method="POST" novalidate>
        <input type="hidden" name="_subject" value="Consulta de precio · {e(n)} · Racimo">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="Página" value="{e(n)}">
        <input type="text" name="_honey" class="miel" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="campo"><label for="f-nombre">Nombre y apellido</label><input id="f-nombre" name="Nombre" autocomplete="name" required></div>
        <div class="campo"><label for="f-empresa">Empresa</label><input id="f-empresa" name="Empresa" autocomplete="organization" required></div>
        <div class="campo"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required></div>
        <div class="campo"><label for="f-wa">WhatsApp <span style="color:var(--fg-3)">(opcional)</span></label><input id="f-wa" name="WhatsApp" type="tel" autocomplete="tel" inputmode="tel"></div>
        <div class="campo"><label for="f-pais">País</label>
          <select id="f-pais" name="País" required><option value="" disabled selected>Elegí</option><option>Argentina</option><option>Chile</option><option>Colombia</option><option>México</option><option>Paraguay</option><option>Perú</option><option>Uruguay</option><option>España</option><option>Otro</option></select></div>
        <div class="campo"><label for="f-cartera">Hoteles en tu cartera</label>
          <select id="f-cartera" name="Hoteles en cartera" required><option value="" disabled selected>Elegí</option><option>Todavía ninguno</option><option>1 a 10</option><option>11 a 50</option><option>51 a 200</option><option>Más de 200</option></select></div>
        <fieldset class="ancho"><legend>¿Qué querés sumar?</legend><div class="prod">{prods}</div></fieldset>
        <div class="campo ancho"><label for="f-msg">¿Algo más que quieras contarnos? <span style="color:var(--fg-3)">(opcional)</span></label><textarea id="f-msg" name="Mensaje"></textarea></div>
        <p class="error" id="formError" role="alert">No pudimos enviar la consulta. Probá de nuevo o escribinos a resellers@racimo.tech.</p>
        <div class="enviar"><button class="btn" type="submit">Enviar consulta{FLECHA}</button>
          <small>Te respondemos por mail. No compartimos tus datos.</small></div>
        <div class="gracias" role="status" aria-live="polite"><h3>¡Listo, recibimos tu consulta!</h3><p>Te escribimos a tu mail con el precio reseller y los próximos pasos.</p></div>
      </form>
    </div>
  </div>
</section>'''


def pagina(p):
    k = p['k']
    vid = ESCENAS[p['video']]
    cfg = {'pieza': vid['pieza'], 'escenas': [{'name': s['name'], 'dur': s['dur']} for s in vid['escenas']],
           'ajustes': vid['ajustes'], 'pantallasPorSegundo': .22}
    secciones = '\n\n'.join(s for s in p['secciones'])
    return f'''<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{e(p['title'])} · Racimo.tech</title>
<meta name="description" content="{e(p['description'])}">
<meta name="theme-color" content="#121212">
<link rel="preload" href="/assets/fonts/Outfit-Medium.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="/assets/fonts/Inter-Regular.ttf" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="/assets/vendor/lenis.css">
<link rel="stylesheet" href="/assets/producto.css?v=20261021b">
<link rel="stylesheet" href="/assets/producto-piezas.css?v=20261021b">
<link rel="stylesheet" href="/assets/consulta.css?v=20261021">
</head>
<body data-producto="{k}">
<!-- generado por tools/paginas/generar.py: editar ahí, no acá -->

<div class="rejilla" aria-hidden="true">
  <svg focusable="false"><defs>
    <pattern id="ret" width="84" height="84" patternUnits="userSpaceOnUse"><path class="ret-l" d="M84 0H0V84"/><circle class="ret-c" cx="42" cy="42" r="42"/></pattern>
  </defs><rect width="100%" height="100%" fill="url(#ret)"/></svg>
  <div class="luz"><svg focusable="false"><rect width="100%" height="100%" fill="url(#ret)"/></svg></div>
  <div class="velo"></div>
</div>

<header class="nav" id="nav">
  <div class="shell">
    <a href="/" aria-label="Racimo tech, inicio" style="display:block">{WORDMARK}</a>
    <nav class="navlinks" aria-label="Principal">
      <a href="/#catalogo">Catálogo</a><a href="#historia">Cómo funciona</a>
      <a href="#s1">Qué vendés</a><a href="/#modelos">Cómo trabajamos</a>
    </nav>
    <a class="btn" href="#consulta">Consultá el precio</a>
  </div>
</header>

<main>
{hero(p)}

{historia(p)}

{secciones}

{ugc(p)}

{combina(p)}

{consulta(p)}
</main>

<footer>
  <div class="shell foot-in">
    <span>Racimo, tecnología propia para empresas que revenden.</span>
    <span>Mendoza, Argentina</span>
  </div>
</footer>

<script src="/assets/vendor/lenis.min.js" defer></script>
<script src="/assets/vendor/react.production.min.js" defer></script>
<script src="/assets/vendor/react-dom.production.min.js" defer></script>
<script src="/video/{p['video']}/video.js" defer></script>
<script>window.RACIMO_VIDEO = {json.dumps(cfg, ensure_ascii=False)};</script>
<script src="/assets/producto.js?v=20261021b" defer></script>
<script src="/assets/consulta.js?v=20261021" defer></script>
</body>
</html>
'''


def pasos_de(video, nombres):
    acc, out = 0, []
    for s, n in zip(ESCENAS[video]['escenas'], nombres):
        out.append((round(acc, 2), n)); acc += s['dur']
    return out


# ─────────────────────────── productos ───────────────────────────
F = FOTO
PRODUCTOS = []

# MOTOR DE RESERVAS — la reserva que no paga comisión
PRODUCTOS.append(dict(
    k='motor', video='motor', title='Motor de reservas en marca blanca',
    description='Sumale a tus hoteles un motor de reservas propio: venta directa desde su web, sin comisiones de OTAs, con tu marca y tu precio.',
    volanta='Motor de reservas · con tu marca',
    h1='<span class="ln">Más reservas directas,</span><span class="ln"><span class="hl">sin comisiones.</span></span>',
    deck='Sumale a los hoteles de tu cartera un motor de reservas en su propia web: el huésped reserva directo y el hotel deja de pagarle comisión a la OTA.',
    confianza=['Prueba gratis en cuentas nuevas', 'Pensado para el celular'],
    objetos=[
        tarj('<small>Reserva directa</small><b>Suite Lago · 3 noches</b><span class="ok">Confirmada</span>', -.47, -.2, .8),
        tarj('<small>Comisión</small><b>0 %</b>', .42, -.28, .7, 'verde'),
        tarj('<small>Comparador</small><b>Directo, el mejor precio</b><span class="ok">vs. las OTAs</span>', .5, .2, .9),
        tarj('<small>Google Hotels</small><b>Sitio oficial</b>', -.44, .3, .4, 'oscura'),
        tarj('<small>Compra abandonada</small><b>Le escribimos al huésped</b>', .02, .5, .6, 'violeta'),
    ],
    historia_h2='Así reserva el huésped',
    pasos=pasos_de('motor', ['Las fechas', 'En la web del hotel', 'Sin comisión', 'Llega a Reservas', 'Listo']),
    video_alt='Video: el huésped elige fechas y una suite en la web del hotel, confirma la reserva y la reserva directa entra en el listado de reservas.',
    secciones=[
        antes('s1', 'Cada reserva directa es margen para el hotel', 'Lo que cambia cuando el hotel vende desde su propia web.',
              ('Todo pasa por la OTA', ['El huésped reserva en la OTA, aunque haya buscado el hotel', 'El hotel paga comisión por cada reserva', 'Las tarifas y promociones son las mismas en todos lados']),
              ('El huésped reserva en la web del hotel', ['Reserva directa, sin comisión', 'Tarifas y promociones propias, distintas a las de las OTAs', 'Un comparador le muestra que reservar directo conviene'])),
        lista('vendes', 'Lo que le vendés a cada hotel', 'Un motor que se ve como el hotel y vende <b>desde el celular, en pocos pasos</b>.', [
            ('Con el diseño del hotel', 'El motor se adapta a la identidad visual de cada hotel: no parece un sistema aparte.'),
            ('En Google Hotels, sin costo por clic', 'Con los enlaces gratuitos de reserva de Google, las tarifas aparecen en Google Hotels junto a las OTAs, sin costo por clic ni comisión.'),
            ('Recupera la compra abandonada', 'Si el huésped no termina la reserva, el motor le escribe un mail automático para recuperarla.'),
            ('Multi-idioma y multimoneda', 'Para el huésped internacional, en su idioma y su moneda.'),
            ('Cobra con la pasarela del hotel', 'Se integra con las pasarelas de pago más usadas.', chips(['Mercado Pago', 'WebPay', 'Payway', 'Stripe', 'PayPal'])),
            ('Dos planes para tu cartera', 'Para el hotel que arranca y para el que quiere vender paquetes y convenios.', planes([
                ('Professional', ['Hasta 5 categorías de habitación', '3 tarifarios y 3 políticas de cancelación', '15 temas de diseño']),
                ('Enterprise', ['Hasta 30 categorías y tarifas sin límite', 'Paquetes: alojamiento más extras', 'Acceso para clientes con convenio', 'Motor embebible en la web propia'])])),
        ]),
        manifiesto('m1', 'La reserva directa es <em>la más rentable</em> del hotel.', 'Y cada hotel que la suma con tu marca es un ingreso mensual para tu empresa.'),
        como(),
    ],
    combina=['web', 'channel', 'ads', 'crm'], combina_h2='El motor rinde más en racimo',
    combina_txt='Con el sitio web y la publicidad en Google, el huésped encuentra al hotel y reserva directo. Con el Channel Manager, todo comparte un solo inventario.',
))

# SITIO WEB — la vitrina
PRODUCTOS.append(dict(
    k='web', video='web', title='Sitio web para hoteles en marca blanca',
    description='Webs para hoteles con motor de reservas integrado, SEO incluido y plantillas autogestionables, para vender con tu marca.',
    volanta='Sitio web · con tu marca',
    h1='<span class="ln">El sitio del hotel,</span><span class="ln"><span class="hl">listo en minutos.</span></span>',
    deck='Webs para los hoteles de tu cartera con el motor de reservas integrado, SEO incluido y plantillas que el hotel puede actualizar solo.',
    confianza=['Motor de reservas integrado', 'Multi-idioma y multimoneda'],
    objetos=[
        tarj(f'<img src="{F}domos-vinedo.webp" alt="" loading="lazy"><span>Domos del Viñedo</span>', -.5, -.24, .8, 'foto'),
        tarj(f'<img src="{F}cabana-lago.webp" alt="" loading="lazy"><span>Cabañas del Lago</span>', .5, -.3, .6, 'foto'),
        tarj(f'<img src="{F}tina-lago.webp" alt="" loading="lazy"><span>Spa &amp; tinas</span>', .48, .3, .9, 'foto'),
        tarj('<small>Búsquedas</small><b>Lista para Google y las IA</b>', -.46, .34, .5),
        tarj('<b>Reservar</b>', .02, .52, .7, 'chip verde'),
    ],
    historia_h2='Así se arma el sitio',
    pasos=pasos_de('web', ['La portada', 'El sitio', 'Listo en minutos', 'En el celular', 'Listo']),
    video_alt='Video: se arma la portada del sitio del hotel, aparecen las habitaciones y las opiniones, y el sitio se ve también en el celular.',
    secciones=[
        foto('s1', 'domos-vinedo', 'La vitrina que convierte visitas en reservas', 'Para el hotel que tiene una web vieja, estática o directamente no tiene: una vitrina pensada para vender, conectada a su motor de reservas.'),
        lista('vendes', 'Lo que le vendés a cada hotel', 'Un sitio <b>profesional y adaptable</b> a celular, tablet y escritorio.', [
            ('Con el motor de reservas adentro', 'El sitio y el motor están integrados: la visita se convierte en reserva sin salir de la web.'),
            ('Lo actualiza el hotel', 'Plantillas autogestionables y un gestor de sitios con IA, para cambiar textos, fotos y secciones sin programar.'),
            ('Para Google y para las IA', 'SEO técnico automático y optimización para motores generativos, para que lo citen ChatGPT, Gemini o Perplexity.'),
            ('Para el huésped de afuera', 'En varios idiomas y monedas.'),
            ('Con su página de links', 'My Links: todos los enlaces del hotel en su propio dominio, para compartir por QR.'),
            ('Para cadenas y grupos', 'Un sitio por marca, con las mismas plantillas.'),
        ]),
        dia('flujo', 'De la búsqueda a la reserva', 'El camino que recorre el huésped en un sitio que vende.', [
            ('Busca', 'Lo encuentra', 'En Google o en una IA, porque el sitio está optimizado.'),
            ('Mira', 'Se enamora', 'Fotos, habitaciones y opiniones, bien presentadas.'),
            ('Elige', 'Compara', 'Ve que reservar directo conviene.'),
            ('Reserva', 'Sin salir', 'El motor está dentro del sitio.'),
            ('Vuelve', 'Lo comparte', 'Con la página de links y el QR del hotel.'),
        ]),
        lista('planes', 'Dos planes, según el hotel', 'Desde el sitio con plantillas hasta el diseño a medida.', [
            ('Elegí el que va con cada cliente', 'Los dos incluyen hosting seguro, sitio para celular, dominio y vinculación con Google Analytics, Tag Manager y Meta.', planes([
                ('Professional', ['Gestor de sitios y agente creador con IA', 'SEO técnico y optimización para IA', 'Pop-ups, botón de WhatsApp y My Links']),
                ('Custom', ['Plantillas personalizadas', 'Blog y asistencia de un ejecutivo web', 'Gráficas para redes sociales con IA', 'SEO y optimización para IA con seguimiento de métricas'])])),
        ]),
        como('Lo vendés con tu marca'),
    ],
    combina=['motor', 'ads', 'marketing', 'channel'], combina_h2='El sitio es la base del racimo',
    combina_txt='Con el motor adentro, la publicidad en Google atrás y las redes alrededor, el sitio se convierte en el canal de ventas del hotel.',
))

# PMS — el día entero del hotel
PRODUCTOS.append(dict(
    k='pms', video='pms', title='PMS para hoteles en marca blanca',
    description='Sistema de gestión hotelera para los hoteles de tu cartera que no tienen: reservas, recepción, caja y facturación en un solo lugar.',
    volanta='PMS · con tu marca',
    h1='<span class="ln">Toda la operación,</span><span class="ln"><span class="hl">en una sola grilla.</span></span>',
    deck='Para el hotel de tu cartera que todavía no tiene sistema: reservas, recepción, caja y facturación en un solo lugar, conectado a todos sus canales.',
    confianza=['Ocupación en tiempo real', 'Migración desde Excel'],
    objetos=[
        tarj('<small>Plano de ocupación</small><div class="barras"><i style="width:80%"></i><i style="width:55%"></i><i style="width:92%"></i><i style="width:40%"></i></div>', -.48, -.18, .8),
        tarj('<small>Check-in</small><b>Hab. 204 · 14:00</b><span class="ok">Lista</span>', .48, -.26, .7),
        tarj('<small>Caja del día</small><b>Pesos y dólares</b>', .5, .28, .9, 'oscura'),
        tarj('<small>Limpieza</small><b>3 habitaciones listas</b>', -.45, .34, .5, 'verde'),
        tarj('<small>Factura</small><b>Electrónica</b>', .0, .54, .6, 'violeta'),
    ],
    historia_h2='Así se ve el día del hotel',
    pasos=pasos_de('pms', ['El día', 'El panel', 'Una sola grilla', 'El plano', 'Listo']),
    video_alt='Video: la tarjeta de arribos y salidas del día, el panel del hotel y el plano de ocupación donde se arrastra y confirma una nueva reserva.',
    secciones=[
        dia('s1', 'El día del hotel, en un solo sistema', 'Desde que entra la reserva hasta que sale la factura.', [
            ('Reserva', 'Entra sola', 'Desde cualquier canal, sin sobreventas.'),
            ('Check-in', 'Recepción', 'Arribos, salidas y estado de cada habitación.'),
            ('Limpieza', 'Operación', 'Tareas de limpieza y mantenimiento.'),
            ('Caja', 'Cobro', 'Caja diaria en varias monedas.'),
            ('Factura', 'Cierre', 'Facturación electrónica integrada.'),
        ]),
        lista('vendes', 'Lo que le vendés a cada hotel', 'Todo en uno: <b>reservas, operación, caja e informes</b> en el mismo lugar.', [
            ('El plano de ocupación', 'La ocupación en tiempo real, sincronizada con los canales de venta.'),
            ('Recepción sin papeles', 'Check-in, check-out y el estado de cada habitación.'),
            ('Caja multimoneda', 'Efectivo en pesos y dólares, en la caja diaria.'),
            ('Informes', 'Reservas, cancelaciones y tarifas.'),
            ('Migración simple', 'Importación masiva de reservas desde Excel, para pasar al hotel sin perder nada.'),
            ('Facturación del país', 'Integrado con la facturación electrónica de cada mercado.', chips(['ARCA', 'SII', 'Siigo', 'Factura Lista', 'GNS', 'SiFactura'])),
            ('Dos planes para tu cartera', 'La facturación fiscal y el inventario están en Enterprise.', planes([
                ('Professional', ['Plano de ocupación y carga de reservas', 'Bloqueos y caja diaria', 'Importación de reservas']),
                ('Enterprise', ['Estado de habitaciones e inventario', 'Web check-in', 'Facturación fiscal', 'Proveedores'])])),
        ], extra='<p class="aviso" data-entra>¿Ya vendés tu propio PMS? Este no es para vos: mirá lo que lo complementa, como el <a href="/channel-manager/">Channel Manager</a>.</p>'),
        manifiesto('m1', 'Para el hotel que todavía <em>anota en un cuaderno.</em>', 'Un sistema completo para el cliente de tu cartera que todavía no tiene, con tu marca.'),
        como(),
    ],
    combina=['channel', 'motor', 'pos', 'guestapp'], combina_h2='El PMS es el tallo del racimo',
    combina_txt='Todo se conecta a él: el Channel Manager, el motor de reservas, el punto de venta y la app del huésped.',
))

# GOOGLE ADS — ganarle la búsqueda a la OTA
PRODUCTOS.append(dict(
    k='ads', video='ads', title='Google Ads para hoteles en marca blanca',
    description='Campañas en Google y Meta hechas por especialistas en hotelería, para que tus hoteles le ganen la búsqueda de su propio nombre a las OTAs.',
    volanta='Google Ads · con tu marca',
    h1='<span class="ln">Que te encuentren</span><span class="ln"><span class="hl">y te reserven directo.</span></span>',
    deck='Campañas en Google y Meta hechas por especialistas en hotelería, para que los hoteles de tu cartera le ganen la búsqueda de su propio nombre a las OTAs.',
    confianza=['0 % de comisión por reserva', 'Especialistas certificados por Google y Meta'],
    objetos=[
        tarj('<small>Anuncio · Sitio oficial</small><b>Hotel Las Moras</b><span class="ok">Reservá directo</span>', -.46, -.26, .9),
        tarj('<small>Hotel Ads</small><b>Directo, al lado de la OTA</b>', .48, -.22, .7, 'verde'),
        tarj('<small>Búsqueda de marca</small><b>Primero, el hotel</b>', .5, .3, .6, 'oscura'),
        tarj('<small>Meta</small><b>Consultas por WhatsApp</b>', -.47, .32, .5, 'violeta'),
        tarj('<b>Reservas reales, no clics</b>', .0, .55, .8, 'chip'),
    ],
    historia_h2='Así se ve la búsqueda',
    pasos=pasos_de('ads', ['La búsqueda', 'El anuncio', 'Reservan directo', 'Los resultados', 'Listo']),
    video_alt='Video: alguien busca el hotel, el anuncio del sitio oficial aparece primero con la tarifa directa y el panel muestra impresiones, clics y reservas.',
    secciones=[
        antes('s1', 'Las OTAs pujan por el nombre del hotel', 'Cuando alguien busca el hotel por su nombre, muchas veces la primera opción es una OTA.',
              ('El hotel pierde su propia búsqueda', ['La OTA aparece arriba, con el nombre del hotel', 'El huésped reserva ahí y el hotel paga comisión', 'Cambiar precios en la OTA tarda días']),
              ('El hotel aparece primero', ['Anuncio del sitio oficial, arriba de la OTA', 'La tarifa directa al lado de la OTA en Google', 'Los cambios de precio se activan al instante'])),
        manifiesto('m1', 'Fee fijo y <em>0 % de comisión</em> por reserva.', 'La inversión en publicidad la define el hotel, y el resultado se mide contra reservas reales.'),
        lista('vendes', 'Lo que le vendés a cada hotel', 'Un equipo <b>sólo de hotelería</b> que arma, mide y optimiza las campañas.', [
            ('Búsqueda de marca y genérica', 'Para que el hotel aparezca cuando lo buscan y cuando buscan dónde dormir en su destino.'),
            ('Hotel Ads', 'La tarifa directa del hotel al lado de la de la OTA, en Google.'),
            ('Meta, para crear demanda', 'Campañas que generan interés nuevo y consultas por WhatsApp.'),
            ('Se mide contra reservas', 'Reservas y búsquedas reales atribuidas, no clics, con un reporte mensual.'),
            ('Tres planes, según la inversión', 'Cada plan suma canales: del buscador a Performance Max, Meta y remarketing.', planes([
                ('Starter', ['Google Search de marca y genérico', 'Hotel Ads y enlaces gratuitos de reserva']),
                ('Professional', ['Todo lo de Starter', 'Performance Max', 'Meta: alcance y retargeting']),
                ('Enterprise', ['Todo lo de Professional', 'Display y remarketing', 'Meta: promociones y eventos especiales'])], tres=True)),
        ], extra='<p class="aviso" data-entra>Las campañas tienen un período de aprendizaje: los resultados se construyen mes a mes.</p>'),
        como(),
    ],
    combina=['motor', 'web', 'marketing', 'crm'], combina_h2='Los anuncios necesitan dónde aterrizar',
    combina_txt='El anuncio lleva al sitio, el sitio al motor y la reserva queda sin comisión. Con el CRM, las consultas que llegan no se pierden.',
))

# CRM — todos los canales, una bandeja
PRODUCTOS.append(dict(
    k='crm', video='crm', title='CRM para hoteles en marca blanca',
    description='WhatsApp, Instagram, Facebook, email y el chat de la web en una sola bandeja, con perfil del huésped y email marketing.',
    volanta='CRM y conversaciones · con tu marca',
    h1='<span class="ln">Todos los canales,</span><span class="ln"><span class="hl">una sola bandeja.</span></span>',
    deck='WhatsApp, Instagram, Facebook, el email y el chat de la web en una sola bandeja, con el historial de cada huésped y campañas de email automáticas.',
    confianza=['Perfil 360° de cada huésped', 'Email marketing automatizado'],
    constelacion=False,
    objetos=[
        '<div class="obj"><div class="tarj burbuja"><span class="canal"><i style="background:#25D366"></i>WhatsApp</span>¿Tienen lugar del 12 al 15?</div></div>',
        '<div class="obj"><div class="tarj burbuja"><span class="canal"><i style="background:#E1306C"></i>Instagram</span>¿Aceptan mascotas?</div></div>',
        '<div class="obj"><div class="tarj burbuja mia"><span class="canal"><i style="background:#121212"></i>Respuesta</span>¡Sí! Te paso la cotización.</div></div>',
        '<div class="obj"><div class="tarj burbuja"><span class="canal"><i style="background:#1877F2"></i>Messenger</span>¿El desayuno está incluido?</div></div>',
        '<div class="obj"><div class="tarj burbuja"><span class="canal"><i style="background:#6c63ff"></i>Email</span>Presupuesto para un grupo</div></div>',
        '<div class="obj"><div class="tarj burbuja"><span class="canal"><i style="background:#00f068"></i>Chat web</span>¿Hay cochera?</div></div>',
    ],
    historia_h2='Así responde el hotel',
    pasos=pasos_de('crm', ['Las consultas', 'La bandeja', 'Una sola bandeja', 'Automatizaciones', 'Listo']),
    video_alt='Video: llegan consultas por distintos canales, el equipo las responde desde una sola bandeja y se ven las automatizaciones de email con sus resultados.',
    secciones=[
        chat('s1', 'Ninguna consulta se pierde', 'Cada mensaje queda en la misma bandeja, con el historial del huésped, sin importar por dónde llegó.',
             ('Hotel Las Moras', 'Bandeja · todos los canales'), [
                 ('el', 'WhatsApp · 23:48', 'Hola, ¿tienen lugar del 12 al 15 de enero para dos?'),
                 ('ia', '', '¡Hola! Sí, tenemos la Suite Lago. Te armo la cotización con las tarifas del momento.'),
                 ('el', 'Instagram · 00:10', '¿Y si vamos con nuestro perro?'),
                 ('ia', '', 'Es pet friendly. Te dejo el link para reservar directo.'),
                 ('el', 'Email · 09:02', 'Perfecto, ¡reservado!'),
             ], extra='<p class="aviso" data-entra>Conversación de ejemplo.</p>'),
        lista('vendes', 'Lo que le vendés a cada hotel', 'Todo lo que pasa con un huésped, <b>en un solo perfil</b>.', [
            ('Perfil 360° del huésped', 'Las consultas y el historial de cada huésped en un solo lugar.'),
            ('Email marketing automatizado', 'Campañas segmentadas antes, durante y después de la estadía.'),
            ('Chat en la web', 'Un chat flotante que capta y califica consultas las 24 horas.'),
            ('Cotizador', 'Presupuestos con las tarifas del momento, en segundos.'),
            ('Encuestas y NPS', 'Para saber qué opina el huésped después de irse.'),
            ('Dos planes para tu cartera', 'WhatsApp, Instagram, Facebook y el agente de IA están en Enterprise.', planes([
                ('Professional', ['Hasta 6.000 contactos', 'Cotizador y bandeja compartida de email', 'Chat web, encuestas y NPS']),
                ('Enterprise', ['Hasta 60.000 contactos', 'WhatsApp, Instagram y Facebook', 'Agente de IA', 'Email marketing con automatizaciones'])])),
        ]),
        manifiesto('m1', 'La consulta que no se contesta <em>es una reserva para otro.</em>', 'Por eso todo llega a una sola bandeja, y nada queda sin respuesta.'),
        como(),
    ],
    combina=['agentes', 'motor', 'marketing', 'web'], combina_h2='El CRM junta a todo el racimo',
    combina_txt='Con los agentes de IA, responde solo a cualquier hora. Con el motor, cada cotización se convierte en una reserva directa.',
))

# MARKETING DIGITAL — redes, links y email
PRODUCTOS.append(dict(
    k='marketing', video='marketing', title='Marketing digital para hoteles en marca blanca',
    description='Publicaciones para redes, página de links con el dominio del hotel y campañas de email, desde un solo lugar.',
    volanta='Marketing Digital · con tu marca',
    h1='<span class="ln">Redes, links y email,</span><span class="ln"><span class="hl">desde un solo lugar.</span></span>',
    deck='Publicaciones para redes, una página de links con el dominio del hotel y campañas de email: el marketing de tus hoteles, ordenado en un mismo sistema.',
    confianza=['Gráficas con IA', 'Todo con los datos del hotel'],
    objetos=[
        tarj(f'<img src="{F}cabana-patagonia.webp" alt="" loading="lazy"><span>Post programado · viernes</span>', -.5, -.22, .8, 'foto'),
        tarj(f'<img src="{F}tina-noche.webp" alt="" loading="lazy"><span>Historia · hoy 20:00</span>', .5, -.28, .6, 'foto'),
        tarj('<small>My Links</small><b>Reservá · WhatsApp · Cómo llegar</b>', .5, .3, .9),
        tarj('<small>Email</small><b>Llegó la primavera</b><span class="ok">Enviado</span>', -.46, .34, .5, 'violeta'),
        tarj('<b>Un solo lugar</b>', .02, .54, .7, 'chip verde'),
    ],
    historia_h2='Así se ordena el marketing del hotel',
    pasos=pasos_de('marketing', ['Tres frentes', 'Redes', 'Un solo lugar', 'Email', 'Listo']),
    video_alt='Video: el calendario de redes sociales con las publicaciones del hotel, la página de links y una campaña de email marketing con sus resultados.',
    secciones=[
        pilares('s1', 'Tres frentes, un mismo sistema', 'Lo que el hotel suele resolver con herramientas sueltas, en un solo lugar.', [
            (f'<div class="posts"><img src="{F}cabana.webp" alt="" loading="lazy"><img src="{F}tina-lago.webp" alt="" loading="lazy"><img src="{F}living.webp" alt="" loading="lazy"><img src="{F}domo.webp" alt="" loading="lazy"><img src="{F}piscina-finca.webp" alt="" loading="lazy"><img src="{F}restaurante.webp" alt="" loading="lazy"></div>',
             'Redes', 'Gráficas para redes hechas con IA, que se crean, se publican y se programan desde el sistema, con sus métricas.'),
            ('<div class="links-mock"><span>Reservá directo</span><span>WhatsApp</span><span>Instagram</span><span>Cómo llegar</span></div>',
             'My Links', 'Todos los enlaces del hotel en una página con su propio dominio, para compartir por QR.'),
            (f'<div class="mail-mock"><img src="{F}colonial.webp" alt="" loading="lazy"><b>Llegó la primavera</b><span>Una escapada para dos, con desayuno.</span></div>',
             'Email', 'Campañas a los huéspedes, segmentadas y automáticas, antes, durante y después de la estadía.'),
        ]),
        foto('f1', 'cabana-patagonia', 'Las fotos del hotel, trabajando todos los días', 'Las mismas imágenes del sitio y del motor se convierten en publicaciones, historias y campañas.'),
        lista('vendes', 'Cómo lo armás para cada hotel', 'Se arma según lo que necesita cada cliente de tu cartera.', [
            ('Con el sitio web', 'La página de links y las gráficas para redes vienen con los planes del sitio web.'),
            ('Con el CRM', 'El email marketing y las automatizaciones salen de la base de huéspedes del CRM.'),
            ('Con la publicidad', 'Para sumar alcance pago en Google y Meta, se combina con Google Ads.'),
        ], extra='<p class="aviso" data-entra>No incluye community management ni gestión de redes orgánicas.</p>'),
        como(),
    ],
    combina=['web', 'crm', 'ads', 'agentes'], combina_h2='El marketing es el racimo en movimiento',
    combina_txt='Se apoya en el sitio, en el CRM y en la publicidad: cada pieza lleva al huésped a reservar directo.',
))

# POS — el ticket
PRODUCTOS.append(dict(
    k='pos', video='pos', title='POS para hoteles en marca blanca',
    description='El punto de venta del restaurante y el bar del hotel: carta por QR, comandas a cocina y consumos que pasan a la cuenta del huésped.',
    volanta='POS · Punto de venta · con tu marca',
    h1='<span class="ln">Del pedido a la habitación,</span><span class="ln"><span class="hl">sin papeles.</span></span>',
    deck='El punto de venta del restaurante, el bar y el room service del hotel: carta por QR, comandas que llegan solas a cocina y consumos que pasan directo a la cuenta del huésped.',
    confianza=['Integrado al PMS', 'Stock que se descuenta solo'],
    objetos=[
        tarj('<small>Room service</small><b>Hab. 302</b><span class="ok">Cargado a la habitación</span>', -.47, -.22, .8),
        tarj('<small>Carta digital</small><b>Por QR</b>', .48, -.27, .6, 'verde'),
        tarj('<small>Comanda</small><b>A cocina y barra</b>', .5, .3, .9, 'oscura'),
        tarj('<small>Stock</small><b>Se descuenta solo</b>', -.46, .34, .5),
        tarj('<b>Sin papeles</b>', .02, .55, .7, 'chip violeta'),
    ],
    historia_h2='Así viaja un pedido',
    pasos=pasos_de('pos', ['El pedido', 'Room service', 'Sin papeles', 'Inventario', 'Listo']),
    video_alt='Video: un pedido de room service para la habitación 302 se arma en el sistema, se carga a la cuenta del huésped y el inventario se actualiza.',
    secciones=[
        ticket('s1', 'Todo lo que el POS le resuelve al hotel', 'Cada línea, algo que deja de hacerse a mano.',
               ('Hotel Las Moras', 'Restaurante · Mesa 4'), [
                   ('Carta por QR, sin reimprimir nunca más', 'Incluido'),
                   ('Comandas que llegan solas a cocina y barra', 'Incluido'),
                   ('Monitor de cocina por estación', 'Incluido'),
                   ('Stock y food cost por plato', 'Incluido'),
                   ('Informes y facturación', 'Incluido'),
               ], ('Total', 'A la cuenta del huésped'),
               extra='<p class="aviso" data-entra>Requiere el PMS: el POS vive dentro de él.</p>'),
        dia('flujo', 'Del pedido a la cuenta del huésped', 'Lo que pasa en el hotel cuando el huésped pide algo.', [
            ('Pide', 'Por QR', 'Mira la carta y pide desde la mesa o la habitación.'),
            ('Cocina', 'La comanda', 'Llega sola a la estación que la prepara.'),
            ('Sirve', 'El mozo', 'Desde el celular o la tablet.'),
            ('Carga', 'A la habitación', 'El ticket sale con el número de reserva y el nombre.'),
            ('Descuenta', 'El stock', 'Cada plato descuenta sus insumos.'),
        ]),
        lista('vendes', 'Dos planes para tu cartera', 'Para el hotel con un restaurante y para el que tiene varios puntos de venta.', [
            ('Elegí el que va con cada cliente', 'Los dos cargan consumos a la habitación y se integran a la facturación del PMS.', planes([
                ('Professional', ['1 carta digital, 1 salón y 1 QR', 'Hasta 300 ítems de inventario', '2 puntos de despacho y recetas sin límite']),
                ('Enterprise', ['Cartas, salones y QR sin límite', 'Inventario y puntos de despacho sin límite', 'App para mozos y room service'])])),
        ]),
        como(),
    ],
    combina=['pms', 'guestapp', 'channel', 'motor'], combina_h2='El POS crece pegado al PMS',
    combina_txt='Vive dentro del PMS, y con la GuestApp el huésped pide el room service desde su teléfono.',
))

# GUESTAPP — la noche del huésped
PRODUCTOS.append(dict(
    k='guestapp', video='guestapp', title='GuestApp para hoteles en marca blanca',
    description='Check-in online, llave digital, room service y la guía del hotel en una app con la marca del hotel, más la app del equipo.',
    volanta='GuestApp · Huésped+ · con tu marca',
    h1='<span class="ln">El hotel entero,</span><span class="ln"><span class="hl">en el teléfono del huésped.</span></span>',
    deck='Check-in online, llave digital, room service y la guía del hotel, en una app con la marca del hotel. Y para el equipo, la app de limpieza y mantenimiento.',
    confianza=['Llave digital en el celular', 'Check-in y check-out autónomos'],
    uva='GuestApp',
    objetos=[
        tarj('<small>Check-in</small><b>Completo</b><span class="ok">Antes de llegar</span>', -.48, -.22, .8),
        tarj('<small>Llave digital</small><b>Suite 302</b>', .48, -.27, .7, 'verde'),
        tarj('<small>Guía del hotel</small><b>Desayuno de 7 a 10</b>', .5, .3, .9, 'oscura'),
        tarj('<small>Room service</small><b>Pedido en camino</b>', -.46, .34, .5, 'violeta'),
        tarj('<b>Sin pasar por recepción</b>', .02, .55, .7, 'chip'),
    ],
    historia_h2='Así llega el huésped',
    pasos=pasos_de('guestapp', ['La notificación', 'Check-in y llave', 'En el teléfono', 'En el hotel', 'Listo']),
    video_alt='Video: el huésped recibe la notificación, hace el check-in online y abre su habitación con la llave digital; en el sistema, el arribo queda con check-in completo.',
    secciones=[
        noche('s1', '02:14', [
            'El huésped llega de madrugada.',
            'En recepción no hay nadie.',
            'El check-in ya lo hizo desde el teléfono.',
            'Toca la llave digital y la puerta se abre.',
        ], ('Suite 302', 'Abierta con la llave digital')),
        lista('vendes', 'Lo que le vendés a cada hotel', 'El huésped resuelve su estadía solo, y <b>el equipo trabaja coordinado</b>.', [
            ('Check-in y check-out autónomos', 'Para el huésped que llega tarde o sale temprano, sin depender de recepción.'),
            ('Una app con la marca del hotel', 'La guía del hotel y sugerencias locales, para que nadie llame a recepción a preguntar el wi-fi.'),
            ('Llave digital', 'En el celular, con las cerraduras digitales que el hotel ya tiene. Se acabaron las llaves perdidas.'),
            ('Room service y pagos', 'Desde la app y el tótem, para que no se escape ningún cobro.'),
            ('La app del equipo', 'Limpieza y mantenimiento con tareas por área: recepción se entera cuando una habitación queda lista.'),
            ('Dos planes para tu cartera', 'La app del equipo y los mensajes masivos están en Enterprise.', planes([
                ('PRO', ['App del huésped y guía local', 'Check-in y check-out autónomos', 'Llave digital hasta 25 cerraduras', 'Room service y pagos']),
                ('Enterprise', ['Guía editable', 'Llaves sin límite', 'App del equipo y tareas', 'Mensajes masivos e informes'])])),
        ]),
        manifiesto('m1', 'Menos filas en recepción, <em>más tiempo para el huésped.</em>', 'La tecnología se encarga de lo repetitivo y el equipo, de la experiencia.'),
        como(),
    ],
    combina=['pms', 'pos', 'crm', 'agentes'], combina_h2='La app que el huésped se lleva en el bolsillo',
    combina_txt='Se apoya en el PMS para las reservas y la llave, y en el POS para el room service.',
))

# AGENTES DE IA — la perilla de autonomía
PRODUCTOS.append(dict(
    k='agentes', video='agentes', title='Agentes de IA para hoteles en marca blanca',
    description='Agentes de IA conectados en vivo al sistema del hotel: responden, cotizan y automatizan tareas, con el nivel de autonomía que elija el hotel.',
    volanta='Agentes de IA · con tu marca',
    h1='<span class="ln">Responde, cotiza</span><span class="ln"><span class="hl">y reserva solo.</span></span>',
    deck='Agentes de IA conectados en vivo al sistema del hotel: contestan por WhatsApp, la web o el email, preparan cotizaciones y automatizan tareas del equipo.',
    confianza=['Con la información viva del hotel', 'Autonomía configurable'],
    constelacion=False,
    objetos=[
        '<div class="obj"><div class="tarj"><small>03:12</small><b>Respondió una consulta</b></div></div>',
        '<div class="obj"><div class="tarj verde"><small>Cotización</small><b>Enviada en segundos</b></div></div>',
        '<div class="obj"><div class="tarj oscura"><small>Rutina</small><b>Resumen del día listo</b></div></div>',
        '<div class="obj"><div class="tarj violeta"><small>Modo supervisado</small><b>Vos aprobás</b></div></div>',
        '<div class="obj"><div class="tarj"><small>Aprendizaje</small><b>Cada corrección suma</b></div></div>',
    ],
    historia_h2='Así trabaja un agente',
    pasos=pasos_de('agentes', ['El agente', 'La conversación', 'Solo', 'Sus tareas', 'Listo']),
    video_alt='Video: el agente del hotel conversa con un huésped, consulta la disponibilidad y arma la reserva, y el panel muestra lo que resolvieron los agentes.',
    secciones=[
        dial('s1', 'El hotel decide cuánto hace solo', 'La autonomía de cada agente se configura en tres niveles.', [
            ('Prepara y una persona aprueba', 'En el modo supervisado, el agente arma la respuesta y alguien del equipo la aprueba antes de enviarla.'),
            ('Resuelve lo repetitivo', 'Rutinas que corren solas: resúmenes, respuestas frecuentes y tareas de todos los días.'),
            ('Opera con más autonomía', 'El hotel define hasta dónde llega cada agente, y puede volver atrás cuando quiera.'),
        ]),
        lista('vendes', 'Lo que le vendés a cada hotel', 'Inteligencia artificial que <b>trabaja con la información real del hotel</b>, no con una base aparte.', [
            ('Conectada en vivo', 'Consulta la información operativa y comercial del hotel en lenguaje natural.'),
            ('En los canales del hotel', 'Responde por WhatsApp, el chat de la web o el email, con el CRM y el canal conectados.'),
            ('Rutinas y agentes', 'Automatiza tareas recurrentes y prepara respuestas, resúmenes o documentos para el equipo.'),
            ('Aprende', 'Cada corrección mejora al agente.'),
            ('Dos planes para tu cartera', 'Con panel de costo por agente y memoria del hotel en los dos.', planes([
                ('Professional', ['Hasta 3 agentes', 'Hasta 10 rutinas activas']),
                ('Enterprise', ['Hasta 30 agentes', 'Hasta 30 rutinas activas'])])),
        ], extra='<p class="aviso" data-entra>Para responder por WhatsApp, la web o el email, el hotel necesita el CRM con ese canal conectado.</p>'),
        manifiesto('m1', 'Contesta a las 3 de la mañana, <em>con la información de ahora.</em>', 'Porque está conectado al sistema del hotel, no a un documento viejo.'),
        como(),
    ],
    combina=['crm', 'motor', 'pms', 'marketing'], combina_h2='La IA conecta a todo el racimo',
    combina_txt='Responde desde el CRM, cotiza con las tarifas del motor y consulta el PMS para saber qué hay disponible.',
))


if __name__ == '__main__':
    for p in PRODUCTOS:
        carpeta = RAIZ / CATALOGO[p['k']][1].strip('/')
        carpeta.mkdir(exist_ok=True)
        (carpeta / 'index.html').write_text(pagina(p), encoding='utf-8', newline='\n')
        print('ok', CATALOGO[p['k']][1])
