# -*- coding: utf-8 -*-
from kit import *
from kit import _rim, _shade

DAWN = [(0, C('1f4f72')), (.3, C('6a7fa8')), (.5, C('e89a96')), (.62, C('ffc98a')), (.7, C('ffe2a8')), (1, C('1a3a4a'))]


def far_bank(img, y, col, seed=3, temples=True):
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(y, 10, seed, (.01, .03)), col)
    if temples:
        shikhara(d, 220, y + 14, 90, 190, col)
        shikhara(d, 330, y + 14, 60, 120, col)
        shikhara(d, 690, y + 14, 100, 210, col)
    for x in (80, 130, 500, 580, 770, 840):
        tree(d, x, y + 20, 150, col, seed=seed)
    blit(img, lay)


def dawn_river(sun_x=560, horizon=900):
    img = vgrad(DAWN)
    clouds(img, 6, 350, 760, C('ffd0b0'), .35, 8)
    sun(img, sun_x, horizon - 30, 58, (255, 210, 150))
    far_bank(img, horizon, C('5a4a6a'))
    mist(img, horizon - 10, 60, C('ffd6b0'), .55)
    water(img, horizon, C('c88f78'), C('1c4458'), .55)
    # golden sun path (soft streak)
    st = np.zeros((WH, WW), np.float32)
    for k in range(60):
        yy = horizon + 6 + k * 11
        ww = 10 + k * 3.2
        cv2.ellipse(st, (sun_x, int(yy)), (int(ww), 3), 0, 0, 360, 1.0 - k / 75, -1)
    st = cv2.GaussianBlur(st, (0, 0), 5)[..., None]
    img += st * np.array((255, 205, 140), np.float32) * 0.55
    return img


def s_ganga_dawn():
    img = dawn_river(560, 900)
    lay = layer(); d = ImageDraw.Draw(lay)
    boat(d, 330, 1060, 380, C('2a1a1a'))
    line(d, [(470, 1050), (545, 1130)], C('2a1a1a'), 5)
    blit(img, lay)
    person(img, 330, 1040, 300, 'dark', 'stand', cloth=C('e6dccb'), face='calm', rim=(255, 210, 150), top=C('e6dccb'), ground_shadow=False)
    # reflection of boat
    meta = dict(shimmer=(900, 1500), birds=[(160, 420, 1), (240, 470, 1), (640, 380, 1), (700, 430, 1)], dust=True, sunrays=dict(x=560, y=870))
    return img, meta


def s_bank():
    img = dawn_river(300, 930)
    lay = layer(); d = ImageDraw.Draw(lay)
    # near right bank
    poly(d, [(430, 1600), (470, 1160), (560, 1115), (900, 1100), (900, 1600)], C('3a2a30'))
    for x in (620, 830):
        tree(d, x, 1120, 420, C('241820'), seed=9)
    blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    boat(d, 230, 1080, 340, C('2a1a1a'))
    blit(img, lay)
    person(img, 270, 1060, 260, 'dark', 'stand', cloth=C('e6dccb'), face='calm', rim=(255, 210, 150), top=C('e6dccb'), ground_shadow=False)
    person(img, 520, 1190, 400, 'ram', 'stand', cloth=C('e8c56a'), face='calm', halo=(255, 220, 150), rim=(255, 215, 160))
    person(img, 640, 1200, 380, 'fair', 'stand', sari=True, cloth=C('c8452f'), veil=C('c8452f'), face='calm', rim=(255, 215, 160))
    person(img, 750, 1210, 360, 'fair', 'stand', cloth=C('d8d0c0'), face='calm', rim=(255, 215, 160), flip=True)
    meta = dict(shimmer=(930, 1500), dust=True, birds=[(180, 430, 1), (260, 480, 1)])
    return img, meta


def bokeh(img, seed, n=26, col=(255, 210, 140), a=.22, rmin=20, rmax=70):
    rnd = random.Random(seed)
    for _ in range(n):
        x, y = rnd.uniform(0, WW), rnd.uniform(200, 1300)
        r = rnd.uniform(rmin, rmax)
        glow(img, x, y, r, col, a * rnd.uniform(.4, 1), 6.0)


