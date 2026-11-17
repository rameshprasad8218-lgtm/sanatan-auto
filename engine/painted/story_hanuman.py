# -*- coding: utf-8 -*-
from kit import *
import rig
from bgs import *

TAG = 'हनुमान · कथा'
ORG = (236, 130, 62)
VER = (214, 58, 42)


def hanu(cx, base, h, skin=ORG, mood='calm', turn=0.0, pose='mace', rim=(255, 200, 130)):
    return rig.Actor('male', cx, base, h, mood=mood, turn=turn, pose=pose, rim=rim, head='hanuman', skin=skin, dhoti=(226, 52, 46) if skin == ORG else (240, 190, 60), shawl='none', garland=False, tail=True)


def sita(cx, base, h, mood='smile', turn=0.0, pose='stand'):
    return rig.Actor('female', cx, base, h, mood=mood, turn=turn, pose=pose, rim=(255, 210, 140), sari=(222, 56, 74), trim=(250, 214, 120), blind=False)


def ram(cx, base, h, mood='calm', turn=0.0, pose='bless'):
    return rig.Actor('male', cx, base, h, mood=mood, turn=turn, pose=pose, rim=(255, 224, 160), head='ram', feather=False, skin=(84, 138, 200), dhoti=(246, 200, 70), shawl=(236, 150, 60), garland=True)


def s_hook():
    img = vgrad([(0, C('2a0a14')), (.4, C('8a2a1c')), (.7, C('f08a3a')), (1, C('1a0a08'))])
    mandala(img, 450, 640, 560, (255, 214, 120), .2, 18, 3)
    sun(img, 450, 900, 120, (255, 200, 120))
    a = hanu(450, 1560, 1100, VER, mood='smile', turn=.05, pose='mace')
    fx, fy = a.cx, a.hy - 3.5 * a.u
    glow(img, fx, fy, 420, (255, 150, 70), .4, 2.0)
    meta = dict(actors=[a], sunrays=dict(x=450, y=900), petals=dict(n=18, col=(230, 50, 40)), embers=dict(x=450, y=1250, w=800, n=34, col=(255, 150, 70), up=True), pulse=(fx, fy, 400), dust=True)
    return img, meta


def s_palace():
    img = vgrad([(0, C('2a1020')), (.5, C('6a3030')), (1, C('1a0c0c'))])
    glow(img, 450, 640, 520, (255, 190, 110), .3, 2.0)
    palace_arches(img, 1200, C('4a2020'), 4)
    floor(img, 1200, C('5a2a20'), C('140a08'))
    for x in (120, 780):
        diya(img, x, 1180, 1.6)
    s = sita(240, 1500, 940, 'smile', turn=.4)
    h = hanu(660, 1480, 780, ORG, 'calm', turn=-.5, pose='stand')
    glow(img, 240, 780, 260, (255, 210, 140), .3, 2.0)
    meta = dict(actors=[s, h], dust=True, embers=dict(x=450, y=1200, w=800, n=22, col=(255, 200, 120), up=True), petals=dict(n=10, col=(255, 200, 215)))
    return img, meta


def s_think():
    img = vgrad([(0, C('1a1030')), (.5, C('3a2a5a')), (1, C('120a18'))])
    stars(img, 70, 4, .6)
    glow(img, 450, 640, 480, (255, 150, 90), .3, 2.0)
    a = hanu(450, 1560, 1100, ORG, mood='calm', turn=.12, pose='stand')
    fx, fy = a.cx, a.hy - 3.5 * a.u
    meta = dict(actors=[a], stars=True, dust=True, pulse=(fx, fy - 120, 340), embers=dict(x=450, y=1250, w=800, n=24, col=(255, 180, 110), up=True))
    return img, meta


def s_paint():
    img = vgrad([(0, C('2a0a14')), (.45, C('a02a20')), (.75, C('f08a3a')), (1, C('1a0a08'))])
    sun(img, 450, 820, 130, (255, 190, 110))
    a = hanu(450, 1520, 1000, VER, mood='smile', turn=0, pose='mace')
    glow(img, 450, 700, 400, (255, 90, 50), .35, 2.0)
    meta = dict(actors=[a], sunrays=dict(x=450, y=820), petals=dict(n=40, col=(226, 44, 36)), embers=dict(x=450, y=1200, w=800, n=60, col=(255, 90, 50), up=True), flash=dict(at=.05, x=450, y=700), pulse=(450, 700, 420))
    return img, meta


