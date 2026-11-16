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
