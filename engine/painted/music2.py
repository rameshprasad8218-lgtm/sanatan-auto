# -*- coding: utf-8 -*-
"""Gandhari-short soundtrack: tanpura + pad + bansuri phrases + whoosh/thump SFX, voice-ducked."""
import numpy as np
from scipy.signal import resample_poly, butter, sosfilt
from music import SR, tanpura, pad, bell, reverb

SA = 146.83
R = dict(S=1, r=16 / 15, g=6 / 5, M=4 / 3, P=3 / 2, d=8 / 5, n=9 / 5, S2=2, r2=32 / 15, g2=12 / 5)


def flute(freqs, durs, breath=0.07, seed=5):
    """legato bansuri line with portamento, vibrato and breath noise"""
    rnd = np.random.default_rng(seed)
    total = sum(durs) + 1.2
    n = int(total * SR)
    t = np.arange(n) / SR
    f = np.zeros(n); amp = np.zeros(n)
    pos = 0.0; prev = freqs[0]
    for fr, d in zip(freqs, durs):
        a, b = int(pos * SR), int((pos + d) * SR)
        glide = int(.09 * SR)
        f[a:b] = fr
        if a > 0:
            f[a:a + glide] = np.linspace(prev, fr, glide)
        # note envelope
        L = b - a
        env = np.ones(L)
        att = int(.07 * SR); rel = int(min(.25, d * .45) * SR)
        env[:att] = np.linspace(.0, 1, att) ** 1.4
        env[-rel:] *= np.linspace(1, 0, rel) ** 1.2
        env *= 1 + .10 * np.sin(2 * np.pi * 4.2 * np.arange(L) / SR)  # swell
        amp[a:b] = np.maximum(amp[a:b], env)
        prev = fr; pos += d * .98
    f[int(pos * SR):] = prev
    vib = 1 + .006 * np.sin(2 * np.pi * 5.4 * t) * np.clip(t % 1e9, 0, 1)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    sig = np.sin(ph) + .22 * np.sin(2 * ph) + .08 * np.sin(3 * ph)
    nz = rnd.standard_normal(n)
    sos = butter(2, [800, 3200], 'bandpass', fs=SR, output='sos')
    nz = sosfilt(sos, nz)
    sig = sig * amp + breath * nz * amp
    sig = sosfilt(butter(2, 5200, 'low', fs=SR, output='sos'), sig)
    return (sig / (np.max(np.abs(sig)) + 1e-9)).astype(np.float32)


def phrase(name, base):
    P = {
        'A': [('P', 1.1), ('d', .9), ('P', .8), ('M', .9), ('g', .9), ('M', .8), ('g', .7), ('r', .8), ('S', 2.4)],
        'B': [('g', .9), ('M', .9), ('P', 1.0), ('d', 1.2), ('P', .8), ('M', .9), ('g', 1.6)],
        'C': [('S', .9), ('g', .8), ('M', .8), ('P', 1.0), ('d', .8), ('P', .9), ('S2', 1.6), ('P', 2.0)],
        'D': [('S2', 1.2), ('d', .9), ('P', 1.0), ('M', .9), ('g', 1.0), ('r', .8), ('S', 2.8)],
    }[name]
    return flute([base * R[n] for n, _ in P], [d for _, d in P])


def whoosh(dur=.32, seed=1, up=True):
    rnd = np.random.default_rng(seed)
    n = int(dur * SR)
    x = rnd.standard_normal(n)
    out = np.zeros(n)
    steps = 10
    for i in range(steps):
        a, b = i * n // steps, (i + 1) * n // steps
        fc = 500 * (6 ** (i / steps)) if up else 3000 * (.15 ** (i / steps))
        sos = butter(2, [fc * .6, min(fc * 1.6, 20000)], 'bandpass', fs=SR, output='sos')
        out[a:b] = sosfilt(sos, x)[a:b]
    env = np.sin(np.linspace(0, np.pi, n)) ** 1.5
    return (out * env / (np.max(np.abs(out * env)) + 1e-9)).astype(np.float32)


def thump(dur=1.0, f=52):
    n = int(dur * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * (f + 40 * np.exp(-t * 18)) * t) * np.exp(-t * 4.5)
    nz = np.random.default_rng(2).standard_normal(n) * np.exp(-t * 30) * .35
    return (s + nz).astype(np.float32)


def add(m, x, at, g):
    a = int(at * SR)
    if a < 0 or a >= len(m):
        return
    m[a:a + len(x)] += x[:len(m) - a] * g


