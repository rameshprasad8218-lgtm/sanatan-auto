# -*- coding: utf-8 -*-
from kit import *
from kit import _rim, _shade

NIGHT = [(0, C('0b0a2a')), (.45, C('2a1448')), (.7, C('7a2c58')), (.82, C('c8582f')), (1, C('1c0c18'))]


def pyre(d, cx, base, w, h, col):
    for i in range(6):
        y = base - i * (h / 6)
        ww = w * (1 - i * .13)
        poly(d, [(cx - ww / 2, y), (cx + ww / 2, y), (cx + ww / 2, y - h / 6 * .8), (cx - ww / 2, y - h / 6 * .8)], col)
        for k in range(4):
            ell(d, cx - ww / 2 + k * ww / 3, y - h / 12, 6, h / 14, tuple(int(c * 1.3) for c in col))


def ravana(img, cx, base, h):
    """dark crowned figure with an arc of heads"""
    lay = layer(); d = ImageDraw.Draw(lay)
    u = h / 100
    col = C('1a0f1e')
    for k, a in enumerate(np.linspace(-1.15, 1.15, 9)):
        hx = cx + math.sin(a) * 30 * u
        hy = base - 90 * u - math.cos(a) * 12 * u
        ell(d, hx, hy, 6 * u, 7 * u, col)
        poly(d, [(hx - 5 * u, hy - 4 * u), (hx, hy - 12 * u), (hx + 5 * u, hy - 4 * u)], col)
    poly(d, [(cx - 14 * u, base - 85 * u), (cx - 24 * u, base - 20 * u), (cx + 24 * u, base - 20 * u), (cx + 14 * u, base - 85 * u)], col)
    for sgn in (-1, 1):
        line(d, [(cx + sgn * 12 * u, base - 80 * u), (cx + sgn * 34 * u, base - 62 * u), (cx + sgn * 44 * u, base - 80 * u)], col, 4 * u)
        line(d, [(cx + sgn * 12 * u, base - 70 * u), (cx + sgn * 40 * u, base - 46 * u), (cx + sgn * 50 * u, base - 58 * u)], col, 4 * u)
    ell(d, cx, base - 92 * u, 9 * u, 10 * u, col)
    poly(d, [(cx - 8 * u, base - 96 * u), (cx, base - 112 * u), (cx + 8 * u, base - 96 * u)], col)
    lay = _rim(lay, (255, 90, 60), dx=3)
    glow(img, cx, base - 92 * u, 16 * u, (255, 40, 30), 0.35, 2.0)
    blit(img, lay)


def s_pyre(variant=0):
    img = vgrad(NIGHT)
    stars(img, 150, 11)
    moon(img, 690, 330, 34)
    clouds(img, 5, 380, 700, C('9a5a8a'), 0.18)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(930, 26, 7), C('241022'))
    for x in (60, 810):
        tree(d, x, 960, 360, C('170a18'))
    blit(img, lay)
    # ground
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1040, 12, 3, (0.01, 0.02)), C('1a0b16'))
    blit(img, lay)
    glow(img, 450, 960, 230, (255, 120, 40), 0.75, 2.0)
    lay = layer(); d = ImageDraw.Draw(lay)
    pyre(d, 450, 1075, 330, 190, C('4a2412'))
    blit(img, lay)
    person(img, 205, 1110, 330, 'ram', 'namaste', cloth=C('e8c56a'), face='sad', halo=(255, 210, 140), rim=(255, 140, 70), top=C('b89a5b'))
    person(img, 700, 1115, 310, 'fair', 'stand', cloth=C('d8d0c0'), face='sad', rim=(255, 140, 70), flip=True)
    meta = dict(stars=True, flames=[(450, 1000, 260, 360)], embers=dict(x=450, y=1000, w=200, n=70, col=(255, 160, 60)),
                smoke=(450, 760), glow=[(450, 960, 230, (255, 120, 40))])
    return img, meta


