  const KAR = { skin: '#c68a5e', cloth: '#e0a620', cloth2: '#f1ebe0', cloth3: 'rgba(255,255,220,0.45)', head: { hair: 'bun', hc: '#1d1411', earring: true, tilak: true, smile: 0.55, post: (c, r) => { c.fillStyle = '#1d1411'; for (const q of [-1, 1]) { c.beginPath(); c.ellipse(q * r * 0.2, r * 0.3, r * 0.24, r * 0.06, q * 0.2, 0, 7); c.fill(); } } } };
  const SUR = { skin: '#f0a040', cloth: '#f5c542', cloth2: '#fbe6a8', head: { hair: 'bun', hc: '#5a2a10', crown: true, tilak: true, earring: true, smile: 0.3 } };
  const IND = { skin: '#d9a074', cloth: '#f4efe0', cloth2: '#e8dfc8', cloth3: 'rgba(0,0,0,0.08)', head: { hair: 'bun', hc: '#c8c8d0', old: true, smile: 0.3 } };
  function kBg(c, t, top, bot, sun) { zsky(c, t, top, bot, 540, 700, sun); ztrees(c, 1100, 7, 0.9, 'rgba(70,40,20,0.65)', t * 6, 55); zground(c, 1110, '#9a7a3f', '#4a3a1a', 1300); }
  function sceneA(c, t) {                        // 0-4.59 hook close-up
    const u = t / 4.59, z = 1 + 0.07 * u;
    zsky(c, t, '#4a1a08', '#f09a30', 540, 760, 'rgba(255,190,80,0.7)'); zrays(c, 540, 760, t, 14, 'rgba(255,230,150,0.16)', 1800);
    c.save(); c.translate(540, 1000); c.scale(z, z); c.translate(-540, -1000);
    c.fillStyle = '#e0a620'; c.beginPath(); c.ellipse(540, 1850, 640, 330, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,230,0.5)'; c.beginPath(); c.ellipse(430, 1780, 260, 80, -0.2, 0, 7); c.fill();
    zface(c, 540, 1110, 350, Object.assign({}, KAR.head, { skin: KAR.skin, blink: zblink(t, 0.7), look: 0.4 * Math.sin(t * 1.3), tear: zs(1.0, 3.8, t), smile: 0.45, brow: 0.03 }));
    c.restore(); zmotes(c, t, 30, '#ffe0a0');
  }
  function sceneB(c, t) {                        // 4.59-8.52 golden armour: arrows bounce
    const u = (t - 4.59) / 3.93;
    kBg(c, t, '#f5a85a', '#fde3a8', 'rgba(255,220,140,0.9)');
    zbody(c, Object.assign({}, KAR, { x: 560, y: 1560, s: 1.3, dir: 1, a1: 0.1, a2: 0.2, b1: 0.1, b2: 0.2, head: Object.assign({}, KAR.head, { blink: zblink(t, 0.3), smile: 0.6 }) }));
    const g = c.createRadialGradient(560, 1100, 0, 560, 1100, 420); g.addColorStop(0, `rgba(255,235,150,${0.35 + 0.15 * Math.sin(t * 5)})`); g.addColorStop(1, 'rgba(255,235,150,0)'); c.fillStyle = g; c.fillRect(100, 700, 900, 800);
    for (let k = 0; k < 5; k++) { const q = ((t * 1.1 + k / 5) % 1); const fl = q < 0.5; const x = fl ? zl(60, 470, q * 2) : zl(470, 250, (q - 0.5) * 2), y = 1190 + k * 34 - (fl ? 0 : Math.sin((q - 0.5) * 3.14) * 160); zarrow(c, x, y, fl ? 0.05 : -2.4 + (q - 0.5) * 2, 120, '#6b4524'); if (q > 0.5 && q < 0.6) { c.fillStyle = '#fff7c8'; c.beginPath(); c.arc(470, y, 30, 0, 7); c.fill(); } }
    ztxt(c, 'अभेद्य कवच', 540, 560, 86, '#fff1c0', zs(0.2, 0.4, u));
    zmotes(c, t, 26, '#fff2c0');
  }
  function sceneC(c, t) {                        // 8.52-12.29 Surya warns in dream
    const u = (t - 8.52) / 3.77;
    zsky(c, t, '#1c1038', '#c25a2a', 540, 640, 'rgba(255,170,70,0.8)'); zrays(c, 540, 640, t, 16, 'rgba(255,225,140,0.2)', 1800); zstars(c, t, 36);
    c.fillStyle = '#ffd36a'; c.beginPath(); c.arc(540, 700, 380 + 10 * Math.sin(t * 3), 0, 7); c.globalAlpha = 0.35; c.fill(); c.globalAlpha = 1;
    c.save(); c.translate(540, 760); c.scale(1.03 + 0.05 * u, 1.03 + 0.05 * u); c.translate(-540, -760);
    zface(c, 540, 780, 300, Object.assign({}, SUR.head, { skin: SUR.skin, mouth: 0.12 + 0.3 * Math.abs(Math.sin(t * 7)), blink: zblink(t, 0.5), brow: 0.06, brow2: 0.2, wide: 0.3 })); c.restore();
    c.save(); c.translate(540, 1500); c.rotate(-0.06); c.fillStyle = '#e6d3a8'; c.fillRect(-260, -30, 520, 60); c.restore();
    zface(c, 520, 1480, 140, Object.assign({}, KAR.head, { skin: KAR.skin, blink: 0.9, smile: 0.35 }));
    c.save(); c.globalAlpha = 0.5 + 0.4 * Math.sin(t * 4); ztxt(c, 'कुछ मत देना', 540, 1250, 74, '#ffe9a8', 1); c.restore();
    zmotes(c, t, 28, '#ffe0a0');
  }
  function sceneD(c, t) {                        // 12.29-17.23 disguised Indra asks, Karna smiles knowingly
    const u = (t - 12.29) / 4.94;
    kBg(c, t, '#f0a058', '#fbd9a0', 'rgba(255,215,140,0.8)');
    const bow = zs(0.0, 0.3, u);
    zbody(c, Object.assign({}, KAR, { x: 270, y: 1580, s: 1.25, dir: 1, a1: -0.9 * bow, a2: -0.8 * bow, b1: -0.8 * bow, b2: -0.7 * bow, head: Object.assign({}, KAR.head, { blink: zblink(t, 0.3), smile: 0.95, look: 0.7 }) }));
    zbody(c, Object.assign({}, IND, { x: 790, y: 1580, s: 1.2, dir: -1, a1: -1.0, a2: -0.4, b1: 0.1, b2: 0.2, head: Object.assign({}, IND.head, { blink: zblink(t, 0.9), look: -0.3 }) }));
    c.fillStyle = '#b98a3c'; c.beginPath(); c.ellipse(560, 1170, 52, 20, 0, 0, Math.PI); c.fill();
    ztxt(c, 'दान दो!', 800, 520, 96, '#fff1c0', zs(0.1, 0.25, u));
    zmotes(c, t, 22, '#fff0c0');
  }
  function sceneE(c, t) {                        // 17.23-22.09 Karna cuts the kavach
    const u = (t - 17.23) / 4.86;
    zsky(c, t, '#3a1208', '#c8581e', 540, 760, 'rgba(255,170,70,0.6)');
    c.save(); c.translate(540, 760); c.scale(1.02 + 0.05 * u, 1.02 + 0.05 * u); c.translate(-540, -760);
    zface(c, 540, 700, 330, Object.assign({}, KAR.head, { skin: KAR.skin, mouth: 0.1 + 0.18 * Math.abs(Math.sin(t * 6)) * (u < 0.5 ? 1 : 0), blink: zblink(t, 0.6), smile: 0.7, look: 0, tear: 0.0 }));
    c.restore();
    c.fillStyle = '#e0a620'; c.beginPath(); c.ellipse(540, 1420, 520, 300, 0, 0, 7); c.fill();
    const cut = zs(0.45, 0.9, u), kx = zl(980, 430, zs(0.25, 0.55, u)), ky = 1330 + 20 * Math.sin(u * 8);
    c.save(); c.translate(kx, ky); c.rotate(-0.5); c.fillStyle = '#dfe4ea'; c.beginPath(); c.moveTo(0, -14); c.lineTo(-150, 0); c.lineTo(0, 14); c.closePath(); c.fill(); c.fillStyle = '#6b4524'; c.fillRect(0, -12, 80, 24); c.fillStyle = KAR.skin; c.beginPath(); c.arc(86, 0, 34, 0, 7); c.fill(); c.restore();
    for (let k = 0; k < 8; k++) { const q = ((t * 1.5 + k / 8) % 1); if (cut > 0.1) { c.fillStyle = `rgba(190,30,30,${(1 - q) * cut})`; c.beginPath(); c.arc(420 + k * 14, 1340 + q * 360, 8 + k % 3 * 3, 0, 7); c.fill(); } }
    if (cut > 0.1) { c.save(); c.globalAlpha = cut; zlotus(c, 0, 0, 0, 0); c.restore(); }
    ztxt(c, 'कर्ण के द्वार से', 540, 1730, 0, '#fff', 0); zmotes(c, t, 26, '#ffd9a0');
  }
  function sceneF(c, t) {                        // 22.09-26.83 Indra bows head in shame (payoff)
    const u = (t - 22.09) / 4.74, gl = zs(0.0, 0.5, u);
    zsky(c, t, '#1e1430', '#8a3a28', 540, 900, 'rgba(255,190,90,0.5)');
    const g = c.createRadialGradient(540, 1000, 0, 540, 1000, 700); g.addColorStop(0, `rgba(255,220,120,${0.55 * gl})`); g.addColorStop(1, 'rgba(255,220,120,0)'); c.fillStyle = g; c.fillRect(0, 300, 1080, 1400);
    c.save(); c.translate(540, 1000); c.rotate(0.08 * zs(0, 0.6, u)); c.scale(1.02 + 0.06 * u, 1.02 + 0.06 * u); c.translate(-540, -1000);
    c.fillStyle = '#f4efe0'; c.beginPath(); c.ellipse(540, 1830, 600, 300, 0, 0, 7); c.fill();
    zface(c, 540, 1120 + 50 * zs(0, 0.6, u), 340, Object.assign({}, IND.head, { skin: IND.skin, blink: zblink(t, 0.5), smile: 0.0, brow: -0.02, brow2: 0.3, look: -0.8 * zs(0.2, 0.6, u), tear: 0 }));
    c.fillStyle = 'rgba(190,225,255,0.9)'; c.beginPath(); c.ellipse(260, 900 + ((t * 120) % 200), 14, 24, 0, 0, 7); c.fill();
    c.restore(); ztxt(c, 'शर्म', 540, 460, 120, '#ffd36a', zs(0.25, 0.45, u)); zmotes(c, t, 28, '#ffe0a8', 1.3);
  }
  function sceneG(c, t) {                        // 26.83-end : golden Karna, daanveer
    const u = (t - 26.83) / 5.1;
    zsky(c, t, '#f5a040', '#ffe6a8', 540, 700, 'rgba(255,235,160,1)'); zrays(c, 540, 700, t, 18, 'rgba(255,250,210,0.3)', 1800);
    ztrees(c, 1150, 6, 0.9, '#b79a56', u * 20, 99); zground(c, 1160, '#c9a75a', '#7a5a2a', 1320);
    zbody(c, Object.assign({}, KAR, { x: 540, y: 1600, s: 1.45, dir: 1, cloth: '#f2e4c4', cloth3: 'rgba(0,0,0,0.06)', a1: -0.9, a2: -1.0, b1: 0.2, b2: 0.3, head: Object.assign({}, KAR.head, { blink: zblink(t, 0.5), smile: 1, tear: 0.0 }) }));
    ztxt(c, 'दानवीर कर्ण', 540, 520, 120, '#fff1c0', zs(0.05, 0.25, u));
    for (let k = 0; k < 26; k++) { const q = ((t * 0.35 + k / 26) % 1); c.save(); c.translate(zr(k * 3) * 1080, -40 + q * 1700); c.rotate(q * 9 + k); c.fillStyle = '#f2c24b'; c.beginPath(); c.ellipse(0, 0, 16, 16, 0, 0, 7); c.fill(); c.fillStyle = '#ffe9a0'; c.beginPath(); c.ellipse(-3, -3, 7, 7, 0, 0, 7); c.fill(); c.restore(); }
    zmotes(c, t, 24, '#fff7d0');
  }
  const SCENES = [[0, 4.59, sceneA], [4.59, 8.52, sceneB], [8.52, 12.29, sceneC], [12.29, 17.23, sceneD], [17.23, 22.09, sceneE], [22.09, 26.83, sceneF], [26.83, 99, sceneG]];
