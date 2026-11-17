# -*- coding: utf-8 -*-
from kit import *
import rig

GOLD = (250, 214, 120)


def face_xy(a):
    """world position of an actor's face centre"""
    return (a.cx + a.turn * .1 * a.hr, a.hy - 3.5 * a.u)


def wheel(d, x, y, r, col, tilt=1.0):
    d.ellipse([(x - r) * S, (y - r * tilt) * S, (x + r) * S, (y + r * tilt) * S], outline=tuple(col) + (255,), width=int(max(r * .09, 2) * S))
    for k in range(8):
        a = k * math.pi / 4
        line(d, [(x, y), (x + math.cos(a) * r, y + math.sin(a) * r * tilt)], col, max(r * .05, 1.5))
    ell(d, x, y, r * .12, r * .12 * tilt, col)


def debris(img, ground_y, col, seed=3, spears=True, dense=1.0):
    rnd = random.Random(seed)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(ground_y, 10, seed, (.01, .025)), col)
    for i in range(int(14 * dense)):
        x = rnd.uniform(-20, WW + 20)
        h = rnd.uniform(120, 300)
        a = rnd.uniform(-.5, .5)
        line(d, [(x, ground_y + 14), (x + math.sin(a) * h, ground_y + 14 - math.cos(a) * h)], col, 3.2)
        if rnd.random() < .5:
            poly(d, [(x + math.sin(a) * h, ground_y + 14 - math.cos(a) * h), (x + math.sin(a) * (h + 26) + 6, ground_y + 14 - math.cos(a) * (h + 26)), (x + math.sin(a) * h - 6, ground_y + 14 - math.cos(a) * h + 6)], col)
        else:
            flag(d, x, ground_y + 14, h, col, 52)
    for x in (120, 540, 780):
        wheel(d, x + rnd.uniform(-30, 30), ground_y + rnd.uniform(10, 40), rnd.uniform(50, 90), col, .9)
    bow(d, 300, ground_y + 20, 70, col, -1.2, 1.2)
    blit(img, lay)


def sky(stops, stars_n=0):
    img = vgrad(stops)
    if stars_n:
        stars(img, stars_n, 9, .55)
    return img


# ----------------------------------------------------------------- scenes
def s_hook_gandhari():
    img = sky([(0, C('10040c')), (.3, C('3a0a16')), (.55, C('9a2c1c')), (.72, C('e0702c')), (.78, C('3a0e0e')), (1, C('0c0406'))])
    sun(img, 450, 1010, 110, (255, 150, 70))
    clouds(img, 4, 500, 900, C('5a1a1a'), .45, 7, 1.3)
    mist(img, 1080, 90, C('7a2a1c'), .4)
    debris(img, 1120, C('140608'), 5, dense=1.2)
    a = rig.Actor('gandhari', 450, 1560, 1100, mood='angry', turn=-.12, pose='curse', rim=(255, 150, 90))
    glow(img, face_xy(a)[0], face_xy(a)[1], 300, (255, 90, 60), .22, 2.0)
    meta = dict(actors=[a], embers=dict(x=450, y=1200, w=900, n=40, col=(255, 150, 70), up=True), dust=True, smoke=(450, 900))
    return img, meta


def s_hook_krishna():
    img = sky([(0, C('070c28')), (.4, C('14306a')), (.75, C('2a5a9a')), (1, C('0a1020'))], 90)
    mandala(img, 450, 560, 520, (255, 210, 110), .22, 18, 3)
    a = rig.Actor('krishna', 450, 1560, 1100, mood='smile', turn=.08, pose='stand', rim=(255, 220, 150))
    fx, fy = face_xy(a)
    glow(img, fx, fy, 420, (255, 200, 110), .45, 2.0)
    glow(img, fx, fy, 160, (255, 240, 200), .30, 2.0)
    meta = dict(actors=[a], stars=True, petals=dict(n=18, col=(255, 200, 215)), embers=dict(x=450, y=1200, w=800, n=34, col=(255, 224, 150), up=True), pulse=(fx, fy, 380))
    return img, meta


