# -*- coding: utf-8 -*-
from chhath import *
SCENES = {k: ALL[k] for k in ['vdusk', 'vdawn', 'dusk', 'dawn', 'surya', 'devi']}

def plan(T, add, cam):
    add('vdusk', T(0, 0), T(0, .6), cam(1.0, 1.1, (450, 760), (450, 760)), blur=0, card='36 घंटे निर्जला', shake=0)
    add('vdusk', T(0, .6), T(1, 0), cam(1.9, 1.6, (450, 620)), blur=3, trans='cut')
    add('dusk', T(1, 0), T(1, 1), cam(1.1, 1.4, (450, 800), (450, 700)), blur=0, src='खरना के बाद')
    add('vdawn', T(2, 0), T(2, 1), cam(1.2, 1.6, (450, 760), (450, 640)), blur=0, trans='cut')
    add('vdusk', T(3, 0), T(3, 1), cam(1.7, 1.4, (450, 760), (450, 640)), blur=2, trans='cut')
    add('vdawn', T(4, 0), T(4, 1), cam(1.8, 1.6, (450, 620)), blur=2, trans='cut', shake=.3)
    add('surya', T(5, 0), T(5, 1), cam(1.1, 1.5, (450, 760), (450, 700)), blur=0)
    add('dawn', T(6, 0), T(6, 1), cam(1.2, 1.5, (450, 880), (450, 760)), blur=0)
    add('devi', T(7, 0), T(7, 1), cam(1.2, 1.5, (450, 760), (450, 640)), blur=0, alpha=(0.0, 1.0))
    add('vdusk', T(8, 0), T(8, 1), cam(1.3, 1.7, (450, 760), (450, 620)), blur=0, shake=.4, trans='cut')
    add('vdawn', T(9, 0), T(10, 0), cam(1.3, 1.0, (450, 760), (450, 760)), blur=0, card='माँ की ताक़त', trans='fade')

def music_cfg(ls, lines):
    return dict(flute=[(0.3, 'A', 2), (ls(2), 'B', 2), (ls(5), 'C', 2), (ls(7), 'D', 2), (ls(9) - .1, 'C', 4)], thumps=[(ls(4), .7), (ls(8), .6)], bells=[ls(5), ls(9)])
