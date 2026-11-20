# Sanatan Dharm automation notes
- Channel: Sanatan Dharm (bhakti Shorts, Hinglish/Hindi), 3/day.
- Retention data so far: emotional character stories best (Kunti 55.7%), fact/trivia weakest (33%). Keep 45-55s, question hook in first 2s, loop ending.
- Queue: meta/queue.json (status pending -> uploaded). upload.py schedules private+publishAt.

## Video quality pipeline (13 Nov)
- Old renders: 720x1280 @ ~2 Mbps (too soft). New: `scripts/enhance.sh in.mp4 plan.json out.mp4` = effects pass at 1080x1920 (Hindi-safe fonts) + CRF16 slow encode + loudnorm.
- Skills kept in `tools/faceless-shorts` (English, 3D, needs GPU - reference only) and `tools/video-effects` (51 effects, patched for Devanagari via Hind-Bold).
- Known: huge-strike with long Hindi words gets clipped; use backdrop-word or short words. led-sign unreadable in Hindi.

## Paper-Cut engine (for daily automatic runs)
- engine/paper_engine.tgz = complete project template (index.html, tools/capture.mjs + mix.py, src/core incl. paper.js with posters/glassChip/sticker/glitch/petals, fonts, audio/flute.wav). Needs ~/fs setup (narayan-road-carriers-shorts skill: setup.sh installs Chrome/ffmpeg/Kokoro).
- engine/build_example.py shows how 3 projects were generated (script.json + src/shots.js from a lines table: hindi, english CAPS, poster kind, main pose, second pose, sticker). New posters = add entries to ART in src/core/paper.js.
- Pipeline: extract tgz into ~/faceless-shorts/<name>; voice.py; narration filter chain; words.py; capture check/cues; mix.py; sheet; FPS=30 video; ffmpeg crf23 loudnorm -14; copy to videos/NN_name.mp4; add entries to meta/queue.json (status pending, publish_at 13:00/18:00/21:00 IST); git push (upload.yml does the rest).
- meta/stats.trigger push -> stats.yml writes meta/stats.json (channel + per-video views/likes/comments).
- Each video < 58 s. Facts: "manyata ke anusaar". Latest ids: 15 Tirupati, 16 Kashi, 17 Nimbu-mirchi.

## Studio data lessons (16 Nov, from Aditya's YouTube Studio)
- ~95% of traffic is the Shorts feed; ~2,000 unique viewers; channel started 10 Nov.
- "Stayed to watch" decides views. Best: Kunti ne Krishna se dukh kyun manga (EFjLzrWu48c): 64% stayed, 55% avg viewed, 1,650+ views = emotional character question + motivation payoff.
- Weak: Kharna videos ~42% stayed (58% swiped at start) even though first-hour views were high. Plain ritual-fact explainers lose people; story/emotion wins.
- Rules for every new video: first frame + first spoken line must be a curiosity/emotional question with the character/story (no intro, no pause); pick emotional mythology stories (Krishna/Kunti type, Vrinda, Sakshi Gopal) over fact lists for at least 1 of 3 daily slots; fast pacing, avg viewed target 70%+. Studio data lags 24-48 h, judge a video only after 48 h.
- Paper-Cut videos 15-17 (16 Nov) have no retention data yet: compare their stayed-to-watch against Kunti (64%) and Kharna (42%) once Studio shows it.
- 17 Nov stats (subs 4, channel 5.7k views): Kharna Kya Hai 1,255 views and Mangalwar chicken 899 were best; Kharna Kheer 707, Chhathi Maiya 421; Chhath sandhya/prasad/doobta suraj only 45-115 (curve flat after Kharna). Paper-Cut 15-17 (<24 h): Tirupati 44, Kashi 90, Nimbu-mirchi 12, too early to judge.
- Subs stay ~4 despite 5.7k views: need a character-story hook + subscribe voice CTA mid-video; Bharat Yatra / Driver episodes still unproven.
- 17 Nov batch: story Vrinda-Shaligram (18), Bharat Yatra EP3 Puri (19), Driver #3 nariyal (20). New posters in src/paper.js: shaligram, tulsi, sword, coconut, rath, pinOD. Compare stayed-to-watch after 48 h (19 Nov).

