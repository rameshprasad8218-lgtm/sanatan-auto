# -*- coding: utf-8 -*-
from kit import *
import rig
from bgs import *

TAG = 'कृष्ण · भक्ति कथा'


def krish(cx, base, h, mood='smile', turn=0.0, pose='stand', **kw):
    return rig.Actor('krishna', cx, base, h, mood=mood, turn=turn, pose=pose, rim=(255, 220, 150), **kw)


def vidurani(cx, base, h, mood='smile', turn=0.0, pose='namaste'):
    return rig.Actor('female', cx, base, h, mood=mood, turn=turn, pose=pose, rim=(255, 210, 140), sari=(236, 196, 84), trim=(200, 90, 60), blind=False)


def hut_bg(img):
    img[:] = vgrad([(0, C('3a2410')), (.6, C('7a4a24')), (1, C('1a0e06'))])
    lay = layer(); d = ImageDraw.Draw(lay)
    for x in range(0, WW, 60):
        line(d, [(x, 0), (x + 10, 1250)], (30, 16, 6), 3, 90)
    poly(d, [(0, 1150), (WW, 1150), (WW, WH), (0, WH)], C('4a2c14'))
    blit(img, lay)
    glow(img, 450, 760, 500, (255, 190, 100), .28, 2.0)
    diya(img, 110, 1100, 1.4)
    diya(img, 790, 1100, 1.4)


def plate(img, cx, y, peel=True, r=130):
    lay = layer(); d = ImageDraw.Draw(lay)
    ell(d, cx, y, r, r * .3, C('c8a040')); ell(d, cx, y - 4, r * .86, r * .22, C('f0d070'))
    if peel:
        for k, a in enumerate((-.8, -.3, .2, .7)):
            x = cx + a * r * .6
            poly(d, [(x - 22, y - 8), (x + 8, y - 60 + k % 2 * 12), (x + 30, y - 8)], C('e8c030'))
            poly(d, [(x - 8, y - 8), (x + 10, y - 40), (x + 22, y - 8)], C('c89a1a'))
    blit(img, lay)


def s_hook():
    hut_bg(img := np.zeros((WH, WW, 3), np.float32))
    plate(img, 450, 1230)
    a = krish(450, 1560, 1050, 'smile', .05)
    fx, fy = a.cx, a.hy - 3.5 * a.u
    glow(img, fx, fy, 380, (255, 200, 110), .4, 2.0)
    meta = dict(actors=[a], dust=True, embers=dict(x=450, y=1200, w=700, n=26, col=(255, 224, 150), up=True), pulse=(fx, fy, 340), tear=(fx + 52, fy + 50))
    return img, meta


def s_hastina():
    img = vgrad([(0, C('1a1030')), (.4, C('6a3a5a')), (.65, C('f0a050')), (1, C('1a1010'))])
    sun(img, 450, 860, 100, (255, 214, 140))
    palace_arches(img, 1150, C('2a1628'), 4)
    floor(img, 1150, C('4a2a24'), C('120a08'))
    k = krish(450, 1480, 880, 'calm', .1)
    glow(img, 450, 760, 320, (255, 214, 140), .3, 2.0)
    meta = dict(actors=[k], sunrays=dict(x=450, y=860), dust=True, birds=[(160, 520, 1), (250, 560, 1)], embers=dict(x=450, y=1200, w=800, n=18, col=(255, 200, 120), up=True))
    return img, meta


def s_feast():
    img = vgrad([(0, C('2a0a28')), (.5, C('6a1a3a')), (1, C('1a0612'))])
    glow(img, 450, 700, 560, (255, 200, 90), .3, 2.0)
    palace_arches(img, 1100, C('3a1230'), 4)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, [(0, 1090), (WW, 1090), (WW, 1180), (0, 1180)], C('6a3a1a'))
    for i in range(9):
        x = 60 + i * 98
        ell(d, x, 1075, 44, 13, C('f0c040')); ell(d, x, 1067, 30, 9, C('c0602a' if i % 2 else 'e0a030'))
    blit(img, lay)
    floor(img, 1180, C('3a1228'), C('100410'))
    dur = rig.Actor('male', 270, 1500, 900, mood='angry', turn=.4, pose='stand', rim=(255, 170, 100), head='ram', feather=False, skin=(150, 100, 80), dhoti=(120, 40, 130), shawl=(200, 160, 60), garland=False)
    meta = dict(actors=[dur], dust=True, embers=dict(x=450, y=1100, w=900, n=40, col=(255, 200, 90), up=True), pulse=(450, 800, 500))
    return img, meta


def s_path():
    img = vgrad([(0, C('10142e')), (.4, C('3a3a6a')), (.7, C('e08a50')), (1, C('1a1010'))])
    stars(img, 50, 6, .4)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1100, 16, 4, (.006, .014)), C('1a1220'))
    hut(d, 690, 1090, 260, 240, C('2a1a14'), C('3a2418'))
    blit(img, lay)
    glow(img, 690, 1000, 120, (255, 190, 100), .5, 2.0)
    floor(img, 1180, C('2a1a14'), C('0c0806'))
    k = krish(330, 1420, 760, 'smile', .35)
    meta = dict(actors=[k], stars=True, dust=True, sunrays=dict(x=690, y=900), embers=dict(x=500, y=1200, w=800, n=18, col=(255, 200, 120), up=True))
    return img, meta


