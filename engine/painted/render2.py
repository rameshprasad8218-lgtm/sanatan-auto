# -*- coding: utf-8 -*-
"""render2: multi-shot, rigged-actor renderer. usage: python render2.py gandhari [max_s] | sheet t1,t2,.."""
import sys, json, math, subprocess, time, os
import numpy as np, cv2, soundfile as sf
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import render as R
from render import Cam, apply_fx, overlay_rgba, font, make_chunks, smooth, W, H, FPS, FONT_B, FONT_T, GOLD
from kit import WW, WH, vignette_mask
import importlib
SG = None
from scripts import STORIES
import music2

TAG = 'गांधारी · अनकही कथा'
_glass_cache = {}
_ctext = {}


def cam(z0, z1, c0, c1=None):
    return dict(z0=z0, z1=z1, c0=c0, c1=c1 or c0)


# plan: (scene, t0_line, frac0, t1_line, frac1, cam, extras)   times = line start + frac*(next line start - line start)
def build_plan(lines, total):
    def T(i, f=0.0):
        if i >= len(lines):
            return total
        n = lines[i + 1]['start'] - 0.12 if i + 1 < len(lines) else total
        s0 = (lines[i]['start'] - 0.12) if i > 0 else 0.0
        return s0 + f * (n - s0)
    P = []
    def add(sc, a, b, c, **kw):
        P.append(dict(scene=sc, t0=a, t1=b, cam=c, **kw))
    if hasattr(SG, 'plan'):
        SG.plan(T, add, cam)
        for s_ in P:
            s_.setdefault('trans', 'fade')
        return P
    # ---- hook
    add('hook_g', T(0, 0), T(0, .48), cam(2.3, 2.0, (455, 585), (450, 590)), blur=0)
    add('hook_g', T(0, .48), T(1, 0), cam(1.1, 1.35, (460, 700), (480, 640)), blur=0)
    add('hook_k', T(1, 0), T(1, .5), cam(2.2, 2.0, (450, 598)), blur=5, trans='cut')
    add('hook_k', T(1, .5), T(2, 0), cam(1.3, 1.1, (450, 760), (450, 820)), blur=0)
    # ---- the field
    add('battle', T(2, 0), T(2, .5), cam(1.0, 1.1, (300, 820), (420, 840)), blur=0)
    add('battle', T(2, .5), T(3, 0), cam(1.5, 2.0, (450, 1000), (450, 1060)), blur=2)
    add('lights', T(3, 0), T(3, .55), cam(1.0, 1.12, (450, 900), (450, 820)), blur=0)
    add('lights', T(3, .55), T(4, 0), cam(1.6, 1.8, (450, 1010), (450, 960)), blur=3)
    add('blind', T(4, 0), T(4, .5), cam(2.3, 2.0, (450, 590)), blur=6, trans='fade')
    add('blind', T(4, .5), T(5, 0), cam(1.7, 1.45, (450, 790), (450, 760)), blur=2)
    add('arrive', T(5, 0), T(5, .45), cam(1.0, 1.1, (450, 900), (450, 880)), blur=0)
    add('arrive', T(5, .45), T(6, 0), cam(1.6, 1.9, (650, 920), (650, 900)), blur=3, trans='cut')
    # ---- the curse
    add('curse', T(6, 0), T(6, .55), cam(1.5, 1.7, (400, 660), (390, 640)), blur=0, trans='fade', shake=1.0)
    add('curse', T(6, .55), T(7, 0), cam(2.0, 2.15, (320, 700), (320, 690)), blur=4, trans='cut', shake=.6)
    add('curse', T(7, .0), T(7, .3), cam(2.0, 2.0, (690, 890)), blur=4, trans='cut')
    add('curse', T(7, .3), T(7, .62), cam(1.1, 1.0, (450, 900), (450, 880)), blur=0, trans='cut', text='३६ साल बाद')
    add('curse', T(7, .62), T(8, 0), cam(2.2, 2.0, (690, 880)), blur=5, trans='cut')
    # ---- krishna's answer
    add('calm', T(8, 0), T(8, .55), cam(2.2, 1.9, (450, 600)), blur=4, trans='fade')
    add('calm', T(8, .55), T(9, 0), cam(1.25, 1.0, (450, 900), (450, 860)), blur=0)
    add('two', T(9, 0), T(9, .3), cam(1.0, 1.1, (450, 900), (460, 880)), blur=0, trans='cut')
    add('two', T(9, .3), T(9, .65), cam(2.0, 2.2, (665, 790), (665, 770)), blur=4, trans='cut')
    add('two', T(9, .65), T(10, 0), cam(2.0, 1.8, (235, 750)), blur=4, trans='cut')
    add('two', T(10, 0), T(11, 0), cam(1.25, 1.1, (450, 880), (450, 900)), blur=0, trans='cut')
    add('bow', T(11, 0), T(11, .5), cam(2.0, 1.8, (450, 640)), blur=4, trans='fade', rot=-4.5)
    add('bow', T(11, .5), T(12, 0), cam(2.5, 2.2, (450, 900), (450, 870)), blur=5, trans='cut')
    add('dwarka', T(12, 0), T(12, 1), cam(1.0, 1.18, (450, 900), (450, 840)), blur=0, trans='fade')
    add('end', T(13, 0), total, cam(2.0, 1.45, (450, 640), (450, 760)), blur=3, trans='fade')
    for i, s in enumerate(P):
        s.setdefault('trans', 'fade')
    return P


