// Use the actual approved home page as its sharing artwork.
import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
const browser=await Browser.launch();
try {
 const p=await browser.newPage({width:1200,height:630,reducedMotion:true});
 await p.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await p.goto('http://127.0.0.1:4321/');
 await p.eval(()=>document.fonts.ready);
 // Export composition: same approved type and content, fitted to the share ratio.
 await p.eval(()=>{const style=document.createElement('style');style.textContent='.b-hero{padding-top:20px;padding-bottom:0}.b-hero-title{font-size:200px}.b-hero-bottom{display:block;margin-top:30px}.b-introduction{font-size:24px;max-width:80ch}.b-hero-bottom .b-button,main>section:not(.b-hero),footer{display:none}';document.head.append(style)});
 await p.screenshot({path:'public/social-preview.png',format:'png'});
} finally {await browser.close();}
