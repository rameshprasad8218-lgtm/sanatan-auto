# -*- coding: utf-8 -*-
from kit import *
from kit import _rim, _shade

WHITE = C('f0ece4')


def palace(d, x0, x1, base, h, col):
    poly(d, [(x0, base), (x0, base - h), (x1, base - h), (x1, base)], col)
    n = 5
    w = (x1 - x0) / n
    for i in range(n):
        cx = x0 + w * (i + .5)
        poly(d, [(cx - w * .5, base - h), (cx - w * .5, base - h - 40), (cx, base - h - 80), (cx + w * .5, base - h - 40), (cx + w * .5, base - h)], col)
    for sx in (x0 + 30, x1 - 30):
        ell(d, sx, base - h - 70, 36, 42, col)
        poly(d, [(sx - 34, base - h - 60), (sx, base - h - 130), (sx + 34, base - h - 60)], col)


def s_kunti_open():
    img = vgrad([(0, C('0a0a28')), (.5, C('241650')), (.8, C('4a2a6a')), (1, C('150c22'))])
    stars(img, 140, 61, .7)
    bokeh_c = (255, 190, 110)
    glow(img, 450, 560, 420, (180, 150, 255), .18, 2.0)
    for (x, y, r) in ((140, 460, 40), (760, 700, 50), (100, 900, 36), (780, 380, 30), (700, 1000, 44)):
        glow(img, x, y, r, bokeh_c, .2, 6.0)
    person(img, 450, 1530, 1060, 'fair', 'stand', sari=True, cloth=WHITE, veil=WHITE, face='sad', rim=(255, 200, 130), halo=(210, 190, 255), ground_shadow=False)
    diya(img, 450, 1190, 1.6)
    meta = dict(stars=True, embers=dict(x=450, y=1170, w=60, n=14, col=(255, 190, 90), up=True), pulse=(450, 560, 420), tear=(430, 640))
    return img, meta


def s_lakshagriha():
    img = vgrad([(0, C('1a0a1a')), (.4, C('6a1a1a')), (.7, C('d4501e')), (1, C('1a0a0c'))])
    glow(img, 450, 800, 420, (255, 120, 40), .55, 2.0)
    lay = layer(); d = ImageDraw.Draw(lay)
    palace(d, 150, 750, 1040, 360, C('2a0e14'))
    # windows
    for i in range(4):
        x = 215 + i * 150
        poly(d, [(x - 30, 900), (x - 30, 800), (x, 770), (x + 30, 800), (x + 30, 900)], C('ffb040'))
    blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1050, 10, 3, (.01, .02)), C('140a10'))
    blit(img, lay)
    for k, (x, h) in enumerate(((330, 220), (400, 190), (460, 230), (530, 200), (600, 215))):
        person(img, x, 1170 + (k % 2) * 30, h, 'human', 'stand', cloth=C('2a1a1a'), top=C('2a1a1a'), face='sad', rim=(255, 140, 60), hair=C('0a0608'), ground_shadow=False)
    person(img, 190, 1190, 280, 'fair', 'stand', sari=True, cloth=WHITE, veil=WHITE, face='sad', rim=(255, 140, 60), ground_shadow=False)
    meta = dict(flames=[(250, 780, 120, 260), (450, 760, 140, 300), (650, 790, 120, 250), (350, 640, 100, 200), (550, 620, 110, 230)],
                embers=dict(x=450, y=900, w=600, n=90, col=(255, 150, 50), up=True), smoke=(450, 600))
    return img, meta


def s_forest_walk():
    img = vgrad([(0, C('080a26')), (.45, C('1a2450')), (.75, C('2a3a6a')), (1, C('0e1020'))])
    stars(img, 120, 71, .5)
    moon(img, 640, 330, 44)
    clouds(img, 3, 420, 800, C('5a6aaa'), .25)
    for seed, y, col, hh in ((2, 880, C('1a2244'), 300), (5, 1000, C('0f1630'), 420), (8, 1130, C('080c1c'), 520)):
        lay = layer(); d = ImageDraw.Draw(lay)
        poly(d, ridge(y, 16, seed), col)
        for x in range(-30, 900, 170):
            tree(d, x + seed * 11, y + 10, hh, col, seed=seed)
        blit(img, lay)
    mist(img, 1050, 80, C('7a8ac0'), .22)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1260, 8, 4, (.01,)), C('06081a'))
    blit(img, lay)
    xs = (230, 330, 420, 510, 600, 700)
    person(img, 700, 1250, 400, 'fair', 'stand', sari=True, cloth=WHITE, veil=WHITE, face='sad', rim=(160, 190, 255), flip=True)
    for k, x in enumerate(xs[:-1]):
        person(img, x, 1250 - (k % 2) * 8, 330 - k * 8, 'human', 'stand', cloth=C('b8b0a0'), top=C('5a4a3a'), face='sad', rim=(160, 190, 255), ground_shadow=False)
    meta = dict(stars=True, dust=True, embers=dict(x=450, y=800, w=800, n=30, col=(200, 230, 255), up=True))
    return img, meta


