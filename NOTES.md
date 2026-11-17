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