## STYLE CHANGE 17 Nov (Aditya, explicit): NO MORE brown paper-cut. Use the painted "Kahani" character renderer that made Jatayu/Kunti
- Aditya said views are not coming and wants the Jatayu/Kunti type of editing (painted scenes, big rigged characters, lit scenes, captions at bottom). Brown Paper-Cut template is retired (engine/paper_engine.tgz kept only for reference).
- Renderer: engine/painted/ (copy of /home/claude/sd: render.py, render2.py, kit.py, rig.py, bgs.py, music2.py, scripts.py STORIES, story_*.py). Run: python render2.py <storyname> (needs tts audio out/<name>_audio.wav from mk_tts.py, Kokoro voice hm_omega), then ffmpeg 1080x1920 crf 20 loudnorm -14.
- Already rendered/posted in this style: jatayu, kevat, kunti, gandhari (01-04), chhathi, doobta, karna, kharna, kheer, nirjala (05-10), vidur (21, kele ka chhilka), hanuman (22, sindoor), ekadashi (23, chawal).
- Unposted paper-cut videos 18 Vrinda (21 Nov 13:00 - Tulsi Vivah), 19 Puri (22 Nov 13:00), 20 nariyal (22 Nov 18:00) were rescheduled; do not make more paper-cut videos.
- 17 Nov (Aditya): the Ekadashi-chawal video editing (painted renderer, 23_ekadashi_chawal) is the approved look; keep exactly this editing for all future videos.

## EFFECTS PASS (MANDATORY from 18 Nov, Aditya: "editing strong, chahe kuch ho jaye")
After render2.py gives the 720p video, run the effects pass BEFORE the final encode, 4-6 effects per video, each 1.5-3.5 s, on key words (hook, twist, emotional payoff, CTA/question):
  pip install mediapipe opencv-python numpy (if missing); plan.json = {"effects":[{"fx":"lean-in","start":0.2,"end":1.6,"zoom":1.3}, ...]}
  check stills first: python3 tools/video-effects/scripts/fx.py --plan plan.json in.mp4 check.png --still t1,t2,...  (LOOK at the PNGs)
  render + final encode: sh scripts/enhance.sh in720.mp4 plan.json videos/NN_name.mp4   (1080p, crf 16, loudnorm)
Tested 17 Nov on the cartoon Vidur video (stills OK): lean-in (hook punch-in), backdrop-word (giant gold Hindi word behind character, e.g. "भाव"; keep it 1-2 short words), glitter-spotlight (dark room + golden rays + sparkles = great for the emotional payoff; its gold word showed boxes for Devanagari, so omit text= or check the still), slow-push, moody/warm grades, rabbit-hole / dot-reveal (scene transitions), crayon-write, huge-strike, reject-stamp, countdown, tape-label.
DO NOT USE effects that show another creator's branding or fake profiles: comment-box ("vibha.in.progress"), glass-widgets ("Edited by Claude" pill), tap/follow with handles, pastel-word profile card, profile-wall, place-in-grid, phone-fan. led-sign is unreadable in Hindi.
Face-based effects (locked-on, orbit) are for real faces; on cartoons only use the list above.
Plan per video: hook = lean-in; mid-story twist = backdrop-word with the key word; payoff = glitter-spotlight; last line = slow-push; one grade for the whole video. Never let a effect cover the bottom captions.
- 17 Nov 08:32 Aditya after seeing the 15 s effects sample: not impressed, said "jaise tum maan rahe ho vahi chalne do". So the effects pass is OPTIONAL: use an effect only when its still looks clearly good (lean-in on the hook, backdrop-word); the approved base look stays the Ekadashi-style painted render. Do not add effects just to hit a count.

## 17 Nov 15:38 - decision from Aditya
- Puppet / Madhubani / 3D-character experiments are DROPPED. Keep making daily videos with the painted engine (engine/painted) exactly as before.
- Queue already covers up to tomorrow; no extra videos needed today. Daily 07:23 IST engine continues unchanged.

