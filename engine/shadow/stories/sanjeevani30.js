  // ===== shabri30: 2D cut-out style, original characters (portrait 1080x1920 drawn directly) =====
  const HV = { W: 1080, H: 1920 };
  const HT = JSON.parse(window.HT_JSON);
  const HD = 28.61;
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
  function nBg(c, t, a, b) { zsky(c, t, a || '#0d1230', b || '#2f3f7a', 540, 760, 'rgba(150,180,255,0.5)'); zstars(c, t, 40); }
  function sA(c, t) { const u = U(0, t), z = 1 + 0.07 * u; nBg(c, t, '#1a1030', '#6a3a4a'); c.save(); c.translate(540, 1100); c.scale(z, z); c.translate(-540, -1100);
    c.fillStyle = '#e8742a'; c.beginPath(); c.ellipse(540, 1860, 640, 330, 0, 0, 7); c.fill();
    zface(c, 540, 1270, 330, Object.assign({}, HAN.head, { skin: HAN.skin, wide: 0.8, mouth: 0.4 * zs(0.3, 1, t), blink: 0, brow: 0.05, smile: 0.5 })); c.restore();
    zmount(c, 880, 700, 0.8, '#5a4a6a', 0.8); zmotes(c, t, 26, '#ffd9a0'); }
  function sB(c, t) { const u = U(1, t); nBg(c, t, '#14102a', '#3a2a4a'); zground(c, 1250, '#4a3a3a', '#1a1010', 1420);
    c.fillStyle = '#f2e6c8'; c.fillRect(120, 1450, 560, 40); c.fillStyle = '#c1362b'; c.fillRect(120, 1420, 560, 30);
    zface(c, 230, 1330, 150, Object.assign({}, LAK.head, { skin: LAK.skin, blink: 1, smile: 0.0, brow: 0.1 }));
    zbody(c, Object.assign({}, RAM, { x: 820, y: 1700, s: 1.35, dir: -1, a1: -0.6, a2: -0.4, b1: 0.2, b2: 0.2, head: Object.assign({}, RAM.head, { blink: zblink(t, 0.5), tear: 0.4 + 0.5 * Math.sin(t * 2) * 0.5, smile: 0.0, brow: 0.1 }) }));
    ztxt(c, 'लक्ष्मण मूर्छित', 540, 400, 100, '#ffd0d0', zs(0.1, 0.3, u)); zmotes(c, t, 20, '#bcd2ff'); }
  function sC(c, t) { const u = U(2, t); nBg(c, t, '#1a1030', '#c06a4a'); zsun(c, 820, 700, 70, zs(0.4, 0.8, u));
    zbody(c, Object.assign({}, VAI, { x: 300, y: 1640, s: 1.3, dir: 1, a1: -2.4, a2: -2.6, b1: 0.1, b2: 0.2, head: Object.assign({}, VAI.head, { blink: zblink(t, 0.3), look: 0.8 }) }));
    ztxt(c, 'सूर्योदय से पहले', 540, 380, 90, '#ffe9b0', zs(0.1, 0.3, u)); ztxt(c, 'संजीवनी', 540, 500, 130, '#9cffb0', zs(0.4, 0.6, u)); zmotes(c, t, 22, '#ffd9a0'); }
  function sD(c, t) { const u = U(3, t); nBg(c, t); c.fillStyle = '#3a3a5a'; c.beginPath(); c.moveTo(0, 1250); for (let x = 0; x <= 1080; x += 90) c.lineTo(x, 900 - 220 * Math.abs(Math.sin(x * 0.006 + 0.5))); c.lineTo(1080, 1250); c.fill();
    zmount(c, 330, 1300, 1.0, '#4a4a6a', 1); zmount(c, 790, 1300, 1.1, '#454a68', 1); zground(c, 1250, '#3a3a5a', '#141a2a', 1420);
    zbody(c, Object.assign({}, HAN, { x: 540, y: 1700, s: 1.3, dir: 1, a1: 0.2, a2: 0.3, hx: 8 * Math.sin(t * 3), head: Object.assign({}, HAN.head, { wide: 1, look: Math.sin(t * 3), blink: 0, smile: 0.1, brow: 0.12 }) }));
    ztxt(c, '?', 760, 700, 220, '#ffd36a', 0.5 + 0.5 * Math.sin(t * 4)); ztxt(c, 'कौन सी जड़ी?', 540, 400, 90, '#fff1c8', zs(0.2, 0.4, u)); }
  function sE(c, t) { const u = U(4, t), lift = zs(0.25, 0.8, u); nBg(c, t, '#1a1030', '#6a3a4a'); zground(c, 1250, '#3a3a5a', '#141a2a', 1420);
    c.save(); c.translate(0, -lift * 260 + 14 * Math.sin(t * 18) * (1 - lift)); zmount(c, 540, 1000, 1.9, '#5a4a6a', 1); c.restore();
    zbody(c, Object.assign({}, HAN, { x: 540, y: 1720, s: 1.4, dir: 1, a1: -2.9, a2: -3.0, b1: -2.9, b2: -3.0, head: Object.assign({}, HAN.head, { mouth: 0.5, blink: 0, smile: 0.5, brow: 0.1 }) }));
    ztxt(c, 'जय श्री राम', 540, 330, 120, '#ffd36a', zs(0.1, 0.3, u)); if (u > 0.3 && u < 0.45) { c.fillStyle = `rgba(255,240,200,${0.7 * (1 - zs(0.3, 0.45, u))})`; c.fillRect(0, 0, 1080, 1920); } zmotes(c, t, 26, '#ffd9a0'); }
  function sF(c, t) { const u = U(5, t); nBg(c, t, '#1a1030', '#c06a4a'); const sx = zl(100, 980, u); zsun(c, 880, 800, 80, zs(0.5, 1, u));
    for (let k = 0; k < 10; k++) { c.strokeStyle = 'rgba(255,255,255,0.25)'; c.lineWidth = 4; const y = 500 + zr(k) * 900, x = (zr(k + 5) * 1080 - t * 1400) % 1300 + 1300; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 200, y); c.stroke(); }
    c.save(); c.translate(540, 1000 + 30 * Math.sin(t * 5)); c.rotate(0.12); c.translate(-540, -1000); zmount(c, 540, 820, 1.2, '#5a4a6a', 1);
    zbody(c, Object.assign({}, HAN, { x: 540, y: 1280, s: 1.0, dir: 1, a1: -2.9, a2: -3.0, b1: -2.9, b2: -3.0, head: Object.assign({}, HAN.head, { smile: 0.8, blink: 0 }) })); c.restore(); zmotes(c, t, 20, '#ffd9a0'); }
  function sG(c, t) { const u = U(6, t); zsky(c, t, '#3a2a58', '#f0a860', 540, 900, 'rgba(255,215,140,0.8)'); zrays(c, 540, 900, t, 16, 'rgba(255,235,170,0.15)', 1800); zground(c, 1250, '#7a5a3a', '#3a2a18', 1420);
    c.fillStyle = '#f2e6c8'; c.fillRect(160, 1500, 520, 30); zface(c, 250, 1400, 140, Object.assign({}, LAK.head, { skin: LAK.skin, blink: 1 - zs(0.1, 0.4, u), smile: 0.9 }));
    zbody(c, Object.assign({}, RAM, { x: 790, y: 1700, s: 1.3, dir: -1, a1: -0.4, a2: -0.3, head: Object.assign({}, RAM.head, { smile: 0.9, tear: 0.5, blink: zblink(t, 0.5) }) }));
    zbody(c, Object.assign({}, HAN, { x: 540, y: 1700, s: 1.0, dir: -1, a1: -1.4, a2: -1.5, b1: -1.4, b2: -1.5, head: Object.assign({}, HAN.head, { smile: 1, blink: zblink(t, 0.2) }) })); zpetals(c, t, T[6], 30); zmotes(c, t, 26, '#ffe6a8'); }
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
  const HOT = new Set(["हनुमान", "पर्वत", "संजीवनी", "लक्ष्मण", "राम", "भक्ति", "जड़ी"]);
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
    c.fillText("हनुमान जी पूरा पर्वत", 540, 230); c.fillText("ही क्यों उठा लाए?", 540, 360); c.shadowBlur = 0; c.fillStyle = '#e9c9a0'; c.font = `42px ${HFONT}`; c.fillText("रामायण की मान्यता के अनुसार", 540, 425); c.restore();
  }
  const hctx = document.getElementById('cv').getContext('2d');
  window.seek = (t) => { t = zc(t, 0, HD); hctx.setTransform(1, 0, 0, 1, 0, 0); hctx.globalAlpha = 1; hctx.globalCompositeOperation = 'source-over'; hctx.filter = 'none'; zframe(hctx, t); hhook(hctx, t); hcap(hctx, t);
    hctx.save(); hctx.font = `30px ${HFONT}`; hctx.fillStyle = 'rgba(255,240,210,0.55)'; hctx.textAlign = 'right'; hctx.fillText('SANATAN DHARM', 1032, 1824); hctx.restore(); };
  window.DURATION = HD;
  (async () => { try { await document.fonts.load(`66px ${HFONT}`, 'कर्ण'); await document.fonts.ready; } catch (e) {} window.seek(3); window.READY = true; })();
