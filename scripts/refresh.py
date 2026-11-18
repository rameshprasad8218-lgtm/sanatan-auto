# One-shot refresh: set custom thumbnails + add footer to descriptions for every uploaded video in meta/queue.json.
import json, os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from googleapiclient.errors import HttpError
creds = Credentials(None, refresh_token=os.environ["YT_REFRESH_TOKEN"], token_uri="https://oauth2.googleapis.com/token",
    client_id=os.environ["YT_CLIENT_ID"], client_secret=os.environ["YT_CLIENT_SECRET"])
yt = build("youtube", "v3", credentials=creds)
FOOT = "\n\n📌 रोज़ 3 नई कहानियाँ: दोपहर 1 बजे | शाम 6 बजे | रात 9 बजे\n🔔 Sanatan Dharm को Subscribe करें, ताकि अगली कहानी न छूटे"
q = json.load(open("meta/queue.json"))
for v in q:
    vid = v.get("video_id")
    if not vid or (v.get("refreshed") and v.get("thumb_done")): continue
    n = v["file"].split("/")[-1][:2]
    th = f"thumbs/{n}.jpg"
    try:
        if os.path.exists(th):
            yt.thumbnails().set(videoId=vid, media_body=MediaFileUpload(th, mimetype="image/jpeg")).execute(); v["thumb_done"] = True; print(n, "thumbnail ok")
    except HttpError as e: print(n, "thumbnail FAIL", e.resp.status, str(e)[:160])
    if v.get("refreshed"): continue
    try:
        cur = yt.videos().list(part="snippet", id=vid).execute()["items"][0]["snippet"]
        desc = v["description"]
        body = {"id": vid, "snippet": {"title": v.get("title", cur["title"]), "description": desc, "tags": v.get("tags", cur.get("tags", [])),
                "categoryId": cur["categoryId"], "defaultLanguage": "hi"}}
        yt.videos().update(part="snippet", body=body).execute(); v["description"] = desc; v["refreshed"] = True; print(n, "desc ok")
    except HttpError as e: print(n, "update FAIL", e.resp.status, str(e)[:160])
json.dump(q, open("meta/queue.json", "w"), ensure_ascii=False, indent=1)
