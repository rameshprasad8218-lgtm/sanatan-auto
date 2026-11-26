#!/bin/bash
# usage: pipe1.sh NN name
cd /home/claude/sanatan-auto/engine/shadow
NN=$1; n=$2
python3 mkparts.py $n >/dev/null && python3 gen.py $n && python3 build_story_gods.py $n >/dev/null || exit 1
D=$(python3 -c "import json;d=json.load(open('data/$n.json'));print(d['duration'])")
EV=$(python3 -c "import json;d=json.load(open('data/$n.json'));L=d['lines'];print(json.dumps([[round(L[-1]['start']-0.05,2),'shimmer'],[round(L[-1]['start']+0.3,2),'gong',0.7],[round(L[4]['start']-0.05,2),'shimmer']]))")
python3 mkev_gods.py $n "$EV"
/home/claude/sd/venv/bin/python sfx.py /home/claude/sd/tts/$n.wav data/$n.events.json $D out/${n}_audio.wav >/dev/null
FPS=60 node render.mjs $n render >/tmp/r_$n.log 2>&1
ls out/${n}_silent.mp4 >/dev/null || exit 1
ffmpeg -y -loglevel error -i out/${n}_silent.mp4 -i out/${n}_audio.wav -vf scale=1080:1920 -c:v libx264 -preset veryfast -crf 19 -r 60 -c:a aac -b:a 192k -shortest ../../videos/${NN}_${n}.mp4 && echo DONE $n
