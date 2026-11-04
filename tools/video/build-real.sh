#!/usr/bin/env bash
# Compila un video de producto armado con el PMS REAL: motor + rc-kit + rc-real + guiones + reproductor.
# Uso: tools/video/build-real.sh PMS pms     (clave del guion en real-videos.jsx, carpeta de salida en /video)
set -euo pipefail
cd "$(dirname "$0")"
KEY="$1"; OUT="$2"
TMP=$(mktemp -d)
printf "window['RC_%s'] = { Piece: window.RCREAL.hacer(window.RACIMO_REAL['%s']) };\n" "$KEY" "$KEY" > "$TMP/entrada-clave.jsx"
cat animations-v3.jsx rc-kit.jsx rc-real.jsx real-videos.jsx "$TMP/entrada-clave.jsx" player-rc.jsx \
  | sed -E "s#(['\"\`])assets/fotos/([a-z-]+)\.(jpg|png)#\1/video/comun/assets/fotos/\2.webp#g" \
  | sed -E "s#(['\"\`])(logos|assets)/#\1/video/comun/\2/#g" > "$TMP/entrada.jsx"
mkdir -p "../../video/$OUT"
npx -y esbuild@0.24.0 "$TMP/entrada.jsx" --loader:.jsx=jsx --format=iife --minify --target=es2019 \
  --outfile="../../video/$OUT/video.js" --log-level=warning
rm -rf "$TMP"
ls -la "../../video/$OUT/video.js" | awk '{print $5, $9}'
