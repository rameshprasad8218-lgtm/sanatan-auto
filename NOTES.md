# Sanatan Dharm automation notes
- Channel: Sanatan Dharm (bhakti Shorts, Hinglish/Hindi), 3/day.
- Retention data so far: emotional character stories best (Kunti 55.7%), fact/trivia weakest (33%). Keep 45-55s, question hook in first 2s, loop ending.
- Queue: meta/queue.json (status pending -> uploaded). upload.py schedules private+publishAt.

## Video quality pipeline (13 Nov)
- Old renders: 720x1280 @ ~2 Mbps (too soft). New: `scripts/enhance.sh in.mp4 plan.json out.mp4` = effects pass at 1080x1920 (Hindi-safe fonts) + CRF16 slow encode + loudnorm.
- Skills kept in `tools/faceless-shorts` (English, 3D, needs GPU - reference only) and `tools/video-effects` (51 effects, patched for Devanagari via Hind-Bold).
- Known: huge-strike with long Hindi words gets clipped; use backdrop-word or short words. led-sign unreadable in Hindi.
