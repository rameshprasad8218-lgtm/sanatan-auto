// Paper-Cut 2D Devotional: same brown wall every scene, locked characters, poster flips, light zoom-in, ~2 s scenes.
import { ctx, clamp, seg, eio } from './core/lib.js';
import { L } from './core/timing.js';
import { wall, person, poster, glassChip, sticker, glitch, petals } from './core/paper.js';

// [poster, main pose, second pose or null]
const SC = [["ask", "ask", "ask"], ["pinUP", "wave", "wave"], ["pinUP", "point", null], ["ganga", "rest", "rest"], ["ganga", "think", "think"], ["trishul", "pray", null], ["trishul", "point", "rest"], ["trishul", "think", "think"], ["trishul", "rest", "think"], ["rays", "pray", "pray"], ["rays", "pray", "rest"], ["ganga", "wave", "wave"], ["ganga", "point", "rest"], ["diya", "pray", null], ["plate", "point", "rest"], ["rays", "rest", "pray"], ["trishul", "pray", "pray"], ["ask", "ask", "ask"], ["pinUP", "wave", "wave"]];
const STK = {"11": "सब्सक्राइब", "16": "हर हर"};
const CHIP = "BHARAT YATRA \u2022 EP 2";
export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cut = (i) => (i === 0 ? 0 : L(i) - 0.05);
  SC.forEach(([pk, pm, ps], i) => add({ id: 'M' + i, at: cut(i), zoom: 0.07, xfade: 0.04, draw(lt, d, t) {
    wall(); const same = SC[i - 1] && SC[i - 1][0] === pk; poster(pk, t, same ? 1 : seg(lt, 0, 0.3));
    person('main', ps ? 300 : 440, 1810, 0.9, 1, pm, t, { talk: true });
    if (ps) person('second', 790, 1810, 0.9, -1, ps, t + 1.3);
    petals(t); glassChip(540, 118, 640, 84, CHIP, t, eio(clamp(t / 0.5)));
    if (STK[i]) sticker(i % 2 ? 860 : 220, 330, 120, STK[i], t, i % 2 ? 0.2 : -0.2, '#D62828');
    if (!same && lt < 0.16) glitch(1 - lt / 0.16);
  } }));
  return { shots: S, cues: CUES };
}