def s_battlefield():
    img = sky([(0, C('140a24')), (.3, C('4a1a3a')), (.55, C('c0502e')), (.7, C('f0a040')), (.74, C('2a1018')), (1, C('0c0608'))])
    sun(img, 450, 1030, 90, (255, 170, 90))
    clouds(img, 7, 450, 850, C('7a2a3a'), .4, 8, 1.4)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1020, 26, 2, (.006, .014)), C('2a1018'))
    blit(img, lay)
    mist(img, 1100, 120, C('b0603a'), .35)
    debris(img, 1170, C('0e0508'), 8, dense=1.5)
    a = rig.Actor('gandhari', 450, 1300, 380, mood='sad', turn=.0, pose='stand', rim=(255, 170, 100), blind=True)
    meta = dict(actors=[a], birds=[(120, 500, 1), (220, 560, 1), (640, 470, 1), (720, 540, 1), (330, 430, 1)], dust=True, smoke=(450, 1000),
                embers=dict(x=450, y=1250, w=900, n=26, col=(255, 140, 60), up=True), sunrays=dict(x=450, y=1030))
    return img, meta


def s_lights():
    img = sky([(0, C('06081c')), (.35, C('141c4a')), (.62, C('2a3a7a')), (.72, C('3a2a50')), (1, C('08060c'))], 130)
    moon(img, 650, 330, 52)
    clouds(img, 3, 420, 800, C('4a5a9a'), .22)
    debris(img, 1180, C('07050c'), 11, dense=1.2)
    mist(img, 1130, 110, C('4a5a9a'), .3)
    a = rig.Actor('gandhari', 450, 1340, 520, mood='sad', turn=.0, pose='stand', rim=(160, 190, 255), blind=True)
    meta = dict(actors=[a], stars=True, embers=dict(x=450, y=1180, w=900, n=100, col=(255, 214, 120), up=True), pulse=(450, 900, 520))
    return img, meta


def s_blind():
    img = sky([(0, C('080a22')), (.5, C('1a2250')), (1, C('0a0a18'))], 80)
    glow(img, 450, 900, 520, (80, 110, 220), .22, 2.0)
    a = rig.Actor('gandhari', 450, 1560, 1100, mood='sad', turn=.0, pose='cry', rim=(160, 190, 255), blind=True)
    cx, cy = a.cx, a.ty + 11 * a.u
    glow(img, cx, cy, 190, (255, 90, 70), .35, 2.0)
    meta = dict(actors=[a], stars=True, tear=(face_xy(a)[0] - 30, face_xy(a)[1] + 70), dust=True, pulse=(cx, cy, 260))
    return img, meta


def s_arrive():
    img = sky([(0, C('1a0e2a')), (.35, C('5a2a4a')), (.6, C('e08a44')), (.78, C('3a1a1a')), (1, C('0c0608'))])
    sun(img, 450, 900, 120, (255, 200, 130))
    clouds(img, 5, 480, 800, C('8a3a4a'), .4, 8, 1.3)
    debris(img, 1190, C('100608'), 14, dense=1.0)
    mist(img, 1180, 90, C('c07a4a'), .3)
    g = rig.Actor('gandhari', 235, 1500, 880, mood='sad', turn=.45, pose='stand', rim=(255, 190, 120), blind=True)
    k = rig.Actor('krishna', 650, 1410, 720, mood='calm', turn=-.45, pose='stand', rim=(255, 215, 150))
    glow(img, 650, 880, 260, (255, 210, 130), .35, 2.0)
    meta = dict(actors=[g, k], sunrays=dict(x=450, y=900), dust=True, embers=dict(x=450, y=1250, w=800, n=24, col=(255, 200, 120), up=True))
    return img, meta


def s_curse():
    img = sky([(0, C('0c0208')), (.4, C('3a0a14')), (.7, C('8a1a1c')), (1, C('120406'))])
    clouds(img, 9, 300, 900, C('6a1418'), .5, 9, 1.5)
    debris(img, 1230, C('0c0406'), 21, dense=.8)
    g = rig.Actor('gandhari', 300, 1560, 1000, mood='angry', turn=.3, pose='curse', rim=(255, 80, 60), blind=True)
    k = rig.Actor('krishna', 690, 1500, 700, mood='calm', turn=-.4, pose='stand', rim=(255, 215, 150))
    glow(img, 690, 1000, 240, (255, 210, 130), .25, 2.0)
    meta = dict(actors=[g, k], flash=dict(at=.12, x=470, y=620), embers=dict(x=450, y=1200, w=900, n=44, col=(255, 70, 40), up=True), smoke=(450, 800), pulse=(520, 520, 400))
    return img, meta


