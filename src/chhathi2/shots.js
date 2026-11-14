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

  add({ id: 'C0', at: 0, zoom: 0.07, cam: [540, 900], draw(lt, d, t) { world(t, 960, { r: 140 }); crowd(t, 1250, 1.3, 9, 2, 0); motes(t, 40, 3, '255,220,160', [0, 300, W, 900], 0.6, 10); PT('KAUN HAIN?', 470, 125, eob(seg(lt, 0, 0.35))); } });
  cue(0.1, 'whoosh', { gain: 0.4 });
  { const t1 = Wd('Chhathi', 1);
  add({ id: 'C1', at: cut(1), zoom: 0.06, cam: [540, 900], xfade: 0.08, draw(lt, d, t) { skyDusk(t); river(t, 540); farBank(t); glow(540, 800, 800, 'rgba(255,150,80,0.35)'); sun(t, 540, 800, 130); floatDiyas(t, 14); flash(t, t1, '255,220,160', 0.5, 6);
    serifLabel('CHHATHI MAIYA', 540, 470, 110, eo(seg(t, t1 - 0.05, t1 + 0.4)), '#FFD98A', true); motes(t, 40, 5, '255,200,130', [0, 400, W, 900], 0.7, -10); } });
  cue(t1, 'sparkle', { gain: 0.6 }); }
  { const tB = Wd('behen', 2);
  add({ id: 'C2', at: cut(2), zoom: 0.05, cam: [540, 900], draw(lt, d, t) { skyDusk(t); river(t, 540); farBank(t); sun(t, 270, 860, 90, 1, '255,150,170'); sun(t, 810, 860, 110, 1, '255,190,110');
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(255,210,150,0.55)'; ctx.lineWidth = 5; ctx.setLineDash([14, 16]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(270, 860); ctx.quadraticCurveTo(540, 650, 810, 860); ctx.stroke(); ctx.restore();
    serifLabel('CHHATHI', 270, 1010, 62, 1, '#FFC0CC', true); serifLabel('SURYA DEV', 810, 1010, 62, 1, '#FFD98A', true); serifLabel('BHAI - BEHEN', 540, 520, 80, eo(seg(t, tB - 0.1, tB + 0.5)), '#FFF1D6'); motes(t, 40, 23, '255,210,150', [0, 300, W, 900], 0.6, 8); } });
  cue(tB, 'sparkle', { gain: 0.5 }); }
  { const tR = Wd('raksha', 3);
  add({ id: 'C3', at: cut(3), zoom: 0.08, cam: [540, 1000], draw(lt, d, t) { world(t, 900, { r: 150 }); wb(t, 4); motherChild(t, 540, 1040, 1.5); ctx.fillStyle = 'rgba(70,35,70,0.92)'; ctx.fillRect(-20, 1420, W + 40, 600); floatDiyas(t, 5, 1480, 1800, 8);
    PT('RAKSHA', 470, 130, eob(seg(t, tR - 0.05, tR + 0.3))); flash(t, tR, '255,210,150', 0.35, 7); lightSweep(t, 3, '255,170,90', 0.15); } });
  cue(tR, 'thud', { gain: 0.4 }); }
  add({ id: 'C4', at: cut(4), zoom: 0.09, cam: [540, 900], draw(lt, d, t) { skyDusk(t); sun(t, 760, 760, 170); river(t, 760); wb(t, 8); soop(t, 540, 1020, 1.5 + 0.03 * Math.sin(t)); lightSweep(t, 2.8, '255,190,110', 0.22); motes(t, 34, 13, '255,200,120', [0, 500, W, 1000], 0.8, -16); PT('LAMBI UMAR', 420, 105, eob(seg(lt, 0.8, 1.2))); } });
  cue(cut(4), 'whoosh', { gain: 0.3 });
  { const t6 = Wd('shashthi', 5);
  add({ id: 'C5', at: cut(5), zoom: 0.07, cam: [540, 900], draw(lt, d, t) { skyDusk(t, 0.5, 1); glow(540, 820, 900, 'rgba(255,190,130,0.3)'); sun(t, 540, 860, 140, 1, '255,170,150');
    ctx.save(); ctx.globalAlpha = eo(seg(t, t6 - 0.2, t6 + 0.4)); ctx.font = '900 520px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = 'rgba(255,150,60,0.9)'; ctx.shadowBlur = 60; ctx.fillStyle = '#FFE6B0'; ctx.strokeStyle = '#3A1A10'; ctx.lineWidth = 24; ctx.lineJoin = 'round'; ctx.strokeText('6', 540, 900); ctx.fillText('6', 540, 900); ctx.restore();
    serifLabel('SHASHTHI', 540, 1130, 90, eo(seg(t, t6, t6 + 0.5)), '#FFD98A', true); river(t, 540, 1); flash(t, t6, '255,230,180', 0.4, 6); } });
  cue(t6, 'slam', { gain: 0.5 }); }
  { const tC = Wd('Chhath', 6);
  add({ id: 'C6', at: cut(6), zoom: 0.07, cam: [540, 1200], draw(lt, d, t) { world(t, 1030, { r: 105 }); floatDiyas(t, 16); crowd(t, 1180, 0.9, 12, 6, 0); wb(t, 4); PT('CHHATH', 470, 150, eob(seg(t, tC - 0.1, tC + 0.3))); flash(t, tC, '255,210,150', 0.3, 7); } });
  cue(tC, 'thud', { gain: 0.4 }); }
  { const tG = Wd('ghat', 7);
  add({ id: 'C7', at: cut(7), zoom: 0.07, cam: [540, 1100], draw(lt, d, t) { world(t, 1030, { r: 115 }); crowd(t, 1200, 1.5, 7, 8, 0); wb(t, 6); lightSweep(t, 3.4, '255,190,110', 0.18); PT('JAI CHHATHI MAIYA', 470, 80, eo(seg(t, tG, tG + 0.4))); } });
  cue(cut(7), 'whoosh', { gain: 0.4 }); }
  add({ id: 'C8', at: cut(8), zoom: 0.06, cam: [540, 1000], draw(lt, d, t) { world(t, 960, { r: 140 }); motherChild(t, 540, 1080, 1.5); ctx.fillStyle = 'rgba(70,35,70,0.92)'; ctx.fillRect(-20, 1460, W + 40, 600); floatDiyas(t, 6, 1500, 1800, 5); motes(t, 40, 3, '255,220,160', [0, 300, W, 900], 0.6, 10); PT('EK MAA', 470, 125, eo(seg(lt, 0.5, 1.0)) * (1 - seg(lt, d - 0.8, d))); } });
  return { shots: S, cues: CUES };
}
