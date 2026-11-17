# -*- coding: utf-8 -*-
import sys, json, math, random, subprocess, time, os
import numpy as np, cv2, soundfile as sf
from PIL import Image, ImageDraw, ImageFont
import kit
from kit import *
import scenes_jatayu as SJ, scenes_kevat as SK, scenes_kunti as SU
from scripts import STORIES
import music

W, H, FPS = 720, 1280, 30
FONT_B = 'assets/Hind-Bold.ttf'
FONT_T = 'assets/TiroDevanagariHindi-Regular.ttf'
GOLD = (255, 214, 102)


# ------------------------------------------------------------------ plan: scene, line_start, line_end, frac0, frac1, camera
def cam(z0=1.0, z1=1.10, c0=(450, 800), c1=None):
    c1 = c1 or c0
    return dict(z0=z0, z1=z1, c0=c0, c1=c1)


def pyre2():
    img, meta = SJ.s_pyre()
    meta = dict(meta); meta['spirit'] = True
    return img, meta


PLANS = {
    'jatayu': [
        (SJ.s_pyre, 0, 0, 0, 1, cam(1.0, 1.14, (450, 860))),
        (SJ.s_jatayu_sun, 1, 1, 0, 1, cam(1.12, 1.0, (450, 780))),
        (SJ.s_chariot, 2, 2, 0, 1, cam(1.0, 1.14, (470, 800), (450, 760))),
        (SJ.s_clash, 3, 4, 0, 1, cam(1.0, 1.16, (450, 800), (400, 760))),
        (SJ.s_fallen, 5, 5, 0, 1, cam(1.0, 1.18, (450, 860), (440, 940))),
        (SJ.s_walk, 6, 6, 0, 1, cam(1.0, 1.1, (450, 840))),
        (SJ.s_lap, 7, 8, 0, 1, cam(1.0, 1.15, (450, 860), (450, 900))),
        (pyre2, 9, 9, 0, 1, cam(1.1, 1.0, (450, 860), (450, 800))),
        (SJ.s_night_end, 10, 11, 0, 1, cam(1.15, 1.0, (450, 900), (450, 800))),
    ],
    'kevat': [
        (SK.s_ganga_dawn, 0, 0, 0, 1, cam(1.0, 1.12, (450, 900))),
        (SK.s_bank, 1, 2, 0, 1, cam(1.0, 1.12, (400, 900), (500, 900))),
        (SK.s_kevat_close, 3, 4, 0, 1, cam(1.0, 1.1, (450, 800))),
        (SK.s_ram_smile, 5, 5, 0, 1, cam(1.0, 1.08, (450, 800))),
        (SK.s_feet, 6, 7, 0, 1, cam(1.0, 1.12, (450, 700), (450, 850))),
        (SK.s_ring, 8, 9, 0, 1, cam(1.0, 1.14, (450, 900), (400, 900))),
        (SK.s_cross, 10, 11, 0, 1, cam(1.12, 1.0, (450, 950), (450, 860))),
    ],
    'kunti': [
        (SU.s_kunti_open, 0, 1, 0, 1, cam(1.0, 1.1, (450, 820))),
        (SU.s_lakshagriha, 2, 2, 0, .34, cam(1.0, 1.1, (450, 880))),
        (SU.s_forest_walk, 2, 2, .34, .67, cam(1.1, 1.0, (500, 900), (400, 900))),
        (SU.s_battle, 2, 2, .67, 1, cam(1.0, 1.12, (450, 800))),
        (SU.s_chariot_krishna, 3, 3, 0, 1, cam(1.0, 1.12, (330, 900), (450, 900))),
        (SU.s_kunti_pray, 4, 5, 0, 1, cam(1.0, 1.14, (400, 900), (450, 900))),
        (SU.s_kunti_raise, 6, 6, 0, 1, cam(1.0, 1.12, (450, 780))),
        (SU.s_krishna_close, 7, 8, 0, 1, cam(1.0, 1.1, (450, 800))),
        (SU.s_kunti_close, 9, 9, 0, 1, cam(1.0, 1.1, (450, 800))),
        (SU.s_diya_end, 10, 11, 0, 1, cam(1.12, 1.0, (450, 1000), (450, 900))),
    ],
}
TAGS = {'jatayu': 'जटायु · अनकही कथा', 'kevat': 'केवट · अनकही कथा', 'kunti': 'कुंती · अनकही कथा'}