def s_jatayu_sun():
    img = vgrad([(0, C('2a1650')), (.35, C('a2406c')), (.58, C('f08a3c')), (.72, C('ffd27a')), (1, C('2a1228'))])
    sun(img, 450, 700, 70)
    clouds(img, 8, 300, 800, C('ffb48a'), 0.3, 8)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1000, 30, 4), C('4a1e3a'))
    blit(img, lay)
    mist(img, 1000, 70, C('f08a5a'), 0.45)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1080, 26, 9), C('2a1030'))
    for x in (120, 350, 600, 800):
        tree(d, x, 1100, 300, C('1b0c22'), seed=3)
    blit(img, lay)
    bird_flying(img, 450, 560, 640, C('140a1a'), tilt=-0.06, rim=(255, 200, 120), halo=(255, 170, 90))
    meta = dict(birds=[(80, 300, 1), (150, 380, 1), (730, 330, 1)])
    return img, meta


def s_chariot():
    img = vgrad([(0, C('160a2a')), (.4, C('5a1a3e')), (.62, C('b8362f')), (.78, C('e06a32')), (1, C('1a0a14'))])
    stars(img, 80, 21, 0.4)
    clouds(img, 3, 500, 900, C('7a2a4a'), 0.4, 9)
    glow(img, 330, 760, 240, (255, 90, 50), 0.4, 2.0)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1180, 28, 12), C('220a1c'))
    blit(img, lay)
    # flying chariot silhouette
    lay = layer(); d = ImageDraw.Draw(lay)
    col = C('160a18')
    chariot(d, 450, 840, 280, col)
    horse(d, 700, 860, 150, col); horse(d, 790, 880, 150, col)
    flag(d, 330, 700, 120, col)
    blit(img, lay)
    ravana(img, 450, 760, 250)
    person(img, 520, 790, 150, 'fair', 'sit', sari=True, cloth=C('f0e8da'), veil=C('f0e8da'), face='sad', rim=(255, 120, 80), shade=False, ground_shadow=False)
    meta = dict(stars=True, clouds_drift=True, embers=dict(x=450, y=900, w=700, n=30, col=(255, 110, 60)))
    return img, meta


def s_clash():
    img = vgrad([(0, C('1d0c2e')), (.4, C('6a2250')), (.65, C('d4542f')), (.8, C('f2a050')), (1, C('1a0a14'))])
    stars(img, 60, 5, 0.35)
    clouds(img, 14, 400, 900, C('b8502f'), 0.35, 9)
    glow(img, 450, 760, 260, (255, 140, 60), 0.5, 2.0)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1230, 30, 13), C('1c0a18'))
    blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    chariot(d, 640, 820, 230, C('160a18'))
    horse(d, 820, 840, 130, C('160a18'))
    blit(img, lay)
    ravana(img, 640, 735, 215)
    bird_flying(img, 270, 640, 560, C('140a1a'), tilt=0.28, rim=(255, 190, 110), halo=(255, 150, 80), droop=-0.1)
    meta = dict(stars=True, feathers=dict(x=450, y=700), flash=dict(x=520, y=700, at=0.58), embers=dict(x=450, y=900, w=700, n=26, col=(255, 130, 60)))
    return img, meta


def s_fallen():
    img = vgrad([(0, C('080822')), (.5, C('1c1244')), (.78, C('3a1e4a')), (1, C('120a18'))])
    stars(img, 170, 31)
    moon(img, 220, 300, 46)
    clouds(img, 9, 450, 800, C('5a4a8a'), .2)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(950, 26, 21), C('1a1030'))
    palm(d, 720, 1000, 380, C('0d0a1e'), -30)
    tree(d, 90, 1020, 320, C('0d0a1e'))
    blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1020, 10, 3, (.01, .02)), C('150c22'))
    for i in range(12):
        feather(d, 170 + i * 52, 1060 + (i % 3) * 26, (i * .7) % 3.1, 38, C('1c0f28'))
    blit(img, lay)
    glow(img, 450, 1030, 380, (110, 120, 220), 0.55, 2.0)
    glow(img, 300, 330, 300, (110, 120, 220), 0.25, 2.0)
    eye = bird_fallen(img, 450, 1060, 620, C('5c4c80'), rim=(215, 222, 255))
    glow(img, eye[0], eye[1], 24, (255, 210, 130), 0.9, 2.0)
    meta = dict(stars=True, eye=eye, dust=True, feathers=dict(x=450, y=500, n=7))
    return img, meta


