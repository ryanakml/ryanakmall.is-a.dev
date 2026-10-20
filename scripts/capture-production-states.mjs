import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { mkdirSync } from 'node:fs';
const out='outputs/screenshots';mkdirSync(out,{recursive:true});
const browser=await Browser.launch();
try{
 for(const width of [1440,390]){
  const p=await browser.newPage({width,height:900,mobile:width===390,reducedMotion:true});
  await p.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  for(const id of ['wabrix','deadbolt']){
   await p.goto('http://127.0.0.1:4321/work/#'+id,{settleMs:800});
   await p.eval(()=>document.fonts.ready);
   await p.eval(id=>document.getElementById(id).scrollIntoView({behavior:'instant',block:'start'}),id);
   await sleep(300);
   await p.screenshot({path:`${out}/work-${id}-${width}.png`,format:'png'});
  }
  await p.goto('http://127.0.0.1:4321/',{settleMs:600});
  const point=await p.eval(()=>{const b=document.querySelector('[data-lens-select="architecture"]');b.scrollIntoView({behavior:'instant',block:'start'});const r=b.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}});
  await p.send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});await p.send('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',clickCount:1});await sleep(300);
  await p.screenshot({path:`${out}/home-behind-it-${width}.png`,format:'png'});
  await p.close();
 }
}finally{await browser.close();}