def text_img(txt, size=118):
    f = font(FONT_B, size)
    w = int(f.getlength(txt)) + 120
    im = Image.new('RGBA', (w, size * 2 + 40), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.text((60, 40), txt, font=f, fill=(255, 214, 102, 255), stroke_width=5, stroke_fill=(40, 6, 10, 255))
    sh = im.filter(ImageFilter.GaussianBlur(14))
    out = Image.alpha_composite(sh, im)
    a = np.asarray(out, np.float32)
    al = a[..., 3:4] / 255.0
    return a[..., :3] * al, al


def glass_rect(f, x0, y0, x1, y1, op, r=30):
    x0, y0 = max(int(x0), 0), max(int(y0), 0); x1, y1 = min(int(x1), W), min(int(y1), H)
    w, h = x1 - x0, y1 - y0
    if w < 8 or h < 8 or op <= 0:
        return
    key = (w, h)
    if key not in _glass_cache:
        m = np.zeros((h, w), np.uint8)
        rr = min(r, h // 2, w // 2)
        cv2.rectangle(m, (rr, 0), (w - rr, h), 255, -1); cv2.rectangle(m, (0, rr), (w, h - rr), 255, -1)
        for cx_, cy_ in ((rr, rr), (w - rr, rr), (rr, h - rr), (w - rr, h - rr)):
            cv2.circle(m, (cx_, cy_), rr, 255, -1, cv2.LINE_AA)
        mf = cv2.GaussianBlur(m.astype(np.float32) / 255, (0, 0), 1.0)
        er = cv2.erode(m, np.ones((5, 5), np.uint8)).astype(np.float32) / 255
        edge = np.clip(mf - cv2.GaussianBlur(er, (0, 0), 1.0), 0, 1)
        grad = np.linspace(26, -6, h, dtype=np.float32)[:, None]
        _glass_cache[key] = (mf[..., None], edge[..., None], grad[..., None] * np.ones((1, w, 1), np.float32))
    mf, edge, grad = _glass_cache[key]
    sub = f[y0:y1, x0:x1]
    bl = cv2.GaussianBlur(cv2.resize(sub, (max(w // 3, 2), max(h // 3, 2)), interpolation=cv2.INTER_AREA), (0, 0), 5)
    bl = cv2.resize(bl, (w, h), interpolation=cv2.INTER_LINEAR)
    gl = bl * 0.50 + 18 + grad
    sub[:] = sub * (1 - mf * op) + gl * mf * op + edge * op * 120


def card_text(txt, size, col=(255, 255, 255)):
    k = (txt, size, col)
    if k not in _ctext:
        f = font(FONT_B, size)
        w = int(f.getlength(txt)) + 60
        im = Image.new('RGBA', (w, int(size * 1.9)), (0, 0, 0, 0))
        ImageDraw.Draw(im).text((30, 4), txt, font=f, fill=col + (255,))
        a = np.asarray(im, np.float32)
        al = a[..., 3:4] / 255.0
        _ctext[k] = (a[..., :3] * al, al, w, im.height)
    return _ctext[k]


def draw_card(f, txt, cy, size, op, col=(255, 255, 255), dy=0):
    rgb, a, w, h = card_text(txt, size, col)
    pw, ph = w + 50, h + 26
    x0 = (W - pw) / 2
    y0 = cy - ph / 2 + dy
    glass_rect(f, x0, y0, x0 + pw, y0 + ph, op * .95)
    overlay_rgba(f, rgb, a, W / 2, cy + dy + 2, op)


def main(name='gandhari', max_seconds=None, sheet=None):
    global SG
    SG = importlib.import_module({'gandhari': 'scenes_gandhari'}.get(name, f'story_{name}'))
    t_start = time.time()
    TAGX = getattr(SG, 'TAG', TAG)
    tl = json.load(open(f'tts/{name}.json'))
    wav, sr = sf.read(f'tts/{name}.wav')
    lines = tl['lines']
    total = lines[-1]['end'] + 0.4
    if max_seconds:
        total = min(total, max_seconds)
    plan = build_plan(lines, tl['duration'] - 0.5 if False else lines[-1]['end'] + 0.4)
    plan = [p for p in plan if p['t0'] < total]
    plan[-1]['t1'] = total
    for i in range(1, len(plan)):
        plan[i]['t0'] = plan[i - 1]['t1']
    print('segments', [(p['scene'], round(p['t0'], 1), round(p['t1'], 1)) for p in plan], flush=True)
    # build scenes once
    built = {}
    for p in plan:
        if p['scene'] not in built:
            t0 = time.time()
            img, meta = SG.SCENES[p['scene']]()
            built[p['scene']] = (np.clip(img, 0, 255).astype(np.uint8), meta)
            print('built', p['scene'], round(time.time() - t0, 1), 's', flush=True)
    chunks = make_chunks(lines, wav, sr)
    os.makedirs('out', exist_ok=True)
    mix_path = f'out/{name}_audio.wav'
    cuts = [(p['t0'], p['trans']) for p in plan[1:]]
    if not sheet:
        if hasattr(SG, 'music_cfg'):
            music2.make_mix3(wav.astype(np.float32), cuts, total, mix_path, SG.music_cfg(lambda i: lines[i]['start'], lines))
        else:
            music2.make_mix2(wav.astype(np.float32), cuts, total, mix_path, lines)
        print('audio mixed', flush=True)
    vign = vignette_mask(W, H, 0.55)
    rng = np.random.default_rng(0)
    noise = [rng.normal(0, 1.7, (H, W, 1)).astype(np.float32) for _ in range(6)]
    N = int(total * FPS)
    out_path = f'out/{name}.mp4' if not max_seconds else f'out/{name}_test.mp4'
    proc = None
    if not sheet:
        cmd = ['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-i', mix_path,
               '-t', str(total), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '19', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out_path]
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    tag_lay = Image.new('RGBA', (W, 140), (0, 0, 0, 0)); td = ImageDraw.Draw(tag_lay)
    td.text((36, 18), 'सनातन धर्म', font=font(FONT_B, 24), fill=(255, 214, 102, 230), stroke_width=2, stroke_fill=(20, 8, 30, 200))
    td.text((36, 52), TAGX, font=font(FONT_T, 26), fill=(255, 255, 255, 215), stroke_width=2, stroke_fill=(20, 8, 30, 200))
    tag = np.asarray(tag_lay, np.float32); tag_a = tag[..., 3:4] / 255.0; tag_rgb = tag[..., :3]
    texts = {}
    TRANS = 0.2

    def seg_frame(k, t):
        s = plan[k]
        base, meta = built[s['scene']]
        dur = s['t1'] - s['t0']
        tl_ = t - s['t0']
        p = smooth(float(np.clip(tl_ / max(dur, 1e-3), 0, 1)))
        c = s['cam']
        z = c['z0'] + (c['z1'] - c['z0']) * p
        sh = s.get('shake', 0.0)
        cx = c['c0'][0] + (c['c1'][0] - c['c0'][0]) * p + math.sin(t * .9) * 3 + sh * math.sin(t * 31) * 2.5
        cy = c['c0'][1] + (c['c1'][1] - c['c0'][1]) * p + math.cos(t * .8) * 3 + sh * math.cos(t * 27) * 2.5
        cx = float(np.clip(cx, W / 2 / z, WW - W / 2 / z)); cy = float(np.clip(cy, H / 2 / z, WH - H / 2 / z))
        cm = Cam(z, cx, cy)
        f = cv2.warpAffine(base, cm.M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE).astype(np.float32)
        if s.get('blur', 0) > 0:
            f = cv2.GaussianBlur(f, (0, 0), s['blur'])
        for a in ([] if os.environ.get('NOACT') == '1' else meta.get('actors', [])):
            al_ = s.get('alpha')
            alv = 1.0 if not al_ else al_[0] + (al_[1] - al_[0]) * p
            a.draw(f, cm, t, extra_rot=s.get('rot', 0.0), alpha=alv)
        apply_fx(f, cm, t, tl_, dur, meta)
        if s.get('text'):
            key = s['text']
            if key not in texts:
                texts[key] = text_img(key)
            rgb, a = texts[key]
            op = min(1.0, max(0.0, (t - s['t0'] - .05) / .18)) * min(1.0, max(0.0, (s['t1'] - t) / .2))
            sc = 0.9 + .1 * smooth(min(1.0, max(0.0, (t - s['t0']) / .3)))
            if sc != 1.0:
                rgb = cv2.resize(rgb, None, fx=sc, fy=sc, interpolation=cv2.INTER_LINEAR); a = cv2.resize(a, None, fx=sc, fy=sc, interpolation=cv2.INTER_LINEAR)[..., None]
            overlay_rgba(f, rgb, a, W / 2, 250, op)
        for ck, csz, ccy, ccol in (('card', 50, 215, (255, 255, 255)), ('src', 34, 300, (255, 220, 130))):
            if s.get(ck):
                op = min(1.0, max(0.0, (t - s['t0'] - .04) / .22)) * min(1.0, max(0.0, (s['t1'] - t) / .2))
                draw_card(f, s[ck], ccy, csz, op, ccol, dy=(1 - op) * -16)
        return f

    def base_frame(fi):
        t = fi / FPS
        k = 0
        while k + 1 < len(plan) and t >= plan[k + 1]['t0']:
            k += 1
        if k + 1 < len(plan) and plan[k + 1]['trans'] == 'fade' and t > plan[k]['t1'] - TRANS:
            w = (t - (plan[k]['t1'] - TRANS)) / (2 * TRANS)
            f = seg_frame(k, t) * (1 - w) + seg_frame(k + 1, t) * w
        elif k > 0 and plan[k]['trans'] == 'fade' and t < plan[k]['t0'] + TRANS:
            w = (t - (plan[k]['t0'] - TRANS)) / (2 * TRANS)
            f = seg_frame(k - 1, t) * (1 - w) + seg_frame(k, t) * w
        else:
            f = seg_frame(k, t)
        small = cv2.resize(f, (W // 4, H // 4), interpolation=cv2.INTER_AREA)
        bright = np.clip(small - 150, 0, None)
        bright = cv2.GaussianBlur(bright, (0, 0), 6)
        f += cv2.resize(bright, (W, H), interpolation=cv2.INTER_LINEAR) * 0.55
        f = f * vign
        f = 255 * np.power(np.clip(f / 255.0, 0, 1), 0.96)
        f += noise[fi % 6]
        return f

    def cap_pop(f, t):
        for ch in chunks:
            c0, c1 = ch[0][1] - 0.04, ch[-1][2] + 0.12
            if c0 <= t <= c1:
                act = 0
                for wi, (w_, a_, b_) in enumerate(ch):
                    if t >= a_:
                        act = wi
                rgb, a = R.caption_img([x[0] for x in ch], act)
                tt = t - c0
                op = min(1.0, tt / 0.06)
                sc = 0.82 + 0.18 * smooth(min(1.0, tt / 0.11))
                if sc < .999:
                    rgb = cv2.resize(rgb, None, fx=sc, fy=sc, interpolation=cv2.INTER_LINEAR)
                    a = cv2.resize(a, None, fx=sc, fy=sc, interpolation=cv2.INTER_LINEAR)
                    if a.ndim == 2:
                        a = a[..., None]
                overlay_rgba(f, rgb, a, W / 2, 1115, op)
                break

    first = None if sheet else base_frame(0)
    if sheet:
        times = [float(x) for x in sheet.split(',')]
        tiles = []
        for tt in times:
            fi = int(tt * FPS)
            f = base_frame(fi)
            cap_pop(f, tt)
            im = np.clip(f, 0, 255).astype(np.uint8)
            im = cv2.resize(im, (288, 512)); cv2.putText(im, f'{tt:.1f}', (6, 22), cv2.FONT_HERSHEY_SIMPLEX, .7, (255, 255, 0), 2)
            tiles.append(im)
        cols = 6
        while len(tiles) % cols:
            tiles.append(np.zeros_like(tiles[0]))
        rows = [np.hstack(tiles[i:i + cols]) for i in range(0, len(tiles), cols)]
        cv2.imwrite('out/sheet2.jpg', cv2.cvtColor(np.vstack(rows), cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 88])
        print('sheet done', round(time.time() - t_start), 's')
        return
    for fi in range(N):
        t = fi / FPS
        f = base_frame(fi)
        ta = min(1.0, max(0.0, (t - 0.4) / 0.6))
        f[40:180, 0:W] = f[40:180, 0:W] * (1 - tag_a * ta) + tag_rgb * (tag_a * ta)
        cap_pop(f, t)
        # loop: dissolve to the opening frame
        lw = max(0.0, (t - (total - 0.5)) / 0.5)
        if lw > 0:
            f = f * (1 - lw * lw) + first * (lw * lw)
        f *= min(1.0, t / 0.12 + .0)
        proc.stdin.write(np.clip(f, 0, 255).astype(np.uint8)[..., ::-1].tobytes())
        if fi % 150 == 0:
            print(f'frame {fi}/{N}  {time.time() - t_start:.0f}s', flush=True)
    proc.stdin.close(); proc.wait()
    print('DONE', out_path, round(time.time() - t_start), 's', flush=True)


if __name__ == '__main__':
    a = sys.argv
    if len(a) > 2 and ',' in a[2]:
        main(a[1], None, a[2])
    else:
        main(a[1], float(a[2]) if len(a) > 2 else None)
