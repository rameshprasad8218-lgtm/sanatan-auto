#!/bin/bash
cd /home/claude/sanatan-auto/engine/shadow
for p in "lakshman30 34_lakshman_neend" "ekalavya30 35_ekalavya_angutha" "sanjeevani30 36_hanuman_sanjeevani"; do set -- $p; n=$1; v=$2
D=$(python3 -c "import json;print(round(json.load(open('data/$n.json'))['duration'],2))")
python3 mkev_gods.py $n '[]' >/dev/null
/home/claude/sd/venv/bin/python sfx.py /home/claude/sd/tts/$n.wav data/$n.events.json $D out/${n}_audio.wav >/dev/null
FPS=60 node render.mjs $n render > out/r_$n.log 2>&1
ffmpeg -y -loglevel error -i out/${n}_silent.mp4 -i out/${n}_audio.wav -vf scale=1080:1920:flags=lanczos -c:v libx264 -preset veryfast -crf 19 -r 60 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart ../../videos/$v.mp4
echo done $v >> out/runall.log
done
