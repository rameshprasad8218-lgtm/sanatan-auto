import json,sys,re
P='parts/'
jy=open(P+'jyot1_30.js').read().split('\n'); ja=open(P+'jatayu1_30.js').read().split('\n'); ku=open(P+'kumbh1_30.js').read().split('\n')
idx=[i for i,l in enumerate(jy) if l.startswith('  function sA')][0]
header='\n'.join(jy[:idx])+'\n'+'\n'.join(ja[32:36])+'\n'+'\n'.join(ku[27:30])+'\n'+'\n'.join(ku[32:35])+'\n'
KIT=r'''
  const PAL = { night: ['#0d1230', '#2f3f7a'], dusk: ['#1a2050', '#e0904a'], dawn: ['#3a2a5a', '#f0a860'], gold: ['#4a2a58', '#f0a860'], ember: ['#2a0e0e', '#c8452a'], snow: ['#1a2a5a', '#9ab4e6'], green: ['#10301e', '#5aa86a'], sea: ['#0d2a4a', '#4a9ac0'], day: ['#3a78c8', '#cfe8ff'], purple: ['#1a1038', '#6a3a8a'] };
  const SADHU = { skin: '#cdb8a6', cloth: '#d9892b', cloth2: '#c9741c', cloth3: 'rgba(0,0,0,0.15)', head: { hair: 'jata', hc: '#2a1a14', tilak: true, smile: 0.35, post: (c, r) => zbeard(c, r, '#d8d2c8') } };
  const NAGA = { skin: '#bdb0a4', cloth: '#a89684', cloth2: '#8a7a6a', cloth3: 'rgba(0,0,0,0.15)', head: { hair: 'jata', hc: '#2a1a14', tilak: true, smile: 0.2, brow: 0.08, post: (c, r) => zbeard(c, r, '#2a1a14') } };
  const DEVI = { skin: '#e0a574', cloth: '#c63b6a', cloth2: '#f2c14a', cloth3: 'rgba(255,255,255,0.2)', head: { hair: 'bun', hc: '#1d1411', earring: true, smile: 0.5, crown: true } };
  const URM = { skin: '#dba070', cloth: '#3a8a7a', cloth2: '#f2c14a', cloth3: 'rgba(255,255,255,0.2)', head: { hair: 'bun', hc: '#1d1411', earring: true, smile: 0.4 } };
  const KAR = { skin: '#d6a074', cloth: '#c9a028', cloth2: '#f1e3c0', cloth3: 'rgba(0,0,0,0.15)', head: { hair: 'bun', hc: '#14101a', crown: true, tilak: true, earring: true, smile: 0.2 } };
  const KUM = { skin: '#7a5a4a', cloth: '#6a2a2a', cloth2: '#4a3a3a', cloth3: 'rgba(0,0,0,0.2)', head: { hair: 'bun', hc: '#111', crown: true, brow: 0.2, wide: 0.2, smile: 0 } };
  const TRI = { skin: '#b98a66', cloth: '#6a5a8a', cloth2: '#4a3a6a', cloth3: 'rgba(255,255,255,0.15)', head: { hair: 'bun', hc: '#c9c9cf', old: true, smile: 0.3 } };
  const VIS = { skin: '#5b8fd1', cloth: '#f4cd4c', cloth2: '#f0e6c8', cloth3: 'rgba(200,60,60,0.4)', head: { hair: 'jata', hc: '#14101a', crown: true, tilak: true, earring: true, smile: 0.4 } };
  const BRH = { skin: '#d98a5a', cloth: '#f4f0e6', cloth2: '#f4f0e6', cloth3: 'rgba(0,0,0,0.1)', head: { hair: 'bun', hc: '#e6e6ea', old: true, tilak: true, smile: 0.3, post: (c, r) => zbeard(c, r, '#ecebef') } };
  const VIB = { skin: '#c98e62', cloth: '#2f6f8f', cloth2: '#f1e3c0', cloth3: 'rgba(255,255,255,0.18)', head: { hair: 'bun', hc: '#14101a', crown: true, tilak: true, earring: true, smile: 0.3 } };
  const BHM = { skin: '#6f6a58', cloth: '#4a1f3a', cloth2: '#8a5a2a', cloth3: 'rgba(0,0,0,0.2)', head: { hair: 'jata', hc: '#0d0a08', brow: 0.25, wide: 0.1, smile: 0, post: (c, r) => zbeard(c, r, '#1c1410') } };
  const RAVF = { skin: '#9a6a4a', cloth: '#7a1f1f', cloth2: '#e8b84a', cloth3: 'rgba(0,0,0,0.2)', head: { hair: 'bun', hc: '#111', crown: true, tilak: true, earring: true, brow: 0.25, smile: 0 } };
  const CH = { vib: VIB, bhm: BHM, rav10: RAVF, ind: IND, ram: RAM, lak: LAK, han: HAN, shv: SHV, vai: VAI, sadhu: SADHU, naga: NAGA, devi: DEVI, urm: URM, kar: KAR, kum: KUM, tri: TRI, vis: VIS, brh: BRH };
  function chFace(c, t, who, x, y, r, emo) { const p = CH[who]; zface(c, x, y, r, Object.assign({}, p.head, { skin: p.skin }, emo || {}, { blink: (emo && emo.blink != null) ? emo.blink : zblink(t, 0.5) })); }
  function bgK(c, t, k, sy) { const p = PAL[k] || PAL.night; zsky(c, t, p[0], p[1], 540, sy == null ? -700 : sy, 'rgba(255,220,150,0.5)'); if (k === 'night' || k === 'purple' || k === 'snow') zstars(c, t, 40); }
  function treesK(c, t, y, col, n, sc) { c.fillStyle = col; for (let i = 0; i < n; i++) { const x = i * (1180 / n) - 50 + Math.sin(t * 0.8 + i) * 4, h = (160 + (i * 53 % 90)) * sc; c.beginPath(); c.moveTo(x - 60 * sc, y); c.lineTo(x, y - h); c.lineTo(x + 60 * sc, y); c.closePath(); c.fill(); } }
  function land(c, t, k, col) {
    if (k === 'temple') { wave(c, t, 1380, '#14305a', 14); temple(c, 540, 1420, 1.5, col || '#2a1f3a'); wave(c, t + 1, 1500, '#0e2248', 18); }
    else if (k === 'mount') { zmount(c, 260, 1500, 2.0, col || '#3a3a5a', 0); zmount(c, 800, 1500, 2.4, '#2a2a48', 0); c.fillStyle = '#1a1a2c'; c.fillRect(0, 1480, 1080, 440); }
    else if (k === 'ghat') { for (let j = 0; j < 6; j++) { c.fillStyle = j % 2 ? '#5a4636' : '#3f3128'; c.fillRect(0, 1250 + j * 40, 1080, 40); } wave(c, t, 1520, '#1a4a7a', 12); wave(c, t + 1, 1600, '#123a66', 14); for (let i = 0; i < 7; i++) dia(c, ((i * 190 + t * 25) % 1180) - 50, 1580 + 30 * Math.sin(t * 2 + i), t, 0.9); }
    else if (k === 'river') { wave(c, t, 1400, '#1f5a8a', 14); wave(c, t + 1, 1500, '#16466e', 16); wave(c, t + 2, 1600, '#0f3354', 18); }
    else if (k === 'forest') { treesK(c, t, 1450, '#12301c', 9, 1.3); treesK(c, t + 1, 1560, '#0a2014', 7, 1.7); }
    else if (k === 'snow') { zmount(c, 300, 1450, 2.6, '#5a6a9a', 0); zmount(c, 780, 1450, 2.2, '#4a5a8a', 0); c.fillStyle = '#c9d6f0'; c.fillRect(0, 1450, 1080, 470); for (let i = 0; i < 40; i++) { c.fillStyle = 'rgba(255,255,255,0.8)'; c.beginPath(); c.arc((i * 97 + Math.sin(t + i) * 20) % 1080, (i * 131 + t * 90) % 1500, 4, 0, 7); c.fill(); } }
    else if (k === 'ground') { zground(c, 1500, '#4a3a2a', '#1a1208', 1700); }
  }
  function bull(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#e8e0d0'; c.beginPath(); c.ellipse(0, 0, 200, 110, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(-120, -90, 90, 80, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(180, -40, 90, 70, 0.4, 0, 7); c.fill(); c.fillStyle = '#cfc6b4'; c.beginPath(); c.ellipse(200, -10, 50, 40, 0, 0, 7); c.fill(); c.strokeStyle = '#f0e0b0'; c.lineWidth = 14; c.beginPath(); c.moveTo(200, -90); c.quadraticCurveTo(250, -180, 210, -230); c.moveTo(150, -100); c.quadraticCurveTo(120, -190, 160, -230); c.stroke(); c.fillStyle = '#e8e0d0'; for (const lx of [-120, -50, 90, 150]) c.fillRect(lx - 18, 60, 36, 110); c.fillStyle = '#222'; c.beginPath(); c.arc(215, -50, 8, 0, 7); c.fill(); c.restore(); }
  function trish(c, x, y, s, g) { c.save(); c.translate(x, y); c.scale(s, s); if (g) { const gr = c.createRadialGradient(0, -200, 10, 0, -200, 360); gr.addColorStop(0, 'rgba(255,230,150,0.7)'); gr.addColorStop(1, 'rgba(255,200,80,0)'); c.fillStyle = gr; c.fillRect(-400, -560, 800, 800); } c.strokeStyle = '#e8c46a'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 200); c.lineTo(0, -300); c.moveTo(-90, -240); c.quadraticCurveTo(-90, -360, 0, -360); c.quadraticCurveTo(90, -360, 90, -240); c.moveTo(0, -360); c.lineTo(0, -460); c.moveTo(-90, -240); c.lineTo(-90, -430); c.moveTo(90, -240); c.lineTo(90, -430); c.stroke(); c.fillStyle = '#e8c46a'; for (const sx of [-90, 0, 90]) { c.beginPath(); c.moveTo(sx - 18, -430 - (sx === 0 ? 30 : 0)); c.lineTo(sx, -490 - (sx === 0 ? 40 : 0)); c.lineTo(sx + 18, -430 - (sx === 0 ? 30 : 0)); c.fill(); } c.restore(); }
  function KS(c, t, i, s) {
    const u = U(i, t), z = 1 + (s.zoom == null ? 0.06 : s.zoom) * u, sh = s.shake ? SHK(t, T[i] + s.shake) : 0;
    c.save(); c.translate(sh, 0); c.translate(540, 1000); c.scale(z, z); c.translate(-540, -1000);
    bgK(c, t, s.sky || 'night', s.sun ? s.sun[1] : null);
    if (s.moon) moon(c, s.moon[0], s.moon[1], s.moon[2], s.moon[3] || 0);
    if (s.sun) sun(c, s.sun[0], s.sun[1], s.sun[2], 0.9, s.red);
    if (s.rays) zrays(c, 540, s.rays, t, 14, 'rgba(255,230,160,0.16)', 1600);
    const k = s.k;
    if (s.land) land(c, t, s.land, s.lcol);
    if (k === 'face') chFace(c, t, s.who, 540, s.y || 1350, s.r || 220, s.emo);
    else if (k === 'two') { chFace(c, t, s.who[0], 330, s.y || 1330, s.r || 190, Object.assign({}, s.emo && s.emo[0])); chFace(c, t, s.who[1], 750, s.y || 1330, s.r || 190, Object.assign({}, s.emo && s.emo[1])); }
    else if (k === 'crowd') { const n = s.who.length, shown = Math.max(1, Math.min(n, Math.ceil(zs(0.05, 0.8, u) * n))); for (let j = 0; j < shown; j++) { const x = 540 + (j - (n - 1) / 2) * (s.gap || 300); chFace(c, t, s.who[j], x, (s.y || 1330) + (j % 2) * 40, s.r || 130, { blink: zblink(t, j * 0.3) }); } }
    else if (k === 'body') { const p = CH[s.who]; zbody(c, Object.assign({}, p, { x: 540, y: 1790, s: s.s || 1.3, dir: s.dir || 1, a1: s.a1, a2: s.a2, b1: s.b1, b2: s.b2, walk: s.walk ? t * 4 : 0 })); }
    else if (k === 'bird') jat(c, s.bx || 540, (s.by || 950) + 14 * Math.sin(t * 3), s.bs || 1.0, s.still ? 0 : t * 6, s.hurt != null ? s.hurt : (s.hurtAt != null ? (u > s.hurtAt ? 1 : 0) : 0), s.dir || 1);
    else if (k === 'kalash') kal(c, 540, 1000, 1.3, true);
    else if (k === 'bull') bull(c, 540 + (s.bx || 0), 1380 + (s.sink ? 300 * zs(0.2, 0.9, u) : 0), s.bs || 1.5);
    else if (k === 'rav') rav(c, 540, 1250, 240, 1);
    else if (k === 'sleep') { zbed(c, 540, 1500, 1.5); chFace(c, t, 'urm', 370, 1300, 150, { blink: 1, smile: 0.3 }); zzz(c, t, 600, 1250, '#cfd8ff'); }
    else if (k === 'lingam') { zrays(c, 540, 1100, t, 14, 'rgba(255,225,150,0.14)', 1500); zshivling(c, 540, 1560, 1.5, 0.8 + 0.2 * Math.sin(t * 2)); }
    else if (k === 'trish') trish(c, 540, 1500, 1.5, true);
    else if (k === 'om') { ztxt(c, 'ॐ', 540, 1050, 520, '#ffd36a', 0.95); for (let q = 0; q < 3; q++) { c.strokeStyle = `rgba(255,220,140,${0.5 - q * 0.15})`; c.lineWidth = 6; c.beginPath(); c.arc(540, 880, 260 + ((t * 70 + q * 90) % 270), 0, 7); c.stroke(); } }
    else if (k === 'cards') { const n = s.items.length; for (let j = 0; j < n; j++) { const a = zs(0.08 + j * 0.25, 0.2 + j * 0.25, u), y = (s.cy || 700) + j * 250; if (a <= 0) continue; c.save(); c.globalAlpha = a; c.translate((1 - a) * 200, 0); c.fillStyle = 'rgba(30,14,40,0.82)'; c.strokeStyle = '#ffd36a'; c.lineWidth = 6; c.beginPath(); c.roundRect(100, y - 100, 880, 200, 36); c.fill(); c.stroke(); ztxt(c, s.items[j][0], 540, y + 10, s.isz || 100, '#ffd36a', 1); ztxt(c, s.items[j][1], 540, y + 78, 56, '#fff1c8', 1); c.restore(); } }
    else if (k === 'big') { for (let q = 0; q < 3; q++) { c.strokeStyle = `rgba(255,220,140,${0.4 - q * 0.12})`; c.lineWidth = 6; c.beginPath(); c.arc(540, 960, 200 + ((t * 80 + q * 100) % 300), 0, 7); c.stroke(); } }
    if (s.zzz) zzz(c, t, 640, 1150, '#cfd8ff');
    if (s.fl) FL(c, t, T[i] + s.fl);
    if (s.title) ztxt(c, s.title, 540, s.ty || 330, s.ts || 120, s.tc || '#fff1c8', zs(0.05, 0.25, u));
    if (s.big) ztxt(c, s.big, 540, s.by || 960, s.bs2 || 240, s.bc || '#ffd36a', zs(0.15, 0.4, u));
    if (s.sub) ztxt(c, s.sub, 540, s.sy || 1180, s.ss || 90, '#ffe9a0', zs(0.4, 0.6, u));
    if (s.petals) zpetals(c, t, T[i], 26);
    zmotes(c, t, 22, s.mc || '#ffe0a8');
    c.restore();
  }
'''
def gen(name,scenes,hot,h1,h2,h3):
    fn='ABCDEFG'; out=header+KIT
    for i,s in enumerate(scenes):
        out+=f"  function s{fn[i]}(c, t) {{ KS(c, t, {i}, {json.dumps(s,ensure_ascii=False)}); }}\n"
    out+="  const SCENES = SCN([sA, sB, sC, sD, sE, sF, sG]);\n"
    open(P+name+'.js','w').write(out)
    json.dump({"hot":hot,"h1":h1,"h2":h2,"h3":h3},open(P+name+'.json','w'),ensure_ascii=False)
if __name__=='__main__':
    from specs1 import SPECS
    from specs2 import SPECS as S2; SPECS.update(S2)
    names=sys.argv[1:] or list(SPECS)
    for n in names:
        sp=SPECS[n]; gen(n,sp['scenes'],sp['hot'],sp['h1'],sp['h2'],sp['h3']); print('gen',n)
