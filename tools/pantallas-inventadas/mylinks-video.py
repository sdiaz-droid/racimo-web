# Saca la vista previa de MyLinks del Hotel Los Álamos para el video de Sitio web, con la cara REAL
# del producto (foto a sangre, logo en círculo, botones de vidrio; referencia de Fer, 13/11).
# Fuente: mylinks-real.html. Pantalla del celular del editor: 289 × 623,5 de mundo, a 3,5x
# → video/comun/real/web-mylinks-cel.webp.   Uso: python mylinks-video.py
import pathlib
from playwright.sync_api import sync_playwright
from PIL import Image
R = pathlib.Path(__file__).resolve().parents[2]; d = R / 'tools/pantallas-inventadas'
F = pathlib.Path(r'C:/Users/aldis/Downloads/PORTFOLIO ALDANA SALIGARI/RACIMO/RACIMO pantallas/assets/fotos')
html = (d / 'mylinks-real.html').read_text(encoding='utf8').replace('L_ISO', (d / 'racimo-isotipo.png').as_uri()).replace('url(F_colonial)', f"url('{(F / 'colonial.png').as_uri()}')")
tmp = d / 'mylinks-real-listo.html'; tmp.write_text(html, encoding='utf8')
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=r'C:/Program Files/Google/Chrome/Application/chrome.exe')
    pg = b.new_page(viewport={'width': 400, 'height': 700}, device_scale_factor=3.5)
    pg.goto(tmp.as_uri()); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(800)
    png = d / 'mylinks-cel.png'; pg.locator('#pantalla').screenshot(path=str(png)); b.close()
im = Image.open(png).convert('RGB'); print(im.size)
im.save(R / 'video/comun/real/web-mylinks-cel.webp', quality=92, method=6)
tmp.unlink(); png.unlink()