## 17 Nov 17:11 - SHADOW PUPPET STYLE is now the ONLY style (Aditya approved the 16 s trial: "yahi chahiye tha")
- All Sanatan Dharm videos from 18 Nov: engine/shadow (read engine/shadow/GUIDE.md). Painted engine + paper-cut + puppet-photo + 3D experiments are retired (the earlier 15:38 note about the painted engine is superseded).
- Audio deeper + clearer (sfx.py bed/duck/-14 LUFS), 60 fps video, hook in 2 s, new picture every 2-4 s.
- Aditya wants real analysis before making content (own stats + competitor titles/hashtags/tags). Competitor insight for "hanuman seena": top Shorts titles use the phrase "हनुमान जी ने सीना क्यों चीरा" + #shorts #hanuman #hanumanji #ramayan #bhakti #jaishreeram #bajrangbali; top video 28M views, 54 s.
- Do NOT make extra videos on 17 Nov; production starts with the 18 Nov 07:23 run.
- 18 Nov stats (subs 7, channel 6.1k views, 22 videos): Hanuman seena (shadow style trial, first fast-hook video, 17 Nov 14:36) = 583 views / 21 likes in ~17 h, the best fresh video since Kharna (1,277); Hanuman sindoor 291 / 10 likes; Vidur 43, Ekadashi 85 (painted, Hindi fact hooks). Subs 4 -> 7 in a day. Fast question hook on a Hanuman topic with a known high-demand title phrase beats ritual facts ~2-7x at the same age.
- Paper-cut 15-17 after 48 h: Tirupati 49, Kashi 110, Nimbu-mirchi 98 views (0-2 likes) = weak; confirms retire. Studio retention not available from the API, only views/likes.
- 18 Nov topic choice (why): Ganesh-Tulsi (Tulsi Vivah week, Drik: Tulsi Vivah Sat 21 Nov 2026, Dwadashi 21 Nov 06:31 - 22 Nov 04:56; Dev Uthani Ekadashi Fri 20 Nov per other sources), Sakshi Gopal (promise + miracle + "do not look back" twist, 1.85M-view story), Tripurari/Dev Diwali (Kartik Purnima Tue 24 Nov, Tripurasur one-arrow story). All three are emotional/mythic stories with a hook question, not ritual lists.
- Shadow engine lessons 18 Nov: spoken Hindi at Kokoro speed 0.88 is ~12 chars/s: 10-12 lines overshoot 58 s, so mk_tts.py now reads env SPD (default 1.0; use 1.1 if a script is long). Keep scripts to 10 lines. Generic profile puppet fig() in src/puppets2.js (hats crown/feather/jata/ganesh/shikha/bun/asur, items staff/flute/trident/bow/chakra/pot/tulsi/diya) + src/frame2.js reel driver (story file only defines STY = hook, hl, payoff, scenes[]); build_story.py includes both automatically. node render.mjs <name> events writes data/<name>.events.json.

## 18 Nov 08:40 - two parallel sessions collided (Aditya chat session + the 07:23 cloud run both made Ganesh-Tulsi and Sakshi Gopal). Cloud run's versions (25/26/27) are the ones queued. The chat session's extra video "28_vishnu_neend" (Vishnu 4 months sleep, new puppets in engine/shadow/src/puppets_gods.js + src/reel.js, built with build_story_gods.py) is queued for 19 Nov 13:00 (Dev Uthani is Fri 20 Nov). comic15 (Hanuman eats the sun, funny voice hm_psi speed 1.12, 17 Nov) is only a trial, not queued. Do not remake topics already in queue.json.

## 18 Nov 08:35 - NEW SLOT RULE from Aditya: 6-hour gap between videos. Slots IST: 07:00, 13:00, 19:00. Daily 07:23 run makes 3 videos for 13:00 and 19:00 today and 07:00 tomorrow. Aditya wants videos published without asking him. Rescheduled: Vishnu 18 Nov 19:00, Sakshi 19 Nov 07:00, Nariyal 22 Nov 19:00, Tripurari 23 Nov 19:00 (before Dev Diwali 24 Nov). Descriptions footer now "सुबह 7 | दोपहर 1 | शाम 7".

