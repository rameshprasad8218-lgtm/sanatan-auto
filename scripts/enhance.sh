#!/bin/sh
# usage: enhance.sh in720.mp4 plan.json out1080.mp4
# 720p render -> effects pass at 1080x1920 (Hindi-safe text) -> high-quality encode + loudness
set -e
D="$(cd "$(dirname "$0")/.." && pwd)"
IN="$1"; PLAN="$2"; OUT="$3"; TMP="$(mktemp -d)"
python3 "$D/tools/video-effects/scripts/fx.py" --plan "$PLAN" "$IN" "$TMP/fx.mp4"
ffmpeg -v error -y -i "$TMP/fx.mp4" \
  -vf "scale=1080:1920:flags=lanczos,unsharp=5:5:0.6:5:5:0.0" \
  -c:v libx264 -preset slow -crf 16 -maxrate 12M -bufsize 24M -pix_fmt yuv420p \
  -af loudnorm=I=-14:TP=-1.5:LRA=9 -c:a aac -b:a 192k -movflags +faststart "$OUT"
rm -rf "$TMP"
