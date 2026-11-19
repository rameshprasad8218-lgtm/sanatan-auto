  const BHP = (c, r) => zbeard(c, r, '#eceaf0');
  const BH = { skin: '#cf9a6e', cloth: '#f4f0e6', cloth2: '#f4f0e6', cloth3: 'rgba(0,0,0,0.08)', head: { hair: 'bun', hc: '#e8e8ee', old: true, post: BHP, bindi: false } };
  const ARJ = { skin: '#b98a62', cloth: '#2f4f8a', cloth2: '#e8e0cf', cloth3: 'rgba(255,255,255,0.2)', head: { hair: 'bun', hc: '#1d1411', crown: true, earring: true, tilak: true } };
  const KRI = { skin: '#4f7fd0', cloth: '#f2c14a', cloth2: '#f4e7c3', cloth3: 'rgba(220,80,40,0.35)', head: { hair: 'bun', hc: '#1d1411', crown: true, tilak: true, earring: true, smile: 0.9, post: (c, r) => zfeather(c, r) } };
  const YUD = { skin: '#d9a074', cloth: '#e9e2d0', cloth2: '#e9e2d0', cloth3: 'rgba(0,0,0,0.08)', head: { hair: 'bun', hc: '#1d1411', tilak: true } };
  function bhBg(c, t, top, bot, sun) { zsky(c, t, top, bot, 540, 720, sun); ztrees(c, 1100, 7, 0.9, 'rgba(60,25,20,0.7)', t * 6, 77); zground(c, 1110, '#7a4a35', '#3a2018', 1300); }
  function arrowBed(c, x, y, t, glow) {          // lying Bhishma on a bed of arrows
    c.save(); c.translate(x, y);
    if (glow > 0) { const g = c.createRadialGradient(0, -80, 0, 0, -80, 560); g.addColorStop(0, `rgba(255,205,100,${0.7 * glow})`); g.addColorStop(1, 'rgba(255,205,100,0)'); c.fillStyle = g; c.fillRect(-700, -700, 1400, 1000); }
    for (let k = 0; k < 46; k++) { const ax = -440 + k * 19.5, sp = (k - 23) * 5.5; c.strokeStyle = '#6b4524'; c.lineWidth = 6; c.beginPath(); c.moveTo(ax - sp * 0.4, 110); c.lineTo(ax + sp * 0.6, -20 - (k % 3) * 18); c.stroke(); c.fillStyle = '#cfd3d8'; c.beginPath(); c.moveTo(ax + sp * 0.6 - 7, -20 - (k % 3) * 18); c.lineTo(ax + sp * 0.6, -48 - (k % 3) * 18); c.lineTo(ax + sp * 0.6 + 7, -20 - (k % 3) * 18); c.fill(); }
    c.fillStyle = '#f4f0e6'; c.beginPath(); c.moveTo(-260, -40); c.quadraticCurveTo(-60, -110, 200, -60); c.lineTo(470, -40); c.lineTo(470, 20); c.lineTo(-260, 40); c.closePath(); c.fill();
    c.fillStyle = 'rgba(0,0,0,0.1)'; c.fillRect(-260, 0, 730, 40);
    c.fillStyle = '#cf9a6e'; c.beginPath(); c.ellipse(-120, -86, 90, 34, 0.05, 0, 7); c.fill();
    c.save(); c.translate(-350, -70); c.rotate(-Math.PI / 2 + 0.1); zface(c, 0, 0, 100, Object.assign({}, BH.head, { skin: BH.skin, blink: zblink(t, 0.5), smile: 0.2, brow: 0.04 })); c.restore();
    for (const a of [{ x: 40, y: -20 }, { x: 150, y: -90 }]) zarrow(c, 300 + a.x, -20 + a.y, -0.5 + a.x * 0.002, 90, '#6b4524');
    c.restore();
  }
  function sceneA(c, t) {                        // 0-4.77 hook close-up
    const u = t / 4.77, z = 1 + 0.07 * u;
    bhBg(c, t, '#3a0f14', '#d0602c', 'rgba(255,120,60,0.55)');
    c.save(); c.translate(540, 1000); c.scale(z, z); c.translate(-540, -1000);
    c.fillStyle = '#f4f0e6'; c.beginPath(); c.ellipse(540, 1840, 660, 300, 0, 0, 7); c.fill();
    zface(c, 540, 1110, 350, Object.assign({}, BH.head, { skin: BH.skin, blink: zblink(t, 0.8), look: 0.3 * Math.sin(t), tear: zs(0.9, 3.8, t), smile: 0.2, brow: 0.05, brow2: 0.2 }));
    c.restore();
    c.save(); c.translate(0, 0); for (let k = 0; k < 9; k++) zarrow(c, 80 + k * 120, 1900 - (k % 2) * 40, -1.35 + (k - 4) * 0.06, 220, '#6b4524'); c.restore();
    zmotes(c, t, 30, '#ffb27a');
  }
  function sceneB(c, t) {                        // 4.77-9.33 wide: lying on arrow bed + golden varadan glow
    const u = (t - 4.77) / 4.56, gl = zs(0.35, 0.8, u);
    bhBg(c, t, '#3a1a2a', '#e0803a', 'rgba(255,170,80,0.7)');
    c.save(); c.translate(540, 1100); c.scale(1.05 + 0.1 * u, 1.05 + 0.1 * u); c.translate(-540, -1100);
    arrowBed(c, 540, 1330, t, gl); c.restore();
    ztxt(c, 'इच्छा-मृत्यु वरदान', 540, 640, 84, '#ffd36a', zs(0.3, 0.55, u));
    zmotes(c, t, 28, '#ffe2a8');
  }
  function sceneC(c, t) {                        // 9.33-14.04 Arjun shoots
    const u = (t - 9.33) / 4.71;
    bhBg(c, t, '#2a0f1a', '#c2552e', 'rgba(255,110,50,0.5)');
    const pull = zs(0, 0.45, u), shot = zs(0.45, 0.75, u);
    zbody(c, Object.assign({}, ARJ, { x: 270, y: 1560, s: 1.25, dir: 1, a1: -1.45, a2: -0.2 - pull * 0.5, b1: -1.35 + pull * 0.25, b2: 0.0, head: Object.assign({}, ARJ.head, { tear: 0.9, smile: 0.1, blink: zblink(t, 0.3), brow2: 0.3 }) }));
    c.strokeStyle = '#5a3a1c'; c.lineWidth = 12; c.beginPath(); c.arc(480, 1180, 260, -1.1, 1.1); c.stroke(); c.strokeStyle = '#eee'; c.lineWidth = 3; c.beginPath(); c.moveTo(480 + Math.cos(-1.1) * 260, 1180 + Math.sin(-1.1) * 260); c.lineTo(450 - 60 * pull, 1180); c.lineTo(480 + Math.cos(1.1) * 260, 1180 + Math.sin(1.1) * 260); c.stroke();
    for (let k = 0; k < 6; k++) { const q = zs(0.45 + k * 0.05, 0.75 + k * 0.05, u); if (q > 0 && q < 1) zarrow(c, 560 + q * 700, 1190 + (k - 3) * 30 + q * 30 * k - 40, 0.02 * k, 140, '#6b4524'); }
    if (shot > 0 && shot < 1) { c.fillStyle = `rgba(255,240,200,${0.5 * (1 - shot)})`; c.fillRect(0, 0, 1080, 1920); }
    zmotes(c, t, 22, '#ffb27a');
  }
  function sceneD(c, t) {                        // 14.04-18.36 Bhishma speaks, sun glow behind (uttarayan)
    const u = (t - 14.04) / 4.32;
    zsky(c, t, '#2a1530', '#f0a050', 800, 560, 'rgba(255,200,110,0.8)'); zrays(c, 800, 560, t, 12, 'rgba(255,235,170,0.16)', 1800);
    c.fillStyle = '#ffe9a8'; c.beginPath(); c.arc(800, 560, 110 + 12 * Math.sin(t * 3), 0, 7); c.fill();
    ztxt(c, 'उत्तरायण', 800, 760, 62, '#fff1c8', zs(0.2, 0.4, u));
    c.save(); c.translate(400, 1100); c.scale(1.04 + 0.05 * u, 1.04 + 0.05 * u); c.translate(-400, -1100);
    c.fillStyle = '#f4f0e6'; c.beginPath(); c.ellipse(400, 1800, 520, 300, 0, 0, 7); c.fill();
    zface(c, 400, 1090, 330, Object.assign({}, BH.head, { skin: BH.skin, mouth: 0.12 + 0.35 * Math.abs(Math.sin(t * 7)), blink: zblink(t, 0.5), smile: 0.4, look: 0.8, tear: 0.0 }));
    c.restore(); zmotes(c, t, 28, '#fff0c0');
  }
  function sceneE(c, t) {                        // 18.36-22.51 teaching Yudhishthir, lamp-lit
    const u = (t - 18.36) / 4.15;
    zsky(c, t, '#1e1226', '#7a3a24', 540, 900, 'rgba(255,170,80,0.5)'); zstars(c, t, 30); zground(c, 1120, '#5a3022', '#2a140e', 1300);
    c.save(); c.translate(540, 1100); c.scale(1.0 + 0.05 * u, 1.0 + 0.05 * u); c.translate(-540, -1100);
    arrowBed(c, 640, 1400, t, 0.7);
    zbody(c, Object.assign({}, YUD, { x: 110, y: 1620, s: 0.95, dir: 1, a1: -0.7, a2: -0.8, b1: -0.6, b2: -0.8, head: Object.assign({}, YUD.head, { blink: zblink(t, 0.2), tear: 0.8, smile: 0.4 }) }));
    c.restore();
    ztxt(c, 'धर्म', 540, 540, 120, '#ffd36a', zs(0.25, 0.5, u) * 0.95);
    zmotes(c, t, 26, '#ffd9a0');
  }
  function sceneF(c, t) {                        // 22.51-27.24 sun turns north, Krishna, golden departure
    const u = (t - 22.51) / 4.73, gl = zs(0.0, 0.5, u);
    zsky(c, t, '#f6a14a', '#fff0b8', 540, 520 - 120 * u, 'rgba(255,235,160,1)'); zrays(c, 540, 520 - 120 * u, t, 16, 'rgba(255,250,210,0.28)', 1800);
    ztrees(c, 1150, 6, 0.9, '#b79a56', u * 20, 91); zground(c, 1160, '#c9a75a', '#7a5a2a', 1320);
    zbody(c, Object.assign({}, KRI, { x: 700, y: 1560, s: 1.25, dir: -1, a1: -1.1, a2: -1.2, b1: -1.0, b2: -1.2, head: Object.assign({}, KRI.head, { blink: zblink(t, 0.4), smile: 0.8 }) }));
    arrowBed(c, 300, 1500, t, 1.0); c.save(); c.globalAlpha = zs(0.3, 0.9, u); for (let k = 0; k < 16; k++) { const q = ((t * 0.5 + k / 16) % 1); c.fillStyle = `rgba(255,235,150,${1 - q})`; c.beginPath(); c.arc(300 + Math.sin(k * 2.4 + t * 2) * 90, 1280 - q * 1050, 7 + (k % 3) * 3, 0, 7); c.fill(); } c.restore();
    zpetals(c, t, 23.4, 30); zmotes(c, t, 24, '#fff7d0');
  }
  function sceneG(c, t) {                        // 27.24-end : question, dusk, diya
    const u = (t - 27.24) / 5.0;
    zsky(c, t, '#1a0e24', '#7a3a28', 540, 1000, 'rgba(255,170,80,0.4)'); zstars(c, t, 40);
    zface(c, 540, 900, 300, Object.assign({}, BH.head, { skin: BH.skin, blink: zblink(t, 0.5), smile: 0.75, look: 0.2, tear: 0 }));
    c.fillStyle = '#f4f0e6'; c.beginPath(); c.ellipse(540, 1560, 620, 260, 0, 0, 7); c.fill();
    const dx = 540, dy = 1700; c.fillStyle = '#c77a2a'; c.beginPath(); c.ellipse(dx, dy, 90, 30, 0, 0, Math.PI); c.fill(); const fl = 1 + 0.12 * Math.sin(t * 12); const g = c.createRadialGradient(dx, dy - 40, 0, dx, dy - 40, 240); g.addColorStop(0, 'rgba(255,200,90,0.85)'); g.addColorStop(1, 'rgba(255,200,90,0)'); c.fillStyle = g; c.fillRect(dx - 260, dy - 300, 520, 520); c.fillStyle = '#ffdf8a'; c.beginPath(); c.ellipse(dx, dy - 40, 16 * fl, 38 * fl, 0, 0, 7); c.fill();
    zmotes(c, t, 30, '#ffd9a0');
  }
  const SCENES = [[0, 4.77, sceneA], [4.77, 9.33, sceneB], [9.33, 14.04, sceneC], [14.04, 18.36, sceneD], [18.36, 22.51, sceneE], [22.51, 27.24, sceneF], [27.24, 99, sceneG]];
