  // ===== gods: Vishnu / Ganesh / Krishna standing (godP), Vishnu asleep on Sheshnag, Tulsi plant, temple =====
  // godP o: kind('vishnu'|'ganesh'|'krishna') x y s dir t arm(forward angle) arm2 noRods
  function godP(p, g, o, rods) {
    const d = o.dir == null ? 1 : o.dir, k = o.kind, t = o.t || 0;
    both([p, g], (c) => { c.save(); c.translate(o.x, o.y); c.scale(o.s * d, o.s); });
    p.fillStyle = INK; p.strokeStyle = INK; p.lineCap = 'round'; p.lineJoin = 'round';
    p.beginPath(); p.moveTo(-60, -300); p.lineTo(60, -300); p.quadraticCurveTo(88, -150, 74, -6); p.lineTo(-74, -6); p.quadraticCurveTo(-88, -150, -60, -300); p.closePath(); p.fill();
    cut(p, () => { for (let x = -66; x <= 66; x += 10) dot(p, x, -18, 2.4); p.lineWidth = 2.2; p.beginPath(); p.moveTo(-22, -290); p.quadraticCurveTo(14, -190, -6, -40); p.stroke(); for (let y = -270; y < -60; y += 34) dot(p, 14 + Math.sin(y) * 8, y, 3.2); });
    const bel = k === 'ganesh' ? 34 : 0;
    p.beginPath(); p.moveTo(-58, -298); p.lineTo(-72, -430); p.quadraticCurveTo(-52, -470, 0, -472); p.quadraticCurveTo(52, -470, 72 + bel * 0.4, -430); p.quadraticCurveTo(80 + bel, -360, 62, -298); p.closePath(); p.fill();
    cut(p, () => { for (let a = 0.3; a < Math.PI - 0.3; a += 0.26) dot(p, Math.cos(a) * 50, -458 + Math.sin(a) * 32, 2.6); p.lineWidth = 2.4; p.beginPath(); p.moveTo(-48, -440); p.lineTo(40, -310); p.stroke(); });
    if (k === 'vishnu') {      // two extra raised arms: chakra and shankh
      for (const [sx, ang, what] of [[-30, -2.4, 'c'], [40, 2.3, 's']]) {
        both([p, g], (c) => { c.save(); c.translate(sx, -440); c.rotate(ang + 0.05 * Math.sin(t * 2)); });
        p.beginPath(); p.roundRect(-10, -4, 20, 120, 10); p.fill();
        if (what === 'c') { p.beginPath(); p.arc(0, 150, 34, 0, TAU); p.fill(); cut(p, () => { p.beginPath(); p.arc(0, 150, 24, 0, TAU); p.lineWidth = 3; p.stroke(); for (let a = 0; a < 8; a++) { p.beginPath(); p.moveTo(0, 150); p.lineTo(Math.cos(a * 0.785) * 24, 150 + Math.sin(a * 0.785) * 24); p.stroke(); } }); }
        else { p.beginPath(); p.ellipse(0, 144, 20, 30, 0.3, 0, TAU); p.fill(); tear(p, 6, 172, 24, 12, 1.9); cut(p, () => { p.lineWidth = 2; p.beginPath(); p.arc(0, 144, 12, 0, 3); p.stroke(); }); }
        both([p, g], (c) => c.restore());
      }
    }
    // head
    p.fillRect(-16, -492, 32, 30);
    if (k === 'ganesh') {
      p.beginPath(); p.ellipse(6, -530, 50, 52, 0, 0, TAU); p.fill();
      p.beginPath(); p.ellipse(-30, -526, 36, 56, 0.2, 0, TAU); p.fill();                                   // big ear
      cut(p, () => { p.lineWidth = 2.4; p.beginPath(); p.ellipse(-30, -526, 22, 40, 0.2, 0, TAU); p.stroke(); });
      p.lineWidth = 26; p.beginPath(); p.moveTo(44, -540); p.bezierCurveTo(78, -520, 80, -440 + 12 * Math.sin(t * 2), 56 + 10 * Math.sin(t * 2), -406); p.stroke();   // trunk
      p.lineWidth = 7; p.beginPath(); p.moveTo(40, -512); p.lineTo(66, -468); p.stroke();                    // tusk
      p.beginPath(); p.moveTo(-26, -566); p.lineTo(-20, -618); p.lineTo(-6, -590); p.lineTo(6, -634); p.lineTo(18, -590); p.lineTo(34, -618); p.lineTo(40, -566); p.closePath(); p.fill();
      cut(p, () => { dot(p, 22, -540, 4.4); for (let x = -18; x <= 32; x += 10) dot(p, x, -578, 2.2); });
    } else {
      p.beginPath(); p.ellipse(6, -530, 38, 42, 0, 0, TAU); p.fill();
      p.beginPath(); p.ellipse(40, -520, 28, 20, 0.1, 0, TAU); p.fill();
      p.beginPath(); p.moveTo(-30, -558); p.lineTo(-34, -612); p.lineTo(-14, -596); p.lineTo(-4, -664); p.lineTo(8, -604); p.lineTo(20, -676); p.lineTo(32, -604); p.lineTo(44, -616); p.lineTo(42, -558); p.closePath(); p.fill();
      if (k === 'krishna') { p.lineWidth = 5; p.beginPath(); p.moveTo(10, -664); p.quadraticCurveTo(20, -720, 52, -740); p.stroke(); tear(p, 54, -742, 34, 22, -0.7); cut(p, () => dot(p, 54, -742, 5)); }
      cut(p, () => { dot(p, 22, -534, 4.4); for (let x = -22; x <= 36; x += 11) dot(p, x, -574, 2.2); dot(p, 6, -626, 3); dot(p, 16, -648, 2.4); p.lineWidth = 2.4; p.beginPath(); p.moveTo(30, -506); p.lineTo(56, -510); p.stroke(); });
    }
    if (rods && !o.noRods) rods.push([...wpt(p, 8, k === 'ganesh' ? -620 : -668), 3.4]);
    // front arm (with flute for krishna)
    both([p, g], (c) => { c.save(); c.translate(54, -440); c.rotate(o.arm == null ? -0.3 : o.arm); });
    p.beginPath(); p.roundRect(-13, -4, 26, 104, 13); p.fill();
    both([p, g], (c) => { c.save(); c.translate(0, 98); c.rotate(o.arm2 == null ? -0.4 : o.arm2); });
    p.beginPath(); p.roundRect(-11, -4, 22, 84, 11); p.fill(); p.beginPath(); p.arc(0, 90, 15, 0, TAU); p.fill();
    if (k === 'krishna' && o.flute !== false) { p.lineWidth = 8; p.beginPath(); p.moveTo(-70, 70); p.lineTo(80, 100); p.stroke(); cut(p, () => { for (let i = 0; i < 4; i++) dot(p, -30 + i * 30, 78 + i * 7, 2.4); }); }
    if (rods && !o.noRods) rods.push([...wpt(p, 0, 92), 2.8]);
    pin(p, 0, 0, 6);
    both([p, g], (c) => c.restore()); pin(p, 0, 0, 7);
    both([p, g], (c) => c.restore());
    both([p, g], (c) => c.restore());
  }
  // Vishnu asleep on Sheshnag (centre x,y = water line). o: x y s t glow(0..1)
  function vishnuSleep(p, g, o) {
    const t = o.t || 0, br = Math.sin(t * 1.6);
    both([p, g], (c) => { c.save(); c.translate(o.x, o.y); c.scale(o.s, o.s); });
    p.fillStyle = INK; p.strokeStyle = INK; p.lineCap = 'round'; p.lineJoin = 'round';
    p.lineWidth = 54; p.beginPath(); p.moveTo(-300, -40); p.bezierCurveTo(-200, -120, -100, 10, 0, -50); p.bezierCurveTo(100, -110, 200, 0, 300, -60); p.stroke();   // coils
    cut(p, () => { for (let x = -280; x < 290; x += 24) dot(p, x, -50 + Math.sin(x * 0.03) * 24, 2.6); });
    for (let h = 0; h < 5; h++) { const hx = -330 + h * 0; p.save(); p.translate(-310, -70); p.rotate(-0.1 + (h - 2) * 0.2); p.beginPath(); p.moveTo(-10, 0); p.quadraticCurveTo(-18, -120, -4, -190 - 10 * Math.sin(t * 2 + h)); p.lineTo(10, -190 - 10 * Math.sin(t * 2 + h)); p.quadraticCurveTo(26, -120, 16, 0); p.fill(); p.beginPath(); p.ellipse(3, -204 - 10 * Math.sin(t * 2 + h), 24, 30, 0, 0, TAU); p.fill(); cut(p, () => { dot(p, 10, -208 - 10 * Math.sin(t * 2 + h), 3.6); }); p.restore(); }
    // Vishnu reclining
    p.save(); p.translate(0, -80 - 3 * br);
    p.beginPath(); p.moveTo(-190, -20); p.lineTo(-40, -52); p.lineTo(-20, 0); p.lineTo(-190, 4); p.closePath(); p.fill();              // legs
    p.beginPath(); p.moveTo(-60, -20); p.quadraticCurveTo(0, -90 - 4 * br, 100, -74); p.lineTo(110, 0); p.lineTo(-60, 4); p.closePath(); p.fill(); // torso
    cut(p, () => { for (let a = 0; a < 6; a++) dot(p, 20 + a * 14, -66 - Math.sin(a) * 2, 2.6); });
    p.beginPath(); p.ellipse(150, -58, 40, 38, 0, 0, TAU); p.fill();                                                                       // head
    p.beginPath(); p.moveTo(122, -86); p.lineTo(128, -150); p.lineTo(146, -122); p.lineTo(158, -170); p.lineTo(170, -122); p.lineTo(186, -146); p.lineTo(184, -88); p.closePath(); p.fill();   // crown
    p.lineWidth = 26; p.beginPath(); p.moveTo(96, -20); p.quadraticCurveTo(150, 20, 190, -20); p.stroke();                                 // arm under head
    cut(p, () => { p.lineWidth = 3; p.beginPath(); p.moveTo(172, -54); p.lineTo(190, -52); p.stroke(); dot(p, 148, -150, 3); });
    p.restore();
    if (o.glow > 0.01) { const gg = g.createRadialGradient(150, -130, 0, 150, -130, 380); gg.addColorStop(0, `rgba(255,200,90,${0.8 * o.glow})`); gg.addColorStop(1, 'rgba(255,200,90,0)'); g.fillStyle = gg; g.fillRect(-500, -500, 1000, 700); }
    both([p, g], (c) => c.restore());
  }
  function tulsiPlant(p, g, o) {
    const t = o.t || 0; both([p, g], (c) => { c.save(); c.translate(o.x, o.y); c.scale(o.s, o.s); });
    p.fillStyle = INK; p.strokeStyle = INK; p.lineCap = 'round';
    p.beginPath(); p.moveTo(-48, -84); p.lineTo(48, -84); p.lineTo(36, 0); p.lineTo(-36, 0); p.closePath(); p.fill();
    cut(p, () => { for (let x = -34; x <= 34; x += 12) dot(p, x, -62, 2.6); });
    p.lineWidth = 8; p.beginPath(); p.moveTo(0, -84); p.lineTo(0, -280); p.stroke();
    for (let k = 0; k < 9; k++) { const y = -120 - k * 20, sd = k % 2 ? 1 : -1, sw = Math.sin(t * 2 + k) * 4; p.lineWidth = 5; p.beginPath(); p.moveTo(0, y); p.lineTo(sd * 34 + sw, y - 12); p.stroke(); tear(p, sd * 34 + sw, y - 12, 34, 16, sd > 0 ? -0.5 : 3.6); }
    p.beginPath(); p.ellipse(0, -296, 10, 22, 0, 0, TAU); p.fill();
    if (o.glow > 0.01) { const gg = g.createRadialGradient(0, -200, 0, 0, -200, 240); gg.addColorStop(0, `rgba(120,230,120,${0.55 * o.glow})`); gg.addColorStop(1, 'rgba(120,230,120,0)'); g.fillStyle = gg; g.fillRect(-300, -450, 600, 600); }
    both([p, g], (c) => c.restore());
  }
  // small shrine/temple silhouette for backdrops
  function templeP(p, x, y, s) {
    p.save(); p.translate(x, y); p.scale(s, s); p.fillStyle = INK;
    p.fillRect(-120, -140, 240, 140); p.beginPath(); p.moveTo(-100, -140); p.quadraticCurveTo(-80, -300, 0, -380); p.quadraticCurveTo(80, -300, 100, -140); p.closePath(); p.fill();
    p.fillRect(-4, -440, 8, 66); p.beginPath(); p.moveTo(4, -440); p.lineTo(44, -430); p.lineTo(4, -418); p.fill();
    cut(p, () => { p.beginPath(); p.moveTo(-34, 0); p.lineTo(-34, -70); p.quadraticCurveTo(0, -120, 34, -70); p.lineTo(34, 0); p.closePath(); p.fill(); for (let k = 0; k < 6; k++) dot(p, 0, -170 - k * 28, 4); });
    p.restore();
  }
  function waves(p, W, y, t, n = 5) { p.save(); p.strokeStyle = INK; p.lineCap = 'round'; for (let k = 0; k < n; k++) { p.lineWidth = 5 - k * 0.5; p.beginPath(); for (let x = -20; x <= W + 20; x += 16) { const yy = y + k * 22 + Math.sin(x * 0.018 + t * 1.4 + k) * 9; x === -20 ? p.moveTo(x, yy) : p.lineTo(x, yy); } p.stroke(); } p.restore(); }
  function xmark(p, x, y, r, k) { p.save(); p.translate(x, y); p.fillStyle = INK; for (const a of [0.785, -0.785]) { p.save(); p.rotate(a); p.fillRect(-r * k, -9, r * 2 * k, 18); p.restore(); } p.restore(); }
  function rings(p, x, y, t, t0) { p.save(); p.strokeStyle = INK; for (let k = 0; k < 4; k++) { if (t < t0) continue; const u = ((t - t0) * 0.8 + k * 0.25) % 1; p.lineWidth = 6 * (1 - u) + 1; p.beginPath(); p.arc(x, y, 30 + u * 260, 0, TAU); p.stroke(); } p.restore(); }
  function diyaRow(p, g, x0, x1, y, t, a) { for (let x = x0; x <= x1; x += 90) { p.fillStyle = INK; p.beginPath(); p.ellipse(x, y, 26, 11, 0, 0, Math.PI); p.fill(); tear(p, x, y - 12, 24 * a, 10 * a, -1.57); const gg = g.createRadialGradient(x, y - 18, 0, x, y - 18, 60); gg.addColorStop(0, `rgba(255,190,70,${0.8 * a})`); gg.addColorStop(1, 'rgba(255,190,70,0)'); g.fillStyle = gg; g.fillRect(x - 60, y - 80, 120, 120); } }
