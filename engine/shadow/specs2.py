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

SPECS.update({
'ank8_jambavan':dict(hot=['हनुमान','जामवंत','शक्ति','सागर','सीता','श्राप','लंका','बजरंगबली'],h1='हनुमान जी अपनी शक्ति',h2='क्यों भूल गए थे?',h3='Ramayan ke Ankahe Patra #8',scenes=[
 dict(k='face',who='han',sky='dusk',land='river',y=1200,emo=dict(smile=0.1)),
 dict(k='crowd',who=['han','jam','han'],gap=320,r=130,sky='purple',land='river',title='सौ योजन सागर',ts=110),
 dict(k='face',who='han',sky='night',land='river',y=1250,emo=dict(blink=1,smile=0.1),title='हनुमान जी चुप'),
 dict(k='two',who=['sadhu','han'],sky='ember',land='forest',title='ऋषियों का श्राप',ts=105,emo=[dict(brow=0.25,smile=0),dict(smile=0.6)]),
 dict(k='face',who='jam',sky='dawn',land='mount',title='जामवंत बोले'),
 dict(k='grow',sky='gold',land='mount',fl=0.5,shake=0.5,title='विशाल रूप!'),
 F('जय बजरंगबली','कमेंट में लिखें',land='river')]),
'kum8_aarti':dict(hot=['गंगा','आरती','हर','पौड़ी','घंटियाँ','दीप','मालवीय','गंगे'],h1='हर की पौड़ी की',h2='आरती इतनी खास क्यों?',h3='Kumbh Series #8',scenes=[
 dict(k='aarti',sky='night',land='ghat'),
 dict(k='cards',sky='dawn',land='ghat',items=[['सुबह','मंगला आरती'],['शाम','श्रृंगार आरती']],cy=700,isz=92,title='रोज़ दो बार'),
 dict(k='aarti',sky='dusk',land='ghat',title='घंटे और शंख'),
 dict(k='aarti',sky='purple',land='ghat',y=1130,s=0.9,title='जलते दीप',sub='माँ गंगा के नाम',sy=480),
 dict(k='cards',sky='night',land='ghat',items=[['१९१६','पंडित मदन मोहन मालवीय']],cy=900,isz=130,title='श्री गंगा सभा'),
 dict(k='crowd',who=['sadhu','devi','gwl'],gap=320,r=130,y=1100,sky='sea',land='ghat',title='कुंभ 2027',sub='भारी भीड़, जल्दी पहुँचें',sy=480,ss=72),
 F('हर हर गंगे','कमेंट में लिखें',k='aarti',land='ghat',rays=900,sun=None)]),
'jyo8_vaidya':dict(hot=['रावण','शिवलिंग','लंका','महादेव','शिव','शर्त','ग्वाले','वैद्यनाथ'],h1='रावण शिवलिंग को',h2='लंका क्यों न ले जा सका?',h3='Jyotirling Yatra #8',scenes=[
 dict(k='two',who=['rav10','shv'],sky='ember',emo=[dict(brow=0.2),dict(smile=0.4)]),
 dict(k='face',who='rav10',sky='snow',land='snow',emo=dict(blink=1,smile=0),title='रावण की तपस्या',ts=105),
 dict(k='lingam',sky='purple',title='एक शर्त',fl=1.2),
 dict(k='two',who=['rav10','gwl'],sky='dusk',land='forest',title='रास्ते में रुका',emo=[dict(brow=0.15),dict(smile=0.5)]),
 dict(k='face',who='gwl',sky='dawn',land='forest',title='ग्वाले को सौंपा'),
 dict(k='lingam',sky='night',land='ground',shake=1.0,fl=1.0,title='वहीं स्थापित!'),
 F('बाबा वैद्यनाथ','हर हर महादेव',k='lingam',land='temple')]),
})
