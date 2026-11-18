import sys, json, re, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
from scripts import STORIES
k=Kokoro("assets/kokoro-v1.0.onnx","assets/voices-v1.0.bin")
SR=24000
def trim(a,thr=0.012):
    idx=np.where(np.abs(a)>thr)[0]
    return a[max(idx[0]-int(0.03*SR),0):idx[-1]+int(0.08*SR)] if len(idx) else a
for name in sys.argv[1:]:
    s=STORIES[name]; out=[]; tl=[]; t=0.35; out.append(np.zeros(int(0.35*SR),dtype=np.float32))
    for i,line in enumerate(s["lines"]):
        a,sr=k.create(line,voice=s["voice"],speed=float(__import__("os").environ.get("SPD","1.0")),lang="hi"); assert sr==SR
        a=trim(a.astype(np.float32)); d=len(a)/SR
        gap=0.42 if line.rstrip().endswith(("।","?")) else 0.3
        tl.append({"i":i,"text":line,"start":round(t,3),"end":round(t+d,3)})
        out.append(a); out.append(np.zeros(int(gap*SR),dtype=np.float32)); t+=d+gap
        print(name,i,round(d,2),flush=True)
    out.append(np.zeros(int(0.9*SR),dtype=np.float32))
    y=np.concatenate(out); y=y/np.max(np.abs(y))*0.92
    sf.write(f"tts/{name}.wav",y,SR); json.dump({"duration":len(y)/SR,"lines":tl},open(f"tts/{name}.json","w"),ensure_ascii=False,indent=1)
    print(name,"total",len(y)/SR,flush=True)
