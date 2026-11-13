# Run ONCE on your laptop: python get_token.py  (pip install google-auth-oauthlib)
import os
from google_auth_oauthlib.flow import InstalledAppFlow
SCOPES = ["https://www.googleapis.com/auth/youtube.upload",
          "https://www.googleapis.com/auth/youtube",
          "https://www.googleapis.com/auth/yt-analytics.readonly"]
cid = input("Client ID: ").strip()
sec = input("Client Secret: ").strip()
cfg = {"installed": {"client_id": cid, "client_secret": sec,
       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
       "token_uri": "https://oauth2.googleapis.com/token",
       "redirect_uris": ["http://localhost"]}}
flow = InstalledAppFlow.from_client_config(cfg, SCOPES)
creds = flow.run_local_server(port=0, access_type="offline", prompt="consent")
print("\nREFRESH TOKEN (put in GitHub secret YT_REFRESH_TOKEN, do not share):\n", creds.refresh_token)
