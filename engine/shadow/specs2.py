from specs1 import F
SPECS={
'ank7_vibhishan':dict(hot=['रावण','विभीषण','श्रीराम','सीता','शरण','लंका','राम'],h1='रावण का सगा भाई,',h2='राम की शरण में क्यों?',h3='Ramayan ke Ankahe Patra #7',scenes=[
 dict(k='two',who=['rav10','vib'],sky='ember',emo=[dict(brow=0.3),dict(tear=1,smile=0)]),
 dict(k='two',who=['vib','rav10'],sky='dusk',emo=[dict(smile=0.1),dict(brow=0.15)],title='विभीषण की सलाह',ts=100),
 dict(k='rav',sky='ember',shake=0.4,fl=0.4,title='भरी सभा में अपमान',ts=95),
 dict(k='body',who='vib',walk=1,sky='dawn',land='temple',title='लंका छोड़ी'),
 dict(k='crowd',who=['han','lak','han'],gap=320,r=130,sky='purple',land='forest',title='शत्रु की चाल?'),
 dict(k='two',who=['ram','vib'],sky='gold',rays=900,emo=[dict(smile=0.7),dict(smile=0.5)],title='शरणागत की रक्षा',ts=100),
 F('लंका के राजा विभीषण','जय श्रीराम',ts=88,land='river')]),
'kum7_ardh':dict(hot=['कुंभ','अर्धकुंभ','पूर्ण','2027','2021','अमृत','हरिद्वार','गंगे'],h1='हरिद्वार 2027:',h2='कुंभ या अर्धकुंभ?',h3='Kumbh Series #7',scenes=[
 dict(k='kalash',sky='night',land='ghat'),
 dict(k='cards',sky='dawn',land='ghat',items=[['१२ साल','पूर्ण कुंभ']],cy=900,isz=120,title='पूर्ण कुंभ'),
 dict(k='cards',sky='dusk',land='ghat',items=[['२०२१','पिछला पूर्ण कुंभ']],cy=900,isz=130,title='हरिद्वार में'),
 dict(k='cards',sky='purple',items=[['२०२१','पूर्ण कुंभ'],['+ ६ साल','बीच का पड़ाव'],['२०२७','अर्धकुंभ']],cy=700,isz=90,title='६ साल बाद',ts=100),
 dict(k='big',sky='gold',land='ghat',rays=900,title='भव्य आयोजन',sub='पूर्ण कुंभ जैसा',sy=480),
 dict(k='cards',sky='night',items=[['६ मार्च','महाशिवरात्रि'],['८ मार्च','सोमवती अमावस्या'],['१४ अप्रैल','मेष संक्रांति']],cy=700,isz=90,title='तीन अमृत स्नान',ts=100),
 F('हर हर गंगे','कमेंट में लिखें',land='ghat')]),
'jyo7_bhima':dict(hot=['कुंभकर्ण','महादेव','भीम','शिव','ब्रह्मा','भस्म','भीमाशंकर','देवताओं'],h1='कुंभकर्ण के बेटे का',h2='अंत शिव ने क्यों किया?',h3='Jyotirling Yatra #7',scenes=[
 dict(k='two',who=['bhm','shv'],sky='ember',emo=[dict(brow=0.3,wide=0.2),dict(brow=0.15)]),
 dict(k='face',who='bhm',sky='night',land='mount',r=230,emo=dict(brow=0.15),title='कुंभकर्ण का पुत्र भीम',ts=88),
 dict(k='face',who='bhm',sky='snow',land='snow',emo=dict(blink=1,smile=0),title='कठोर तप'),
 dict(k='two',who=['brh','bhm'],sky='gold',rays=900,emo=[dict(smile=0.4),dict(smile=0.5,brow=0.2)],title='ब्रह्मा का वरदान',ts=95),
 dict(k='crowd',who=['vis','ind','sadhu'],gap=320,r=130,sky='ember',shake=0.2,title='पूजा-पाठ बंद',ts=105),
 dict(k='trish',sky='purple',fl=0.7,shake=0.7,title='महादेव प्रकट'),
 F('भीमाशंकर','हर हर महादेव',k='lingam',land='mount')]),
}
