#!/bin/sh
cd /home/claude/sd
./venv/bin/python mk_tts.py kharna kheer nirjala > tts_k.log 2>&1
for n in kharna kheer nirjala; do
  ./venv/bin/python render2.py $n > render_$n.log 2>&1
  case $n in kharna) o=08_kharna_kya_hai;; kheer) o=09_kharna_ki_kheer;; nirjala) o=10_nirjala_vrat;; esac
  ffmpeg -y -i out/$n.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=9 -vf "scale=1080:1920:flags=lanczos,unsharp=5:5:0.5:5:5:0.0" -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart /mnt/user-data/outputs/$o.mp4 >> render_$n.log 2>&1
  echo done $n >> runk.log
done
