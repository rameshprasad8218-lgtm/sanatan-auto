# -*- coding: utf-8 -*-
"""Procedural 2D 'paper-cut + glow' art kit. World canvas 900x1600 (screen = 720x1280 window)."""
import math, random
import numpy as np, cv2
from PIL import Image, ImageDraw

WW, WH = 900, 1600
S = 2  # supersample for vector layers


def C(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


# ---------------------------------------------------------------- base image helpers
def vgrad(stops, w=WW, h=WH):
    ys = np.linspace(0, 1, h)[:, None]
    pos = [p for p, _ in stops]
    out = np.zeros((h, 1, 3), np.float32)
    for ch in range(3):
        out[:, 0, ch] = np.interp(ys[:, 0], pos, [c[ch] for _, c in stops])
    return np.repeat(out, w, axis=1)


def glow(img, cx, cy, r, col, k=1.0, falloff=2.0):
    """additive radial glow, in-place on float32 image"""
    h, w = img.shape[:2]
    x0, x1 = int(max(cx - 3 * r, 0)), int(min(cx + 3 * r, w))
    y0, y1 = int(max(cy - 3 * r, 0)), int(min(cy + 3 * r, h))
    if x1 <= x0 or y1 <= y0:
        return
    yy, xx = np.mgrid[y0:y1, x0:x1].astype(np.float32)
    d2 = ((xx - cx) ** 2 + (yy - cy) ** 2) / (r * r)
    a = np.exp(-d2 * falloff / 2.0)[..., None] * k
    img[y0:y1, x0:x1] += a * np.array(col, np.float32)


def layer():
    return Image.new('RGBA', (WW * S, WH * S), (0, 0, 0, 0))


def blit(img, lay, alpha=1.0):
    """alpha-composite supersampled PIL RGBA layer onto float image"""
    a = np.asarray(lay.resize((WW, WH), Image.LANCZOS), np.float32)
    al = a[..., 3:4] / 255.0 * alpha
    img[:] = img * (1 - al) + a[..., :3] * al


def P(pts):
    return [(x * S, y * S) for x, y in pts]


def ridge(y0, amp, seed, freqs=(0.006, 0.013, 0.03), x0=-20, x1=WW + 20, bottom=WH + 20, step=6):
    rnd = random.Random(seed)
    ph = [rnd.random() * 6.28 for _ in freqs]
    pts = []
    for x in range(x0, x1 + 1, step):
        y = y0
        for i, f in enumerate(freqs):
            y += amp / (i + 1) * math.sin(x * f + ph[i])
        pts.append((x, y))
    pts += [(x1, bottom), (x0, bottom)]
    return pts


def poly(d, pts, col, a=255):
    d.polygon(P(pts), fill=tuple(col) + (a,))


def ell(d, cx, cy, rx, ry, col, a=255):
    d.ellipse([(cx - rx) * S, (cy - ry) * S, (cx + rx) * S, (cy + ry) * S], fill=tuple(col) + (a,))


def line(d, pts, col, w, a=255):
    d.line(P(pts), fill=tuple(col) + (a,), width=max(int(w * S), 1), joint='curve')


# ---------------------------------------------------------------- scenery
def stars(img, n, seed, ymax=0.55, big=0.04):
    rnd = random.Random(seed)
    out = []
    for _ in range(n):
        x = rnd.random() * WW
        y = rnd.random() * WH * ymax
        r = 0.7 + (rnd.random() < big) * 1.4 + rnd.random() * 0.5
        b = 0.5 + rnd.random() * 0.5
        out.append((x, y, r, b, rnd.random() * 6.28))
    for x, y, r, b, _ in out:
        glow(img, x, y, r * 1.6, (255, 240, 220), b * 0.9, 3.0)
    return out


def moon(img, cx, cy, r, col=(255, 244, 220), halo=(120, 140, 200)):
    glow(img, cx, cy, r * 4.5, halo, 0.35, 2.2)
    glow(img, cx, cy, r * 2.2, col, 0.35, 2.4)
    lay = layer(); d = ImageDraw.Draw(lay)
    ell(d, cx, cy, r, r, col)
    blit(img, lay)


def sun(img, cx, cy, r, col=(255, 200, 110)):
    glow(img, cx, cy, r * 7, col, 0.4, 2.0)
    glow(img, cx, cy, r * 3, (255, 230, 170), 0.45, 2.0)
    lay = layer(); d = ImageDraw.Draw(lay)
    ell(d, cx, cy, r, r, (255, 238, 200))
    blit(img, lay)


def clouds(img, seed, ymin, ymax, col, a=0.35, n=7, scale=1.0):
    rnd = random.Random(seed)
    m = np.zeros((WH, WW), np.float32)
    for _ in range(n):
        cx, cy = rnd.random() * WW, rnd.uniform(ymin, ymax)
        for _k in range(9):
            ox = rnd.gauss(0, 70 * scale); oy = rnd.gauss(0, 10 * scale)
            cv2.ellipse(m, (int(cx + ox), int(cy + oy)), (int(rnd.uniform(60, 150) * scale), int(rnd.uniform(9, 22) * scale)), 0, 0, 360, 1.0, -1)
    m = cv2.GaussianBlur(m, (0, 0), 14 * scale)
    m = np.clip(m, 0, 1)[..., None] * a
    img[:] = img * (1 - m) + np.array(col, np.float32) * m


def mist(img, y, h, col, a=0.35):
    ys = np.arange(WH, dtype=np.float32)[:, None]
    m = np.exp(-((ys - y) / h) ** 2)[..., None] * a
    img[:] = img * (1 - m) + np.array(col, np.float32) * m


def tree(d, x, base, h, col, lean=0.0, seed=0):
    rnd = random.Random(seed + int(x))
    tw = max(h * 0.035, 3)
    poly(d, [(x - tw, base), (x - tw * .6 + lean, base - h * .66), (x + tw * .6 + lean, base - h * .66), (x + tw, base)], col)
    for _ in range(9):
        ox = rnd.gauss(0, h * .16) + lean; oy = -h * .66 + rnd.gauss(0, h * .07)
        r = h * rnd.uniform(.11, .2)
        ell(d, x + ox, base + oy, r, r * .85, col)


def palm(d, x, base, h, col, lean=20):
    poly(d, [(x - 4, base), (x + lean - 3, base - h), (x + lean + 3, base - h), (x + 4, base)], col)
    tx, ty = x + lean, base - h
    for ang in range(-80, 81, 26):
        a = math.radians(ang - 90)
        ex, ey = tx + math.cos(a) * h * .45, ty + math.sin(a) * h * .3 + (abs(ang) / 80) * h * .18
        mx, my = (tx + ex) / 2, ty - h * .12
        poly(d, [(tx, ty), (mx, my - 6), (ex, ey), (mx, my + 4)], col)


def bamboo(d, x, base, h, col, seed=0):
    rnd = random.Random(seed + int(x))
    for i in range(5):
        xx = x + i * rnd.uniform(9, 16) - 30
        hh = h * rnd.uniform(.7, 1.0)
        lean = rnd.uniform(-14, 14)
        line(d, [(xx, base), (xx + lean, base - hh)], col, 3.5)
        for j in range(5):
            yy = base - hh * (.35 + j * .13)
            ex = xx + lean * (.35 + j * .13) + rnd.choice([-1, 1]) * 34
            poly(d, [(xx + lean * (.35 + j * .13), yy), (ex, yy - 8), (ex + (6 if ex > xx else -6), yy + 6)], col)


def shikhara(d, cx, base, w, h, col):
    """temple spire with curved sides, kalash and flag"""
    tiers = 7
    pts_l, pts_r = [], []
    for i in range(tiers * 6 + 1):
        t = i / (tiers * 6)
        yy = base - h * t
        hw = w / 2 * (1 - t ** 1.25) * (1 + 0.06 * math.sin(t * tiers * 6.28))
        pts_l.append((cx - hw, yy)); pts_r.append((cx + hw, yy))
    poly(d, pts_l + pts_r[::-1], col)
    poly(d, [(cx - w * .62, base), (cx - w * .5, base - h * .08), (cx + w * .5, base - h * .08), (cx + w * .62, base)], col)
    ell(d, cx, base - h - 8, 11, 7, col)
    line(d, [(cx, base - h - 10), (cx, base - h - 48)], col, 3)
    poly(d, [(cx, base - h - 48), (cx + 28, base - h - 40), (cx, base - h - 32)], col)


def arch_wall(d, x0, x1, base, h, col, n=5):
    poly(d, [(x0, base), (x0, base - h), (x1, base - h), (x1, base)], col)


def hut(d, x, base, w, h, col, roof=None):
    roof = roof or col
    poly(d, [(x - w / 2, base), (x - w / 2, base - h * .55), (x + w / 2, base - h * .55), (x + w / 2, base)], col)
    poly(d, [(x - w * .65, base - h * .5), (x, base - h), (x + w * .65, base - h * .5)], roof)


def water(img, y0, col_top, col_bot, sky_reflect=0.45):
    h = WH - y0
    reflect = img[max(2 * y0 - WH, 0):y0][::-1]
    reflect = cv2.resize(reflect, (WW, h)) if reflect.shape[0] > 1 else np.zeros((h, WW, 3), np.float32)
    grad = vgrad([(0, col_top), (1, col_bot)], WW, h)
    img[y0:] = grad * (1 - sky_reflect) + reflect * sky_reflect * 0.9
    # horizontal soft ripple banding
    ys = np.arange(h, dtype=np.float32)[:, None]
    band = (np.sin(ys * (0.35 / (1 + ys / 120)) + 1.3) * .5 + .5) * 8
    img[y0:] += band[..., None]


# ---------------------------------------------------------------- characters
SKIN = {'ram': C('3f78b0'), 'krishna': C('3a6fb4'), 'human': C('b87a52'), 'fair': C('d6a077'), 'dark': C('8a5a3d')}


def _rim(figlay, col, dx=3, strength=0.95):
    a = np.asarray(figlay, np.uint8)
    al = a[..., 3].astype(np.float32)
    sh = np.roll(al, -dx * S, axis=1)
    edge = np.clip(al - sh, 0, 255) / 255.0
    edge = cv2.GaussianBlur(edge, (0, 0), 1.2 * S)
    out = a.astype(np.float32)
    for c in range(3):
        out[..., c] = np.clip(out[..., c] + edge * col[c] * strength, 0, 255)
    return Image.fromarray(out.astype(np.uint8), 'RGBA')


def _shade(lay, lo=0.58):
    arr = np.asarray(lay, np.uint8).astype(np.float32)
    al = arr[..., 3]
    ys = np.where(al.max(axis=1) > 10)[0]
    if len(ys) < 2:
        return lay
    y0, y1 = ys[0], ys[-1]
    g = np.ones(arr.shape[0], np.float32)
    g[y0:y1 + 1] = np.linspace(1.0, lo, y1 - y0 + 1)
    g[y1:] = lo
    arr[..., :3] *= g[:, None, None]
    return Image.fromarray(arr.astype(np.uint8), 'RGBA')


def person(img, cx, base, h, kind='human', pose='stand', cloth=C('e8c56a'), hair=C('1c1410'), crown=False,
           halo=None, rim=(255, 190, 120), face='calm', veil=None, sari=False, scale_w=1.0, flip=False,
           top=C('b89a5b'), shade=True, ground_shadow=True):
    skin = SKIN.get(kind, SKIN['human'])
    lay = layer(); d = ImageDraw.Draw(lay)
    u = h / 100.0
    dark = tuple(int(c * .7) for c in cloth)
    AW = 4.4 * u  # arm thickness
    # ---- lower body
    if pose == 'kneel':
        poly(d, [(cx - 22 * u * scale_w, base), (cx - 13 * u, base - 30 * u), (cx + 13 * u, base - 30 * u), (cx + 26 * u * scale_w, base - 2 * u)], cloth)
        ell(d, cx - 16 * u, base - 3 * u, 12 * u, 5 * u, cloth)
        ytop = base - 30 * u
    elif pose == 'sit':
        poly(d, [(cx - 34 * u * scale_w, base), (cx - 17 * u, base - 24 * u), (cx + 17 * u, base - 24 * u), (cx + 34 * u * scale_w, base)], cloth)
        ytop = base - 24 * u
    else:
        if sari:
            poly(d, [(cx - 15 * u, base - 46 * u), (cx - 25 * u * scale_w, base - 8 * u), (cx - 28 * u * scale_w, base), (cx + 28 * u * scale_w, base),
                     (cx + 25 * u * scale_w, base - 8 * u), (cx + 15 * u, base - 46 * u)], cloth)
            for k in (-.6, -.2, .25, .65):
                line(d, [(cx + k * 11 * u, base - 44 * u), (cx + k * 25 * u, base - 2 * u)], dark, 1.3)
        else:
            hw = 14 * u
            poly(d, [(cx - hw, base - 47 * u), (cx - 22 * u * scale_w, base - 10 * u), (cx - 19 * u * scale_w, base - 3 * u), (cx - 2 * u, base - 4 * u),
                     (cx, base - 30 * u), (cx + 2 * u, base - 4 * u), (cx + 19 * u * scale_w, base - 3 * u), (cx + 22 * u * scale_w, base - 10 * u), (cx + hw, base - 47 * u)], cloth)
            for k in (-.55, .15, .65):
                line(d, [(cx + k * 12 * u, base - 44 * u), (cx + k * 17 * u, base - 5 * u)], dark, 1.4)
            line(d, [(cx - hw, base - 45 * u), (cx + hw, base - 41 * u)], C('c8312c'), 2.2 * u / 2)
            ell(d, cx - 11 * u, base - 1.5 * u, 7 * u, 2.6 * u, skin); ell(d, cx + 11 * u, base - 1.5 * u, 7 * u, 2.6 * u, skin)
        ytop = base - 46 * u
    # ---- torso
    tw = 15.5 * u
    ty = ytop - 29 * u
    if sari:
        poly(d, [(cx - tw * .85, ty), (cx + tw * .85, ty), (cx + 14 * u, ytop + 2 * u), (cx - 14 * u, ytop + 2 * u)], cloth)
        poly(d, [(cx - tw * .85, ty), (cx - 4 * u, ty - 1 * u), (cx + 14 * u, ytop + 8 * u), (cx + 4 * u, ytop + 8 * u)], dark)
    else:
        poly(d, [(cx - tw, ty + 1 * u), (cx - 9 * u, ty - 1.5 * u), (cx + 9 * u, ty - 1.5 * u), (cx + tw, ty + 1 * u), (cx + 12 * u, ytop + 1 * u), (cx - 12 * u, ytop + 1 * u)], skin)
        poly(d, [(cx - tw, ty + 1 * u), (cx - 8 * u, ty - 1.5 * u), (cx + tw * .95, ytop - 4 * u), (cx + tw * .4, ytop)], top)
        pts = [(cx + math.cos(t) * 9 * u, ty + 2 * u + math.sin(t) * 8 * u) for t in np.linspace(0.15, math.pi - .15, 14)]
        line(d, pts, C('f3c75a'), 1.8)
    # ---- arms
    ay = ty + 2.5 * u
    ac = cloth if sari else skin
    if pose == 'namaste':
        line(d, [(cx - tw + 1 * u, ay), (cx - 20 * u, ay + 14 * u), (cx - 4 * u, ay + 13 * u)], ac, AW)
        line(d, [(cx + tw - 1 * u, ay), (cx + 20 * u, ay + 14 * u), (cx + 4 * u, ay + 13 * u)], ac, AW)
        ell(d, cx, ay + 11.5 * u, 5 * u, 7 * u, skin)
    elif pose == 'raise':
        line(d, [(cx - tw + 1 * u, ay), (cx - 27 * u, ay - 6 * u), (cx - 22 * u, ay - 28 * u)], ac, AW)
        line(d, [(cx + tw - 1 * u, ay), (cx + 27 * u, ay - 6 * u), (cx + 22 * u, ay - 28 * u)], ac, AW)
        ell(d, cx - 22 * u, ay - 31 * u, 4.4 * u, 5.4 * u, skin); ell(d, cx + 22 * u, ay - 31 * u, 4.4 * u, 5.4 * u, skin)
    elif pose == 'cradle':
        line(d, [(cx - tw + 1 * u, ay), (cx - 19 * u, ay + 18 * u), (cx + 6 * u, ay + 26 * u)], ac, AW)
        line(d, [(cx + tw - 1 * u, ay), (cx + 19 * u, ay + 18 * u), (cx - 6 * u, ay + 26 * u)], ac, AW)
    elif pose == 'rein':
        line(d, [(cx - tw + 1 * u, ay), (cx - 24 * u, ay + 12 * u), (cx - 38 * u, ay + 12 * u)], ac, AW)
        line(d, [(cx + tw - 1 * u, ay), (cx + 24 * u, ay + 12 * u), (cx + 38 * u, ay + 12 * u)], ac, AW)
    else:
        line(d, [(cx - tw + 1 * u, ay), (cx - 19 * u, ay + 20 * u), (cx - 16 * u, ay + 36 * u)], ac, AW)
        line(d, [(cx + tw - 1 * u, ay), (cx + 19 * u, ay + 20 * u), (cx + 16 * u, ay + 36 * u)], ac, AW)
        ell(d, cx - 16 * u, ay + 38 * u, 3.4 * u, 4 * u, skin); ell(d, cx + 16 * u, ay + 38 * u, 3.4 * u, 4 * u, skin)
    # ---- neck + head
    hr = 11.2 * u
    hy = ty - 8 * u
    poly(d, [(cx - 4 * u, ty + 1 * u), (cx - 3.6 * u, hy), (cx + 3.6 * u, hy), (cx + 4 * u, ty + 1 * u)], skin)
    ell(d, cx, hy - 3.5 * u, hr * .86, hr, skin)
    if veil:
        poly(d, [(cx - hr * 1.12, hy - 3 * u), (cx - hr * .95, hy - 12 * u), (cx, hy - hr * 1.6), (cx + hr * .95, hy - 12 * u), (cx + hr * 1.12, hy - 3 * u),
                 (cx + 19 * u, ty + 10 * u), (cx - 19 * u, ty + 10 * u)], veil)
        ell(d, cx, hy - 2.5 * u, hr * .72, hr * .9, skin)
    else:
        ell(d, cx, hy - hr * 1.02, hr * .9, hr * .52, hair)
        if not crown:
            ell(d, cx, hy - hr * 1.55, hr * .36, hr * .34, hair)
    if crown:
        gold = C('f0b43c')
        poly(d, [(cx - hr * .85, hy - hr * .9), (cx - hr * .85, hy - hr * 1.55), (cx - hr * .45, hy - hr * 1.2), (cx, hy - hr * 2.0),
                 (cx + hr * .45, hy - hr * 1.2), (cx + hr * .85, hy - hr * 1.55), (cx + hr * .85, hy - hr * .9)], gold)
        ell(d, cx, hy - hr * 1.35, hr * .13, hr * .13, C('d8352f'))
    # ---- face
    ec = C('1b1210')
    ey = hy - 4.2 * u
    lw = max(.42 * u, 1.2)
    if face in ('calm', 'sad'):
        for sx in (-1, 1):
            line(d, [(cx + sx * 4.3 * u - 2.6 * u, ey), (cx + sx * 4.3 * u, ey + 1.1 * u), (cx + sx * 4.3 * u + 2.6 * u, ey)], ec, lw)
        if face == 'sad':
            line(d, [(cx - 4.2 * u, ey - 3 * u), (cx - 1.4 * u, ey - 3.8 * u)], ec, lw)
            line(d, [(cx + 4.2 * u, ey - 3 * u), (cx + 1.4 * u, ey - 3.8 * u)], ec, lw)
            line(d, [(cx - 2 * u, hy + 4.4 * u), (cx, hy + 3.4 * u), (cx + 2 * u, hy + 4.4 * u)], ec, lw)
        else:
            line(d, [(cx - 2 * u, hy + 3.2 * u), (cx, hy + 4.2 * u), (cx + 2 * u, hy + 3.2 * u)], ec, lw)
    elif face == 'smile':
        for sx in (-1, 1):
            line(d, [(cx + sx * 4.3 * u - 2.6 * u, ey + .7 * u), (cx + sx * 4.3 * u, ey - .6 * u), (cx + sx * 4.3 * u + 2.6 * u, ey + .7 * u)], ec, lw)
        line(d, [(cx - 3 * u, hy + 2.6 * u), (cx, hy + 4.8 * u), (cx + 3 * u, hy + 2.6 * u)], ec, lw)
    line(d, [(cx, ey + 1.5 * u), (cx - .7 * u, hy + 1.6 * u), (cx + .5 * u, hy + 1.8 * u)], tuple(int(c * .7) for c in skin), max(.3 * u, 1))
    if not sari and not veil:
        poly(d, [(cx - .8 * u, ey - 5 * u), (cx + .8 * u, ey - 5 * u), (cx + .55 * u, ey - 2 * u), (cx - .55 * u, ey - 2 * u)], C('e8d9b0'))
    if sari or veil:
        ell(d, cx, ey - 3.2 * u, .75 * u, .75 * u, C('c8262b'))
    if flip:
        lay = lay.transpose(Image.FLIP_LEFT_RIGHT)
        lay = _shift_flip(lay, cx)
    if shade:
        lay = _shade(lay)
    lay = _rim(lay, rim)
    if ground_shadow:
        sh = np.zeros((WH, WW), np.float32)
        cv2.ellipse(sh, (int(cx), int(base + 2)), (int(30 * u * scale_w), int(4 * u)), 0, 0, 360, 0.55, -1)
        sh = cv2.GaussianBlur(sh, (0, 0), 5)[..., None]
        img[:] = img * (1 - sh * 0.8)
    if halo is not None:
        glow(img, cx, hy - 3 * u, hr * 3.2, halo, 0.55, 2.0)
    blit(img, lay)
    return dict(head=(cx, hy - 3.5 * u), hr=hr, chest=(cx, ty + 8 * u), top=hy - hr * 2)


def _shift_flip(lay, cx):
    # after FLIP_LEFT_RIGHT, the figure is mirrored about image centre; move back so it is centred at cx again
    shift = int((WW - 2 * cx) * S)
    out = Image.new('RGBA', lay.size, (0, 0, 0, 0))
    out.paste(lay, (-shift, 0))
    return out


# ---------------------------------------------------------------- bird (Jatayu)
def bird_flying(img, cx, cy, span, col, tilt=0.0, rim=(255, 180, 110), halo=None, droop=0.0):
    lay = layer(); d = ImageDraw.Draw(lay)
    s = span / 200.0

    def wing(sign):
        pts = []
        N = 14
        for i in range(N + 1):
            t = i / N
            x = t * 104
            y = -34 * math.sin(t * math.pi * .78) + t * t * 58 + droop * t * t * 60
            pts.append((sign * x, y))
        for i in range(8):
            t = 1 - i / 8
            bx = 104 * t * .96
            by = 22 + 10 * t + droop * t * t * 60
            pts.append((sign * (bx + 2), by + 24 + 6 * t))
            pts.append((sign * (bx - 6), by - 2))
        pts.append((sign * 6, 26))
        return [(cx + p[0] * s * math.cos(tilt) - p[1] * s * math.sin(tilt), cy + p[0] * s * math.sin(tilt) + p[1] * s * math.cos(tilt)) for p in pts]
    for sgn in (-1, 1):
        poly(d, wing(sgn), col)
    ell(d, cx, cy + 6 * s, 12 * s, 26 * s, col)
    poly(d, [(cx - 9 * s, cy + 26 * s), (cx + 9 * s, cy + 26 * s), (cx + 15 * s, cy + 62 * s), (cx + 6 * s, cy + 56 * s), (cx, cy + 66 * s), (cx - 6 * s, cy + 56 * s), (cx - 15 * s, cy + 62 * s)], col)
    ell(d, cx, cy - 26 * s, 6.5 * s, 8 * s, col)
    poly(d, [(cx - 2 * s, cy - 28 * s), (cx + 7 * s, cy - 22 * s), (cx + 2 * s, cy - 17 * s)], col)
    lay = _rim(lay, rim, dx=3)
    if halo is not None:
        glow(img, cx, cy, span * .45, halo, 0.5, 2.0)
    blit(img, lay)


def bird_fallen(img, cx, cy, span, col, rim=(255, 190, 120)):
    lay = layer(); d = ImageDraw.Draw(lay)
    s = span / 200.0
    ell(d, cx, cy, 60 * s, 17 * s, col)
    poly(d, [(cx - 20 * s, cy - 4 * s), (cx - 95 * s, cy - 28 * s), (cx - 120 * s, cy - 8 * s), (cx - 96 * s, cy + 6 * s), (cx - 70 * s, cy + 14 * s), (cx - 40 * s, cy + 12 * s)], col)
    for i in range(5):
        poly(d, [(cx - 120 * s + i * 4 * s, cy - 8 * s + i * 3 * s), (cx - 140 * s + i * 5 * s, cy + 2 * s + i * 5 * s), (cx - 112 * s + i * 8 * s, cy + 6 * s + i * 3 * s)], col)
    ell(d, cx + 62 * s, cy - 12 * s, 11 * s, 11 * s, col)
    poly(d, [(cx + 70 * s, cy - 14 * s), (cx + 88 * s, cy - 6 * s), (cx + 70 * s, cy - 6 * s)], col)
    poly(d, [(cx - 50 * s, cy + 4 * s), (cx - 80 * s, cy + 20 * s), (cx - 52 * s, cy + 22 * s)], col)
    lay = _rim(lay, rim)
    blit(img, lay)
    return (cx + 64 * s, cy - 13 * s)  # eye


# ---------------------------------------------------------------- small props
def lotus(d, cx, cy, r, col=C('f4a6c0'), inner=C('fbd9e4')):
    for k in range(-2, 3):
        a = k * 0.45
        pts = [(cx, cy), (cx + math.sin(a) * r * .5 - r * .22, cy - r * .55), (cx + math.sin(a) * r, cy - r * math.cos(a)),
               (cx + math.sin(a) * r * .5 + r * .22, cy - r * .55)]
        poly(d, pts, col if abs(k) == 2 else inner)


def diya(img, cx, cy, s=1.0, flame_col=(255, 190, 80)):
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, [(cx - 22 * s, cy), (cx + 22 * s, cy), (cx + 14 * s, cy + 12 * s), (cx - 14 * s, cy + 12 * s)], C('a85a28'))
    ell(d, cx, cy, 22 * s, 5 * s, C('7a3a18'))
    blit(img, lay)
    glow(img, cx, cy - 12 * s, 42 * s, flame_col, 0.6, 2.0)


