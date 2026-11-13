"""Generate scene images via Pollinations on GitHub Actions. usage: genimg.py scenes.json outdir
scene fields: prompt, model(optional), seed(optional), style(optional: 'raw' = no appended style)"""
import json, sys, os, time, urllib.parse, urllib.request
STYLE = ("2D flat illustration in the style of Indian miniature painting and paper cutout puppets, solid flat colors, "
         "thick clean outlines, ornate gold jewellery and borders, deep jewel tones, soft glowing light and mist, "
         "textured painted background, vertical 9:16, not photorealistic, no text, no watermark")
scenes = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
for i, s in enumerate(scenes):
    txt = s['prompt'] if s.get('style') == 'raw' else f"{s['prompt']}, {STYLE}"
    url = (f"https://image.pollinations.ai/prompt/{urllib.parse.quote(txt)}?width=720&height=1280"
           f"&model={s.get('model','flux')}&nologo=true&enhance=false&seed={s.get('seed', 7 + i)}")
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            data = urllib.request.urlopen(req, timeout=180).read()
            open(f"{out}/scene{i+1:02d}.jpg", 'wb').write(data); print('ok', i + 1, s.get('model', 'flux'), len(data)); break
        except Exception as e:
            print('retry', i + 1, e); time.sleep(15 * (attempt + 1))
    time.sleep(12)
