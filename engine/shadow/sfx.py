#!/usr/bin/env python3
"""Deep cinematic mix for shadow-puppet Shorts.
   python3 sfx.py <voice.wav> <events.json> <duration_s> <out.wav>
events.json: [[time_s, "boom|dhol|whoosh|tick|gong|shimmer|drop|riser|heart", amp(optional)], ...]
Chain: voice (warm low-mid, presence, compression, tiny room) + sub-bass drone bed with slow pad (ducked under the voice) + events -> loudnorm to -14 LUFS.
Needs numpy, soundfile, ffmpeg."""
import sys, json, subprocess, numpy as np, soundfile as sf
SR = 48000
voice_wav, ev_json, dur, out = sys.argv[1], json.load(open(sys.argv[2])), float(sys.argv[3]), sys.argv[4]
rng = np.random.default_rng(11); N = int(dur * SR); t = np.arange(N) / SR
def lp(x, fc):  # one-pole-ish smoothing via cumulative filter (cheap lowpass)
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s = a * s + (1 - a) * x[i]; y[i] = s
    return y
def boom(d=1.6, f0=110, f1=32, a=.8):
    n = int(d * SR); tt = np.arange(n) / SR; return np.sin(2 * np.pi * (f1 * tt + (f0 - f1) * (1 - np.exp(-tt * 5)) / 5)) * np.exp(-tt * 2.6) * a
def dhol(a=.7):   # low drum hit: body + skin slap
    n = int(.9 * SR); tt = np.arange(n) / SR; body = np.sin(2 * np.pi * (62 + 60 * np.exp(-tt * 30)) * tt) * np.exp(-tt * 6); slap = rng.standard_normal(n) * np.exp(-tt * 60) * .15
    return (body + slap) * a
def whoosh(d=.6, a=.14):
    n = int(d * SR); x = rng.standard_normal(n); x = x - lp(x, 900); return x * np.sin(np.linspace(0, np.pi, n)) ** 2 * a * .6
def tick(a=.25):
    n = int(.12 * SR); tt = np.arange(n) / SR; return (np.sin(2 * np.pi * 1900 * tt) * .6 + np.sin(2 * np.pi * 3100 * tt) * .4) * np.exp(-tt * 55) * a
def gong(a=.5):
    n = int(3.5 * SR); tt = np.arange(n) / SR; return sum(np.sin(2 * np.pi * f * tt) * k for f, k in [(98, 1), (196, .6), (294, .4), (441, .25)]) * np.exp(-tt * 1.2) * a * .5
def shimmer(d=2.6, a=.14):
    n = int(d * SR); tt = np.arange(n) / SR; return sum(np.sin(2 * np.pi * f * tt) * np.sin(tt * 3 + f) for f in (1568, 1976, 2349, 2637)) * np.exp(-tt * 1.1) * a * .25
def drop(a=.25):
    n = int(.4 * SR); tt = np.arange(n) / SR; return np.sin(2 * np.pi * (1400 - 1000 * tt) * tt) * np.exp(-tt * 20) * a
def riser(d=1.5, a=.2):
    n = int(d * SR); x = rng.standard_normal(n); x = x - lp(x, 600); return x * np.linspace(0, 1, n) ** 2 * a * .5
def heart(a=.4):
    n = int(.3 * SR); tt = np.arange(n) / SR; return np.sin(2 * np.pi * 50 * tt) * np.exp(-tt * 14) * a
F = dict(boom=boom, dhol=dhol, whoosh=whoosh, tick=tick, gong=gong, shimmer=shimmer, drop=drop, riser=riser, heart=heart)
sfx = np.zeros(N)
for e in ev_json:
    at, nm = e[0], e[1]; fn = F[nm](*([e[2]] if len(e) > 2 else [])) if nm in ('tick', 'drop', 'heart', 'dhol', 'gong') else F[nm]()
    if nm not in ('tick', 'drop', 'heart', 'dhol', 'gong') and len(e) > 2: fn = fn * e[2]
    a = int(at * SR); m = min(len(fn), N - a)
    if m > 0: sfx[a:a + m] += fn[:m]
# bed: deep sub + slow pad (detuned saws, low-passed) + faint wind
sub = (np.sin(2 * np.pi * 41 * t) * .55 + np.sin(2 * np.pi * 55 * t + 1) * .35) * (.7 + .3 * np.sin(t * .5))
pad = np.zeros(N)
for f in (110, 164.8, 220, 329.6):
    for dt in (-.6, .6): pad += (((t * (f + dt)) % 1) * 2 - 1) * .08
pad = lp(pad, 420) * (.5 + .5 * np.sin(t * .35 + 1))
wind = lp(rng.standard_normal(N), 700) * 1.1
bed = sub * .22 + pad * .5 + wind * .06
sf.write('/tmp/_bed.wav', bed.astype(np.float32), SR); sf.write('/tmp/_sfx.wav', sfx.astype(np.float32), SR)
fc = ('[0:a]highpass=f=70,equalizer=f=140:t=q:w=1:g=3.5,equalizer=f=3200:t=q:w=1.2:g=3,deesser=i=0.4,'
      'acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=4,aecho=0.85:0.5:40|70:0.12|0.07,apad=whole_dur=%f,aformat=sample_rates=48000:channel_layouts=mono,asplit=2[vo][sc];'
      '[1:a]aformat=sample_rates=48000:channel_layouts=mono[bed0];[bed0][sc]sidechaincompress=threshold=0.015:ratio=9:attack=15:release=350[bed];'
      '[2:a]aformat=sample_rates=48000:channel_layouts=mono[fx];'
      '[vo][bed][fx]amix=inputs=3:normalize=0:weights=1.25 0.9 0.9,loudnorm=I=-14:TP=-1.5:LRA=9,alimiter=limit=0.95[o]') % dur
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', voice_wav, '-i', '/tmp/_bed.wav', '-i', '/tmp/_sfx.wav', '-filter_complex', fc, '-map', '[o]', '-t', str(dur), '-ar', '48000', out], check=True)
print('wrote', out)
