# Uploads every pending video listed in meta/queue.json and schedules it.
import json, os, sys, datetime
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

creds = Credentials(None, refresh_token=os.environ["YT_REFRESH_TOKEN"],
    token_uri="https://oauth2.googleapis.com/token",
    client_id=os.environ["YT_CLIENT_ID"], client_secret=os.environ["YT_CLIENT_SECRET"])
yt = build("youtube", "v3", credentials=creds)
qpath = "meta/queue.json"
q = json.load(open(qpath))
now = datetime.datetime.now(datetime.timezone.utc)
for v in q:
    if v.get("status") != "pending":
        continue
    pub = datetime.datetime.fromisoformat(v["publish_at"])
    if pub > now + datetime.timedelta(hours=48):
        continue  # not due to be uploaded yet
    body = {"snippet": {"title": v["title"], "description": v["description"],
                        "tags": v["tags"], "categoryId": "22", "defaultLanguage": "hi"},
            "status": {"privacyStatus": "private", "publishAt": pub.astimezone(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                       "selfDeclaredMadeForKids": False}}
    media = MediaFileUpload(v["file"], mimetype="video/mp4", resumable=True)
    req = yt.videos().insert(part="snippet,status", body=body, media_body=media)
    resp = None
    while resp is None:
        _, resp = req.next_chunk()
    vid = resp["id"]
    if v.get("pinned_comment"):
        try:
            yt.commentThreads().insert(part="snippet", body={"snippet": {"videoId": vid,
                "topLevelComment": {"snippet": {"textOriginal": v["pinned_comment"]}}}}).execute()
        except Exception as e:
            print("comment failed:", e)
    v["status"], v["video_id"] = "uploaded", vid
    print("uploaded", v["file"], vid)
json.dump(q, open(qpath, "w"), ensure_ascii=False, indent=1)