def s_krishna_calm():
    img = sky([(0, C('0a1030')), (.45, C('1c3a78')), (.8, C('c08a4a')), (1, C('0c0a14'))], 60)
    mandala(img, 450, 640, 560, (255, 210, 110), .2, 18, 3)
    a = rig.Actor('krishna', 450, 1560, 1100, mood='calm', turn=.0, pose='namaste', rim=(255, 220, 150))
    fx, fy = face_xy(a)
    glow(img, fx, fy, 440, (255, 205, 120), .5, 2.0)
    meta = dict(actors=[a], stars=True, petals=dict(n=16, col=(255, 200, 215)), embers=dict(x=450, y=1250, w=800, n=30, col=(255, 224, 150), up=True), pulse=(fx, fy, 380), rays=dict(x=450, y=300))
    return img, meta


def s_two():
    img = sky([(0, C('140c2a')), (.4, C('6a3a5a')), (.62, C('f0a050')), (.8, C('3a2020')), (1, C('0c0808'))])
    sun(img, 450, 840, 130, (255, 214, 140))
    clouds(img, 12, 430, 760, C('9a5a5a'), .35, 8, 1.4)
    debris(img, 1210, C('140a0a'), 17, dense=.7)
    mist(img, 1200, 80, C('d08a5a'), .3)
    g = rig.Actor('gandhari', 235, 1500, 870, mood='sad', turn=.5, pose='cry', rim=(255, 200, 130), blind=True)
    k = rig.Actor('krishna', 665, 1470, 800, mood='calm', turn=-.5, pose='namaste', rim=(255, 225, 160))
    glow(img, 665, 900, 280, (255, 214, 140), .35, 2.0)
    meta = dict(actors=[g, k], sunrays=dict(x=450, y=840), dust=True, petals=dict(n=14, col=(255, 210, 160)), pulse=(450, 840, 360))
    return img, meta


def s_bow():
    img = sky([(0, C('1a1030')), (.5, C('7a4a5a')), (.8, C('f0b060')), (1, C('1a1010'))])
    glow(img, 450, 760, 520, (255, 214, 140), .4, 2.0)
    mandala(img, 450, 760, 520, (255, 220, 140), .16, 18, 3)
    a = rig.Actor('krishna', 450, 1560, 1100, mood='calm', turn=.0, pose='namaste', rim=(255, 225, 160))
    meta = dict(actors=[a], petals=dict(n=24, col=(255, 200, 215)), embers=dict(x=450, y=1250, w=800, n=34, col=(255, 224, 150), up=True), pulse=(450, 700, 420), dust=True)
    return img, meta


def s_dwarka():
    img = sky([(0, C('060a1e')), (.3, C('1a2450')), (.55, C('5a3a6a')), (.68, C('e08a50')), (.72, C('2a1a3a')), (1, C('08060e'))], 120)
    sun(img, 450, 1010, 80, (255, 170, 100))
    clouds(img, 6, 450, 850, C('6a4a7a'), .3, 7, 1.3)
    lay = layer(); d = ImageDraw.Draw(lay)
    col = C('120a1e')
    for x, w, h in ((190, 130, 260), (330, 100, 200), (450, 140, 360), (580, 110, 230), (720, 130, 280)):
        shikhara(d, x, 1030, w, h, col)
    poly(d, [(100, 1030), (100, 960), (800, 960), (800, 1030)], col)
    blit(img, lay)
    water(img, 1030, C('2a1a3a'), C('080610'), .55)
    meta = dict(shimmer=(1030, 1600), ripple=dict(x=450, y=1150, rx=[(300, 1150), (600, 1180)]), stars=True, dust=True, birds=[(160, 520, 1), (250, 560, 1)], embers=dict(x=450, y=1200, w=900, n=20, col=(255, 190, 110), up=True))
    return img, meta


def s_end():
    img = sky([(0, C('070c28')), (.4, C('14306a')), (.75, C('2a5a9a')), (1, C('0a1020'))], 90)
    mandala(img, 450, 560, 520, (255, 210, 110), .22, 18, 3)
    a = rig.Actor('krishna', 450, 1560, 1100, mood='smile', turn=.08, pose='flute', rim=(255, 220, 150))
    fx, fy = face_xy(a)
    glow(img, fx, fy, 420, (255, 200, 110), .45, 2.0)
    meta = dict(actors=[a], stars=True, petals=dict(n=18, col=(255, 200, 215)), embers=dict(x=450, y=1200, w=800, n=34, col=(255, 224, 150), up=True), pulse=(fx, fy, 380))
    return img, meta


SCENES = dict(hook_g=s_hook_gandhari, hook_k=s_hook_krishna, battle=s_battlefield, lights=s_lights, blind=s_blind, arrive=s_arrive, curse=s_curse,
              calm=s_krishna_calm, two=s_two, bow=s_bow, dwarka=s_dwarka, end=s_end)