def s_kevat_close():
    img = vgrad([(0, C('2a4a60')), (.35, C('b0786e')), (.7, C('f0b878')), (1, C('3a2a30'))])
    bokeh(img, 4)
    glow(img, 450, 560, 360, (255, 215, 150), .45, 2.0)
    person(img, 450, 1520, 1050, 'dark', 'namaste', cloth=C('e6dccb'), face='smile', rim=(255, 215, 150), top=C('e6dccb'), halo=(255, 220, 160), ground_shadow=False)
    meta = dict(petals=dict(n=14, col=(255, 200, 215)), dust=True)
    return img, meta


def s_ram_smile():
    img = vgrad([(0, C('1a3a58')), (.4, C('7a78a8')), (.7, C('f0c088')), (1, C('2a2638'))])
    bokeh(img, 9, col=(255, 230, 170))
    mandala(img, 450, 560, 380, C('ffe0a0'), .10, 18, 3)
    glow(img, 450, 560, 380, (255, 220, 150), .32, 2.0)
    person(img, 450, 1520, 1050, 'ram', 'namaste', cloth=C('f0cb70'), face='smile', rim=(255, 225, 170), crown=True, halo=(255, 220, 160), ground_shadow=False, hair=C('1a1018'))
    meta = dict(petals=dict(n=22, col=(255, 190, 210)), dust=True, pulse=(450, 560, 380))
    return img, meta


def foot(d, cx, top, col, s=1.0, rim=None):
    # front-facing foot: shin on top, toes at bottom
    poly(d, [(cx - 34 * s, top - 300), (cx + 34 * s, top - 300), (cx + 38 * s, top), (cx - 38 * s, top)], col)
    ell(d, cx, top + 70 * s, 54 * s, 100 * s, col)
    for i, (dx, r) in enumerate(((-38, 17), (-19, 15), (0, 14), (18, 13), (35, 11))):
        ell(d, cx + dx * s, top + 165 * s + abs(dx) * .22 * s, r * s, (r + 3) * s, col)
    # anklet
    line(d, [(cx - 38 * s, top - 6), (cx + 38 * s, top - 6)], C('f3c75a'), 7 * s)


def s_feet():
    img = vgrad([(0, C('0f2b3c')), (.5, C('2a5a62')), (1, C('0a1a22'))])
    bokeh(img, 12, 30, (255, 200, 120), .3)
    glow(img, 450, 500, 420, (255, 215, 150), .45, 2.0)
    lay = layer(); d = ImageDraw.Draw(lay)
    foot(d, 360, 640, C('3f78b0'), 1.15)
    foot(d, 560, 640, C('3f78b0'), 1.15)
    lay = _shade(lay, .75)
    lay = _rim(lay, (255, 215, 150), dx=3)
    blit(img, lay)
    # bowl water front
    lay = layer(); d = ImageDraw.Draw(lay)
    # bowl back rim
    ell(d, 460, 880, 380, 95, C('6a3a1c'))
    ell(d, 460, 876, 355, 80, C('1a5666'))
    blit(img, lay)
    # re-draw feet lower part inside water (feet partly submerged: draw toes over water, then translucent water layer)
    lay = layer(); d = ImageDraw.Draw(lay)
    for cx in (360, 560):
        ell(d, cx, 840, 62, 36, C('3f78b0'))
    for i in range(5):
        pass
    blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    ell(d, 460, 890, 350, 78, (40, 130, 150), 140)
    ell(d, 460, 905, 330, 60, (30, 100, 120), 90)
    blit(img, lay)
    # bowl front rim
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, [(80, 890), (840, 890), (760, 1050), (160, 1050)], C('7a4422'))
    ell(d, 460, 1050, 300, 36, C('5a3016'))
    d.arc([80 * S, 800 * S, 840 * S, 980 * S], 0, 180, fill=(210, 150, 80, 255), width=6 * S)
    lay2 = _shade(lay, .65)
    blit(img, lay2)
    # lota (pot) top-right pouring
    lay = layer(); d = ImageDraw.Draw(lay)
    ell(d, 690, 330, 70, 78, C('c98a3a'))
    poly(d, [(650, 270), (730, 270), (718, 235), (662, 235)], C('c98a3a'))
    poly(d, [(620, 345), (560, 380), (572, 395), (630, 372)], C('c98a3a'))
    lay = _rim(lay, (255, 235, 180))
    blit(img, lay)
    # water stream
    lay = layer(); d = ImageDraw.Draw(lay)
    pts = [(566, 392), (548, 450), (520, 560), (500, 700), (492, 820)]
    line(d, pts, (190, 235, 250), 7, 190)
    blit(img, lay)
    glow(img, 495, 820, 60, (220, 245, 255), .4, 2.0)
    # hands holding lota
    lay = layer(); d = ImageDraw.Draw(lay)
    ell(d, 770, 380, 36, 28, C('8a5a3d')); ell(d, 650, 450, 40, 28, C('8a5a3d'))
    line(d, [(850, 420), (770, 385)], C('8a5a3d'), 34)
    line(d, [(900, 560), (655, 452)], C('8a5a3d'), 34)
    blit(img, lay)
    meta = dict(ripple=dict(x=460, y=885, rx=[(360, 880), (560, 885)]), petals=dict(n=10, col=(255, 190, 210), surface=(460, 885)), dust=True,
                pulse=(450, 500, 420))
    return img, meta


