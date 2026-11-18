#!/usr/bin/env python3
"""python3 build_story.py <name>  -> out/<name>.html (9:16 page). Needs stories/<name>.js and data/<name>.json (tts timings from mk_tts)."""
import sys, json
from pathlib import Path
H = Path(__file__).parent; r = lambda p: (H / p).read_text()
name = sys.argv[1]
timings = (H / f'data/{name}.json').read_text()
font = (H / 'fonts/TiroDevanagariHindi-Regular.ttf').resolve()
head = f'''<meta charset="utf-8"><title>{name}</title>
<style>@font-face{{font-family:"Tiro Devanagari Hindi";src:url("file://{font}")}}html,body{{margin:0;background:#000}}canvas{{display:block;height:100vh;width:auto}}</style>
<canvas id="cv" width="1080" height="1920"></canvas>
<script>window.HT_JSON={json.dumps(timings)};</script>
'''
body = f'<script>\n{r("lib/harness.js")}\n</script>\n<script>\n(function(){{\n' + '\n'.join(r(p) for p in ['src/ref.js', 'src/story.js', 'src/puppets_indic.js', 'src/puppets_gods.js', f'stories/{name}.js'] + (['src/reel.js'] if 'const STORY' in (H / f'stories/{name}.js').read_text() else [])) + '\n})();\n</script>\n'
(H / f'out/{name}.html').write_text(head + body); print('wrote', f'out/{name}.html')