def s_walk():
    img = vgrad([(0, C('2a1a48')), (.4, C('8a3a5a')), (.62, C('f0974a')), (.8, C('f8c882')), (1, C('2a1420'))])
    sun(img, 450, 640, 56, (255, 190, 120))
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(900, 26, 17), C('6a2a44'))
    blit(img, lay)
    mist(img, 930, 70, C('f4a870'), .5)
    for seed, y, col in ((2, 980, C('44203a')), (5, 1080, C('2a1230')), (7, 1180, C('180a1e'))):
        lay = layer(); d = ImageDraw.Draw(lay)
        poly(d, ridge(y, 20, seed), col)
        for x in range(-20, 900, 230 if col[0] > 30 else 260):
            bamboo(d, x + seed * 13, y + 20, 360 if y < 1100 else 520, col, seed)
        blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1230, 8, 4, (.01,)), C('120818'))
    blit(img, lay)
    person(img, 330, 1230, 360, 'ram', 'stand', cloth=C('e8c56a'), face='sad', rim=(255, 190, 120), halo=None)
    person(img, 500, 1250, 370, 'fair', 'stand', cloth=C('d8d0c0'), face='sad', rim=(255, 190, 120))
    # bows
    lay = layer(); d = ImageDraw.Draw(lay)
    bow(d, 262, 1060, 120, C('3a2010')); bow(d, 570, 1075, 120, C('3a2010'))
    blit(img, lay)
    meta = dict(dust=True, rays=dict(x=450, y=640), embers=dict(x=450, y=900, w=700, n=34, col=(255, 210, 140), up=False))
    return img, meta


def s_lap():
    img = vgrad([(0, C('1a1038')), (.5, C('50264e')), (.75, C('a04a3c')), (1, C('1a0c18'))])
    stars(img, 70, 41, .4)
    clouds(img, 4, 300, 700, C('8a4a6a'), .25)
    mandala(img, 450, 560, 420, C('f0b050'), .10, 18, 3)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1100, 20, 8), C('241228'))
    blit(img, lay)
    glow(img, 450, 560, 340, (255, 200, 120), .5, 2.0)
    person(img, 450, 1220, 560, 'ram', 'sit', cloth=C('e8c56a'), face='sad', halo=(255, 200, 130), rim=(255, 200, 130))
    # bird across his lap
    lay = layer(); d = ImageDraw.Draw(lay)
    col = C('3a2a48')
    ell(d, 450, 1085, 210, 40, col)
    poly(d, [(250, 1070), (140, 1100), (110, 1140), (170, 1150), (250, 1120)], col)
    for i in range(5):
        poly(d, [(130 + i * 14, 1120 + i * 6), (100 + i * 12, 1170 + i * 7), (165 + i * 14, 1150 + i * 6)], col)
    ell(d, 665, 1055, 28, 26, col)
    poly(d, [(685, 1050), (730, 1068), (688, 1074)], col)
    lay = _rim(lay, (255, 210, 140))
    blit(img, lay)
    # Lakshman
    person(img, 745, 1190, 330, 'fair', 'stand', cloth=C('d8d0c0'), face='sad', rim=(255, 200, 130), flip=True, ground_shadow=False)
    meta = dict(stars=True, rays=dict(x=450, y=250), tear=(480, 790), embers=dict(x=450, y=1000, w=600, n=30, col=(255, 220, 150), up=True))
    return img, meta


def s_night_end():
    img = vgrad([(0, C('06061c')), (.5, C('1a1248')), (.8, C('3c2a6a')), (1, C('120a1e'))])
    stars(img, 240, 51, .8, .08)
    moon(img, 620, 250, 38)
    clouds(img, 17, 500, 900, C('4a3a8a'), .2)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1160, 24, 9), C('120a24'))
    blit(img, lay)
    person(img, 450, 1290, 330, 'ram', 'namaste', cloth=C('e8c56a'), face='calm', halo=(150, 180, 255), rim=(150, 180, 255))
    meta = dict(stars=True, spirit=True, embers=dict(x=450, y=1000, w=500, n=34, col=(255, 210, 140), up=True))
    return img, meta


SCENES = {
    'pyre': s_pyre, 'sun': s_jatayu_sun, 'chariot': s_chariot, 'clash': s_clash, 'fallen': s_fallen,
    'walk': s_walk, 'lap': s_lap, 'night_end': s_night_end,
}
