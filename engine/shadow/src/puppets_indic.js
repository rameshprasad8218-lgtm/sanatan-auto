  // ===== Indic shadow puppets (Hanuman, Sita, mini Ram/Sita, palace arches). Add new puppets here (Ram, Krishna, Shiva, Ravan...) in the same style =====
  const heart = (c, s) => { c.beginPath(); c.moveTo(0, 34 * s); c.bezierCurveTo(-72 * s, -6 * s, -50 * s, -66 * s, 0, -32 * s); c.bezierCurveTo(50 * s, -66 * s, 72 * s, -6 * s, 0, 34 * s); c.closePath(); };

  function miniRam(p, x, y, s) {
    p.save(); p.translate(x, y); p.scale(s, s); p.fillStyle = INK; p.strokeStyle = INK;
    p.beginPath(); p.moveTo(-14, -70); p.lineTo(14, -70); p.lineTo(11, -26); p.lineTo(-11, -26); p.closePath(); p.fill();        // torso
    p.beginPath(); p.moveTo(-18, -26); p.lineTo(18, -26); p.lineTo(22, 0); p.lineTo(-22, 0); p.closePath(); p.fill();             // dhoti
    p.beginPath(); p.arc(0, -84, 13, 0, TAU); p.fill();
    p.beginPath(); p.moveTo(-12, -90); p.lineTo(-8, -118); p.lineTo(0, -108); p.lineTo(8, -122); p.lineTo(12, -90); p.closePath(); p.fill();   // crown
    p.lineWidth = 3; p.beginPath(); p.arc(26, -52, 44, -1.1, 1.1); p.stroke();                                                     // bow
    p.restore();
  }
  function miniSita(p, x, y, s) {
    p.save(); p.translate(x, y); p.scale(s, s); p.fillStyle = INK; p.strokeStyle = INK;
    p.beginPath(); p.moveTo(-12, -72); p.lineTo(12, -72); p.lineTo(24, 0); p.lineTo(-24, 0); p.closePath(); p.fill();
    p.beginPath(); p.arc(0, -86, 12, 0, TAU); p.fill();
    p.lineWidth = 7; p.lineCap = 'round'; p.beginPath(); p.moveTo(-8, -84); p.quadraticCurveTo(-24, -56, -16, -26); p.stroke();   // braid
    p.beginPath(); p.moveTo(-8, -97); p.lineTo(0, -112); p.lineTo(8, -97); p.closePath(); p.fill();
    p.restore();
  }
  // Hanuman in profile, feet at (x,y). o: s dir t head(dip) a1 a2 (near arm, forward = negative) b1 b2 chest(0..1) gada noRods bite
  function hanu(p, g, o, rods) {
    const d = o.dir == null ? 1 : o.dir;
    both([p, g], (c) => { c.save(); c.translate(o.x, o.y); c.scale(o.s * d, o.s); });
    p.fillStyle = INK; p.strokeStyle = INK; p.lineCap = 'round'; p.lineJoin = 'round';
    const sw = Math.sin((o.t || 0) * 2.1) * 14;
    // tail
    p.lineWidth = 15; p.beginPath(); p.moveTo(-34, -250); p.bezierCurveTo(-190, -210 + sw, -210, -410, -130 + sw, -520); p.bezierCurveTo(-96, -560, -60 + sw, -540, -66, -500); p.stroke();
    tear(p, -66, -500, 34, 20, -1.3);
    // legs + feet
    for (const lx of [-22, 26]) { p.beginPath(); p.moveTo(lx - 18, -172); p.lineTo(lx + 18, -172); p.lineTo(lx + 12, -14); p.lineTo(lx - 12, -14); p.closePath(); p.fill(); p.beginPath(); p.ellipse(lx + 15, -9, 27, 10, 0, 0, TAU); p.fill(); }
    // dhoti with cut border
    p.beginPath(); p.moveTo(-60, -262); p.lineTo(60, -262); p.quadraticCurveTo(80, -200, 68, -128); p.lineTo(-68, -128); p.quadraticCurveTo(-80, -200, -60, -262); p.closePath(); p.fill();
    cut(p, () => { for (let x = -58; x <= 58; x += 11) dot(p, x, -140, 2.6); p.lineWidth = 2; p.beginPath(); p.moveTo(-60, -236); for (let x = -50; x <= 60; x += 20) p.lineTo(x, x / 20 % 2 ? -226 : -240); p.stroke(); for (let k = 0; k < 4; k++) tear(p, -30 + k * 20, -214, 22, 9, Math.PI / 2); });
    // torso
    p.beginPath(); p.moveTo(-62, -262); p.lineTo(-80, -402); p.quadraticCurveTo(-62, -440, 0, -444); p.quadraticCurveTo(62, -440, 80, -402); p.lineTo(62, -262); p.closePath(); p.fill();
    cut(p, () => { for (let a = 0.3; a < Math.PI - 0.3; a += 0.28) dot(p, Math.cos(a) * 52, -428 + Math.sin(a) * 34, 2.6); });  // necklace dots
    if (o.chest > 0.01) { const s = o.chest * 1.0; p.save(); p.translate(2, -352); cut(p, () => { heart(p, s * 1.15); p.fill(); }); p.restore();
      g.save(); g.translate(2, -352); g.fillStyle = 'rgb(255,196,70)'; heart(g, s * 1.25); g.fill(); g.restore();
      if (o.chest > 0.55) { const k = cl((o.chest - 0.55) / 0.45); miniRam(p, -14, -334, 0.55 * k); miniSita(p, 22, -334, 0.52 * k); } }
    // neck + head (dips around the neck)
    both([p, g], (c) => { c.save(); c.translate(0, -446); c.rotate(o.head || 0); c.translate(0, 446); });
    p.fillRect(-16, -466, 32, 30);
    p.beginPath(); p.ellipse(6, -494, 40, 42, 0, 0, TAU); p.fill();
    p.beginPath(); p.ellipse(42, -482, 30, 21, 0.1, 0, TAU); p.fill();
    p.beginPath(); p.ellipse(-24, -500, 13, 22, 0.2, 0, TAU); p.fill();
    p.beginPath(); p.moveTo(-32, -524); p.lineTo(-36, -578); p.lineTo(-18, -562); p.lineTo(-10, -616); p.lineTo(4, -568); p.lineTo(18, -648); p.lineTo(30, -568); p.lineTo(44, -580); p.lineTo(42, -524); p.closePath(); p.fill();
    cut(p, () => { dot(p, 22, -502, 4.6); for (let x = -26; x <= 36; x += 11) dot(p, x, -540, 2.2); dot(p, 4, -590, 3.2); dot(p, 18, -610, 2.4); p.lineWidth = 2.4; p.beginPath(); p.moveTo(34, -472); p.lineTo(60, -476); p.stroke(); });
    if (rods && !o.noRods) rods.push([...wpt(p, 10, -590), 3.4]);
    both([p, g], (c) => c.restore());
    // arms
    const arm = (sx, a1, a2, near) => {
      both([p, g], (c) => { c.save(); c.translate(sx, -410); c.rotate(a1); });
      p.beginPath(); p.roundRect(-14, -6, 28, 104, 14); p.fill(); cut(p, () => { p.beginPath(); p.arc(0, 28, 15, 0, TAU); p.lineWidth = 2.6; p.stroke(); });
      both([p, g], (c) => { c.save(); c.translate(0, 94); c.rotate(a2); });
      p.beginPath(); p.roundRect(-12, -6, 24, 92, 12); p.fill(); p.beginPath(); p.arc(0, 98, 16, 0, TAU); p.fill();
      pin(p, 0, 0, 6);
      if (near && o.gada) { p.save(); p.translate(0, 98); p.rotate(o.gadaA == null ? 0.2 : o.gadaA); p.fillRect(-5, -150, 10, 180); p.beginPath(); p.ellipse(0, -176, 30, 40, 0, 0, TAU); p.fill(); cut(p, () => { for (let k = 0; k < 5; k++) dot(p, ((k % 2) - 0.5) * 24, -200 + k * 14, 4); p.lineWidth = 2.4; p.beginPath(); p.moveTo(-28, -176); p.lineTo(28, -176); p.stroke(); }); p.restore(); }
      if (near && rods && !o.noRods) rods.push([...wpt(p, 0, 100), 2.8]);
      both([p, g], (c) => c.restore());
      pin(p, 0, 0, 7);
      both([p, g], (c) => c.restore());
    };
    arm(-50, o.b1 == null ? 0.18 : o.b1, o.b2 == null ? -0.1 : o.b2, false);
    arm(56, o.a1 == null ? -0.12 : o.a1, o.a2 == null ? -0.2 : o.a2, true);
    both([p, g], (c) => c.restore());
  }
  // Sita in profile facing right, holding a bead necklace in her outstretched hand. o: x y s dir t arm(forward angle) neck(0..1 necklace shown) swing
  function sitaP(p, g, o, rods) {
    const d = o.dir == null ? 1 : o.dir;
    both([p, g], (c) => { c.save(); c.translate(o.x, o.y); c.scale(o.s * d, o.s); });
    p.fillStyle = INK; p.strokeStyle = INK; p.lineCap = 'round';
    p.beginPath(); p.moveTo(-30, -338); p.lineTo(30, -338); p.quadraticCurveTo(52, -180, 74, -4); p.lineTo(-74, -4); p.quadraticCurveTo(-52, -180, -30, -338); p.closePath(); p.fill();
    cut(p, () => { for (let x = -66; x <= 66; x += 10) dot(p, x, -16, 2.4); p.lineWidth = 2.2; p.beginPath(); p.moveTo(-26, -330); p.quadraticCurveTo(10, -230, -4, -40); p.stroke(); for (let y = -300; y < -60; y += 30) dot(p, 6 + Math.sin(y) * 8, y, 3.2); });
    p.beginPath(); p.moveTo(-34, -336); p.quadraticCurveTo(-60, -240, -46, -150); p.lineTo(-24, -150); p.quadraticCurveTo(-30, -240, -22, -330); p.closePath(); p.fill();            // pallu
    p.fillRect(-9, -366, 18, 34); p.beginPath(); p.ellipse(2, -388, 25, 29, 0, 0, TAU); p.fill();
    p.beginPath(); p.moveTo(24, -386); p.lineTo(32, -380); p.lineTo(24, -376); p.fill();
    p.beginPath(); p.moveTo(-18, -412); p.lineTo(-8, -440); p.lineTo(4, -418); p.lineTo(14, -440); p.lineTo(22, -410); p.closePath(); p.fill();                                        // crown
    p.lineWidth = 11; p.beginPath(); p.moveTo(-18, -394); p.quadraticCurveTo(-52, -330 + 8 * Math.sin(o.t || 0), -40, -250); p.stroke(); tear(p, -40, -250, 40, 16, 1.6);       // braid
    cut(p, () => { dot(p, 12, -394, 3.6); dot(p, 4, -440, 3); });
    // arm
    both([p, g], (c) => { c.save(); c.translate(14, -318); c.rotate(o.arm == null ? -1.1 : o.arm); });
    p.beginPath(); p.roundRect(-11, -4, 22, 100, 11); p.fill(); p.beginPath(); p.arc(0, 104, 13, 0, TAU); p.fill();
    if (o.neck !== 0) { const sg = 20 + 8 * Math.sin((o.t || 0) * 3); p.lineWidth = 3;
      // necklace hangs from the hand: arc of beads
      for (let k = 0; k <= 14; k++) { const u = k / 14, x = (u - 0.5) * 84, y = 108 + Math.sin(u * Math.PI) * (46 + sg); dot(p, x, y, 6.4); }
      cut(p, () => { for (let k = 0; k <= 14; k++) { const u = k / 14, x = (u - 0.5) * 84, y = 108 + Math.sin(u * Math.PI) * (46 + sg); dot(p, x, y, 2.5); } }); }
    if (rods && !o.noRods) rods.push([...wpt(p, 0, 106), 2.8]);
    both([p, g], (c) => c.restore());
    both([p, g], (c) => c.restore());
  }
  function palaceBack(st, t, a, blur) {
    pup(st, { alpha: a, blur }, (p) => {
      p.fillStyle = INK;
      for (const x of [200, 640, 1080]) {
        p.beginPath(); p.moveTo(x - 150, 640); p.lineTo(x - 150, 250); p.arc(x, 250, 150, Math.PI, 0); p.lineTo(x + 150, 640); p.closePath(); p.fill();
        cut(p, () => { p.beginPath(); p.moveTo(x - 96, 640); p.lineTo(x - 96, 270); p.arc(x, 270, 96, Math.PI, 0); p.lineTo(x + 96, 640); p.closePath(); p.fill(); });
        p.beginPath(); p.arc(x, 150, 34, Math.PI, 0); p.fill(); p.fillRect(x - 3, 96, 6, 24);
        cut(p, () => { for (let k = -3; k <= 3; k++) dot(p, x + k * 34, 192, 3.4); });
      }
      p.fillRect(0, 560, 1280, 90);
    });
  }
