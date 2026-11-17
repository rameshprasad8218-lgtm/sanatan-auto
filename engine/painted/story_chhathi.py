# -*- coding: utf-8 -*-
from chhath import *
SCENES = {k: ALL[k] for k in ['soop', 'palace', 'smashan', 'devi', 'revive', 'vdawn', 'dusk']}

def plan(T, add, cam):
    add('soop', T(0, 0), T(0, .6), cam(1.0, 1.1, (450, 760), (450, 760)), blur=0, card='छठी मैया कौन हैं?', shake=0)
    add('soop', T(0, .6), T(1, 0), cam(1.8, 1.5, (450, 760)), blur=2, trans='cut')
    add('revive', T(1, 0), T(1, 1), cam(1.1, 1.4, (450, 900), (450, 800)), blur=0, src='पौराणिक मान्यता')
    add('palace', T(2, 0), T(2, 1), cam(1.1, 1.35, (450, 800), (400, 760)), blur=0)
    add('palace', T(3, 0), T(3, 1), cam(1.7, 1.4, (280, 760), (450, 800)), blur=3, trans='cut')
    add('smashan', T(4, 0), T(4, 1), cam(1.1, 1.6, (450, 900), (450, 800)), blur=0, shake=.5)
    add('devi', T(5, 0), T(5, 1), cam(1.2, 1.5, (450, 760), (450, 640)), blur=0, alpha=(0.0, 1.0))
    add('devi', T(6, 0), T(6, 1), cam(1.8, 1.5, (450, 640)), blur=2, trans='cut')
    add('revive', T(7, 0), T(7, 1), cam(1.3, 1.7, (450, 900), (300, 800)), blur=0)
    add('revive', T(8, 0), T(8, 1), cam(1.2, 1.0, (450, 900), (450, 900)), blur=0, trans='cut')
    add('dusk', T(9, 0), T(9, 1), cam(1.1, 1.4, (450, 800), (450, 900)), blur=0, card='षष्ठी = छठ', trans='fade')
    add('vdawn', T(10, 0), T(10, 1), cam(1.1, 1.5, (450, 700), (450, 600)), blur=0)
    add('soop', T(11, 0), T(12, 0), cam(1.3, 1.0, (450, 760), (450, 760)), blur=0, trans='fade')

def music_cfg(ls, lines):
    return dict(flute=[(0.3, 'A', 2), (ls(2), 'B', 2), (ls(5), 'C', 2), (ls(8), 'D', 2), (ls(11) - .1, 'C', 4)], thumps=[(ls(4), .8), (ls(7), .5)], bells=[ls(5), ls(9)])
