"""Generate scene images from prompts via free Pollinations (Flux). Runs on GitHub Actions (open internet).
usage: genimg.py scenes.json outdir"""
import json, sys, os, time, urllib.parse, urllib.request
STYLE = ("Indian miniature painting style, flat 2D cutout illustration, ornate gold details, rich deep colors, "
         "layered painted background, soft cinematic glow, vertical composition, no text, no watermark")
scenes = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
for i, s in enumerate(scenes):
    p = urllib.parse.quote(f"{s['prompt']}, {STYLE}")
    url = f"https://image.pollinations.ai/prompt/{p}?width=1080&height=1920&model=flux&nologo=true&seed={s.get('seed', 7 + i)}"
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            data = urllib.request.urlopen(req, timeout=180).read()
            open(f"{out}/scene{i+1:02d}.jpg", 'wb').write(data); print('ok', i + 1, len(data)); break
        except Exception as e:
            print('retry', i + 1, e); time.sleep(10 * (attempt + 1))