def s_ring():
    img = dawn_river(450, 880)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, [(0, 1600), (0, 1150), (300, 1110), (900, 1130), (900, 1600)], C('3a2a30'))
    for x in (80, 800):
        tree(d, x, 1130, 420, C('241820'), seed=2)
    blit(img, lay)
    person(img, 250, 1230, 440, 'dark', 'kneel', cloth=C('e6dccb'), face='smile', rim=(255, 215, 160), top=C('e6dccb'))
    person(img, 610, 1220, 480, 'fair', 'stand', sari=True, cloth=C('c8452f'), veil=C('c8452f'), face='calm', rim=(255, 215, 160), halo=(255, 220, 160))
    # outstretched hand with ring (Sita)
    lay = layer(); d = ImageDraw.Draw(lay)
    line(d, [(560, 880), (470, 905), (400, 920)], C('d6a077'), 20)
    ell(d, 385, 922, 20, 15, C('d6a077'))
    d.ellipse([368 * S, 892 * S, 396 * S, 920 * S], outline=(255, 214, 90, 255), width=5 * S)
    blit(img, lay)
    glow(img, 382, 906, 70, (255, 215, 110), .9, 2.0)
    meta = dict(shimmer=(880, 1500), dust=True, pulse=(382, 906, 80), birds=[(180, 420, 1), (260, 470, 1)])
    return img, meta


def s_cross():
    img = dawn_river(450, 860)
    sun_glow = (450, 800)
    glow(img, 450, 820, 330, (255, 215, 150), .55, 2.0)
    lay = layer(); d = ImageDraw.Draw(lay)
    boat(d, 450, 1020, 480, C('1a1012'))
    blit(img, lay)
    person(img, 330, 1000, 300, 'ram', 'stand', cloth=C('e8c56a'), face='calm', rim=(255, 225, 170), ground_shadow=False)
    person(img, 450, 1005, 270, 'fair', 'stand', sari=True, cloth=C('c8452f'), veil=C('c8452f'), face='calm', rim=(255, 225, 170), ground_shadow=False)
    person(img, 560, 1000, 285, 'fair', 'stand', cloth=C('d8d0c0'), face='calm', rim=(255, 225, 170), flip=True, ground_shadow=False)
    person(img, 690, 1015, 290, 'dark', 'stand', cloth=C('e6dccb'), face='smile', rim=(255, 225, 170), top=C('e6dccb'), ground_shadow=False)
    line_img = None
    meta = dict(shimmer=(860, 1500), birds=[(150, 400, 1), (240, 450, 1), (700, 390, 1), (780, 440, 1)], dust=True, pulse=(450, 820, 330))
    return img, meta


SCENES = {'ganga_dawn': s_ganga_dawn, 'bank': s_bank, 'kevat_close': s_kevat_close, 'ram_smile': s_ram_smile, 'feet': s_feet, 'ring': s_ring, 'cross': s_cross}
