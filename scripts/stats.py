import json, os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
creds = Credentials(None, refresh_token=os.environ["YT_REFRESH_TOKEN"], token_uri="https://oauth2.googleapis.com/token",
    client_id=os.environ["YT_CLIENT_ID"], client_secret=os.environ["YT_CLIENT_SECRET"])
yt = build("youtube", "v3", credentials=creds)
ch = yt.channels().list(part="statistics,snippet", mine=True).execute()["items"][0]
out = {"channel": ch["snippet"]["title"], "stats": ch["statistics"], "videos": []}
q = json.load(open("meta/queue.json")); ids = [v["video_id"] for v in q if v.get("video_id")]
for i in range(0, len(ids), 50):
    for it in yt.videos().list(part="snippet,statistics,status", id=",".join(ids[i:i+50])).execute()["items"]:
        s = it["statistics"]; out["videos"].append({"id": it["id"], "title": it["snippet"]["title"][:50], "pub": it["snippet"]["publishedAt"], "privacy": it["status"]["privacyStatus"], "views": s.get("viewCount"), "likes": s.get("likeCount"), "comments": s.get("commentCount")})
json.dump(out, open("meta/stats.json", "w"), ensure_ascii=False, indent=1)
print(json.dumps(out, ensure_ascii=False))
