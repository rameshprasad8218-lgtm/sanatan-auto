import json,sys
n=sys.argv[1]; extra=json.loads(sys.argv[2]) if len(sys.argv)>2 else []
d=json.load(open(f'data/{n}.json')); ev=[[0,"boom"],[0,"dhol",0.6]]
for l in d['lines'][1:]: ev.append([round(l['start']-0.1,2),"whoosh"])
ev+=extra; json.dump(ev,open(f'data/{n}.events.json','w'))
