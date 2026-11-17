# -*- coding: utf-8 -*-
from chhath import *
SCENES = {k: ALL[k] for k in ['soop', 'vdusk', 'dusk', 'devi', 'vdawn', 'surya']}

def plan(T, add, cam):
    add('vdusk', T(0, 0), T(0, .6), cam(1.0, 1.1, (450, 760), (450, 760)), blur=0, card='खरना क्या है?', shake=0)
    add('vdusk', T(0, .6), T(1, 0), cam(1.8, 1.5, (450, 640)), blur=2, trans='cut')
    add('dusk', T(1, 0), T(1, 1), cam(1.1, 1.4, (450, 800), (450, 700)), blur=0, src='छठ का दूसरा दिन')
    add('vdusk', T(2, 0), T(2, 1), cam(1.2, 1.6, (450, 760), (450, 640)), blur=0)
    add('soop', T(3, 0), T(3, 1), cam(1.1, 1.5, (450, 780), (450, 720)), blur=0, trans='cut')
    add('soop', T(4, 0), T(4, 1), cam(1.7, 1.4, (350, 760), (450, 760)), blur=2, trans='cut')
    add('surya', T(5, 0), T(5, 1), cam(1.1, 1.5, (450, 760), (450, 700)), blur=0)
    add('vdusk', T(6, 0), T(6, 1), cam(1.7, 1.5, (450, 640)), blur=2, trans='cut')
    add('dusk', T(7, 0), T(7, 1), cam(1.2, 1.5, (450, 820), (450, 700)), blur=0)
    add('vdusk', T(8, 0), T(8, 1), cam(1.3, 1.7, (450, 760), (450, 620)), blur=0, shake=.4, trans='cut')
    add('vdawn', T(9, 0), T(10, 0), cam(1.3, 1.0, (450, 760), (450, 760)), blur=0, card='शुद्धि + संकल्प', trans='fade')

def music_cfg(ls, lines):
    return dict(flute=[(0.3, 'A', 2), (ls(3), 'B', 2), (ls(5), 'C', 2), (ls(8), 'D', 2), (ls(9) - .1, 'C', 4)], thumps=[(ls(8), .8)], bells=[ls(5), ls(9)])
