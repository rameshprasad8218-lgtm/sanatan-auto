  const VIS = { skin: '#5b86c9', cloth: '#f2c14a', cloth2: '#f4e7c3', cloth3: 'rgba(220,80,40,0.3)', head: { hair: 'bun', hc: '#1d1411', crown: true, tilak: true, earring: true, smile: 0.7 } };
  const SHV = { skin: '#cfd6e2', cloth: '#8a7a68', cloth2: '#e8e0d0', cloth3: 'rgba(0,0,0,0.12)', head: { hair: 'jata', hc: '#241a16', earring: true, smile: 0.5, post: (c, r) => { zeye3(c, r, 0); zmoon(c, r); } } };
  function vBg(c, t, top, bot, sun) { zsky(c, t, top, bot, 540, 640, sun); zstars(c, t, 30); c.fillStyle = 'rgba(40,20,60,0.5)'; c.beginPath(); c.moveTo(0, 1100); for (let x = 0; x <= 1080; x += 60) c.lineTo(x, 1040 - 90 * Math.abs(Math.sin(x * 0.011 + 1))); c.lineTo(1080, 1200); c.lineTo(0, 1200); c.fill(); zground(c, 1190, '#3a4a7a', '#141c3a', 1360); }
  function lotusPile(c, x, y, n, t) { for (let k = 0; k < n; k++) zlotus(c, x + (k % 7 - 3) * 52 + (Math.floor(k / 7) % 2) * 22, y - Math.floor(k / 7) * 26 + 4 * Math.sin(t * 2 + k), 0.55, 1); }
  function sceneA(c, t) {                        // 0-4.39 hook: Vishnu close-up, finger toward eye, lotus
    const u = t / 4.39, z = 1 + 0.07 * u;
    zsky(c, t, '#10183a', '#3a4a9a', 540, 720, 'rgba(130,170,255,0.55)'); zstars(c, t, 40);
    c.save(); c.translate(540, 1000); c.scale(z, z); c.translate(-540, -1000);
    c.fillStyle = '#f2c14a'; c.beginPath(); c.ellipse(540, 1850, 640, 320, 0, 0, 7); c.fill();
    zface(c, 540, 1100, 350, Object.assign({}, VIS.head, { skin: VIS.skin, blink: 0, wide: 0.4 * zs(0.5, 1.5, t), look: 0.3, tear: zs(1.3, 3.8, t), smile: 0.3, brow2: 0.2 }));
    c.fillStyle = VIS.skin; c.beginPath(); c.arc(zl(930, 700, zs(0.4, 3.2, t)), zl(1180, 1050, zs(0.4, 3.2, t)), 62, 0, 7); c.fill();
    c.restore(); zlotus(c, 880, 1480, 1.4, 0.9); zmotes(c, t, 28, '#bcd2ff');
  }
  function sceneB(c, t) {                        // 4.39-8.91 offering a thousand lotuses to Shivling
    const u = (t - 4.39) / 4.52;
    vBg(c, t, '#16204a', '#4a5ab0', 'rgba(150,180,255,0.4)');
    zshivling(c, 740, 1500, 1.0, 0.6 + 0.3 * Math.sin(t * 2));
    lotusPile(c, 250, 1580, 28, t);
    const off = zs(0, 0.9, u);
    zbody(c, Object.assign({}, VIS, { x: 300, y: 1620, s: 1.2, dir: 1, a1: -0.9 + off * 0.2, a2: -0.8, b1: 0.1, b2: 0.2, head: Object.assign({}, VIS.head, { blink: zblink(t, 0.3), smile: 0.8 }) }));
    for (let k = 0; k < 4; k++) { const q = ((t * 0.9 + k / 4) % 1); zlotus(c, zl(330, 740, q), 1250 - Math.sin(q * 3.14) * 200, 0.5, 1 - Math.pow(q, 6)); }
    ztxt(c, '१०००', 540, 500, 150, '#ffe08a', 1); ztxt(c, 'कमल रोज़', 540, 640, 70, '#fff1c8', 1);
  }
  function sceneC(c, t) {                        // 8.91-13.01 Shiva's test: hides one lotus
    const u = (t - 8.91) / 4.1;
    zsky(c, t, '#0e1430', '#46568c', 540, 800, 'rgba(160,190,255,0.5)'); zstars(c, t, 36);
    c.save(); c.translate(540, 1000); c.scale(1.03 + 0.05 * u, 1.03 + 0.05 * u); c.translate(-540, -1000);
    c.fillStyle = '#8a7a68'; c.beginPath(); c.ellipse(540, 1850, 640, 320, 0, 0, 7); c.fill();
    zface(c, 540, 1000, 330, Object.assign({}, SHV.head, { skin: SHV.skin, blink: zblink(t, 0.4), smile: 0.95, look: 0.7, brow2: 0.25, post: (c2, r) => { zeye3(c2, r, 0.6 + 0.3 * Math.sin(t * 3)); zmoon(c2, r); } }));
    const hide = zs(0.3, 0.8, u); c.fillStyle = SHV.skin; c.beginPath(); c.arc(zl(930, 760, hide), 1500, 80, 0, 7); c.fill(); zlotus(c, zl(930, 760, hide), 1430, 0.8, 1 - zs(0.7, 0.95, u));
    c.restore(); ztxt(c, '९९९', 540, 330, 130, '#ffe08a', zs(0.5, 0.7, u)); zmotes(c, t, 26, '#bcd2ff');
  }
  function sceneD(c, t) {                        // 13.01-17.98 "kamalnayan" : Vishnu calm, glowing eye, lotus
    const u = (t - 13.01) / 4.97;
    vBg(c, t, '#1a2a60', '#5a70c0', 'rgba(170,200,255,0.5)');
    zrays(c, 540, 1000, t, 14, 'rgba(180,210,255,0.1)', 1800);
    c.save(); c.translate(540, 1000); c.scale(1.02 + 0.06 * u, 1.02 + 0.06 * u); c.translate(-540, -1000);
    c.fillStyle = '#f2c14a'; c.beginPath(); c.ellipse(540, 1850, 640, 320, 0, 0, 7); c.fill();
    zface(c, 540, 1060, 340, Object.assign({}, VIS.head, { skin: VIS.skin, blink: zblink(t, 0.8), look: 0, smile: 0.85, brow: 0.02, tear: 0 }));
    const g = c.createRadialGradient(540 - 340 * 0.38, 1060, 0, 540 - 340 * 0.38, 1060, 220); g.addColorStop(0, `rgba(255,170,210,${0.55 * zs(0.3, 0.6, u)})`); g.addColorStop(1, 'rgba(255,170,210,0)'); c.fillStyle = g; c.fillRect(0, 700, 1080, 700);
    c.restore();
    zlotus(c, 200, 1540, 1.7, zs(0.1, 0.3, u)); zlotus(c, 880, 1500, 1.4, zs(0.2, 0.4, u));
    ztxt(c, 'कमलनयन', 540, 380, 150, '#ffd0e6', zs(0.1, 0.3, u)); zmotes(c, t, 26, '#ffd0e6');
  }
  function sceneE(c, t) {                        // 17.98-22.02 hand to eye, Shiva appears & holds the hand
    const u = (t - 17.98) / 4.04, ap = zs(0.5, 0.75, u);
    zsky(c, t, '#14183a', '#4a5ab0', 540, 800, 'rgba(160,190,255,0.5)');
    if (ap > 0) { c.fillStyle = `rgba(255,255,255,${0.7 * (1 - zs(0.5, 0.9, u))})`; c.fillRect(0, 0, 1080, 1920); }
    c.save(); c.translate(540, 1000); c.scale(1.0 + 0.06 * u, 1.0 + 0.06 * u); c.translate(-540, -1000);
    zface(c, 340, 1100, 300, Object.assign({}, VIS.head, { skin: VIS.skin, blink: 0, wide: 0.3, look: 0.8, smile: 0.5 }));
    const hx = zl(620, 270, zs(0, 0.55, u)), hy = zl(1250, 1095, zs(0, 0.55, u)); c.fillStyle = VIS.skin; c.beginPath(); c.arc(hx, hy, 52, 0, 7); c.fill();
    if (ap > 0) { zface(c, 820, 700, 270 * ap, Object.assign({}, SHV.head, { skin: SHV.skin, smile: 0.9, blink: 0 })); c.fillStyle = SHV.skin; c.beginPath(); c.arc(hx + 70 * (1 - ap) + 40, hy + 40, 60, 0, 7); c.fill(); }
    c.restore(); zmotes(c, t, 26, '#bcd2ff');
  }
  function sceneF(c, t) {                        // 22.02-26.68 Sudarshan chakra gift (payoff)
    const u = (t - 22.02) / 4.66, gl = zs(0, 0.4, u);
    zsky(c, t, '#2a1a58', '#d28a50', 540, 760, 'rgba(255,215,140,0.7)'); zrays(c, 540, 860, t, 18, 'rgba(255,235,170,0.2)', 1800);
    zbody(c, Object.assign({}, SHV, { x: 760, y: 1600, s: 1.2, dir: -1, a1: -1.0, a2: -0.8, b1: 0.1, b2: 0.2, head: Object.assign({}, SHV.head, { blink: zblink(t, 0.4), smile: 1 }) }));
    zbody(c, Object.assign({}, VIS, { x: 300, y: 1620, s: 1.2, dir: 1, a1: -0.9, a2: -0.9, b1: -0.8, b2: -0.9, head: Object.assign({}, VIS.head, { blink: zblink(t, 0.7), smile: 1, tear: 0.7 }) }));
    zchakra(c, 540, 930 - 20 * Math.sin(t * 2), 150 * (0.7 + 0.3 * gl), t, gl);
    zpetals(c, t, 22.3, 36); zmotes(c, t, 26, '#fff0c0');
  }
  function sceneG(c, t) {                        // 26.68-end : shivling with lotuses, glow, CTA
    const u = (t - 26.68) / 5.8;
    zsky(c, t, '#1a1440', '#6a4a8a', 540, 900, 'rgba(255,200,130,0.35)'); zstars(c, t, 40);
    zshivling(c, 540, 1400, 1.5, 0.9); lotusPile(c, 540, 1620, 21, t);
    zchakra(c, 540, 640, 110, t, 0.7);
    zpetals(c, t, 27, 26); zmotes(c, t, 28, '#ffe0a8');
  }
  const SCENES = [[0, 4.39, sceneA], [4.39, 8.91, sceneB], [8.91, 13.01, sceneC], [13.01, 17.98, sceneD], [17.98, 22.02, sceneE], [22.02, 26.68, sceneF], [26.68, 99, sceneG]];
