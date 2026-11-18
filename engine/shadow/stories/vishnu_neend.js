  const STORY = {
    HD: 47.2, HOOK: ['भगवान 4 महीने', 'क्यों सोते हैं?'], TAG: 'पुराणों की मान्यता के अनुसार',
    HOT: ['चार', 'सोते', 'योगनिद्रा', 'चातुर्मास', 'शिव', 'शुभ', 'कार्तिक', 'जागो', 'देवा!', 'देवा,', 'जागते', 'देवउठनी'],
    draw(st, t, W, Hh, by) {
      const R = {};
      if (t < 5.4) {                                                    // hook: Vishnu standing, glowing
        const z = 1.0 + 0.04 * sm(0, 5, t);
        pup(st, {}, (p, g, rods) => { const gg = g.createRadialGradient(660, 300, 0, 660, 300, 420); gg.addColorStop(0, 'rgba(255,200,90,0.55)'); gg.addColorStop(1, 'rgba(255,200,90,0)'); g.fillStyle = gg; g.fillRect(0, 0, W, Hh);
          godP(p, g, { kind: 'vishnu', x: 640, y: by + 20, s: 0.86 * z, dir: 1, t, arm: -0.35, arm2: -0.5 }, rods); });
      } else if (t < 12.8) {                                            // asleep on Sheshnag
        const zoom = 1 + 0.08 * sm(5.4, 12.8, t);
        pup(st, {}, (p, g) => { vishnuSleep(p, g, { x: 640, y: by - 40, s: 1.05 * zoom, t, glow: 0.4 }); });
        pup(st, {}, (p) => waves(p, W, by + 20, t));
        if (t > 8) pup(st, {}, (p) => { p.fillStyle = INK; p.font = '64px serif'; for (let k = 0; k < 3; k++) { const u = ((t - 8) * 0.4 + k / 3) % 1; p.globalAlpha = 1 - u; p.fillText('Z', 840 + u * 80 + k * 12, 300 - u * 160); } p.globalAlpha = 1; });
      } else if (t < 17.6) {                                            // four moons = four months
        pup(st, {}, (p, g) => vishnuSleep(p, g, { x: 640, y: by - 40, s: 0.9, t, glow: 0.3 }));
        pup(st, {}, (p) => waves(p, W, by + 20, t));
        pup(st, {}, (p, g) => { for (let k = 0; k < 4; k++) { const a = EO(sm(12.9 + k * 1.1, 13.4 + k * 1.1, t)); if (a < 0.02) continue; const x = 330 + k * 200, y = 130; p.fillStyle = INK; p.beginPath(); p.arc(x, y, 46 * a, 0, TAU); p.fill(); cut(p, () => { p.beginPath(); p.arc(x + 20, y - 6, 38 * a, 0, TAU); p.fill(); }); g.fillStyle = `rgba(255,210,120,${0.5 * a})`; g.beginPath(); p.arc(x, y, 0, 0, 1); g.arc(x, y, 60 * a, 0, TAU); g.fill(); } });
      } else if (t < 22.3) {                                            // Shiva's trident takes charge
        const a = EO(sm(17.6, 18.5, t));
        pup(st, {}, (p, g) => { p.fillStyle = INK; p.strokeStyle = INK; p.lineWidth = 12; p.lineCap = 'round'; const x = 720, top = 40 + 20 * (1 - a);
          p.beginPath(); p.moveTo(x, top + 70); p.lineTo(x, by); p.stroke(); p.lineWidth = 9; p.beginPath(); p.moveTo(x - 60, top + 40); p.quadraticCurveTo(x - 60, top + 120, x, top + 120); p.quadraticCurveTo(x + 60, top + 120, x + 60, top + 40); p.stroke();
          for (const dx of [-60, 0, 60]) { p.beginPath(); p.moveTo(dx + x - 10, top + 50); p.lineTo(dx + x, top - (dx ? 0 : 30)); p.lineTo(dx + x + 10, top + 50); p.fill(); }
          p.beginPath(); p.ellipse(x - 90, by - 280, 16, 34, 0.2, 0, TAU); p.fill(); const gg = g.createRadialGradient(x, top + 40, 0, x, top + 40, 300); gg.addColorStop(0, `rgba(200,220,255,${0.6 * a})`); gg.addColorStop(1, 'rgba(200,220,255,0)'); g.fillStyle = gg; g.fillRect(0, 0, W, Hh); });
        pup(st, {}, (p, g) => vishnuSleep(p, g, { x: 320, y: by - 40, s: 0.6, t, glow: 0.2 }));
        pup(st, {}, (p) => waves(p, W, by + 20, t, 3));
      } else if (t < 26.85) {                                           // weddings pause
        const k = EIO(sm(23.6, 25.0, t));
        pup(st, {}, (p, g, rods) => sitaP(p, g, { x: 400, y: by, s: 0.9, dir: 1, t, arm: -0.9, neck: 0 }, rods));
        pup(st, {}, (p, g, rods) => person(p, g, { x: 820, y: by, s: 0.62, dir: -1, step: 0, arm: 0.3 }, rods));
        pup(st, {}, (p) => xmark(p, 620, 260, 150, k));
        pup(st, {}, (p) => diyaRow(p, p, 200, 1000, 120, t, 0));
      } else if (t < 32.5) {                                            // conch, bells, Vishnu rises
        const rise = EO(sm(26.85, 28.2, t));
        pup(st, {}, (p, g, rods) => { const gg = g.createRadialGradient(640, 330, 0, 640, 330, 520); gg.addColorStop(0, `rgba(255,200,80,${0.7 * rise})`); gg.addColorStop(1, 'rgba(255,200,80,0)'); g.fillStyle = gg; g.fillRect(0, 0, W, Hh);
          godP(p, g, { kind: 'vishnu', x: 640, y: by + 20, s: 0.86, dir: 1, t, arm: -0.2 - 0.5 * rise, arm2: -0.9 * rise }, rods); });
        pup(st, {}, (p) => rings(p, 880, 220, t, 28.5));
        R.flash = t > 27 ? Math.exp(-(t - 27) * 3) * 0.7 : 0; R.shake = [27.0];
      } else if (t < 36.1) {                                            // devotees sing
        for (let k = 0; k < 4; k++) pup(st, {}, (p, g, rods) => person(p, g, { x: 220 + k * 280, y: by + (k % 2) * 8, s: 0.6, dir: k < 2 ? 1 : -1, step: 0, arm: -2.4 + 0.3 * Math.sin(t * 6 + k) }, rods));
        pup(st, {}, (p, g) => { for (let k = 0; k < 14; k++) { const u = ((t - 32.5) * 0.5 + k / 14) % 1, x = 120 + k * 80 + Math.sin(k) * 20, y = 520 - u * 420; g.fillStyle = `rgba(255,200,80,${0.9 * (1 - u)})`; g.beginPath(); g.arc(x, y, 4, 0, TAU); g.fill(); } });
      } else if (t < 41.2) {                                            // wakes in full glow
        const o = EO(sm(36.1, 37.4, t));
        pup(st, {}, (p, g) => vishnuSleep(p, g, { x: 640, y: by - 40 - 40 * o, s: 1.05, t, glow: 1 }));
        pup(st, {}, (p) => waves(p, W, by + 20, t));
        R.flash = t > 36.4 ? Math.exp(-(t - 36.4) * 2.5) * 0.6 : 0; R.shake = [36.4];
      } else {                                                          // weddings resume, diyas
        const a = EO(sm(41.3, 42.3, t));
        pup(st, {}, (p, g, rods) => sitaP(p, g, { x: 400, y: by, s: 0.9, dir: 1, t, arm: -0.9, neck: 1 }, rods));
        pup(st, {}, (p, g, rods) => person(p, g, { x: 820, y: by, s: 0.62, dir: -1, step: 0, arm: 0.3 }, rods));
        pup(st, {}, (p, g) => diyaRow(p, g, 200, 1000, by - 10, t, a));
        pup(st, {}, (p, g) => diyaRow(p, g, 200, 1000, 110, t, a));
      }
      return R;
    },
  };
