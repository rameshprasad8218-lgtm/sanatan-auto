#!/bin/sh
# mux.sh <name> <NN> : splice the re-rendered 1 s head (lit frame 0 + hook) onto the full silent render, add the deep audio, encode final
n=$1; nn=$2
ffmpeg -loglevel error -y -i out/${n}_head.mp4 -i out/${n}_silent.mp4 -i out/${n}_audio.wav -filter_complex "[1:v]trim=start=1.0,setpts=PTS-STARTPTS[b];[0:v][b]concat=n=2:v=1:a=0,scale=1080:1920:flags=lanczos,fps=60[v]" -map "[v]" -map 2:a -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart ../../videos/${nn}_${n}.mp4
