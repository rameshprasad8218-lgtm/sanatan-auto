  function splash(c, x, y, q) { c.strokeStyle = `rgba(255,255,255,${1 - q})`; c.lineWidth = 6; for (let k = 0; k < 8; k++) { const a = -Math.PI + k * Math.PI / 7; c.beginPath(); c.moveTo(x + Math.cos(a) * 30 * (1 + q), y + Math.sin(a) * 30 * (1 + q)); c.lineTo(x + Math.cos(a) * 110 * q + Math.cos(a) * 30, y + Math.sin(a) * 160 * q + Math.sin(a) * 30); c.stroke(); } }
  const VIS = { skin: '#5b86c9', cloth: '#f2c14a', cloth2: '#f4e7c3', cloth3: 'rgba(220,80,40,0.3)', head: { hair: 'bun', hc: '#1d1411', crown: true, tilak: true, earring: true, smile: 0.7 } };
  const GR = '#8d8f9c';
  function ele(c, x, y, s, o) { o = o || {}; c.save(); c.translate(x, y); c.scale(s * (o.dir || 1), s); c.lineCap = 'round'; c.lineJoin = 'round';
    c.fillStyle = GR; for (const lx of [-120, -50, 70, 140]) c.fillRect(lx - 28, -150, 56, 150); c.beginPath(); c.ellipse(0, -260, 220, 130, 0, 0, 7); c.fill();
    c.fillStyle = '#7a7c88'; c.beginPath(); c.ellipse(200, -330, 105, 100, 0, 0, 7); c.fill(); c.fillStyle = '#a2a4b0'; c.beginPath(); c.ellipse(150, -330, 70, 105, 0.15, 0, 7); c.fill();
    c.strokeStyle = GR; c.lineWidth = 56; c.beginPath(); c.moveTo(290, -320); c.quadraticCurveTo(350, -220, 300, -120 + (o.trunk || 0) * -300); c.stroke();
    c.fillStyle = '#f4efe0'; c.beginPath(); c.moveTo(260, -280); c.quadraticCurveTo(340, -240, 360, -180); c.lineTo(335, -190); c.quadraticCurveTo(300, -240, 255, -250); c.fill();
    c.fillStyle = '#2a1a14'; c.beginPath(); c.arc(240, -350, 9, 0, 7); c.fill(); c.restore(); }
  function eleFace(c, x, y, r, t, tear, lotus) { c.save(); c.translate(x, y); c.lineCap = 'round';
    c.fillStyle = '#7a7c88'; for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * r * 1.0, -r * 0.1, r * 0.55, r * 0.95, s * 0.2, 0, 7); c.fill(); }
    c.fillStyle = GR; c.beginPath(); c.ellipse(0, 0, r * 0.9, r * 1.0, 0, 0, 7); c.fill();
    c.strokeStyle = GR; c.lineWidth = r * 0.5; c.beginPath(); c.moveTo(0, r * 0.2); c.quadraticCurveTo(r * 0.1, r * 1.6, -r * 0.5, r * 2.0); c.quadraticCurveTo(-r * 0.9, r * 2.3, -r * 0.7, r * 1.6 - lotus * r * 2.4); c.stroke();
    c.fillStyle = '#f4efe0'; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * r * 0.35, r * 0.9); c.quadraticCurveTo(s * r * 0.9, r * 1.1, s * r * 0.8, r * 1.6); c.lineTo(s * r * 0.6, r * 1.2); c.closePath(); c.fill(); }
    const bl = zblink(t, 0.5); for (const s of [-1, 1]) { c.fillStyle = '#fffaf0'; c.beginPath(); c.ellipse(s * r * 0.42, -r * 0.1, r * 0.17, r * 0.12 * (1 - bl * 0.9), 0, 0, 7); c.fill(); c.fillStyle = '#2a1a14'; c.beginPath(); c.arc(s * r * 0.42, -r * 0.1, r * 0.075, 0, 7); c.fill();
      c.strokeStyle = '#4a4a56'; c.lineWidth = r * 0.04; c.beginPath(); c.moveTo(s * r * 0.2, -r * 0.34 + s * r * 0.0); c.lineTo(s * r * 0.62, -r * 0.28 - s * r * 0.05 * 0); c.stroke(); }
    if (tear > 0) { c.fillStyle = 'rgba(190,225,255,0.9)'; c.beginPath(); c.ellipse(-r * 0.42, r * 0.05 + tear * r * 0.6, r * 0.05, r * 0.09, 0, 0, 7); c.fill(); } c.restore(); }
  function croc(c, x, y, s, mouth, dir) { c.save(); c.translate(x, y); c.scale(s * (dir || 1), s); c.fillStyle = '#3a6a3a'; c.beginPath(); c.ellipse(0, 0, 230, 55, 0, 0, 7); c.fill();
    c.beginPath(); c.moveTo(150, -30); c.lineTo(420, -20 - mouth * 40); c.lineTo(420, 5 - mouth * 40); c.lineTo(150, 25); c.fill(); c.beginPath(); c.moveTo(150, 15); c.lineTo(420, 25 + mouth * 50); c.lineTo(420, 45 + mouth * 50); c.lineTo(150, 50); c.fill();
    c.fillStyle = '#fff'; for (let k = 0; k < 7; k++) { const px = 200 + k * 30; c.beginPath(); c.moveTo(px, 5 - mouth * 40); c.lineTo(px + 10, 25); c.lineTo(px + 20, 5 - mouth * 40); c.fill(); c.beginPath(); c.moveTo(px, 28 + mouth * 50); c.lineTo(px + 10, 10); c.lineTo(px + 20, 28 + mouth * 50); c.fill(); }
    c.fillStyle = '#e6c84a'; c.beginPath(); c.arc(170, -40, 14, 0, 7); c.fill(); c.fillStyle = '#111'; c.beginPath(); c.arc(172, -40, 6, 0, 7); c.fill(); c.restore(); }
  function pond(c, t, y0) { const g = c.createLinearGradient(0, y0, 0, 1920); g.addColorStop(0, '#3a8aa8'); g.addColorStop(1, '#0d3048'); c.fillStyle = g; c.fillRect(0, y0, 1080, 1920 - y0);
    c.strokeStyle = 'rgba(255,255,255,0.3)'; c.lineWidth = 5; for (let k = 0; k < 10; k++) { const y = y0 + 40 + k * 70, o = (t * 50 + k * 110) % 300; for (let x = -300; x < 1200; x += 300) { c.beginPath(); c.moveTo(x + o, y); c.quadraticCurveTo(x + o + 40, y - 12, x + o + 80, y); c.stroke(); } } }
  function lakeBg(c, t, top, bot) { zsky(c, t, top || '#3a6a9a', bot || '#f0c070', 800, 700, 'rgba(255,220,150,0.6)'); ztrees(c, 1080, 8, 1.0, '#2a5a3a', 0, 5); ztrees(c, 1120, 7, 0.8, '#1f4a2f', 80, 15); }
  function sA(c, t) { const u = U(0, t), z = 1 + 0.07 * u; zsky(c, t, '#1a2a4a', '#6a5a7a', 540, 700, 'rgba(255,215,150,0.5)'); zstars(c, t, 30);
    c.save(); c.translate(540, 1000); c.scale(z, z); c.translate(-540, -1000); eleFace(c, 540, 1050, 330, t, zs(1.2, 3.8, t), 0); c.restore(); zlotus(c, 880, 1500, 1.4, 0.9); zmotes(c, t, 24, '#ffd9a0'); }
  function sB(c, t) { const u = U(1, t); lakeBg(c, t); pond(c, t, 1180); ele(c, 330, 1250, 1.2, { dir: 1, trunk: 0 }); c.fillStyle = '#e8c9a0'; c.fillRect(0, 1180, 1080, 20);
    ztxt(c, 'गजेंद्र', 540, 380, 130, '#fff1c8', zs(0.1, 0.3, u)); zmotes(c, t, 20, '#fff0b0'); zpetals(c, t, T[1], 8); }
  function sC(c, t) { const u = U(2, t); lakeBg(c, t, '#2a3a5a', '#8a5a4a'); pond(c, t, 1150); const jump = zs(0.1, 0.5, u);
    ele(c, 420, 1300, 1.3, { dir: 1 }); croc(c, 720, 1560 - jump * 40, 1.0, 0.5 + 0.4 * Math.sin(t * 6) * 0.5, -1); splash(c, 640, 1500, (t * 1.5) % 1);
    ztxt(c, 'मगरमच्छ ने पकड़ लिया', 540, 380, 90, '#ffd0d0', zs(0.1, 0.3, u)); }
  function sD(c, t) { const u = U(3, t); zsky(c, t, '#0a1230', '#2a3a6a', 540, 500, 'rgba(150,180,255,0.4)'); zstars(c, t, 50); pond(c, t, 1100);
    const sink = zs(0, 1, u) * 180; ele(c, 540, 1380 + sink, 1.3, { dir: 1, trunk: 0.2 }); croc(c, 700, 1560 + sink * 0.3, 0.9, 0.2, -1);
    const sunA = u * 6.28, mx = 540 + Math.cos(sunA) * 400, my = 700 - Math.sin(sunA) * 250 + 200; zsun(c, mx, my, 50, 0.7);
    ztxt(c, '१००० साल', 540, 380, 130, '#c8d8ff', zs(0.1, 0.3, u)); ztxt(c, 'अकेला', 540, 520, 90, '#ffe9b0', zs(0.4, 0.6, u)); }
  function sE(c, t) { const u = U(4, t), up = zs(0.2, 0.7, u); zsky(c, t, '#10183a', '#5a4a8a', 540, 600, 'rgba(255,220,150,0.6)'); zrays(c, 540, 500, t, 14, `rgba(255,235,170,${0.16 * up})`, 1800); zstars(c, t, 30);
    eleFace(c, 540, 1150, 320, t, 0.6, up); zlotus(c, 540 - 330 * 0.7 * 0.0 + 0, 700, 1.2, up);
    ztxt(c, 'हे हरि!', 540, 380, 150, '#ffd36a', zs(0.3, 0.5, u)); zmotes(c, t, 28, '#ffd9a0'); }
  function sF(c, t) { const u = U(5, t); zsky(c, t, '#3a2a68', '#f0a860', 540, 900, 'rgba(255,215,140,0.7)'); zground(c, 1250, '#7a8a5a', '#2a3a1a', 1420);
    for (let k = 0; k < 12; k++) { c.strokeStyle = 'rgba(255,255,255,0.3)'; c.lineWidth = 5; const y = 500 + zr(k) * 1100, x = (zr(k + 5) * 1080 + t * 1600) % 1400 - 200; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 220, y); c.stroke(); }
    const bx = zl(-100, 700, zs(0, 0.5, u)); c.fillStyle = '#3a2a28'; c.beginPath(); c.ellipse(120, 700, 70, 40, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(180, 690); c.lineTo(260, 660); c.lineTo(190, 720); c.fill(); ztxt(c, 'गरुड़', 160, 780, 50, '#e9c9a0', 0.8);
    zbody(c, Object.assign({}, VIS, { x: 560, y: 1720, s: 1.45, dir: 1, walk: t * 11, a1: -0.9, a2: -0.5, b1: 0.9, b2: 0.5, head: Object.assign({}, VIS.head, { smile: 0.1, brow: 0.1, wide: 0.5, blink: 0 }) }));
    ztxt(c, 'नंगे पैर', 540, 380, 130, '#fff1c8', zs(0.1, 0.3, u)); zmotes(c, t, 22, '#ffe6a8', 3); }
  function sG(c, t) { const u = U(6, t); zsky(c, t, '#3a2a58', '#f0a860', 540, 900, 'rgba(255,215,140,0.8)'); zrays(c, 540, 900, t, 16, 'rgba(255,235,170,0.16)', 1800); pond(c, t, 1300);
    zchakra(c, 540, 600, 130, t, zs(0, 0.3, u)); croc(c, zl(700, 1300, zs(0.2, 0.8, u)), 1520, 0.8, 0.1, -1);
    ele(c, 300, 1450, 1.0, { dir: 1 }); zbody(c, Object.assign({}, VIS, { x: 800, y: 1750, s: 1.2, dir: -1, a1: -0.4, a2: -0.2, head: Object.assign({}, VIS.head, { smile: 0.9, blink: zblink(t, 0.4) }) })); zpetals(c, t, T[6], 30); zmotes(c, t, 26, '#ffe6a8'); }
  const SCENES = SCN([sA, sB, sC, sD, sE, sF, sG]);
