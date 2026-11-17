# -*- coding: utf-8 -*-
from chhath import *
SCENES = {k: ALL[k] for k in ['dusk', 'vdusk', 'soop', 'surya', 'dawn', 'vdawn']}

def plan(T, add, cam):
    add('dusk', T(0, 0), T(0, .6), cam(1.0, 1.1, (450, 800), (450, 800)), blur=0, card='डूबते सूरज को अर्घ्य क्यों?', shake=0)
    add('surya', T(0, .6), T(1, 0), cam(1.8, 1.4, (450, 700)), blur=0, trans='cut')
    add('dawn', T(1, 0), T(1, 1), cam(1.1, 1.4, (450, 820), (450, 720)), blur=0)
    add('vdusk', T(2, 0), T(2, 1), cam(1.1, 1.5, (450, 700), (450, 560)), blur=0)
    add('surya', T(3, 0), T(3, 1), cam(1.2, 1.0, (450, 700), (450, 760)), blur=0, trans='cut', src='छठ की सीख')
    add('dawn', T(4, 0), T(4, 1), cam(1.1, 1.8, (450, 900), (450, 720)), blur=0)
    add('soop', T(5, 0), T(5, 1), cam(1.2, 1.6, (450, 760), (450, 780)), blur=0, trans='cut')
    add('dusk', T(6, 0), T(6, 1), cam(1.4, 1.1, (300, 900), (450, 900)), blur=0)
    add('vdusk', T(7, 0), T(7, 1), cam(1.9, 1.5, (450, 560)), blur=2, trans='cut')
    add('vdawn', T(8, 0), T(8, 1), cam(1.1, 1.5, (450, 700), (450, 600)), blur=0, card='ढलते को भी प्रणाम')
    add('surya', T(9, 0), T(10, 0), cam(1.1, 1.0, (450, 700), (450, 700)), blur=0, trans='fade')

def music_cfg(ls, lines):
    return dict(flute=[(0.3, 'A', 2), (ls(3), 'B', 2), (ls(5), 'C', 2), (ls(7), 'D', 2), (ls(9) - .1, 'C', 4)], thumps=[(ls(4), .7)], bells=[ls(4), ls(8)])
