# -*- coding: utf-8 -*-
from chhath import *
SCENES = {k: ALL[k] for k in ['soop', 'vdusk', 'dusk', 'surya', 'devi', 'vdawn']}

def plan(T, add, cam):
    add('soop', T(0, 0), T(0, .6), cam(1.0, 1.1, (450, 760), (450, 760)), blur=0, card='खरना की खीर', shake=0)
    add('soop', T(0, .6), T(1, 0), cam(1.9, 1.6, (450, 760)), blur=3, trans='cut')
    add('soop', T(1, 0), T(1, 1), cam(1.2, 1.5, (450, 780), (450, 720)), blur=0, src='लोक परंपरा')
    add('dusk', T(2, 0), T(2, 1), cam(1.1, 1.4, (450, 800), (450, 700)), blur=0)
    add('soop', T(3, 0), T(3, 1), cam(1.7, 1.4, (350, 760), (450, 760)), blur=2, trans='cut')
    add('surya', T(4, 0), T(4, 1), cam(1.1, 1.5, (450, 760), (450, 700)), blur=0)
    add('vdusk', T(5, 0), T(5, 1), cam(1.2, 1.6, (450, 760), (450, 640)), blur=0, trans='cut')
    add('vdusk', T(6, 0), T(6, 1), cam(1.8, 1.6, (450, 640)), blur=2, trans='cut', shake=.3)
    add('dusk', T(7, 0), T(7, 1), cam(1.2, 1.5, (450, 820), (450, 700)), blur=0)
    add('soop', T(8, 0), T(8, 1), cam(1.3, 1.0, (450, 700), (450, 780)), blur=0, trans='fade')
    add('vdawn', T(9, 0), T(10, 0), cam(1.3, 1.0, (450, 760), (450, 760)), blur=0, card='माँ का प्रसाद', trans='fade')

def music_cfg(ls, lines):
    return dict(flute=[(0.3, 'A', 2), (ls(2), 'B', 2), (ls(4), 'C', 2), (ls(7), 'D', 2), (ls(9) - .1, 'C', 4)], thumps=[(ls(6), .6)], bells=[ls(4), ls(9)])
