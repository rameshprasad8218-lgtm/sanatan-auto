// Paper-Cut 2D Devotional: same brown wall every scene, locked characters, poster flips, light zoom-in, ~2 s scenes.
import { ctx, clamp, seg, eio } from './core/lib.js';
import { L } from './core/timing.js';
import { wall, person, poster } from './core/paper.js';

// [poster, main pose, second pose or null]
const SC = [
 ['chicken','ask','ask'],['calendar','point',null],['hanuman','think','think'],['hanumancal','point','rest'],['truck','rest','rest'],['road','think',null],['road','rest','think'],['diya','pray',null],
 ['hanuman','pray','rest'],['truck','point','rest'],['calendar','rest','think'],['plate','point',null],['temple','pray','rest'],['plate','rest','rest'],['plate','point','think'],['onion','think','think'],
 ['diya','pray',null],['calendar','up','rest'],['ask','think','think'],['temple','rest','rest'],['chickplate','point','rest'],['hanuman','rest','rest'],['home','rest',null],['home','think','pray'],
 ['temple','pray','pray'],['ask','ask','ask'],['ask','wave','wave'],['hanuman','pray','pray'],
];
export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cut = (i) => (i === 0 ? 0 : L(i) - 0.05);
  SC.forEach(([pk, pm, ps], i) => add({ id: 'M' + i, at: cut(i), zoom: 0.07, xfade: 0.04, draw(lt, d, t) {
    wall(); poster(pk, t, SC[i - 1] && SC[i - 1][0] === pk ? 1 : seg(lt, 0, 0.3));
    person('main', ps ? 300 : 440, 1810, 0.9, 1, pm, t, { talk: true });
    if (ps) person('second', 790, 1810, 0.9, -1, ps, t + 1.3);
  } }));
  return { shots: S, cues: CUES };
}