def s_hut():
    hut_bg(img := np.zeros((WH, WW, 3), np.float32))
    plate(img, 450, 1250)
    v = vidurani(250, 1520, 980, 'joy', .4, 'namaste')
    k = krish(660, 1500, 860, 'smile', -.4)
    meta = dict(actors=[v, k], dust=True, embers=dict(x=450, y=1200, w=800, n=24, col=(255, 224, 150), up=True), petals=dict(n=10, col=(255, 200, 215)), tear=(250 + 40, 760), pulse=(450, 820, 420))
    return img, meta


def s_bhaav():
    img = vgrad([(0, C('080c30')), (.4, C('1a3a80')), (.8, C('c8984a')), (1, C('0c0a14'))])
    mandala(img, 450, 650, 580, (255, 214, 120), .22, 18, 3)
    a = krish(450, 1560, 1100, 'calm', 0, 'bless')
    fx, fy = a.cx, a.hy - 3.5 * a.u
    glow(img, fx, fy, 460, (255, 205, 120), .5, 2.0)
    meta = dict(actors=[a], stars=True, petals=dict(n=22, col=(255, 200, 215)), embers=dict(x=450, y=1250, w=800, n=34, col=(255, 224, 150), up=True), pulse=(fx, fy, 400), rays=dict(x=450, y=260))
    return img, meta


def s_end():
    img = vgrad([(0, C('070c28')), (.4, C('14306a')), (.75, C('2a5a9a')), (1, C('0a1020'))])
    mandala(img, 450, 560, 520, (255, 210, 110), .22, 18, 3)
    a = krish(450, 1560, 1100, 'smile', .08, 'flute')
    fx, fy = a.cx, a.hy - 3.5 * a.u
    glow(img, fx, fy, 420, (255, 200, 110), .45, 2.0)
    meta = dict(actors=[a], stars=True, petals=dict(n=18, col=(255, 200, 215)), embers=dict(x=450, y=1200, w=800, n=34, col=(255, 224, 150), up=True), pulse=(fx, fy, 380))
    return img, meta


def s_peels():
    hut_bg(img := np.zeros((WH, WW, 3), np.float32))
    glow(img, 450, 1000, 420, (255, 214, 130), .45, 2.0)
    plate(img, 450, 1010, True, 260)
    meta = dict(dust=True, embers=dict(x=450, y=1050, w=500, n=34, col=(255, 224, 150), up=True), pulse=(450, 950, 380))
    return img, meta


SCENES = dict(peels=s_peels, hook=s_hook, hastina=s_hastina, feast=s_feast, path=s_path, hut=s_hut, bhaav=s_bhaav, end=s_end)


def plan(T, add, cam):
    add('hook', T(0, 0), T(0, .55), cam(1.05, 1.15, (450, 950), (450, 900)), blur=0, card='भगवान ने छिलका क्यों खाया?')
    add('peels', T(0, .55), T(1, 0), cam(1.1, 1.3, (450, 1000), (450, 960)), blur=0, trans='cut')
    add('hook', T(1, 0), T(2, 0), cam(2.2, 2.0, (450, 600)), blur=5, trans='cut')
    add('hastina', T(2, 0), T(3, 0), cam(1.0, 1.15, (450, 900), (450, 820)), blur=0, trans='fade', src='श्रीकृष्ण · हस्तिनापुर')
    add('feast', T(3, 0), T(3, 1), cam(1.0, 1.2, (450, 900), (330, 800)), blur=0)
    add('path', T(4, 0), T(4, 1), cam(1.0, 1.2, (450, 900), (560, 880)), blur=0)
    add('hut', T(5, 0), T(5, 1), cam(1.0, 1.1, (450, 900), (400, 880)), blur=0, trans='fade')
    add('hut', T(6, 0), T(6, 1), cam(2.0, 1.8, (250, 780)), blur=4, trans='cut')
    add('hut', T(7, 0), T(7, 1), cam(2.0, 1.8, (660, 800)), blur=4, trans='cut')
    add('hut', T(8, 0), T(9, 0), cam(1.2, 1.1, (450, 900), (450, 880)), blur=0, trans='cut')
    add('bhaav', T(9, 0), T(10, 0), cam(1.8, 1.4, (450, 620), (450, 800)), blur=3, trans='fade', card='भोग नहीं, भाव')
    add('bhaav', T(10, 0), T(11, 0), cam(1.3, 1.1, (450, 800), (450, 860)), blur=0, trans='cut', src='श्रीमद्भगवद्गीता 9.26')
    add('hook', T(11, 0), T(12, 0), cam(2.0, 1.7, (450, 650), (450, 760)), blur=2, trans='fade')
    add('end', T(12, 0), T(13, 0), cam(2.0, 1.5, (450, 640), (450, 760)), blur=3, trans='fade')


def music_cfg(ls, lines):
    return dict(flute=[(0.3, 'A', 2), (ls(4), 'B', 2), (ls(7), 'C', 2), (ls(9), 'D', 2), (ls(12) - .2, 'C', 4)], thumps=[], bells=[ls(5), ls(9)])