def bow(d, cx, cy, r, col, a0=-1.0, a1=1.0):
    pts = [(cx + math.cos(t) * r * .4, cy + math.sin(t) * r) for t in np.linspace(a0, a1, 24)]
    line(d, pts, col, 3)
    line(d, [pts[0], pts[-1]], (230, 220, 200), 1)


def boat(d, cx, cy, w, col):
    poly(d, [(cx - w / 2, cy - w * .1), (cx + w / 2, cy - w * .1), (cx + w * .38, cy + w * .08), (cx - w * .38, cy + w * .08)], col)
    poly(d, [(cx - w / 2 - 8, cy - w * .17), (cx - w / 2, cy - w * .1), (cx - w * .4, cy - w * .1)], col)
    poly(d, [(cx + w / 2 + 8, cy - w * .17), (cx + w / 2, cy - w * .1), (cx + w * .4, cy - w * .1)], col)


def chariot(d, cx, base, h, col):
    r = h * .32
    for dx in (-1, 1):
        cxw = cx + dx * h * .3
        d.ellipse([(cxw - r) * S, (base - r * 1.8 + r) * S - r * S, (cxw + r) * S, (base - r * 1.8 + r) * S + r * S], outline=tuple(col) + (255,), width=int(3 * S))
        for k in range(8):
            a = k * math.pi / 4
            line(d, [(cxw, base - r * .8), (cxw + math.cos(a) * r, base - r * .8 + math.sin(a) * r)], col, 1.8)
    poly(d, [(cx - h * .55, base - r * 1.2), (cx + h * .55, base - r * 1.2), (cx + h * .42, base - r * 2.6), (cx - h * .42, base - r * 2.6)], col)
    line(d, [(cx + h * .55, base - r * 1.4), (cx + h * 1.35, base - r * 1.8)], col, 3)


