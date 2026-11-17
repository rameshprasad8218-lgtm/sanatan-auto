  // ================= 15 s trial: "Hanuman ji ne seena kyon chira" in the shadow-theatre style =================
  const HV = { W: 1080, H: 1920, SY: (1920 - 608) / 2 };
  const HT = JSON.parse(window.HT_JSON); const hdur = HT.duration;
  const L0 = HT.lines.map((l) => [l.start, l.end, l.text]);
  const HD = 16.0;
  function hframe(ctx, W, Hh, t) {
    const st = begin(W, Hh);
    const open = EIO(sm(11.9, 12.9, t));
    let b = sm(0, 0.6, t) * (0.92 + 0.08 * Math.sin(t * 7));
    const flare = t > 12.3 ? Math.exp(-(t - 12.3) * 2.2) * 0.4 : 0;
    ctx.save();
    const sh = t > 12.3 && t < 12.9 ? Math.sin((t - 12.3) * 80) * 7 * (1 - (t - 12.3) / 0.6) : (t < 0.9 ? Math.sin(t * 70) * 6 * (1 - t / 0.9) : 0);
    if (Math.abs(sh) > 0.05) { ctx.translate(W / 2 + sh, Hh / 2 + sh * 0.4); ctx.scale(1.02, 1.02); ctx.translate(-W / 2, -Hh / 2); }
    lamp(ctx, W, Hh, t, b + flare * 0.3, flare);
    if (t > 3.6) palaceBack(st, t, 0.8, 3);
    const baseY = 618;
    if (t < 3.7) {                                           // HOOK: Hanuman large, the eye catches the lamp
      const z = 1.12 + 0.05 * sm(0, 3.6, t);
      pup(st, {}, (p, g, rods) => hanu(p, g, { x: 640, y: baseY + 20, s: z, dir: 1, t, head: 0.04 * Math.sin(t * 1.4), a1: -0.35 - 0.1 * Math.sin(t * 2), a2: -0.5, gada: true, gadaA: 0.1 }, rods));
    } else if (t < 7.3) {                                    // Sita offers the necklace
      const ent = EO(sm(3.7, 4.9, t)), give = EIO(sm(5.6, 6.2, t));
      pup(st, {}, (p, g, rods) => sitaP(p, g, { x: lerp(-120, 330, ent), y: baseY, s: 0.96, dir: 1, t, arm: -1.15 + 0.1 * Math.sin(t * 2), neck: give > 0.5 ? 0 : 1 }, rods));
      pup(st, {}, (p, g, rods) => hanu(p, g, { x: lerp(1420, 900, ent), y: baseY, s: 0.98, dir: -1, t, head: 0.1 * give, a1: -0.9 * give - 0.1, a2: -0.6 * give, gada: true, gadaA: 0.5 }, rods));
      if (give > 0.5) pup(st, {}, (p) => { p.fillStyle = INK; for (let k = 0; k <= 14; k++) { const u = k / 14; dot(p, 780 + (u - 0.5) * 84, 360 + Math.sin(u * Math.PI) * 60 + Math.sin(t * 3 + k) * 3, 6.4); } });
    } else if (t < 11.9) {                                   // bites the pearls, courtiers laugh
      const bite = Math.max(0, Math.sin((t - 7.4) * 7.5));
      pup(st, {}, (p, g, rods) => hanu(p, g, { x: 860, y: baseY, s: 1.0, dir: -1, t, head: 0.26 * bite, a1: -0.85, a2: -0.9, gada: true, gadaA: 0.4 }, rods));
      for (let k = 0; k < 3; k++) pup(st, {}, (p, g, rods) => person(p, g, { x: 150 + k * 190, y: baseY + (k % 2) * 6, s: 0.62, dir: 1, step: 0, arm: 0.5 + 0.25 * Math.sin(t * 9 + k * 2), noRods: false }, rods));
      pup(st, {}, (p) => { p.fillStyle = INK; for (let k = 0; k < 7; k++) { const t0 = 7.5 + k * 0.55; if (t > t0) { const u = t - t0, x = 740 + (k % 3) * 18 - u * 30, y = 440 + u * u * 260; if (y < 640) { dot(p, x, y, 6.4); cut(p, () => dot(p, x, y, 2.4)); } } } });
    } else {                                                 // the chest opens
      const rise = EO(sm(11.9, 12.5, t));
      pup(st, { }, (p, g, rods) => {
        if (open > 0.05) { const gg = g.createRadialGradient(660, 330, 0, 660, 330, 520); gg.addColorStop(0, `rgba(255,190,70,${0.75 * open})`); gg.addColorStop(1, 'rgba(255,190,70,0)'); g.fillStyle = gg; g.fillRect(0, 0, W, Hh); }
        hanu(p, g, { x: 640, y: baseY + 20, s: 1.13, dir: 1, t, head: -0.05 * open, a1: 0.35 * open, a2: -0.3, b1: 0.5 * open, b2: 0.2, chest: open, gada: false }, rods);
      });
    }
    stage(st, t);
    if (t > 3.6 && t < 7.3) nearFern(st, t, -1, 0.55);
    end(ctx, st, t);
    ctx.restore();
  }
  const HFONT = '"Tiro Devanagari Hindi", "IM Fell English", serif';
  const HCAPS = [[0.35, 'हनुमान जी ने,'], [1.7, 'अपना *सीना* क्यों चीरा?'], [3.9, 'सीता माँ ने,'], [5.0, 'उन्हें *मोतियों की माला* दी।'], [7.4, 'हनुमान जी,'], [8.5, 'हर *मोती* तोड़कर'], [9.7, 'देखने लगे।'], [11.16, '*सीना* खोला,'], [12.8, 'तो भीतर,'], [13.6, '*राम और सीता* बसे थे।']];
  function hcap(ctx, t) {
    let i = -1; for (let k = 0; k < HCAPS.length; k++) if (t >= HCAPS[k][0]) i = k; if (i < 0 || t > 15.4) return;
    const dt = t - HCAPS[i][0], raw = HCAPS[i][1].split(' '); let on = false; const words = raw.map((w) => { if (w.startsWith('*')) on = true; const o = { w: w.replace(/\*/g, ''), hot: on }; if (w.endsWith('*') || /\*[.,?]*$/.test(w)) on = false; return o; });
    ctx.save(); ctx.font = `64px ${HFONT}`; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
    const sp = ctx.measureText(' ').width, tot = words.reduce((a, x) => a + (x.wd = ctx.measureText(x.w).width), 0) + sp * (words.length - 1);
    const s = 0.88 + 0.12 * H.ease.back(cl(dt / 0.16)); ctx.translate(HV.W / 2, HV.SY + 608 + 230); ctx.scale(s, s); ctx.globalAlpha = cl(dt / 0.06);
    let x = -tot / 2; for (const w of words) { ctx.lineWidth = 12; ctx.strokeStyle = '#140803'; ctx.strokeText(w.w, x, 0); ctx.fillStyle = w.hot ? '#ffb347' : '#fff4e2'; ctx.fillText(w.w, x, 0); x += w.wd + sp; }
    ctx.restore();
  }
  function hhook(ctx, t) {
    ctx.save(); ctx.globalAlpha = cl(t / 0.5); ctx.textAlign = 'center'; ctx.shadowColor = 'rgba(255,150,60,0.55)'; ctx.shadowBlur = 24; ctx.fillStyle = '#ffcf7a';
    ctx.font = `104px ${HFONT}`; ctx.fillText('हनुमान जी ने', HV.W / 2, HV.SY - 230); ctx.fillText('सीना क्यों चीरा?', HV.W / 2, HV.SY - 90);
    ctx.shadowBlur = 0; ctx.fillStyle = '#c79a66'; ctx.font = `40px ${HFONT}`; ctx.fillText('लोककथाओं के अनुसार', HV.W / 2, HV.SY - 30);
    ctx.restore();
  }
  function hreel(ctx, t) {
    const S = lay('stage', 1280, 720), sx = S.getContext('2d'); hframe(sx, 1280, 720, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
    const g = ctx.createLinearGradient(0, 0, 0, HV.H); g.addColorStop(0, '#120703'); g.addColorStop(0.34, '#1e0d05'); g.addColorStop(0.66, '#1e0d05'); g.addColorStop(1, '#0d0502'); ctx.fillStyle = g; ctx.fillRect(0, 0, HV.W, HV.H);
    ctx.drawImage(S, 0, HV.SY, HV.W, 608); hhook(ctx, t); hcap(ctx, t);
    ctx.save(); ctx.font = `30px ${HFONT}`; ctx.fillStyle = 'rgba(244,227,196,0.5)'; ctx.textAlign = 'right'; ctx.fillText('SANATAN DHARM', HV.W - 48, HV.H - 96); ctx.restore();
  }
  const hctx = document.getElementById('cv').getContext('2d');
  window.seek = (t) => hreel(hctx, cl(t, 0, HD));
  window.DURATION = HD;
  (async () => { try { await document.fonts.load(`64px ${HFONT}`, 'हनुमान'); await document.fonts.ready; } catch (e) {} window.seek(3); window.READY = true; })();