def s_ram():
    img = vgrad([(0, C('1a1030')), (.4, C('6a3a5a')), (.7, C('f0a050')), (1, C('1a1010'))])
    sun(img, 450, 840, 120, (255, 214, 140))
    clouds(img, 4, 450, 780, C('c0705a'), .35, 7, 1.3)
    r = ram(235, 1500, 940, 'calm', turn=.45, pose='bless')
    h = hanu(665, 1490, 780, VER, 'smile', turn=-.5, pose='mace')
    glow(img, 450, 800, 360, (255, 214, 150), .35, 2.0)
    meta = dict(actors=[r, h], sunrays=dict(x=450, y=840), dust=True, tear=(235 + 24, 760), petals=dict(n=16, col=(255, 210, 160)), pulse=(450, 820, 380))
    return img, meta


def s_temple():
    img = vgrad([(0, C('1a0c18')), (.5, C('5a2a2a')), (1, C('1a0c0c'))])
    palace_arches(img, 1250, C('3a1a1a'), 3)
    floor(img, 1250, C('3a1a14'), C('100808'))
    mandala(img, 450, 760, 520, (255, 190, 100), .18, 18, 3)
    for x in (110, 220, 680, 790):
        diya(img, x, 1210, 1.4)
    a = hanu(450, 1500, 1020, VER, 'calm', turn=0, pose='mace')
    glow(img, 450, 700, 400, (255, 170, 90), .4, 2.0)
    meta = dict(actors=[a], dust=True, petals=dict(n=24, col=(255, 170, 40)), embers=dict(x=450, y=1250, w=800, n=40, col=(255, 190, 100), up=True), pulse=(450, 700, 400))
    return img, meta


def s_end():
    img = vgrad([(0, C('2a0a14')), (.4, C('8a2a1c')), (.7, C('f08a3a')), (1, C('1a0a08'))])
    mandala(img, 450, 640, 560, (255, 214, 120), .2, 18, 3)
    a = hanu(450, 1560, 1100, VER, mood='smile', turn=.05, pose='mace')
    fx, fy = a.cx, a.hy - 3.5 * a.u
    glow(img, fx, fy, 420, (255, 150, 70), .45, 2.0)
    meta = dict(actors=[a], sunrays=dict(x=450, y=900), petals=dict(n=18, col=(230, 50, 40)), embers=dict(x=450, y=1250, w=800, n=34, col=(255, 150, 70), up=True), pulse=(fx, fy, 400))
    return img, meta


SCENES = dict(hook=s_hook, palace=s_palace, think=s_think, paint=s_paint, ram=s_ram, temple=s_temple, end=s_end)


def plan(T, add, cam):
    add('hook', T(0, 0), T(0, .5), cam(2.0, 1.8, (450, 600)), blur=0, card='हनुमान जी लाल क्यों?')
    add('hook', T(0, .5), T(1, 0), cam(1.1, 1.3, (450, 880), (450, 820)), blur=0, trans='cut')
    add('hook', T(1, 0), T(1, 1), cam(1.4, 1.2, (450, 800), (450, 860)), blur=2, src='प्रचलित लोककथा')
    add('palace', T(2, 0), T(2, 1), cam(1.0, 1.15, (450, 900), (380, 860)), blur=0)
    add('palace', T(3, 0), T(3, 1), cam(2.0, 1.8, (660, 900)), blur=4, trans='cut')
    add('palace', T(4, 0), T(4, 1), cam(2.0, 1.8, (240, 820)), blur=4, trans='cut')
    add('think', T(5, 0), T(5, 1), cam(2.2, 1.9, (450, 640)), blur=4, trans='fade')
    add('think', T(6, 0), T(6, .6), cam(1.5, 1.7, (450, 700)), blur=0, trans='cut', card='चुटकी भर सिंदूर = प्रभु की आयु')
    add('think', T(6, .6), T(7, 0), cam(2.4, 2.2, (450, 620)), blur=5, trans='cut')
    add('paint', T(7, 0), T(7, 1), cam(1.1, 1.4, (450, 900), (450, 760)), blur=0, trans='cut', shake=1.2)
    add('ram', T(8, 0), T(8, 1), cam(1.0, 1.2, (450, 900), (300, 820)), blur=0, trans='fade')
    add('ram', T(9, 0), T(9, 1), cam(1.9, 1.7, (450, 820)), blur=3, trans='cut')
    add('temple', T(10, 0), T(10, 1), cam(1.1, 1.3, (450, 900), (450, 760)), blur=0, trans='fade')
    add('end', T(11, 0), T(12, 0), cam(1.6, 1.3, (450, 700), (450, 820)), blur=0, trans='fade', card='सच्ची भक्ति हिसाब नहीं करती')
    add('end', T(12, 0), T(13, 0), cam(2.0, 1.5, (450, 620), (450, 760)), blur=2, trans='cut')


def music_cfg(ls, lines):
    return dict(flute=[(0.3, 'A', 2), (ls(2), 'B', 2), (ls(8), 'C', 2), (ls(10), 'D', 2), (ls(12) - .2, 'C', 4)], thumps=[(ls(7), .9)], bells=[ls(4), ls(9)])