def horse(d, x, base, h, col, rear=False):
    u = h / 100
    # body
    ell(d, x, base - 42 * u, 24 * u, 12 * u, col)
    # legs
    for dx, ph in ((-16, 0), (-8, 6), (12, 0), (20, 6)):
        line(d, [(x + dx * u, base - 36 * u), (x + (dx + (6 if rear else 3)) * u, base - 16 * u), (x + (dx + ph * .3) * u, base)], col, 3.2 * u)
    # neck + head
    poly(d, [(x + 16 * u, base - 46 * u), (x + 26 * u, base - 82 * u), (x + 36 * u, base - 80 * u), (x + 28 * u, base - 44 * u)], col)
    poly(d, [(x + 26 * u, base - 82 * u), (x + 46 * u, base - 74 * u), (x + 40 * u, base - 66 * u), (x + 30 * u, base - 72 * u)], col)
    poly(d, [(x + 28 * u, base - 82 * u), (x + 31 * u, base - 92 * u), (x + 34 * u, base - 82 * u)], col)
    poly(d, [(x - 22 * u, base - 46 * u), (x - 36 * u, base - 40 * u), (x - 34 * u, base - 26 * u), (x - 24 * u, base - 36 * u)], col)


def flag(d, x, base, h, col, w=46):
    line(d, [(x, base), (x, base - h)], col, 3)
    poly(d, [(x, base - h), (x + w, base - h + 10), (x, base - h + 22)], col)


