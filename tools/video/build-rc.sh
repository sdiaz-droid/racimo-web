#!/usr/bin/env bash
# Compila un video armado sobre rc-kit: motor + rc-kit + escena + reproductor.
# Uso: tools/video/build-rc.sh rc-motor.jsx motor
# Los assets son comunes a todos estos videos: van en video/comun/ (fotos en webp).
set -euo pipefail
cd "$(dirname "$0")"
ESC="$1"; OUT="$2"
TMP=$(mktemp -d)
cat animations-v3.jsx rc-kit.jsx "$ESC" player-rc.jsx \
  | sed -E "s#(window\.RC_[A-Z]+ = \{)#\1 Piece,#" \
  | sed -E "s#(['\"\`])assets/fotos/([a-z-]+)\.(jpg|png)#\1/video/comun/assets/fotos/\2.webp#g" \
  | sed -E "s#(['\"\`])(logos|assets)/#\1/video/comun/\2/#g" > "$TMP/entrada.jsx"
mkdir -p "../../video/$OUT"
npx -y esbuild@0.24.0 "$TMP/entrada.jsx" --loader:.jsx=jsx --format=iife --minify --target=es2019 \
  --outfile="../../video/$OUT/video.js" --log-level=warning
rm -rf "$TMP"
ls -la "../../video/$OUT/video.js" | awk '{print $5, $9}'
