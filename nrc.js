window.W=(ms)=>new Promise(r=>setTimeout(r,ms));
window.nrcSet=async(el,txt)=>{el.focus();document.execCommand('selectAll');document.execCommand('insertText',false,txt);await W(300);return el.innerText.slice(0,30);};
window.nrcFocus=(re)=>{const i=[...document.querySelectorAll('input')].filter(i=>i.offsetParent).find(i=>re.test(i.value));i.focus();i.select();return i.value;};
window.nrcType=(t)=>{document.execCommand('insertText',false,t);return document.activeElement.value;};
window.nrcStart=async(key,name)=>{
  window.KIT=window.KIT||await fetch('https://raw.githubusercontent.com/rameshprasad8218-lgtm/sanatan-auto/nrc-media/kit.json?x='+Date.now()).then(r=>r.json());
  for(let i=0;i<20&&!document.querySelector('input[type=file]');i++)await W(500);
  const inp=document.querySelector('input[type=file]');
  const b=await fetch('https://raw.githubusercontent.com/rameshprasad8218-lgtm/sanatan-auto/nrc-media/'+key+'.mp4').then(r=>r.blob());
  const dt=new DataTransfer();dt.items.add(new File([b],name+'.mp4',{type:'video/mp4'}));inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));
  for(let i=0;i<40&&document.querySelectorAll('#textbox').length<2;i++)await W(500);
  await W(1500);
  const tb=document.querySelectorAll('#textbox');await nrcSet(tb[0],KIT[key].title);await nrcSet(tb[1],KIT[key].desc);
  const tog=document.querySelector('#toggle-button');if(tog&&/more|advanced/i.test(tog.innerText))tog.click();await W(800);
  const ti=document.querySelector('#tags-container input, input[aria-label="Tags"]');ti.focus();document.execCommand('insertText',false,KIT[key].tags);
  return 'meta ok '+b.size;};
window.nrcSched1=async(date)=>{
  const chips=document.querySelectorAll('#chip-text').length;
  const nk=document.querySelector('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]');if(nk&&!nk.hasAttribute('checked'))nk.click();
  for(let i=0;i<3;i++){document.querySelector('#next-button').click();await W(1500);}
  document.querySelector('#second-container-expand-button').click();await W(1000);
  document.querySelector('#datepicker-trigger').click();await W(800);
  nrcFocus(/\d{4}$/);nrcType(date);return 'chips '+chips;};
window.nrcSched2=async(time)=>{await W(600);nrcFocus(/^\d\d?:\d\d/);return nrcType(time);};
window.nrcDone=async()=>{await W(800);const d=document.querySelector('#datepicker-trigger')?.innerText;const t=[...document.querySelectorAll('input')].filter(i=>i.offsetParent).map(i=>i.value).join('|');const link=document.querySelector('a.ytcp-video-info, ytcp-video-info a')?.href;document.querySelector('#done-button').click();await W(4000);return [d,t,link,document.querySelector('tp-yt-paper-dialog[opened]')?.innerText?.slice(0,90)];};
'loaded';
