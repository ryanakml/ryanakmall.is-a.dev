// Focused final review: real browser text/contrast/evidence checks and deliverable screenshots.
import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
const out='outputs/final-review-2026-10-20';mkdirSync(out,{recursive:true});
const report={checkedAt:new Date().toISOString(),method:'Brave via installed Taste CDP helper; reduced motion for stable screenshots, no site preference changed.',checks:[],measurements:[]};
const check=(name,pass,detail)=>{report.checks.push({name,pass:!!pass,detail});console.log(`${pass?'PASS':'FAIL'} ${name}`)};
const browser=await Browser.launch();
const inspect=async(p,tag)=>{
 const data=await p.eval(()=>{
  const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
  const luminance=a=>a.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((v,c,i)=>v+c*[.2126,.7152,.0722][i],0);
  const contrast=(a,b)=>{const aa=luminance(a),bb=luminance(b);return(Math.max(aa,bb)+.05)/(Math.min(aa,bb)+.05)};
  const background=e=>{for(let p=e;p;p=p.parentElement){const c=rgb(getComputedStyle(p).backgroundColor);if(c.length===3||c[3]>0.99)return c}return[255,255,255]};
  const notes=[...document.querySelectorAll('figcaption,.b-picture-note,.b-picture-source,.work-verification,.work-thumbnail-source,.work-evidence a')].filter(e=>e.getBoundingClientRect().height>0).map(e=>{const s=getComputedStyle(e);return{text:e.textContent.trim(),size:parseFloat(s.fontSize),lineHeight:s.lineHeight,contrast:contrast(rgb(s.color),background(e)),height:e.getBoundingClientRect().height}});
  const active=document.querySelector('[data-work-panel]:not([hidden])');
  const evidence=active?[...active.querySelectorAll('.work-evidence a')].map(a=>({label:a.textContent.trim(),href:a.href,height:a.getBoundingClientRect().height})):[];
  return{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,notes,evidence,current:active?.id,sourceStatus:active?.innerText.includes('Source reviewed. Runtime not independently tested.'),capture:[...document.images].filter(i=>i.alt.startsWith('Reconstructed FlowDesk')&&i.getBoundingClientRect().height>0).map(i=>({displayWidth:i.getBoundingClientRect().width,naturalWidth:i.naturalWidth,src:i.currentSrc}))};
 });
 report.measurements.push({tag,...data});
 check(tag+': captions/source notes >=16px',data.notes.length>0&&data.notes.every(n=>n.size>=16),data.notes);
 check(tag+': text contrast >=4.5:1',data.notes.every(n=>n.contrast>=4.5),data.notes.map(n=>({text:n.text,contrast:n.contrast})));
 check(tag+': no horizontal overflow',data.scrollWidth<=data.width+1,{width:data.width,scrollWidth:data.scrollWidth});
 if(data.current)check(tag+': pinned evidence and honest verification level',data.sourceStatus&&data.evidence.length>=2&&data.evidence.every(e=>/^https:\/\/github\.com\/ryanakml\/[^/]+\/blob\/[a-f0-9]{40}\//.test(e.href)&&e.height>=44),data.evidence);
};
const loadImages=async p=>{
 const n=await p.eval(()=>document.images.length);
 for(let i=0;i<n;i++){
  const visible=await p.eval(i=>{const e=document.images[i];if(!e.getBoundingClientRect().height)return false;e.scrollIntoView({behavior:'instant',block:'center'});return true},i);
  if(visible){await sleep(90);await p.eval(i=>document.images[i].decode().catch(()=>false),i)}
 }
};
try{
 for(const width of[1440,768,390]){
  const p=await browser.newPage({width,height:900,mobile:width===390,reducedMotion:true});
  await p.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  for(const route of['home','work']){
   await p.goto('http://127.0.0.1:4321/'+(route==='work'?'work/':''),{settleMs:600});await p.eval(()=>document.fonts.ready);
   await loadImages(p);await inspect(p,`${route} ${width}`);
   if(width!==768){
    await p.eval(()=>scrollTo({top:0,behavior:'instant'}));await sleep(100);
    await p.screenshot({path:`${out}/${route}-${width===1440?'desktop':'mobile'}-full.png`,format:'png',fullPage:true});
    await p.screenshot({path:`${out}/${route}-${width===1440?'desktop':'mobile'}-fold.png`,format:'png'});
   }
   if(route==='home'&&width!==768){
    await p.eval(()=>document.getElementById('about').scrollIntoView({behavior:'instant',block:'start'}));await sleep(80);
    await p.screenshot({path:`${out}/about-${width===1440?'desktop':'mobile'}.png`,format:'png'});
   }
   if(route==='work')for(const id of['wabrix','deadbolt']){
    const point=await p.eval(id=>{let a=document.querySelector(`[data-work-select="${id}"]`);a.scrollIntoView({behavior:'instant',block:'center'});let r=a.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}},id);
    await p.send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});await p.send('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',clickCount:1});await sleep(180);await loadImages(p);await inspect(p,`${id} ${width}`);
   }
  }
  await p.close();
 }
}catch(e){report.error=e.stack;check('Audit completed',false,e.message)}
finally{await browser.close();report.summary={passed:report.checks.filter(c=>c.pass).length,failed:report.checks.filter(c=>!c.pass).length};writeFileSync(`${out}/browser-audit.json`,JSON.stringify(report,null,2)+'\n');console.log(report.summary);if(report.summary.failed)process.exitCode=1}
