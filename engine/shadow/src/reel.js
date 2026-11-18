  // ===== generic reel wrapper: STORY = {HD, CAPS, HOOK:[l1,l2], draw(st,t,W,Hh,baseY)->{dark,flash,glow}} =====
  const HV = { W: 1080, H: 1920, SY: (1920 - 608) / 2 };
  const HFONT = '"Tiro Devanagari Hindi", "IM Fell English", serif';
  const HTJ = JSON.parse(window.HT_JSON);
  if (!STORY.CAPS) {
    STORY.CAPS = []; const hot = new Set(STORY.HOT || []);
    for (const l of HTJ.lines) {
      let segs = l.text.split(/(?<=[,।?!….])\s*/).filter((x) => x.trim()); const out = [];
      for (const sg of segs) { const w = sg.split(' '); if (sg.length > 30 && w.length > 3) { const h = Math.ceil(w.length / 2); out.push(w.slice(0, h).join(' '), w.slice(h).join(' ')); } else out.push(sg); }
      const tot = out.reduce((a, x) => a + x.length, 0); let acc = 0;
      for (const sg of out) { const t0 = l.start + (l.end - l.start) * acc / tot; acc += sg.length;
        STORY.CAPS.push([t0, sg.split(' ').map((w) => (hot.has(w.replace(/[,।?!…."]/g, '')) ? '*' + w + '*' : w)).join(' ')]); }
    }
  }
  function hframe(ctx, W, Hh, t) {
    const st = begin(W, Hh); const baseY = 618;
    const r = STORY.draw(st, t, W, Hh, baseY, true) || {};   // first pass only to read lamp params
    ctx.save();
    const sh = r.shake ? Math.sin((t - r.shake[0]) * 90) * 8 * Math.max(0, 1 - (t - r.shake[0]) / 0.6) * (t > r.shake[0] && t < r.shake[0] + 0.6 ? 1 : 0) : (t < 0.7 ? Math.sin(t * 70) * 6 * (1 - t / 0.7) : 0);
    if (Math.abs(sh) > 0.05) { ctx.translate(W / 2 + sh, Hh / 2 + sh * 0.4); ctx.scale(1.02, 1.02); ctx.translate(-W / 2, -Hh / 2); }
    const b = sm(0, 0.6, t) * (0.92 + 0.08 * Math.sin(t * 7)) * (1 - 0.85 * (r.dark || 0)) + (r.flash || 0) * 0.9;
    lamp(ctx, W, Hh, t, b, (r.flash || 0) * 0.6);
    if (!r.noPalace) palaceBack(st, t, 0.6, 3);
    STORY.draw(st, t, W, Hh, baseY, false);
    stage(st, t); end(ctx, st, t); ctx.restore();
  }
  function hcap(ctx, t) {
    const C = STORY.CAPS; let i = -1; for (let k = 0; k < C.length; k++) if (t >= C[k][0]) i = k; if (i < 0 || t > STORY.HD - 0.3) return;
    const dt = t - C[i][0], raw = C[i][1].split(' '); let on = false; const words = raw.map((w) => { if (w.startsWith('*')) on = true; const o = { w: w.replace(/\*/g, ''), hot: on }; if (/\*[.,?!।]*$/.test(w)) on = false; return o; });
    ctx.save(); ctx.font = `64px ${HFONT}`; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
    const sp = ctx.measureText(' ').width, tot = words.reduce((a, x) => a + (x.wd = ctx.measureText(x.w).width), 0) + sp * (words.length - 1);
    const s = 0.88 + 0.12 * H.ease.back(cl(dt / 0.16)); ctx.translate(HV.W / 2, HV.SY + 608 + 230); ctx.scale(s, s); ctx.globalAlpha = cl(dt / 0.06);
    let x = -tot / 2; for (const w of words) { ctx.lineWidth = 12; ctx.strokeStyle = '#140803'; ctx.strokeText(w.w, x, 0); ctx.fillStyle = w.hot ? '#ffb347' : '#fff4e2'; ctx.fillText(w.w, x, 0); x += w.wd + sp; }
    ctx.restore();
  }
  function hhook(ctx, t) {
    ctx.save(); ctx.globalAlpha = cl(t / 0.5); ctx.textAlign = 'center'; ctx.shadowColor = 'rgba(255,150,60,0.55)'; ctx.shadowBlur = 24; ctx.fillStyle = '#ffcf7a';
    ctx.font = `104px ${HFONT}`; ctx.fillText(STORY.HOOK[0], HV.W / 2, HV.SY - 230); ctx.fillText(STORY.HOOK[1], HV.W / 2, HV.SY - 90);
    ctx.shadowBlur = 0; ctx.fillStyle = '#c79a66'; ctx.font = `40px ${HFONT}`; ctx.fillText(STORY.TAG || 'लोककथाओं के अनुसार', HV.W / 2, HV.SY - 30);
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
  window.seek = (t) => hreel(hctx, cl(t, 0, STORY.HD));
  window.DURATION = STORY.HD;
  (async () => { try { await document.fonts.load(`64px ${HFONT}`, 'हनुमान'); await document.fonts.ready; } catch (e) {} window.seek(3); window.READY = true; })();
