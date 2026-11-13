# Guest App del Hotel Los Álamos (el celular de la página de Huésped+) como tira larga para el video de Huésped+:
# 330 de mundo de ancho a 3,2x → video/comun/real/hu-app-cel.webp. Llave digital abierta y check-in hecho.
# Uso: con el sitio servido en localhost:8766 →  python hu-app-cel.py
import pathlib, sys
from playwright.sync_api import sync_playwright
from PIL import Image
R = pathlib.Path(__file__).resolve().parents[2]
URL = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8766') + '/huesped-plus/'
CSS = '''.ml-cel{width:330px!important;aspect-ratio:auto!important;padding:0!important;border-radius:0!important;box-shadow:none!important;background:none!important}
.ml-cel::after,.ml-isla,.ml-estado{display:none!important}
.ml-portada{height:340px!important}
.ml-pantalla{height:auto!important;overflow:visible!important;border-radius:0!important}
.ml-portada img{transform:none!important}
.ml-llave-bt::after{animation:none!important;opacity:0!important}'''
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=r'C:/Program Files/Google/Chrome/Application/chrome.exe')
    pg = b.new_page(viewport={'width': 1200, 'height': 900}, device_scale_factor=3.2)
    pg.goto(URL); pg.wait_for_load_state('networkidle')
    pg.add_style_tag(content=CSS)
    pg.evaluate("""()=>{const c=document.querySelector('[data-ml]');c.classList.add('checkin','abierta');c.classList.remove('pasada');
      const pan=c.querySelector('.ml-pantalla');pan.dispatchEvent(new Event('wheel'));pan.scrollTop=0;
      c.querySelector('.ml-carril').scrollLeft=0;c.querySelectorAll('img').forEach(i=>i.loading='eager')}""")
    pg.evaluate("document.querySelector('.ml-cel').scrollIntoView({block:'start'})")
    pg.wait_for_function("[...document.querySelectorAll('.ml-pantalla img')].every(i=>i.complete&&i.naturalWidth>0)", timeout=15000)
    pg.wait_for_timeout(900)
    png = R / 'tools/pantallas-inventadas/hu-app-cel.png'
    pg.locator('.ml-pantalla').screenshot(path=str(png)); b.close()
im = Image.open(png).convert('RGB'); print(im.size, 'alto en mundo:', round(im.height / im.width * 330, 1))
im.save(R / 'video/comun/real/hu-app-cel.webp', quality=92, method=6); png.unlink()