def feather(d, x, y, ang, L, col):
    ca, sa = math.cos(ang), math.sin(ang)
    pts = []
    for t in np.linspace(0, 1, 8):
        w = math.sin(t * math.pi) * L * .13
        pts.append((x + ca * L * t - sa * w, y + sa * L * t + ca * w))
    for t in np.linspace(1, 0, 8):
        w = math.sin(t * math.pi) * L * .13
        pts.append((x + ca * L * t + sa * w, y + sa * L * t - ca * w))
    poly(d, pts, col)


def mandala(img, cx, cy, r, col, a=0.35, petals=16, rings=3):
    lay = layer(); d = ImageDraw.Draw(lay)
    for ring in range(rings):
        rr = r * (0.45 + .27 * ring)
        n = petals + ring * 4
        for k in range(n):
            ang = 2 * math.pi * k / n + ring * .1
            px, py = cx + math.cos(ang) * rr, cy + math.sin(ang) * rr
            ex, ey = cx + math.cos(ang) * (rr + r * .16), cy + math.sin(ang) * (rr + r * .16)
            nx, ny = -math.sin(ang), math.cos(ang)
            poly(d, [(px + nx * 5, py + ny * 5), (ex, ey), (px - nx * 5, py - ny * 5)], col, 255)
        d.ellipse([(cx - rr) * S, (cy - rr) * S, (cx + rr) * S, (cy + rr) * S], outline=tuple(col) + (255,), width=S)
    blit(img, lay, a)


def vignette_mask(w, h, strength=0.5):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
    return (1 - strength * np.clip(d - 0.35, 0, 1) ** 1.5)[..., None]
