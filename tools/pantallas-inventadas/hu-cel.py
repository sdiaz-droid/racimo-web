# Pantallas del celular de Laura para el video de Huésped+ (chat con recepción y room service), 330 × 713 a 3,2x
# → video/comun/real/hu-chat-cel.webp y hu-room-cel.webp.   Uso: python hu-cel.py
import pathlib
from playwright.sync_api import sync_playwright
from PIL import Image
R = pathlib.Path(__file__).resolve().parents[2]; d = R / 'tools/pantallas-inventadas'
html = (d / 'hu-cel.html').read_text(encoding='utf8').replace('url(F_cena)', f"url('{(R / 'assets/mylinks/cena.webp').as_uri()}')")
tmp = d / 'hu-cel-listo.html'; tmp.write_text(html, encoding='utf8')
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=r'C:/Program Files/Google/Chrome/Application/chrome.exe')
    pg = b.new_page(viewport={'width': 800, 'height': 800}, device_scale_factor=3.2)
    pg.goto(tmp.as_uri()); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(800)
    for k in ['chat', 'room']:
        png = d / f'{k}.png'; pg.locator('#' + k).screenshot(path=str(png))
        im = Image.open(png).convert('RGB'); im.save(R / f'video/comun/real/hu-{k}-cel.webp', quality=92, method=6); png.unlink(); print(k, im.size)
    b.close()
tmp.unlink()
