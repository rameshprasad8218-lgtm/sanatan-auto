# -*- coding: utf-8 -*-
"""Puppet-rig characters: detailed paper-cut parts (back/body/head/front) animated per frame
(breathing, head sway, blinking, veil sway). Sprites are rendered once at 2x and composited with the camera."""
import math
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageChops
from kit import *

RS = 2
SK = {'krishna': (62, 112, 190), 'fair': (226, 170, 128), 'human': (190, 128, 90), 'dark': (140, 92, 64), 'ram': (74, 128, 190)}


def dk(c, k):
    return tuple(max(0, min(255, int(v * k))) for v in c)


def limb(d, pts, w0, w1, col, a=255):
    n = len(pts)
    for i in range(n - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        wa = w0 + (w1 - w0) * i / (n - 1); wb = w0 + (w1 - w0) * (i + 1) / (n - 1)
        L = math.hypot(x1 - x0, y1 - y0) + 1e-6
        nx, ny = -(y1 - y0) / L, (x1 - x0) / L
        poly(d, [(x0 + nx * wa / 2, y0 + ny * wa / 2), (x1 + nx * wb / 2, y1 + ny * wb / 2), (x1 - nx * wb / 2, y1 - ny * wb / 2), (x0 - nx * wa / 2, y0 - ny * wa / 2)], col, a)
        ell(d, x1, y1, wb / 2, wb / 2, col, a)
    ell(d, pts[0][0], pts[0][1], w0 / 2, w0 / 2, col, a)


_scratch = [None]


def _ap(d, bbox, fn, a=255, mask=None):
    """draw with fn(td) on a scratch layer, then alpha-composite (opacity a, optional polygon mask) onto d's image"""
    if _scratch[0] is None:
        _scratch[0] = layer()
    sc = _scratch[0]
    im = d._image
    x0, y0, x1, y1 = bbox
    x0 = max(int(x0 * S) - 4, 0); y0 = max(int(y0 * S) - 4, 0); x1 = min(int(x1 * S) + 4, im.width); y1 = min(int(y1 * S) + 4, im.height)
    if x1 <= x0 or y1 <= y0:
        return
    fn(ImageDraw.Draw(sc))
    reg = sc.crop((x0, y0, x1, y1))
    al = reg.getchannel('A')
    if mask is not None:
        m = Image.new('L', reg.size, 0)
        ImageDraw.Draw(m).polygon([(x * S - x0, y * S - y0) for x, y in mask], fill=255)
        al = ImageChops.multiply(al, m)
    if a < 255:
        al = al.point(lambda v: v * a // 255)
    reg.putalpha(al)
    im.alpha_composite(reg, (x0, y0))
    sc.paste((0, 0, 0, 0), (x0, y0, x1, y1))


def ell_a(d, cx, cy, rx, ry, col, a):
    _ap(d, (cx - rx, cy - ry, cx + rx, cy + ry), lambda td: ell(td, cx, cy, rx, ry, col), a)


def limb_a(d, pts, w0, w1, col, a):
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]; m = max(w0, w1)
    _ap(d, (min(xs) - m, min(ys) - m, max(xs) + m, max(ys) + m), lambda td: limb(td, pts, w0, w1, col), a)


def hand(d, x, y, ang, s, skin, open_=True):
    """palm at (x,y), fingers point along ang (radians, 0 = right, -pi/2 = up)."""
    ca, sa = math.cos(ang), math.sin(ang)
    def T(a, b):
        return (x + ca * a - sa * b, y + sa * a + ca * b)
    ell(d, *T(1.6 * s, 0), 2.7 * s, 2.5 * s, skin)
    if open_:
        for k, (off, L) in enumerate(((-1.9, 3.3), (-.7, 4.0), (.5, 3.9), (1.6, 3.1))):
            limb(d, [T(3.2 * s, off * s), T((3.2 + L) * s, (off * 1.15) * s)], 1.25 * s, 1.0 * s, skin)
        limb(d, [T(1.5 * s, 2.3 * s), T(4.0 * s, 3.9 * s)], 1.5 * s, 1.1 * s, skin)
    else:
        ell(d, *T(3.2 * s, 0), 2.2 * s, 2.3 * s, skin)


def _crop(lay):
    bb = lay.getbbox()
    if bb is None:
        return None
    pad = 12 * S
    x0, y0 = max(bb[0] - pad, 0), max(bb[1] - pad, 0)
    x1, y1 = min(bb[2] + pad, lay.width), min(bb[3] + pad, lay.height)
    return lay.crop((x0, y0, x1, y1)), (x0 / S, y0 / S)


def finish(lay, rim, top_k=1.07, bot_k=0.74, inner=0.5, rim_side=1, rim_str=0.9, shade=True):
    """shade a cropped RGBA sprite -> premultiplied uint8 (hi-res, lo-res) + origin"""
    c = _crop(lay)
    if c is None:
        return None
    im, off = c
    a = np.asarray(im, np.uint8).astype(np.float32)
    al = a[..., 3] / 255.0
    rgb = a[..., :3]
    if shade:
        h = rgb.shape[0]
        g = np.linspace(top_k, bot_k, h, dtype=np.float32)[:, None, None]
        rgb = rgb * g
        bl = cv2.GaussianBlur(al, (0, 0), 7 * S)
        edge = np.clip(al - bl, 0, 1)
        rgb = rgb * (1 - np.clip(edge * 1.2 * inner * 2, 0, .55)[..., None])
    if rim is not None:
        sh = np.roll(al, -rim_side * 3 * S, axis=1)
        e = cv2.GaussianBlur(np.clip(al - sh, 0, 1), (0, 0), 1.3 * S)
        for ch in range(3):
            rgb[..., ch] = np.clip(rgb[..., ch] + e * rim[ch] * rim_str, 0, 255)
    rgb = np.clip(rgb, 0, 255)
    pm = np.dstack([rgb * al[..., None], al * 255.0]).astype(np.uint8)
    lo = cv2.resize(pm, (pm.shape[1] // 2, pm.shape[0] // 2), interpolation=cv2.INTER_AREA)
    return dict(hi=pm, lo=lo, off=off)


# ------------------------------------------------------------------ face
def draw_face(d, fc, rx, ry, skin, mood, turn, eyes_open, female, blind=False, hair=(20, 14, 12), lips=(168, 56, 62)):
    cx, cy = fc
    u = rx / 9.4
    lw = max(.5 * u, 1.3)
    ink = (28, 18, 16)
    sk_d = dk(skin, .78)
    # ---- brows
    by = cy - ry * .30
    for sx in (-1, 1):
        ex = cx + (sx * .42 + turn * .20) * rx
        sc = 1.0 + (-sx * turn) * .12
        ew = rx * .30 * sc
        if mood == 'angry':
            p = [(ex - sx * ew * .15 - ew, by + sx * 0 - (0 if sx > 0 else 0)), ]
            inner_y, outer_y = by + 1.8 * u, by - 1.6 * u
        elif mood == 'sad':
            inner_y, outer_y = by - 1.9 * u, by + .6 * u
        elif mood == 'smile':
            inner_y, outer_y = by + .2 * u, by - .6 * u
        else:
            inner_y, outer_y = by + .1 * u, by - .5 * u
        xin, xout = ex - sx * ew * .95, ex + sx * ew * 1.05
        mid = ((xin + xout) / 2, min(inner_y, outer_y) - 1.1 * u)
        pts = [(xin, inner_y), ((xin + mid[0]) / 2, (inner_y + mid[1]) / 2 - .2 * u), mid, ((xout + mid[0]) / 2, (outer_y + mid[1]) / 2), (xout, outer_y)]
        limb(d, pts, 1.15 * u * (1.0 if female else 1.25), .45 * u, hair)
    # ---- eyes
    ey = cy - ry * .06
    for sx in (-1, 1):
        sc = 1.0 + (-sx * turn) * .14
        ex = cx + (sx * .43 + turn * .22) * rx
        ew = rx * .31 * sc * (1.08 if female else 1.0)
        if blind:
            continue
        if eyes_open:
            lid = {'calm': .62, 'smile': .5, 'sad': .6, 'angry': .46, 'joy': .55}.get(mood, .6)
            fl = 1.0 + .18 * (1 if sx * (1 if turn >= 0 else -1) > 0 else 0)
            up = [(ex + t * ew, ey - math.sqrt(max(0, 1 - t * t)) * ew * lid * fl) for t in np.linspace(-1, 1, 15)]
            lo = [(ex + t * ew, ey + math.sqrt(max(0, 1 - t * t)) * ew * (.42 if mood != 'smile' else .26)) for t in np.linspace(1, -1, 15)]
            gx = ex + turn * .20 * ew
            ir = ew * .56
            irc = (92, 54, 30) if skin != SK['krishna'] else (46, 30, 26)
            def paint(td, ex=ex, ey=ey, gx=gx, ir=ir, irc=irc, ew=ew, up=up, lo=lo, mood=mood):
                poly(td, up + lo, (248, 240, 230))
                ell(td, gx, ey + ew * .02, ir, ir * (1.1 if mood != 'angry' else .9), irc)
                ell(td, gx, ey + ew * .04, ir * .72, ir * .72, tuple(int(c * .55) for c in irc))
                ell(td, gx, ey + ew * .04, ir * .46, ir * .46, (12, 6, 8))
                ell(td, gx - ir * .30, ey - ir * .32, ir * .30, ir * .30, (255, 255, 255))
                ell(td, gx + ir * .32, ey + ir * .38, ir * .13, ir * .13, (255, 255, 255))
                # lid shadow
                poly(td, [(ex - ew, ey - ew * .02)] + up[1:-1] + [(ex + ew, ey - ew * .02)] + [(ex + ew * .9, ey - ew * .18)] + [(p[0], p[1] + ew * .22) for p in reversed(up[2:-2])] + [(ex - ew * .9, ey - ew * .18)], (30, 18, 16))
            _ap(d, (ex - ew * 1.2, ey - ew * 1.0, ex + ew * 1.2, ey + ew * .9), paint, 255, mask=up + lo)
            lid_pts = [(ex + t * ew, ey - math.sqrt(max(0, 1 - t * t)) * ew * lid * fl) for t in np.linspace(-1.04, 1.04, 17)]
            limb(d, lid_pts, 1.5 * u, 1.0 * u, ink)
            ox = ex + sx * ew * 1.0
            limb(d, [(ex + sx * ew * .9, ey - ew * .10), (ox + sx * .9 * u, ey - ew * .25), (ox + sx * 1.9 * u, ey - ew * .46)], 1.0 * u, .3 * u, ink)
            limb_a(d, [(ex - ew * .7, ey + ew * .36), (ex, ey + ew * .44), (ex + ew * .7, ey + ew * .36)], .35 * u, .35 * u, sk_d, 130)
        else:
            cl = [(ex + t * ew, ey + math.sin((t + 1) * math.pi / 2) * ew * .28 - ew * .02) for t in np.linspace(-1, 1, 13)]
            limb(d, cl, 1.5 * u, 1.0 * u, ink)
            ox = ex + sx * ew
            limb(d, [(ox, ey + ew * .1), (ox + sx * 1.4 * u, ey + ew * .22)], .9 * u, .3 * u, ink)
    # ---- nose
    nx = cx + turn * .34 * rx
    ny = cy + ry * .26
    limb_a(d, [(nx - turn * .10 * rx, ey + ry * .05), (nx - turn * .14 * rx, ny - ry * .06)], .8 * u, .6 * u, dk(skin, .86), 150)
    ell(d, nx + turn * .05 * rx, ny, rx * .11, rx * .075, dk(skin, .8))
    ell(d, nx - rx * .07, ny + .3 * u, .55 * u, .45 * u, dk(skin, .5)); ell(d, nx + rx * .07, ny + .3 * u, .55 * u, .45 * u, dk(skin, .5))
    ell_a(d, nx + turn * .02 * rx - .5 * u, ny - .9 * u, .9 * u, 1.6 * u, dk(skin, 1.25), 150)
    # ---- mouth
    mx = cx + turn * .26 * rx
    my = cy + ry * .55
    mw = rx * .27
    if mood in ('smile', 'joy'):
        pts = [(mx + t * mw * 1.05, my - 0.2 * u - (t * t) * 1.4 * u + 1.2 * u) for t in np.linspace(-1, 1, 13)]
        limb(d, pts, 1.5 * u, 0.9 * u, lips)
        limb(d, [(mx - mw * .5, my + 1.9 * u), (mx, my + 2.3 * u), (mx + mw * .5, my + 1.9 * u)], .9 * u, .9 * u, dk(lips, 1.1))
        limb(d, [(mx - mw * 1.08, my + .2 * u), (mx - mw * 1.2, my - .6 * u)], .5 * u, .25 * u, ink)
        limb(d, [(mx + mw * 1.08, my + .2 * u), (mx + mw * 1.2, my - .6 * u)], .5 * u, .25 * u, ink)
    elif mood == 'sad':
        pts = [(mx + t * mw * .8, my + 1.0 * u - (1 - t * t) * 1.2 * u) for t in np.linspace(-1, 1, 11)]
        limb(d, pts, 1.7 * u, 1.2 * u, lips)
    elif mood == 'angry':
        pts = [(mx + t * mw * .9, my + .6 * u + (1 - t * t) * .4 * u) for t in np.linspace(-1, 1, 11)]
        limb(d, pts, 1.2 * u, 1.2 * u, dk(lips, .8))
    else:  # calm serene closed half smile
        pts = [(mx + t * mw, my + .3 * u - (t * t) * .9 * u) for t in np.linspace(-1, 1, 13)]
        limb(d, pts, 1.3 * u, .8 * u, lips)
        limb(d, [(mx - mw * .4, my + 1.5 * u), (mx + mw * .4, my + 1.5 * u)], .8 * u, .8 * u, dk(lips, 1.1))
    # ---- cheeks
    for sx in (-1, 1):
        ell_a(d, cx + (sx * .56 + turn * .2) * rx, cy + ry * .30, rx * .20, ry * .11, (232, 100, 110) if female else (110, 150, 230), 60)


def head_shape(d, fc, rx, ry, col, female):
    cx, cy = fc
    pts = []
    for t in np.linspace(math.pi, 2 * math.pi, 22):
        pts.append((cx + math.cos(t) * rx, cy + math.sin(t) * ry * .96))
    for t in np.linspace(0, math.pi, 26):
        s = math.sin(t)
        taper = 1 - (.25 if female else .16) * s ** 1.5
        pts.append((cx + math.cos(t) * rx * taper, cy + s * ry * 1.04))
    poly(d, pts, col)


# ------------------------------------------------------------------ actor
class Actor:
    """kind: 'krishna' | 'gandhari' | 'generic'. All coordinates world px; (cx, base) = feet centre, h = height."""

    def __init__(self, kind, cx, base, h, mood='calm', turn=0.0, pose='stand', rim=(255, 190, 120), flip=False, **kw):
        self.kind, self.cx, self.base, self.h = kind, cx, base, h
        self.u = h / 100.0
        self.mood, self.turn, self.pose, self.rim = mood, turn, pose, rim
        self.flip = flip
        self.kw = kw
        self.phase = (cx * 0.013 + base * 0.007) % 6.28
        self.blink_off = (cx % 7) * 0.31
        self.ty = base - 75 * self.u
        self.hy = self.ty - 9.5 * self.u
        self.hr = 13.0 * self.u
        self.neck = (cx, self.ty + 1 * self.u)
        self.parts = {}
        self._build()

    # ---- helpers
    def _new(self):
        lay = layer()
        return lay, ImageDraw.Draw(lay)

    def _fin(self, name, lay, **kw):
        if self.flip:
            lay = lay.transpose(Image.FLIP_LEFT_RIGHT)
            # mirror about cx: shift so cx stays put
            dx = int(round((2 * self.cx - WW) * S))
            lay = lay.transform(lay.size, Image.AFFINE, (1, 0, dx, 0, 1, 0))
        f = finish(lay, self.rim, **kw)
        if f is not None:
            self.parts[name] = f

    def _build(self):
        k = self.kind
        if k in ('krishna', 'male'):
            self._krishna()
        elif k in ('gandhari', 'female'):
            self._gandhari()
        else:
            self._krishna()

    # ================================================================ Krishna
    def _krishna(self):
        u, cx, base = self.u, self.cx, self.base
        skin = self.kw.get('skin', SK['krishna'])
        yel = self.kw.get('dhoti', (244, 196, 52)); yel_d = dk(yel, .72)
        self.skin = skin
        red = (196, 44, 48); gold = (246, 190, 70)
        ty, hy, hr = self.ty, self.hy, self.hr
        # ---- back: shawl tail, hair back
        lay, d = self._new()
        if self.kw.get('shawl') != 'none':
            poly(d, [(cx - 15 * u, ty + 3 * u), (cx - 22 * u, ty + 38 * u), (cx - 26 * u, ty + 62 * u), (cx - 13 * u, ty + 58 * u), (cx - 9 * u, ty + 20 * u)], dk(self.kw.get('shawl', (236, 150, 60)), .9))
        if self.kw.get('tail'):
            limb(d, [(cx - 6 * u, base - 44 * u), (cx - 30 * u, base - 36 * u), (cx - 44 * u, base - 58 * u), (cx - 40 * u, base - 84 * u), (cx - 30 * u, base - 96 * u)], 3.4 * u, 1.6 * u, skin)
        self._fin('back', lay)
        # ---- body
        lay, d = self._new()
        # dhoti
        hw = 14.5 * u
        poly(d, [(cx - hw, base - 48 * u), (cx - 21 * u, base - 14 * u), (cx - 19 * u, base - 4 * u), (cx - 3 * u, base - 5 * u), (cx, base - 30 * u),
                 (cx + 3 * u, base - 5 * u), (cx + 19 * u, base - 4 * u), (cx + 21 * u, base - 14 * u), (cx + hw, base - 48 * u)], yel)
        for kk, off in enumerate((-.7, -.3, .15, .6)):
            line(d, [(cx + off * 12 * u, base - 45 * u), (cx + off * 17 * u + (kk % 2) * 1.5 * u, base - 6 * u)], yel_d, 1.6 * u * .55)
        poly(d, [(cx - 3 * u, base - 44 * u), (cx - 11 * u, base - 8 * u), (cx - 2 * u, base - 6 * u), (cx, base - 30 * u)], dk(yel, .88))
        # sash
        poly(d, [(cx - hw, base - 49 * u), (cx + hw, base - 49 * u), (cx + hw, base - 44.5 * u), (cx - hw, base - 44.5 * u)], red)
        line(d, [(cx - hw, base - 44.5 * u), (cx + hw, base - 44.5 * u)], gold, .8 * u)
        poly(d, [(cx + 6 * u, base - 46 * u), (cx + 12 * u, base - 30 * u), (cx + 8 * u, base - 29 * u), (cx + 3 * u, base - 44 * u)], red)
        # feet
        ell(d, cx - 11 * u, base - 1.8 * u, 7 * u, 2.6 * u, dk(skin, .95)); ell(d, cx + 11 * u, base - 1.8 * u, 7 * u, 2.6 * u, dk(skin, .95))
        for sx in (-1, 1):
            limb(d, [(cx + sx * 11 * u - 5 * u, base - 4.5 * u), (cx + sx * 11 * u + 5 * u, base - 4.5 * u)], 1.2 * u, 1.2 * u, gold)
        # torso
        tw = 15.2 * u
        tyt = self.ty
        poly(d, [(cx - tw, tyt + 1 * u), (cx - 8 * u, tyt - 1.8 * u), (cx + 8 * u, tyt - 1.8 * u), (cx + tw, tyt + 1 * u), (cx + 12.5 * u, base - 46 * u), (cx - 12.5 * u, base - 46 * u)], skin)
        # chest shading
        ell_a(d, cx - 6 * u, tyt + 9 * u, 6 * u, 5 * u, (130, 170, 240), 90); ell_a(d, cx + 6 * u, tyt + 9 * u, 6 * u, 5 * u, (130, 170, 240), 90)
        line(d, [(cx, tyt + 4 * u), (cx, tyt + 22 * u)], dk(skin, .86), .5 * u)
        # shoulder cloth (uttariya)
        if self.kw.get('shawl') != 'none':
            poly(d, [(cx - tw, tyt + 1 * u), (cx - 6 * u, tyt - 2 * u), (cx + 4 * u, tyt - 1 * u), (cx + tw * .55, tyt + 22 * u), (cx + tw * .15, tyt + 24 * u), (cx - tw * .7, tyt + 9 * u)], self.kw.get('shawl', (236, 150, 60)))
        line(d, [(cx - tw, tyt + 1 * u), (cx - 6 * u, tyt - 2 * u), (cx + 4 * u, tyt - 1 * u)], gold, .6 * u)
        # necklaces
        for rr, col in ((7.5, gold), (10.5, (255, 220, 120))):
            pts = [(cx + math.cos(t) * rr * u, tyt + 1 * u + math.sin(t) * (rr + 2) * u * .9) for t in np.linspace(.25, math.pi - .25, 16)]
            line(d, pts, col, .9 * u)
        ell(d, cx, tyt + 12.5 * u, 1.6 * u, 1.6 * u, (230, 60, 70))
        # vaijayanti garland of flowers
        gp = [(cx - 12 * u + t * 24 * u, tyt + 4 * u + (math.sin(t * math.pi)) * 17 * u + t * 2 * u) for t in np.linspace(0, 1, 24)]
        for i, (gx, gy) in enumerate(gp if self.kw.get('garland', True) else []):
            ell(d, gx, gy, 1.5 * u, 1.5 * u, [(250, 238, 240), (250, 190, 210), (250, 226, 130)][i % 3])
        # arms
        self._krishna_arms(d, skin, gold, tw, tyt)
        self._fin('body', lay)
        # ---- front (flute / hands near face)
        if self.pose == 'flute':
            lay, d = self._new()
            hy_ = hy
            mx, my = cx + 1.5 * u, hy_ + 5.6 * u
            # flute across, right side
            limb(d, [(mx - 3 * u, my + .8 * u), (mx + 37 * u, my + 6 * u)], 1.8 * u, 1.8 * u, (150, 96, 44))
            for i in range(6):
                ell(d, mx + (8 + i * 4.5) * u, my + (2.4 + i * .55) * u, .45 * u, .45 * u, (60, 34, 14))
            limb(d, [(mx - 3 * u, my + .8 * u), (mx - 2 * u, my + .9 * u)], 2.2 * u, 2.2 * u, gold)
            limb(d, [(mx + 33 * u, my + 5.5 * u), (mx + 37 * u, my + 6 * u)], 2.2 * u, 2.2 * u, gold)
            # hands
            hand(d, mx + 9 * u, my + 3.2 * u, math.radians(5), .9 * u, skin, True)
            hand(d, mx + 22 * u, my + 4.4 * u, math.radians(-10), .9 * u, skin, True)
            # forearms
            limb(d, [(cx - 15 * u, tyt + 3 * u), (cx - 14 * u, tyt + 20 * u), (mx + 9 * u, my + 3.4 * u)], 4.2 * u, 3 * u, skin)
            limb(d, [(cx + 15 * u, tyt + 3 * u), (cx + 26 * u, tyt + 14 * u), (mx + 22 * u, my + 4.4 * u)], 4.2 * u, 3 * u, skin)
            self._fin('front', lay, shade=False)
        # ---- head (open / closed)
        for eo, nm in ((True, 'head_o'), (False, 'head_c')):
            lay, d = self._new()
            self._krishna_head(d, eo)
            self._fin(nm, lay, top_k=1.0, bot_k=.88, inner=.35)

    def _krishna_arms(self, d, skin, gold, tw, tyt):
        u, cx = self.u, self.cx
        ay = tyt + 3 * u
        P_ = self.pose
        AW = 4.6 * u
        if P_ == 'namaste':
            limb(d, [(cx - tw + 1 * u, ay), (cx - 21 * u, ay + 13 * u), (cx - 3 * u, ay + 14 * u)], AW, AW * .78, skin)
            limb(d, [(cx + tw - 1 * u, ay), (cx + 21 * u, ay + 13 * u), (cx + 3 * u, ay + 14 * u)], AW, AW * .78, skin)
            hand(d, cx, ay + 13 * u, -math.pi / 2, 1.0 * u, skin, True)
        elif P_ == 'bless':
            limb(d, [(cx - tw + 1 * u, ay), (cx - 22 * u, ay + 14 * u), (cx - 18 * u, ay + 34 * u)], AW, AW * .8, skin)
            hand(d, cx - 18 * u, ay + 36 * u, math.radians(95), .9 * u, skin, True)
            limb(d, [(cx + tw - 1 * u, ay), (cx + 27 * u, ay + 2 * u), (cx + 31 * u, ay - 18 * u)], AW, AW * .8, skin)
            hand(d, cx + 31 * u, ay - 20 * u, -math.pi / 2 - .1, 1.15 * u, skin, True)
            ell(d, cx + 31 * u, ay - 22 * u, 1.8 * u, 1.8 * u, (230, 90, 100))
        elif P_ == 'flute':
            pass
        elif P_ == 'mace':
            limb(d, [(cx - tw + 1 * u, ay), (cx - 22 * u, ay + 10 * u), (cx - 12 * u, ay + 22 * u)], AW, AW * .8, skin)
            limb(d, [(cx + tw - 1 * u, ay), (cx + 24 * u, ay + 16 * u), (cx + 30 * u, ay + 14 * u)], AW, AW * .8, skin)
            limb(d, [(cx + 30 * u, self.base - 4 * u), (cx + 30 * u, ay - 22 * u)], 2.2 * u, 2.2 * u, (150, 100, 50))
            ell(d, cx + 30 * u, ay - 30 * u, 8 * u, 9 * u, (236, 190, 70)); ell(d, cx + 30 * u, ay - 30 * u, 5 * u, 6 * u, (200, 140, 40))
            hand(d, cx + 30 * u, ay + 14 * u, math.radians(-90), .8 * u, skin, False)
        else:
            limb(d, [(cx - tw + 1 * u, ay), (cx - 20 * u, ay + 20 * u), (cx - 16 * u, ay + 37 * u)], AW, AW * .8, skin)
            limb(d, [(cx + tw - 1 * u, ay), (cx + 20 * u, ay + 20 * u), (cx + 16 * u, ay + 37 * u)], AW, AW * .8, skin)
            hand(d, cx - 16 * u, ay + 39 * u, math.radians(95), .85 * u, skin, False)
            hand(d, cx + 16 * u, ay + 39 * u, math.radians(85), .85 * u, skin, False)
        # armbands + bangles
        if P_ != 'flute':
            for sx in (-1, 1):
                ell(d, cx + sx * (tw - 1.2 * u), ay + 3 * u, 2.4 * u, 1.0 * u, gold)
        for sx in (-1, 1):
            pass

    def _krishna_head(self, d, eyes_open):
        u, cx, hy, hr = self.u, self.cx, self.hy, self.hr
        skin = self.skin
        gold = (246, 190, 70)
        style = self.kw.get('head', 'mukut')
        hair = self.kw.get('hair', (18, 12, 22))
        tn = self.turn
        fc = (cx + tn * .10 * hr, hy - 3.5 * u)
        rx, ry = hr * .86, hr
        # back hair (long locks) behind head
        poly(d, [(cx - hr * 1.0, hy - 6 * u), (cx - hr * 1.15, hy + 8 * u), (cx - hr * .95, hy + 16 * u), (cx - hr * .55, hy + 7 * u), (cx - hr * .45, hy - 2 * u)], hair)
        poly(d, [(cx + hr * 1.0, hy - 6 * u), (cx + hr * 1.15, hy + 8 * u), (cx + hr * .95, hy + 16 * u), (cx + hr * .55, hy + 7 * u), (cx + hr * .45, hy - 2 * u)], hair)
        # neck
        poly(d, [(cx - 4.2 * u, self.ty + 2 * u), (cx - 3.8 * u, hy), (cx + 3.8 * u, hy), (cx + 4.2 * u, self.ty + 2 * u)], dk(skin, .8))
        # ears + earrings
        for sx in (-1, 1):
            ell(d, fc[0] + sx * rx * 1.0, fc[1] + ry * .12, 1.9 * u, 3.0 * u, dk(skin, .94))
            ell(d, fc[0] + sx * rx * 1.02, fc[1] + ry * .52, 1.5 * u, 1.5 * u, gold)
            ell(d, fc[0] + sx * rx * 1.02, fc[1] + ry * .62, .9 * u, 1.8 * u, (232, 70, 80))
        head_shape(d, fc, rx, ry, skin, False)
        # hair cap
        pts = [(fc[0] - rx * 1.02, fc[1] - ry * .1)] + [(fc[0] + math.cos(t) * rx * 1.06, fc[1] - ry * .30 + math.sin(t) * ry * .85) for t in np.linspace(math.pi, 2 * math.pi, 18)] + [(fc[0] + rx * 1.02, fc[1] - ry * .1),
                                                                                                                                                                    (fc[0] + rx * .78, fc[1] - ry * .42), (fc[0] + rx * .3, fc[1] - ry * .58), (fc[0] - rx * .3, fc[1] - ry * .58), (fc[0] - rx * .78, fc[1] - ry * .42)]
        poly(d, pts, hair)
        # curls on forehead sides
        for sx in (-1, 1):
            ell(d, fc[0] + sx * rx * .66, fc[1] - ry * .40, 1.9 * u, 2.3 * u, hair)
            ell(d, fc[0] + sx * rx * .84, fc[1] - ry * .22, 1.5 * u, 2.6 * u, hair)
        # crown (mukut)
        crown_y = fc[1] - ry * .78
        if style == 'sage':
            ell(d, fc[0], fc[1] - ry * 1.12, rx * .62, ry * .46, hair)
            ell(d, fc[0], fc[1] - ry * 1.36, rx * .2, ry * .14, dk(hair, .8))
            line(d, [(fc[0] - rx * .5, fc[1] - ry * 1.1), (fc[0] + rx * .5, fc[1] - ry * 1.14)], (180, 150, 90), .7 * u)
        if style in ('mukut', 'ram', 'hanuman'):
            poly(d, [(fc[0] - rx * .86, crown_y + 4.2 * u), (fc[0] - rx * .78, crown_y - 1.5 * u), (fc[0] - rx * .4, crown_y - 6 * u), (fc[0], crown_y - 9.5 * u),
                     (fc[0] + rx * .4, crown_y - 6 * u), (fc[0] + rx * .78, crown_y - 1.5 * u), (fc[0] + rx * .86, crown_y + 4.2 * u)], gold)
            poly(d, [(fc[0] - rx * .86, crown_y + 4.2 * u), (fc[0] + rx * .86, crown_y + 4.2 * u), (fc[0] + rx * .86, crown_y + 2.3 * u), (fc[0] - rx * .86, crown_y + 2.3 * u)], (255, 226, 140))
            for i, (px, col) in enumerate(((-.6, (230, 60, 70)), (-.2, (60, 190, 190)), (.2, (230, 60, 70)), (.6, (60, 190, 190)))):
                ell(d, fc[0] + px * rx, crown_y + 3.2 * u, .75 * u, .75 * u, col)
            ell(d, fc[0], crown_y - 2.5 * u, 1.3 * u, 1.3 * u, (230, 60, 70))

        if self.kw.get('feather', style == 'mukut'):
            # peacock feather
            fx0, fy0 = fc[0] + rx * .35, crown_y - 6 * u
            stem = [(fx0 + t * 11 * u * .9, fy0 - t * 15 * u + math.sin(t * 3) * 1.4 * u) for t in np.linspace(0, 1, 14)]
            limb(d, stem, .75 * u, .5 * u, (90, 140, 70))
            ex_, ey_ = stem[-1][0] + 1.5 * u, stem[-1][1] - 5 * u
            for k_ in range(14):  # barbs
                a_ = k_ / 14 * math.tau
                limb(d, [(ex_, ey_), (ex_ + math.cos(a_) * 7.8 * u, ey_ + math.sin(a_) * 10.5 * u)], .6 * u, .2 * u, (60, 150, 96))
            ell(d, ex_, ey_, 5.4 * u, 7.4 * u, (40, 150, 120)); ell(d, ex_, ey_, 4.2 * u, 5.8 * u, (230, 190, 70)); ell(d, ex_, ey_, 3.4 * u, 4.6 * u, (30, 90, 170))
            ell(d, ex_, ey_, 1.9 * u, 2.6 * u, (20, 160, 190)); ell(d, ex_, ey_ + .3 * u, .9 * u, 1.4 * u, (14, 14, 40))

        tx = fc[0] + tn * .22 * rx
        ty_ = fc[1] - ry * .36
        if style in ('mukut', 'ram'):
            poly(d, [(tx - 1.6 * u, ty_ - 3.2 * u), (tx - .9 * u, ty_ + 2.6 * u), (tx + .9 * u, ty_ + 2.6 * u), (tx + 1.6 * u, ty_ - 3.2 * u), (tx + .8 * u, ty_ - 3.2 * u), (tx + .5 * u, ty_ + 1.0 * u), (tx - .5 * u, ty_ + 1.0 * u), (tx - .8 * u, ty_ - 3.2 * u)], (244, 232, 214))
            ell(d, tx, ty_ + 1.6 * u, .7 * u, .8 * u, (210, 50, 56))
        elif style == 'sage':
            for k_ in range(3):
                limb(d, [(tx - 3.2 * u, ty_ - 2.6 * u + k_ * 1.5 * u), (tx + 3.2 * u, ty_ - 2.6 * u + k_ * 1.5 * u)], .7 * u, .7 * u, (240, 236, 228))
        else:
            ell(d, tx, ty_ + .5 * u, .8 * u, 2.4 * u, (214, 50, 56))
        draw_face(d, fc, rx, ry, skin, self.mood, tn, eyes_open, False, hair=hair)
        if self.kw.get('beard'):
            bc = self.kw.get('beard_col', (236, 232, 226))
            my_ = fc[1] + ry * .55
            poly(d, [(fc[0] - rx * .98, fc[1] + ry * .05), (fc[0] - rx * .62, fc[1] + ry * .5), (fc[0] - rx * .3, my_ + 3.2 * u), (fc[0], my_ + 2.4 * u), (fc[0] + rx * .3, my_ + 3.2 * u), (fc[0] + rx * .62, fc[1] + ry * .5), (fc[0] + rx * .98, fc[1] + ry * .05),
                     (fc[0] + rx * .9, fc[1] + ry * 1.5), (fc[0] + rx * .3, fc[1] + ry * 2.1), (fc[0], fc[1] + ry * 2.35), (fc[0] - rx * .3, fc[1] + ry * 2.1), (fc[0] - rx * .9, fc[1] + ry * 1.5)], bc)
            poly(d, [(fc[0] - rx * .3, my_ - .5 * u), (fc[0], my_ - 1.2 * u), (fc[0] + rx * .3, my_ - .5 * u), (fc[0] + rx * .22, my_ + .6 * u), (fc[0] - rx * .22, my_ + .6 * u)], bc)
            limb(d, [(fc[0] - rx * .2, my_ + .8 * u), (fc[0], my_ + 1.5 * u), (fc[0] + rx * .2, my_ + .8 * u)], 1.0 * u, 1.0 * u, (190, 70, 70))

    # ================================================================ Gandhari
    def _gandhari(self):
        u, cx, base = self.u, self.cx, self.base
        skin = SK['fair']
        sari = self.kw.get('sari', (236, 226, 208)); sari_d = dk(sari, .72)
        trim = self.kw.get('trim', (214, 168, 70))
        ty, hy, hr = self.ty, self.hy, self.hr
        # body
        lay, d = self._new()
        poly(d, [(cx - 15 * u, base - 46 * u), (cx - 25 * u, base - 8 * u), (cx - 28 * u, base), (cx + 28 * u, base), (cx + 25 * u, base - 8 * u), (cx + 15 * u, base - 46 * u)], sari)
        for k_ in (-.65, -.3, .05, .4, .72):
            line(d, [(cx + k_ * 11 * u, base - 44 * u), (cx + k_ * 25 * u, base - 2 * u)], sari_d, 1.1 * u * .6)
        poly(d, [(cx - 28 * u, base - 3 * u), (cx + 28 * u, base - 3 * u), (cx + 28 * u, base), (cx - 28 * u, base)], trim)
        poly(d, [(cx - 15 * u, base - 46 * u), (cx + 15 * u, base - 46 * u), (cx + 14.5 * u, base - 43 * u), (cx - 14.5 * u, base - 43 * u)], trim)
        # blouse + torso
        tw = 14.6 * u
        tyt = self.ty
        poly(d, [(cx - tw * .85, tyt), (cx + tw * .85, tyt), (cx + 14 * u, base - 44 * u), (cx - 14 * u, base - 44 * u)], dk((150, 40, 52), 1.0))
        poly(d, [(cx - 6 * u, tyt - 1 * u), (cx + 6 * u, tyt - 1 * u), (cx + 4 * u, tyt + 7 * u), (cx - 4 * u, tyt + 7 * u)], skin)
        # pallu across chest
        poly(d, [(cx - tw * .85, tyt - 1 * u), (cx - 4 * u, tyt - 1 * u), (cx + 15 * u, base - 44 * u), (cx + 2 * u, base - 40 * u)], sari)
        line(d, [(cx - tw * .85, tyt - 1 * u), (cx - 4 * u, tyt - 1 * u), (cx + 15 * u, base - 44 * u)], trim, 1.0 * u * .8)
        for rr in (6, 9):
            pts = [(cx + math.cos(t) * rr * u, tyt + 1 * u + math.sin(t) * (rr + 2) * u * .8) for t in np.linspace(.3, math.pi - .3, 14)]
            line(d, pts, (250, 214, 120), .8 * u)
        ell(d, cx, tyt + 11 * u, 1.3 * u, 1.3 * u, (220, 60, 70))
        self._gandhari_arms(d, skin, sari, trim, tw, tyt)
        self._fin('body', lay, bot_k=.78)
        for eo, nm in ((True, 'head_o'), (False, 'head_c')):
            lay, d = self._new()
            self._gandhari_head(d, eo, skin, sari, trim)
            self._fin(nm, lay, top_k=1.0, bot_k=.9, inner=.35)

    def _gandhari_arms(self, d, skin, sari, trim, tw, tyt):
        u, cx = self.u, self.cx
        ay = tyt + 3 * u
        P_ = self.pose
        AW = 4.8 * u
        sl = dk((150, 40, 52), 1.0)
        if P_ == 'curse':
            # right arm raised, open hand toward viewer; left hand clenched at chest
            limb(d, [(cx + tw - 1 * u, ay), (cx + 26 * u, ay - 4 * u), (cx + 24 * u, ay - 24 * u)], AW, AW * .78, skin)
            hand(d, cx + 24 * u, ay - 26 * u, -math.pi / 2 + .05, 1.25 * u, skin, True)
            limb(d, [(cx - tw + 1 * u, ay), (cx - 22 * u, ay + 12 * u), (cx - 6 * u, ay + 20 * u)], AW, AW * .78, skin)
            ell(d, cx - 5 * u, ay + 20 * u, 3 * u, 3 * u, skin)
        elif P_ == 'namaste':
            limb(d, [(cx - tw + 1 * u, ay), (cx - 20 * u, ay + 13 * u), (cx - 3 * u, ay + 14 * u)], AW, AW * .78, skin)
            limb(d, [(cx + tw - 1 * u, ay), (cx + 20 * u, ay + 13 * u), (cx + 3 * u, ay + 14 * u)], AW, AW * .78, skin)
            hand(d, cx, ay + 13 * u, -math.pi / 2, 1.0 * u, skin, True)
        elif P_ == 'cry':
            limb(d, [(cx - tw + 1 * u, ay), (cx - 20 * u, ay + 12 * u), (cx - 7 * u, ay + 6 * u)], AW, AW * .78, skin)
            limb(d, [(cx + tw - 1 * u, ay), (cx + 20 * u, ay + 12 * u), (cx + 7 * u, ay + 6 * u)], AW, AW * .78, skin)
            ell(d, cx - 6 * u, ay + 4.5 * u, 2.6 * u, 3 * u, skin); ell(d, cx + 6 * u, ay + 4.5 * u, 2.6 * u, 3 * u, skin)
        else:
            limb(d, [(cx - tw + 1 * u, ay), (cx - 19 * u, ay + 20 * u), (cx - 15 * u, ay + 36 * u)], AW, AW * .78, skin)
            limb(d, [(cx + tw - 1 * u, ay), (cx + 19 * u, ay + 20 * u), (cx + 15 * u, ay + 36 * u)], AW, AW * .78, skin)
            hand(d, cx - 15 * u, ay + 38 * u, math.radians(95), .85 * u, skin, False)
            hand(d, cx + 15 * u, ay + 38 * u, math.radians(85), .85 * u, skin, False)
        for sx in (-1, 1):
            ell(d, cx + sx * (tw - 1.5 * u), ay + 2 * u, 2.5 * u, 1.1 * u, (250, 214, 120))

    def _gandhari_head(self, d, eyes_open, skin, sari, trim):
        u, cx, hy, hr = self.u, self.cx, self.hy, self.hr
        tn = self.turn
        fc = (cx + tn * .10 * hr, hy - 3.5 * u)
        rx, ry = hr * .82, hr * 1.0
        hair = (24, 16, 18)
        gold = (250, 214, 120)
        blind = self.kw.get('blind', True)
        poly(d, [(cx - 4 * u, self.ty + 2 * u), (cx - 3.6 * u, hy), (cx + 3.6 * u, hy), (cx + 4 * u, self.ty + 2 * u)], dk(skin, .88))
        for sx in (-1, 1):
            ell(d, fc[0] + sx * rx * 1.0, fc[1] + ry * .1, 1.7 * u, 2.8 * u, dk(skin, .94))
        head_shape(d, fc, rx, ry, skin, True)
        # hair + centre parting under veil
        poly(d, [(fc[0] - rx * 1.05, fc[1] + ry * .1), (fc[0] - rx * 1.02, fc[1] - ry * .55), (fc[0], fc[1] - ry * 1.05), (fc[0] + rx * 1.02, fc[1] - ry * .55), (fc[0] + rx * 1.05, fc[1] + ry * .1),
                 (fc[0] + rx * .78, fc[1] - ry * .45), (fc[0] + rx * .1, fc[1] - ry * .66), (fc[0] - rx * .1, fc[1] - ry * .66), (fc[0] - rx * .78, fc[1] - ry * .45)], hair)
        line(d, [(fc[0], fc[1] - ry * .98), (fc[0], fc[1] - ry * .64)], (200, 40, 48), .8 * u)  # sindoor
        # veil / pallu over head
        poly(d, [(cx - hr * 1.12, hy + 2 * u), (cx - hr * 1.55, self.ty + 9 * u), (cx - hr * 1.3, self.ty + 14 * u), (cx - hr * .9, self.ty + 6 * u), (cx - hr * .62, self.ty - 1 * u)], dk(sari, .86))
        poly(d, [(cx + hr * 1.12, hy + 2 * u), (cx + hr * 1.55, self.ty + 9 * u), (cx + hr * 1.3, self.ty + 14 * u), (cx + hr * .9, self.ty + 6 * u), (cx + hr * .62, self.ty - 1 * u)], dk(sari, .86))
        poly(d, [(cx - hr * 1.18, hy + 2 * u), (cx - hr * 1.12, hy - 9 * u), (cx - hr * .5, hy - hr * 1.55), (cx, hy - hr * 1.7), (cx + hr * .5, hy - hr * 1.55), (cx + hr * 1.12, hy - 9 * u), (cx + hr * 1.18, hy + 2 * u),
                 (cx + hr * .98, hy - 3 * u), (cx + hr * .86, hy - 9.5 * u), (cx + hr * .3, hy - hr * 1.18), (cx - hr * .3, hy - hr * 1.18), (cx - hr * .86, hy - 9.5 * u), (cx - hr * .98, hy - 3 * u)], sari)
        # re-draw hair line under veil edge for depth
        line(d, [(cx - hr * .98, hy - 3 * u), (cx - hr * .86, hy - 9.5 * u), (cx - hr * .3, hy - hr * 1.18), (cx + hr * .3, hy - hr * 1.18), (cx + hr * .86, hy - 9.5 * u), (cx + hr * .98, hy - 3 * u)], trim, .9 * u)
        # maang tikka + bindi
        ell(d, fc[0], fc[1] - ry * .78, 1.1 * u, 1.1 * u, (225, 60, 70)); ell(d, fc[0], fc[1] - ry * .56, 1.3 * u, 1.3 * u, (200, 36, 44))
        # earrings + nath
        for sx in (-1, 1):
            ell(d, fc[0] + sx * rx * 1.0, fc[1] + ry * .45, 1.2 * u, 1.2 * u, gold); ell(d, fc[0] + sx * rx * 1.0, fc[1] + ry * .56, .8 * u, 1.6 * u, (232, 70, 80))
        draw_face(d, fc, rx, ry, skin, self.mood, tn, eyes_open, True, blind=blind, hair=hair)
        if blind:
            # white blindfold band across the eyes with fold lines
            by0, by1 = fc[1] - ry * .22, fc[1] + ry * .10
            poly(d, [(fc[0] - rx * 1.05, by0 + 1 * u), (fc[0], by0 - .8 * u), (fc[0] + rx * 1.05, by0 + 1 * u), (fc[0] + rx * 1.05, by1 + 1 * u), (fc[0], by1 + 1.8 * u), (fc[0] - rx * 1.05, by1 + 1 * u)], (240, 236, 228))
            for k_ in (-.6, -.2, .25, .6):
                line(d, [(fc[0] + k_ * rx, by0 + .2 * u), (fc[0] + k_ * rx * 1.08, by1 + 1.2 * u)], (200, 194, 186), .4 * u)
            line(d, [(fc[0] - rx * 1.05, by1 + 1 * u), (fc[0], by1 + 1.8 * u), (fc[0] + rx * 1.05, by1 + 1 * u)], (186, 180, 172), .5 * u)
            # tear tracks
            for sx in (-1, 1):
                limb(d, [(fc[0] + sx * rx * .44, by1 + 1.6 * u), (fc[0] + sx * rx * .47, fc[1] + ry * .3)], .7 * u, .5 * u, (190, 214, 238))
                ell(d, fc[0] + sx * rx * .47, fc[1] + ry * .33, .8 * u, 1.1 * u, (214, 232, 252))

    # ================================================================ per-frame draw
    def draw(self, frame, cm, t, amp=1.0, blink=True, extra_rot=0.0, alpha=1.0):
        """composite onto float32 frame (screen) using Cam cm"""
        z = cm.z
        ph = self.phase
        breath = math.sin(2 * math.pi * t / 3.4 + ph)
        sway = math.sin(2 * math.pi * t / 5.3 + ph * 1.7)
        bsc = 1 + .011 * breath * amp
        cx, base = self.cx, self.base
        # blink
        closed = False
        if blink and 'head_c' in self.parts and not self.kw.get('blind', False):
            tt = (t + self.blink_off) % 3.6
            closed = tt < .13 or (3.05 < tt < 3.17)
        head = self.parts['head_c' if closed else 'head_o']
        order = ['back', 'body', 'head', 'front']
        for nm in order:
            if nm == 'head':
                sp = head
                rot = math.radians((1.3 * sway + extra_rot) * amp)
                piv = self.neck
                # head follows breathing lift
                lift = -(base - self.neck[1]) * (bsc - 1)
                T = _affine(rot, piv, (0, lift), 1.0)
            elif nm in ('back', 'front'):
                if nm not in self.parts:
                    continue
                sp = self.parts[nm]
                rot = math.radians((1.8 * math.sin(2 * math.pi * t / 4.2 + ph + .8)) * amp) if nm == 'back' else math.radians((1.3 * sway + extra_rot) * amp)
                piv = (cx, self.ty) if nm == 'back' else self.neck
                lift = -(base - self.neck[1]) * (bsc - 1)
                T = _affine(rot, piv, (0, lift), 1.0)
            else:
                sp = self.parts['body']
                T = _affine(0, (cx, base), (0, 0), bsc, sy=bsc)
            _blit_sprite(frame, sp, cm, T, z, alpha)


def _affine(rot, piv, tr, sx, sy=None):
    """3x3 world transform: scale about pivot + rotate about pivot + translate"""
    sy = sx if sy is None else sy
    c, s = math.cos(rot), math.sin(rot)
    A = np.array([[c * sx, -s * sy, 0], [s * sx, c * sy, 0], [0, 0, 1]], np.float64)
    px, py = piv
    A[0, 2] = px - (A[0, 0] * px + A[0, 1] * py) + tr[0]
    A[1, 2] = py - (A[1, 0] * px + A[1, 1] * py) + tr[1]
    return A


import os as _os
SIL = _os.environ.get('SIL') == '1'
SIL_COL = (22, 16, 30)


def _blit_sprite(frame, sp, cm, T, z, alpha=1.0):
    hi = z > 1.28
    img = sp['hi'] if hi else sp['lo']
    k = 1.0 / (RS if hi else 2 * RS / 2.0)
    k = 1.0 / RS if hi else 1.0
    ox, oy = sp['off']
    A = np.array([[k, 0, ox], [0, k, oy], [0, 0, 1]], np.float64)
    M3 = np.vstack([cm.M, [0, 0, 1]]).astype(np.float64)
    Mt = M3 @ T @ A
    out = cv2.warpAffine(img, Mt[:2], (frame.shape[1], frame.shape[0]), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=0)
    a = out[..., 3:4].astype(np.float32) / 255.0 * alpha
    frame *= (1 - a)
    if SIL:  # faceless silhouette mode: flat dark figure, no face details
        frame += a * np.array(SIL_COL, np.float32)
    else:
        frame += out[..., :3].astype(np.float32) * alpha
