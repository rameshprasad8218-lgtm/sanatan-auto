  // ===== puppets2: generic lace-cut profile figure (Ganesh, Tulsi, Krishna, Shiva, Vishnu, Brahmin, asur ...) + props. Local coords: feet (0,0), up = -y, facing +x =====
  // fig o: x y s dir t sex('m'|'f') hat('crown'|'feather'|'jata'|'ganesh'|'shikha'|'bun'|'asur'|'none') beard item('staff'|'flute'|'trident'|'bow'|'chakra'|'pot'|'tulsi'|'diya'|'none')
  //        a1 a2 (near arm, forward = negative) b1 b2 (far arm) head bow(0..1 bend forward) step(walk phase) glow(gel colour or null) noRods
  function fig(p, g, o, rods) {
    const d = o.dir == null ? 1 : o.dir, f = o.sex === 'f', hat = o.hat || 'none', st = o.step, tt = o.t || 0;
    const shY = f ? -318 : -352, hy = f ? -390 : -410, hipY = -150;
    both([p, g], (c) => { c.save(); c.translate(o.x, o.y); c.scale(o.s * d, o.s); });
    p.fillStyle = INK; p.strokeStyle = INK; p.lineCap = 'round'; p.lineJoin = 'round';
    const farArm = () => armDraw(-18, shY + 4, o.b1 == null ? 0.2 : o.b1, o.b2 == null ? -0.1 : o.b2, false);
    const armDraw = (sx, sy, a1, a2, near) => {
      both([p, g], (c) => { c.save(); c.translate(sx, sy); c.rotate(a1); });
      p.beginPath(); p.roundRect(-11, -5, 22, 94, 11); p.fill(); cut(p, () => { p.lineWidth = 2.4; p.beginPath(); p.arc(0, 26, 11, 0, TAU); p.stroke(); });
      both([p, g], (c) => { c.save(); c.translate(0, 88); c.rotate(a2); });
      p.beginPath(); p.roundRect(-10, -5, 20, 82, 10); p.fill(); p.beginPath(); p.arc(0, 88, 13, 0, TAU); p.fill();
      if (near) item(88);
      if (rods && !o.noRods) rods.push([...wpt(p, 0, 92), 2.6]);
      pin(p, 0, 0, 5);
      both([p, g], (c) => c.restore());
      pin(p, 0, 0, 6);
      both([p, g], (c) => c.restore());
    };
    const item = (hy0) => {
      const it = o.item || 'none'; p.save(); p.translate(0, hy0);
      if (it === 'staff') { p.fillRect(-4, -230, 8, 330); p.beginPath(); p.arc(0, -236, 13, 0, TAU); p.fill(); cut(p, () => dot(p, 0, -236, 5)); }
      else if (it === 'trident') { p.fillRect(-4, -270, 8, 380); p.lineWidth = 7; p.beginPath(); p.moveTo(-30, -300); p.quadraticCurveTo(-30, -262, 0, -262); p.quadraticCurveTo(30, -262, 30, -300); p.stroke(); p.beginPath(); p.moveTo(0, -262); p.lineTo(0, -330); p.stroke(); for (const x of [-30, 0, 30]) { p.beginPath(); p.moveTo(x - 8, -300); p.lineTo(x, x === 0 ? -352 : -334); p.lineTo(x + 8, -300); p.fill(); } cut(p, () => { dot(p, 0, -250, 4); p.lineWidth = 2; p.beginPath(); p.moveTo(-3, -210); p.lineTo(-3, -150); p.stroke(); }); }
      else if (it === 'flute') { p.save(); p.rotate(-1.2); p.fillRect(-58, -4, 150, 8); cut(p, () => { for (let k = 0; k < 5; k++) dot(p, -34 + k * 15, 0, 1.8); }); p.restore(); }
      else if (it === 'bow') { p.lineWidth = 6; p.beginPath(); p.arc(20, -10, 120, -1.1, 1.1); p.stroke(); p.lineWidth = 1.6; p.beginPath(); p.moveTo(20 + Math.cos(-1.1) * 120, -10 + Math.sin(-1.1) * 120); p.lineTo(20 + Math.cos(1.1) * 120, -10 + Math.sin(1.1) * 120); p.stroke(); }
      else if (it === 'chakra') { p.save(); p.translate(0, -70); p.rotate(tt * 6); p.beginPath(); p.arc(0, 0, 40, 0, TAU); p.arc(0, 0, 28, 0, TAU, true); p.fill(); for (let k = 0; k < 8; k++) { p.save(); p.rotate(k * TAU / 8); p.fillRect(-2, 26, 4, 14); tear(p, 0, 40, 18, 8, Math.PI / 2); p.restore(); } cut(p, () => { for (let k = 0; k < 8; k++) dot(p, Math.cos(k * TAU / 8) * 34, Math.sin(k * TAU / 8) * 34, 2.4); }); p.restore(); }
      else if (it === 'pot') { p.beginPath(); p.ellipse(0, -30, 30, 34, 0, 0, TAU); p.fill(); p.fillRect(-12, -78, 24, 24); cut(p, () => { for (let k = 0; k < 6; k++) dot(p, -18 + k * 7, -30, 2.2); }); }
      else if (it === 'tulsi') { p.lineWidth = 4; p.beginPath(); p.moveTo(0, 0); p.quadraticCurveTo(-8, -50, 6, -96); p.stroke(); for (let k = 0; k < 6; k++) tear(p, 0 + Math.sin(k) * 2, -14 - k * 14, 26, 13, k % 2 ? -0.5 : -2.6); }
      else if (it === 'diya') { p.beginPath(); p.moveTo(-26, -6); p.quadraticCurveTo(0, 22, 26, -6); p.closePath(); p.fill(); p.beginPath(); p.arc(0, -22, 13, 0, TAU); p.fill(); cut(p, () => tear(p, 0, -14, 30, 13, -Math.PI / 2)); g.save(); g.translate(0, 0); g.fillStyle = 'rgb(255,190,70)'; const gg = g.createRadialGradient(0, -26, 0, 0, -26, 130); gg.addColorStop(0, 'rgba(255,200,90,0.55)'); gg.addColorStop(1, 'rgba(255,200,90,0)'); g.fillStyle = gg; g.fillRect(-200, -220, 400, 400); g.restore(); }
      p.restore();
    };
    // far arm (behind the body)
    farArm();
    // legs / skirt
    if (f) {
      p.beginPath(); p.moveTo(-30, shY - 4); p.lineTo(30, shY - 4); p.quadraticCurveTo(54, -180, 78, -4); p.lineTo(-78, -4); p.quadraticCurveTo(-54, -180, -30, shY - 4); p.closePath(); p.fill();
      cut(p, () => { for (let x = -70; x <= 70; x += 10) dot(p, x, -16, 2.4); p.lineWidth = 2.2; p.beginPath(); p.moveTo(-22, shY + 6); p.quadraticCurveTo(10, -230, -4, -40); p.stroke(); for (let y = -290; y < -60; y += 30) dot(p, 6 + Math.sin(y) * 8, y, 3.2); });
    } else {
      for (const [lx, ph] of [[-16, 0], [18, Math.PI]]) {
        both([p, g], (c) => { c.save(); c.translate(lx, hipY); c.rotate(st == null ? 0 : Math.sin(st + ph) * 0.3); });
        p.beginPath(); p.moveTo(-15, 0); p.lineTo(15, 0); p.lineTo(11, 142); p.lineTo(-11, 142); p.closePath(); p.fill(); p.beginPath(); p.ellipse(12, 146, 26, 9, 0, 0, TAU); p.fill(); pin(p, 0, 0, 5);
        both([p, g], (c) => c.restore());
      }
      p.beginPath(); p.moveTo(-50, hipY - 100); p.lineTo(50, hipY - 100); p.quadraticCurveTo(76, hipY, 66, hipY + 40); p.lineTo(-66, hipY + 40); p.quadraticCurveTo(-76, hipY, -50, hipY - 100); p.closePath(); p.fill();
      cut(p, () => { for (let x = -60; x <= 60; x += 11) dot(p, x, hipY + 28, 2.4); p.lineWidth = 2; p.beginPath(); p.moveTo(-50, hipY - 74); for (let x = -40; x <= 52; x += 18) p.lineTo(x, ((x + 40) / 18) % 2 ? hipY - 64 : hipY - 78); p.stroke(); });
    }
    // upper body bends forward around the hip
    both([p, g], (c) => { c.save(); c.translate(0, hipY); c.rotate((o.bow || 0) * 0.7); c.translate(0, -hipY); });
    if (!f) { p.beginPath(); p.moveTo(-46, hipY - 100); p.lineTo(-58, shY - 6); p.quadraticCurveTo(-30, shY - 34, 8, shY - 34); p.quadraticCurveTo(48, shY - 30, 54, shY - 4); p.lineTo(46, hipY - 100); p.closePath(); p.fill();
      cut(p, () => { for (let a = 0.3; a < Math.PI - 0.3; a += 0.3) dot(p, Math.cos(a) * 36, shY - 12 + Math.sin(a) * 22, 2.4); }); }
    else { p.beginPath(); p.moveTo(-30, shY - 6); p.quadraticCurveTo(-4, shY - 34, 28, shY - 8); p.lineTo(30, shY + 40); p.lineTo(-30, shY + 40); p.closePath(); p.fill(); }
    p.fillRect(-12, hy + 26, 26, 40);
    // head
    both([p, g], (c) => { c.save(); c.translate(0, shY - 34); c.rotate(o.head || 0); c.translate(0, -(shY - 34)); });
    const ganesh = hat === 'ganesh';
    if (ganesh) {
      p.beginPath(); p.ellipse(4, hy - 4, 44, 46, 0, 0, TAU); p.fill();
      p.beginPath(); p.ellipse(-24, hy + 6, 22, 40, 0.15, 0, TAU); p.fill();                              // big ear
      cut(p, () => { p.lineWidth = 2.4; p.beginPath(); p.ellipse(-24, hy + 6, 12, 26, 0.15, 0, TAU); p.stroke(); });
      p.lineWidth = 20; p.beginPath(); p.moveTo(38, hy + 2); p.bezierCurveTo(92, hy + 16, 96, hy + 84, 62, hy + 96 + 6 * Math.sin(tt * 3)); p.bezierCurveTo(46, hy + 100, 40, hy + 80, 54, hy + 76); p.stroke();   // trunk curls
      tear(p, 36, hy + 24, 36, 11, 1.0);                                                                  // tusk
      cut(p, () => { dot(p, 26, hy - 10, 4.4); p.lineWidth = 2; p.beginPath(); p.moveTo(40, hy + 14); p.lineTo(52, hy + 30); p.stroke(); });
    } else {
      p.beginPath(); p.ellipse(4, hy, 34, 36, 0, 0, TAU); p.fill();
      p.beginPath(); p.moveTo(30, hy - 8); p.lineTo(46, hy + 4); p.lineTo(30, hy + 12); p.closePath(); p.fill();      // nose
      p.beginPath(); p.ellipse(22, hy + 26, 14, 12, 0, 0, TAU); p.fill();                                   // chin
      cut(p, () => { dot(p, 20, hy - 4, 3.8); p.lineWidth = 2.2; p.beginPath(); p.moveTo(26, hy + 18); p.lineTo(40, hy + 16); p.stroke(); });
    }
    const top = hy - (ganesh ? 40 : 32);
    if (hat === 'crown' || hat === 'asur' || ganesh) {
      const h = hat === 'crown' ? 78 : ganesh ? 52 : 60;
      p.beginPath(); p.moveTo(-30, top + 8); p.lineTo(-26, top - h * 0.5); p.lineTo(-12, top - h * 0.2); p.lineTo(-4, top - h); p.lineTo(8, top - h * 0.3); p.lineTo(22, top - h * 0.8); p.lineTo(30, top + 6); p.closePath(); p.fill();
      cut(p, () => { for (let k = -2; k <= 2; k++) dot(p, k * 11, top - 6, 2.6); dot(p, -2, top - h * 0.55, 3.6); });
      if (hat === 'asur') { tear(p, -24, top - 4, 48, 14, -2.2); tear(p, 24, top - 4, 48, 14, -0.9); }
    } else if (hat === 'feather') {
      p.beginPath(); p.moveTo(-26, top + 8); p.lineTo(-22, top - 22); p.lineTo(-8, top - 6); p.lineTo(2, top - 28); p.lineTo(14, top - 6); p.lineTo(26, top - 20); p.lineTo(28, top + 8); p.closePath(); p.fill();
      p.lineWidth = 3; p.beginPath(); p.moveTo(-6, top - 10); p.quadraticCurveTo(-30, top - 60, -14, top - 96); p.stroke(); tear(p, -14, top - 96, 44, 26, 1.9 + 0.1 * Math.sin(tt * 3));
      cut(p, () => { dot(p, -20, top - 114, 6.4); tear(p, -22, top - 104, 18, 6, 1.5); });
    } else if (hat === 'jata') {
      p.beginPath(); p.ellipse(-8, top - 12, 32, 40, -0.2, 0, TAU); p.fill();
      p.lineWidth = 9; p.beginPath(); p.moveTo(-26, top + 6); p.bezierCurveTo(-70, top + 40, -60, top + 130, -42 + 6 * Math.sin(tt * 2), top + 170); p.stroke(); p.beginPath(); p.moveTo(-18, top + 10); p.bezierCurveTo(-46, top + 50, -30, top + 110, -22, top + 150); p.stroke();
      cut(p, () => { p.beginPath(); p.arc(-4, top - 22, 14, 0.5, TAU - 0.5); p.arc(2, top - 26, 11, TAU - 0.9, 0.9, true); p.fill(); for (let k = 0; k < 5; k++) dot(p, -22 + k * 8, top - 2, 2); p.lineWidth = 2.4; p.beginPath(); p.moveTo(28, hy - 22); p.lineTo(38, hy - 22); p.stroke(); });
    } else if (hat === 'shikha') {
      p.beginPath(); p.ellipse(-12, top + 2, 10, 13, 0, 0, TAU); p.fill(); cut(p, () => { p.lineWidth = 2.6; p.beginPath(); p.moveTo(24, hy - 14); p.lineTo(24, hy - 2); p.stroke(); });
    } else if (hat === 'bun') {
      p.beginPath(); p.ellipse(-26, hy - 8, 20, 18, 0, 0, TAU); p.fill(); p.beginPath(); p.moveTo(-20, top + 6); p.lineTo(-10, top - 30); p.lineTo(2, top - 8); p.lineTo(14, top - 32); p.lineTo(24, top + 2); p.closePath(); p.fill();
      p.lineWidth = 10; p.beginPath(); p.moveTo(-26, hy); p.quadraticCurveTo(-58, hy + 64, -44, hy + 150 + 6 * Math.sin(tt)); p.stroke(); cut(p, () => { for (let k = 0; k < 4; k++) dot(p, -26 + Math.cos(k * 1.6) * 10, hy - 8 + Math.sin(k * 1.6) * 8, 2.4); dot(p, 2, top - 14, 3); });
    }
    if (o.beard) { p.beginPath(); p.moveTo(14, hy + 20); p.quadraticCurveTo(40, hy + 40, 18, hy + 112); p.quadraticCurveTo(-4, hy + 70, 2, hy + 24); p.closePath(); p.fill(); cut(p, () => { p.lineWidth = 2; p.beginPath(); p.moveTo(18, hy + 40); p.lineTo(14, hy + 90); p.moveTo(8, hy + 40); p.lineTo(8, hy + 84); p.stroke(); }); }
    if (rods && !o.noRods) rods.push([...wpt(p, 0, top - 6), 3.2]);
    both([p, g], (c) => c.restore());
    armDraw(8, shY + 4, o.a1 == null ? -0.15 : o.a1, o.a2 == null ? -0.25 : o.a2, true);
    both([p, g], (c) => c.restore());
    both([p, g], (c) => c.restore());
  }
  const glowAt = (g, x, y, r, a, col) => { const gg = g.createRadialGradient(x, y, 0, x, y, r); gg.addColorStop(0, `rgba(${col || '255,196,80'},${a})`); gg.addColorStop(1, `rgba(${col || '255,196,80'},0)`); g.fillStyle = gg; g.fillRect(x - r, y - r, 2 * r, 2 * r); };
  function diyaP(p, g, x, y, s, t, a) {
    p.save(); p.translate(x, y); p.scale(s, s); p.fillStyle = INK;
    p.beginPath(); p.moveTo(-22, -4); p.quadraticCurveTo(0, 20, 22, -4); p.closePath(); p.fill(); p.beginPath(); p.arc(0, -16, 12, 0, TAU); p.fill();
    const fl = 1 + 0.12 * Math.sin(t * 13 + x); cut(p, () => tear(p, 0, -10, 26 * fl, 11, -Math.PI / 2)); p.restore();
    glowAt(g, x, y - 26 * s, 150 * s * (a == null ? 1 : a), 0.55 * (a == null ? 1 : a));
  }
  function ghatRow(p, g, t, y, n, a) { // steps + row of diyas along the bottom
    p.fillStyle = INK; for (let k = 0; k < 3; k++) p.fillRect(0, y + k * 18, 1280, 18 + 400);
    cut(p, () => { for (let k = 0; k < 3; k++) for (let x = 10; x < 1280; x += 22) dot(p, x, y + k * 18 + 6, 2); });
    for (let i = 0; i < n; i++) { const x = 40 + (1200 / (n - 1)) * i; diyaP(p, g, x, y - 2 - (i % 2) * 14, 0.8, t, a); }
  }
  function fort(p, g, x, y, r, rot, glow) { // a flying demon city
    p.save(); p.translate(x, y); p.rotate(rot || 0); p.fillStyle = INK;
    p.beginPath(); p.ellipse(0, 0, r, r * 0.3, 0, 0, Math.PI); p.fill(); p.beginPath(); p.moveTo(-r, 0); p.lineTo(r, 0); p.lineTo(r * 0.8, -r * 0.1); p.lineTo(-r * 0.8, -r * 0.1); p.closePath(); p.fill();
    for (let k = -2; k <= 2; k++) { const bx = k * r * 0.34, h = r * (0.52 - Math.abs(k) * 0.1); p.fillRect(bx - r * 0.1, -h, r * 0.2, h); p.beginPath(); p.arc(bx, -h, r * 0.1, Math.PI, 0); p.fill(); p.fillRect(bx - 2, -h - r * 0.22, 4, r * 0.14); }
    cut(p, () => { for (let k = -2; k <= 2; k++) { const bx = k * r * 0.34; p.beginPath(); p.moveTo(bx - r * 0.04, -r * 0.1); p.lineTo(bx - r * 0.04, -r * 0.22); p.arc(bx, -r * 0.22, r * 0.04, Math.PI, 0); p.lineTo(bx + r * 0.04, -r * 0.1); p.fill(); } for (let k = -6; k <= 6; k++) dot(p, k * r * 0.14, r * 0.12, 3); });
    p.restore();
    if (glow) glowAt(g, x, y, r * 1.5, glow);
  }
  function arrowP(p, g, x, y, len, ang, fire) {
    p.save(); p.translate(x, y); p.rotate(ang); p.fillStyle = INK; p.fillRect(-len, -3, len, 6);
    p.beginPath(); p.moveTo(0, -14); p.lineTo(40, 0); p.lineTo(0, 14); p.closePath(); p.fill();
    for (let k = 0; k < 3; k++) tear(p, -len + 10 + k * 14, 0, 34, 12, k % 2 ? -2.4 : 2.4);
    cut(p, () => { dot(p, 8, 0, 3.6); }); p.restore();
    if (fire) { g.save(); g.translate(x, y); g.rotate(ang); const gg = g.createLinearGradient(-len, 0, 40, 0); gg.addColorStop(0, 'rgba(255,160,40,0)'); gg.addColorStop(1, `rgba(255,210,100,${fire})`); g.fillStyle = gg; g.fillRect(-len, -40, len + 90, 80); g.restore(); }
  }
  function wheelP(p, x, y, r, rot) {
    p.save(); p.translate(x, y); p.rotate(rot); p.fillStyle = INK; p.beginPath(); p.arc(0, 0, r, 0, TAU); p.arc(0, 0, r * 0.82, 0, TAU, true); p.fill(); p.beginPath(); p.arc(0, 0, r * 0.16, 0, TAU); p.fill();
    for (let k = 0; k < 8; k++) { p.save(); p.rotate(k * TAU / 8); p.fillRect(-3, 0, 6, r * 0.84); p.restore(); }
    cut(p, () => { for (let k = 0; k < 16; k++) dot(p, Math.cos(k * TAU / 16) * r * 0.91, Math.sin(k * TAU / 16) * r * 0.91, 2.6); }); p.restore();
  }
  function pedestal(p, x, y, w, h) { p.fillStyle = INK; p.fillRect(x - w / 2, y - h, w, h); p.fillRect(x - w / 2 - 10, y - h - 10, w + 20, 14); p.fillRect(x - w / 2 - 14, y - 12, w + 28, 12); cut(p, () => { for (let k = 0; k < 6; k++) dot(p, x - w / 2 + 14 + k * (w - 28) / 5, y - h / 2, 3); p.lineWidth = 2; p.beginPath(); p.moveTo(x - w / 2 + 8, y - h + 18); p.lineTo(x + w / 2 - 8, y - h + 18); p.stroke(); }); }
  function templeP(p, x, y, s) { // Odisha-style curved shikhara with cut windows
    p.save(); p.translate(x, y); p.scale(s, s); p.fillStyle = INK;
    p.beginPath(); p.moveTo(-170, 0); p.lineTo(-150, -150); p.quadraticCurveTo(-120, -330, -30, -470); p.lineTo(-24, -500); p.lineTo(24, -500); p.lineTo(30, -470); p.quadraticCurveTo(120, -330, 150, -150); p.lineTo(170, 0); p.closePath(); p.fill();
    p.beginPath(); p.arc(0, -520, 34, Math.PI, 0); p.fill(); p.fillRect(-3, -600, 6, 70); p.beginPath(); p.moveTo(3, -600); p.lineTo(44, -586); p.lineTo(3, -572); p.fill();
    cut(p, () => { for (let r = 0; r < 6; r++) for (let c = -2; c <= 2; c++) { const yy = -90 - r * 60, w = 120 - r * 17; if (Math.abs(c * 30) < w / 2) { p.beginPath(); p.moveTo(c * 30 - 8, yy); p.lineTo(c * 30 - 8, yy - 18); p.arc(c * 30, yy - 18, 8, Math.PI, 0); p.lineTo(c * 30 + 8, yy); p.fill(); } } p.beginPath(); p.moveTo(-26, 0); p.lineTo(-26, -70); p.arc(0, -70, 26, Math.PI, 0); p.lineTo(26, 0); p.fill(); });
    p.restore();
  }
  function discP(p, g, x, y, r, a, col) { glowAt(g, x, y, r * 3, a, col || '255,214,120'); p.fillStyle = INK; }
  function sparkle(p, x, y, r, t) { p.fillStyle = INK; const k = 0.7 + 0.3 * Math.sin(t * 9 + x); p.beginPath(); for (let i = 0; i < 8; i++) { const rr = i % 2 ? r * 0.2 * k : r * k, a = i * TAU / 8; p.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } p.closePath(); p.fill(); }
  function riverP(p, g, y, t) { p.fillStyle = INK; p.fillRect(0, y, 1280, 200); cut(p, () => { p.lineWidth = 3; for (let r = 0; r < 4; r++) { p.beginPath(); for (let x = 0; x <= 1280; x += 16) p.lineTo(x, y + 14 + r * 20 + Math.sin(x * 0.02 + t * 1.6 + r) * 5); p.stroke(); } }); glowAt(g, 640, y + 20, 700, 0.25); }
  function tulsiPlant(p, g, x, y, s, grow, t) {
    p.save(); p.translate(x, y); p.scale(s, s); p.fillStyle = INK; p.strokeStyle = INK; p.lineCap = 'round';
    p.beginPath(); p.moveTo(-46, -66); p.lineTo(46, -66); p.lineTo(34, 0); p.lineTo(-34, 0); p.closePath(); p.fill(); p.fillRect(-52, -80, 104, 18); cut(p, () => { for (let k = 0; k < 6; k++) dot(p, -30 + k * 12, -34, 3); });
    p.lineWidth = 7; p.beginPath(); p.moveTo(0, -80); p.lineTo(0, -80 - 190 * grow); p.stroke();
    const n = Math.floor(14 * grow); for (let k = 0; k < n; k++) { const yy = -96 - k * 13, side = k % 2 ? 1 : -1; tear(p, 0, yy, 56 * Math.min(1, grow * 1.4), 22, side > 0 ? -0.5 + 0.06 * Math.sin(t * 2 + k) : -2.64 - 0.06 * Math.sin(t * 2 + k)); }
    cut(p, () => { for (let k = 0; k < n; k += 2) dot(p, (k % 4 ? 22 : -22), -100 - k * 13, 2.4); });
    p.restore();
  }
  function personCrowd(p, g, x, y, n, s, t, rods) { for (let k = 0; k < n; k++) fig(p, g, { x: x + k * 120 * s, y: y + (k % 2) * 8, s: s * (0.95 + (k % 3) * 0.04), dir: -1, t, sex: k % 2 ? 'f' : 'm', hat: k % 2 ? 'bun' : 'shikha', a1: -0.3 + 0.3 * Math.sin(t * 3 + k), a2: -0.8, noRods: false }, rods); }