def s_battle():
    img = vgrad([(0, C('2a0e16')), (.4, C('7a2a2a')), (.65, C('c8602f')), (.8, C('7a3a2a')), (1, C('1a0c0c'))])
    clouds(img, 5, 350, 800, C('4a1a1a'), .5, 10)
    sun(img, 450, 760, 46, (255, 150, 90))
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1050, 18, 6), C('240c10'))
    col = C('140608')
    for x, h in ((90, 520), (230, 440), (640, 480), (800, 560)):
        flag(d, x, 1060, h, col, 62)
    # broken chariot wheels
    for cx, cy, r in ((300, 1080, 80), (590, 1090, 70)):
        d.ellipse([(cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S], outline=col + (255,), width=6 * S)
        for k in range(7):
            a = k * math.pi * 2 / 7
            line(d, [(cx, cy), (cx + math.cos(a) * r, cy + math.sin(a) * r)], col, 3)
    # spears and bows
    for x in (170, 450, 720):
        line(d, [(x, 1090), (x + 40, 780)], col, 4)
        poly(d, [(x + 40, 780), (x + 32, 810), (x + 48, 808)], col)
    blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1200, 8, 4, (.012,)), C('0c0406'))
    blit(img, lay)
    meta = dict(smoke=(300, 800), embers=dict(x=450, y=1000, w=800, n=50, col=(255, 150, 70), up=True), dust=True)
    return img, meta


def s_chariot_krishna():
    img = vgrad([(0, C('26305a')), (.35, C('8a5a8a')), (.6, C('f0a068')), (.75, C('ffd998')), (1, C('2a1a28'))])
    sun(img, 560, 800, 60, (255, 215, 150))
    clouds(img, 12, 350, 800, C('ffc8a0'), .35, 8)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1020, 24, 3), C('3a2036'))
    for x in (90, 780):
        palm(d, x, 1030, 380, C('241420'), 20 if x < 400 else -20)
    blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1170, 8, 5, (.01,)), C('1a1020'))
    blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    col = C('1c1020')
    chariot(d, 330, 1160, 320, col)
    horse(d, 600, 1170, 220, col); horse(d, 720, 1180, 220, col)
    flag(d, 180, 1010, 190, col, 56)
    blit(img, lay)
    person(img, 330, 1100, 330, 'krishna', 'rein', cloth=C('f0c040'), crown=True, face='calm', halo=(255, 225, 160), rim=(255, 215, 150), hair=C('1a1018'))
    meta = dict(dust=True, embers=dict(x=450, y=900, w=800, n=34, col=(255, 215, 150), up=True), sunrays=dict(x=560, y=800), pulse=(560, 800, 260))
    return img, meta


def s_kunti_pray():
    img = vgrad([(0, C('2a3860')), (.35, C('8a6a98')), (.6, C('f4b07a')), (.8, C('ffe0a8')), (1, C('2a1c2a'))])
    sun(img, 450, 520, 60, (255, 225, 170))
    clouds(img, 2, 300, 700, C('ffd0b0'), .35, 8)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1050, 14, 7), C('3a2238'))
    blit(img, lay)
    lay = layer(); d = ImageDraw.Draw(lay)
    chariot(d, 640, 1170, 330, C('1c1020'))
    horse(d, 880, 1180, 210, C('1c1020'))
    blit(img, lay)
    person(img, 640, 1110, 330, 'krishna', 'stand', cloth=C('f0c040'), crown=True, face='smile', halo=(255, 230, 170), rim=(255, 220, 160), hair=C('1a1018'), ground_shadow=False)
    person(img, 230, 1240, 520, 'fair', 'namaste', sari=True, cloth=WHITE, veil=WHITE, face='sad', rim=(255, 220, 160), halo=(255, 230, 180))
    meta = dict(dust=True, sunrays=dict(x=450, y=520), embers=dict(x=450, y=900, w=800, n=30, col=(255, 220, 160), up=True), pulse=(450, 520, 260))
    return img, meta


