  // ===== frame2: generic reel driver. The story file defines STY = {hook:[l1,l2], hl:[gold words], scenes:[{at:[lineIdx,frac]|sec, fn(st,t,u,v)}], payoff:[li,frac], ev:[[li,frac,name,amp]], fern:bool} =====
  const HV = { W: 1080, H: 1920, SY: (1920 - 608) / 2 };
  const HT = JSON.parse(window.HT_JSON), LN = HT.lines;
  const lineT = (a) => (typeof a === 'number' ? a : LN[a[0]].start + (a[1] || 0) * (LN[a[0]].end - LN[a[0]].start));
  const HD = Math.min(57.4, LN[LN.length - 1].end + 0.9);
  const SCT = STY.scenes.map((s) => lineT(s.at));
  const TP = STY.payoff ? lineT(STY.payoff) : 1e9;
  const BY = 618;
  const sceneAt = (t) => { let i = 0; for (let k = 0; k < SCT.length; k++) if (t >= SCT[k]) i = k; return i; };
  function hframe(ctx, W, Hh, t) {
    const st = begin(W, Hh), i = sceneAt(t), t0 = SCT[i], t1 = i + 1 < SCT.length ? SCT[i + 1] : HD, u = t - t0, v = cl(u / Math.max(0.1, t1 - t0));
    const blink = i > 0 ? 0.5 + 0.5 * sm(0, 0.22, u) : 1;
    const flare = t > TP ? Math.exp(-(t - TP) * 2.2) * 0.4 : 0;
    let b = (0.6 + 0.4 * sm(0, 0.4, t)) * (0.92 + 0.08 * Math.sin(t * 7)) * blink;
    ctx.save();
    let sh = 0; if (t < 0.9) sh = Math.sin(t * 70) * 6 * (1 - t / 0.9); if (t > TP && t < TP + 0.6) sh = Math.sin((t - TP) * 80) * 7 * (1 - (t - TP) / 0.6);
    const zs = 1.0 + 0.045 * v + (Math.abs(sh) > 0.05 ? 0.02 : 0);
    ctx.translate(W / 2 + sh, Hh / 2 + sh * 0.4); ctx.scale(zs, zs); ctx.translate(-W / 2, -Hh / 2);
    lamp(ctx, W, Hh, t, b + flare * 0.3, flare);
    STY.scenes[i].fn(st, t, u, v, { i, t0, t1, flare });
    stage(st, t);
    if (STY.scenes[i].fern) nearFern(st, t, STY.scenes[i].fern, 0.55);
    end(ctx, st, t);
    ctx.restore();
  }
  const HFONT = '"Tiro Devanagari Hindi", "IM Fell English", serif';
  const CAPS = []; LN.forEach((l) => { const words = l.text.replace(/[।?]/g, (m) => m + ' ').split(/\s+/).filter(Boolean); const chunks = []; let cur = []; words.forEach((w) => { cur.push(w); const len = cur.join(' ').length; if (len >= 15 || /[।?!]$/.test(w) || (/,$/.test(w) && len >= 7)) { chunks.push(cur.join(' ')); cur = []; } }); if (cur.length) { if (chunks.length && cur.join(' ').length < 6) chunks[chunks.length - 1] += ' ' + cur.join(' '); else chunks.push(cur.join(' ')); }
    const tot = chunks.reduce((a, c) => a + c.length, 0); let tt = l.start; chunks.forEach((c) => { CAPS.push([tt, c, tt + (l.end - l.start) * c.length / tot]); tt += (l.end - l.start) * c.length / tot; }); });
  function hcap(ctx, t) {
    let i = -1; for (let k = 0; k < CAPS.length; k++) if (t >= CAPS[k][0]) i = k; if (i < 0 || t > HD - 0.2) return;
    const dt = t - CAPS[i][0], words = CAPS[i][1].split(' ').map((w) => ({ w, hot: (STY.hl || []).some((h) => w.indexOf(h) >= 0) }));
    ctx.save(); ctx.font = `66px ${HFONT}`; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
    const sp = ctx.measureText(' ').width, tot = words.reduce((a, x) => a + (x.wd = ctx.measureText(x.w).width), 0) + sp * (words.length - 1);
    const s = 0.88 + 0.12 * H.ease.back(cl(dt / 0.16)); ctx.translate(HV.W / 2, HV.SY + 608 + 230); ctx.scale(s, s); ctx.globalAlpha = cl(dt / 0.06);
    let x = -tot / 2; for (const w of words) { ctx.lineWidth = 12; ctx.strokeStyle = '#140803'; ctx.strokeText(w.w, x, 0); ctx.fillStyle = w.hot ? '#ffb347' : '#fff4e2'; ctx.fillText(w.w, x, 0); x += w.wd + sp; }
    ctx.restore();
  }
  function hhook(ctx, t) {
    ctx.save(); ctx.globalAlpha = (t > 5 ? 0.88 : 1); ctx.textAlign = 'center'; ctx.shadowColor = 'rgba(255,150,60,0.55)'; ctx.shadowBlur = 24; ctx.fillStyle = '#ffcf7a';
    ctx.font = `${STY.hookSize || 104}px ${HFONT}`; ctx.fillText(STY.hook[0], HV.W / 2, HV.SY - 230); ctx.fillText(STY.hook[1], HV.W / 2, HV.SY - 90);
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
  window.EVENTS = (() => { const e = [[0, 'boom'], [0, 'dhol', 0.6]]; SCT.forEach((x, k) => { if (k > 0) e.push([+(x - 0.1).toFixed(2), 'whoosh']); }); (STY.ev || []).forEach((x) => e.push([+lineT([x[0], x[1]]).toFixed(2), x[2], x[3]].filter((z) => z !== undefined))); if (STY.payoff) { e.push([TP, 'gong'], [TP, 'dhol', 0.8], [TP + 0.05, 'shimmer'], [TP, 'boom']); } return e; })();
  const hctx = document.getElementById('cv').getContext('2d');
  window.seek = (t) => hreel(hctx, cl(t, 0, HD));
  window.DURATION = HD;
  (async () => { try { await document.fonts.load(`64px ${HFONT}`, 'हनुमान'); await document.fonts.ready; } catch (e) {} window.seek(3); window.READY = true; })();
