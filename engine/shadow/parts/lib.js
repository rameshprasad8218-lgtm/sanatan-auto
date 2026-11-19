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
    if (o.post) o.post(c, r);
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
