import { ctx, W, H, clamp, lerp, seg, eo, eio, eob, rnd, TAU } from "./core/lib.js";
import { L, Wd, T } from "./core/timing.js";
import { K, glow, motes, fog, ramesh, lit, linGrad, serifLabel } from "./core/kahani.js";
import { bokeh, lightSweep } from "./core/v3.js";
import { punchText, flash, shake } from "./core/punch.js";
import { HZ, skyDusk, sun, river, farBank, diya, floatDiyas, crowd, soop, motherChild, chulha, wheat } from "./core/ghat.js";
export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.1);
  const world = (t, sy, o = {}) => { skyDusk(t, 0.5, o.dawn); sun(t, o.sx ?? 540, sy, o.r ?? 120, 1, o.dawn ? "255,170,150" : "255,190,110"); farBank(t, o.dawn); river(t, o.sx ?? 540, o.dawn); };
  const wb = (t, seed = 3) => bokeh(t, 14, seed, [0, 500, W, 1100], ["255,170,90", "255,210,140", "255,120,70"], 0.35);
  const PT = (txt, y, size, k, glowc = "rgba(255,160,70,0.8)") => punchText(txt, 540, y, size, k, { fill: "#FFE6B0", glow: glowc });

  add({ id: 'P0', at: 0, zoom: 0.08, cam: [540, 900], draw(lt, d, t) { skyDusk(t); sun(t, 760, 760, 170); river(t, 760); wb(t, 8); soop(t, 540, 1020, 1.5); lightSweep(t, 2.8, '255,190,110', 0.22); motes(t, 34, 13, '255,200,120', [0, 500, W, 1000], 0.8, -16); PT('KYA NAHI?', 470, 125, eob(seg(lt, 0, 0.35))); } });
  cue(0.1, 'whoosh', { gain: 0.4 });
  { const tP = Wd('pyaaz', 1), tL = Wd('lehsun', 1);
  add({ id: 'P1', at: cut(1), zoom: 0.06, cam: [540, 900], xfade: 0.08, draw(lt, d, t) { skyDusk(t); river(t, 540); wb(t, 4); soop(t, 540, 1050, 1.4);
    const k = eo(seg(t, tP - 0.1, tL + 0.3)); ctx.save(); ctx.globalAlpha = k; ctx.strokeStyle = '#FF3B30'; ctx.shadowColor = '#FF3B30'; ctx.shadowBlur = 40; ctx.lineWidth = 26; ctx.beginPath(); ctx.arc(540, 900, 300, 0, TAU); ctx.moveTo(330, 690); ctx.lineTo(750, 1110); ctx.stroke(); ctx.restore();
    PT('NA PYAAZ', 380, 100, eob(seg(t, tP - 0.1, tP + 0.3)), 'rgba(255,60,50,0.8)'); PT('NA LEHSUN', 500, 100, eob(seg(t, tL - 0.1, tL + 0.3)), 'rgba(255,60,50,0.8)'); flash(t, tP, '255,120,100', 0.3, 7); flash(t, tL, '255,120,100', 0.3, 7); } });
  cue(tP, 'slam', { gain: 0.4 }); cue(tL, 'slam', { gain: 0.4 }); }
  { const tT = Wd('Thekua', 2);
  add({ id: 'P2', at: cut(2), zoom: 0.1, cam: [540, 1150], draw(lt, d, t) { skyDusk(t); river(t, 540); wb(t, 9); soop(t, 540, 1250, 2.7); lightSweep(t, 2.4, '255,190,110', 0.25); motes(t, 34, 13, '255,200,120', [0, 700, W, 900], 0.8, -16); PT('THEKUA', 470, 140, eob(seg(t, tT - 0.05, tT + 0.3))); } });
  cue(tT, 'sparkle', { gain: 0.5 }); }
  { const tM = Wd('Mitti', 3);
  add({ id: 'P3', at: cut(3), zoom: 0.08, cam: [540, 1100], draw(lt, d, t) { ctx.fillStyle = vgBg(); ctx.fillRect(0, 0, W, H); glow(540, 900, 1100, 'rgba(255,120,40,0.18)'); chulha(t, 540, 1150, 1.7); PT('AAM KI LAKDI', 430, 100, eob(seg(t, tM + 0.6, tM + 1.0))); } });
  cue(cut(3), 'whoosh', { gain: 0.3 });
  function vgBg() { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0C0610'); g.addColorStop(1, '#2A1008'); return g; } }
  { const tD = Wd('dhoop', 4);
  add({ id: 'P4', at: cut(4), zoom: 0.08, cam: [540, 1000], draw(lt, d, t) { skyDusk(t, 0.5, 1); sun(t, 540, 780, 150, 1, '255,190,110'); river(t, 540, 1); wheat(t, 540, 1150, 1.4); lightSweep(t, 3, '255,210,130', 0.25); motes(t, 40, 7, '255,230,160', [0, 500, W, 1000], 0.8, 12); PT('DHOOP', 470, 150, eob(seg(t, tD - 0.05, tD + 0.3))); } });
  cue(tD, 'sparkle', { gain: 0.4 }); }
  { const tJ = Wd('jootha', 5);
  add({ id: 'P5', at: cut(5), zoom: 0.08, cam: [540, 800], draw(lt, d, t) { skyDusk(t, 0.5, 1); sun(t, 160, 900, 110, 1, '255,170,150'); river(t, 160, 1);
    lit('ramesh', () => ramesh(540, 760, 1.0, { lid: 0.2 + ((t % 3) > 2.85 ? 0.7 : 0), gaze: [Math.sin(t * 0.8), 0], breathe: 0.5 + 0.5 * Math.sin(t * 1.4), tilt: Math.sin(t * 0.9) * 0.04, hands: 'down' }), [[linGrad(0, 0, 1080, 0, [[0, 'rgba(255,170,80,0.7)'], [0.55, 'rgba(0,0,0,0)']]), 0.6], [linGrad(0, 500, 0, 1500, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(60,20,40,0.5)']]), 1]]);
    wheat(t, 540, 1280, 1.2); PT('PEHRA', 470, 150, eob(seg(t, tJ + 0.3, tJ + 0.7))); lightSweep(t, 3.2, '255,170,90', 0.18); } });
  cue(tJ, 'thud', { gain: 0.3 }); }
  add({ id: 'P6', at: cut(6), zoom: 0.09, cam: [540, 900], draw(lt, d, t) { skyDusk(t); sun(t, 300, 760, 170); river(t, 300); wb(t, 11); soop(t, 540, 1020, 1.5 + 0.03 * Math.sin(t)); lightSweep(t, 2.8, '255,190,110', 0.22); motes(t, 34, 15, '255,200,120', [0, 500, W, 1000], 0.8, -16); PT('PHAL + GANNA', 430, 90, eob(seg(lt, 0.5, 0.9))); } });
  cue(cut(6), 'whoosh', { gain: 0.3 });
  { const tS = Wd('suraj', 7);
  add({ id: 'P7', at: cut(7), zoom: 0.07, cam: [540, 1000], draw(lt, d, t) { world(t, 980, { r: 140 }); floatDiyas(t, 12); crowd(t, 1230, 1.2, 9, 5, 0); wb(t, 6); PT('DHARTI + SURAJ', 470, 85, eob(seg(t, tS - 0.5, tS))); flash(t, tS, '255,220,160', 0.3, 6); } });
  cue(tS, 'sparkle', { gain: 0.4 }); }
  add({ id: 'P8', at: cut(8), zoom: 0.1, cam: [540, 900], draw(lt, d, t) { ctx.fillStyle = '#0C0610'; ctx.fillRect(0, 0, W, H); glow(540, 900, 1100, 'rgba(255,140,60,0.22)'); wb(t, 15); diya(540, 1000, 5.2, t, 2); motes(t, 40, 27, '255,200,130', [0, 300, W, 1200], 0.8, -22); PT('SHRADDHA', 470, 140, eob(seg(lt, 0.9, 1.3))); } });
  cue(cut(8), 'whoosh', { gain: 0.3 });
  add({ id: 'P9', at: cut(9), zoom: 0.08, cam: [540, 900], draw(lt, d, t) { skyDusk(t); sun(t, 760, 760, 170); river(t, 760); wb(t, 8); soop(t, 540, 1020, 1.5); lightSweep(t, 2.8, '255,190,110', 0.22); motes(t, 34, 13, '255,200,120', [0, 500, W, 1000], 0.8, -16); PT('KAHIN AUR NAHI', 470, 95, eo(seg(lt, 0.8, 1.2)) * (1 - seg(lt, d - 0.8, d))); } });
  return { shots: S, cues: CUES };
}
