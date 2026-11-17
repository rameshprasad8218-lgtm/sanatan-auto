# -*- coding: utf-8 -*-
"""Synthesised devotional bed: tanpura drone + soft pad + temple bells, mixed under the voice with ducking."""
import numpy as np
from scipy.signal import resample_poly, fftconvolve, butter, sosfilt

SR = 44100


def tanpura(dur, sa=146.83, seed=1):
    rnd = np.random.default_rng(seed)
    n = int(dur * SR)
    out = np.zeros(n, np.float32)
    strings = [sa * 0.75, sa, sa, sa * 0.5]
    gap = 1.15
    t_cycle = gap * 4 + 0.8
    t0 = 0.0
    k = np.arange(1, 29)
    while t0 < dur:
        for i, f in enumerate(strings):
            ts = t0 + i * gap + rnd.uniform(-.02, .02)
            if ts >= dur:
                break
            L = int(min(6.0, dur - ts + .01) * SR)
            if L <= 0:
                continue
            t = np.arange(L) / SR
            amp = (1.0 / k) * (1 + 2.2 * np.exp(-((k - 7) / 3.0) ** 2))
            tau = 3.4 / (1 + 0.18 * k)
            fk = f * k * (1 + 0.0002 * k * k * rnd.uniform(.8, 1.2))
            sig = (amp[:, None] * np.exp(-t[None, :] / tau[:, None]) * np.sin(2 * np.pi * fk[:, None] * t[None, :] + rnd.uniform(0, 6.28, (len(k), 1)))).sum(0)
            att = np.minimum(t / 0.006, 1.0)
            sig = (sig * att).astype(np.float32)
            a = int(ts * SR)
            out[a:a + L] += sig[:max(min(L, n - a), 0)] * 0.5
        t0 += t_cycle
    return out / (np.max(np.abs(out)) + 1e-9)


def pad(dur, sa=146.83):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for f, a, rate in ((sa, 1.0, .07), (sa * 1.5, .7, .05), (sa * 2, .8, .09), (sa * 3, .35, .06), (sa * 2.52, .22, .04)):
        lfo = 0.65 + 0.35 * np.sin(2 * np.pi * rate * t + f)
        out += a * lfo * (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t))
    sos = butter(2, 1400, 'low', fs=SR, output='sos')
    out = sosfilt(sos, out)
    fade = np.minimum(1, np.minimum(t / 3.0, (dur - t) / 3.0))
    return (out * fade / (np.max(np.abs(out)) + 1e-9)).astype(np.float32)


def bell(f0=587.3, dur=5.0):
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros_like(t)
    for r, a, tau in ((1, 1.0, 2.6), (2.0, .55, 1.8), (2.76, .5, 1.5), (4.07, .25, 1.0), (5.4, .2, .7), (8.93, .08, .4)):
        out += a * np.exp(-t / tau) * np.sin(2 * np.pi * f0 * r * t)
    out *= np.minimum(t / 0.002, 1)
    return (out / np.max(np.abs(out))).astype(np.float32)


def reverb(x, wet=0.28, rt=2.2, seed=3):
    rnd = np.random.default_rng(seed)
    n = int(rt * SR)
    t = np.arange(n) / SR
    ir = rnd.standard_normal(n) * np.exp(-t / (rt / 4.2))
    ir[:int(0.012 * SR)] *= np.linspace(0, 1, int(0.012 * SR))
    ir /= np.sqrt(np.sum(ir ** 2))
    y = fftconvolve(x, ir)[:len(x)].astype(np.float32)
    return (1 - wet) * x + wet * y


def make_mix(voice24, bell_times, dur, out_path, sa=146.83):
    import soundfile as sf
    v = resample_poly(voice24, 147, 80).astype(np.float32)
    n = int(dur * SR)
    v = np.pad(v, (0, max(n - len(v), 0)))[:n]
    m = tanpura(dur, sa) * 0.9 + pad(dur, sa) * 0.55
    for bt in bell_times:
        b = bell() * 0.22
        a = int(bt * SR)
        if a < n:
            m[a:a + len(b)] += b[:n - a]
    m = reverb(m, .32)
    # sidechain: duck music when voice present
    win = int(0.06 * SR)
    env = np.sqrt(np.convolve(v ** 2, np.ones(win) / win, 'same'))
    env = np.convolve(env, np.hanning(int(0.35 * SR)) / np.hanning(int(0.35 * SR)).sum(), 'same')
    env = np.clip(env / (np.percentile(env, 90) + 1e-9), 0, 1)
    gain = 0.30 - 0.15 * env
    vv = reverb(v, .07, 0.9)
    mix = vv * 1.0 + m * gain
    mix = mix / np.max(np.abs(mix)) * 0.89
    fade = np.ones(n, np.float32)
    f_in, f_out = int(0.4 * SR), int(1.0 * SR)
    fade[:f_in] = np.linspace(0, 1, f_in); fade[-f_out:] = np.linspace(1, 0, f_out)
    mix = (mix * fade).astype(np.float32)
    sf.write(out_path, np.stack([mix, mix], 1), SR)
    return out_path
