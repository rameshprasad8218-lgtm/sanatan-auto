# -*- coding: utf-8 -*-
"""shared background building blocks for story modules"""
from kit import *
from PIL import ImageFont
FB = 'assets/Hind-Bold.ttf'
_f = {}


def ftxt(size):
    if size not in _f:
        _f[size] = ImageFont.truetype(FB, int(size * S), layout_engine=ImageFont.Layout.RAQM)
    return _f[size]


def text_on(d, cx, cy, txt, size, col, stroke=0, scol=(0, 0, 0)):
    f = ftxt(size)
    w = f.getlength(txt) / S
    d.text(((cx - w / 2) * S, (cy - size * .75) * S), txt, font=f, fill=tuple(col) + (255,), stroke_width=int(stroke * S), stroke_fill=tuple(scol) + (255,))


def floor(img, y, c1, c2):
    h = WH - y
    img[y:] = vgrad([(0, c1), (1, c2)], WW, h)


def wall_wood(img, y1, c1=C('7a4a2c'), c2=C('3a2014')):
    img[:y1] = vgrad([(0, c1), (1, c2)], WW, y1)
    lay = layer(); d = ImageDraw.Draw(lay)
    for x in range(0, WW, 90):
        line(d, [(x, 0), (x, y1)], (0, 0, 0), 2, 40)
    blit(img, lay)


def table(img, x0, x1, y, col=C('5a3420')):
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, [(x0, y), (x1, y), (x1 + 10, y + 26), (x0 - 10, y + 26)], dk3(col, 1.25))
    poly(d, [(x0 - 10, y + 26), (x1 + 10, y + 26), (x1 + 10, y + 50), (x0 - 10, y + 50)], col)
    for x in (x0 + 10, x1 - 40):
        poly(d, [(x, y + 50), (x + 30, y + 50), (x + 26, y + 330), (x + 4, y + 330)], dk3(col, .8))
    blit(img, lay)


def dk3(c, k):
    return tuple(max(0, min(255, int(v * k))) for v in c)


def bowl(d, cx, y, r, rice=True, col=C('e8e2d0')):
    poly(d, [(cx - r, y), (cx + r, y), (cx + r * .72, y + r * .55), (cx - r * .72, y + r * .55)], C('b8864a'))
    if rice:
        for k in range(30):
            a = k / 30 * math.pi
            ell(d, cx + math.cos(a) * r * .9 * (1 if k % 2 else .6), y - math.sin(a) * r * .5 * (1 if k % 3 else .7), r * .09, r * .06, col)
        ell(d, cx, y - r * .12, r * .9, r * .28, col)


def banana_peel(d, x, y, s, col=C('f0c63a')):
    for k, a in enumerate((-.6, 0, .6)):
        pts = [(x, y), (x + math.sin(a) * s * .6 - 8 * s * .1, y - s * .5), (x + math.sin(a) * s, y - s * .9)]
        limb_poly(d, pts, s * .22, col)


def limb_poly(d, pts, w, col):
    for i in range(len(pts) - 1):
        line(d, [pts[i], pts[i + 1]], col, w)
    ell(d, pts[-1][0], pts[-1][1], w * .5, w * .5, col)


def palace_arches(img, base, col, n=4, glow_col=(255, 200, 120)):
    lay = layer(); d = ImageDraw.Draw(lay)
    w = WW / n
    for i in range(n):
        cx = w * (i + .5)
        poly(d, [(cx - w * .46, base), (cx - w * .46, base - 520), (cx - w * .3, base - 520)] + [(cx + math.cos(t) * w * .3, base - 520 - math.sin(t) * 120) for t in np.linspace(math.pi, 0, 14)] + [(cx + w * .3, base - 520), (cx + w * .46, base - 520), (cx + w * .46, base)], col)
        poly(d, [(cx - w * .12, base - 80)] + [(cx + math.cos(t) * w * .22, base - 480 - math.sin(t) * 100) for t in np.linspace(math.pi, 0, 12)] + [(cx + w * .12, base - 80)], (60, 40, 40), 255)
    blit(img, lay)


def paddy(img, y, seed=2, col=C('d9b84a'), n=120, h=170, light=1.0):
    rnd = random.Random(seed)
    lay = layer(); d = ImageDraw.Draw(lay)
    for _ in range(n):
        x = rnd.uniform(-10, WW + 10); b = y + rnd.uniform(0, 160); hh = h * rnd.uniform(.6, 1.2) * (0.6 + (b - y) / 300)
        lean = rnd.uniform(-30, 30)
        line(d, [(x, b), (x + lean * .4, b - hh * .6), (x + lean, b - hh)], dk3(col, .8), 2.2)
        for k in range(6):
            t = .55 + k * .08
            ell(d, x + lean * t + k * 1.5, b - hh * t, 5, 9, dk3(col, 1.05 + .05 * (k % 2)))
    blit(img, lay)


def forest(img, seed, cols, base=1250, hs=(500, 650, 800)):
    for i, (c, hh) in enumerate(zip(cols, hs)):
        lay = layer(); d = ImageDraw.Draw(lay)
        for x in range(-40, WW + 60, 90 + i * 20):
            tree(d, x + random.Random(seed + i + x).uniform(-20, 20), base + i * 60, hh * random.Random(seed + x).uniform(.7, 1.1), c, 0, seed)
        blit(img, lay)