# ------------------------------------------------------------------ word timing
def wlen(w):
    n = 0.0
    for ch in w:
        o = ord(ch)
        if ch in '।,?!…-"\'':
            continue
        if 0x093E <= o <= 0x094F or o in (0x0901, 0x0902, 0x0903, 0x093C):
            n += 0.45
        else:
            n += 1.0
    return n + 0.6


def line_word_times(wav, sr, start, end, words):
    seg = wav[int(start * sr):int(end * sr)]
    hop = int(0.01 * sr)
    nfr = max(len(seg) // hop, 1)
    rms = np.sqrt((seg[:nfr * hop].reshape(nfr, hop) ** 2).mean(1))
    voiced = (rms > 0.05 * rms.max()).astype(np.float32)
    cum = np.cumsum(voiced)
    total = cum[-1] if cum[-1] > 0 else 1
    wts = np.array([wlen(w) for w in words])
    edges = np.concatenate([[0], np.cumsum(wts)]) / wts.sum()
    ts = []
    for f in edges:
        idx = int(np.searchsorted(cum, f * total, side='left'))
        ts.append(start + min(idx, nfr) * 0.01)
    ts[0] = start
    ts[-1] = end
    return [(words[i], ts[i], ts[i + 1]) for i in range(len(words))]


def make_chunks(lines_tl, wav, sr):
    chunks = []
    for L in lines_tl:
        words = L['text'].split()
        wt = line_word_times(wav, sr, L['start'], L['end'], words)
        cur = []
        for w, a, b in wt:
            cur.append((w, a, b))
            chars = sum(len(x[0]) for x in cur)
            endp = w.rstrip().endswith(('।', '?', '!', '…'))
            comma = w.endswith(',') and len(cur) >= 2
            if len(cur) >= 3 or chars >= 17 or endp or comma:
                chunks.append(cur); cur = []
        if cur:
            if chunks and len(cur) == 1 and len(chunks[-1]) < 3 and chunks[-1][-1][2] >= cur[0][1] - 0.01 and chunks[-1] and not chunks[-1][-1][0].endswith(('।', '?', '!', '…')):
                chunks[-1].extend(cur)
            else:
                chunks.append(cur)
    return chunks


_font_cache = {}


def font(path, size):
    k = (path, size)
    if k not in _font_cache:
        _font_cache[k] = ImageFont.truetype(path, size, layout_engine=ImageFont.Layout.RAQM)
    return _font_cache[k]


_cap_cache = {}


def caption_img(chunk_words, active):
    key = (tuple(chunk_words), active)
    if key in _cap_cache:
        return _cap_cache[key]
    size = 60
    while True:
        f = font(FONT_B, size)
        sp = f.getlength(' ')
        widths = [f.getlength(w) for w in chunk_words]
        tw = sum(widths) + sp * (len(chunk_words) - 1)
        if tw <= 640 or size <= 40:
            break
        size -= 2
    pad = 40
    cw, ch = int(tw + pad * 2), int(size * 2.0 + pad * 2)
    base = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    shadow = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    d = ImageDraw.Draw(base); ds = ImageDraw.Draw(shadow)
    x = pad
    y = pad
    for i, w in enumerate(chunk_words):
        col = GOLD if i == active else (255, 255, 255)
        ds.text((x, y + 4), w, font=f, fill=(10, 5, 25, 255), stroke_width=4, stroke_fill=(10, 5, 25, 255))
        d.text((x, y), w, font=f, fill=col + (255,), stroke_width=3, stroke_fill=(24, 10, 40, 255))
        x += widths[i] + sp
    sh = shadow.filter(__import__('PIL.ImageFilter', fromlist=['GaussianBlur']).GaussianBlur(7))
    sa = np.asarray(sh, np.float32)[..., 3] * 0.55
    sh_arr = np.zeros((ch, cw, 4), np.float32); sh_arr[..., 3] = sa
    out = np.asarray(base, np.float32)
    a = out[..., 3:4] / 255.0
    rgb = out[..., :3] * a
    sa_ = sh_arr[..., 3:4] / 255.0
    # composite base over shadow
    final_a = a + sa_ * (1 - a)
    final_rgb = (rgb + 0 * sa_ * (1 - a))
    res = (final_rgb.astype(np.float32), final_a.astype(np.float32))
    _cap_cache[key] = res
    return res


def overlay_rgba(frame, rgb, a, cx, cy, opacity=1.0):
    h, w = a.shape[:2]
    x0, y0 = int(cx - w / 2), int(cy - h / 2)
    xa, ya = max(x0, 0), max(y0, 0)
    xb, yb = min(x0 + w, W), min(y0 + h, H)
    if xb <= xa or yb <= ya:
        return
    sub = frame[ya:yb, xa:xb]
    aa = a[ya - y0:yb - y0, xa - x0:xb - x0] * opacity
    rr = rgb[ya - y0:yb - y0, xa - x0:xb - x0]
    # premultiplied rgb already scaled by base alpha: composite
    sub[:] = sub * (1 - aa) + rr * opacity


# ------------------------------------------------------------------ effects (screen space)
class Cam:
    def __init__(self, z, cx, cy):
        self.z, self.cx, self.cy = z, cx, cy
        self.M = np.float32([[z, 0, W / 2 - cx * z], [0, z, H / 2 - cy * z]])

    def pt(self, x, y):
        return ((x - self.cx) * self.z + W / 2, (y - self.cy) * self.z + H / 2)


def add_blur(frame, layer_, sigma, k=1.0):
    if sigma >= 5:
        sm = cv2.resize(layer_, (W // 2, H // 2), interpolation=cv2.INTER_AREA)
        sm = cv2.GaussianBlur(sm, (0, 0), sigma / 2)
        layer_ = cv2.resize(sm, (W, H), interpolation=cv2.INTER_LINEAR)
    elif sigma > 0:
        layer_ = cv2.GaussianBlur(layer_, (0, 0), sigma)
    frame += layer_ * k


def fx_flames(f, cm, t, flames):
    lay = np.zeros((H, W, 3), np.float32)
    for fi, (x, y, w, h) in enumerate(flames):
        sx, sy = cm.pt(x, y)
        sw, sh_ = w * cm.z, h * cm.z
        for k in range(7):
            ph = k * 1.7 + fi * 2.3
            fl = math.sin(t * (6 + k) + ph) * .5 + math.sin(t * 11 + ph * 1.3) * .25
            cx_ = sx + (k - 3) * sw / 7 + fl * sw * .06
            hh = sh_ * (0.55 + .35 * (1 - abs(k - 3) / 3.5)) * (1 + fl * .2)
            ww = sw / 5.0
            base = sy + sh_ * .25
            for col, sc in (((20, 70, 255), 1.0), ((40, 150, 255), .72), ((150, 235, 255), .42)):  # BGR
                pts = np.array([(cx_ - ww * sc, base), (cx_ - ww * sc * .6, base - hh * sc * .55), (cx_ + fl * ww * .6, base - hh * sc),
                                (cx_ + ww * sc * .6, base - hh * sc * .55), (cx_ + ww * sc, base)], np.int32)
                cv2.fillPoly(lay, [pts], col)
        glow_pts = (int(sx), int(sy - sh_ * .2))
    lay = np.ascontiguousarray(lay[..., ::-1])  # to RGB
    lay = lay.astype(np.float32)
    add_blur(f, lay, 6, 0.5)
    add_blur(f, lay, 22, 0.32)


def fx_embers(f, cm, t, p, seed=1, dust=False):
    rnd = np.random.default_rng(seed)
    n = p.get('n', 40)
    col = np.array(p.get('col', (255, 180, 80)), np.float32)
    up = p.get('up', True)
    lay = np.zeros((H, W, 3), np.float32)
    sx0, sy0 = cm.pt(p['x'], p['y'])
    wid = p.get('w', 300) * cm.z
    r1, r2, r3, r4, r5 = (rnd.random(n) for _ in range(5))
    for i in range(n):
        if up:
            sp = 0.06 + .1 * r1[i]
            ph = (t * sp + r2[i]) % 1.0
            x = sx0 + (r3[i] - .5) * wid + math.sin(t * (.6 + r4[i]) + r5[i] * 6) * 26
            y = sy0 - ph * (520 + 300 * r4[i]) * cm.z
            a = math.sin(ph * math.pi) ** 1.2
        else:
            ph = (t * 0.03 + r2[i]) % 1.0
            x = (r3[i] * W + math.sin(t * .5 + r5[i] * 6) * 30 + t * 6 * (r4[i] - .3)) % W
            y = (r1[i] * H * .9 + math.cos(t * .4 + r2[i] * 6) * 24 + 60) % H
            a = .5 + .5 * math.sin(t * (1 + r4[i]) + r5[i] * 6)
        rad = 1.2 + r5[i] * 2.2
        cv2.circle(lay, (int(x), int(y)), int(round(rad)), tuple(float(c) * a for c in col), -1)
    add_blur(f, lay, 1.6, 1.0)
    add_blur(f, lay, 6, 0.8)


def fx_dust(f, cm, t):
    fx_embers(f, cm, t, dict(n=44, col=(255, 230, 190), up=False, x=450, y=800), seed=7)


def fx_stars(f, cm, t):
    rnd = np.random.default_rng(5)
    lay = np.zeros((H, W, 3), np.float32)
    for i in range(46):
        x, y = rnd.random() * W, rnd.random() * H * .5
        a = max(0, math.sin(t * (1.5 + rnd.random() * 2) + rnd.random() * 6)) ** 2
        cv2.circle(lay, (int(x), int(y)), 1, (255 * a, 245 * a, 225 * a), -1)
        if rnd.random() < .2:
            cv2.line(lay, (int(x) - 4, int(y)), (int(x) + 4, int(y)), (120 * a, 115 * a, 105 * a), 1)
            cv2.line(lay, (int(x), int(y) - 4), (int(x), int(y) + 4), (120 * a, 115 * a, 105 * a), 1)
    add_blur(f, lay, 1.0, 1.0)


def fx_smoke(f, cm, t, pos):
    sx, sy = cm.pt(*pos)
    lay = np.zeros((H, W, 3), np.float32)
    for k in range(10):
        ph = (t * .12 + k / 10.0) % 1.0
        x = sx + math.sin(t * .5 + k) * 40 * ph + (k - 5) * 8
        y = sy - ph * 560 * cm.z
        r = (40 + ph * 120) * cm.z
        a = math.sin(ph * math.pi) * .20
        cv2.circle(lay, (int(x), int(y)), int(r), (110 * a, 85 * a, 100 * a), -1)
    lay = cv2.GaussianBlur(lay, (0, 0), 30)
    f += lay


def fx_shimmer(f, cm, t, rng_):
    y0, y1 = rng_
    sy0, _ = cm.pt(0, y0)[1], 0
    sy0 = cm.pt(0, y0)[1]
    rnd = np.random.default_rng(3)
    lay = np.zeros((H, W, 3), np.float32)
    for i in range(70):
        y = sy0 + 10 + (rnd.random() ** 1.3) * (H - sy0)
        x = rnd.random() * W
        wl = 8 + rnd.random() * 40 * (y - sy0) / 200
        a = max(0, math.sin(t * (1.2 + rnd.random() * 2) + rnd.random() * 6)) ** 2 * .9
        cv2.line(lay, (int(x), int(y)), (int(x + wl), int(y)), (255 * a, 225 * a, 170 * a), 1)
    add_blur(f, lay, 1.2, 1.0)


def fx_petals(f, cm, t, p):
    n = p.get('n', 14)
    col = np.array(p.get('col', (255, 190, 210)), np.float32)
    surface = p.get('surface')
    rnd = np.random.default_rng(11)
    lay = f.copy()
    for i in range(n):
        r1, r2, r3, r4 = rnd.random(4)
        if surface:
            sx, sy = cm.pt(*surface)
            x = sx + (r1 - .5) * 520 * cm.z + math.sin(t * .4 + r2 * 6) * 14
            y = sy + (r2 - .5) * 50 * cm.z + math.cos(t * .5 + r3 * 6) * 6
            ang = (t * 12 + r3 * 360) % 360
            ca = 1.0
        else:
            ph = (t * (.05 + .05 * r2) + r3) % 1.0
            x = (r1 * W + math.sin(t * .8 + r4 * 6) * 45) % W
            y = ph * (H + 60) - 30
            ang = (t * 40 * (r4 - .5) * 2 + r3 * 360) % 360
            ca = math.sin(min(ph * 1.2, 1) * math.pi) ** .5
        sz = 9 + r4 * 9
        c = tuple(int(v) for v in col)
        cv2.ellipse(f, (int(x), int(y)), (int(sz), int(sz * .5)), ang, 0, 360, c, -1, cv2.LINE_AA)
        if ca < 1:
            pass


def fx_ripple(f, cm, t, p):
    lay = np.zeros((H, W, 3), np.float32)
    for (x, y) in p['rx']:
        sx, sy = cm.pt(x, y)
        for k in range(4):
            ph = (t * .45 + k / 4.0) % 1.0
            rx = (20 + ph * 130) * cm.z
            a = (1 - ph) ** 1.5
            cv2.ellipse(lay, (int(sx), int(sy)), (int(rx), int(rx * .27)), 0, 0, 360, (170 * a, 225 * a, 240 * a), 2, cv2.LINE_AA)
    add_blur(f, lay, 1.0, 1.0)


def fx_rays(f, cm, t, p, warm=True):
    sx, sy = cm.pt(p['x'], p['y'])
    lay = np.zeros((H, W, 3), np.float32)
    col = (255, 225, 170) if warm else (200, 220, 255)
    for k in range(9):
        a0 = math.pi * (.15 + k * .08) + math.sin(t * .3 + k) * .03
        w = .025 + .015 * math.sin(t * .5 + k * 2)
        L = 1800
        pts = np.array([(sx, sy), (sx + math.cos(a0 - w) * L, sy + math.sin(a0 - w) * L), (sx + math.cos(a0 + w) * L, sy + math.sin(a0 + w) * L)], np.int32)
        cv2.fillPoly(lay, [pts], tuple(c * (.5 + .5 * math.sin(t * .7 + k * 1.7)) for c in col))
    lay = cv2.GaussianBlur(lay, (0, 0), 14)
    f += lay * 0.075


def fx_birds(f, cm, t, birds):
    lay = np.zeros((H, W, 3), np.float32)
    for i, (x, y, _) in enumerate(birds):
        sx, sy = cm.pt(x + (t * 14 + i * 40) % 900 - 100 + 0, y + math.sin(t * .7 + i) * 8)
        fl = math.sin(t * 7 + i * 2) * 6
        pts = np.array([(sx - 12, sy - fl), (sx, sy + 2), (sx + 12, sy - fl)], np.int32)
        cv2.polylines(lay, [pts], False, (40, 20, 40), 2, cv2.LINE_AA)
    f[:] = f * (1 - np.clip(lay.max(2, keepdims=True) / 40.0, 0, 1) * .8) + lay * .8


def fx_pulse(f, cm, t, p):
    sx, sy = cm.pt(p[0], p[1])
    r = p[2] * cm.z
    k = .06 + .03 * math.sin(t * 1.6)
    yy0, yy1 = int(max(sy - 2.5 * r, 0)), int(min(sy + 2.5 * r, H))
    xx0, xx1 = int(max(sx - 2.5 * r, 0)), int(min(sx + 2.5 * r, W))
    if yy1 <= yy0 or xx1 <= xx0:
        return
    yy, xx = np.mgrid[yy0:yy1, xx0:xx1].astype(np.float32)
    d2 = ((xx - sx) ** 2 + (yy - sy) ** 2) / (r * r)
    f[yy0:yy1, xx0:xx1] += (np.exp(-d2) * k * 255)[..., None] * np.array((1.0, .88, .62), np.float32)


def fx_tear(f, cm, t, pos):
    sx, sy = cm.pt(*pos)
    ph = (t * .45) % 1.0
    y = sy + ph * 150 * cm.z
    a = math.sin(ph * math.pi)
    lay = np.zeros((H, W, 3), np.float32)
    cv2.circle(lay, (int(sx), int(y)), 4, (200 * a, 235 * a, 255 * a), -1)
    add_blur(f, lay, 3, 1.2)


def fx_eye(f, cm, t, pos):
    sx, sy = cm.pt(*pos)
    a = .55 + .45 * (math.sin(t * 1.2) * .5 + .5)
    lay = np.zeros((H, W, 3), np.float32)
    cv2.circle(lay, (int(sx), int(sy)), 5, (255 * a, 215 * a, 140 * a), -1)
    add_blur(f, lay, 6, 1.4)


def fx_feathers(f, cm, t, p):
    n = p.get('n', 9)
    rnd = np.random.default_rng(21)
    x0, y0 = cm.pt(p['x'], p['y'])
    for i in range(n):
        r1, r2, r3 = rnd.random(3)
        ph = (t * (.07 + .04 * r1) + r2) % 1.0
        x = x0 + (r3 - .5) * 420 * cm.z + math.sin(t * 1.1 + r1 * 6) * 40
        y = y0 + ph * 800 * cm.z - 60
        ang = (t * 50 * (r1 - .5) + r2 * 360) % 360
        cv2.ellipse(f, (int(x), int(y)), (int(18 + r1 * 14), 4), ang, 0, 360, (26, 14, 30), -1, cv2.LINE_AA)


def fx_flash(f, cm, t, tl, dur, p):
    at = p['at'] * dur
    d = tl - at
    if -0.02 < d < 0.55:
        a = max(0.0, 1 - d / 0.5) if d > 0 else 1.0
        sx, sy = cm.pt(p['x'], p['y'])
        lay = np.zeros((H, W, 3), np.float32)
        L = 700 * min(1, max(d, 0) / 0.08 + .05)
        cv2.line(lay, (int(sx - L * .45), int(sy - L * .6)), (int(sx + L * .45), int(sy + L * .6)), (255, 250, 240), 5, cv2.LINE_AA)
        add_blur(f, lay, 3, 1.6 * a)
        add_blur(f, lay, 18, 1.2 * a)
        f += 70 * a * (1 - abs(d) * 1.5 if d < .3 else 0)


_spirit = None


def spirit_sprite():
    global _spirit
    if _spirit is None:
        tmp = np.zeros((WH, WW, 3), np.float32)
        glow(tmp, 450, 400, 70, (255, 190, 90), .55, 2.0)
        bird_flying(tmp, 450, 400, 420, C('ffd890'), rim=(255, 240, 200), halo=None)
        crop = tmp[120:700, 120:780].copy()
        hh, ww = crop.shape[:2]
        yy, xx = np.mgrid[0:hh, 0:ww].astype(np.float32)
        r = np.sqrt(((xx - ww / 2) / (ww / 2)) ** 2 + ((yy - hh * 0.58) / (hh / 2)) ** 2)
        mask = np.clip(1 - (r - .62) / .38, 0, 1) ** 1.5
        _spirit = crop * mask[..., None]
    return _spirit


def fx_spirit(f, cm, t, tl, dur):
    p = np.clip((tl - dur * .25) / (dur * .75), 0, 1)
    if p <= 0:
        return
    sp = spirit_sprite()
    sc = 0.55 - 0.18 * p
    flap = 1 + math.sin(t * 5) * .08
    M = np.float32([[sc, 0, 0], [0, sc * flap, 0]])
    w_, h_ = int(sp.shape[1] * sc), int(sp.shape[0] * sc * flap)
    img = cv2.resize(sp, (max(w_, 1), max(h_, 1)))
    sx, sy = cm.pt(450 + math.sin(t * .8) * 26, 1000 - p * 760)
    x0, y0 = int(sx - w_ / 2), int(sy - h_ / 2)
    xa, ya, xb, yb = max(x0, 0), max(y0, 0), min(x0 + w_, W), min(y0 + h_, H)
    if xb > xa and yb > ya:
        f[ya:yb, xa:xb] += img[ya - y0:yb - y0, xa - x0:xb - x0] * (min(1, p * 4) * (1 - max(0, p - .85) / .15 * .5))


def apply_fx(f, cm, t, tl, dur, meta):
    if meta.get('sunrays'):
        fx_rays(f, cm, t, meta['sunrays'], True)
    if meta.get('rays'):
        fx_rays(f, cm, t, meta['rays'], True)
    if meta.get('pulse'):
        fx_pulse(f, cm, t, meta['pulse'])
    if meta.get('stars'):
        fx_stars(f, cm, t)
    if meta.get('shimmer'):
        fx_shimmer(f, cm, t, meta['shimmer'])
    if meta.get('ripple'):
        fx_ripple(f, cm, t, meta['ripple'])
    if meta.get('smoke'):
        fx_smoke(f, cm, t, meta['smoke'])
    if meta.get('flames'):
        fx_flames(f, cm, t, meta['flames'])
    if meta.get('embers'):
        fx_embers(f, cm, t, meta['embers'])
    if meta.get('dust'):
        fx_dust(f, cm, t)
    if meta.get('birds'):
        fx_birds(f, cm, t, meta['birds'])
    if meta.get('petals'):
        fx_petals(f, cm, t, meta['petals'])
    if meta.get('feathers'):
        fx_feathers(f, cm, t, meta['feathers'])
    if meta.get('eye'):
        fx_eye(f, cm, t, meta['eye'])
    if meta.get('tear'):
        fx_tear(f, cm, t, meta['tear'])
    if meta.get('flash'):
        fx_flash(f, cm, t, tl, dur, meta['flash'])
    if meta.get('spirit'):
        fx_spirit(f, cm, t, tl, dur)


# ------------------------------------------------------------------ main
def smooth(p):
    return p * p * (3 - 2 * p)


def main(name, max_seconds=None):
    t_start = time.time()
    S_ = STORIES[name]
    tl = json.load(open(f'tts/{name}.json'))
    wav, sr = sf.read(f'tts/{name}.wav')
    dur_total = tl['duration']
    if max_seconds:
        dur_total = min(dur_total, max_seconds)
    lines = tl['lines']
    # scene time ranges
    scenes = []
    for (fn, a, b, f0, f1, cm_) in PLANS[name]:
        la, lb = lines[a], lines[b]
        ta = la['start'] if a != 0 else 0.0
        tb = lb['end'] + (0.25 if b < len(lines) - 1 else 0) if b < len(lines) - 1 else dur_total
        # boundaries: from the previous line's end to this line's end give a bit of lead
        span_a = la['start'] - (0.15 if a > 0 else la['start'])
        span_b = (lines[b + 1]['start'] - 0.15) if b < len(lines) - 1 else dur_total
        t0, t1 = span_a, span_b
        d = t1 - t0
        scenes.append(dict(fn=fn, a=t0 + d * f0 if False else t0, b=t1, f0=f0, f1=f1, cam=cm_))
    # fractional scenes (split of one line) : recompute a,b by fractions of the line span
    i = 0
    out_scenes = []
    for (fn, a, b, f0, f1, cm_) in PLANS[name]:
        la, lb = lines[a], lines[b]
        s0 = (la['start'] - 0.15) if a > 0 else 0.0
        s1 = (lines[b + 1]['start'] - 0.15) if b < len(lines) - 1 else dur_total
        out_scenes.append(dict(fn=fn, a=s0 + (s1 - s0) * f0, b=s0 + (s1 - s0) * f1, cam=cm_))
    scenes = out_scenes
    # make contiguous (split lines share borders)
    for i in range(1, len(scenes)):
        scenes[i]['a'] = scenes[i - 1]['b'] if abs(scenes[i]['a'] - scenes[i - 1]['b']) < 1.0 else scenes[i]['a']
    scenes[0]['a'] = 0.0
    scenes[-1]['b'] = dur_total
    print('scene times:', [(round(s['a'], 2), round(s['b'], 2)) for s in scenes], flush=True)
    # build scenes
    built = []
    for s in scenes:
        t0 = time.time()
        img, meta = s['fn']()
        built.append((np.clip(img, 0, 255).astype(np.uint8), meta))
        print('built', s['fn'].__name__, round(time.time() - t0, 1), 's', flush=True)
    chunks = make_chunks(lines, wav, sr)
    # music mix
    bells = [s['a'] for s in scenes[1:]]
    mix_path = f'out/{name}_audio.wav'
    os.makedirs('out', exist_ok=True)
    music.make_mix(wav.astype(np.float32), bells, dur_total, mix_path)
    print('audio mixed', flush=True)
    vign = vignette_mask(W, H, 0.55)
    rng = np.random.default_rng(0)
    noise = [rng.normal(0, 1.7, (H, W, 1)).astype(np.float32) for _ in range(6)]
    N = int(dur_total * FPS)
    out_path = f'out/{name}.mp4' if not max_seconds else f'out/{name}_test.mp4'
    cmd = ['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-i', mix_path,
           '-t', str(dur_total), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '19', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k',
           '-movflags', '+faststart', out_path]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    tag_img = None
    # series tag
    tag_lay = Image.new('RGBA', (W, 140), (0, 0, 0, 0)); td = ImageDraw.Draw(tag_lay)
    td.text((36, 18), 'सनातन धर्म', font=font(FONT_B, 24), fill=(255, 214, 102, 230), stroke_width=2, stroke_fill=(20, 8, 30, 200))
    td.text((36, 52), TAGS[name], font=font(FONT_T, 26), fill=(255, 255, 255, 215), stroke_width=2, stroke_fill=(20, 8, 30, 200))
    tag = np.asarray(tag_lay, np.float32)
    tag_a = tag[..., 3:4] / 255.0
    tag_rgb = tag[..., :3]
    TRANS = 0.22

    def scene_frame(k, t):
        s = scenes[k]
        base, meta = built[k]
        dur = s['b'] - s['a']
        tl_ = t - s['a']
        p = smooth(float(np.clip(tl_ / max(dur, 1e-3), 0, 1)))
        c = s['cam']
        z = c['z0'] + (c['z1'] - c['z0']) * p
        cx = c['c0'][0] + (c['c1'][0] - c['c0'][0]) * p + math.sin(t * .35) * 3
        cy = c['c0'][1] + (c['c1'][1] - c['c0'][1]) * p + math.cos(t * .3) * 3
        cx = float(np.clip(cx, W / 2 / z, WW - W / 2 / z)); cy = float(np.clip(cy, H / 2 / z, WH - H / 2 / z))
        cm = Cam(z, cx, cy)
        f = cv2.warpAffine(base, cm.M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE).astype(np.float32)
        apply_fx(f, cm, t, tl_, dur, meta)
        return f

    for fi in range(N):
        t = fi / FPS
        k = 0
        while k + 1 < len(scenes) and t >= scenes[k + 1]['a']:
            k += 1
        f = None
        # transition near the upcoming boundary
        nb = scenes[k]['b']
        if k + 1 < len(scenes) and t > nb - TRANS:
            w = (t - (nb - TRANS)) / (2 * TRANS)
            f = scene_frame(k, t) * (1 - w) + scene_frame(k + 1, t) * w
        elif k > 0 and t < scenes[k]['a'] + TRANS:
            w = (t - (scenes[k]['a'] - TRANS)) / (2 * TRANS)
            f = scene_frame(k - 1, t) * (1 - w) + scene_frame(k, t) * w
        else:
            f = scene_frame(k, t)
        # bloom
        small = cv2.resize(f, (W // 4, H // 4), interpolation=cv2.INTER_AREA)
        bright = np.clip(small - 150, 0, None)
        bright = cv2.GaussianBlur(bright, (0, 0), 6)
        f += cv2.resize(bright, (W, H), interpolation=cv2.INTER_LINEAR) * 0.55
        # grade + vignette + grain
        f = f * vign
        f = 255 * np.power(np.clip(f / 255.0, 0, 1), 0.96)
        f += noise[fi % 6]
        # series tag
        ta = min(1.0, max(0.0, (t - 0.5) / 0.6)) * (1 - min(1.0, max(0.0, (t - (dur_total - 1.4)) / 0.6)))
        f[40:180, 0:W] = f[40:180, 0:W] * (1 - tag_a * ta) + tag_rgb * (tag_a * ta)
        # captions
        for ch in chunks:
            c0, c1 = ch[0][1] - 0.04, ch[-1][2] + 0.12
            if c0 <= t <= c1:
                act = 0
                for wi, (w_, a_, b_) in enumerate(ch):
                    if t >= a_:
                        act = wi
                rgb, a = caption_img([x[0] for x in ch], act)
                op = min(1.0, (t - c0) / 0.07)
                oy = 945 + (1 - op) * 10
                overlay_rgba(f, rgb, a, W / 2, oy, op)
                break
        # fade in/out
        fade = min(1.0, t / 0.5) * min(1.0, (dur_total - t) / 0.9)
        f *= fade
        proc.stdin.write(np.clip(f, 0, 255).astype(np.uint8)[..., ::-1].tobytes())
        if fi % 150 == 0:
            print(f'frame {fi}/{N}  {time.time() - t_start:.0f}s', flush=True)
    proc.stdin.close(); proc.wait()
    print('DONE', out_path, round(time.time() - t_start), 's', flush=True)


if __name__ == '__main__':
    main(sys.argv[1], float(sys.argv[2]) if len(sys.argv) > 2 else None)
