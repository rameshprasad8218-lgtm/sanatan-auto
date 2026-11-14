// Chhath ghat scene kit (Kahani 2D v3 look): dusk sky, sun, river with reflections, diyas, crowd, soop.
import { ctx, W, H, clamp, lerp, rnd, TAU } from './lib.js';
import { K, glow, motes, fog } from './kahani.js';
import { ridge, bokeh } from './v3.js';

const vg = (y0, y1, stops) => { const g = ctx.createLinearGradient(0, y0, 0, y1); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; };
export const HZ = 1060;
/** k: 0 = deep dusk, 1 = bright golden hour ; dawn: pink-gold morning tint */
export function skyDusk(t, k = 0.5, dawn = 0) {
  const a = dawn ? ['#2A2A5E', '#C46A8A', '#FFB27A', '#FFDFA0'] : ['#1B1440', '#6B2F5E', '#E0704A', '#FFB866'];
  ctx.fillStyle = vg(0, HZ, [[0, a[0]], [0.45, a[1]], [0.8, a[2]], [1, a[3]]]); ctx.fillRect(-200, -200, W + 400, HZ + 300);
  // thin clouds
  ctx.save(); ctx.globalAlpha = 0.25; for (let i = 0; i < 6; i++) { const x = ((rnd(i) * 1500 + t * (6 + i * 2)) % 1500) - 200, y = 300 + rnd(i + 9) * 520, w = 300 + rnd(i + 3) * 400;
    const g = ctx.createRadialGradient(x, y, 0, x, y, w / 2); g.addColorStop(0, dawn ? 'rgba(255,200,180,0.8)' : 'rgba(255,150,110,0.8)'); g.addColorStop(1, 'rgba(255,150,110,0)'); ctx.save(); ctx.translate(0, y); ctx.scale(1, 0.14); ctx.translate(0, -y); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, w / 2, 0, TAU); ctx.fill(); ctx.restore(); } ctx.restore();
}
export function sun(t, x, y, r, a = 1, warm = '255,190,110') {
  glow(x, y, r * 6, `rgba(${warm},0.30)`, a); glow(x, y, r * 2.8, `rgba(255,215,150,0.55)`, a);
  ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 14; i++) { const ang = -Math.PI * 0.95 + (i / 13) * Math.PI * 0.9 + Math.sin(t * 0.4 + i) * 0.015, len = r * (5 + 2 * rnd(i)), w = 0.025 + rnd(i + 2) * 0.03;
    const g = ctx.createRadialGradient(x, y, r * 0.8, x, y, len); g.addColorStop(0, `rgba(${warm},0.15)`); g.addColorStop(1, `rgba(${warm},0)`); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang - w) * len, y + Math.sin(ang - w) * len); ctx.lineTo(x + Math.cos(ang + w) * len, y + Math.sin(ang + w) * len); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  ctx.save(); ctx.globalAlpha = a; const g = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, r * 0.1, x, y, r); g.addColorStop(0, '#FFF3C8'); g.addColorStop(0.7, '#FFC26A'); g.addColorStop(1, '#FF8F45'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
}
/** river from HZ down with a sun reflection column and ripples */
export function river(t, sx, dawn = 0) {
  ctx.fillStyle = vg(HZ, H, dawn ? [[0, '#7A4A6A'], [0.4, '#2A2A4A'], [1, '#10101E']] : [[0, '#8A4A4A'], [0.35, '#3A2244'], [1, '#0E0A18']]); ctx.fillRect(-100, HZ, W + 200, H - HZ + 100);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 16; k++) { const yy = HZ + 6 + k * k * 2.6 + k * 12, w = 70 + k * 26, wob = Math.sin(t * 2.2 + k * 1.3) * (6 + k * 2), a = 0.5 * (1 - k / 17);
    const g = ctx.createLinearGradient(sx - w, 0, sx + w, 0); g.addColorStop(0, 'rgba(255,190,110,0)'); g.addColorStop(0.5, `rgba(255,200,120,${a})`); g.addColorStop(1, 'rgba(255,190,110,0)');
    ctx.fillStyle = g; ctx.fillRect(sx - w + wob, yy, w * 2, 5 + k * 1.2); }
  ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.10; ctx.fillStyle = '#FFD9A8'; for (let i = 0; i < 40; i++) { const x = rnd(i) * W, y = HZ + 20 + Math.pow(rnd(i + 5), 1.6) * (H - HZ), p = Math.sin(t * 1.5 + i); ctx.fillRect(x, y, 40 + rnd(i) * 120 + p * 20, 2); } ctx.restore();
}
/** distant tree-line ridge for the far bank */
export function farBank(t, dawn = 0) {
  ridge(HZ + 6, 120, dawn ? '#5A3A5A' : '#3A1E38', '#1C1022', 4, t * 3, 300, 'rgba(255,170,100,0.45)');
  ridge(HZ + 14, 70, '#26142A', '#120A18', 9, t * 5, 220, 'rgba(255,170,100,0.30)');
}
export function diya(x, y, s, t, seed = 0, a = 1) {
  const fl = 0.85 + 0.15 * Math.sin(t * 11 + seed * 3) + 0.08 * Math.sin(t * 23 + seed);
  glow(x, y - 10 * s, 90 * s * fl, 'rgba(255,170,70,0.55)', a);
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = vg(-4, 24, [[0, '#C06A32'], [1, '#6A3014']]); ctx.beginPath(); ctx.moveTo(-34, 0); ctx.quadraticCurveTo(0, 38, 34, 0); ctx.quadraticCurveTo(0, 6, -34, 0); ctx.fill(); ctx.strokeStyle = '#2A1408'; ctx.lineWidth = 3; ctx.stroke();
  const g = ctx.createRadialGradient(0, -14, 1, 0, -14, 26); g.addColorStop(0, '#FFFDE0'); g.addColorStop(0.45, '#FFC24A'); g.addColorStop(1, 'rgba(255,120,30,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, -48 * fl); ctx.quadraticCurveTo(22, -16, 0, 2); ctx.quadraticCurveTo(-22, -16, 0, -48 * fl); ctx.fill(); ctx.restore();
}
export function floatDiyas(t, n = 14, yMin = HZ + 60, yMax = H - 300, seed = 3) {
  for (let i = 0; i < n; i++) { const u = rnd(seed + i), y = yMin + Math.pow(u, 1.4) * (yMax - yMin), s = 0.35 + (y - yMin) / (yMax - yMin) * 1.1, x = ((rnd(i * 3 + seed) * (W + 200) + t * (8 + 14 * s) * (i % 2 ? 1 : -1)) % (W + 200) + W + 200) % (W + 200) - 100;
    ctx.save(); ctx.globalAlpha = 0.4; ctx.fillStyle = 'rgba(255,170,70,0.5)'; ctx.beginPath(); ctx.ellipse(x, y + 26 * s, 40 * s, 8 * s, 0, 0, TAU); ctx.fill(); ctx.restore(); diya(x, y + Math.sin(t * 1.6 + i) * 3, s, t, i); }
}
/** crowd of devotees standing in the water (silhouettes, rim lit). bow 0..1 = heads bowed + hands folded */
export function crowd(t, y, s, n = 12, seed = 1, bow = 0, x0 = -40, x1 = W + 40) {
  for (let i = 0; i < n; i++) { const x = lerp(x0, x1, (i + 0.5 + (rnd(seed + i) - 0.5) * 0.6) / n), ss = s * (0.85 + rnd(i + seed) * 0.3), sw = Math.sin(t * 1.1 + i * 1.7) * 2;
    ctx.save(); ctx.translate(x, y + sw); ctx.scale(ss, ss);
    ctx.fillStyle = '#1A0F1E'; ctx.beginPath(); ctx.moveTo(-34, 70); ctx.quadraticCurveTo(-38, -30, -14, -52); ctx.lineTo(14, -52); ctx.quadraticCurveTo(38, -30, 34, 70); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.translate(0, -78 + bow * 14); ctx.rotate(bow * 0.35); ctx.beginPath(); ctx.arc(0, 0, 24, 0, TAU); ctx.fill(); ctx.restore();
    if (rnd(i + seed * 5) < 0.45) { ctx.fillStyle = '#7A1E2A'; ctx.beginPath(); ctx.moveTo(-30, -40); ctx.quadraticCurveTo(0, -60, 30, -40); ctx.lineTo(28, -26); ctx.quadraticCurveTo(0, -44, -28, -26); ctx.fill(); }
    if (bow > 0.3) { ctx.strokeStyle = '#1A0F1E'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, -30); ctx.lineTo(-8, -8); ctx.lineTo(0, -34); ctx.moveTo(30, -30); ctx.lineTo(8, -8); ctx.lineTo(0, -34); ctx.stroke(); }
    ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(255,170,90,0.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(18, -52); ctx.quadraticCurveTo(38, -30, 34, 40); ctx.stroke();
    ctx.restore(); }
  // water band over their legs + ripple
  ctx.fillStyle = vg(y + 30, y + 130, [[0, 'rgba(40,20,50,0.0)'], [0.25, 'rgba(60,30,60,0.92)'], [1, 'rgba(20,10,30,1)']]); ctx.fillRect(-20, y + 30, W + 40, 120);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(255,190,120,0.3)'; ctx.lineWidth = 3; for (let i = 0; i < n; i++) { const x = lerp(x0, x1, (i + 0.5) / n); for (let r = 0; r < 2; r++) { ctx.beginPath(); ctx.ellipse(x, y + 44 + r * 12, 60 + r * 28 + Math.sin(t * 2 + i) * 4, 8 + r * 3, 0, 0, TAU); ctx.stroke(); } } ctx.restore();
}
/** bamboo soop with fruits, thekua, sugarcane, diya. cx, cy, s */
export function soop(t, cx, cy, s = 1) {
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
  // sugarcane behind
  for (const [dx, a] of [[-150, -0.12], [-60, -0.04], [60, 0.05], [150, 0.13]]) { ctx.save(); ctx.translate(dx, -40); ctx.rotate(a); ctx.fillStyle = vg(-520, 0, [[0, '#7FB05A'], [1, '#3E6A2E']]); ctx.fillRect(-14, -520, 28, 520);
    ctx.fillStyle = 'rgba(30,50,20,0.5)'; for (let k = 1; k < 6; k++) ctx.fillRect(-14, -520 + k * 90, 28, 5); ctx.fillStyle = '#9ACA70'; ctx.beginPath(); ctx.moveTo(0, -520); ctx.quadraticCurveTo(-40, -600, -70, -640); ctx.quadraticCurveTo(-10, -590, 6, -520); ctx.fill(); ctx.restore(); }
  // tray
  ctx.fillStyle = vg(-30, 110, [[0, '#D9A860'], [1, '#8A5A24']]); ctx.beginPath(); ctx.ellipse(0, 40, 300, 100, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#3A2410'; ctx.lineWidth = 6; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 40, 292, 94, 0, 0, TAU); ctx.clip(); ctx.strokeStyle = 'rgba(70,40,15,0.45)'; ctx.lineWidth = 3; for (let i = -320; i < 320; i += 26) { ctx.beginPath(); ctx.moveTo(i, -60); ctx.lineTo(i + 80, 160); ctx.stroke(); ctx.beginPath(); ctx.moveTo(i + 80, -60); ctx.lineTo(i, 160); ctx.stroke(); } ctx.restore();
  // fruits
  const fruit = (x, y, r, c1, c2) => { const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(40,20,10,0.5)'; ctx.lineWidth = 3; ctx.stroke(); };
  fruit(-190, 10, 44, '#FFB04A', '#D9671C'); fruit(-110, 0, 40, '#FFC85C', '#E07A22'); fruit(120, 6, 42, '#FF9B50', '#C9561A'); fruit(200, 20, 38, '#F2D06A', '#B8862A'); fruit(-40, 12, 34, '#E85A5A', '#9A2230'); fruit(60, 2, 36, '#D8E86A', '#7A9A2A');
  // thekua (golden cookies)
  for (const [x, y, r] of [[-150, 60, 0.2], [-20, 68, -0.1], [90, 62, 0.15], [170, 70, -0.2], [-80, 40, 0.05]]) { ctx.save(); ctx.translate(x, y); ctx.rotate(r); const g = ctx.createLinearGradient(0, -22, 0, 22); g.addColorStop(0, '#E8A850'); g.addColorStop(1, '#9A5A1E'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-46, -22, 92, 44, 16); ctx.fill(); ctx.strokeStyle = '#4A2A0C'; ctx.lineWidth = 3; ctx.stroke(); ctx.strokeStyle = 'rgba(70,35,10,0.5)'; ctx.beginPath(); ctx.moveTo(-26, -8); ctx.lineTo(26, 8); ctx.moveTo(-26, 8); ctx.lineTo(26, -8); ctx.stroke(); ctx.restore(); }
  diya(0, -6, 1.5, t, 7); ctx.restore();
}
