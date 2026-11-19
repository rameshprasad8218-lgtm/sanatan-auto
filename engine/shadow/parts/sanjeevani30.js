  const T = HT.lines.map((l) => l.start); T[0] = 0; const TE = T[T.length - 1] + 6;
  const U = (i, t) => zc((t - T[i]) / ((T[i + 1] || TE) - T[i]), 0, 1);
  const SCN = (fs) => fs.map((f, i) => [T[i], i < fs.length - 1 ? T[i + 1] : 99, f]);
  function head(c, x, y, r, o) { zface(c, x, y, r, o); }
  function zbed(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#7a3b1c'; c.fillRect(-300, 0, 600, 40); c.fillStyle = '#f2e6c8'; c.fillRect(-290, -60, 580, 60); c.fillStyle = '#c1362b'; c.fillRect(-290, -40, 400, 40); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-230, -78, 70, 28, 0, 0, 7); c.fill(); c.restore(); }
  function zzz(c, t, x, y, col) { for (let k = 0; k < 3; k++) { const q = ((t * 0.5 + k / 3) % 1); ztxt(c, 'Z', x + q * 80 + k * 30, y - q * 260, 60 + k * 30, col || '#cfd8ff', 1 - q); } }
  function zbow(c, x, y, s, pull) { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#6b4526'; c.lineWidth = 12; c.beginPath(); c.arc(0, 0, 150, -1.2, 1.2); c.stroke(); c.strokeStyle = '#efe6cf'; c.lineWidth = 4; c.beginPath(); c.moveTo(150 * Math.cos(-1.2), 150 * Math.sin(-1.2)); c.lineTo(150 * Math.cos(0) - 70 * pull, 0); c.lineTo(150 * Math.cos(1.2), 150 * Math.sin(1.2)); c.stroke(); c.restore(); }
  function zmount(c, x, y, s, col, glow) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.moveTo(-320, 0); c.lineTo(-120, -300); c.lineTo(-40, -230); c.lineTo(80, -420); c.lineTo(320, 0); c.closePath(); c.fill(); c.fillStyle = 'rgba(255,255,255,0.8)'; c.beginPath(); c.moveTo(60, -380); c.lineTo(80, -420); c.lineTo(125, -340); c.lineTo(95, -355); c.lineTo(70, -330); c.closePath(); c.fill(); if (glow) { c.fillStyle = `rgba(120,255,160,${0.8 * glow})`; for (let k = 0; k < 14; k++) { c.beginPath(); c.arc(-250 + zr(k) * 480, -40 - zr(k + 3) * 220 * (1 - Math.abs(-250 + zr(k) * 480) / 400), 9, 0, 7); c.fill(); } } c.restore(); }
  function zsun(c, x, y, r, a) { const g = c.createRadialGradient(x, y, 0, x, y, r * 2.4); g.addColorStop(0, `rgba(255,220,120,${a})`); g.addColorStop(1, 'rgba(255,160,60,0)'); c.fillStyle = g; c.fillRect(x - r * 3, y - r * 3, r * 6, r * 6); c.fillStyle = `rgba(255,230,140,${a})`; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); }
  const HFUR = '#e07a2e';
  function hanPre(c, r) { c.fillStyle = '#f7cf96'; c.beginPath(); c.ellipse(0, r * 0.38, r * 0.56, r * 0.46, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(-r * 0.3, -r * 0.05, r * 0.3, r * 0.28, 0, 0, 7); c.ellipse(r * 0.3, -r * 0.05, r * 0.3, r * 0.28, 0, 0, 7); c.fill();
    c.strokeStyle = '#9a4a14'; c.lineWidth = r * 0.04; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(-r * 0.7 + k * r * 0.35, -r * 0.55); c.lineTo(-r * 0.62 + k * r * 0.35, -r * 0.42); c.stroke(); } }
  function hanPost(c, r) { for (const s of [-1, 1]) { c.fillStyle = HFUR; c.beginPath(); c.moveTo(s * r * 0.85, -r * 0.1); c.lineTo(s * r * 1.35, -r * 0.55); c.lineTo(s * r * 0.95, r * 0.25); c.closePath(); c.fill(); c.fillStyle = '#f2a98a'; c.beginPath(); c.moveTo(s * r * 0.95, -r * 0.05); c.lineTo(s * r * 1.22, -r * 0.4); c.lineTo(s * r * 1.0, r * 0.15); c.closePath(); c.fill(); }
    c.fillStyle = '#7a3a12'; c.beginPath(); c.ellipse(-r * 0.09, r * 0.2, r * 0.045, r * 0.03, 0, 0, 7); c.ellipse(r * 0.09, r * 0.2, r * 0.045, r * 0.03, 0, 0, 7); c.fill();
    c.strokeStyle = '#7a3a12'; c.lineWidth = r * 0.035; c.beginPath(); c.moveTo(-r * 0.3, -r * 0.62); c.lineTo(-r * 0.08, -r * 0.4); c.moveTo(r * 0.3, -r * 0.62); c.lineTo(r * 0.08, -r * 0.4); c.stroke();
    c.fillStyle = '#d9473b'; c.fillRect(-r * 0.03, -r * 0.62, r * 0.06, r * 0.28); }
  function hanBack(c) { c.save(); c.strokeStyle = HFUR; c.lineWidth = 34; c.lineCap = 'round'; c.beginPath(); c.moveTo(-40, -120); c.bezierCurveTo(-260, -80, -300, -380, -190, -560); c.stroke(); c.strokeStyle = '#c9651f'; c.lineWidth = 12; c.stroke(); c.restore(); }
  const HAN = { skin: HFUR, cloth: '#e8742a', cloth2: '#d9473b', cloth3: 'rgba(0,0,0,0.18)', back: hanBack, head: { hair: 'jata', hc: '#a8501a', crown: true, earring: true, smile: 0.7, pre: hanPre, post: hanPost } };
  const LAK = { skin: '#d6965f', cloth: '#6aa86a', cloth2: '#f1e3c0', cloth3: 'rgba(0,0,0,0.15)', head: { hair: 'jata', hc: '#1d1411', tilak: true, earring: true, smile: 0.3 } };
  const RAM = { skin: '#5b8fd1', cloth: '#f4cd4c', cloth2: '#f0e6c8', cloth3: 'rgba(200,60,60,0.4)', head: { hair: 'jata', hc: '#14101a', crown: true, tilak: true, earring: true, smile: 0.2 } };
  const VAI = { skin: '#d6a074', cloth: '#f4f0e6', cloth2: '#f4f0e6', cloth3: 'rgba(0,0,0,0.1)', head: { hair: 'bun', hc: '#e6e6ea', old: true, tilak: true, smile: 0.2, post: (c, r) => zbeard(c, r, '#ecebef') } };
  function nBg(c, t, a, b) { zsky(c, t, a || '#0d1230', b || '#2f3f7a', 540, 760, 'rgba(150,180,255,0.5)'); zstars(c, t, 40); }
  function sA(c, t) { const u = U(0, t), z = 1 + 0.07 * u; nBg(c, t, '#1a1030', '#6a3a4a'); c.save(); c.translate(540, 1100); c.scale(z, z); c.translate(-540, -1100);
    c.fillStyle = '#e8742a'; c.beginPath(); c.ellipse(540, 1860, 640, 330, 0, 0, 7); c.fill();
    zface(c, 540, 1270, 330, Object.assign({}, HAN.head, { skin: HAN.skin, wide: 0.8, mouth: 0.4 * zs(0.3, 1, t), blink: 0, brow: 0.05, smile: 0.5 })); c.restore();
    zmount(c, 880, 700, 0.8, '#5a4a6a', 0.8); zmotes(c, t, 26, '#ffd9a0'); }
  function sB(c, t) { const u = U(1, t); nBg(c, t, '#14102a', '#3a2a4a'); zground(c, 1250, '#4a3a3a', '#1a1010', 1420);
    c.fillStyle = '#f2e6c8'; c.fillRect(120, 1450, 560, 40); c.fillStyle = '#c1362b'; c.fillRect(120, 1420, 560, 30);
    zface(c, 230, 1330, 150, Object.assign({}, LAK.head, { skin: LAK.skin, blink: 1, smile: 0.0, brow: 0.1 }));
    zbody(c, Object.assign({}, RAM, { x: 820, y: 1700, s: 1.35, dir: -1, a1: -0.6, a2: -0.4, b1: 0.2, b2: 0.2, head: Object.assign({}, RAM.head, { blink: zblink(t, 0.5), tear: 0.4 + 0.5 * Math.sin(t * 2) * 0.5, smile: 0.0, brow: 0.1 }) }));
    ztxt(c, 'लक्ष्मण मूर्छित', 540, 400, 100, '#ffd0d0', zs(0.1, 0.3, u)); zmotes(c, t, 20, '#bcd2ff'); }
  function sC(c, t) { const u = U(2, t); nBg(c, t, '#1a1030', '#c06a4a'); zsun(c, 820, 700, 70, zs(0.4, 0.8, u));
    zbody(c, Object.assign({}, VAI, { x: 300, y: 1640, s: 1.3, dir: 1, a1: -2.4, a2: -2.6, b1: 0.1, b2: 0.2, head: Object.assign({}, VAI.head, { blink: zblink(t, 0.3), look: 0.8 }) }));
    ztxt(c, 'सूर्योदय से पहले', 540, 380, 90, '#ffe9b0', zs(0.1, 0.3, u)); ztxt(c, 'संजीवनी', 540, 500, 130, '#9cffb0', zs(0.4, 0.6, u)); zmotes(c, t, 22, '#ffd9a0'); }
  function sD(c, t) { const u = U(3, t); nBg(c, t); c.fillStyle = '#3a3a5a'; c.beginPath(); c.moveTo(0, 1250); for (let x = 0; x <= 1080; x += 90) c.lineTo(x, 900 - 220 * Math.abs(Math.sin(x * 0.006 + 0.5))); c.lineTo(1080, 1250); c.fill();
    zmount(c, 330, 1300, 1.0, '#4a4a6a', 1); zmount(c, 790, 1300, 1.1, '#454a68', 1); zground(c, 1250, '#3a3a5a', '#141a2a', 1420);
    zbody(c, Object.assign({}, HAN, { x: 540, y: 1700, s: 1.3, dir: 1, a1: 0.2, a2: 0.3, hx: 8 * Math.sin(t * 3), head: Object.assign({}, HAN.head, { wide: 1, look: Math.sin(t * 3), blink: 0, smile: 0.1, brow: 0.12 }) }));
    ztxt(c, '?', 760, 700, 220, '#ffd36a', 0.5 + 0.5 * Math.sin(t * 4)); ztxt(c, 'कौन सी जड़ी?', 540, 400, 90, '#fff1c8', zs(0.2, 0.4, u)); }
  function sE(c, t) { const u = U(4, t), lift = zs(0.25, 0.8, u); nBg(c, t, '#1a1030', '#6a3a4a'); zground(c, 1250, '#3a3a5a', '#141a2a', 1420);
    c.save(); c.translate(0, -lift * 260 + 14 * Math.sin(t * 18) * (1 - lift)); zmount(c, 540, 1000, 1.9, '#5a4a6a', 1); c.restore();
    zbody(c, Object.assign({}, HAN, { x: 540, y: 1720, s: 1.4, dir: 1, a1: -2.9, a2: -3.0, b1: -2.9, b2: -3.0, head: Object.assign({}, HAN.head, { mouth: 0.5, blink: 0, smile: 0.5, brow: 0.1 }) }));
    ztxt(c, 'जय श्री राम', 540, 330, 120, '#ffd36a', zs(0.1, 0.3, u)); if (u > 0.3 && u < 0.45) { c.fillStyle = `rgba(255,240,200,${0.7 * (1 - zs(0.3, 0.45, u))})`; c.fillRect(0, 0, 1080, 1920); } zmotes(c, t, 26, '#ffd9a0'); }
  function sF(c, t) { const u = U(5, t); nBg(c, t, '#1a1030', '#c06a4a'); const sx = zl(100, 980, u); zsun(c, 880, 800, 80, zs(0.5, 1, u));
    for (let k = 0; k < 10; k++) { c.strokeStyle = 'rgba(255,255,255,0.25)'; c.lineWidth = 4; const y = 500 + zr(k) * 900, x = (zr(k + 5) * 1080 - t * 1400) % 1300 + 1300; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 200, y); c.stroke(); }
    c.save(); c.translate(540, 1000 + 30 * Math.sin(t * 5)); c.rotate(0.12); c.translate(-540, -1000); zmount(c, 540, 820, 1.2, '#5a4a6a', 1);
    zbody(c, Object.assign({}, HAN, { x: 540, y: 1280, s: 1.0, dir: 1, a1: -2.9, a2: -3.0, b1: -2.9, b2: -3.0, head: Object.assign({}, HAN.head, { smile: 0.8, blink: 0 }) })); c.restore(); zmotes(c, t, 20, '#ffd9a0'); }
  function sG(c, t) { const u = U(6, t); zsky(c, t, '#3a2a58', '#f0a860', 540, 900, 'rgba(255,215,140,0.8)'); zrays(c, 540, 900, t, 16, 'rgba(255,235,170,0.15)', 1800); zground(c, 1250, '#7a5a3a', '#3a2a18', 1420);
    c.fillStyle = '#f2e6c8'; c.fillRect(160, 1500, 520, 30); zface(c, 250, 1400, 140, Object.assign({}, LAK.head, { skin: LAK.skin, blink: 1 - zs(0.1, 0.4, u), smile: 0.9 }));
    zbody(c, Object.assign({}, RAM, { x: 790, y: 1700, s: 1.3, dir: -1, a1: -0.4, a2: -0.3, head: Object.assign({}, RAM.head, { smile: 0.9, tear: 0.5, blink: zblink(t, 0.5) }) }));
    zbody(c, Object.assign({}, HAN, { x: 540, y: 1700, s: 1.0, dir: -1, a1: -1.4, a2: -1.5, b1: -1.4, b2: -1.5, head: Object.assign({}, HAN.head, { smile: 1, blink: zblink(t, 0.2) }) })); zpetals(c, t, T[6], 30); zmotes(c, t, 26, '#ffe6a8'); }
  const SCENES = SCN([sA, sB, sC, sD, sE, sF, sG]);
