#!/bin/bash
cd /home/claude/sanatan-auto/engine/shadow
n=$1; v=$2
D=$(python3 -c "import json;print(round(json.load(open('data/$n.json'))['duration'],2))")
python3 mkev_gods.py $n "${3:-[]}" >/dev/null
python3 sfx.py /root/sd/tts/$n.wav data/$n.events.json $D out/${n}_audio.wav >/dev/null 2>out/sfx_$n.log
FPS=60 node render.mjs $n render > out/r_$n.log 2>&1
ffmpeg -y -loglevel error -i out/${n}_silent.mp4 -i out/${n}_audio.wav -vf scale=1080:1920:flags=lanczos -c:v libx264 -preset veryfast -crf 19 -r 60 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart ../../videos/$v.mp4
echo done $v >> out/run.log
