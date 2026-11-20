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
  function sea(c, t, y0) { const g = c.createLinearGradient(0, y0, 0, 1920); g.addColorStop(0, '#2c6c9c'); g.addColorStop(1, '#0c2a4a'); c.fillStyle = g; c.fillRect(0, y0, 1080, 1920 - y0);
    c.strokeStyle = 'rgba(255,255,255,0.28)'; c.lineWidth = 5; for (let k = 0; k < 14; k++) { const y = y0 + 40 + k * 60, o = (t * 60 * (1 + k % 3 * 0.3) + k * 90) % 300; for (let x = -300; x < 1200; x += 300) { c.beginPath(); c.moveTo(x + o, y); c.quadraticCurveTo(x + o + 40, y - 14, x + o + 80, y); c.stroke(); } } }
  function stone(c, x, y, s, lab, glow, rot) { c.save(); c.translate(x, y); c.rotate(rot || 0); c.scale(s, s);
    if (glow > 0) { const g = c.createRadialGradient(0, 0, 0, 0, 0, 260); g.addColorStop(0, `rgba(255,210,100,${0.8 * glow})`); g.addColorStop(1, 'rgba(255,210,100,0)'); c.fillStyle = g; c.fillRect(-300, -300, 600, 600); }
    c.fillStyle = '#7d7f86'; c.beginPath(); c.moveTo(-120, 20); c.quadraticCurveTo(-130, -80, -30, -100); c.quadraticCurveTo(80, -110, 125, -20); c.quadraticCurveTo(130, 70, 20, 80); c.quadraticCurveTo(-90, 90, -120, 20); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.2)'; c.beginPath(); c.ellipse(-40, -50, 50, 22, -0.4, 0, 7); c.fill(); if (lab) ztxt(c, 'राम', 0, 30, 80, glow > 0 ? '#ffd36a' : '#e8e0c8', 1); c.restore(); }
  function splash(c, x, y, q) { c.strokeStyle = `rgba(255,255,255,${1 - q})`; c.lineWidth = 6; for (let k = 0; k < 8; k++) { const a = -Math.PI + k * Math.PI / 7; c.beginPath(); c.moveTo(x + Math.cos(a) * 30 * (1 + q), y + Math.sin(a) * 30 * (1 + q)); c.lineTo(x + Math.cos(a) * 110 * q + Math.cos(a) * 30, y + Math.sin(a) * 160 * q + Math.sin(a) * 30); c.stroke(); } }
  function dusk(c, t) { zsky(c, t, '#2a1a4a', '#e0804a', 800, 820, 'rgba(255,200,120,0.7)'); }
  function sA(c, t) { const u = U(0, t), z = 1 + 0.07 * u; dusk(c, t); sea(c, t, 1300);
    c.save(); c.translate(540, 1000); c.scale(z, z); c.translate(-540, -1000); c.fillStyle = '#f4cd4c'; c.beginPath(); c.ellipse(540, 1850, 640, 320, 0, 0, 7); c.fill();
    zface(c, 540, 1080, 340, Object.assign({}, RAM.head, { skin: RAM.skin, wide: 0.5, blink: zblink(t, 1), tear: zs(1, 3.5, t), smile: 0.0, brow: 0.08, brow2: 0.2, look: 0.6 })); c.restore();
    const q = zs(0.6, 3.6, t); stone(c, 880, zl(300, 1450, q * q), 0.55, false, 0, q * 3); if (q > 0.95) splash(c, 880, 1460, (t - 3.5) * 2); zmotes(c, t, 22, '#ffd9a0'); }
  function sB(c, t) { const u = U(1, t); dusk(c, t); sea(c, t, 1100); c.fillStyle = '#6a5a3a'; c.fillRect(0, 1500, 1080, 420);
    for (let k = 0; k < 4; k++) { const wx = 160 + k * 260, bob = Math.sin(t * 5 + k) * 6; zbody(c, Object.assign({}, HAN, { x: wx, y: 1720 + bob, s: 0.7, dir: 1, a1: -0.8, a2: -0.6, b1: -0.8, b2: -0.6, head: Object.assign({}, HAN.head, { smile: 0.3, blink: zblink(t, k) }) })); }
    for (let k = 0; k < 4; k++) { const q = ((t * 0.5 + k / 4) % 1); stone(c, 150 + k * 260 + 50, 1250 + q * 300, 0.4, false, 0, q * 5); } splash(c, 540, 1190, (t * 1.2) % 1);
    ztxt(c, 'हर पत्थर डूबा', 540, 380, 110, '#fff1c8', zs(0.1, 0.3, u)); }
  function sC(c, t) { const u = U(2, t); zsky(c, t, '#40281a', '#c27a3a', 540, 900, 'rgba(255,200,110,0.5)'); const g = zs(0.5, 1, u);
    stone(c, 540, 1000, 2.6, true, g, 0); zface(c, 250, 1500, 150, Object.assign({}, HAN.head, { skin: HAN.skin, smile: 0.8, blink: zblink(t, 0.3), look: 1 }));
    c.fillStyle = HAN.skin; c.beginPath(); c.arc(zl(330, 520, u), zl(1450, 1050, u), 50, 0, 7); c.fill(); c.strokeStyle = '#ffd36a'; c.lineWidth = 12; c.beginPath(); c.moveTo(zl(330, 520, u), zl(1450, 1050, u)); c.lineTo(zl(330, 520, u) + 30, zl(1450, 1050, u) + 20); c.stroke();
    ztxt(c, 'राम नाम लिखा', 540, 380, 100, '#ffe9b0', zs(0.1, 0.3, u)); zmotes(c, t, 26, '#ffd36a', 2); }
  function sD(c, t) { const u = U(3, t); dusk(c, t); sea(c, t, 1000); zsun(c, 820, 820, 60, 0.8);
    for (let k = 0; k < 9; k++) { const x = 100 + k * 110 + (k % 2) * 8, y = 1030 + k * 30 + Math.sin(t * 2.5 + k) * 8; stone(c, x, y, 0.45 + k * 0.03, k % 2 == 0, 0.3, 0); }
    c.save(); c.translate(540, 1500 + Math.sin(t * 2) * 20); stone(c, 0, 0, 1.4, true, 1, Math.sin(t * 1.5) * 0.06); c.restore();
    ztxt(c, 'पत्थर तैरे!', 540, 380, 130, '#ffe08a', zs(0.1, 0.3, u)); zpetals(c, t, T[3] + 0.3, 24); zmotes(c, t, 24, '#ffd9a0'); }
  function sE(c, t) { const u = U(4, t), th = zs(0.35, 0.55, u), fall = zs(0.55, 0.95, u); dusk(c, t); sea(c, t, 1250);
    zbody(c, Object.assign({}, RAM, { x: 330, y: 1600, s: 1.3, dir: 1, a1: -1.6 + th * 1.2, a2: -0.8, b1: 0.2, b2: 0.2, head: Object.assign({}, RAM.head, { smile: 0.2 + 0.3 * (1 - fall) * 0, blink: zblink(t, 0.3), tear: fall * 0.7, brow: 0.1 * fall }) }));
    if (th < 0.01) stone(c, 520, 1050, 0.5, false, 0, 0); else { const q = zc((u - 0.45) / 0.45); stone(c, zl(520, 900, q), 1000 + 620 * q * q, 0.5, false, 0, q * 4); if (q > 0.93) splash(c, 900, 1260, (u - 0.88) * 8); }
    ztxt(c, 'राम का पत्थर?', 540, 380, 100, '#ffd0d0', zs(0.1, 0.3, u)); if (fall > 0.9) ztxt(c, 'डूब गया', 540, 520, 120, '#ff8a6a', 1); }
  function sF(c, t) { const u = U(5, t); zsky(c, t, '#2a1a4a', '#f0a050', 540, 800, 'rgba(255,215,140,0.6)'); zground(c, 1250, '#7a5a3a', '#3a2a18', 1420);
    zbody(c, Object.assign({}, HAN, { x: 280, y: 1700, s: 1.2, dir: 1, a1: -1.2, a2: -1.5, b1: -1.2, b2: -1.5, head: Object.assign({}, HAN.head, { smile: 0.7, mouth: 0.4 * Math.abs(Math.sin(t * 7)), blink: 0 }) }));
    zbody(c, Object.assign({}, RAM, { x: 800, y: 1700, s: 1.3, dir: -1, a1: 0.1, a2: 0.2, b1: 0.15, b2: 0.2, head: Object.assign({}, RAM.head, { smile: 0.5, blink: zblink(t, 0.4), tear: 0.3 }) }));
    ztxt(c, 'जिसे आप छोड़ दें', 540, 380, 90, '#fff1c8', zs(0.1, 0.3, u)); ztxt(c, 'वो डूबेगा ही', 540, 500, 100, '#ffd36a', zs(0.4, 0.6, u)); zmotes(c, t, 22, '#ffe6a8'); }
  function sG(c, t) { const u = U(6, t); zsky(c, t, '#3a2a58', '#f0a860', 540, 760, 'rgba(255,215,140,0.9)'); zrays(c, 540, 760, t, 16, 'rgba(255,235,170,0.17)', 1800); sea(c, t, 1350);
    ztxt(c, 'राम', 540, 900, 380 + 20 * Math.sin(t * 2), '#ffd36a', zs(0, 0.2, u));
    for (let k = 0; k < 7; k++) stone(c, 120 + k * 140, 1380 + Math.sin(t * 2 + k) * 8, 0.45, false, 0.4, 0);
    zbody(c, Object.assign({}, HAN, { x: 250, y: 1760, s: 1.0, dir: 1, a1: -1.4, a2: -1.5, b1: -1.4, b2: -1.5, head: Object.assign({}, HAN.head, { smile: 1, blink: zblink(t, 0.2) }) }));
    zbody(c, Object.assign({}, RAM, { x: 830, y: 1760, s: 1.1, dir: -1, head: Object.assign({}, RAM.head, { smile: 0.9, tear: 0.4 }) })); zpetals(c, t, T[6], 30); zmotes(c, t, 26, '#ffe6a8'); }
  const SCENES = SCN([sA, sB, sC, sD, sE, sF, sG]);
