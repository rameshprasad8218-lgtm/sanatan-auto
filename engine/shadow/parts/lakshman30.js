  const T = HT.lines.map((l) => l.start); T[0] = 0; const TE = T[T.length - 1] + 6;
  const U = (i, t) => zc((t - T[i]) / ((T[i + 1] || TE) - T[i]), 0, 1);
  const SCN = (fs) => fs.map((f, i) => [T[i], i < fs.length - 1 ? T[i + 1] : 99, f]);
  function head(c, x, y, r, o) { zface(c, x, y, r, o); }
  function zbed(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#7a3b1c'; c.fillRect(-300, 0, 600, 40); c.fillStyle = '#f2e6c8'; c.fillRect(-290, -60, 580, 60); c.fillStyle = '#c1362b'; c.fillRect(-290, -40, 400, 40); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-230, -78, 70, 28, 0, 0, 7); c.fill(); c.restore(); }
  function zzz(c, t, x, y, col) { for (let k = 0; k < 3; k++) { const q = ((t * 0.5 + k / 3) % 1); ztxt(c, 'Z', x + q * 80 + k * 30, y - q * 260, 60 + k * 30, col || '#cfd8ff', 1 - q); } }
  function zbow(c, x, y, s, pull) { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#6b4526'; c.lineWidth = 12; c.beginPath(); c.arc(0, 0, 150, -1.2, 1.2); c.stroke(); c.strokeStyle = '#efe6cf'; c.lineWidth = 4; c.beginPath(); c.moveTo(150 * Math.cos(-1.2), 150 * Math.sin(-1.2)); c.lineTo(150 * Math.cos(0) - 70 * pull, 0); c.lineTo(150 * Math.cos(1.2), 150 * Math.sin(1.2)); c.stroke(); c.restore(); }
  function zmount(c, x, y, s, col, glow) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.moveTo(-320, 0); c.lineTo(-120, -300); c.lineTo(-40, -230); c.lineTo(80, -420); c.lineTo(320, 0); c.closePath(); c.fill(); c.fillStyle = 'rgba(255,255,255,0.8)'; c.beginPath(); c.moveTo(60, -380); c.lineTo(80, -420); c.lineTo(125, -340); c.lineTo(95, -355); c.lineTo(70, -330); c.closePath(); c.fill(); if (glow) { c.fillStyle = `rgba(120,255,160,${0.8 * glow})`; for (let k = 0; k < 14; k++) { c.beginPath(); c.arc(-250 + zr(k) * 480, -40 - zr(k + 3) * 220 * (1 - Math.abs(-250 + zr(k) * 480) / 400), 9, 0, 7); c.fill(); } } c.restore(); }
  function zsun(c, x, y, r, a) { const g = c.createRadialGradient(x, y, 0, x, y, r * 2.4); g.addColorStop(0, `rgba(255,220,120,${a})`); g.addColorStop(1, 'rgba(255,160,60,0)'); c.fillStyle = g; c.fillRect(x - r * 3, y - r * 3, r * 6, r * 6); c.fillStyle = `rgba(255,230,140,${a})`; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); }
  const LAK = { skin: '#d6965f', cloth: '#6aa86a', cloth2: '#f1e3c0', cloth3: 'rgba(0,0,0,0.15)', head: { hair: 'jata', hc: '#1d1411', tilak: true, earring: true, smile: 0.4 } };
  const URM = { skin: '#e0a577', cloth: '#d9473b', cloth2: '#f2c14a', cloth3: 'rgba(255,255,255,0.2)', head: { hair: 'bun', hc: '#1d1411', bindi: true, earring: true, smile: 0.6 } };
  const NID = { skin: '#9a8ad8', cloth: '#3a3a8a', cloth2: '#5a4aa8', cloth3: 'rgba(255,255,255,0.2)', head: { hair: 'bun', hc: '#241a4a', bindi: true, earring: true, smile: 0.7, post: (c, r) => zmoon(c, r) } };
  function nightBg(c, t, a, b) { zsky(c, t, a || '#0d1230', b || '#2f3f7a', 540, 760, 'rgba(150,180,255,0.5)'); zstars(c, t, 40); zmoon2(c, 840, 420, 90); }
  function zmoon2(c, x, y, r) { c.fillStyle = '#f4f0dc'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); }
  function sA(c, t) { const u = U(0, t), z = 1 + 0.06 * u; nightBg(c, t); c.save(); c.translate(540, 1100); c.scale(z, z); c.translate(-540, -1100);
    c.fillStyle = '#6aa86a'; c.beginPath(); c.ellipse(540, 1860, 640, 330, 0, 0, 7); c.fill();
    zface(c, 540, 1270, 320, Object.assign({}, LAK.head, { skin: LAK.skin, wide: 0.7, blink: 0, look: Math.sin(t * 2) * 0.6, brow: 0.03, smile: 0.2 })); c.restore(); ztxt(c, '१४', 880, 1100, 200, '#ffe08a', zs(0.5, 1, t)); zmotes(c, t, 24, '#bcd2ff'); }
  function sB(c, t) { const u = U(1, t); nightBg(c, t); ztrees(c, 1160, 6, 1.1, '#101a2a', u * 60, 33); zground(c, 1190, '#2a3a4a', '#0d1420', 1360);
    zhut(c, 780, 1220, 1.15, 0.9); const bx = 300 - 20 * Math.sin(t * 1.2);
    zbody(c, Object.assign({}, LAK, { x: bx, y: 1640, s: 1.25, dir: 1, a1: -0.15, a2: -0.2, b1: -0.9, b2: -1.0, head: Object.assign({}, LAK.head, { blink: zblink(t, 0.3), look: 0.4 }) })); zbow(c, bx + 120, 1250, 1.2, 0.2);
    ztxt(c, 'पहरा', 540, 420, 110, '#fff1c8', zs(0.1, 0.3, u)); zmotes(c, t, 24, '#ffe0a8'); }
  function sC(c, t) { const u = U(2, t); nightBg(c, t, '#1a1040', '#4a3a8a'); zzz(c, t, 600, 900, '#cfc8ff');
    zbody(c, Object.assign({}, NID, { x: 760, y: 1640, s: 1.3, dir: -1, a1: -0.8, a2: -0.7, b1: 0.2, b2: 0.2, head: Object.assign({}, NID.head, { blink: zblink(t, 0.5), smile: 0.8 }) }));
    zbody(c, Object.assign({}, LAK, { x: 300, y: 1640, s: 1.3, dir: 1, a1: -1.2, a2: -1.3, b1: -1.2, b2: -1.3, head: Object.assign({}, LAK.head, { blink: zblink(t, 0.2), smile: 0.5, look: 0.5 }) }));
    ztxt(c, 'वरदान', 540, 400, 120, '#d8d0ff', zs(0.1, 0.3, u)); zmotes(c, t, 24, '#d8d0ff'); }
  function sD(c, t) { const u = U(3, t); nightBg(c, t, '#1a1040', '#4a3a8a'); zzz(c, t, 250, 1000, '#cfc8ff'); c.save(); c.translate(540, 1100); c.scale(1.02 + 0.05 * u, 1.02 + 0.05 * u); c.translate(-540, -1100);
    zface(c, 540, 1180, 330, Object.assign({}, NID.head, { skin: NID.skin, blink: zblink(t, 0.4), smile: 0.8, look: 0.3 })); c.restore();
    ztxt(c, 'तुम्हारे हिस्से की नींद', 540, 480, 70, '#ffe9b0', zs(0.1, 0.25, u)); ztxt(c, 'कोई और सोएगा', 540, 580, 90, '#ffd36a', zs(0.5, 0.65, u)); }
  function sE(c, t) { const u = U(4, t); zsky(c, t, '#3a1d4a', '#d28a60', 540, 760, 'rgba(255,200,130,0.5)'); c.fillStyle = '#f2cf7a'; c.fillRect(0, 700, 1080, 700); c.fillStyle = '#d9a64a'; c.fillRect(0, 680, 1080, 30);
    for (let k = 0; k < 4; k++) { c.fillStyle = '#e8b85a'; c.fillRect(70 + k * 280, 300, 40, 400); }
    zbed(c, 540, 1500, 1.5); zface(c, 360, 1330, 190, Object.assign({}, URM.head, { skin: URM.skin, blink: 1, smile: 0.7 })); zzz(c, t, 560, 1200, '#fff1c8');
    ztxt(c, 'उर्मिला', 540, 330, 130, '#fff1c8', zs(0.1, 0.3, u)); ztxt(c, '१४ साल', 540, 480, 90, '#ffd36a', zs(0.3, 0.5, u)); zmotes(c, t, 22, '#ffe0a8'); }
  function sF(c, t) { const u = U(5, t); zsky(c, t, '#2a1030', '#e07a40', 540, 820, 'rgba(255,170,90,0.6)'); zground(c, 1250, '#7a4a2a', '#3a2010', 1420);
    zbody(c, Object.assign({}, LAK, { x: 330, y: 1650, s: 1.3, dir: 1, a1: -1.4, a2: -1.5, b1: -1.3, b2: -1.4, head: Object.assign({}, LAK.head, { blink: 0, smile: 0.1, look: 0.9, brow: 0.05 }) })); zbow(c, 470, 1240, 1.3, zs(0.0, 0.4, u) );
    const f = zs(0.45, 0.7, u); if (f > 0 && f < 1) zarrow(c, zl(520, 980, f), 1240, 0, 160, '#e8dcc0');
    zbody(c, Object.assign({}, { skin: '#8a3a3a', cloth: '#3a1a2a', cloth2: '#4a2a3a', head: { hair: 'jata', hc: '#111', crown: true, smile: 0.1 } }, { x: 850, y: 1650, s: 1.3, dir: -1, a1: 0.3, a2: 0.2 - 0.9 * zs(0.65, 0.85, u), b1: 0.3, b2: 0.2 }));
    if (u > 0.68 && u < 0.85) { c.fillStyle = `rgba(255,240,200,${0.8 * (1 - zs(0.68, 0.85, u))})`; c.fillRect(0, 0, 1080, 1920); } zmotes(c, t, 20, '#ffe0a8'); }
  function sG(c, t) { const u = U(6, t); nightBg(c, t, '#2a1030', '#7a4a8a'); zground(c, 1250, '#6a5a4a', '#2a2018', 1420); zhut(c, 540, 1240, 0.9, 0.7);
    zbody(c, Object.assign({}, LAK, { x: 350, y: 1700, s: 1.25, dir: 1, a1: -0.2, a2: -0.3, head: Object.assign({}, LAK.head, { smile: 0.9, blink: zblink(t, 0.5) }) }));
    zbody(c, Object.assign({}, URM, { x: 730, y: 1700, s: 1.25, dir: -1, a1: -0.2, a2: -0.3, head: Object.assign({}, URM.head, { smile: 0.9, blink: zblink(t, 0.9) }) })); zpetals(c, t, T[6], 24); zmotes(c, t, 26, '#ffe6a8'); }
  const SCENES = SCN([sA, sB, sC, sD, sE, sF, sG]);
