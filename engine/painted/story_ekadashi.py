# -*- coding: utf-8 -*-
from kit import *
import rig
from bgs import *

TAG = 'एकादशी · कथा'
SAGE = dict(head='sage', skin=(176, 124, 88), dhoti=(240, 236, 228), shawl=(226, 150, 70), hair=(224, 224, 228), beard=True, garland=False)


def man(cx, base, h, mood='calm', turn=0.0, pose='stand', rim=(255, 190, 120)):
    return rig.Actor('male', cx, base, h, mood=mood, turn=turn, pose=pose, rim=rim, head='man', skin=(196, 136, 96), dhoti=(238, 232, 218), shawl=(196, 66, 58), garland=False)


def s_hook():
    img = vgrad([(0, C('2a1608'))] * 2)
    wall_wood(img, 1180)
    floor(img, 1180, C('3a2014'), C('120a06'))
    glow(img, 450, 760, 520, (255, 190, 110), .22, 2.0)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, [(560, 470), (780, 470), (780, 780), (560, 780)], C('f2e6c8'))
    poly(d, [(560, 470), (780, 470), (780, 560), (560, 560)], C('c0342c'))
    text_on(d, 670, 515, 'एकादशी', 52, (255, 240, 220))
    ell(d, 670, 660, 48, 48, C('f0c24a')); ell(d, 670, 660, 30, 30, C('c0342c')); ell(d, 670, 660, 12, 12, C('f0c24a'))
    blit(img, lay)
    table(img, 90, 810, 1020)
    lay = layer(); d = ImageDraw.Draw(lay)
    bowl(d, 450, 1000, 120)
    blit(img, lay)
    a = man(215, 1560, 980, mood='sad', turn=.45)
    meta = dict(actors=[a], smoke=(450, 930), dust=True, embers=dict(x=450, y=980, w=300, n=10, col=(255, 240, 210), up=True))
    return img, meta


def s_forest():
    img = vgrad([(0, C('0c1a14')), (.5, C('2a4a34')), (.8, C('c8a050')), (1, C('0a120c'))])
    glow(img, 450, 760, 480, (255, 220, 140), .5, 2.0)
    forest(img, 4, (C('1a3a28'), C('112a1c'), C('0a1c12')), 1200)
    mist(img, 1100, 120, C('a0c0a0'), .25)
    a = rig.Actor('male', 450, 1500, 950, mood='calm', turn=0, pose='namaste', rim=(255, 220, 150), **SAGE)
    glow(img, 450, 600, 300, (255, 220, 130), .35, 2.0)
    meta = dict(actors=[a], sunrays=dict(x=450, y=700), dust=True, embers=dict(x=450, y=1200, w=700, n=26, col=(255, 230, 150), up=True), pulse=(450, 600, 330))
    return img, meta


def s_devi():
    img = vgrad([(0, C('1a0408')), (.4, C('5a0e18')), (.75, C('c03a20')), (1, C('120406'))])
    clouds(img, 8, 300, 900, C('7a1a20'), .5, 9, 1.5)
    devi = rig.Actor('female', 270, 1500, 1050, mood='angry', turn=.35, pose='curse', rim=(255, 90, 60), sari=(200, 40, 56), trim=(250, 200, 100), blind=False)
    sg = rig.Actor('male', 690, 1480, 650, mood='sad', turn=-.4, pose='namaste', rim=(255, 190, 120), **SAGE)
    glow(img, 300, 600, 340, (255, 90, 50), .35, 2.0)
    meta = dict(actors=[devi, sg], flash=dict(at=.3, x=450, y=640), embers=dict(x=450, y=1200, w=900, n=44, col=(255, 90, 40), up=True), smoke=(450, 800), pulse=(300, 620, 420))
    return img, meta


def s_earth():
    img = vgrad([(0, C('080a18')), (.55, C('1a2038')), (.8, C('3a2a1a')), (1, C('0a0806'))], )
    stars(img, 80, 5, .5)
    lay = layer(); d = ImageDraw.Draw(lay)
    poly(d, ridge(1150, 14, 5, (.008, .02)), C('2a1c10'))
    blit(img, lay)
    glow(img, 450, 1130, 380, (255, 200, 100), .8, 2.0)
    glow(img, 450, 700, 220, (255, 230, 160), .25, 2.0)
    a = rig.Actor('male', 450, 1250, 800, mood='calm', turn=0, pose='namaste', rim=(255, 220, 150), **SAGE)
    meta = dict(actors=[a], stars=True, embers=dict(x=450, y=1150, w=500, n=70, col=(255, 214, 120), up=True), pulse=(450, 1000, 420), rays=dict(x=450, y=300))
    return img, meta


def s_field():
    img = vgrad([(0, C('2a1a3a')), (.35, C('c06a4a')), (.55, C('f6c070')), (.62, C('4a6a2a')), (1, C('1a2a10'))])
    sun(img, 450, 840, 90, (255, 220, 150))
    clouds(img, 9, 400, 700, C('f0a070'), .35, 6, 1.3)
    paddy(img, 1000, 3, C('e0bc4a'), 160, 200)
    paddy(img, 1180, 7, C('d4aa3a'), 110, 260)
    mist(img, 1000, 70, C('ffd9a0'), .25)
    meta = dict(sunrays=dict(x=450, y=840), dust=True, embers=dict(x=450, y=1100, w=900, n=40, col=(255, 224, 140), up=True), birds=[(160, 520, 1), (250, 560, 1)])
    return img, meta


