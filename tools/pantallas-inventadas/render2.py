# Renderiza ads-google.html, crm-centraliza.html y ads-conjuntos.html a 2x (3840×2000) → video/comun/real/*.webp
import sys, pathlib
from playwright.sync_api import sync_playwright
from PIL import Image
R = pathlib.Path(__file__).resolve().parents[2]
d = R / 'tools/pantallas-inventadas'; out = R / 'video/comun/real'
F = pathlib.Path(r'C:/Users/aldis/Downloads/PORTFOLIO ALDANA SALIGARI/RACIMO/RACIMO pantallas/assets/fotos')
L = pathlib.Path(r'C:/Users/aldis/pxsol-design-system/marca/logos-terceros/originales')
reemplazos = {'url(F_colonial)': f"url('{(F/'colonial.png').as_uri()}')", 'url(F_habitacion)': f"url('{(F/'habitacion.png').as_uri()}')",
  'url(F_piscina)': f"url('{(F/'piscina-finca.jpg').as_uri()}')", 'LOGO_G': (R/'assets/logos/google-color.svg').as_uri(),
  'L_WA': (L/'whatsapp-logo.svg').as_uri(), 'L_IG': (L/'instagram-glyph.svg').as_uri(), 'L_FB': (L/'facebook-logo.svg').as_uri(),
  'url(F_colonial2)': '', 'url(F_tina)': f"url('{(F/'tina-lago.jpg').as_uri()}')", 'url(F_kayak)': f"url('{(F/'kayaks.jpg').as_uri()}')",
  'url(F_cena)': f"url('{(F/'restaurante.jpg').as_uri()}')", 'url(F_spa)': f"url('{(F/'spa.jpg').as_uri()}')",
  'L_META': (R/'assets/logos/meta-color.png').as_uri(), 'L_GPT': (R/'assets/logos/chatgpt-negro.svg').as_uri()}
nombres = sys.argv[1:] or ['ads-google', 'crm-centraliza']
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=r'C:/Program Files/Google/Chrome/Application/chrome.exe')
    for n in nombres:
        html = (d / f'{n}.html').read_text(encoding='utf8')
        for k, v in reemplazos.items(): html = html.replace(k, v)
        tmp = d / f'{n}-listo.html'; tmp.write_text(html, encoding='utf8')
        pg = b.new_page(viewport={'width': 1920, 'height': 1000}, device_scale_factor=2)
        pg.goto(tmp.as_uri()); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(800)
        png = d / f'{n}.png'; pg.locator('#escritorio').screenshot(path=str(png))
        im = Image.open(png).convert('RGB'); im.save(out / f'{n}.webp', quality=92, method=6); print(n, im.size)
        tmp.unlink(); png.unlink()
    b.close()
