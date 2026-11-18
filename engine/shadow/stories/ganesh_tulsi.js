  const STORY = {
    HD: 47.1, HOOK: ['गणेश जी पर', 'तुलसी क्यों मना?'], TAG: 'पुराणों की मान्यता के अनुसार',
    HOT: ['गणेश', 'तुलसी', 'श्राप', 'विवाह', 'असुर', 'पौधा', 'विष्णु', 'नहीं', 'मना', 'क्रोध'],
    draw(st, t, W, Hh, by) {
      const R = {};
      if (t < 5.85) {                                                   // hook: Ganesh refuses, tulsi glows
        pup(st, {}, (p, g) => tulsiPlant(p, g, { x: 330, y: by, s: 1.25, t, glow: 0.8 + 0.2 * Math.sin(t * 3) }));
        pup(st, {}, (p, g, rods) => godP(p, g, { kind: 'ganesh', x: 880, y: by + 10, s: 0.86, dir: -1, t, arm: -1.3, arm2: -1.4 }, rods));
        pup(st, {}, (p) => xmark(p, 600, 250, 70, EO(sm(2.4, 3.2, t))));
      } else if (t < 12.3) {                                            // Tulsi meditates at Ganga
        const sun = sm(5.9, 12, t);
        pup(st, {}, (p, g) => { p.fillStyle = INK; p.beginPath(); p.arc(900, by - 120 - sun * 40, 60, 0, TAU); p.fill(); const gg = g.createRadialGradient(900, by - 140, 0, 900, by - 140, 260); gg.addColorStop(0, 'rgba(255,170,60,0.8)'); gg.addColorStop(1, 'rgba(255,170,60,0)'); g.fillStyle = gg; g.fillRect(500, 0, 780, 720); });
        pup(st, {}, (p, g, rods) => sitaP(p, g, { x: 500, y: by - 10, s: 0.95, dir: 1, t, arm: -0.05, neck: 0 }, rods));
        pup(st, {}, (p) => waves(p, W, by + 30, t, 4));
      } else if (t < 18.07) {                                           // she offers the garland to meditating Ganesh
        const ent = EO(sm(12.4, 14.6, t));
        pup(st, {}, (p, g, rods) => godP(p, g, { kind: 'ganesh', x: 880, y: by + 10, s: 0.86, dir: -1, t, arm: -0.1, arm2: -0.2 }, rods));
        pup(st, {}, (p, g, rods) => sitaP(p, g, { x: lerp(-100, 400, ent), y: by - 10, s: 0.95, dir: 1, t, arm: -1.15 + 0.08 * Math.sin(t * 2), neck: 1 }, rods));
      } else if (t < 21.89) {                                           // Ganesh folds hands, she steps back
        const bk = EIO(sm(19.5, 21.5, t));
        pup(st, {}, (p, g, rods) => godP(p, g, { kind: 'ganesh', x: 880, y: by + 10, s: 0.86, dir: -1, t, arm: -0.9, arm2: -1.3 }, rods));
        pup(st, {}, (p, g, rods) => sitaP(p, g, { x: lerp(400, 250, bk), y: by - 10, s: 0.95, dir: 1, t, arm: -0.6, neck: bk < 0.5 ? 1 : 0 }, rods));
      } else if (t < 27.39) {                                           // her curse
        pup(st, {}, (p, g, rods) => godP(p, g, { kind: 'ganesh', x: 900, y: by + 10, s: 0.86, dir: -1, t, arm: 0.2, arm2: 0 }, rods));
        pup(st, {}, (p, g, rods) => sitaP(p, g, { x: 320, y: by - 10, s: 0.95, dir: 1, t, arm: -1.5 + 0.1 * Math.sin(t * 10), neck: 0 }, rods));
        R.flash = t > 23.3 ? Math.exp(-(t - 23.3) * 3) * 0.7 : 0; R.shake = [23.3];
        pup(st, {}, (p) => { if (t > 24.5) { for (let k = 0; k < 2; k++) { p.fillStyle = INK; p.beginPath(); p.arc(600 + k * 90, 150 + Math.sin(t * 4 + k) * 8, 22, 0, TAU); p.fill(); cut(p, () => { p.fillStyle = INK; p.font = '30px serif'; p.fillText(k ? '2' : '1', 593 + k * 90, 160); }); } } });
      } else if (t < 32.25) {                                           // Ganesh answers
        pup(st, {}, (p, g, rods) => godP(p, g, { kind: 'ganesh', x: 900, y: by + 10, s: 0.9, dir: -1, t, arm: -1.4, arm2: -0.8 }, rods));
        pup(st, {}, (p, g, rods) => sitaP(p, g, { x: 300, y: by - 10, s: 0.95, dir: 1, t, arm: -0.3, neck: 0 }, rods));
        R.flash = t > 27.5 ? Math.exp(-(t - 27.5) * 3) * 0.6 : 0; R.shake = [27.5];
      } else if (t < 38.44) {                                           // she weeps and becomes a plant
        const tr = EIO(sm(34.5, 37.0, t));
        pup(st, { alpha: 1 - tr }, (p, g, rods) => sitaP(p, g, { x: 450, y: by - 10, s: 0.95, dir: 1, t, arm: -0.1, neck: 0, noRods: true }, rods));
        pup(st, { alpha: 1 - tr }, (p) => { p.fillStyle = INK; for (let k = 0; k < 4; k++) { const u = ((t - 32.5) * 0.9 + k / 4) % 1; dot(p, 470, 320 + u * 200, 5); } });
        pup(st, {}, (p, g) => tulsiPlant(p, g, { x: 450, y: by + 8, s: 1.25 * tr, t, glow: tr }));
        pup(st, {}, (p, g, rods) => godP(p, g, { kind: 'ganesh', x: 960, y: by + 10, s: 0.8, dir: -1, t, arm: -0.2, arm2: -0.2 }, rods));
      } else if (t < 42.2) {                                            // dear to Vishnu
        pup(st, {}, (p, g) => tulsiPlant(p, g, { x: 330, y: by + 8, s: 1.25, t, glow: 1 }));
        pup(st, {}, (p, g, rods) => godP(p, g, { kind: 'vishnu', x: 800, y: by + 20, s: 0.82, dir: -1, t, arm: -0.6, arm2: -0.8 }, rods));
        R.flash = t > 38.5 ? Math.exp(-(t - 38.5) * 3) * 0.4 : 0;
      } else {                                                          // but not in Ganesh's puja
        const k = EO(sm(42.4, 43.2, t));
        pup(st, {}, (p, g) => tulsiPlant(p, g, { x: 400, y: by + 8, s: 1.1, t, glow: 0.5 }));
        pup(st, {}, (p) => xmark(p, 400, 300, 170, k));
        pup(st, {}, (p, g, rods) => godP(p, g, { kind: 'ganesh', x: 860, y: by + 10, s: 0.9, dir: -1, t, arm: -1.2, arm2: -1.0 }, rods));
        R.flash = t > 42.4 ? Math.exp(-(t - 42.4) * 4) * 0.5 : 0; R.shake = [42.4];
      }
      return R;
    },
  };
