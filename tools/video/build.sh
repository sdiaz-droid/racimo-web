#!/usr/bin/env bash
# Compila un video de Racimo para la web: motor + escena + reproductor en un solo JS.
# Uso: tools/video/build.sh <escena.jsx> <carpeta de salida en video/> 
# Las rutas de assets del video se reescriben a /video/<carpeta>/ para que funcionen desde cualquier página.
set -euo pipefail
cd "$(dirname "$0")"
ESC="$1"; OUT="$2"
TMP=$(mktemp -d)
cat animations-v3.jsx "$ESC" player.jsx \
  | sed -E "s#(['\"\`])(logos|assets)/#\1/video/$OUT/\2/#g" > "$TMP/entrada.jsx"
npx -y esbuild@0.24.0 "$TMP/entrada.jsx" --loader:.jsx=jsx --format=iife --minify --target=es2019 \
  --outfile="../../video/$OUT/video.js" --log-level=warning
rm -rf "$TMP"
ls -la "../../video/$OUT/video.js"
