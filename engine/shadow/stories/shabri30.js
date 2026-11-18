  // ===== shabri30: 2D cut-out style, original characters (portrait 1080x1920 drawn directly) =====
  const HV = { W: 1080, H: 1920 };
  const HT = JSON.parse(window.HT_JSON);
  const HD = 31.2;
  const HFONT = '"Tiro Devanagari Hindi", serif';
  const zr = (i) => { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  const zc = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const zs = (a, b, t) => { const u = zc((t - a) / (b - a)); return u * u * (3 - 2 * u); };
  const zl = (a, b, u) => a + (b - a) * u;
  const zblink = (t, ph = 0) => { const k = (t + ph) % 3.2; return k < 0.16 ? Math.sin(k / 0.16 * Math.PI) : 0; };

  function zface(c, x, y, r, o) {
    const sk = o.skin || '#d9a074', sh = 'rgba(70,25,10,0.1)', hc = o.hc || '#2a1a14';
    c.save(); c.translate(x, y); c.lineCap = 'round'; c.lineJoin = 'round';
    c.fillStyle = sk; c.fillRect(-r * 0.3, r * 0.55, r * 0.6, r * 0.8); c.fillStyle = sh; c.fillRect(-r * 0.3, r * 0.55, r * 0.6, r * 0.2);
    if (o.hair === 'bun') { c.fillStyle = hc; c.beginPath(); c.ellipse(0, -r * 0.06, r * 1.0, r * 1.05, 0, 0, 7); c.fill(); c.beginPath(); c.arc(0, -r * 1.15, r * 0.38, 0, 7); c.fill(); }
    if (o.hair === 'jata') { c.fillStyle = hc; c.beginPath(); c.ellipse(0, -r * 0.1, r * 0.98, r * 1.02, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(0, -r * 1.15, r * 0.34, r * 0.4, 0, 0, 7); c.fill(); }
    c.fillStyle = sk; for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * r * 0.9, r * 0.02, r * 0.14, r * 0.21, 0, 0, 7); c.fill(); }
    if (o.earring) { c.fillStyle = '#f2c24b'; for (const s of [-1, 1]) { c.beginPath(); c.arc(s * r * 0.92, r * 0.3, r * 0.07, 0, 7); c.fill(); } }
    c.beginPath(); c.ellipse(0, 0, r * 0.9, r, 0, 0, 7); c.fillStyle = sk; c.fill();
    c.save(); c.beginPath(); c.ellipse(0, 0, r * 0.9, r, 0, 0, 7); c.clip(); c.fillStyle = sh; c.beginPath(); c.ellipse(r * 0.75, 0, r * 0.7, r * 1.1, 0, 0, 7); c.fill(); c.restore();
    c.fillStyle = hc; c.beginPath(); c.ellipse(0, -r * 0.1, r * 0.93, r * 1.0, 0, Math.PI * 1.08, Math.PI * 1.92); c.quadraticCurveTo(0, -r * 0.42, -r * 0.88, -r * 0.4); c.fill();
    if (o.crown) { c.fillStyle = '#f2c24b'; c.beginPath(); c.moveTo(-r * 0.62, -r * 0.62); c.lineTo(-r * 0.7, -r * 1.35); c.lineTo(-r * 0.3, -r * 1.05); c.lineTo(0, -r * 1.55); c.lineTo(r * 0.3, -r * 1.05); c.lineTo(r * 0.7, -r * 1.35); c.lineTo(r * 0.62, -r * 0.62); c.closePath(); c.fill(); c.fillStyle = '#d4442e'; c.beginPath(); c.arc(0, -r * 0.86, r * 0.07, 0, 7); c.fill(); }
    const bl = o.blink || 0, op = Math.max(0.06, 1 - bl), wide = o.wide || 0, lk = o.look || 0;
    for (const s of [-1, 1]) {
      const ex = s * r * 0.38, ey = -r * 0.02;
      c.fillStyle = '#fffaf0'; c.beginPath(); c.ellipse(ex, ey, r * 0.2, r * (0.13 + 0.06 * wide) * op, 0, 0, 7); c.fill();
      c.save(); c.beginPath(); c.ellipse(ex, ey, r * 0.2, r * (0.13 + 0.06 * wide) * op, 0, 0, 7); c.clip();
      c.fillStyle = o.eye || '#3b2415'; c.beginPath(); c.arc(ex + lk * r * 0.07, ey, r * (0.1 + 0.02 * wide), 0, 7); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(ex + lk * r * 0.07 - r * 0.03, ey - r * 0.04, r * 0.025, 0, 7); c.fill(); c.restore();
      c.strokeStyle = '#2a1a14'; c.lineWidth = r * 0.04; c.beginPath(); c.ellipse(ex, ey, r * 0.2, r * (0.13 + 0.06 * wide) * op, 0, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
      c.strokeStyle = o.old ? '#8a8a90' : hc; c.lineWidth = r * 0.05; c.beginPath(); const by = ey - r * (0.24 + 0.1 * wide + (o.brow || 0)); c.moveTo(ex - s * r * 0.2, by + r * 0.03); c.quadraticCurveTo(ex, by - r * 0.06, ex + s * r * 0.2, by + r * 0.02 + (o.brow2 || 0) * r * 0.1 * s); c.stroke();
      c.fillStyle = 'rgba(230,100,100,0.28)'; c.beginPath(); c.ellipse(s * r * 0.55, r * 0.34, r * 0.16, r * 0.1, 0, 0, 7); c.fill();
    }
    c.strokeStyle = 'rgba(80,35,15,0.55)'; c.lineWidth = r * 0.04; c.beginPath(); c.moveTo(0, r * 0.05); c.quadraticCurveTo(r * 0.08, r * 0.24, -r * 0.02, r * 0.28); c.stroke();
    const sm_ = o.smile == null ? 0.5 : o.smile, mo = o.mouth || 0;
    c.lineWidth = r * 0.05; c.strokeStyle = '#7a2f26';
    if (mo > 0.05) { c.fillStyle = '#5a1d18'; c.beginPath(); c.ellipse(0, r * 0.47, r * 0.16, r * 0.04 + r * 0.12 * mo, 0, 0, 7); c.fill(); }
    else { c.beginPath(); c.moveTo(-r * 0.2, r * 0.45); c.quadraticCurveTo(0, r * (0.45 + 0.24 * sm_), r * 0.2, r * 0.45); c.stroke(); }
    if (o.old) { c.strokeStyle = 'rgba(90,50,30,0.45)'; c.lineWidth = r * 0.025; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-r * 0.62, -r * 0.5 + k * r * 0.07); c.quadraticCurveTo(0, -r * 0.58 + k * r * 0.07, r * 0.62, -r * 0.5 + k * r * 0.07); c.stroke(); } for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * r * 0.6, r * 0.05); c.lineTo(s * r * 0.7, r * 0.12); c.moveTo(s * r * 0.6, r * 0.12); c.lineTo(s * r * 0.7, r * 0.2); c.stroke(); } }
    if (o.tilak) { c.fillStyle = '#e8c15a'; c.beginPath(); c.moveTo(0, -r * 0.5); c.lineTo(-r * 0.05, -r * 0.34); c.lineTo(r * 0.05, -r * 0.34); c.closePath(); c.fill(); c.fillStyle = '#c1362b'; c.beginPath(); c.arc(0, -r * 0.3, r * 0.04, 0, 7); c.fill(); }
    if (o.bindi) { c.fillStyle = '#c1362b'; c.beginPath(); c.arc(0, -r * 0.33, r * 0.045, 0, 7); c.fill(); }
    if (o.tear > 0) { const u = o.tear; c.fillStyle = 'rgba(190,225,255,0.9)'; c.beginPath(); c.ellipse(-r * 0.4, r * 0.1 + u * r * 0.5, r * 0.04, r * 0.07, 0, 0, 7); c.fill(); }
    c.restore();
  }
  // full body: feet at (x,y). o: s dir cloth cloth2 skin walk a1 a2 head{...} bob
  function zbody(c, o) {
    const s = o.s || 1, d = o.dir || 1, w = o.walk || 0, bob = Math.abs(Math.sin(w)) * 8 * (o.walk ? 1 : 0), sk = o.skin || '#d9a074';
    c.save(); c.translate(o.x, o.y - bob); c.scale(s * d, s); c.lineCap = 'round'; c.lineJoin = 'round';
    const arm = (a1, a2, back) => { c.save(); c.translate(back ? -60 : 60, -420); c.rotate(a1); c.strokeStyle = o.cloth; c.lineWidth = 48; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 100); c.stroke(); c.strokeStyle = sk; c.lineWidth = 36; c.beginPath(); c.moveTo(0, 90); c.lineTo(0, 110); c.stroke(); c.translate(0, 108); c.rotate(a2); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 100); c.stroke(); c.fillStyle = sk; c.beginPath(); c.arc(0, 112, 24, 0, 7); c.fill(); if (o.hold && !back) { o.hold(c); } c.restore(); };
    arm(o.b1 == null ? 0.15 : o.b1, o.b2 == null ? 0.2 : o.b2, true);
    c.fillStyle = o.cloth2 || '#e8e0cf'; c.beginPath(); c.moveTo(-75, -250); c.lineTo(75, -250); c.lineTo(100, -26); c.lineTo(-100, -26); c.closePath(); c.fill();
    c.fillStyle = 'rgba(0,0,0,0.12)'; c.beginPath(); c.moveTo(0, -250); c.lineTo(8, -26); c.lineTo(100, -26); c.lineTo(75, -250); c.closePath(); c.fill();
    c.fillStyle = sk; for (const sx of [-1, 1]) { c.beginPath(); c.ellipse(sx * 42 + Math.sin(w + (sx > 0 ? 0 : 3.14)) * 18, -14, 40, 16, 0, 0, 7); c.fill(); }
    c.fillStyle = o.cloth; c.beginPath(); c.moveTo(-80, -470); c.quadraticCurveTo(0, -500, 80, -470); c.lineTo(88, -240); c.lineTo(-88, -240); c.closePath(); c.fill();
    c.fillStyle = o.cloth3 || 'rgba(255,255,255,0.18)'; c.beginPath(); c.moveTo(-70, -470); c.lineTo(-20, -472); c.lineTo(88, -300); c.lineTo(70, -250); c.closePath(); c.fill();
    c.fillStyle = sk; c.fillRect(-26, -520, 52, 60);
    arm(o.a1 == null ? -0.1 : o.a1, o.a2 == null ? -0.3 : o.a2, false);
    zface(c, 0 + (o.hx || 0), -585 + (o.hy || 0), 74, Object.assign({ skin: sk }, o.head || {}));
    c.restore();
  }
  // ---------- backgrounds ----------
  function zsky(c, t, top, bot, sunX, sunY, sunC) {
    const g = c.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, top); g.addColorStop(1, bot); c.fillStyle = g; c.fillRect(0, 0, 1080, 1920);
    if (sunC) { const gg = c.createRadialGradient(sunX, sunY, 0, sunX, sunY, 520); gg.addColorStop(0, sunC); gg.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = gg; c.fillRect(0, 0, 1080, 1500); c.fillStyle = '#fff3c9'; c.beginPath(); c.arc(sunX, sunY, 80, 0, 7); c.fill(); }
  }
  function ztrees(c, y0, n, sc, col, off, seed) {
    c.fillStyle = col; for (let i = 0; i < n; i++) { const x = ((zr(seed + i) * (1300 + n * 20) - off) % 1400 + 1400) % 1400 - 160, h = (260 + zr(seed + i * 3) * 220) * sc, tw = 24 * sc;
      c.fillRect(x - tw / 2, y0 - h, tw, h + 40); for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(x + (k - 1.5) * 52 * sc, y0 - h - 20 * sc - (k % 2) * 40 * sc, (90 + zr(i + k) * 40) * sc, 0, 7); c.fill(); } }
  }
  function zhut(c, x, y, s, glow) {
    c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#7a5130'; c.fillRect(-170, -190, 340, 190);
    c.fillStyle = '#c99a4f'; c.beginPath(); c.moveTo(-230, -180); c.lineTo(0, -380); c.lineTo(230, -180); c.closePath(); c.fill(); c.strokeStyle = 'rgba(90,50,20,0.5)'; c.lineWidth = 5; for (let k = -200; k < 220; k += 26) { c.beginPath(); c.moveTo(k * 0.15, -370 + Math.abs(k) * 0.1); c.lineTo(k, -185); c.stroke(); }
    c.fillStyle = '#2d1708'; c.fillRect(-48, -140, 96, 140); const gg = c.createRadialGradient(0, -80, 0, 0, -80, 140); gg.addColorStop(0, `rgba(255,190,90,${glow})`); gg.addColorStop(1, 'rgba(255,190,90,0)'); c.fillStyle = gg; c.fillRect(-160, -220, 320, 260); c.restore();
  }
  function zground(c, y, col1, col2, pathY) {
    const g = c.createLinearGradient(0, y, 0, 1920); g.addColorStop(0, col1); g.addColorStop(1, col2); c.fillStyle = g; c.fillRect(0, y, 1080, 1920 - y);
    c.fillStyle = 'rgba(230,200,140,0.55)'; c.beginPath(); c.moveTo(-50, pathY); c.lineTo(1130, pathY - 20); c.lineTo(1130, pathY + 160); c.lineTo(-50, pathY + 170); c.closePath(); c.fill();
  }
  function zmotes(c, t, n, col, speed = 1) { for (let i = 0; i < n; i++) { const x = (zr(i) * 1080 + t * 12 * speed * (0.5 + zr(i + 9))) % 1080, y = (zr(i * 7) * 1500 + 200 - t * 20 * speed * zr(i + 4)) % 1500 + 200; c.fillStyle = col; c.globalAlpha = 0.35 + 0.35 * Math.sin(t * 2 + i); c.beginPath(); c.arc(x, y, 3 + zr(i + 2) * 4, 0, 7); c.fill(); } c.globalAlpha = 1; }
  function zpetals(c, t, t0, n) { if (t < t0) return; for (let i = 0; i < n; i++) { const u = ((t - t0) * 0.22 + zr(i)) % 1, x = zr(i * 3) * 1080 + Math.sin(u * 9 + i) * 40, y = -40 + u * 1700; c.save(); c.translate(x, y); c.rotate(u * 8 + i); c.fillStyle = i % 2 ? '#ff9ec0' : '#ffc44d'; c.beginPath(); c.ellipse(0, 0, 14, 7, 0, 0, 7); c.fill(); c.restore(); } }
  function zber(c, x, y, r) { c.fillStyle = '#a63a1e'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.fillStyle = '#d9633a'; c.beginPath(); c.arc(x - r * 0.28, y - r * 0.3, r * 0.4, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,0.7)'; c.beginPath(); c.arc(x - r * 0.4, y - r * 0.45, r * 0.14, 0, 7); c.fill(); }
  function zbasket(c, x, y, s, t, glow) {
    c.save(); c.translate(x, y); c.scale(s, s);
    if (glow > 0) { const gg = c.createRadialGradient(0, -80, 0, 0, -80, 420); gg.addColorStop(0, `rgba(255,205,90,${0.85 * glow})`); gg.addColorStop(1, 'rgba(255,205,90,0)'); c.fillStyle = gg; c.fillRect(-500, -500, 1000, 800); }
    for (let i = 0; i < 18; i++) zber(c, -110 + (i % 6) * 44 + (Math.floor(i / 6) % 2) * 20, -120 - Math.floor(i / 6) * 36, 26);
    c.fillStyle = '#9a6a35'; c.beginPath(); c.moveTo(-170, -110); c.lineTo(170, -110); c.lineTo(130, 40); c.lineTo(-130, 40); c.closePath(); c.fill(); c.strokeStyle = 'rgba(60,30,10,0.45)'; c.lineWidth = 6; for (let k = -150; k < 160; k += 30) { c.beginPath(); c.moveTo(k, -105); c.lineTo(k * 0.78, 38); c.stroke(); } for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-160 + k * 8, -70 + k * 40); c.lineTo(160 - k * 8, -70 + k * 40); c.stroke(); }
    c.restore();
  }
  const SH = { skin: '#c68a5e', cloth: '#f1ebe0', cloth2: '#d98a2b', cloth3: 'rgba(200,120,30,0.5)', head: { hair: 'bun', hc: '#d8d8de', old: true, bindi: true, earring: false } };
  const RAM = { skin: '#6aa3c4', cloth: '#f4c14a', cloth2: '#e9e2d0', cloth3: 'rgba(220,80,40,0.45)', head: { hair: 'jata', hc: '#1d1411', crown: true, tilak: true, earring: true, smile: 0.9 } };
  const LAK = { skin: '#d49a6c', cloth: '#e07a3a', cloth2: '#efe6d2', cloth3: 'rgba(255,255,255,0.2)', head: { hair: 'jata', hc: '#1d1411', earring: true } };
  const hold = {};
  // ---------- scenes ----------
  function sceneA(c, t) {                       // 0-4.05 hook close-up
    const u = t / 4.05, z = 1 + 0.06 * u;
    zsky(c, t, '#3a1f12', '#8a4a22', 540, 700, 'rgba(255,160,70,0.45)');
    c.save(); c.translate(540, 1000); c.scale(z, z); c.translate(-540, -1000);
    c.fillStyle = '#f1ebe0'; c.beginPath(); c.ellipse(540, 1750, 640, 360, 0, 0, 7); c.fill(); c.fillStyle = '#d98a2b'; c.beginPath(); c.ellipse(540, 1850, 640, 260, 0, 0, 7); c.fill();
    zface(c, 540, 1120, 390, Object.assign({}, SH.head, { skin: SH.skin, blink: zblink(t, 0.6), look: 0.3 * Math.sin(t * 1.5), tear: zs(1.0, 3.4, t), smile: 0.35, brow: 0.02 }));
    c.restore(); zmotes(c, t, 30, '#ffd9a0');
  }
  function sceneB(c, t) {                       // 4.05-10.27 sweeping the thorns
    const u = (t - 4.05) / 6.2, off = u * 160;
    zsky(c, t, '#f6b36b', '#fde1a8', 780, 520, 'rgba(255,215,140,0.8)');
    ztrees(c, 1020, 9, 0.7, '#a78a5a', off * 0.3, 11); ztrees(c, 1100, 8, 0.95, '#6f7f45', off * 0.6, 31);
    zground(c, 1090, '#8a9a4f', '#4f6a2f', 1260); zhut(c, 190, 1130, 0.85, 0.7);
    ztrees(c, 1160, 5, 1.25, '#3f5a2a', off, 51);
    const sw = Math.sin(t * 3.2);
    for (let k = 0; k < 7; k++) { const q = ((t * 0.7 + k / 7) % 1); c.strokeStyle = '#5a3a1c'; c.lineWidth = 7; c.beginPath(); const px = 620 - q * 280 + k * 40, py = 1330 - Math.sin(q * 3.1) * 110; c.moveTo(px, py); c.lineTo(px + 24, py - 10); c.moveTo(px + 8, py - 3); c.lineTo(px + 14, py - 22); c.stroke(); }
    zbody(c, Object.assign({}, SH, { x: 560, y: 1480, s: 1.15, dir: 1, a1: -0.55 + sw * 0.25, a2: -0.5 + sw * 0.2, b1: -0.2, b2: -0.3, hy: 0, head: Object.assign({}, SH.head, { blink: zblink(t, 0.3), smile: 0.8, look: 0.8 }) }));
    c.save(); c.translate(560 + 62, 1480 - 420 * 1.15); c.strokeStyle = '#6b4a24'; c.lineWidth = 10; c.beginPath(); c.moveTo(0, 0); c.lineTo(-90 + sw * 40, 480); c.stroke(); c.fillStyle = '#b98a3c'; c.beginPath(); c.moveTo(-90 + sw * 40, 480); c.lineTo(-150 + sw * 40, 560); c.lineTo(-40 + sw * 40, 570); c.closePath(); c.fill(); c.restore();
    zmotes(c, t, 26, '#fff1c8', 1.2);
  }
  function sceneC(c, t) {                       // 10.27-14.6 Ram arrives, she holds only ber
    const u = (t - 10.27) / 4.3;
    zsky(c, t, '#e98a5a', '#f9c58b', 300, 620, 'rgba(255,170,90,0.7)');
    ztrees(c, 1080, 9, 0.8, '#8a6a4e', u * 40, 21); ztrees(c, 1140, 7, 1.1, '#5a4a30', u * 90, 41);
    zground(c, 1120, '#7a7a45', '#4a5a2a', 1290); zhut(c, 900, 1170, 0.8, 0.8);
    const rx = zl(-200, 360, zs(0, 0.7, u)), wk = u < 0.7 ? t * 8 : 0;
    zbody(c, Object.assign({}, LAK, { x: rx - 150, y: 1500, s: 1.0, dir: 1, walk: wk, a1: 0.1, a2: 0.2, head: Object.assign({}, LAK.head, { blink: zblink(t, 1), smile: 0.4 }) }));
    zbody(c, Object.assign({}, RAM, { x: rx, y: 1510, s: 1.08, dir: 1, walk: wk + 1, a1: 0.1, a2: 0.1, head: Object.assign({}, RAM.head, { blink: zblink(t, 0.2) }) }));
    const cl_ = zs(0.45, 0.9, u);
    zbody(c, Object.assign({}, SH, { x: 800, y: 1500, s: 1.1, dir: -1, a1: zl(-0.4, -1.2, cl_), a2: zl(-0.3, -0.9, cl_), b1: zl(0.1, -1.1, cl_), b2: zl(0.1, -0.9, cl_), head: Object.assign({}, SH.head, { blink: zblink(t, 0.4), smile: 0.9, tear: zs(0.5, 1.0, u) * 0.9 }) }));
    zbasket(c, 760, 1510, 0.55, t, 0);
    zmotes(c, t, 20, '#ffe2b0');
  }
  function sceneD(c, t) {                       // 14.6-19.14 she tastes each ber
    const u = (t - 14.6) / 4.5;
    zsky(c, t, '#4a2a1c', '#a8582a', 540, 800, 'rgba(255,170,80,0.5)');
    c.save(); c.translate(540, 1000); c.scale(1 + 0.05 * u, 1 + 0.05 * u); c.translate(-540, -1000);
    c.fillStyle = '#f1ebe0'; c.beginPath(); c.ellipse(540, 1800, 640, 360, 0, 0, 7); c.fill();
    const chew = Math.abs(Math.sin(t * 7)) * (u > 0.2 ? 1 : 0);
    zface(c, 540, 960, 340, Object.assign({}, SH.head, { skin: SH.skin, mouth: 0.1 + 0.5 * chew, blink: zblink(t, 0.1), smile: 0.8, look: 0.9, tear: 0.0 }));
    const hx = zl(820, 640, zs(0, 0.25, u)) , hy = zl(1250, 1070, zs(0, 0.25, u));
    c.fillStyle = '#c68a5e'; c.beginPath(); c.arc(hx + 60, hy + 40, 70, 0, 7); c.fill(); zber(c, hx, hy, 40);
    c.restore();
    zbasket(c, 300, 1740, 0.9, t, 0);
    const ph = zs(0.3, 0.5, u); if (ph > 0) { c.globalAlpha = ph * (0.5 + 0.5 * Math.sin(t * 8)); c.fillStyle = '#ffe9a8'; for (let k = 0; k < 6; k++) { const a = k * 1.05 + t, rr = 480 + 30 * Math.sin(t * 5 + k); c.beginPath(); c.arc(540 + Math.cos(a) * rr, 960 + Math.sin(a) * rr * 0.75, 12, 0, 7); c.fill(); } c.globalAlpha = 1; }
    zmotes(c, t, 28, '#ffd9a0');
  }
  function sceneE(c, t) {                       // 19.14-23.79 Lakshman shocked, Ram eats with love
    const u = (t - 19.14) / 4.65;
    zsky(c, t, '#2b1b3a', '#a2552d', 760, 760, 'rgba(255,190,90,0.6)');
    const gl = zs(0.35, 0.8, u);
    c.save(); const gg = c.createRadialGradient(760, 960, 0, 760, 960, 520 * (0.6 + 0.6 * gl)); gg.addColorStop(0, `rgba(255,215,110,${0.9 * gl})`); gg.addColorStop(1, 'rgba(255,215,110,0)'); c.fillStyle = gg; c.fillRect(0, 300, 1080, 1300); c.restore();
    c.fillStyle = '#e8e2d2'; c.beginPath(); c.ellipse(240, 1760, 420, 300, 0, 0, 7); c.fill(); c.fillStyle = '#e07a3a'; c.beginPath(); c.ellipse(240, 1800, 420, 240, 0, 0, 7); c.fill();
    const shock = zs(0.0, 0.12, u) * (1 - zs(0.7, 0.95, u) * 0.6), sh = Math.sin(t * 40) * 4 * (u < 0.3 ? 1 : 0);
    zface(c, 250 + sh, 1040, 215, Object.assign({}, LAK.head, { skin: LAK.skin, wide: shock, brow: 0.08 * shock, mouth: 0.55 * shock, smile: 0.2, look: -0.6, blink: 0 }));
    c.fillStyle = 'rgba(190,225,255,0.85)'; c.beginPath(); c.ellipse(430, 780 + (t * 120) % 140, 14, 24, 0, 0, 7); c.fill();
    c.fillStyle = '#f4c14a'; c.beginPath(); c.arc(790, 1040, 330, 0, 7); c.globalAlpha = 0.28 + 0.25 * gl; c.fill(); c.globalAlpha = 1;
    c.fillStyle = '#e9e2d0'; c.beginPath(); c.ellipse(780, 1790, 480, 340, 0, 0, 7); c.fill(); c.fillStyle = '#f4c14a'; c.beginPath(); c.ellipse(780, 1840, 480, 260, 0, 0, 7); c.fill();
    const eat = zs(0.35, 0.55, u), chew = eat * Math.abs(Math.sin(t * 6));
    zface(c, 790, 1050, 250, Object.assign({}, RAM.head, { skin: RAM.skin, mouth: 0.1 + 0.4 * chew, smile: 0.95, blink: zblink(t, 0.5), look: -0.2 }));
    const bx = zl(980, 800, zs(0.15, 0.4, u)), by = zl(1290, 1230, zs(0.15, 0.4, u)); if (u < 0.55) { c.fillStyle = RAM.skin; c.beginPath(); c.arc(bx + 40, by + 60, 66, 0, 7); c.fill(); zber(c, bx, by, 38); }
    zmotes(c, t, 26, '#ffe6a8', 1.3);
  }
  function sceneF(c, t) {                       // 23.79-27.16 golden wide: bhaav
    const u = (t - 23.79) / 3.4;
    zsky(c, t, '#f9b86a', '#ffe4a6', 540, 600, 'rgba(255,225,150,0.95)');
    for (let k = 0; k < 14; k++) { c.save(); c.translate(540, 600); c.rotate(k * 0.45 + t * 0.12); c.fillStyle = 'rgba(255,240,190,0.2)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(-40, -1400); c.lineTo(40, -1400); c.closePath(); c.fill(); c.restore(); }
    ztrees(c, 1100, 8, 0.9, '#9a8a50', u * 30, 61); zground(c, 1110, '#9aa557', '#58742f', 1290);
    const bow = zs(0.1, 0.5, u);
    zbody(c, Object.assign({}, RAM, { x: 740, y: 1530, s: 1.18, dir: -1, a1: -0.2, a2: -0.6, b1: 0.1, b2: 0.2, head: Object.assign({}, RAM.head, { blink: zblink(t, 0.2), smile: 1 }) }));
    zbody(c, Object.assign({}, SH, { x: 330, y: 1540, s: 1.18, dir: 1, a1: -1.2, a2: -0.9, b1: -1.1, b2: -0.9, hy: 40 * bow, hx: 20 * bow, head: Object.assign({}, SH.head, { blink: zblink(t, 0.7), smile: 1, tear: 0.8 }) }));
    zpetals(c, t, 23.9, 40); zmotes(c, t, 24, '#fff7d0');
  }
  function sceneG(c, t) {                       // 27.16-end: basket glowing, CTA
    const u = (t - 27.16) / 4.0;
    zsky(c, t, '#3a1d12', '#8a4a22', 540, 900, 'rgba(255,170,70,0.4)');
    zbasket(c, 540, 1240, 1.9 + 0.08 * u, t, 0.8 + 0.2 * Math.sin(t * 3));
    for (let k = 0; k < 8; k++) { const q = ((t * 0.4 + k / 8) % 1); c.fillStyle = `rgba(255,120,150,${1 - q})`; c.save(); c.translate(540 + Math.sin(k * 2 + t) * 260, 820 - q * 520); c.scale(1 + k % 3 * 0.3, 1 + k % 3 * 0.3); c.beginPath(); c.moveTo(0, 12); c.bezierCurveTo(-22, -6, -14, -26, 0, -12); c.bezierCurveTo(14, -26, 22, -6, 0, 12); c.fill(); c.restore(); }
    zmotes(c, t, 30, '#ffd9a0');
  }
  const SCENES = [[0, 4.05, sceneA], [4.05, 10.27, sceneB], [10.27, 14.6, sceneC], [14.6, 19.14, sceneD], [19.14, 23.79, sceneE], [23.79, 27.16, sceneF], [27.16, 99, sceneG]];
  function zframe(c, t) {
    let i = SCENES.findIndex((s) => t >= s[0] && t < s[1]); if (i < 0) i = SCENES.length - 1;
    const s = SCENES[i], fade = zs(s[0], s[0] + 0.28, t);
    if (i > 0 && fade < 1) { SCENES[i - 1][2](c, Math.min(t, SCENES[i - 1][1] - 0.001)); c.globalAlpha = fade; }
    c.save(); if (i > 0 && fade < 1) { c.beginPath(); c.rect(0, 0, 1080, 1920); c.clip(); }
    s[2](c, t); c.restore(); c.globalAlpha = 1;
    const v = c.createRadialGradient(540, 960, 520, 540, 960, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(20,6,0,0.55)'); c.fillStyle = v; c.fillRect(0, 0, 1080, 1920);
    c.fillStyle = 'rgba(255,170,70,0.07)'; c.fillRect(0, 0, 1080, 1920);
  }
  // ---------- captions + hook ----------
  const HOT = new Set(['शबरी', 'जूठे', 'बेर', 'काँटे', 'प्रेम', 'भाव', 'भक्ति', 'भगवान,', 'राम']);
  const HCAPS = [];
  for (const l of HT.lines) {
    const segs = l.text.split(/(?<=[,।?!….])\s*/).filter((x) => x.trim()), out = [];
    for (const sg of segs) { const w = sg.split(' '); if (sg.length > 26 && w.length > 3) { const h = Math.ceil(w.length / 2); out.push(w.slice(0, h).join(' '), w.slice(h).join(' ')); } else out.push(sg); }
    const tot = out.reduce((a, x) => a + x.length, 0); let acc = 0;
    for (const sg of out) { HCAPS.push([l.start + (l.end - l.start) * acc / tot, sg.split(' ').map((w) => (HOT.has(w.replace(/[,।?!….]/g, '')) || HOT.has(w) ? '*' + w + '*' : w)).join(' ')]); acc += sg.length; }
  }
  function hcap(c, t) {
    let i = -1; for (let k = 0; k < HCAPS.length; k++) if (t >= HCAPS[k][0]) i = k; if (i < 0 || t > HD - 0.5) return;
    const dt = t - HCAPS[i][0], raw = HCAPS[i][1].split(' '); let on = false; const words = raw.map((w) => { if (w.startsWith('*')) on = true; const o = { w: w.replace(/\*/g, ''), hot: on }; if (/\*[.,?!।]*$/.test(w)) on = false; return o; });
    c.save(); c.font = `66px ${HFONT}`; c.lineJoin = 'round'; const sp = c.measureText(' ').width, tot = words.reduce((a, x) => a + (x.wd = c.measureText(x.w).width), 0) + sp * (words.length - 1);
    const s = 0.9 + 0.1 * Math.min(1, dt / 0.15); c.translate(540, 1640); c.scale(s, s); c.globalAlpha = zc(dt / 0.07);
    let x = -tot / 2; for (const w of words) { c.lineWidth = 13; c.strokeStyle = '#1a0a03'; c.strokeText(w.w, x, 0); c.fillStyle = w.hot ? '#ffc04d' : '#fff6e6'; c.fillText(w.w, x, 0); x += w.wd + sp; } c.restore();
  }
  function hhook(c, t) {
    if (t > 4.2) return; const a = t < 3.7 ? zc(t / 0.35) : zc((4.2 - t) / 0.5);
    c.save(); c.globalAlpha = a; c.textAlign = 'center'; c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 20; c.fillStyle = '#ffe08a'; c.font = `112px ${HFONT}`;
    c.fillText('शबरी ने राम को', 540, 230); c.fillText('जूठे बेर क्यों दिए?', 540, 360); c.shadowBlur = 0; c.fillStyle = '#e9c9a0'; c.font = `42px ${HFONT}`; c.fillText('रामायण की मान्यता के अनुसार', 540, 425); c.restore();
  }
  const hctx = document.getElementById('cv').getContext('2d');
  window.seek = (t) => { t = zc(t, 0, HD); hctx.setTransform(1, 0, 0, 1, 0, 0); hctx.globalAlpha = 1; hctx.globalCompositeOperation = 'source-over'; hctx.filter = 'none'; zframe(hctx, t); hhook(hctx, t); hcap(hctx, t);
    hctx.save(); hctx.font = `30px ${HFONT}`; hctx.fillStyle = 'rgba(255,240,210,0.55)'; hctx.textAlign = 'right'; hctx.fillText('SANATAN DHARM', 1032, 1824); hctx.restore(); };
  window.DURATION = HD;
  (async () => { try { await document.fonts.load(`66px ${HFONT}`, 'शबरी'); await document.fonts.ready; } catch (e) {} window.seek(3); window.READY = true; })();
