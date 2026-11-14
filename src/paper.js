// Paper-cut 2D devotional kit: constant brown wall, locked characters (side-face), flat posters. Pure functions of time.
import { ctx, W, H, clamp, lerp, rnd, TAU, eo } from './lib.js';

let WALL = null;
export function wall() {
  if (!WALL) {
    const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#9A6438'); gr.addColorStop(1, '#7A4A28'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 70; i++) { const x = rnd(i) * W, y = rnd(i + 50) * H, r = 120 + rnd(i + 9) * 260; const b = g.createRadialGradient(x, y, 0, x, y, r); const l = rnd(i + 3) < 0.5; b.addColorStop(0, l ? 'rgba(190,130,80,0.18)' : 'rgba(60,32,16,0.20)'); b.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = b; g.fillRect(x - r, y - r, r * 2, r * 2); }
    const d = g.getImageData(0, 0, W, H), px = d.data; for (let i = 0; i < px.length; i += 4) { const n = (Math.random() - 0.5) * 34; px[i] += n; px[i + 1] += n * 0.8; px[i + 2] += n * 0.6; } g.putImageData(d, 0, 0);
    g.strokeStyle = 'rgba(50,26,12,0.35)'; g.lineWidth = 3; for (let k = 0; k < 7; k++) { let x = rnd(k * 5) * W, y = rnd(k * 5 + 1) * H * 0.7; g.beginPath(); g.moveTo(x, y); for (let j = 0; j < 9; j++) { x += (rnd(k * 20 + j) - 0.5) * 70; y += 20 + rnd(k * 30 + j) * 50; g.lineTo(x, y); } g.stroke(); }
    const v = g.createRadialGradient(540, 900, 500, 540, 960, 1300); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(30,14,6,0.45)'); g.fillStyle = v; g.fillRect(0, 0, W, H);
    g.fillStyle = '#5A3318'; g.fillRect(0, 1560, W, 360); g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(0, 1560, W, 10);
    WALL = c;
  }
  ctx.drawImage(WALL, 0, 0);
}
/** paper shape: soft drop shadow offset + fill + thin dark edge */
function P(fn, fill, edge = 'rgba(40,20,8,0.55)') {
  ctx.save(); ctx.translate(7, 9); ctx.beginPath(); fn(); ctx.fillStyle = 'rgba(30,14,6,0.32)'; ctx.fill(); ctx.restore();
  ctx.beginPath(); fn(); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 3.5; ctx.strokeStyle = edge; ctx.lineJoin = 'round'; ctx.stroke();
}
const SKIN = '#E0A46C', SKIN_D = '#C98B54';
const LOOKS = {
  main: { top: '#F2C230', topD: '#D9A41C', bottom: '#F6F0DC', hair: '#1E120A', long: true },
  second: { top: '#2F6FD0', topD: '#245AAE', bottom: '#2A2E3C', hair: '#1E120A', long: false },
};
const ARMS = { rest: [0.15, 0.25], wave: [-2.3, 0.5], point: [-1.2, -0.2], pray: [-0.5, -2.2], think: [-0.7, -2.5], up: [-2.7, 0.1], ask: [-1.6, -0.9] };
/** side-face paper-cut person. (x, y) = feet centre, s = scale (≈520 px tall at 1), face = +1 right / -1 left, pose name, t = time */
export function person(who, x, y, s, face, pose, t, o = {}) {
  const K = LOOKS[who], [a1, a2] = ARMS[pose] || ARMS.rest, sw = pose === 'wave' ? Math.sin(t * 6) * 0.35 : Math.sin(t * 1.3) * 0.04;
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.6) * 2); ctx.scale(face * s, s);
  // legs
  const leg = (dx, c) => { P(() => ctx.roundRect(dx - 17, -200, 34, 190, 10), c); P(() => { ctx.moveTo(dx - 20, -14); ctx.lineTo(dx + 46, -14); ctx.quadraticCurveTo(dx + 56, 0, dx + 40, 0); ctx.lineTo(dx - 20, 0); ctx.closePath(); }, '#3A2214'); };
  if (K.long) { P(() => { ctx.moveTo(-70, -250); ctx.lineTo(70, -250); ctx.lineTo(60, -40); ctx.lineTo(8, -60); ctx.lineTo(-8, -60); ctx.lineTo(-60, -40); ctx.closePath(); }, K.bottom); leg(-26, K.bottom); leg(30, K.bottom); }
  else { leg(-24, K.bottom); leg(26, K.bottom); }
  // back arm (hidden-ish)
  ctx.save(); ctx.translate(-10, -420); ctx.rotate(0.15 + sw * 0.3); P(() => ctx.roundRect(-9, 0, 18, 150, 9), K.topD); ctx.restore();
  // torso
  P(() => { ctx.moveTo(-58, -440); ctx.quadraticCurveTo(0, -460, 58, -440); ctx.lineTo(K.long ? 72 : 64, K.long ? -210 : -230); ctx.lineTo(K.long ? -72 : -64, K.long ? -210 : -230); ctx.closePath(); }, K.top);
  if (K.long) { ctx.fillStyle = K.topD; ctx.beginPath(); ctx.moveTo(10, -440); ctx.lineTo(24, -440); ctx.lineTo(30, -215); ctx.lineTo(14, -215); ctx.closePath(); ctx.fill(); }
  // neck + head (profile facing +x)
  P(() => ctx.roundRect(-14, -490, 30, 56, 8), SKIN_D);
  ctx.save(); ctx.translate(0, -520); ctx.rotate(Math.sin(t * 0.9) * 0.03);
  P(() => { ctx.moveTo(-52, -20); ctx.quadraticCurveTo(-56, -80, 0, -84); ctx.quadraticCurveTo(46, -82, 54, -40); ctx.lineTo(70, -10); ctx.lineTo(54, -2); ctx.quadraticCurveTo(58, 30, 40, 56); ctx.quadraticCurveTo(0, 74, -34, 46); ctx.quadraticCurveTo(-56, 20, -52, -20); }, SKIN);
  P(() => { ctx.moveTo(-56, -30); ctx.quadraticCurveTo(-60, -96, 4, -96); ctx.quadraticCurveTo(48, -94, 54, -52); ctx.quadraticCurveTo(20, -64, -10, -50); ctx.quadraticCurveTo(-30, -40, -56, -30); }, K.hair);
  P(() => ctx.ellipse(-30, -8, 11, 16, 0, 0, TAU), SKIN_D);
  const blink = (t % 3.2) > 3.05 ? 0.12 : 1, lx = o.look ?? Math.sin(t * 0.7) * 3;
  ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.ellipse(24, -16, 15, 17 * blink, 0, 0, TAU); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#2A150A'; ctx.stroke();
  ctx.fillStyle = '#120804'; ctx.beginPath(); ctx.arc(28 + lx, -16, 7 * (blink > 0.5 ? 1 : 0.2), 0, TAU); ctx.fill();
  ctx.strokeStyle = '#1E120A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10, -40); ctx.quadraticCurveTo(26, -50, 42, -40); ctx.stroke();
  ctx.strokeStyle = '#7A2E1A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(30, 26); ctx.quadraticCurveTo(40, 30 + (o.talk ? Math.sin(t * 14) * 4 : 0), 50, 24); ctx.stroke();
  ctx.restore();
  // front arm: shoulder pivot
  ctx.save(); ctx.translate(22, -425); ctx.rotate(a1 + sw);
  P(() => ctx.roundRect(-10, 0, 20, 128, 10), K.top); ctx.translate(0, 124); ctx.rotate(a2);
  P(() => ctx.roundRect(-9, -4, 18, 118, 9), SKIN); P(() => ctx.ellipse(0, 122, 16, 20, 0, 0, TAU), SKIN); ctx.restore();
  ctx.restore();
}
/** hanging poster/calendar frame: flip k 0..1 (paper turn). kind picks the picture. */
export function poster(kind, t, k = 1) {
  const sx = Math.max(0.02, Math.abs(Math.cos((1 - eo(clamp(k))) * Math.PI / 2)));
  ctx.save(); ctx.translate(540, 470); ctx.rotate(Math.sin(t * 1.1) * 0.012); ctx.scale(sx, 1);
  ctx.strokeStyle = '#3A2010'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-120, -270); ctx.lineTo(0, -380); ctx.lineTo(120, -270); ctx.stroke();
  P(() => ctx.roundRect(-290, -270, 580, 540, 18), '#F6E7C2', '#5A2E12'); P(() => ctx.roundRect(-262, -242, 524, 484, 12), '#FFF6DA', '#B8502A');
  ctx.save(); ctx.beginPath(); ctx.roundRect(-262, -242, 524, 484, 12); ctx.clip(); (ART[kind] || ART.calendar)(t); ctx.restore(); ctx.restore();
}
const circ = (x, y, r, c) => P(() => ctx.arc(x, y, r, 0, TAU), c);
const cross = (c = '#D62828') => { ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 170, 0, TAU); ctx.moveTo(-120, -120); ctx.lineTo(120, 120); ctx.stroke(); ctx.restore(); };
const txt = (s, x, y, size, c = '#5A2E12', font = 'Tiro') => { ctx.save(); ctx.font = `${font === 'Tiro' ? 400 : 900} ${size}px ${font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = c; ctx.fillText(s, x, y); ctx.restore(); };
function chicken(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P(() => { ctx.moveTo(-90, 30); ctx.quadraticCurveTo(-60, -90, 40, -70); ctx.quadraticCurveTo(110, -60, 90, 40); ctx.quadraticCurveTo(40, 110, -60, 90); ctx.closePath(); }, '#F3F3EE'); P(() => ctx.ellipse(-70, 0, 38, 56, -0.6, 0, TAU), '#E6E2D8'); circ(60, -70, 42, '#F3F3EE'); P(() => { ctx.moveTo(40, -112); ctx.lineTo(50, -140); ctx.lineTo(62, -114); ctx.lineTo(74, -138); ctx.lineTo(82, -108); ctx.closePath(); }, '#D62828'); P(() => { ctx.moveTo(98, -74); ctx.lineTo(132, -62); ctx.lineTo(98, -52); ctx.closePath(); }, '#F2A31B'); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(70, -78, 6, 0, TAU); ctx.fill(); ctx.strokeStyle = '#F2A31B'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-10, 92); ctx.lineTo(-10, 130); ctx.moveTo(30, 92); ctx.lineTo(30, 130); ctx.stroke(); ctx.restore(); }
function gada(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); P(() => ctx.roundRect(-14, -40, 28, 260, 10), '#B8742C'); circ(0, -90, 78, '#E8A33A'); for (let i = 0; i < 8; i++) { const a = i * TAU / 8; P(() => { ctx.moveTo(Math.cos(a - 0.2) * 70, -90 + Math.sin(a - 0.2) * 70); ctx.lineTo(Math.cos(a) * 100, -90 + Math.sin(a) * 100); ctx.lineTo(Math.cos(a + 0.2) * 70, -90 + Math.sin(a + 0.2) * 70); ctx.closePath(); }, '#C4811F'); } circ(0, -90, 36, '#F6C66A'); ctx.restore(); }
function house(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P(() => ctx.rect(-110, -20, 220, 150), '#F0D9A8'); P(() => { ctx.moveTo(-140, -20); ctx.lineTo(0, -120); ctx.lineTo(140, -20); ctx.closePath(); }, '#B8502A'); P(() => ctx.rect(-26, 50, 52, 80), '#6A3A1A'); const f = 0.8 + 0.2 * Math.sin(t * 9); P(() => ctx.rect(48, 10, 44, 44), `rgba(255,${190 + 30 * f | 0},90,1)`); ctx.restore(); }
const ART = {
  calendar: (t) => { P(() => ctx.rect(-230, -210, 460, 120), '#D62828'); txt('मंगलवार', 0, -150, 92, '#FFF6DA'); txt('TUESDAY', 0, -40, 54, '#5A2E12', 'Inter'); txt('9', 0, 100, 190, '#D62828', 'Inter'); },
  hanuman: (t) => { circ(0, -10, 190, '#E8602A'); circ(0, -10, 150, '#F28C3A'); gada(-10, -10, 0.85, 0.35); txt('ॐ', 90, -130, 100, '#FFF6DA'); },
  truck: (t) => { ctx.translate(0, 20); P(() => ctx.rect(-220, -110, 270, 160), '#2F6FD0'); P(() => { ctx.moveTo(60, -80); ctx.lineTo(150, -80); ctx.lineTo(210, -10); ctx.lineTo(210, 50); ctx.lineTo(60, 50); ctx.closePath(); }, '#D62828'); P(() => ctx.rect(100, -60, 60, 40), '#CFE6F5'); circ(-120, 70, 38, '#2A1A10'); circ(110, 70, 38, '#2A1A10'); circ(-120, 70, 14, '#CCC'); circ(110, 70, 14, '#CCC'); txt('जय बजरंगबली', -85, -30, 44, '#FFF6DA'); },
  chicken: (t) => { chicken(0, 10, 1.15); cross(); },
  road: (t) => { P(() => ctx.rect(-262, -242, 524, 484), '#1E2A55'); circ(150, -140, 44, '#F6E7B0'); for (let i = 0; i < 12; i++) { ctx.fillStyle = '#FFF6DA'; ctx.beginPath(); ctx.arc(-230 + rnd(i) * 400, -220 + rnd(i + 4) * 110, 4, 0, TAU); ctx.fill(); } P(() => { ctx.moveTo(-262, 242); ctx.lineTo(-262, 20); ctx.quadraticCurveTo(-60, -20, 40, 40); ctx.quadraticCurveTo(160, 100, 262, 40); ctx.lineTo(262, 242); ctx.closePath(); }, '#4B3A2C'); ctx.strokeStyle = '#F2C230'; ctx.lineWidth = 8; ctx.setLineDash([26, 20]); ctx.beginPath(); ctx.moveTo(-262, 150); ctx.quadraticCurveTo(-60, 90, 60, 150); ctx.quadraticCurveTo(160, 200, 262, 150); ctx.stroke(); ctx.setLineDash([]); },
  temple: (t) => { P(() => ctx.rect(-130, 0, 260, 190), '#F0D9A8'); P(() => { ctx.moveTo(-110, 0); ctx.quadraticCurveTo(-90, -120, 0, -190); ctx.quadraticCurveTo(90, -120, 110, 0); ctx.closePath(); }, '#E8602A'); P(() => ctx.rect(-4, -240, 8, 60), '#5A2E12'); P(() => { ctx.moveTo(4, -240); ctx.lineTo(70, -220); ctx.lineTo(4, -200); ctx.closePath(); }, '#D62828'); P(() => ctx.roundRect(-34, 70, 68, 120, [34, 34, 0, 0]), '#6A3A1A'); },
  plate: (t) => { circ(0, 20, 170, '#C9CED6'); circ(0, 20, 140, '#EDEFF3'); circ(-60, -20, 46, '#E8B23A'); P(() => ctx.ellipse(60, -10, 54, 54, 0, 0, TAU), '#EBC88A'); circ(0, 70, 42, '#3F9A4B'); circ(-50, 80, 20, '#7ACB6E'); },
  onion: (t) => { P(() => { ctx.moveTo(0, -140); ctx.quadraticCurveTo(110, -20, 60, 80); ctx.quadraticCurveTo(0, 130, -60, 80); ctx.quadraticCurveTo(-110, -20, 0, -140); }, '#B04AA0'); P(() => { ctx.moveTo(-6, -140); ctx.lineTo(-6, -190); ctx.lineTo(8, -190); ctx.lineTo(8, -140); ctx.closePath(); }, '#7ACB6E'); cross(); },
  diya: (t) => { P(() => { ctx.moveTo(-130, 40); ctx.quadraticCurveTo(0, 190, 130, 40); ctx.quadraticCurveTo(0, 70, -130, 40); }, '#B8602A'); const f = 1 + 0.08 * Math.sin(t * 10); P(() => { ctx.moveTo(0, -150 * f); ctx.quadraticCurveTo(60, -50, 0, 30); ctx.quadraticCurveTo(-60, -50, 0, -150 * f); }, '#F6B52A'); P(() => { ctx.moveTo(0, -70); ctx.quadraticCurveTo(26, -20, 0, 20); ctx.quadraticCurveTo(-26, -20, 0, -70); }, '#FFF0A0'); },
  home: (t) => { house(0, 20, 1.3, t); },
  ask: (t) => { txt('?', 0, 20, 400, '#D62828', 'Inter'); },
  chickplate: (t) => { chicken(-90, 0, 0.8); ctx.save(); ctx.translate(120, 40); ctx.scale(0.55, 0.55); ART.plate(t); ctx.restore(); },
  hanumancal: (t) => { P(() => ctx.rect(-230, -210, 460, 100), '#D62828'); txt('मंगलवार', 0, -160, 76, '#FFF6DA'); gada(0, 20, 0.7, 0.3); },
};
