# -*- coding: utf-8 -*-
from chhath import *
SCENES = {k: ALL[k] for k in ['kwater', 'surya', 'indra', 'kavach', 'dawn', 'vdawn']}

def plan(T, add, cam):
    add('kwater', T(0, 0), T(0, .6), cam(1.0, 1.1, (450, 760), (450, 760)), blur=0, card='कर्ण रोज़ पानी में क्या करता था?', shake=0)
    add('kwater', T(0, .6), T(1, 0), cam(1.9, 1.6, (450, 560)), blur=3, trans='cut')
    add('vdawn', T(1, 0), T(1, 1), cam(1.1, 1.4, (450, 800), (450, 700)), blur=0, src='लोक मान्यता')
    add('surya', T(2, 0), T(2, 1), cam(1.1, 1.5, (450, 760), (450, 700)), blur=0)
    add('kwater', T(3, 0), T(3, 1), cam(1.2, 1.7, (450, 780), (450, 560)), blur=0, trans='cut')
    add('indra', T(4, 0), T(4, 1), cam(1.1, 1.5, (260, 800), (450, 800)), blur=0)
    add('indra', T(5, 0), T(5, 1), cam(1.9, 1.6, (640, 640)), blur=2, trans='cut', shake=.5)
    add('kavach', T(6, 0), T(6, 1), cam(1.2, 1.7, (450, 860), (450, 860)), blur=0, shake=.6)
    add('kwater', T(7, 0), T(7, 1), cam(1.3, 1.0, (450, 700), (450, 760)), blur=0, card='दान = भक्ति', trans='cut')
    add('dawn', T(8, 0), T(8, 1), cam(1.1, 1.4, (450, 880), (450, 760)), blur=0)
    add('kwater', T(9, 0), T(10, 0), cam(1.3, 1.0, (450, 700), (450, 760)), blur=0, trans='fade')

def music_cfg(ls, lines):
    return dict(flute=[(0.3, 'A', 2), (ls(2), 'B', 2), (ls(5), 'C', 2), (ls(7), 'D', 2), (ls(9) - .1, 'C', 4)], thumps=[(ls(5), .8)], bells=[ls(2), ls(7)])