def s_kunti_raise():
    img = vgrad([(0, C('10163a')), (.4, C('3a2a6a')), (.7, C('9a5a7a')), (1, C('1a1020'))])
    stars(img, 100, 81, .5)
    mandala(img, 450, 520, 440, C('ffd890'), .09, 20, 3)
    glow(img, 450, 360, 360, (255, 220, 150), .6, 2.0)
    person(img, 450, 1500, 1020, 'fair', 'raise', sari=True, cloth=WHITE, veil=WHITE, face='sad', rim=(255, 220, 160), halo=(255, 225, 170), ground_shadow=False)
    meta = dict(stars=True, rays=dict(x=450, y=280), petals=dict(n=16, col=(255, 235, 190)), pulse=(450, 360, 360), embers=dict(x=450, y=1000, w=700, n=36, col=(255, 220, 160), up=True))
    return img, meta


def s_krishna_close():
    img = vgrad([(0, C('142a5a')), (.4, C('4a58a0')), (.75, C('b88aa8')), (1, C('2a2038'))])
    for (x, y, r) in ((130, 420, 46), (780, 380, 40), (110, 900, 52), (790, 820, 44), (200, 1150, 40), (700, 1180, 36)):
        glow(img, x, y, r, (255, 210, 150), .26, 6.0)
    mandala(img, 450, 560, 400, C('ffe3a0'), .10, 20, 3)
    glow(img, 450, 560, 380, (255, 225, 160), .32, 2.0)
    person(img, 450, 1520, 1050, 'krishna', 'stand', cloth=C('f4c640'), crown=True, face='smile', halo=(255, 225, 170), rim=(255, 225, 170), hair=C('1a1018'), ground_shadow=False)
    # peacock feather on crown
    lay = layer(); d = ImageDraw.Draw(lay)
    ell(d, 450, 245, 20, 42, C('1d8a8a'))
    ell(d, 450, 240, 10, 22, C('2a4aa8'))
    ell(d, 450, 236, 4, 9, C('f0c040'))
    line(d, [(450, 280), (450, 360)], C('2a7a5a'), 3)
    blit(img, lay)
    meta = dict(petals=dict(n=22, col=(255, 190, 210)), dust=True, pulse=(450, 560, 380))
    return img, meta


def s_kunti_close():
    img = vgrad([(0, C('0c0c2a')), (.5, C('22184a')), (.8, C('3a2a60')), (1, C('150c22'))])
    stars(img, 160, 91, .7)
    glow(img, 450, 560, 400, (190, 170, 255), .22, 2.0)
    person(img, 450, 1530, 1060, 'fair', 'namaste', sari=True, cloth=WHITE, veil=WHITE, face='calm', rim=(210, 190, 255), halo=(210, 190, 255), ground_shadow=False)
    diya(img, 450, 1210, 1.5)
    meta = dict(stars=True, embers=dict(x=450, y=1190, w=60, n=14, col=(255, 190, 90), up=True), pulse=(450, 560, 420))
    return img, meta


def s_diya_end():
    img = vgrad([(0, C('05061a')), (.5, C('140f38')), (.85, C('2a2050')), (1, C('0f0a1c'))])
    stars(img, 300, 101, .9, .08)
    moon(img, 650, 260, 38)
    clouds(img, 11, 500, 900, C('3a3070'), .18)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1180, 24, 5), C('0e0a1c'))
    blit(img, lay)
    mandala(img, 450, 1050, 300, C('f0b050'), .12, 16, 3)
    person(img, 450, 1330, 300, 'fair', 'stand', sari=True, cloth=WHITE, veil=WHITE, face='calm', rim=(255, 200, 130), halo=(255, 200, 130), ground_shadow=False)
    diya(img, 360, 1335, 1.1); diya(img, 540, 1335, 1.1)
    meta = dict(stars=True, embers=dict(x=450, y=1250, w=300, n=26, col=(255, 200, 110), up=True), dust=True)
    return img, meta


def bokeh_dummy():
    pass


SCENES = {
    'open': s_kunti_open, 'laksha': s_lakshagriha, 'forest': s_forest_walk, 'battle': s_battle, 'chariot': s_chariot_krishna,
    'pray': s_kunti_pray, 'raise': s_kunti_raise, 'krishna': s_krishna_close, 'kunti_close': s_kunti_close, 'end': s_diya_end,
}
