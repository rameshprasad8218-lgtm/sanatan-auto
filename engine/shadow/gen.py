import sys,json
n=sys.argv[1];c=json.load(open(f'parts/{n}.json'));d=json.load(open(f'data/{n}.json'))
lib=open('parts/lib.js').read().replace('const HD = 31.2;',f"const HD = {d['duration']-0.35:.2f};")+open('parts/extra.js').read()
com=open('parts/common.js').read().replace('__HOT__',json.dumps(c['hot'],ensure_ascii=False)).replace('__H1__',json.dumps(c['h1'],ensure_ascii=False)).replace('__H2__',json.dumps(c['h2'],ensure_ascii=False)).replace('__H3__',json.dumps(c['h3'],ensure_ascii=False))
open(f'stories/{n}.js','w').write(lib+open(f'parts/{n}.js').read()+'\n'+com)