def s_bowl():
    img = vgrad([(0, C('2a1608'))] * 2)
    wall_wood(img, 1180)
    floor(img, 1180, C('3a2014'), C('120a06'))
    glow(img, 450, 760, 520, (255, 190, 110), .28, 2.0)
    table(img, 90, 810, 1020)
    lay = layer(); d = ImageDraw.Draw(lay)
    bowl(d, 450, 1000, 120)
    blit(img, lay)
    a = man(450, 1560, 1050, mood='calm', turn=0, pose='namaste')
    meta = dict(actors=[a], dust=True, pulse=(450, 650, 380), embers=dict(x=450, y=1100, w=600, n=22, col=(255, 224, 150), up=True))
    return img, meta


def s_vishnu():
    img = vgrad([(0, C('080c30')), (.4, C('1a3a80')), (.8, C('c8984a')), (1, C('0c0a14'))])
    mandala(img, 450, 650, 580, (255, 214, 120), .22, 18, 3)
    a = rig.Actor('krishna', 450, 1560, 1100, mood='calm', turn=0, pose='bless', rim=(255, 224, 150), feather=False, head='ram')
    fx, fy = a.cx, a.hy - 3.5 * a.u
    glow(img, fx, fy, 460, (255, 205, 120), .5, 2.0)
    meta = dict(actors=[a], stars=True, petals=dict(n=20, col=(255, 200, 215)), embers=dict(x=450, y=1250, w=800, n=34, col=(255, 224, 150), up=True), pulse=(fx, fy, 400), rays=dict(x=450, y=260))
    return img, meta


def s_heart():
    img = vgrad([(0, C('2a1a3a')), (.5, C('b8604a')), (.8, C('f6c070')), (1, C('1a1008'))])
    sun(img, 450, 900, 110, (255, 220, 150))
    clouds(img, 13, 450, 800, C('f0a070'), .35, 7, 1.3)
    a = man(450, 1560, 1100, mood='smile', turn=0, pose='namaste', rim=(255, 220, 150))
    cx, cy = 450, a.ty + 12 * a.u
    glow(img, cx, cy, 240, (255, 210, 130), .55, 2.0)
    meta = dict(actors=[a], sunrays=dict(x=450, y=900), dust=True, petals=dict(n=16, col=(255, 210, 160)), pulse=(cx, cy, 300), embers=dict(x=450, y=1250, w=800, n=28, col=(255, 224, 150), up=True))
    return img, meta


SCENES = dict(hook=s_hook, forest=s_forest, devi=s_devi, earth=s_earth, field=s_field, bowl=s_bowl, vishnu=s_vishnu, heart=s_heart)


def plan(T, add, cam):
    add('hook', T(0, 0), T(0, .55), cam(1.0, 1.08, (450, 900), (450, 880)), blur=0, card='एकादशी पर चावल क्यों नहीं?', shake=0)
    add('hook', T(0, .55), T(1, .0), cam(2.0, 1.7, (450, 1010)), blur=2, trans='cut')
    add('hook', T(1, 0), T(1, 1), cam(1.0, 1.2, (450, 900), (330, 800)), blur=0, trans='cut')
    add('forest', T(2, 0), T(2, 1), cam(1.1, 1.3, (450, 820), (450, 700)), blur=0, src='प्रचलित पौराणिक कथा')
    add('devi', T(3, 0), T(3, .5), cam(1.4, 1.7, (330, 720), (310, 660)), blur=0, shake=.8)
    add('devi', T(3, .5), T(4, 0), cam(1.9, 1.7, (690, 1060)), blur=4, trans='cut')
    add('earth', T(4, 0), T(4, 1), cam(1.1, 1.5, (450, 900), (450, 1000)), blur=0, alpha=(1.0, 0.0))
    add('field', T(5, 0), T(5, 1), cam(1.0, 1.25, (450, 1000), (450, 900)), blur=0)
    add('bowl', T(6, 0), T(6, 1), cam(1.4, 1.1, (450, 700), (450, 850)), blur=0, trans='cut')
    add('vishnu', T(7, 0), T(7, 1), cam(1.8, 1.4, (450, 620), (450, 800)), blur=3)
    add('heart', T(8, 0), T(8, 1), cam(1.1, 1.5, (450, 850), (450, 700)), blur=0, card='व्रत पेट का नहीं, मन का')
    add('heart', T(9, 0), T(9, .5), cam(2.2, 1.9, (450, 640)), blur=3, trans='cut')
    add('heart', T(9, .5), T(10, 0), cam(1.2, 1.05, (450, 880), (450, 900)), blur=0, trans='cut')
    add('hook', T(10, 0), T(11, 0), cam(1.25, 1.1, (330, 880), (360, 900)), blur=0, trans='fade')


def music_cfg(ls, lines):
    return dict(flute=[(0.3, 'A', 2), (ls(2), 'B', 2), (ls(5), 'C', 2), (ls(8), 'D', 2), (ls(10) - .1, 'C', 4)], thumps=[(ls(3), .8), (ls(4) + .3, .5)], bells=[ls(7)])
