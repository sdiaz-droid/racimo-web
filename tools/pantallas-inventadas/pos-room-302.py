# pos-room.webp con la Hab. 302 a nombre de Laura Giménez (la huésped del video de Huésped+) → pos-room-302.webp
import pathlib
from playwright.sync_api import sync_playwright
R = pathlib.Path(__file__).resolve().parents[2]; src = (R / 'video/comun/real/pos-room.webp').as_uri()
html = f'''<html><head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap" rel="stylesheet">
<style>body{{margin:0}}#e{{position:relative;width:3840px;height:2000px;background:url({src})}}
#n{{position:absolute;left:1616px;top:883px;width:230px;height:44px;background:#fff;font:400 27.5px/44px Inter,sans-serif;color:#6b6b74;padding-left:6px}}</style></head>
<body><div id="e"><div id="n">Laura Giménez</div></div></body></html>'''
t = R / 'tools/pantallas-inventadas/_pos.html'; t.write_text(html, encoding='utf8')
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=r'C:/Program Files/Google/Chrome/Application/chrome.exe')
    pg = b.new_page(viewport={'width': 3840, 'height': 2000}); pg.goto(t.as_uri()); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(500)
    pg.locator('#e').screenshot(path=str(R / 'tools/pantallas-inventadas/_pos.png')); b.close()
from PIL import Image
Image.open(R / 'tools/pantallas-inventadas/_pos.png').convert('RGB').save(R / 'video/comun/real/pos-room-302.webp', quality=92, method=6)
(R / 'tools/pantallas-inventadas/_pos.png').unlink(); t.unlink()
