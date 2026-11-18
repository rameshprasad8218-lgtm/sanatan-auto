  // ===== shabri30: 2D cut-out style, original characters (portrait 1080x1920 drawn directly) =====
  const HV = { W: 1080, H: 1920 };
  const HT = JSON.parse(window.HT_JSON);
  const HD = 31.0;
  const AN = anime;
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
    if (o.feather) { c.strokeStyle = '#2d6a4f'; c.lineWidth = r * 0.045; c.beginPath(); c.moveTo(r * 0.1, -r * 1.35); c.quadraticCurveTo(r * 0.25, -r * 1.7, r * 0.6, -r * 1.95); c.stroke(); c.fillStyle = '#1f9d8a'; c.beginPath(); c.ellipse(r * 0.62, -r * 1.98, r * 0.2, r * 0.3, 0.7, 0, 7); c.fill(); c.fillStyle = '#233a8a'; c.beginPath(); c.ellipse(r * 0.62, -r * 1.98, r * 0.09, r * 0.14, 0.7, 0, 7); c.fill(); }
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
  const KRI = { skin: '#5b8fd1', cloth: '#f4cd4c', cloth2: '#f0e6c8', cloth3: 'rgba(200,60,60,0.45)', head: { hair: 'jata', hc: '#14101a', crown: true, feather: true, tilak: true, earring: true, smile: 0.95 } };
  const SUD = { skin: '#b4825a', cloth: '#cbb994', cloth2: '#bfa77a', cloth3: 'rgba(90,60,30,0.3)', head: { hair: 'jata', hc: '#5a4a40', tilak: true, smile: 0.25, brow: 0.05 } };
  // ---------- anime.js timeline (frame-exact via seek) ----------
  const A = { punch: 0, kx: 1400, pal: 0, flash: 0, leak: 0, snatch: 0 };
  const TL = AN.createTimeline({ autoplay: false });
  TL.add(A, { kx: 560, duration: 1700, ease: 'outBack(1.6)' }, 13700)
    .add(A, { snatch: 1, duration: 260, ease: 'outQuad' }, 15500)
    .add(A, { punch: 1, duration: 140, ease: 'outQuad' }, 15500).add(A, { punch: 0, duration: 650, ease: 'outElastic(1,.55)' }, 15640)
    .add(A, { flash: 1, duration: 80 }, 15500).add(A, { flash: 0, duration: 500, ease: 'outQuad' }, 15580)
    .add(A, { punch: 1, duration: 140, ease: 'outQuad' }, 18230).add(A, { punch: 0, duration: 600, ease: 'outElastic(1,.55)' }, 18370)
    .add(A, { pal: 1, duration: 1500, ease: 'outElastic(1,.6)' }, 23100)
    .add(A, { leak: 1, duration: 500, ease: 'inOutQuad' }, 22580).add(A, { leak: 0, duration: 700, ease: 'inOutQuad' }, 23080);
  const CAPOBJ = [];
  function zpalace(c, x, y, s, glow, t) {
    c.save(); c.translate(x, y); c.scale(s, s);
    if (glow > 0) { const gg = c.createRadialGradient(0, -260, 0, 0, -260, 600); gg.addColorStop(0, `rgba(255,215,120,${0.8 * glow})`); gg.addColorStop(1, 'rgba(255,215,120,0)'); c.fillStyle = gg; c.fillRect(-700, -900, 1400, 1100); }
    c.fillStyle = '#f2cf7a'; c.fillRect(-300, -250, 600, 250); c.fillStyle = '#d9a64a'; c.fillRect(-300, -270, 600, 24);
    for (const [dx, r, h] of [[-190, 80, 150], [0, 120, 230], [190, 80, 150]]) { c.fillStyle = '#f2cf7a'; c.fillRect(dx - r, -250 - h, r * 2, h); c.fillStyle = '#e8b85a'; c.beginPath(); c.arc(dx, -250 - h, r, Math.PI, 0); c.fill(); c.fillRect(dx - 4, -250 - h - r - 50, 8, 60); c.fillStyle = '#d9473b'; c.beginPath(); c.moveTo(dx + 4, -250 - h - r - 50); c.lineTo(dx + 46, -250 - h - r - 38); c.lineTo(dx + 4, -250 - h - r - 26); c.fill(); }
    c.fillStyle = '#fff2c9'; for (let k = 0; k < 6; k++) { const wx = -250 + k * 100; c.beginPath(); c.moveTo(wx - 20, -120); c.lineTo(wx - 20, -190); c.arc(wx, -190, 20, Math.PI, 0); c.lineTo(wx + 20, -120); c.fill(); }
    c.fillStyle = '#7a3b1c'; c.beginPath(); c.moveTo(-50, 0); c.lineTo(-50, -110); c.arc(0, -110, 50, Math.PI, 0); c.lineTo(50, 0); c.fill();
    c.restore();
  }
  function zpouch(c, x, y, s, open) {
    c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#8c6c46'; c.beginPath(); c.moveTo(-90, 0); c.quadraticCurveTo(-140, 120, 0, 150); c.quadraticCurveTo(140, 120, 90, 0); c.closePath(); c.fill();
    c.strokeStyle = '#5a4128'; c.lineWidth = 8; c.beginPath(); c.moveTo(-60, 40); c.lineTo(-30, 70); c.moveTo(40, 60); c.lineTo(70, 90); c.stroke();
    c.fillStyle = '#e9dfc4'; for (let k = 0; k < 14; k++) { c.beginPath(); c.ellipse(-60 + (k % 7) * 20, -20 - Math.floor(k / 7) * 12 - (k % 3) * 6 * open, 12, 6, k, 0, 7); c.fill(); }
    c.fillStyle = '#6b4f30'; c.beginPath(); c.moveTo(-90, 0); c.lineTo(-40, -36); c.lineTo(0, -6); c.lineTo(40, -36); c.lineTo(90, 0); c.closePath(); c.fill(); c.restore();
  }
  function grains(c, t, tx, ty, n) { c.fillStyle = '#fff6df'; for (let k = 0; k < n; k++) { const q = ((t * 1.6 + k / n) % 1), sx = 100 + zr(k) * 880, sy = 700 + zr(k + 4) * 900; c.save(); c.translate(zl(sx, tx, q), zl(sy, ty, q)); c.rotate(q * 8); c.globalAlpha = 1 - q * 0.4; c.beginPath(); c.ellipse(0, 0, 14, 6, 0, 0, 7); c.fill(); c.restore(); } c.globalAlpha = 1; }
  function sceneA(c, t) {                       // 0-3.61 hook: Krishna eating chivda
    const z = 1 + 0.05 * (t / 3.6);
    zsky(c, t, '#2a3b7a', '#e59a54', 540, 760, 'rgba(255,190,100,0.55)');
    c.save(); c.translate(540, 1100); c.scale(z, z); c.translate(-540, -1100);
    c.fillStyle = '#f4cd4c'; c.beginPath(); c.ellipse(540, 1760, 620, 340, 0, 0, 7); c.fill(); c.fillStyle = '#d84a5e'; c.beginPath(); c.ellipse(540, 1830, 460, 220, 0, 0, 7); c.fill();
    const ch = Math.abs(Math.sin(t * 7)) * zs(0.5, 0.7, t);
    zface(c, 540, 1270, 320, Object.assign({}, KRI.head, { skin: KRI.skin, mouth: 0.08 + 0.45 * ch, blink: zblink(t, 0.8), smile: 1, look: 0.2 }));
    c.restore(); grains(c, t, 540, 1430, 10); zmotes(c, t, 28, '#ffe6a8');
  }
  function sceneB(c, t) {                       // 3.61-8.56 Sudama walks to Dwarka
    const u = (t - 3.61) / 4.95;
    zsky(c, t, '#7a4a8a', '#f7b36a', 760, 880, 'rgba(255,190,110,0.7)');
    c.fillStyle = '#3d6a9a'; c.fillRect(0, 1010, 1080, 140); for (let k = 0; k < 8; k++) { c.fillStyle = 'rgba(255,230,170,0.4)'; c.fillRect(100 + k * 120 + Math.sin(t * 2 + k) * 20, 1030 + (k % 3) * 36, 70, 6); }
    zpalace(c, 780, 1080, 0.55 + 0.35 * u, 0.8, t);
    ztrees(c, 1160, 6, 1.1, '#4a3a2a', u * 100, 71); zground(c, 1150, '#b99a62', '#7a6038', 1330);
    const x = zl(160, 560, u);
    zbody(c, Object.assign({}, SUD, { x, y: 1560, s: 1.2, dir: 1, walk: t * 7, a1: -0.5, a2: -0.2, b1: 0.2, b2: 0.2, hold: (cc) => { cc.fillStyle = '#8c6c46'; cc.beginPath(); cc.arc(0, 150, 30, 0, 7); cc.fill(); }, head: Object.assign({}, SUD.head, { blink: zblink(t, 0.4), smile: 0.4 }) }));
    zmotes(c, t, 22, '#ffe2b0');
  }
  function sceneC(c, t) {                       // 8.56-13.65 close-up: the torn pouch
    const u = (t - 8.56) / 5.1, sh = Math.sin(t * 22) * 3 * (1 - u);
    zsky(c, t, '#2b1d2a', '#8a4a2a', 540, 800, 'rgba(255,170,80,0.35)');
    c.save(); c.translate(540, 1050); c.scale(1 + 0.08 * u, 1 + 0.08 * u); c.translate(-540, -1050);
    c.fillStyle = SUD.skin; for (const s of [-1, 1]) { c.beginPath(); c.ellipse(540 + s * 250, 1210, 120, 90, s * 0.5, 0, 7); c.fill(); for (let k = 0; k < 4; k++) { c.beginPath(); c.roundRect(540 + s * 250 - 60 + k * 30 - (s < 0 ? 0 : 0), 1130, 26, 100, 12); c.fill(); } }
    zpouch(c, 540 + sh, 980, 3.2, zs(0.1, 0.4, u));
    c.restore();
    c.fillStyle = 'rgba(190,225,255,0.85)'; c.beginPath(); c.ellipse(860, 560 + (t * 160) % 200, 16, 28, 0, 0, 7); c.fill();
    zmotes(c, t, 24, '#ffe0a8');
  }
  function sceneD(c, t) {                       // 13.65-18.23 shy Sudama, Krishna dashes in and snatches
    const u = (t - 13.65) / 4.58;
    zsky(c, t, '#6a4a8a', '#f7b46a', 540, 760, 'rgba(255,190,110,0.6)');
    zpalace(c, 540, 1180, 1.05, 0.9, t); zground(c, 1170, '#c6a56a', '#7a6038', 1360);
    const snat = A.snatch;
    zbody(c, Object.assign({}, SUD, { x: 300, y: 1580, s: 1.25, dir: 1, a1: 0.4, a2: 0.5, b1: 0.35, b2: 0.4, hx: 10, hy: 24, head: Object.assign({}, SUD.head, { blink: zblink(t, 0.2), smile: 0.1, look: -0.5 }) }));
    c.save(); c.translate(250, 1250); c.fillStyle = '#8c6c46'; c.globalAlpha = 1 - snat; c.beginPath(); c.arc(0, 0, 26, 0, 7); c.fill(); c.restore();
    const kx = A.kx, run = kx > 575 ? t * 10 : 0;
    zbody(c, Object.assign({}, KRI, { x: kx, y: 1590, s: 1.28, dir: -1, walk: run, a1: -0.5 - 0.5 * snat, a2: -0.9 * snat, b1: 0.3, b2: 0.2, head: Object.assign({}, KRI.head, { blink: zblink(t, 0.5), smile: 1 }) }));
    c.save(); c.translate(zl(250, kx - 140, snat), zl(1250, 1260, snat)); c.fillStyle = '#8c6c46'; c.globalAlpha = snat; c.beginPath(); c.arc(0, 0, 30, 0, 7); c.fill(); c.restore(); c.globalAlpha = 1;
    zmotes(c, t, 18, '#ffe0a8');
    if (A.flash > 0.02) { c.fillStyle = `rgba(255,240,200,${0.8 * A.flash})`; c.fillRect(0, 0, 1080, 1920); }
  }
  function sceneE(c, t) {                       // 18.23-22.58 split: teary Sudama / Krishna eating
    const u = (t - 18.23) / 4.35, gl = zs(0.1, 0.5, u);
    zsky(c, t, '#2b1b3a', '#a2552d', 760, 760, 'rgba(255,190,90,0.6)');
    c.save(); const gg = c.createRadialGradient(790, 1000, 0, 790, 1000, 560 * (0.6 + 0.6 * gl)); gg.addColorStop(0, `rgba(255,215,110,${0.9 * gl})`); gg.addColorStop(1, 'rgba(255,215,110,0)'); c.fillStyle = gg; c.fillRect(0, 300, 1080, 1300); c.restore();
    c.fillStyle = '#cbb994'; c.beginPath(); c.ellipse(240, 1770, 420, 300, 0, 0, 7); c.fill();
    zface(c, 250, 1060, 215, Object.assign({}, SUD.head, { skin: SUD.skin, tear: zs(0.0, 0.8, u), smile: 0.6, brow: 0.1, blink: zblink(t, 0.2) }));
    c.fillStyle = '#f4cd4c'; c.beginPath(); c.ellipse(790, 1800, 480, 340, 0, 0, 7); c.fill();
    const ch = Math.abs(Math.sin(t * 6)) * zs(0.05, 0.2, u);
    zface(c, 790, 1060, 255, Object.assign({}, KRI.head, { skin: KRI.skin, mouth: 0.1 + 0.4 * ch, smile: 1, blink: zblink(t, 0.5), look: -0.2 }));
    grains(c, t, 790, 1200, 8); zmotes(c, t, 26, '#ffe6a8', 1.3);
  }
  function sceneF(c, t) {                       // 22.58-27.74 hut -> palace
    const u = (t - 22.58) / 5.16;
    zsky(c, t, '#8a5a9a', '#ffd48a', 540, 700, 'rgba(255,225,150,0.9)');
    zground(c, 1250, '#9aa557', '#58742f', 1420);
    const hutA = 1 - zs(0.12, 0.4, u);
    c.globalAlpha = hutA; zhut(c, 540, 1300, 1.3, 0.6); c.globalAlpha = 1;
    zpalace(c, 540, 1330, 1.25 * A.pal, A.pal, t);
    for (let k = 0; k < 40; k++) { const q = ((t * 0.5 + zr(k)) % 1), x = zr(k * 3) * 1080, y = 1500 - q * 1300; c.fillStyle = `rgba(255,215,90,${(1 - q) * A.pal})`; c.beginPath(); c.arc(x, y, 5 + zr(k) * 6, 0, 7); c.fill(); }
    zbody(c, Object.assign({}, SUD, { x: 330, y: 1700, s: 1.1, dir: 1, a1: -1.2 - 0.3 * Math.sin(t * 6) * 0, a2: -0.8, b1: -1.2, b2: -0.8, head: Object.assign({}, SUD.head, { wide: 1, mouth: 0.6, smile: 0.5, brow: 0.08, blink: 0 }) }));
    if (A.leak > 0.02) { const lg = c.createLinearGradient(0, 0, 1080, 400); lg.addColorStop(0, 'rgba(255,150,60,0)'); lg.addColorStop(0.5, `rgba(255,170,70,${0.55 * A.leak})`); lg.addColorStop(1, 'rgba(255,230,160,0)'); c.fillStyle = lg; c.fillRect(0, 0, 1080, 1920); }
    zpetals(c, t, 24.5, 24);
  }
  function sceneG(c, t) {                       // 27.74-end: friends, hearts
    const u = (t - 27.74) / 4;
    zsky(c, t, '#3a1d3a', '#e08a4a', 540, 900, 'rgba(255,170,70,0.5)');
    ztrees(c, 1180, 6, 1.1, '#3a2a30', u * 40, 81); zground(c, 1190, '#8a7a4a', '#4a4a2a', 1380);
    zbody(c, Object.assign({}, SUD, { x: 400, y: 1650, s: 1.3, dir: 1, a1: -0.15, a2: -0.2, b1: 0.1, b2: 0.1, head: Object.assign({}, SUD.head, { smile: 0.9, blink: zblink(t, 0.1), tear: 0 }) }));
    zbody(c, Object.assign({}, KRI, { x: 700, y: 1650, s: 1.3, dir: -1, a1: -0.15, a2: -0.2, b1: 0.1, b2: 0.1, head: Object.assign({}, KRI.head, { smile: 1, blink: zblink(t, 0.6) }) }));
    for (let k = 0; k < 9; k++) { const q = ((t * 0.4 + k / 9) % 1); c.fillStyle = `rgba(255,120,150,${1 - q})`; c.save(); c.translate(540 + Math.sin(k * 2 + t) * 260, 900 - q * 520); c.scale(1 + k % 3 * 0.3, 1 + k % 3 * 0.3); c.beginPath(); c.moveTo(0, 12); c.bezierCurveTo(-22, -6, -14, -26, 0, -12); c.bezierCurveTo(14, -26, 22, -6, 0, 12); c.fill(); c.restore(); }
    zmotes(c, t, 28, '#ffd9a0');
  }
  const SCENES = [[0, 3.61, sceneA], [3.61, 8.56, sceneB], [8.56, 13.65, sceneC], [13.65, 18.23, sceneD], [18.23, 22.58, sceneE], [22.58, 27.74, sceneF], [27.74, 99, sceneG]];
  function zframe(c, t) {
    TL.seek(t * 1000);
    let i = SCENES.findIndex((s) => t >= s[0] && t < s[1]); if (i < 0) i = SCENES.length - 1;
    const s = SCENES[i], fade = zs(s[0], s[0] + 0.25, t), pz = 1 + 0.12 * A.punch;
    if (i > 0 && fade < 1) { SCENES[i - 1][2](c, Math.min(t, SCENES[i - 1][1] - 0.001)); c.globalAlpha = fade; }
    c.save(); c.translate(540, 960); c.scale(pz, pz); c.translate(-540, -960); s[2](c, t); c.restore(); c.globalAlpha = 1;
    const v = c.createRadialGradient(540, 960, 520, 540, 960, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(20,6,0,0.55)'); c.fillStyle = v; c.fillRect(0, 0, 1080, 1920);
    c.fillStyle = 'rgba(255,170,70,0.07)'; c.fillRect(0, 0, 1080, 1920);
  }
  // ---------- captions + hook ----------
  const HOT = new Set(['सुदामा', 'कृष्ण', 'चिवड़े', 'चिवड़ा', 'प्रेम', 'गरीबी', 'महल', 'दोस्त', 'छीन', 'छीन ली।']);
  const HCAPS = [];
  for (const l of HT.lines) {
    const segs = l.text.split(/(?<=[,।?!….])\s*/).filter((x) => x.trim()), out = [];
    for (const sg of segs) { const w = sg.split(' '); if (sg.length > 26 && w.length > 3) { const h = Math.ceil(w.length / 2); out.push(w.slice(0, h).join(' '), w.slice(h).join(' ')); } else out.push(sg); }
    const tot = out.reduce((a, x) => a + x.length, 0); let acc = 0;
    for (const sg of out) { HCAPS.push([l.start + (l.end - l.start) * acc / tot, sg.split(' ').map((w) => (HOT.has(w.replace(/[,।?!….]/g, '')) || HOT.has(w) ? '*' + w + '*' : w)).join(' ')]); acc += sg.length; }
  }
  const CAPTL = AN.createTimeline({ autoplay: false }); const CAPS_ = HCAPS.map(() => ({ v: 0.8 })); HCAPS.forEach((h, k) => CAPTL.add(CAPS_[k], { v: 1, duration: 320, ease: 'outBack(3)' }, 0));
  function CAPPOP(i, dt) { CAPTL.seek(0); const o = { v: 0.8 }; return Math.min(1.12, 0.8 + 0.2 * (1 - Math.pow(1 - Math.min(1, dt / 0.3), 3)) + 0.06 * Math.sin(Math.min(1, dt / 0.3) * Math.PI)); }
  function hcap(c, t) {
    let i = -1; for (let k = 0; k < HCAPS.length; k++) if (t >= HCAPS[k][0]) i = k; if (i < 0 || t > HD - 0.5) return;
    if (!CAPOBJ[i]) { CAPOBJ[i] = { s: 0.75 }; }
    const dt = t - HCAPS[i][0], raw = HCAPS[i][1].split(' '); let on = false; const words = raw.map((w) => { if (w.startsWith('*')) on = true; const o = { w: w.replace(/\*/g, ''), hot: on }; if (/\*[.,?!।]*$/.test(w)) on = false; return o; });
    c.save(); c.font = `66px ${HFONT}`; c.lineJoin = 'round'; const sp = c.measureText(' ').width, tot = words.reduce((a, x) => a + (x.wd = c.measureText(x.w).width), 0) + sp * (words.length - 1);
    const s = CAPPOP(i, dt); c.translate(540, 1640); c.scale(s, s); c.globalAlpha = zc(dt / 0.07);
    let x = -tot / 2; for (const w of words) { c.lineWidth = 13; c.strokeStyle = '#1a0a03'; c.strokeText(w.w, x, 0); c.fillStyle = w.hot ? '#ffc04d' : '#fff6e6'; c.fillText(w.w, x, 0); x += w.wd + sp; } c.restore();
  }
  function hhook(c, t) {
    if (t > 4.2) return; const a = t < 3.7 ? zc(t / 0.35) : zc((4.2 - t) / 0.5);
    c.save(); c.globalAlpha = a; c.textAlign = 'center'; c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 20; c.fillStyle = '#ffe08a'; c.font = `112px ${HFONT}`;
    c.fillText('कृष्ण ने सुदामा के', 540, 230); c.fillText('चिवड़े क्यों खाए?', 540, 360); c.shadowBlur = 0; c.fillStyle = '#e9c9a0'; c.font = `42px ${HFONT}`; c.fillText('भागवत की मान्यता के अनुसार', 540, 425); c.restore();
  }
  const hctx = document.getElementById('cv').getContext('2d');
  window.seek = (t) => { t = zc(t, 0, HD); hctx.setTransform(1, 0, 0, 1, 0, 0); hctx.globalAlpha = 1; hctx.globalCompositeOperation = 'source-over'; hctx.filter = 'none'; zframe(hctx, t); hhook(hctx, t); hcap(hctx, t);
    hctx.save(); hctx.font = `30px ${HFONT}`; hctx.fillStyle = 'rgba(255,240,210,0.55)'; hctx.textAlign = 'right'; hctx.fillText('SANATAN DHARM', 1032, 1824); hctx.restore(); };
  window.DURATION = HD;
  (async () => { try { await document.fonts.load(`66px ${HFONT}`, 'सुदामा'); await document.fonts.ready; } catch (e) {} window.seek(3); window.READY = true; })();
