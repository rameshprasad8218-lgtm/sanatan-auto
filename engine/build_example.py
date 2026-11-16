import json,os,shutil,sys
P={}
P['bharat1']=dict(chip='BHARAT YATRA • EP 1',lines=[
('तिरुपति में लोग बाल क्यों देते हैं?','WHY DO DEVOTEES OFFER HAIR AT TIRUPATI?','hair','ask','ask',0),
('भारत यात्रा, एपिसोड एक.','BHARAT YATRA, EPISODE 1','pinAP','wave','wave',0),
('आज का राज्य, आंध्र प्रदेश.',"TODAY'S STATE: ANDHRA PRADESH",'pinAP','point',None,0),
('पहाड़ियों पर बसा है तिरुमला का मंदिर.','THE TEMPLE SITS ON THE TIRUMALA HILLS','gopuram','rest','rest',0),
('यहाँ बालाजी विराजते हैं, यानी भगवान वेंकटेश्वर.','BALAJI, KNOWN AS LORD VENKATESWARA','namam','pray',None,0),
('मान्यता के अनुसार, वे भगवान विष्णु का रूप हैं.','BELIEVED TO BE A FORM OF VISHNU','namam','rest','think',0),
('कहते हैं, उन्होंने कुबेर से कर्ज़ लिया था.','THE LEGEND: HE TOOK A LOAN FROM KUBER','bag','think','think',0),
('भक्त आज भी दान देकर उस कर्ज़ में हाथ बँटाते हैं.','DEVOTEES STILL DONATE TO HELP REPAY IT','coins','point','rest',0),
('बाल देना भी एक दान माना जाता है.','OFFERING HAIR IS SEEN AS A DONATION','hair','point',None,0),
('यानी अपना अहंकार प्रभु को अर्पित करना.','OFFERING YOUR EGO TO GOD','diya','pray',None,0),
('इसे मन्नत का मुंडन कहते हैं.','IT IS CALLED A VOW TONSURE','hair','rest','think',0),
('अगले राज्य के लिए सब्सक्राइब करो!','SUBSCRIBE FOR THE NEXT STATE!','pinUP','wave','wave','सब्सक्राइब'),
('पुरुष और महिलाएँ, दोनों बाल देते हैं.','BOTH MEN AND WOMEN DO IT','hair','rest','rest',0),
('यह कल्याण कट्टा नाम की जगह पर होता है.','AT A PLACE CALLED KALYANA KATTA','gopuram','point','rest',0),
('कहा जाता है कि यह सेवा मुफ़्त होती है.','IT IS SAID TO BE FREE OF CHARGE','coins','up','rest',0),
('तो इन बालों का क्या होता है?','SO WHAT HAPPENS TO THE HAIR?','ask','think','think',0),
('सुना है, इनकी नीलामी होती है.','THEY ARE SAID TO BE AUCTIONED','coins','think',None,0),
('और वो पैसा मंदिर की सेवाओं में लगता है.','FUNDS GO TO TEMPLE SERVICES','coins','point','rest',0),
('गोविंदा, गोविंदा!','GOVINDA, GOVINDA!','rays','pray','pray','जय'),
('आप कभी तिरुपति गए हैं?','HAVE YOU EVER VISITED TIRUPATI?','ask','ask','ask',0),
('कमेंट में बताओ. अगला पड़ाव, काशी!','COMMENT BELOW. NEXT STOP: KASHI!','pinUP','wave','wave',0),
])
P['bharat2']=dict(chip='BHARAT YATRA • EP 2',lines=[
('काशी को मोक्ष की नगरी क्यों कहते हैं?','WHY IS KASHI CALLED THE CITY OF MOKSHA?','ask','ask','ask',0),
('भारत यात्रा, एपिसोड दो.','BHARAT YATRA, EPISODE 2','pinUP','wave','wave',0),
('आज का राज्य, उत्तर प्रदेश.',"TODAY'S STATE: UTTAR PRADESH",'pinUP','point',None,0),
('गंगा किनारे बसी है काशी, यानी वाराणसी.','KASHI, OR VARANASI, SITS ON THE GANGA','ganga','rest','rest',0),
('इसे दुनिया के सबसे पुराने बसे शहरों में गिना जाता है.','ONE OF THE OLDEST LIVING CITIES','ganga','think','think',0),
('यहाँ विराजते हैं बाबा विश्वनाथ.','BABA VISHWANATH RESIDES HERE','trishul','pray',None,0),
('जो बारह ज्योतिर्लिंगों में गिने जाते हैं.','ONE OF THE 12 JYOTIRLINGAS','trishul','point','rest',0),
('मान्यता है कि काशी शिव के त्रिशूल पर टिकी है.',"BELIEVED TO REST ON SHIVA'S TRIDENT",'trishul','think','think',0),
('कहते हैं, यहाँ प्रलय का असर नहीं होता.','SAID TO BE UNTOUCHED BY THE END OF WORLD','trishul','rest','think',0),
('मान्यता है, यहाँ अंतिम साँस लेने वाले को मोक्ष मिलता है.','BELIEF: THE LAST BREATH HERE GIVES MOKSHA','rays','pray','pray',0),
('कहा जाता है, शिव कान में तारक मंत्र सुनाते हैं.','SAID: SHIVA WHISPERS THE TARAKA MANTRA','rays','pray','rest',0),
('अगले राज्य के लिए सब्सक्राइब करो!','SUBSCRIBE FOR THE NEXT STATE!','ganga','wave','wave','सब्सक्राइब'),
('शाम को दशाश्वमेध घाट पर गंगा आरती होती है.','EVENING GANGA AARTI AT DASHASHWAMEDH GHAT','ganga','point','rest',0),
('दीयों की रोशनी में पूरी नदी सुनहरी हो जाती है.','THE RIVER TURNS GOLDEN WITH DIYAS','diya','pray',None,0),
('और बनारसी पान-कचौड़ी मत भूलना!',"DON'T MISS BANARASI PAAN AND KACHORI!",'plate','point','rest',0),
('काशी सिर्फ़ शहर नहीं, एक आस्था है.','KASHI IS NOT JUST A CITY, IT IS FAITH','rays','rest','pray',0),
('हर हर महादेव!','HAR HAR MAHADEV!','trishul','pray','pray','हर हर'),
('आप काशी कब गए थे?','WHEN DID YOU VISIT KASHI?','ask','ask','ask',0),
('कमेंट में बताओ. अगला राज्य, जल्द ही!','COMMENT BELOW. NEXT STATE COMING SOON!','pinUP','wave','wave',0),
])
P['driver2']=dict(chip='DRIVER KI AASTHA • 2',lines=[
('ट्रक पर नींबू-मिर्च क्यों लटकाते हैं?','WHY DO TRUCKS HANG LEMON AND CHILLI?','nimbu','ask','ask',0),
('ड्राइवर की आस्था, भाग दो.','DRIVER KI AASTHA, PART 2','truck','wave','wave',0),
('आपने हर ट्रक पर ये ज़रूर देखा होगा.','YOU HAVE SEEN THIS ON EVERY TRUCK','truck','point','rest',0),
('मान्यता के अनुसार, ये बुरी नज़र से बचाता है.','BELIEVED TO WARD OFF THE EVIL EYE','nazar','rest','rest',0),
('कहते हैं, अलक्ष्मी को खट्टा और तीखा पसंद है.','SAID: ALAKSHMI LIKES SOUR AND SPICY','nimbu','think','think',0),
('तो वो इसी से खुश होकर आगे बढ़ जाती हैं.','SO SHE IS PLEASED AND MOVES ON','nimbu','rest','think',0),
('इसे अक्सर मंगलवार या शनिवार को बदला जाता है.','OFTEN CHANGED ON TUESDAY OR SATURDAY','calendar','point',None,0),
('कई ड्राइवर नई गाड़ी की पहले पूजा करवाते हैं.','MANY DRIVERS DO A PUJA FOR A NEW TRUCK','diya','pray','rest',0),
('और डैशबोर्ड पर हनुमान जी की फोटो रखते हैं.',"AND KEEP HANUMAN JI'S PHOTO ON THE DASHBOARD",'hanuman','pray',None,0),
('लंबे सफ़र में भरोसा हिम्मत देता है.','FAITH GIVES COURAGE ON LONG ROADS','road','rest','think',0),
('ऐसी कहानियों के लिए सब्सक्राइब करो!','SUBSCRIBE FOR MORE STORIES LIKE THIS!','truck','wave','wave','सब्सक्राइब'),
('लेकिन सुरक्षा सिर्फ़ भरोसे से नहीं होती.','BUT SAFETY NEEDS MORE THAN FAITH','ask','think','think',0),
('सफ़र से पहले टायर ज़रूर जाँचें.','ALWAYS CHECK THE TYRES BEFORE A TRIP','tyre','point','rest',0),
('ब्रेक और लाइट भी देखें.','CHECK BRAKES AND LIGHTS TOO','tyre','point',None,0),
('नींद आए तो गाड़ी किनारे लगाकर आराम करें.','SLEEPY? PULL OVER AND REST','road','rest','think',0),
('भरोसा भी रखो, सावधानी भी.','KEEP FAITH, AND KEEP CARE','hanuman','pray','pray',0),
('यही असली ड्राइवर की आस्था है.',"THAT IS A DRIVER'S TRUE FAITH",'rays','rest','pray','जय'),
('आपके ट्रक पर क्या लटका है?','WHAT HANGS ON YOUR TRUCK?','ask','ask','ask',0),
('कमेंट में बताओ. जय बजरंगबली!','COMMENT BELOW. JAI BAJRANGBALI!','hanuman','pray','wave',0),
])
base=os.path.expanduser('~/faceless-shorts')
for name,d in P.items():
    pr=f'{base}/{name}'
    if os.path.exists(pr): shutil.rmtree(pr)
    shutil.copytree(f'{base}/mangal1',pr,ignore=shutil.ignore_patterns('renders','review','data','node_modules'))
    for sub in('renders','review','data'): os.makedirs(f'{pr}/{sub}',exist_ok=True)
    if os.path.exists(f'{base}/mangal1/node_modules'): os.symlink(f'{base}/mangal1/node_modules',f'{pr}/node_modules')
    sj=json.load(open(f'{pr}/script.json'))
    sj['title']=name; sj['lines']=[dict(text=en,say=hi,hi=hi,en=en) for hi,en,*_ in d['lines']]
    json.dump(sj,open(f'{pr}/script.json','w'),ensure_ascii=False,indent=1)
    sc=[[l[2],l[3],l[4]] for l in d['lines']]
    stick={i:l[5] for i,l in enumerate(d['lines']) if l[5]}
    js=open(f'{base}/mangal1/src/shots.js').read()
    head=js.split('// [poster')[0].replace("import { wall, person, poster }","import { wall, person, poster, glassChip, sticker, glitch, petals }")
    body=f'''// [poster, main pose, second pose or null]
const SC = {json.dumps(sc,ensure_ascii=False)};
const STK = {json.dumps(stick,ensure_ascii=False)};
const CHIP = {json.dumps(d['chip'])};
export function buildShots() {{
  const S = [], CUES = [], add = (o) => (S.push(o), o), cut = (i) => (i === 0 ? 0 : L(i) - 0.05);
  SC.forEach(([pk, pm, ps], i) => add({{ id: 'M' + i, at: cut(i), zoom: 0.07, xfade: 0.04, draw(lt, d, t) {{
    wall(); const same = SC[i - 1] && SC[i - 1][0] === pk; poster(pk, t, same ? 1 : seg(lt, 0, 0.3));
    person('main', ps ? 300 : 440, 1810, 0.9, 1, pm, t, {{ talk: true }});
    if (ps) person('second', 790, 1810, 0.9, -1, ps, t + 1.3);
    petals(t); glassChip(540, 118, 640, 84, CHIP, t, eio(clamp(t / 0.5)));
    if (STK[i]) sticker(i % 2 ? 860 : 220, 330, 120, STK[i], t, i % 2 ? 0.2 : -0.2, '#D62828');
    if (!same && lt < 0.16) glitch(1 - lt / 0.16);
  }} }}));
  return {{ shots: S, cues: CUES }};
}}
'''
    open(f'{pr}/src/shots.js','w').write(head+body)
print('ok')