def make_mix2(voice24, cuts, dur, out_path, lines):
    import soundfile as sf
    v = resample_poly(voice24, 147, 80).astype(np.float32)
    n = int(dur * SR)
    v = np.pad(v, (0, max(n - len(v), 0)))[:n]
    bed = tanpura(dur, SA) * .9 + pad(dur, SA) * .5
    # bansuri
    fl = np.zeros(n, np.float32)
    ls = lambda i: lines[i]['start']
    sched = [(0.3, 'A', SA * 2), (ls(2) + .2, 'B', SA * 2), (ls(4) + .3, 'A', SA * 2), (ls(8) + .1, 'C', SA * 2), (ls(10) + .2, 'B', SA * 2), (ls(12) + .0, 'D', SA * 2), (ls(13) - .1, 'C', SA * 4)]
    for st, nm, base in sched:
        if st < dur - 1:
            add(fl, phrase(nm, base), st, 1.0)
    fl = reverb(fl, .45, 2.6, 9)
    # curse tension: low pulses
    sfx = np.zeros(n, np.float32)
    for tt in np.arange(ls(6), ls(8), 1.35):
        add(sfx, thump(.9, 48), tt, .5)
    add(sfx, thump(1.4, 44), ls(6) - .02, 1.0)
    add(sfx, thump(1.4, 44), ls(7) + 2.1, .9)
    for tt, kind in cuts:
        if kind == 'cut':
            add(sfx, whoosh(.28, int(tt * 10)), tt - .12, .22)
        else:
            add(sfx, bell(1174.7, 2.2), tt - .1, .06)
    # voice ducking
    win = int(.06 * SR)
    env = np.sqrt(np.convolve(v ** 2, np.ones(win) / win, 'same'))
    env = np.convolve(env, np.hanning(int(.35 * SR)) / np.hanning(int(.35 * SR)).sum(), 'same')
    env = np.clip(env / (np.percentile(env, 90) + 1e-9), 0, 1)
    bed = reverb(bed, .32) * (0.27 - .14 * env)
    fl = fl * (0.30 - .17 * env)
    try:
        from pedalboard import Pedalboard, HighpassFilter, Compressor, PeakFilter, Reverb, Limiter, Gain, LowShelfFilter
        vb = Pedalboard([HighpassFilter(85), PeakFilter(220, -2.5, 1.0), PeakFilter(3200, 3.0, 0.9),
                         Compressor(threshold_db=-20, ratio=3.0, attack_ms=8, release_ms=120),
                         Reverb(room_size=.12, damping=.6, wet_level=.06, dry_level=.95), Gain(2.0)])
        vv = vb(v.reshape(1, -1), SR)[0].astype(np.float32)
    except Exception:
        vv = reverb(v, .07, .9)
    mix = vv + bed + fl + sfx * .55
    try:
        mb = Pedalboard([LowShelfFilter(120, 1.0, 0.8), Compressor(threshold_db=-16, ratio=2.0, attack_ms=20, release_ms=200), Limiter(threshold_db=-1.5)])
        mix = mb(mix.reshape(1, -1).astype(np.float32), SR)[0]
    except Exception:
        pass
    mix = mix / np.max(np.abs(mix)) * .89
    fade = np.ones(n, np.float32)
    fo = int(.35 * SR); fade[-fo:] = np.linspace(1, 0, fo)
    fi = int(.05 * SR); fade[:fi] = np.linspace(0, 1, fi)
    mix = (mix * fade).astype(np.float32)
    sf.write(out_path, np.stack([mix, mix], 1), SR)
    return out_path


def make_mix3(voice24, cuts, dur, out_path, cfg):
    """cfg: flute=[(t,name,base)], thumps=[(t,gain)], bells=[t], sa"""
    import soundfile as sf
    sa = cfg.get('sa', SA)
    v = resample_poly(voice24, 147, 80).astype(np.float32)
    n = int(dur * SR)
    v = np.pad(v, (0, max(n - len(v), 0)))[:n]
    bed = tanpura(dur, sa) * .9 + pad(dur, sa) * .5
    fl = np.zeros(n, np.float32)
    for st, nm, base in cfg.get('flute', []):
        if st < dur - 1:
            add(fl, phrase(nm, sa * base), st, 1.0)
    fl = reverb(fl, .45, 2.6, 9)
    sfx = np.zeros(n, np.float32)
    for tt, g in cfg.get('thumps', []):
        add(sfx, thump(1.2, 46), tt, g)
    for tt in cfg.get('bells', []):
        add(sfx, bell(880, 3.0), tt, .10)
    for tt, kind in cuts:
        if kind == 'cut':
            add(sfx, whoosh(.28, int(tt * 10)), tt - .12, .22)
        else:
            add(sfx, bell(1174.7, 2.2), tt - .1, .06)
    win = int(.06 * SR)
    env = np.sqrt(np.convolve(v ** 2, np.ones(win) / win, 'same'))
    env = np.convolve(env, np.hanning(int(.35 * SR)) / np.hanning(int(.35 * SR)).sum(), 'same')
    env = np.clip(env / (np.percentile(env, 90) + 1e-9), 0, 1)
    bed = reverb(bed, .32) * (0.27 - .14 * env)
    fl = fl * (0.30 - .17 * env)
    try:
        from pedalboard import Pedalboard, HighpassFilter, Compressor, PeakFilter, Reverb, Limiter, Gain, LowShelfFilter
        vb = Pedalboard([HighpassFilter(85), PeakFilter(220, -2.5, 1.0), PeakFilter(3200, 3.0, 0.9),
                         Compressor(threshold_db=-20, ratio=3.0, attack_ms=8, release_ms=120),
                         Reverb(room_size=.12, damping=.6, wet_level=.06, dry_level=.95), Gain(2.0)])
        vv = vb(v.reshape(1, -1), SR)[0].astype(np.float32)
    except Exception:
        vv = reverb(v, .07, .9)
    mix = vv + bed + fl + sfx * .55
    try:
        mb = Pedalboard([LowShelfFilter(120, 1.0, 0.8), Compressor(threshold_db=-16, ratio=2.0, attack_ms=20, release_ms=200), Limiter(threshold_db=-1.5)])
        mix = mb(mix.reshape(1, -1).astype(np.float32), SR)[0]
    except Exception:
        pass
    mix = mix / np.max(np.abs(mix)) * .89
    fade = np.ones(n, np.float32)
    fo = int(.35 * SR); fade[-fo:] = np.linspace(1, 0, fo)
    fi = int(.05 * SR); fade[:fi] = np.linspace(0, 1, fi)
    sf.write(out_path, np.stack([(mix * fade).astype(np.float32)] * 2, 1), SR)
    return out_path
