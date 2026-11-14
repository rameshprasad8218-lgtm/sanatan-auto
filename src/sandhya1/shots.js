// CHHATH · SANDHYA ARGHYA (Sanatan Dharm) — Kahani 2D v3 look. One shot per line.
import { ctx, W, H, clamp, lerp, seg, eo, eio, eob, rnd, TAU } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { K, glow, motes, fog, ramesh, lit, linGrad, serifLabel } from './core/kahani.js';
import { bokeh, lightSweep } from './core/v3.js';
import { punchText, flash, shake } from './core/punch.js';
import { HZ, skyDusk, sun, river, farBank, diya, floatDiyas, crowd, soop } from './core/ghat.js';

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.1);
  const world = (t, sy, o = {}) => { skyDusk(t, 0.5, o.dawn); sun(t, 540, sy, o.r ?? 120, 1, o.dawn ? '255,170,150' : '255,190,110'); farBank(t, o.dawn); river(t, 540, o.dawn); };
  const warmBokeh = (t, seed = 3) => bokeh(t, 14, seed, [0, 500, W, 1100], ['255,170,90', '255,210,140', '255,120,70'], 0.35);

  // 0 · "Duniya ugte suraj ko salaam karti hai." giant sun, hook text from frame 0
  add({ id: 'A00', at: 0, zoom: 0.07, cam: [540, 900], note: 'big sun over river, hook text', draw(lt, d, t) {
    world(t, 880, { r: 150 }); crowd(t, 1250, 1.3, 9, 2, 0); motes(t, 40, 3, '255,220,160', [0, 300, W, 900], 0.6, 10);
    punchText('UGTA SURAJ', 540, 470, 120, eob(seg(lt, 0, 0.35)), { fill: '#FFE6B0', glow: 'rgba(255,160,70,0.8)' });
  } });
  cue(0.1, 'whoosh', { gain: 0.4 });

  // 1 · "Par Chhath mein pehla arghya, doobte suraj ko kyun?" sun sinks, flash on 'doobte'
  { const tD = Wd('doobte', 1);
    add({ id: 'A01', at: cut(1), zoom: 0.06, cam: [540, 960], xfade: 0.1, note: 'sun sinks, DOOBTA SURAJ?', draw(lt, d, t) {
      ctx.save(); shake(0.5 * Math.exp(-Math.max(0, t - tD) * 5) * (t > tD ? 1 : 0), t);
      world(t, lerp(880, 1030, eio(seg(t, cut(1), cut(2)))), { r: 150 - 30 * seg(t, cut(1), cut(2)) }); crowd(t, 1250, 1.3, 9, 2, 0); motes(t, 40, 5, '255,190,120', [0, 300, W, 900], 0.5, 10); ctx.restore();
      flash(t, tD, '255,200,140', 0.5, 7);
      punchText('DOOBTA SURAJ?', 540, 470, 100, eob(seg(t, tD - 0.1, tD + 0.3)), { fill: '#FFFFFF', glow: 'rgba(255,120,60,0.8)' });
    } });
    cue(tD, 'thud', { gain: 0.5 }); }

  // 2 · diyas on the ghat
  add({ id: 'G02', at: cut(2), zoom: 0.07, cam: [540, 1300], note: 'lakhon diye floating on the river', draw(lt, d, t) {
    world(t, 1030, { r: 105 }); floatDiyas(t, 16); crowd(t, 1180, 0.9, 12, 6, 0); warmBokeh(t, 4); motes(t, 40, 9, '255,200,130', [0, 800, W, 900], 0.7, -14);
  } });
  cue(cut(2), 'whoosh', { gain: 0.3 });

  // 3 · vrati waist-deep in water (Ramesh puppet as the devotee), sun rim from the left
  add({ id: 'V03', at: cut(3), zoom: 0.08, cam: [540, 800], note: 'vrati in the water, warm sun light', draw(lt, d, t) {
    skyDusk(t); sun(t, 160, 900, 110); farBank(t); river(t, 160);
    const blink = (t % 3) > 2.85 ? 0.9 : 0.1;
    lit('ramesh', () => ramesh(540, 760, 1.0, { lid: 0.2 + blink * 0.7, gaze: [-0.2, -0.1], breathe: 0.5 + 0.5 * Math.sin(t * 1.4), tilt: Math.sin(t * 0.7) * 0.025, hands: 'down' }),
      [[linGrad(0, 0, 1080, 0, [[0, 'rgba(255,170,80,0.75)'], [0.55, 'rgba(0,0,0,0)']]), 0.6], [linGrad(0, 500, 0, 1500, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(60,20,40,0.5)']]), 1]]);
    ctx.fillStyle = 'rgba(70,35,70,0.9)'; ctx.fillRect(-20, 1130, W + 40, 900); glow(540, 1150, 700, 'rgba(255,170,90,0.12)');
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(255,190,120,0.4)'; ctx.lineWidth = 4; for (let r = 0; r < 3; r++) { ctx.beginPath(); ctx.ellipse(540, 1150 + r * 28, 320 + r * 70 + Math.sin(t * 2 + r) * 8, 24 + r * 8, 0, 0, TAU); ctx.stroke(); } ctx.restore();
    floatDiyas(t, 6, 1250, 1700, 11); lightSweep(t, 3.2, '255,170,90', 0.18); motes(t, 30, 21, '255,210,150', [0, 300, W, 1200], 0.5, -8);
  } });

  // 4 · soop close-up
  { const tS = Wd('soop', 4);
    add({ id: 'S04', at: cut(4), zoom: 0.09, cam: [540, 900], note: 'soop close-up: fruits, thekua, sugarcane, diya', draw(lt, d, t) {
      skyDusk(t); sun(t, 760, 760, 170); river(t, 760); warmBokeh(t, 8); soop(t, 540, 1020, 1.5 + 0.03 * Math.sin(t)); lightSweep(t, 2.8, '255,190,110', 0.22);
      motes(t, 34, 13, '255,200,120', [0, 500, W, 1000], 0.8, -16);
      punchText('SOOP', 540, 470, 150, eob(seg(t, tS - 0.05, tS + 0.3)), { fill: '#FFE6B0', glow: 'rgba(255,160,70,0.8)' });
    } });
    cue(tS, 'sparkle', { gain: 0.5 }); }

  // 5 · "shaam ki kiran Pratyusha hain" big sun, label
  { const tP = Wd('Pratyusha', 5);
    add({ id: 'P05', at: cut(5), zoom: 0.07, cam: [540, 900], note: 'golden sun, PRATYUSHA label', draw(lt, d, t) {
      world(t, lerp(960, 1000, seg(lt, 0, d)), { r: 170 }); crowd(t, 1230, 1.1, 10, 3, 0); motes(t, 40, 17, '255,210,140', [0, 300, W, 900], 0.6, 10);
      serifLabel('PRATYUSHA', 540, 520, 120, eo(seg(t, tP - 0.1, tP + 0.5)), '#FFD98A', true); serifLabel('shaam ki kiran', 540, 640, 54, eo(seg(t, tP, tP + 0.6)) * 0.9, '#FFF1D6');
    } });
    cue(tP, 'sparkle', { gain: 0.6 }); }

  // 6 · Usha and Pratyusha: two orbs, dawn pink left, dusk gold right
  { const tU = Wd('Usha', 6);
    add({ id: 'U06', at: cut(6), zoom: 0.05, cam: [540, 900], note: 'USHA + PRATYUSHA two orbs', draw(lt, d, t) {
      skyDusk(t, 0.5, 0); river(t, 540); farBank(t);
      sun(t, 270, 860, 95, eo(seg(t, tU - 0.2, tU + 0.5)), '255,150,170'); sun(t, 810, 860, 95, 1, '255,190,110');
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(255,210,150,0.55)'; ctx.lineWidth = 5; ctx.setLineDash([14, 16]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(270, 860); ctx.quadraticCurveTo(540, 640, 810, 860); ctx.stroke(); ctx.restore();
      serifLabel('USHA', 270, 1010, 78, eo(seg(t, tU, tU + 0.4)), '#FFC0CC', true); serifLabel('PRATYUSHA', 810, 1010, 78, 1, '#FFD98A', true);
      serifLabel('SURYA KI DO SHAKTIYAN', 540, 520, 64, eo(seg(t, Wd('do', 6), Wd('do', 6) + 0.5)), '#FFF1D6'); motes(t, 40, 23, '255,210,150', [0, 300, W, 900], 0.6, 8);
    } });
    cue(tU, 'sparkle', { gain: 0.5 }); }

  // 7 · "pehla arghya, shaam ko" water thrown toward the sun, gold droplets
  { const tA = Wd('arghya', 7);
    add({ id: 'R07', at: cut(7), zoom: 0.07, cam: [540, 1000], note: 'arghya: water arcs toward sun, flash', draw(lt, d, t) {
      world(t, 1020, { r: 120 }); crowd(t, 1230, 1.2, 9, 5, 0);
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 90; i++) { const p = ((t - tA + 0.3) * 0.9 + rnd(i) * 0.5) ; if (p < 0 || p > 1) continue; const x0 = 200 + (i % 9) * 80, y0 = 1130, x = lerp(x0, 540 + (rnd(i + 3) - 0.5) * 160, p), y = y0 - Math.sin(p * Math.PI) * (520 + rnd(i + 8) * 200) + p * 0, r = 4 + rnd(i + 1) * 6;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3); g.addColorStop(0, 'rgba(255,235,180,0.95)'); g.addColorStop(1, 'rgba(255,190,100,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 3, 0, TAU); ctx.fill(); } ctx.restore();
      flash(t, tA, '255,220,160', 0.45, 6); punchText('PEHLA ARGHYA', 540, 470, 100, eob(seg(t, tA - 0.2, tA + 0.3)), { fill: '#FFE6B0', glow: 'rgba(255,160,70,0.8)' });
    } });
    cue(tA, 'sparkle', { gain: 0.5 }); }

  // 8 · "Chhath sikhata hai," macro diya
  add({ id: 'D08', at: cut(8), zoom: 0.1, cam: [540, 900], note: 'macro diya flame', draw(lt, d, t) {
    ctx.fillStyle = '#0C0610'; ctx.fillRect(0, 0, W, H); glow(540, 900, 1100, 'rgba(255,140,60,0.22)'); warmBokeh(t, 15); diya(540, 1000, 5.2, t, 2); motes(t, 40, 27, '255,200,130', [0, 300, W, 1200], 0.8, -22);
  } });
  cue(cut(8), 'whoosh', { gain: 0.3 });

  // 9 · "jo dhal raha hai, uska bhi sammaan karo" crowd bows with folded hands
  { const tM = Wd('sammaan', 9);
    add({ id: 'B09', at: cut(9), zoom: 0.07, cam: [540, 1100], note: 'crowd bows, SAMMAAN', draw(lt, d, t) {
      world(t, lerp(1010, 1050, seg(lt, 0, d)), { r: 110 }); crowd(t, 1200, 1.5, 7, 8, eo(seg(t, cut(9) + 0.3, tM)), -40, W + 40); warmBokeh(t, 6);
      punchText('SAMMAAN', 540, 470, 130, eob(seg(t, tM - 0.05, tM + 0.35)), { fill: '#FFFFFF', glow: 'rgba(255,120,60,0.8)' }); flash(t, tM, '255,210,150', 0.35, 7);
    } });
    cue(tM, 'thud', { gain: 0.4 }); }

  // 10 · "Kal subah, wahi suraj phir ugega" dawn: sun rises
  add({ id: 'M10', at: cut(10), zoom: 0.07, cam: [540, 1100], note: 'dawn, sun rises again', draw(lt, d, t) {
    const k = eio(seg(t, cut(10), cut(11)));
    world(t, lerp(1060, 880, k), { dawn: 1, r: 120 + 30 * k }); crowd(t, 1200, 1.5, 7, 8, 0.7 * (1 - k), -40, W + 40); motes(t, 40, 31, '255,220,190', [0, 300, W, 900], 0.6, 8);
    lightSweep(t, 3.5, '255,200,160', 0.2);
  } });
  cue(cut(10), 'whoosh', { gain: 0.4 });

  // 11 · loop: back to the opening look (big sun, crowd), hands folded
  add({ id: 'Z11', at: cut(11), zoom: 0.05, cam: [540, 900], note: 'closing: matches frame 0', draw(lt, d, t) {
    world(t, 880, { r: 150 }); crowd(t, 1250, 1.3, 9, 2, eo(seg(lt, 0, 1.0)) * (1 - seg(lt, d - 1.2, d))); motes(t, 40, 3, '255,220,160', [0, 300, W, 900], 0.6, 10);
    punchText('JAI CHHATHI MAIYA', 540, 470, 78, eo(seg(lt, 0.4, 0.9)) * (1 - seg(lt, d - 0.8, d)), { fill: '#FFE6B0', glow: 'rgba(255,160,70,0.8)' });
  } });

  return { shots: S, cues: CUES };
}
