# Shadow Puppet engine (Sanatan Dharm standard from 17 Nov 2026)

Aditya approved this look: black lace-cut puppets on rods behind a lamp-lit cloth screen, warm lamp light, gold gel glow, Indian palace arches, deep sound. Every new Sanatan Dharm Short from 18 Nov is made with it. Painted engine (engine/painted) is retired.
Approved example: stories/seena15.js (Hanuman seena, 16 s). Kit credit: "Shadow Puppet Theatre" by Grow With AST (MIT).

## Files
- lib/harness.js, src/ref.js, src/story.js  = kit helpers (lamp, stage, pup, begin/end, cut, dot, tear, pin, person, crow ...). Do not edit except to fix bugs.
- src/puppets_indic.js = our puppets: hanu (Hanuman), sitaP, miniRam, miniSita, heart, palaceBack. ADD new puppets here in the same style (see "Puppet rules").
- stories/<name>.js = one story: scene plan, captions, hook text. Copy stories/seena15.js as the model.
- data/<name>.json = tts timings (copy of /sd/tts/<name>.json from mk_tts.py). data/<name>.events.json = sound events.
- build_story.py, render.mjs, sfx.py = pipeline. package.json needs `npm i` (puppeteer-core). Chrome: /usr/bin/google-chrome (or CHROME=...). Fonts: fonts/TiroDevanagariHindi-Regular.ttf.

## Pipeline (per video)
1. Script lines in engine/painted/scripts.py STORIES (title, voice hm_omega, lines) and `python mk_tts.py <name>` (Kokoro; see painted setup) -> tts/<name>.wav + tts/<name>.json. One line = one beat (3-5 s). Total 45-57 s. Hook line first (an emotional question).
2. cp tts json to data/<name>.json. Write stories/<name>.js: HCAPS (caption chunks with start times from the json, *word* = gold accent), hook text in hhook(), scene plan in hframe(t) (switch on t ranges taken from the json line starts). Rename functions/consts so nothing clashes (they live in one scope: use a prefix, e.g. h_<name>).
3. `python3 build_story.py <name>` ; `node render.mjs <name> test 1 5 9 ...` -> out/<name>_<t>.png ; LOOK at every key frame (overlap, Hindi text, puppet pose) and fix.
4. Sound events: data/<name>.events.json = [[t,"boom|dhol|whoosh|tick|gong|shimmer|drop|riser|heart",amp?],...]. Hit boom+dhol at 0 s, whoosh at scene changes, gong+shimmer at the emotional payoff. `python3 sfx.py tts/<name>.wav data/<name>.events.json <dur> out/<name>_audio.wav` (deep sub-bass bed ducked under voice, warm clear voice, -14 LUFS).
5. Render 60 fps: `FPS=60 node render.mjs <name> render` (about 4 min per 16 s of video; a 55 s video about 14 min - run in background with nohup and poll). Final mux:
   `ffmpeg -i out/<name>_silent.mp4 -i out/<name>_audio.wav -vf "scale=1080:1920:flags=lanczos" -c:v libx264 -preset slow -crf 19 -r 60 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart videos/NN_<name>.mp4`
   Check: duration < 58 s, frame 0 is the hook (text visible, lamp on within 0.5 s), file < 100 MB.
6. Queue entry in meta/queue.json as before.

## Look rules (Aditya)
- Hook in first 2-3 s: big Hindi hook text on top, boom sound on frame 0, a strong puppet shot (not an empty stage).
- A new picture every 2-4 s (new scene, new puppet pose, curtains, lamp dip, zoom). Never hold one static scene more than 4 s.
- Captions Hindi (Tiro), bottom, gold accent word. Subtle lamp flicker is built in. Camera shake on hits is allowed.
- Sound: deeper and clearer than other channels: voice clean, sub-bass bed, drum hit at hook, gong at payoff.
- Facts framed "lokkatha / manyata ke anusaar". Emotional payoff scene (gold glow through cut-out) near the end.
- Rods: puppets get rods from the kit via `rods.push([...wpt(p,x,y), width])`.

## Puppet rules (to add Ram, Krishna, Shiva, Ravan, Lakshmi, Shabri, Rishi, etc.)
- Local coordinates: feet at (0,0), up = negative y, facing +x; function(p, g, o, rods) where p = shadow layer, g = gel layer; wrap with both([p,g], c=>{c.save(); c.translate(o.x,o.y); c.scale(o.s*dir,o.s)}) and restore at the end.
- Draw solid INK shapes, then cut-work holes with cut(p, ()=>{...}) (dots, tears, thin lines = lace). Pin joints with pin(). Arms = two segments with rotation (a1,a2). Crowns/tilak/jewellery as cut dots. Profile view only (shadow-puppet look). Distinguish characters by silhouette: Ram = tall crown + bow, Krishna = peacock feather + flute, Shiva = jata + trident + crescent, Ravan = several crowned heads, Shabri = bent back + stick + bowl of berries, Rishi = long beard + staff + jata knot.
- Gel colours: draw the same shape in g with a fill (e.g. rgb(255,196,70)) to colour light shining through holes.
