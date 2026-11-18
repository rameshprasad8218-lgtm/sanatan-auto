  // ===== comic15: Hanuman eats the sun (comedy trial) =====
  const HV = { W: 1080, H: 1920, SY: (1920 - 608) / 2 };
  const HT = JSON.parse(window.HT_JSON);
  const HD = 17.2;
  function sunP(p, g, o) {
    const { x, y, r, t, shock } = o;
    p.fillStyle = INK; p.beginPath(); p.arc(x, y, r, 0, Math.PI * 2); p.fill();
    for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2 + t * 0.5; p.beginPath(); p.moveTo(x + Math.cos(a - 0.09) * r * 0.95, y + Math.sin(a - 0.09) * r * 0.95); p.lineTo(x + Math.cos(a) * r * 1.38, y + Math.sin(a) * r * 1.38); p.lineTo(x + Math.cos(a + 0.09) * r * 0.95, y + Math.sin(a + 0.09) * r * 0.95); p.fill(); }
    cut(p, () => { for (const s of [-1, 1]) { p.beginPath(); p.ellipse(x + s * r * 0.36, y - r * 0.12, r * 0.17, r * (0.17 + 0.1 * shock), 0, 0, 7); p.fill(); } p.beginPath(); p.ellipse(x, y + r * 0.42, r * (0.14 + 0.12 * shock), r * (0.1 + 0.2 * shock), 0, 0, 7); p.fill(); });
    const gg = g.createRadialGradient(x, y, 0, x, y, r * 1.7); gg.addColorStop(0, 'rgba(255,170,40,0.95)'); gg.addColorStop(1, 'rgba(255,120,20,0)'); g.fillStyle = gg; g.fillRect(x - r * 2, y - r * 2, r * 4, r * 4);
  }
  function bolt(p, x, y, t) { p.fillStyle = INK; p.beginPath(); p.moveTo(x, y); p.lineTo(x + 60, y + 90); p.lineTo(x + 20, y + 100); p.lineTo(x + 90, y + 220); p.lineTo(x - 10, y + 130); p.lineTo(x + 30, y + 120); p.closePath(); p.fill(); }
  function hframe(ctx, W, Hh, t) {
    const st = begin(W, Hh); const baseY = 618;
    const dark = t > 7.4 && t < 9.7 ? 1 : 0;
    const flash = t > 10.0 ? Math.exp(-(t - 10.0) * 5) : 0;
    let b = sm(0, 0.6, t) * (0.92 + 0.08 * Math.sin(t * 7)) * (1 - 0.88 * dark) + flash * 0.9;
    ctx.save();
    const sh = t > 10.0 && t < 10.6 ? Math.sin((t - 10.0) * 90) * 9 * (1 - (t - 10) / 0.6) : (t < 0.7 ? Math.sin(t * 70) * 6 * (1 - t / 0.7) : 0);
    if (Math.abs(sh) > 0.05) { ctx.translate(W / 2 + sh, Hh / 2 + sh * 0.4); ctx.scale(1.02, 1.02); ctx.translate(-W / 2, -Hh / 2); }
    lamp(ctx, W, Hh, t, b, flash * 0.6);
    palaceBack(st, t, 0.6, 3);
    if (t < 4.8) {                                              // HOOK: baby Hanuman drools at the "mango"
      const pop = EO(sm(0, 0.5, t));
      pup(st, {}, (p, g) => sunP(p, g, { x: 900, y: 210, r: 70 * pop, t, shock: 0 }));
      pup(st, {}, (p, g, rods) => hanu(p, g, { x: 420, y: baseY, s: 0.78, dir: 1, t, head: -0.18 + 0.05 * Math.sin(t * 6), a1: -1.25, a2: -0.5, gada: false }, rods));
      pup(st, {}, (p) => { p.fillStyle = INK; for (let k = 0; k < 3; k++) { const u = (t * 1.3 + k / 3) % 1; dot(p, 520 + k * 3, 420 + u * 180, 5); } });
    } else if (t < 7.0) {                                       // sun shocked, Hanuman jumps
      const j = EIO(sm(5.0, 6.9, t));
      pup(st, {}, (p, g) => sunP(p, g, { x: lerp(900, 640, j), y: lerp(210, 250, j), r: 110, t, shock: 1 }));
      pup(st, {}, (p, g, rods) => hanu(p, g, { x: lerp(420, 600, j), y: lerp(baseY, 330, j) - Math.sin(j * Math.PI) * 90, s: 0.78, dir: 1, t, head: -0.3, a1: -1.5, a2: -1.2, gada: false }, rods));
    } else if (t < 9.7) {                                       // GULP, darkness
      const sh2 = 1 - EIO(sm(7.0, 7.6, t));
      pup(st, {}, (p, g) => { if (sh2 > 0.02) sunP(p, g, { x: 660, y: 280, r: 110 * sh2, t, shock: 1 }); });
      pup(st, {}, (p, g, rods) => hanu(p, g, { x: 640, y: 330 + 280 * sm(8.0, 9.2, t), s: 0.78, dir: 1, t, head: -0.2, a1: -0.4, a2: -0.4, gada: false }, rods));
      pup(st, {}, (p, g) => { g.fillStyle = 'rgba(255,200,90,0.9)'; for (let k = 0; k < 10; k++) { const x = 100 + k * 120 + (k % 3) * 30, y = 90 + (k * 53) % 200; if (dark) { g.beginPath(); g.arc(x, y, 3 + 2 * Math.sin(t * 5 + k), 0, 7); g.fill(); } } });
    } else if (t < 13.7) {                                      // Indra's vajra, chin swells
      const fall = EIO(sm(10.2, 11.4, t));
      pup(st, {}, (p) => { if (t > 9.9 && t < 10.7) bolt(p, 700, 40, t); });
      pup(st, {}, (p, g, rods) => {
        hanu(p, g, { x: 600, y: baseY + 10, s: 0.8, dir: 1, t, head: 0.35 * fall + 0.04 * Math.sin(t * 9), a1: 0.6, a2: 0.6, gada: false }, rods);
        const sw = EO(sm(10.4, 12.0, t)); if (sw > 0.02) { p.fillStyle = INK; p.beginPath(); p.arc(640, 300, 70 * sw, 0, 7); p.fill(); }
      });
    } else {                                                    // payoff
      const bounce = Math.sin((t - 13.7) * 6) * 5;
      pup(st, {}, (p, g, rods) => {
        const gg = g.createRadialGradient(640, 330, 0, 640, 330, 500); gg.addColorStop(0, 'rgba(255,190,70,0.6)'); gg.addColorStop(1, 'rgba(255,190,70,0)'); g.fillStyle = gg; g.fillRect(0, 0, W, Hh);
        hanu(p, g, { x: 640, y: baseY + 20 + bounce, s: 1.12, dir: 1, t, head: -0.05, a1: -0.4, a2: -0.5, gada: true, gadaA: 0.1 }, rods);
      });
    }
    stage(st, t);
    end(ctx, st, t);
    ctx.restore();
  }
  const HFONT = '"Tiro Devanagari Hindi", "IM Fell English", serif';
  const HCAPS = [[0.4, 'छोटे हनुमान को लगी *भूख*,'], [2.4, 'सामने दिखा, इतना बड़ा *आम*!'], [4.85, 'पर वो आम नहीं,'], [5.9, '*सूरज* था!'], [7.0, '*गप्प!*'], [7.9, 'सारी दुनिया में *अंधेरा!*'], [9.6, 'इंद्र ने *वज्र* मारा,'], [11.2, 'ठन! ठुड्डी *सूज* गई!'], [13.75, 'इसीलिए नाम पड़ा,'], [15.0, '*हनुमान!*']];
  function hcap(ctx, t) {
    let i = -1; for (let k = 0; k < HCAPS.length; k++) if (t >= HCAPS[k][0]) i = k; if (i < 0 || t > 16.9) return;
    const dt = t - HCAPS[i][0], raw = HCAPS[i][1].split(' '); let on = false; const words = raw.map((w) => { if (w.startsWith('*')) on = true; const o = { w: w.replace(/\*/g, ''), hot: on }; if (/\*[.,?!]*$/.test(w)) on = false; return o; });
    ctx.save(); ctx.font = `64px ${HFONT}`; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
    const sp = ctx.measureText(' ').width, tot = words.reduce((a, x) => a + (x.wd = ctx.measureText(x.w).width), 0) + sp * (words.length - 1);
    const s = 0.88 + 0.12 * H.ease.back(cl(dt / 0.16)); ctx.translate(HV.W / 2, HV.SY + 608 + 230); ctx.scale(s, s); ctx.globalAlpha = cl(dt / 0.06);
    let x = -tot / 2; for (const w of words) { ctx.lineWidth = 12; ctx.strokeStyle = '#140803'; ctx.strokeText(w.w, x, 0); ctx.fillStyle = w.hot ? '#ffb347' : '#fff4e2'; ctx.fillText(w.w, x, 0); x += w.wd + sp; }
    ctx.restore();
  }
  function hhook(ctx, t) {
    ctx.save(); ctx.globalAlpha = cl(t / 0.5); ctx.textAlign = 'center'; ctx.shadowColor = 'rgba(255,150,60,0.55)'; ctx.shadowBlur = 24; ctx.fillStyle = '#ffcf7a';
    ctx.font = `104px ${HFONT}`; ctx.fillText('हनुमान जी ने', HV.W / 2, HV.SY - 230); ctx.fillText('सूरज खा लिया!', HV.W / 2, HV.SY - 90);
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
