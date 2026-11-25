# Sanatan Dharm — Daily Analysis (2026-11-25)

Run date: Wed 25 Nov 2026. Window: next 2 days of new content. queue.json is filled through Sat 28 Nov 19:00 (50 items; 48 Kumbh #1, 49 Jyotirling #1 Somnath, 50 Ramayan ke Ankahe Patra #1 Jatayu re-slotted 24-25 Nov). **First free slots: Sun 29 Nov 07:00 / 13:00 / 19:00** (IST 07:00 / 13:00 / 19:00). Ideas 1-3 below are tied to Fri 27 Nov (Sankashti) and only work if Aditya swaps them into the 27 Nov slots once uploads resume.

Already posted or queued (do not repeat): Chhath x9, Mangalwar chicken, Tirupati, Kashi, Nimbu-mirchi, Jagannath, Vrinda-Shaligram, Nariyal, Vidur-kela, Hanuman sindoor, Ekadashi-chawal, Hanuman seena, Ganesh-Tulsi, Sakshi Gopal, Tripurari, Vishnu-neend, Shabari, Sudama, Bhishma, Karna-kavach, Vishnu-aankh, Lakshman-neend, Ekalavya, Hanuman-Sanjeevani, Ujjain Mahakal, Ram Setu, Gajendra Moksha, Draupadi-pallu, Shiv Neelkanth, Kunti-Karna, Yashoda-Brahmand, channel-support, Prahlad-Narasimha, Matsya, Kamdev, Kumbh #1, Jyotirling #1 Somnath, Ramayan-Jatayu.

## BLOCKER (day 5, still open)
GitHub Actions `upload` has failed on every scheduled run since 20 Nov; the latest checked are #119-#124 (24 Nov 06:53-21:44 UTC), all `failure`, on commit fb9aacc. Per NOTES.md the cause is the YouTube OAuth refresh token (invalid_grant, expired/revoked). Nothing has been published since 22 Nov; queue items 37-42, 44-50 are `pending` and the 23-25 Nov slots (incl. Dev Diwali / Kartik Purnima 24 Nov) were missed. meta/stats.json is still the 20 Nov snapshot (7,997 views, 7 subs, 30 videos). Fix needed from Aditya: re-authorize YouTube and update the GitHub secret `YT_REFRESH_TOKEN`. Producing more videos before that only deepens the backlog.

## Own channel snapshot (meta/stats.json, 20 Nov; unchanged)
Top: Kharna Kya Hai 1,277; Mangalwar chicken 897; Hanuman seena 878 / 38 likes (4.3%); Kharna Kheer 706; Hanuman sindoor 379 / 27 likes (7%). Cut-out tests Shabari 52, Sudama 33. Famous Hanuman/Ram "क्यों" titles carry views; visual style alone did not.

## Top 6 topic ideas (none in queue)
1. **गणेश जी ने माता-पिता की परिक्रमा करके दौड़ क्यों जीती?** — best on Fri 27 Nov (Sankashti) if swapped in; else 29 Nov 07:00
   - Hook (Hi): "कार्तिकेय पूरी पृथ्वी घूम आए, गणेश जी वहीं खड़े रहे... फिर भी जीत गए!"
   - Why: clear reversal, short, shareable; fits Sankashti search intent.
   - Fact basis: Shiva Purana tradition (label "मान्यता"). Sankashti Fri 27 Nov 2026 confirmed by Drik Panchang (Ganadhipa Sankashti page), HinduTone (moonrise 8:39 PM Hyderabad, varies by city), Haindavam, HinduPad.
2. **चंद्रमा को गणेश जी ने श्राप क्यों दिया?** — 27 Nov if swapped, else 29 Nov 13:00
   - Hook: "सबने हँसकर देखा, और चाँद पर गणेश जी का श्राप लग गया!"
   - Why: explains why the moon is worshipped on Sankashti; same-day search intent.
   - Fact basis: Ganesh-Chandra shraap tale (Ganesh Purana tradition). Label "मान्यता". Do not read out a moonrise time (city-specific).
3. **हनुमान जी महाभारत में अर्जुन के रथ पर क्यों बैठे?** — 29 Nov 19:00
   - Hook: "जिसने समुद्र लाँघा, वो अर्जुन के झंडे पर बैठकर चुप क्यों रहा?"
   - Why: Hanuman + "क्यों" is our proven vein (878 / 379 views vs ~50 median for other stories); emotional pride -> humility payoff.
   - Fact basis: Kapidhwaj (Hanuman on Arjun's flag) and Bhima-Hanuman meeting are in the Mahabharata; the Arjun-Hanuman bridge tale is loka tradition. Label "मान्यता". Competitor Hindi Short "हनुमान जी महाभारत मै क्यों गए?" exists (seen via Recapio on 24 Nov).
4. **शिव जी को भिक्षा क्यों माँगनी पड़ी? (अन्नपूर्णा, काशी)** — 30 Nov 07:00
   - Hook: "तीनों लोकों के स्वामी हाथ फैलाकर खड़े थे... सामने थीं अन्नपूर्णा!"
   - Why: "जो सबको देता है वो माँगे क्यों" inversion; Kashi link (Kashi video did 90-110 views, so use a story hook not a place hook).
   - Fact basis: Annapurna/Kashi lore. Say "मान्यता है"; do not name an Annapurna Vrat date (single source, unverified).
5. **कालभैरव ने ब्रह्मा जी का पाँचवाँ सिर क्यों काटा?** — 30 Nov 13:00, ahead of Kalabhairav Jayanti
   - Hook: "शिव का रूप, और ब्रह्मा जी का एक सिर कट गया!"
   - Why: shock hook with a dated peg.
   - Fact basis: Shiva Purana tradition ("कथा के अनुसार"). Kalabhairav Jayanti = Tue 1 Dec 2026 per earlier cross-check (Drik Panchang Kalabhairav page and December 2026 page, HinduTone Kalabhairava Jayanti 2026 pages are in today's results; today's tool returned page titles only, re-confirm on Drik before voicing a date).
6. **एकादशी देवी ने मुर दैत्य को कैसे हराया? (उत्पन्ना एकादशी)** — 1-3 Dec, ahead of Utpanna Ekadashi Fri 4 Dec
   - Hook: "विष्णु जी सो रहे थे, और एक राक्षस उन्हें मारने आ गया... तभी एक देवी प्रकट हुईं!"
   - Why: character + danger + miracle; replaces our weak rule-style Ekadashi-chawal video with a story.
   - Fact basis: Utpanna Ekadashi origin tale (Padma Purana tradition, "पुराणों के अनुसार"); Drik Panchang Utpanna Ekadashi 2026 page and HinduTone December 2026 list appear in results; date 4 Dec to be re-confirmed on Drik.
Series follow-ups (already planned in NOTES.md): Kumbh #2 (4 sthan), Jyotirling #2, Ankahe Patra #2 (Sampati / Kumbhkaran).
Skipped as unsafe: viral "Bajrangbali saved a train/bus" real-miracle claims; unverifiable.

## Festival calendar (next 7 days + just after)
- Tue 24 Nov (past): Kartik Purnima / Dev Diwali / Tripurari Purnima.
- Wed 25 Nov (today): Margashirsha month begins in North India (Drik Panchang Margashirsha page, hindu-blog, Bhaktibharat).
- Fri 27 Nov: Ganadhipa Sankashti Chaturthi (Drik Panchang, HinduTone, Haindavam, HinduPad); moonrise varies by city.
- Sat 28 Nov: Annapurna-related observance, single source, unverified.
- Just after: Tue 1 Dec Kalabhairav Jayanti; Fri 4 Dec Utpanna Ekadashi; Mon 14 Dec Vivah Panchami; Sun 20 Dec Gita Jayanti / Mokshada Ekadashi (Drik Panchang December 2026, HinduTone December 2026 calendar).
Caveat: WebSearch returns page titles and URLs only, so dates after 28 Nov rest on the 22-24 Nov cross-checks.

## Competitor patterns (titles only; no view counts; vidIQ credits 0)
- Hindi Hanuman/mythology Shorts: "क्यों" or "जब ..." shock hook + 😱🙏 + #shorts #hanuman #jaishreeram #ram (e.g. "आखिर हनुमान जी ने क्यों लगाया अपने पूरे शरीर पर सिन्दूर", "हनुमान जी महाभारत मै क्यों गए?", "जब हनुमान जी ने अपना रूप बदल लिया 🤯"), via Recapio listings seen 24 Nov.
- Large bhakti channels (Sanatan App, Ambey Bhakti, Ishtar Bhakti, Bhakti Songs Hindi) mostly post mantra/aarti/bhajan clips and "2026 special" festival titles; story-with-reversal Shorts remain a gap. (vidIQ channel pages for Sanatan App and @bhaktikatha9 appeared in results; no counts available.)
- Hanuman Chalisa (T-Series) crossed 5 billion YouTube views (Navbharat Live, Organiser): Hanuman is the largest evergreen pool.
- Not verified: live Hindi trending-search lists (tool does not return them).

## Retention recommendation
First frame = character face and the question as the first spoken word (no intro); deliver the emotional reversal by ~20 s; end with a line that loops back to the opening question so replays count. Add one short voice CTA "अगली कहानी के लिए Subscribe" right after the peak (7 subs vs ~8k views). Above all, restore the YouTube token: nothing has published since 22 Nov.
