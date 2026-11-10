import sys, pathlib
from playwright.sync_api import sync_playwright
from PIL import Image
d = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2])
F = pathlib.Path(r'C:/Users/aldis/Downloads/PORTFOLIO ALDANA SALIGARI/RACIMO/RACIMO pantallas/assets/fotos')
fotos = dict(colonial='colonial.png', piscina='piscina-finca.jpg', restaurante='restaurante.jpg', spa='spa.jpg', habitacion='habitacion.png', living='living.png', tina='tina-noche.jpg')
html = (d / 'motor.html').read_text(encoding='utf8')
for k, f in fotos.items(): html = html.replace(f'url(F_{k})', f"url('{(F / f).as_uri()}')")
(d / 'motor-listo.html').write_text(html, encoding='utf8')
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    for sel, vw, dsf, name in [('#escritorio', 1920, 2, 'mo-motor-v2'), ('#celular', 390, 3, 'mo-motor-cel-v2')]:
        pg = b.new_page(viewport={'width': vw, 'height': 1000}, device_scale_factor=dsf)
        pg.goto((d / 'motor-listo.html').as_uri()); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(800)
        png = d / f'{name}.png'; pg.locator(sel).screenshot(path=str(png))
        im = Image.open(png).convert('RGB'); print(name, im.size)
        im.save(out / f'{name}.webp', quality=92, method=6)
    b.close()
