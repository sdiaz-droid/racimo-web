# Herramientas

## Videos de producto para la web (`tools/video/`)

Los videos de Racimo se hicieron en Claude Design. Cada video es una animación que depende
sólo del tiempo, así que en la web se dibujan en vivo y la página maneja ese tiempo: avanza con
el scroll y retrocede igual, sin saltos.

- `animations-v3.jsx` es el motor de Claude Design, sin cambios.
- `cm-video.jsx` es la escena de Channel Manager, copiada de la exportación de Claude Design.
- `player.jsx` monta la escena sin la barra ni los ajustes del editor y expone `RacimoVideo.mount(el, {scenes, tweaks, vertical})`, que devuelve `{set(t), total, width, height}`.

Compilar (necesita Node; usa esbuild con npx):

    bash tools/video/build.sh cm-video.jsx channel   # → video/channel/video.js

Las rutas `logos/` y `assets/` de la escena se reescriben a `/video/<carpeta>/`, así que los
assets del video van en `video/<carpeta>/logos` y `video/<carpeta>/assets`.

## Página de producto

- `channel-manager/index.html`: el contenido y la configuración del video (`window.RACIMO_VIDEO`: escenas, pausas de lectura, pantallas por segundo).
- `assets/producto.css` y `assets/producto.js`: lo compartido por todas las páginas de producto (Lenis, la uva, la historia con scroll, la rejilla).
- `assets/consulta.css` y `assets/consulta.js`: el formulario de consulta, que manda a resellers@racimo.tech vía FormSubmit. **El primer envío manda un mail de activación a esa casilla**: alguien con acceso tiene que confirmarlo una vez.
- Las otras 9 páginas se generan con `python tools/paginas/generar.py` (editar el generador, no los HTML). Sus videos: `bash tools/video/build-rc.sh rc-motor.jsx motor`, con los assets comunes en `video/comun/`.
- UGC: si existe `video/<carpeta>/ugc.mp4` (más `ugc-portada.webp`), la sección aparece sola.
