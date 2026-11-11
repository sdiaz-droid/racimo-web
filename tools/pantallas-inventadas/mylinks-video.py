# Saca la página MyLinks del Hotel Los Álamos (la misma del celular de GuestApp)
# como una tira larga para el video de Sitio web: ancho de la pantalla del celular
# del editor (289 de mundo) a 3,5x → video/comun/real/web-mylinks-cel.webp
# Uso: con el sitio servido en localhost:8766 →  python mylinks-video.py
import pathlib, sys
from playwright.sync_api import sync_playwright
from PIL import Image
R = pathlib.Path(__file__).resolve().parents[2]
URL = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8766') + '/guestapp/'
CSS = '''.ml-cel{width:289px!important;aspect-ratio:auto!important;padding:0!important;border-radius:0!important;box-shadow:none!important;background:none!important}
.ml-cel::after,.ml-isla,.ml-estado{display:none!important}
.ml-pantalla{height:auto!important;overflow:visible!important;border-radius:0!important}
.ml-portada{height:399px!important}
.ml-portada img{transform:none!important}
.ml-llave-bt::after{animation:none!important;opacity:0!important}'''
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=r'C:/Program Files/Google/Chrome/Application/chrome.exe')
    pg = b.new_page(viewport={'width': 1200, 'height': 900}, device_scale_factor=3.5)
    pg.goto(URL); pg.wait_for_load_state('networkidle')
    pg.add_style_tag(content=CSS)
    pg.evaluate("""()=>{const c=document.querySelector('[data-ml]');c.classList.add('checkin','abierta');c.classList.remove('pasada');
      const pan=c.querySelector('.ml-pantalla');pan.dispatchEvent(new Event('wheel'));pan.scrollTop=0;
      c.querySelector('.ml-carril').scrollLeft=0;
      c.querySelectorAll('img').forEach(i=>i.loading='eager')}""")
    pg.evaluate("document.querySelector('.ml-cel').scrollIntoView({block:'start'})")
    pg.wait_for_function("[...document.querySelectorAll('.ml-pantalla img')].every(i=>i.complete&&i.naturalWidth>0)", timeout=15000)
    pg.wait_for_timeout(800)
    png = R / 'tools/pantallas-inventadas/mylinks-cel.png'
    pg.locator('.ml-pantalla').screenshot(path=str(png))
    im = Image.open(png).convert('RGB'); print(im.size, 'alto en mundo:', round(im.height / 3.5, 1))
    im.save(R / 'video/comun/real/web-mylinks-cel.webp', quality=90, method=6); png.unlink()
    b.close()
