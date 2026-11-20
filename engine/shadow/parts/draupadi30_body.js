  const DRP = { skin: '#d6a074', cloth: '#c9302c', cloth2: '#c9302c', cloth3: 'rgba(255,215,100,0.35)', head: { hair: 'bun', hc: '#16100e', bindi: true, earring: true, smile: 0.5 } };
  const KRS = { skin: '#5b86c9', cloth: '#f2c14a', cloth2: '#f4e7c3', cloth3: 'rgba(220,80,40,0.3)', head: { hair: 'bun', hc: '#1d1411', tilak: true, earring: true, smile: 0.7, post: (c, r) => zfeather(c, r) } };
  function finger(c, x, y, s, wrap, blood, t) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = KRS.skin; c.beginPath(); c.moveTo(-60, 400); c.lineTo(-60, -200); c.quadraticCurveTo(-60, -280, 0, -280); c.quadraticCurveTo(60, -280, 60, -200); c.lineTo(60, 400); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.18)'; c.fillRect(-40, -220, 16, 500);
    if (blood > 0) { c.fillStyle = '#c4161c'; c.beginPath(); c.moveTo(-30, -200); c.lineTo(30, -200); c.lineTo(20, -140 - 0); c.lineTo(-20, -140); c.fill(); for (let k = 0; k < 3; k++) { const q = ((t * 0.7 + k / 3) % 1); c.beginPath(); c.ellipse(0, -140 + q * 420, 14, 22, 0, 0, 7); c.globalAlpha = blood * (1 - q * 0.6); c.fill(); c.globalAlpha = 1; } }
    if (wrap > 0) { c.fillStyle = '#c9302c'; const h = 230 * wrap; c.beginPath(); c.moveTo(-70, -200); c.lineTo(70, -200 + 0); c.lineTo(70, -200 + h); c.lineTo(-70, -200 + h + 30); c.closePath(); c.fill(); c.strokeStyle = 'rgba(255,215,100,0.8)'; c.lineWidth = 6; for (let k = 0; k < 5; k++) { const yy = -190 + k * 46; if (yy < -200 + h) { c.beginPath(); c.moveTo(-70, yy); c.lineTo(70, yy + 14); c.stroke(); } } }
    c.restore(); }
  function hall(c, t, dark) { c.fillStyle = dark ? '#1a0e18' : '#4a2a2a'; c.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 4; k++) { c.fillStyle = dark ? '#2e1a2a' : '#7a4a3a'; c.fillRect(60 + k * 300, 200, 90, 1500); c.fillStyle = '#c9a050'; c.fillRect(50 + k * 300, 190, 110, 30); }
    zground(c, 1500, '#6a3a2a', '#2a1410', 1650); const g = c.createRadialGradient(540, 700, 0, 540, 700, 800); g.addColorStop(0, 'rgba(255,190,90,0.25)'); g.addColorStop(1, 'rgba(255,190,90,0)'); c.fillStyle = g; c.fillRect(0, 0, 1080, 1920); }
  function cloth(c, t, u, y) { for (let k = 0; k < 7; k++) { c.strokeStyle = k % 2 ? '#c9302c' : '#e04a3a'; c.lineWidth = 80; c.beginPath(); for (let x = -50; x <= 1130; x += 40) { const yy = y + k * 62 + Math.sin(x * 0.012 + t * 4 + k) * 40; if (x < -49) c.moveTo(x, yy); else c.lineTo(x, yy); } c.stroke(); } c.strokeStyle = 'rgba(255,215,100,0.7)'; c.lineWidth = 6; for (let k = 0; k < 7; k++) { c.beginPath(); for (let x = -50; x <= 1130; x += 40) { const yy = y + k * 62 + 28 + Math.sin(x * 0.012 + t * 4 + k) * 40; if (x < -49) c.moveTo(x, yy); else c.lineTo(x, yy); } c.stroke(); } }
  function sA(c, t) { const u = U(0, t), z = 1 + 0.06 * u; zsky(c, t, '#1a1a3a', '#8a5a6a', 540, 700, 'rgba(255,200,150,0.4)');
    c.save(); c.translate(540, 1100); c.scale(z, z); c.translate(-540, -1100); finger(c, 540, 1100, 1.5, 0, zs(0, 0.5, t), t); c.restore();
    zface(c, 230, 600, 130, Object.assign({}, DRP.head, { skin: DRP.skin, wide: 1, blink: 0, mouth: 0.3, brow: 0.12 })); zmotes(c, t, 22, '#ffd9a0'); }
  function sB(c, t) { const u = U(1, t); zsky(c, t, '#3a2a68', '#f0a050', 540, 800, 'rgba(255,215,140,0.5)'); zground(c, 1250, '#8a6a4a', '#3a2a1a', 1420);
    zbody(c, Object.assign({}, KRS, { x: 540, y: 1700, s: 1.35, dir: 1, a1: -0.2, a2: -2.6, b1: 0.2, b2: 0.2, head: Object.assign({}, KRS.head, { smile: 0.2, blink: zblink(t, 0.3), brow: 0.1 }) }));
    const q = (t * 1.5) % 1; zchakra(c, 620 + Math.cos(q * 6.28) * 90, 760 + Math.sin(q * 6.28) * 90, 60, t, 1); for (let k = 0; k < 8; k++) { c.fillStyle = '#ffe08a'; c.beginPath(); c.arc(540 + zr(k) * 300 - 80, 900 + zr(k + 3) * 200 + Math.sin(t * 5 + k) * 10, 5, 0, 7); c.fill(); }
    ztxt(c, 'चक्र से उँगली कटी', 540, 380, 100, '#ffd0d0', zs(0.1, 0.3, u)); }
  function sC(c, t) { const u = U(2, t); hall(c, t, false);
    const sh = zs(0.3, 0.7, u) * 12 * Math.sin(t * 50); zface(c, 540 + sh, 960, 300, Object.assign({}, DRP.head, { skin: DRP.skin, wide: 0.5, blink: zblink(t, 0.5), mouth: 0, brow: 0.13, smile: 0.1, look: 0.4 }));
    c.fillStyle = '#c9302c'; c.beginPath(); c.moveTo(150, 1500 - 0); c.lineTo(330, 1440); c.lineTo(450, 1540 + 100 * u); c.lineTo(170, 1640); c.fill(); for (let k = 0; k < 6; k++) { c.strokeStyle = '#ffd36a'; c.lineWidth = 6; c.beginPath(); c.moveTo(150 + k * 50, 1470 + k * 20); c.lineTo(180 + k * 50, 1560 + k * 20); c.stroke(); }
    ztxt(c, 'साड़ी फाड़ी', 540, 380, 120, '#fff1c8', zs(0.1, 0.3, u)); zmotes(c, t, 20, '#ffd9a0'); }
  function sD(c, t) { const u = U(3, t), w = zs(0.1, 0.9, u); zsky(c, t, '#2a1a3a', '#a06a5a', 540, 900, 'rgba(255,200,150,0.4)'); finger(c, 540, 1050, 1.6, w, 0.6 * (1 - w), t);
    c.fillStyle = DRP.skin; for (const s of [-1, 1]) { c.save(); c.translate(540 + s * 150, 1100 + 30 * Math.sin(t * 4)); c.rotate(s * -0.5); c.beginPath(); c.ellipse(0, 0, 55, 100, 0, 0, 7); c.fill(); c.restore(); }
    ztxt(c, 'पल्लू बाँध दिया', 540, 380, 110, '#fff1c8', zs(0.1, 0.3, u)); zmotes(c, t, 26, '#ffd36a', 2); }
  function sE(c, t) { const u = U(4, t); zsky(c, t, '#3a2a58', '#f0a860', 540, 800, 'rgba(255,215,140,0.7)'); zrays(c, 540, 800, t, 14, 'rgba(255,235,170,0.14)', 1800); zground(c, 1250, '#8a6a4a', '#3a2a1a', 1420);
    zbody(c, Object.assign({}, KRS, { x: 320, y: 1700, s: 1.3, dir: 1, a1: -1.0, a2: -0.8, b1: 0.2, b2: 0.2, head: Object.assign({}, KRS.head, { smile: 0.9, mouth: 0.3 * Math.abs(Math.sin(t * 6)), blink: 0 }) }));
    zbody(c, Object.assign({}, DRP, { x: 790, y: 1700, s: 1.25, dir: -1, a1: 0.1, a2: 0.2, b1: 0.15, b2: 0.2, head: Object.assign({}, DRP.head, { smile: 0.8, tear: 0.4, blink: zblink(t, 0.4) }) }));
    ztxt(c, 'ये क़र्ज़ चुकाऊँगा', 540, 380, 100, '#ffd36a', zs(0.2, 0.4, u)); zmotes(c, t, 26, '#ffe6a8'); zpetals(c, t, T[4] + 1, 12); }
  function sF(c, t) { const u = U(5, t); hall(c, t, true); cloth(c, t, u, 500 + 400 * (1 - zs(0, 0.5, u)));
    zbody(c, Object.assign({}, DRP, { x: 540, y: 1700, s: 1.3, dir: 1, a1: -2.8, a2: -3.0, b1: -2.8, b2: -3.0, head: Object.assign({}, DRP.head, { smile: 0.1, tear: 0.7, blink: 0, wide: 0.6 }) }));
    c.fillStyle = '#0a0508'; c.beginPath(); c.arc(150, 1450, 60, 0, 7); c.fill(); c.fillRect(100, 1500, 100, 240);
    ztxt(c, 'चीर बढ़ता गया', 540, 380, 110, '#ffe9b0', zs(0.1, 0.3, u)); if (u > 0.5 && u < 0.62) { c.fillStyle = `rgba(255,240,200,${0.6 * (1 - zs(0.5, 0.62, u))})`; c.fillRect(0, 0, 1080, 1920); } }
  function sG(c, t) { const u = U(6, t); zsky(c, t, '#3a2a58', '#f0a860', 540, 900, 'rgba(255,215,140,0.9)'); zrays(c, 540, 900, t, 16, 'rgba(255,235,170,0.17)', 1800); zground(c, 1250, '#8a6a4a', '#3a2a1a', 1420);
    zbody(c, Object.assign({}, KRS, { x: 320, y: 1700, s: 1.3, dir: 1, a1: -0.6, a2: -0.4, head: Object.assign({}, KRS.head, { smile: 1, blink: zblink(t, 0.3) }) }));
    zbody(c, Object.assign({}, DRP, { x: 790, y: 1700, s: 1.25, dir: -1, head: Object.assign({}, DRP.head, { smile: 1, tear: 0.5, blink: zblink(t, 0.6) }) }));
    ztxt(c, 'एक पल्लू = एक वचन', 540, 420, 90, '#ffd36a', zs(0.1, 0.3, u)); zpetals(c, t, T[6], 34); zmotes(c, t, 28, '#ffe6a8'); }
  const SCENES = SCN([sA, sB, sC, sD, sE, sF, sG]);
