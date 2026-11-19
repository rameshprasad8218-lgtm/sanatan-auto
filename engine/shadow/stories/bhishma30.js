  // ===== shabri30: 2D cut-out style, original characters (portrait 1080x1920 drawn directly) =====
  const HV = { W: 1080, H: 1920 };
  const HT = JSON.parse(window.HT_JSON);
  const HD = 31.85;
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
  const HOT = new Set(["भीष्म", "बाणों", "इच्छा-मृत्यु", "वरदान", "उत्तरायण", "दर्द", "अट्ठावन", "कृष्ण", "धर्म"]);
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
    c.fillText("बाणों की शैया पर", 540, 230); c.fillText("भीष्म गए क्यों नहीं?", 540, 360); c.shadowBlur = 0; c.fillStyle = '#e9c9a0'; c.font = `42px ${HFONT}`; c.fillText("महाभारत की मान्यता के अनुसार", 540, 425); c.restore();
  }
  const hctx = document.getElementById('cv').getContext('2d');
  window.seek = (t) => { t = zc(t, 0, HD); hctx.setTransform(1, 0, 0, 1, 0, 0); hctx.globalAlpha = 1; hctx.globalCompositeOperation = 'source-over'; hctx.filter = 'none'; zframe(hctx, t); hhook(hctx, t); hcap(hctx, t);
    hctx.save(); hctx.font = `30px ${HFONT}`; hctx.fillStyle = 'rgba(255,240,210,0.55)'; hctx.textAlign = 'right'; hctx.fillText('SANATAN DHARM', 1032, 1824); hctx.restore(); };
  window.DURATION = HD;
  (async () => { try { await document.fonts.load(`66px ${HFONT}`, 'कर्ण'); await document.fonts.ready; } catch (e) {} window.seek(3); window.READY = true; })();
