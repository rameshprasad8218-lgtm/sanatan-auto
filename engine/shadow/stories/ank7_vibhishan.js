  // ===== shabri30: 2D cut-out style, original characters (portrait 1080x1920 drawn directly) =====
  const HV = { W: 1080, H: 1920 };
  const HT = JSON.parse(window.HT_JSON);
  const HD = 29.64;
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
    if (o.pre) o.pre(c, r);
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
    if (o.back) o.back(c);
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
  // ---------- extra decorations (post callbacks draw in face-local coords) ----------
  function zbeard(c, r, col) {
    c.save(); c.fillStyle = col || '#ecebef';
    c.beginPath(); c.moveTo(-r * 0.9, -r * 0.05); c.quadraticCurveTo(-r * 1.05, r * 1.0, -r * 0.32, r * 1.95); c.quadraticCurveTo(0, r * 2.2, r * 0.32, r * 1.95); c.quadraticCurveTo(r * 1.05, r * 1.0, r * 0.9, -r * 0.05);
    c.quadraticCurveTo(r * 0.8, r * 0.7, r * 0.45, r * 0.75); c.quadraticCurveTo(0, r * 0.95, -r * 0.45, r * 0.75); c.quadraticCurveTo(-r * 0.8, r * 0.7, -r * 0.9, -r * 0.05); c.fill();
    c.fillStyle = 'rgba(0,0,0,0.08)'; c.beginPath(); c.moveTo(r * 0.1, r * 0.9); c.quadraticCurveTo(r * 0.7, r * 1.0, r * 0.3, r * 1.95); c.quadraticCurveTo(r * 0.5, r * 1.3, r * 0.1, r * 0.9); c.fill();
    c.fillStyle = col || '#ecebef'; for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * r * 0.22, r * 0.33, r * 0.24, r * 0.07, s * 0.25, 0, 7); c.fill(); }
    c.restore();
  }
  function zeye3(c, r, glow) {
    c.save(); if (glow) { const g = c.createRadialGradient(0, -r * 0.4, 0, 0, -r * 0.4, r * 0.9 * glow); g.addColorStop(0, 'rgba(255,90,40,0.8)'); g.addColorStop(1, 'rgba(255,90,40,0)'); c.fillStyle = g; c.fillRect(-r, -r * 1.4, r * 2, r * 2); }
    c.fillStyle = '#d4362a'; c.beginPath(); c.ellipse(0, -r * 0.42, r * 0.055, r * 0.14, 0, 0, 7); c.fill();
    c.strokeStyle = 'rgba(235,235,240,0.85)'; c.lineWidth = r * 0.035; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-r * 0.4, -r * (0.62 + k * 0.07)); c.lineTo(r * 0.4, -r * (0.62 + k * 0.07)); c.stroke(); } c.restore();
  }
  function zmoon(c, r) { c.save(); c.fillStyle = '#f4f0dc'; c.beginPath(); c.arc(r * 0.35, -r * 1.12, r * 0.22, 0, 7); c.fill(); c.fillStyle = '#241a16'; c.beginPath(); c.arc(r * 0.45, -r * 1.17, r * 0.2, 0, 7); c.fill(); c.restore(); }
  function zfeather(c, r) { c.save(); c.strokeStyle = '#2a7a4a'; c.lineWidth = r * 0.05; c.beginPath(); c.moveTo(0, -r * 1.25); c.quadraticCurveTo(-r * 0.1, -r * 1.7, r * 0.05, -r * 2.1); c.stroke(); c.fillStyle = '#1f8a6a'; c.beginPath(); c.ellipse(r * 0.05, -r * 2.05, r * 0.16, r * 0.26, 0.15, 0, 7); c.fill(); c.fillStyle = '#2c4fc4'; c.beginPath(); c.ellipse(r * 0.05, -r * 2.03, r * 0.09, r * 0.16, 0.15, 0, 7); c.fill(); c.fillStyle = '#f2c24b'; c.beginPath(); c.arc(r * 0.05, -r * 2.0, r * 0.05, 0, 7); c.fill(); c.restore(); }
  function zshikha(c, r) { c.save(); c.fillStyle = '#2a1a14'; c.beginPath(); c.ellipse(0, -r * 1.18, r * 0.2, r * 0.3, 0, 0, 7); c.fill(); c.restore(); }
  function zarrow(c, x, y, ang, len, col) { c.save(); c.translate(x, y); c.rotate(ang); c.strokeStyle = col || '#6b4524'; c.lineWidth = 7; c.beginPath(); c.moveTo(-len, 0); c.lineTo(0, 0); c.stroke(); c.fillStyle = '#cfd3d8'; c.beginPath(); c.moveTo(0, -11); c.lineTo(34, 0); c.lineTo(0, 11); c.closePath(); c.fill(); c.fillStyle = '#d4442e'; c.beginPath(); c.moveTo(-len, 0); c.lineTo(-len - 20, -12); c.lineTo(-len + 22, -3); c.closePath(); c.fill(); c.beginPath(); c.moveTo(-len, 0); c.lineTo(-len - 20, 12); c.lineTo(-len + 22, 3); c.closePath(); c.fill(); c.restore(); }
  function zlotus(c, x, y, s, a) { c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = a == null ? 1 : a; for (const k of [-2, -1, 0, 1, 2]) { c.save(); c.rotate(k * 0.42); c.fillStyle = k % 2 ? '#ff9ec0' : '#ffb7d0'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-26, -30, 0, -78); c.quadraticCurveTo(26, -30, 0, 0); c.fill(); c.restore(); } c.fillStyle = '#f2c24b'; c.beginPath(); c.arc(0, -8, 9, 0, 7); c.fill(); c.restore(); }
  function zrays(c, x, y, t, n, col, len) { for (let k = 0; k < n; k++) { c.save(); c.translate(x, y); c.rotate(k * Math.PI * 2 / n + t * 0.12); c.fillStyle = col; c.beginPath(); c.moveTo(0, 0); c.lineTo(-34, -len); c.lineTo(34, -len); c.closePath(); c.fill(); c.restore(); } }
  function zchakra(c, x, y, r, t, glow) { c.save(); c.translate(x, y); const g = c.createRadialGradient(0, 0, r * 0.4, 0, 0, r * 2.2); g.addColorStop(0, `rgba(255,210,90,${0.8 * glow})`); g.addColorStop(1, 'rgba(255,210,90,0)'); c.fillStyle = g; c.fillRect(-r * 2.4, -r * 2.4, r * 4.8, r * 4.8); c.rotate(t * 3); c.fillStyle = '#f2c24b'; c.strokeStyle = '#b8801c'; c.lineWidth = 6; c.beginPath(); for (let k = 0; k < 24; k++) { const a = k * Math.PI / 12, rr = k % 2 ? r * 0.82 : r; c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#7a3b10'; c.beginPath(); c.arc(0, 0, r * 0.5, 0, 7); c.fill(); c.fillStyle = '#f2c24b'; c.beginPath(); c.arc(0, 0, r * 0.3, 0, 7); c.fill(); c.restore(); }
  function zshivling(c, x, y, s, glow) { c.save(); c.translate(x, y); c.scale(s, s); if (glow > 0) { const g = c.createRadialGradient(0, -120, 0, 0, -120, 380); g.addColorStop(0, `rgba(255,220,130,${0.7 * glow})`); g.addColorStop(1, 'rgba(255,220,130,0)'); c.fillStyle = g; c.fillRect(-400, -500, 800, 800); } c.fillStyle = '#5a5560'; c.beginPath(); c.ellipse(0, 0, 230, 55, 0, 0, 7); c.fill(); c.fillStyle = '#6f6a76'; c.beginPath(); c.ellipse(0, -14, 210, 44, 0, 0, 7); c.fill(); c.fillStyle = '#2f2b33'; c.beginPath(); c.moveTo(-95, -20); c.lineTo(-80, -250); c.quadraticCurveTo(0, -320, 80, -250); c.lineTo(95, -20); c.closePath(); c.fill(); c.fillStyle = 'rgba(255,255,255,0.12)'; c.beginPath(); c.moveTo(-60, -30); c.lineTo(-50, -250); c.lineTo(-20, -262); c.lineTo(-30, -30); c.closePath(); c.fill(); c.strokeStyle = '#e8e8ee'; c.lineWidth = 10; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-82, -170 + k * 26); c.lineTo(82, -170 + k * 26); c.stroke(); } c.restore(); }
  function zstars(c, t, n) { for (let i = 0; i < n; i++) { const x = zr(i * 5) * 1080, y = zr(i * 11) * 900; c.fillStyle = `rgba(255,245,210,${0.4 + 0.4 * Math.sin(t * 2 + i)})`; c.beginPath(); c.arc(x, y, 2 + zr(i) * 3, 0, 7); c.fill(); } }
  function ztxt(c, s, x, y, px, col, a) { c.save(); c.globalAlpha = a == null ? 1 : a; c.textAlign = 'center'; c.font = `${px}px ${HFONT}`; c.lineJoin = 'round'; c.lineWidth = px * 0.14; c.strokeStyle = '#1a0a03'; c.strokeText(s, x, y); c.fillStyle = col || '#ffd36a'; c.fillText(s, x, y); c.restore(); }
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
  const IND = { skin: '#c9955f', cloth: '#3a6ab8', cloth2: '#f2c14a', cloth3: 'rgba(255,255,255,0.2)', head: { hair: 'bun', hc: '#1d1411', crown: true, earring: true, smile: 0, tilak: true } };
  function nbg(c, t, a, b) { zsky(c, t, a || '#0d1230', b || '#2f3f7a', 540, 760, 'rgba(150,180,255,0.5)'); zstars(c, t, 40); }
  const FL = (c, t, t0) => { const a = t - t0; if (a > 0 && a < 0.4) { c.fillStyle = `rgba(255,255,255,${0.95 * (1 - a / 0.4)})`; c.fillRect(0, 0, 1080, 1920); } };
  const SHK = (t, t0) => { const a = t - t0; return a > 0 && a < 0.35 ? 14 * Math.sin(a * 110) * (1 - a / 0.35) : 0; };
  function sun(c, x, y, r, a, red) { const g = c.createRadialGradient(x, y, r * 0.2, x, y, r * 2.6); g.addColorStop(0, red ? `rgba(255,120,50,${a * 0.9})` : `rgba(255,220,120,${a})`); g.addColorStop(1, 'rgba(255,120,40,0)'); c.fillStyle = g; c.fillRect(x - r * 3, y - r * 3, r * 6, r * 6); c.fillStyle = red ? '#ff6a2a' : '#ffd36a'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.arc(x - r * 0.3, y - r * 0.3, r * 0.4, 0, 7); c.fill(); }
  const SHV = { skin: '#aac4e6', cloth: '#c9a66a', cloth2: '#e8dcc0', cloth3: 'rgba(0,0,0,0.2)', head: { hair: 'jata', hc: '#1a1418', earring: true, smile: 0.25, brow: 0.03, pre: (c, r) => { c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = r * 0.03; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-r * 0.4, -r * 0.62 + k * r * 0.07); c.lineTo(r * 0.4, -r * 0.62 + k * r * 0.07); c.stroke(); } }, post: (c, r) => { c.fillStyle = '#c1362b'; c.beginPath(); c.ellipse(0, -r * 0.5, r * 0.04, r * 0.1, 0, 0, 7); c.fill(); c.fillStyle = '#f4f0dc'; c.beginPath(); c.arc(-r * 0.35, -r * 1.12, r * 0.2, 0.5, 5.8); c.arc(-r * 0.25, -r * 1.12, r * 0.15, 5.5, 0.7, true); c.fill(); } } };

  function wave(c, t, y, col, amp) { c.fillStyle = col; c.beginPath(); c.moveTo(0, 1920); for (let x = 0; x <= 1080; x += 20) c.lineTo(x, y + amp * Math.sin(x * 0.012 + t * 2)); c.lineTo(1080, 1920); c.fill(); }
  function moon(c, x, y, r, ph) { const g = c.createRadialGradient(x, y, r * 0.5, x, y, r * 2.4); g.addColorStop(0, 'rgba(220,235,255,0.5)'); g.addColorStop(1, 'rgba(220,235,255,0)'); c.fillStyle = g; c.fillRect(x - r * 3, y - r * 3, r * 6, r * 6); c.fillStyle = '#eef3ff'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); if (ph > 0) { c.fillStyle = 'rgba(14,18,48,0.96)'; c.beginPath(); c.arc(x + r * 2 * ph, y, r * 1.02, 0, 7); c.fill(); } }
  function temple(c, x, y, s, col) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.fillRect(-230, -120, 460, 120); c.beginPath(); c.moveTo(-170, -120); c.quadraticCurveTo(-120, -330, 0, -520); c.quadraticCurveTo(120, -330, 170, -120); c.fill(); c.beginPath(); c.moveTo(-70, -120); c.quadraticCurveTo(-50, -250, 0, -330); c.quadraticCurveTo(50, -250, 70, -120); c.fill(); c.fillRect(-4, -620, 8, 110); c.fillStyle = '#ffd36a'; c.beginPath(); c.moveTo(4, -620); c.lineTo(70, -595); c.lineTo(4, -570); c.fill(); c.restore(); }
  function dia(c, x, y, t, s) { c.fillStyle = '#c86a1a'; c.beginPath(); c.ellipse(x, y, 34 * s, 14 * s, 0, 0, Math.PI); c.fill(); const f = 1 + 0.15 * Math.sin(t * 9 + x); c.fillStyle = '#ffd36a'; c.beginPath(); c.ellipse(x, y - 22 * s * f, 10 * s, 24 * s * f, 0, 0, 7); c.fill(); }

  function jat(c, x, y, s, fl, hurt, dir) { c.save(); c.translate(x, y); c.scale(s * (dir || 1), s); const w = Math.sin(fl) * 0.5; c.fillStyle = '#7a5a3a'; for (const sd of [-1, 1]) { if (hurt > 0.5 && sd === 1) continue; c.save(); c.rotate(sd * (0.5 + w)); c.beginPath(); c.moveTo(0, -10); c.quadraticCurveTo(sd * 140, -200, sd * 330, -60); c.quadraticCurveTo(sd * 200, -20, sd * 40, 40); c.fill(); c.fillStyle = '#5a3f26'; for (let k = 0; k < 4; k++) { c.beginPath(); c.ellipse(sd * (150 + k * 50), -60 + k * 16, 40, 12, sd * 0.4, 0, 7); c.fill(); } c.fillStyle = '#7a5a3a'; c.restore(); }
    c.fillStyle = '#8a6540'; c.beginPath(); c.ellipse(0, 30, 70, 110, 0, 0, 7); c.fill(); c.fillStyle = '#e8dcc0'; c.beginPath(); c.arc(0, -90, 44, 0, 7); c.fill(); c.fillStyle = '#e8a83a'; c.beginPath(); c.moveTo(-8, -96); c.lineTo(-62, -70); c.lineTo(-10, -62); c.fill(); c.fillStyle = '#111'; c.beginPath(); c.arc(-14, -100, 7, 0, 7); c.fill(); if (hurt > 0.3) { c.fillStyle = '#c0281c'; c.beginPath(); c.ellipse(20, 20, 18, 34, 0.3, 0, 7); c.fill(); } c.restore(); }
  function ratha(c, x, y, s, a) { c.save(); c.translate(x, y); c.rotate(a); c.scale(s, s); c.fillStyle = '#b8862a'; c.fillRect(-150, -90, 300, 100); c.fillStyle = '#7a1f1f'; c.fillRect(-150, -90, 300, 24); c.beginPath(); c.moveTo(-150, -90); c.lineTo(-110, -170); c.lineTo(110, -170); c.lineTo(150, -90); c.fill(); for (const sx of [-90, 90]) { c.strokeStyle = '#3a2208'; c.lineWidth = 12; c.beginPath(); c.arc(sx, 40, 55, 0, 7); c.stroke(); for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(sx, 40); c.lineTo(sx + 55 * Math.cos(k * 0.8 + a), 40 + 55 * Math.sin(k * 0.8 + a)); c.stroke(); } } c.restore(); }
  function rav(c, x, y, r, a) { c.save(); c.globalAlpha = a; for (let k = -2; k <= 2; k++) { if (!k) continue; zface(c, x + k * r * 0.55, y - r * 0.25 + Math.abs(k) * r * 0.1, r * 0.7, { skin: '#6a3a3a', hair: 'bun', hc: '#111', crown: true, brow: 0.2, wide: 0.5, smile: 0, blink: 0 }); } zface(c, x, y, r, { skin: '#6a3a3a', hair: 'bun', hc: '#111', crown: true, brow: 0.25, wide: 0.6, smile: 0, blink: 0, mouth: 0.1 }); c.restore(); }
  function kal(c, x, y, s, g) { c.save(); c.translate(x, y); c.scale(s, s); if (g) { const gr = c.createRadialGradient(0, 0, 20, 0, 0, 260); gr.addColorStop(0, 'rgba(255,230,140,0.8)'); gr.addColorStop(1, 'rgba(255,200,80,0)'); c.fillStyle = gr; c.fillRect(-300, -300, 600, 600); }
    c.fillStyle = '#e8b53a'; c.strokeStyle = '#8a5a10'; c.lineWidth = 8; c.beginPath(); c.moveTo(-50, -110); c.lineTo(50, -110); c.quadraticCurveTo(150, -60, 120, 60); c.quadraticCurveTo(100, 140, 0, 150); c.quadraticCurveTo(-100, 140, -120, 60); c.quadraticCurveTo(-150, -60, -50, -110); c.fill(); c.stroke(); c.fillRect(-60, -140, 120, 36); c.strokeRect(-60, -140, 120, 36);
    c.fillStyle = '#d83a2a'; c.beginPath(); c.arc(0, -100, 18, 0, 7); c.fill(); c.restore(); }
  function asur(c, x, y, r, a) { c.fillStyle = '#b8352b'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.fillStyle = '#f4e7c3'; for (const sd of [-1, 1]) { c.beginPath(); c.moveTo(x + sd * r * 0.55, y - r * 0.7); c.lineTo(x + sd * r * 0.8, y - r * 1.4); c.lineTo(x + sd * r * 0.2, y - r * 0.9); c.fill(); }
    c.fillStyle = '#fff'; for (const sd of [-1, 1]) { c.beginPath(); c.ellipse(x + sd * r * 0.35, y - r * 0.1, r * 0.2, r * 0.14, 0, 0, 7); c.fill(); c.fillStyle = '#200'; c.beginPath(); c.arc(x + sd * r * 0.35, y - r * 0.1, r * 0.07, 0, 7); c.fill(); c.fillStyle = '#fff'; }
    c.strokeStyle = '#200'; c.lineWidth = r * 0.07; c.beginPath(); c.moveTo(x - r * 0.6, y - r * 0.4); c.lineTo(x - r * 0.15, y - r * 0.28); c.moveTo(x + r * 0.6, y - r * 0.4); c.lineTo(x + r * 0.15, y - r * 0.28); c.stroke(); c.beginPath(); c.arc(x, y + r * 0.45, r * 0.3, 3.4, 6.0); c.stroke(); }

  const PAL = { night: ['#0d1230', '#2f3f7a'], dusk: ['#1a2050', '#e0904a'], dawn: ['#3a2a5a', '#f0a860'], gold: ['#4a2a58', '#f0a860'], ember: ['#2a0e0e', '#c8452a'], snow: ['#1a2a5a', '#9ab4e6'], green: ['#10301e', '#5aa86a'], sea: ['#0d2a4a', '#4a9ac0'], day: ['#3a78c8', '#cfe8ff'], purple: ['#1a1038', '#6a3a8a'] };
  const SADHU = { skin: '#cdb8a6', cloth: '#d9892b', cloth2: '#c9741c', cloth3: 'rgba(0,0,0,0.15)', head: { hair: 'jata', hc: '#2a1a14', tilak: true, smile: 0.35, post: (c, r) => zbeard(c, r, '#d8d2c8') } };
  const NAGA = { skin: '#bdb0a4', cloth: '#a89684', cloth2: '#8a7a6a', cloth3: 'rgba(0,0,0,0.15)', head: { hair: 'jata', hc: '#2a1a14', tilak: true, smile: 0.2, brow: 0.08, post: (c, r) => zbeard(c, r, '#2a1a14') } };
  const DEVI = { skin: '#e0a574', cloth: '#c63b6a', cloth2: '#f2c14a', cloth3: 'rgba(255,255,255,0.2)', head: { hair: 'bun', hc: '#1d1411', earring: true, smile: 0.5, crown: true } };
  const URM = { skin: '#dba070', cloth: '#3a8a7a', cloth2: '#f2c14a', cloth3: 'rgba(255,255,255,0.2)', head: { hair: 'bun', hc: '#1d1411', earring: true, smile: 0.4 } };
  const KAR = { skin: '#d6a074', cloth: '#c9a028', cloth2: '#f1e3c0', cloth3: 'rgba(0,0,0,0.15)', head: { hair: 'bun', hc: '#14101a', crown: true, tilak: true, earring: true, smile: 0.2 } };
  const KUM = { skin: '#7a5a4a', cloth: '#6a2a2a', cloth2: '#4a3a3a', cloth3: 'rgba(0,0,0,0.2)', head: { hair: 'bun', hc: '#111', crown: true, brow: 0.2, wide: 0.2, smile: 0 } };
  const TRI = { skin: '#b98a66', cloth: '#6a5a8a', cloth2: '#4a3a6a', cloth3: 'rgba(255,255,255,0.15)', head: { hair: 'bun', hc: '#c9c9cf', old: true, smile: 0.3 } };
  const VIS = { skin: '#5b8fd1', cloth: '#f4cd4c', cloth2: '#f0e6c8', cloth3: 'rgba(200,60,60,0.4)', head: { hair: 'jata', hc: '#14101a', crown: true, tilak: true, earring: true, smile: 0.4 } };
  const BRH = { skin: '#d98a5a', cloth: '#f4f0e6', cloth2: '#f4f0e6', cloth3: 'rgba(0,0,0,0.1)', head: { hair: 'bun', hc: '#e6e6ea', old: true, tilak: true, smile: 0.3, post: (c, r) => zbeard(c, r, '#ecebef') } };
  const VIB = { skin: '#c98e62', cloth: '#2f6f8f', cloth2: '#f1e3c0', cloth3: 'rgba(255,255,255,0.18)', head: { hair: 'bun', hc: '#14101a', crown: true, tilak: true, earring: true, smile: 0.3 } };
  const BHM = { skin: '#6f6a58', cloth: '#4a1f3a', cloth2: '#8a5a2a', cloth3: 'rgba(0,0,0,0.2)', head: { hair: 'jata', hc: '#0d0a08', brow: 0.25, wide: 0.1, smile: 0, post: (c, r) => zbeard(c, r, '#1c1410') } };
  const RAVF = { skin: '#9a6a4a', cloth: '#7a1f1f', cloth2: '#e8b84a', cloth3: 'rgba(0,0,0,0.2)', head: { hair: 'bun', hc: '#111', crown: true, tilak: true, earring: true, brow: 0.25, smile: 0 } };
  const CH = { vib: VIB, bhm: BHM, rav10: RAVF, ind: IND, ram: RAM, lak: LAK, han: HAN, shv: SHV, vai: VAI, sadhu: SADHU, naga: NAGA, devi: DEVI, urm: URM, kar: KAR, kum: KUM, tri: TRI, vis: VIS, brh: BRH };
  function chFace(c, t, who, x, y, r, emo) { const p = CH[who]; zface(c, x, y, r, Object.assign({}, p.head, { skin: p.skin }, emo || {}, { blink: (emo && emo.blink != null) ? emo.blink : zblink(t, 0.5) })); }
  function bgK(c, t, k, sy) { const p = PAL[k] || PAL.night; zsky(c, t, p[0], p[1], 540, sy == null ? -700 : sy, 'rgba(255,220,150,0.5)'); if (k === 'night' || k === 'purple' || k === 'snow') zstars(c, t, 40); }
  function treesK(c, t, y, col, n, sc) { c.fillStyle = col; for (let i = 0; i < n; i++) { const x = i * (1180 / n) - 50 + Math.sin(t * 0.8 + i) * 4, h = (160 + (i * 53 % 90)) * sc; c.beginPath(); c.moveTo(x - 60 * sc, y); c.lineTo(x, y - h); c.lineTo(x + 60 * sc, y); c.closePath(); c.fill(); } }
  function land(c, t, k, col) {
    if (k === 'temple') { wave(c, t, 1380, '#14305a', 14); temple(c, 540, 1420, 1.5, col || '#2a1f3a'); wave(c, t + 1, 1500, '#0e2248', 18); }
    else if (k === 'mount') { zmount(c, 260, 1500, 2.0, col || '#3a3a5a', 0); zmount(c, 800, 1500, 2.4, '#2a2a48', 0); c.fillStyle = '#1a1a2c'; c.fillRect(0, 1480, 1080, 440); }
    else if (k === 'ghat') { for (let j = 0; j < 6; j++) { c.fillStyle = j % 2 ? '#5a4636' : '#3f3128'; c.fillRect(0, 1250 + j * 40, 1080, 40); } wave(c, t, 1520, '#1a4a7a', 12); wave(c, t + 1, 1600, '#123a66', 14); for (let i = 0; i < 7; i++) dia(c, ((i * 190 + t * 25) % 1180) - 50, 1580 + 30 * Math.sin(t * 2 + i), t, 0.9); }
    else if (k === 'river') { wave(c, t, 1400, '#1f5a8a', 14); wave(c, t + 1, 1500, '#16466e', 16); wave(c, t + 2, 1600, '#0f3354', 18); }
    else if (k === 'forest') { treesK(c, t, 1450, '#12301c', 9, 1.3); treesK(c, t + 1, 1560, '#0a2014', 7, 1.7); }
    else if (k === 'snow') { zmount(c, 300, 1450, 2.6, '#5a6a9a', 0); zmount(c, 780, 1450, 2.2, '#4a5a8a', 0); c.fillStyle = '#c9d6f0'; c.fillRect(0, 1450, 1080, 470); for (let i = 0; i < 40; i++) { c.fillStyle = 'rgba(255,255,255,0.8)'; c.beginPath(); c.arc((i * 97 + Math.sin(t + i) * 20) % 1080, (i * 131 + t * 90) % 1500, 4, 0, 7); c.fill(); } }
    else if (k === 'ground') { zground(c, 1500, '#4a3a2a', '#1a1208', 1700); }
  }
  function bull(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#e8e0d0'; c.beginPath(); c.ellipse(0, 0, 200, 110, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(-120, -90, 90, 80, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(180, -40, 90, 70, 0.4, 0, 7); c.fill(); c.fillStyle = '#cfc6b4'; c.beginPath(); c.ellipse(200, -10, 50, 40, 0, 0, 7); c.fill(); c.strokeStyle = '#f0e0b0'; c.lineWidth = 14; c.beginPath(); c.moveTo(200, -90); c.quadraticCurveTo(250, -180, 210, -230); c.moveTo(150, -100); c.quadraticCurveTo(120, -190, 160, -230); c.stroke(); c.fillStyle = '#e8e0d0'; for (const lx of [-120, -50, 90, 150]) c.fillRect(lx - 18, 60, 36, 110); c.fillStyle = '#222'; c.beginPath(); c.arc(215, -50, 8, 0, 7); c.fill(); c.restore(); }
  function trish(c, x, y, s, g) { c.save(); c.translate(x, y); c.scale(s, s); if (g) { const gr = c.createRadialGradient(0, -200, 10, 0, -200, 360); gr.addColorStop(0, 'rgba(255,230,150,0.7)'); gr.addColorStop(1, 'rgba(255,200,80,0)'); c.fillStyle = gr; c.fillRect(-400, -560, 800, 800); } c.strokeStyle = '#e8c46a'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 200); c.lineTo(0, -300); c.moveTo(-90, -240); c.quadraticCurveTo(-90, -360, 0, -360); c.quadraticCurveTo(90, -360, 90, -240); c.moveTo(0, -360); c.lineTo(0, -460); c.moveTo(-90, -240); c.lineTo(-90, -430); c.moveTo(90, -240); c.lineTo(90, -430); c.stroke(); c.fillStyle = '#e8c46a'; for (const sx of [-90, 0, 90]) { c.beginPath(); c.moveTo(sx - 18, -430 - (sx === 0 ? 30 : 0)); c.lineTo(sx, -490 - (sx === 0 ? 40 : 0)); c.lineTo(sx + 18, -430 - (sx === 0 ? 30 : 0)); c.fill(); } c.restore(); }
  function KS(c, t, i, s) {
    const u = U(i, t), z = 1 + (s.zoom == null ? 0.06 : s.zoom) * u, sh = s.shake ? SHK(t, T[i] + s.shake) : 0;
    c.save(); c.translate(sh, 0); c.translate(540, 1000); c.scale(z, z); c.translate(-540, -1000);
    bgK(c, t, s.sky || 'night', s.sun ? s.sun[1] : null);
    if (s.moon) moon(c, s.moon[0], s.moon[1], s.moon[2], s.moon[3] || 0);
    if (s.sun) sun(c, s.sun[0], s.sun[1], s.sun[2], 0.9, s.red);
    if (s.rays) zrays(c, 540, s.rays, t, 14, 'rgba(255,230,160,0.16)', 1600);
    const k = s.k;
    if (s.land) land(c, t, s.land, s.lcol);
    if (k === 'face') chFace(c, t, s.who, 540, s.y || 1350, s.r || 220, s.emo);
    else if (k === 'two') { chFace(c, t, s.who[0], 330, s.y || 1330, s.r || 190, Object.assign({}, s.emo && s.emo[0])); chFace(c, t, s.who[1], 750, s.y || 1330, s.r || 190, Object.assign({}, s.emo && s.emo[1])); }
    else if (k === 'crowd') { const n = s.who.length, shown = Math.max(1, Math.min(n, Math.ceil(zs(0.05, 0.8, u) * n))); for (let j = 0; j < shown; j++) { const x = 540 + (j - (n - 1) / 2) * (s.gap || 300); chFace(c, t, s.who[j], x, (s.y || 1330) + (j % 2) * 40, s.r || 130, { blink: zblink(t, j * 0.3) }); } }
    else if (k === 'body') { const p = CH[s.who]; zbody(c, Object.assign({}, p, { x: 540, y: 1790, s: s.s || 1.3, dir: s.dir || 1, a1: s.a1, a2: s.a2, b1: s.b1, b2: s.b2, walk: s.walk ? t * 4 : 0 })); }
    else if (k === 'bird') jat(c, s.bx || 540, (s.by || 950) + 14 * Math.sin(t * 3), s.bs || 1.0, s.still ? 0 : t * 6, s.hurt != null ? s.hurt : (s.hurtAt != null ? (u > s.hurtAt ? 1 : 0) : 0), s.dir || 1);
    else if (k === 'kalash') kal(c, 540, 1000, 1.3, true);
    else if (k === 'bull') bull(c, 540 + (s.bx || 0), 1380 + (s.sink ? 300 * zs(0.2, 0.9, u) : 0), s.bs || 1.5);
    else if (k === 'rav') rav(c, 540, 1250, 240, 1);
    else if (k === 'sleep') { zbed(c, 540, 1500, 1.5); chFace(c, t, 'urm', 370, 1300, 150, { blink: 1, smile: 0.3 }); zzz(c, t, 600, 1250, '#cfd8ff'); }
    else if (k === 'lingam') { zrays(c, 540, 1100, t, 14, 'rgba(255,225,150,0.14)', 1500); zshivling(c, 540, 1560, 1.5, 0.8 + 0.2 * Math.sin(t * 2)); }
    else if (k === 'trish') trish(c, 540, 1500, 1.5, true);
    else if (k === 'om') { ztxt(c, 'ॐ', 540, 1050, 520, '#ffd36a', 0.95); for (let q = 0; q < 3; q++) { c.strokeStyle = `rgba(255,220,140,${0.5 - q * 0.15})`; c.lineWidth = 6; c.beginPath(); c.arc(540, 880, 260 + ((t * 70 + q * 90) % 270), 0, 7); c.stroke(); } }
    else if (k === 'cards') { const n = s.items.length; for (let j = 0; j < n; j++) { const a = zs(0.08 + j * 0.25, 0.2 + j * 0.25, u), y = (s.cy || 700) + j * 250; if (a <= 0) continue; c.save(); c.globalAlpha = a; c.translate((1 - a) * 200, 0); c.fillStyle = 'rgba(30,14,40,0.82)'; c.strokeStyle = '#ffd36a'; c.lineWidth = 6; c.beginPath(); c.roundRect(100, y - 100, 880, 200, 36); c.fill(); c.stroke(); ztxt(c, s.items[j][0], 540, y + 10, s.isz || 100, '#ffd36a', 1); ztxt(c, s.items[j][1], 540, y + 78, 56, '#fff1c8', 1); c.restore(); } }
    else if (k === 'big') { for (let q = 0; q < 3; q++) { c.strokeStyle = `rgba(255,220,140,${0.4 - q * 0.12})`; c.lineWidth = 6; c.beginPath(); c.arc(540, 960, 200 + ((t * 80 + q * 100) % 300), 0, 7); c.stroke(); } }
    if (s.zzz) zzz(c, t, 640, 1150, '#cfd8ff');
    if (s.fl) FL(c, t, T[i] + s.fl);
    if (s.title) ztxt(c, s.title, 540, s.ty || 330, s.ts || 120, s.tc || '#fff1c8', zs(0.05, 0.25, u));
    if (s.big) ztxt(c, s.big, 540, s.by || 960, s.bs2 || 240, s.bc || '#ffd36a', zs(0.15, 0.4, u));
    if (s.sub) ztxt(c, s.sub, 540, s.sy || 1180, s.ss || 90, '#ffe9a0', zs(0.4, 0.6, u));
    if (s.petals) zpetals(c, t, T[i], 26);
    zmotes(c, t, 22, s.mc || '#ffe0a8');
    c.restore();
  }
  function sA(c, t) { KS(c, t, 0, {"k": "two", "who": ["rav10", "vib"], "sky": "ember", "emo": [{"brow": 0.3}, {"tear": 1, "smile": 0}]}); }
  function sB(c, t) { KS(c, t, 1, {"k": "two", "who": ["vib", "rav10"], "sky": "dusk", "emo": [{"smile": 0.1}, {"brow": 0.15}], "title": "विभीषण की सलाह", "ts": 100}); }
  function sC(c, t) { KS(c, t, 2, {"k": "rav", "sky": "ember", "shake": 0.4, "fl": 0.4, "title": "भरी सभा में अपमान", "ts": 95}); }
  function sD(c, t) { KS(c, t, 3, {"k": "body", "who": "vib", "walk": 1, "sky": "dawn", "land": "temple", "title": "लंका छोड़ी"}); }
  function sE(c, t) { KS(c, t, 4, {"k": "crowd", "who": ["han", "lak", "han"], "gap": 320, "r": 130, "sky": "purple", "land": "forest", "title": "शत्रु की चाल?"}); }
  function sF(c, t) { KS(c, t, 5, {"k": "two", "who": ["ram", "vib"], "sky": "gold", "rays": 900, "emo": [{"smile": 0.7}, {"smile": 0.5}], "title": "शरणागत की रक्षा", "ts": 100}); }
  function sG(c, t) { KS(c, t, 6, {"k": "big", "sky": "gold", "rays": 900, "title": "लंका के राजा विभीषण", "ty": 380, "sub": "जय श्रीराम", "sy": 620, "petals": 1, "zoom": 0.04, "sun": [540, 1000, 90], "ts": 88, "land": "river"}); }
  const SCENES = SCN([sA, sB, sC, sD, sE, sF, sG]);

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
  const HOT = new Set(["रावण", "विभीषण", "श्रीराम", "सीता", "शरण", "लंका", "राम"]);
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
    c.fillText("रावण का सगा भाई,", 540, 230); c.fillText("राम की शरण में क्यों?", 540, 360); c.shadowBlur = 0; c.fillStyle = '#e9c9a0'; c.font = `42px ${HFONT}`; c.fillText("Ramayan ke Ankahe Patra #7", 540, 425); c.restore();
  }
  const hctx = document.getElementById('cv').getContext('2d');
  window.seek = (t) => { t = zc(t, 0, HD); hctx.setTransform(1, 0, 0, 1, 0, 0); hctx.globalAlpha = 1; hctx.globalCompositeOperation = 'source-over'; hctx.filter = 'none'; zframe(hctx, t); hhook(hctx, t); hcap(hctx, t);
    hctx.save(); hctx.font = `30px ${HFONT}`; hctx.fillStyle = 'rgba(255,240,210,0.55)'; hctx.textAlign = 'right'; hctx.fillText('HINDUTVA SANATAN DHARM KATHA', 1032, 1824); hctx.restore(); };
  window.DURATION = HD;
  (async () => { try { await document.fonts.load(`66px ${HFONT}`, 'कर्ण'); await document.fonts.ready; } catch (e) {} window.seek(3); window.READY = true; })();