## 18 Nov 12:40 - NEW DEFAULT STYLE: "2D cut-out" (Aditya: "Maza aa gaya, ab aisi hi editing karni hai")
- Template: engine/shadow/stories/shabri30.js (build with build_story_gods.py <name>, full 1080x1920 canvas drawn directly; window.seek/DURATION/READY defined in the story file). Reusable: zface(), zbody() (characters), zsky/ztrees/zhut/zground backgrounds, zmotes/zpetals particles, zbasket/zber props, zframe() scene list with 0.28 s cross-dissolve, vignette + warm grade, Hindi captions with gold accent words auto-split from tts json, hook text top for first 4 s.
- Look rules: big emotional close-up face in the first 4 s (blink + tear), then a new scene every 3-6 s (wide, close-up, hands/props, split shots), parallax trees, dust/fireflies, glow, petals, cross-dissolves, slow zoom, warm/cool colour contrast, hooked Hindi question text top, captions bottom.
- Length ~30 s (TTS speed 1.08 hm_omega, 7 lines). Audio via mkev_gods.py + sfx.py (boom at 0, shimmer on beats, gong on payoff). Render FPS=60 (~7 min), mux with ffmpeg.
- Characters are ORIGINAL designs (do not copy other creators' characters). RAM/LAK/SH presets exist; add new characters as presets (skin, cloth, cloth2, head{hair,hc,crown,tilak,...}).
- 29_shabari_ber queued 19 Nov 13:00. Shadow-puppet style remains available for dark/epic stories only.

## 18 Nov — anime.js adopted
engine/shadow/lib/anime.umd.min.js (MIT) embedded by build_story_gods.py when story uses `anime`; timelines seeked per frame (deterministic). Used in sudama30 for zoom punch, run overshoot, palace spring, flash. Voice fades 30ms at cuts idea from video-use. VoiceStudio not used.

## 19 Nov (07:23 IST run) — analysis + 3 cut-out videos
- Slots 19 Nov 07/13/19 were already filled (26 Sakshi, 29 Shabari, 30 Sudama), so this run filled 20 Nov 07:00 / 13:00 / 19:00: 31 Bhishma (arrow bed, Bhishma Panchak starts 20 Nov), 32 Karna kavach-daan, 33 Vishnu eye-lotus for Shiva (Vaikuntha Chaturdashi week, 23 Nov). Dev Uthani already covered by 28 Vishnu-neend.
- Stats at 06:30 IST were still the 18 Nov snapshot (6,133 views, 7 subs): Kharna 1,277, Mangalwar 900, Hanuman seena 583 / 21 likes (3.6% likes, best story), painted Vidur 43 / Ekadashi 85, paper-cut Tirupati/Kashi/Nimbu 49/110/98. Shabari (first cut-out) / Sudama had not published yet, so style comparison is pending: judge them on 21 Nov.
- Lesson: "क्यों + well-known character + sacrifice" titles; story likes 3-4% vs vidhi/fact 0.5-2% in the data. vidIQ credits are 0, WebSearch only returns titles (no view counts) so competitor pull is directional.
- Lesson (production): Kokoro hm_omega at speed 1.08 = about 12 chars/s incl. gaps; 7 lines x ~52 chars = 370 chars = 32 s. 480 chars gave 40 s: keep lines <= 55 chars.
- Engine: engine/shadow/gen.py builds stories/<name>.js from parts/lib.js (+ parts/extra.js: zbeard, zeye3, zmoon, zfeather, zarrow, zlotus, zchakra, zshivling, zrays, ztxt) + parts/<name>.js (characters + 7 scenes) + parts/common.js (captions/hook, placeholders from parts/<name>.json). zface has an `o.post(c,r)` callback for beards/third eye/feather. TTS scripts: ~/sd/scripts.py copy in engine/painted/scripts_19nov.py.

## 19 Nov (chat, 'Analysis + aaj ki videos') — filled 21 Nov 07:00/19:00 and 22 Nov 07:00 with 34 Lakshman-neend, 35 Ekalavya, 36 Hanuman-Sanjeevani. New scene helper: T/U/SCN (scene times auto from HT.lines) in parts/<name>.js. Stats 19 Nov 08:30: 7 subs, 7,135 views; Kharna 1,277 best; Shabari/Sudama just published. Free slots after this: 22 Nov 13:00 is taken (20?), check queue before next run. TTS scripts for new stories live in /home/claude/sd/scripts_new.py (copy in engine/painted/).
- 19 Nov 09:00 Hanuman preset (HAN in parts/sanjeevani30.js): vanar face via zface o.pre/o.post (muzzle, pointed ears, brow ridge) + zbody o.back (tail). Reuse for all Hanuman videos.
- 19 Nov 09:20 nudge upload

## 20 Nov (07:23 IST run) — analysis + 3 cut-out videos (37 Ram Setu, 38 Gajendra, 39 Draupadi)
- Slots 20 Nov 07/13/19 and 21 Nov 07/13/19, 22 Nov 07/13/19, 23 Nov 19 were already filled, so this run filled the first free slots: 23 Nov 07:00 (37), 23 Nov 13:00 (38), 24 Nov 07:00 (39).
- Stats 20 Nov 07:30 IST (7 subs, 7,997 views, 30 videos on channel): Kharna 1,277 / 41 likes still #1; Mangalwar chicken 897; Hanuman seena (shadow) 878 / 38 likes (4.3%) = best story; Hanuman sindoor 379 / 26 (6.9% likes); painted Ekadashi 292, Vishnu-neend (shadow) 129.
- First cut-out-style tests (~18-20 h old): Shabari 52 / 1 like, Sudama 33 / 0, Sakshi (shadow, 24 h) only 8. Compare: Hanuman seena had 583 at 17 h. So the cut-out look alone did NOT lift views yet; Hanuman/Ram titles with a famous "क्यों" question carry the views. Keep 2 of 3 daily videos on Hanuman/Ram/Krishna headline topics; Bhishma..Hanuman-Sanjeevani (31-36) not published yet or <24 h: judge on 22 Nov.
- Numeric lessons: (1) the 2 Hanuman story videos got 878 and 379 views (avg ~630) vs 6 other story videos (Vidur 52, Tulsi-Ganesh 45, Sakshi 8, Vishnu-neend 129, Shabari 52, Sudama 33; median ~50); (2) likes: seena 4.3%, sindoor 6.9%, Kharna 3.2% vs fact videos 1-2%; (3) subs stayed 7 over 2 days with 2.3k extra views, so views alone do not convert, the comment question is the only CTA we have; (4) these ages are 18-48 h, treat as directional.
- Competitor check (WebSearch titles only): Hanuman/Ram bhajan + shorts titles use "क्यों" + "#jaishreeram #ram #hanuman #shorts"; "Tod tod mani mala fek rahe Hanuman" and Draupadi pallu/Krishna ungli, Gajendra moksha are widely told lokkathas. vidIQ credits 0.
- Why topics: Ram Setu (Ram naam > Ram: stone floats/sinks twist, Ram+Hanuman = proven demand), Gajendra moksha (Kartik Purnima manyata, 24 Nov, animal + desperate call + Vishnu runs barefoot), Draupadi pallu (Krishna hook, payoff = chir-haran, original emotional story). Hanuman pearl-necklace was skipped (same as seena video 24).
- Engine: new parts/setu30.js, gajendra30.js, draupadi30.js (elephant eleFace/ele, croc, finger/hall/cloth helpers, sea/stone/splash). TTS in ~/sd needs `pip install kokoro-onnx` (system python works, no venv) and assets from github.com/thewh1teagle/kokoro-onnx releases model-files-v1.0 (curl with --cacert /root/.ccr/ca-bundle.crt).
- Ops lesson: do not `git checkout main` from a detached HEAD in the shared clone; I cloned fresh into /home/claude/w/sanatan-auto.
