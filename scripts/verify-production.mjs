// Repeatable local browser interaction checks. No application files are modified.
import { mkdirSync, writeFileSync } from 'node:fs';
import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const base = process.env.PRODUCTION_URL || 'http://127.0.0.1:4321';
const report = { checkedAt: new Date().toISOString(), base, method: 'Installed headless Chromium-family browser through Taste CDP helper; native mouse/touch/key input for activation.', checks: [], pages: [], limitations: ['Baseline interaction/accessibility checks, not a WCAG audit.', 'External GitHub and mail destinations checked for actual href/name only; no external navigation, mailbox delivery or service availability claimed.', 'Screenshots and visual critique are recorded separately by the lead.'] };
const browser = await Browser.launch();
const check = (name, pass, detail) => { report.checks.push({ name, pass: !!pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`); };

async function key(p, name, shift = false) {
  const [code, vk, value] = name === 'Space' ? ['Space', 32, ' '] : [name, name === 'Tab' ? 9 : 13, name];
  await p.send('Input.dispatchKeyEvent', { type: 'keyDown', key: value, code, windowsVirtualKeyCode: vk, modifiers: shift ? 8 : 0, ...(name === 'Enter' ? { text: '\r' } : name === 'Space' ? { text: ' ' } : {}) });
  await p.send('Input.dispatchKeyEvent', { type: 'keyUp', key: value, code, windowsVirtualKeyCode: vk, modifiers: shift ? 8 : 0 });
  await sleep(50);
}

async function focusByTab(p, selector) {
  for (let i = 0; i < 90; i++) {
    const yes = await p.eval(s => document.activeElement?.matches(s), selector);
    if (yes) return i;
    await key(p, 'Tab');
  }
  throw new Error(`Tab traversal did not reach ${selector}`);
}

async function activate(p, selector, touch = false) {
  const point = await p.eval(s => {
    const el = document.querySelector(s); if (!el) throw new Error(`Missing ${s}`);
    el.scrollIntoView({ behavior: 'instant', block: 'center' });
    const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, selector);
  await sleep(60);
  if (touch) {
    await p.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...point, radiusX: 2, radiusY: 2, force: 1, id: 1 }] });
    await p.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  } else {
    await p.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
    await p.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 });
    await p.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point, button: 'left', clickCount: 1 });
  }
  await sleep(450);
}

async function open(route, opts = {}) {
  const p = await browser.newPage({ width: opts.width || 1440, height: 900, mobile: !!opts.mobile, reducedMotion: !!opts.reducedMotion });
  const info = { route, ...opts, badResponses: [], failedRequests: [], consoleErrors: [], exceptions: p.consoleErrors };
  info.hostReducedMotion = await p.eval(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  await p.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: opts.reducedMotion ? 'reduce' : 'no-preference' }] });
  info.emulatedMotion = opts.reducedMotion ? 'reduce' : 'no-preference';
  await p.send('Network.enable');
  browser.on(p.sessionId, 'Network.responseReceived', e => { if (e.response.status >= 400) info.badResponses.push({ url: e.response.url, status: e.response.status }); });
  browser.on(p.sessionId, 'Network.loadingFailed', e => info.failedRequests.push({ error: e.errorText, type: e.type, canceled: !!e.canceled }));
  browser.on(p.sessionId, 'Runtime.consoleAPICalled', e => { if (e.type === 'error') info.consoleErrors.push(e.args.map(a => a.value || a.description || '').join(' ')); });
  if (opts.noJS) await p.send('Emulation.setScriptExecutionDisabled', { value: true });
  await p.goto(base + route, { settleMs: 1400 });
  await p.eval(() => document.fonts.ready.then(() => true));
  info.runtime = await p.eval(() => ({ reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, scripts: [...document.scripts].map(s=>s.src || 'inline module'), stylesheets: [...document.styleSheets].map(s=>s.href || 'inline style') }));
  report.pages.push(info);
  p.evidence = info;
  return p;
}

async function layout(p, tag) {
  const result = await p.eval(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, panels: [...document.querySelectorAll('[data-project]')].map(el => ({ id: el.dataset.project, hidden: el.hidden, visible: getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().height > 0 })), current: document.querySelector('[data-select][aria-current="true"]')?.dataset.select }));
  check(`${tag}: no horizontal overflow`, result.scrollWidth <= result.width + 1, result);
  return result;
}

async function fonts(p, route) {
  await p.send('DOM.enable'); await p.send('CSS.enable');
  const { root } = await p.send('DOM.getDocument');
  const result = {};
  for (const selector of ['h1', 'main p']) {
    const { nodeId } = await p.send('DOM.querySelector', { nodeId: root.nodeId, selector });
    result[selector] = (await p.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
  }
  const loaded = await p.eval(() => [...document.fonts].map(f => ({ family: f.family, status: f.status, weight: f.weight })));
  const used = Object.values(result).flat();
  const expected = ['Imbue', 'Albert Sans'];
  check(`${route}: intended fonts actually rendered`, expected.every(name => used.some(f => f.isCustomFont && f.familyName.replaceAll(' ', '').includes(name.replaceAll(' ', '')))), { platform: result, fontFaceSet: loaded });
}

async function disclosures(p, route) {
  const count = await p.eval(() => document.querySelectorAll('details').length);
  check(`${route}: native disclosure exists`, count > 0, { count });
  for (let i = 0; i < count; i++) {
    await p.eval(index => document.querySelectorAll('details > summary')[index].setAttribute('data-test-summary',''), i);
    const selector = '[data-test-summary]';
    // These pages each have one disclosure; selector remains document based.
    const tabs = await focusByTab(p, selector);
    const focus = await p.eval(() => { const e=document.activeElement, s=getComputedStyle(e);return { tag:e.tagName,text:e.innerText,outlineStyle:s.outlineStyle,outlineWidth:s.outlineWidth,visible:e.matches(':focus-visible') }; });
    check(`${route}: disclosure receives visible Tab focus`, focus.visible && focus.outlineStyle !== 'none' && parseFloat(focus.outlineWidth) > 0, { tabs, ...focus });
    await key(p, 'Enter');
    check(`${route}: Enter opens native disclosure`, await p.eval(() => document.activeElement.closest('details').open), {});
    await key(p, 'Space');
    check(`${route}: Space closes native disclosure`, !(await p.eval(() => document.activeElement.closest('details').open)), {});
    await p.eval(() => document.querySelector('[data-test-summary]').removeAttribute('data-test-summary'));
  }
}

async function assetsAndLinks(p, route) {
  // Visit every visible image's real viewport, allowing native lazy loading to
  // request/decode it. A fast wheel straight to the footer can correctly skip it.
  const imageCount = await p.eval(() => document.images.length);
  for (let i = 0; i < imageCount; i++) {
    const visible = await p.eval(index => {
      const image = document.images[index];
      if (!image || !image.getBoundingClientRect().height) return false;
      image.scrollIntoView({ behavior: 'instant', block: 'center' });
      return true;
    }, i);
    if (visible) {
      await sleep(150);
      await p.eval(index => Promise.race([
        document.images[index].decode().catch(() => false),
        new Promise(resolve => setTimeout(() => resolve(false), 4000)),
      ]), i);
    }
  }
  const data = await p.eval(() => ({ images: [...document.images].filter(i=>i.getBoundingClientRect().height>0).map(i=>({src:i.currentSrc,complete:i.complete,width:i.naturalWidth,alt:i.alt})), anchors:[...document.querySelectorAll('a')].map(a=>({text:a.innerText.trim()||a.getAttribute('aria-label'),href:a.getAttribute('href'),visible:a.getBoundingClientRect().height>0})), deadHashes:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash) }));
  check(`${route}: images decoded`, data.images.every(i=>i.complete && i.width > 0), data.images);
  check(`${route}: internal hash targets exist`, data.deadHashes.length === 0, data.deadHashes);
  check(`${route}: real named contact and GitHub destinations`, data.anchors.some(a=>a.href === 'mailto:ryan@nylo.me' && a.text && a.visible) && data.anchors.some(a=>a.href === 'https://github.com/ryanakml' && a.text && a.visible), data.anchors.filter(a=>a.href?.startsWith('mailto:')||a.href?.includes('github.com')));
  check(`${route}: no HTTP asset failures or JS exceptions`, p.evidence.badResponses.length === 0 && p.evidence.failedRequests.filter(e=>!e.canceled).length===0 && p.evidence.consoleErrors.length===0 && p.consoleErrors.length===0, p.evidence);

}

async function lens(p, tag, touch = false) {
  for (const id of ['architecture', 'interface']) {
    await activate(p, `[data-lens-select="${id}"]`, touch);
    const data = await p.eval(() => ({ current:document.querySelector('[data-lens-select][aria-pressed="true"]')?.getAttribute('data-lens-select'), panels:[...document.querySelectorAll('[data-lens-panel]')].map(e=>({id:e.getAttribute('data-lens-panel'),visible:!e.hidden&&e.getBoundingClientRect().height>0})) }));
    check(`${tag}: native ${touch?'tap':'click'} reveals ${id}`, data.current===id&&data.panels.filter(e=>e.visible).map(e=>e.id).join()===id,data);
  }
  await focusByTab(p,'[data-lens-select="architecture"]'); await key(p,'Enter');
  check(`${tag}: keyboard activates image view`, await p.eval(()=>document.querySelector('[data-lens-select="architecture"]').getAttribute('aria-pressed')==='true'),{});
  await activate(p,'[data-lens-select="interface"]',touch);
}
async function selection(p,id,method='click') {
  const selector=`[data-work-select="${id}"]`;
  if(method==='key'){await focusByTab(p,selector);await key(p,'Enter');}
  else await activate(p,selector,method==='touch');
  const state=await p.eval(()=>({hash:location.hash,current:document.querySelector('[data-work-select][aria-current="true"]')?.getAttribute('data-work-select'),panels:[...document.querySelectorAll('[data-work-panel]')].map(e=>({id:e.id,visible:!e.hidden&&e.getBoundingClientRect().height>0})),width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  check(`/work/: ${method} selects ${id} with real hash`,state.hash==='#'+id&&state.current===id&&state.panels.filter(p=>p.visible).map(p=>p.id).join()===id&&state.width>=state.scrollWidth,state);
}
try {
  for (const route of ['/','/work/']) {
    const p=await open(route); await fonts(p,route);
    await lens(p,route); if(route==='/')await disclosures(p,route);
    for(const width of [1440,768,390,320]){await p.setViewport({width,height:900,mobile:width<600});await layout(p,`${route} ${width}`);}
    await assetsAndLinks(p,route);
    const readable=await p.eval(()=>[...document.querySelectorAll('figcaption,.b-picture-source,.b-picture-note')].filter(e=>e.getBoundingClientRect().height>0).map(e=>({text:e.textContent,size:parseFloat(getComputedStyle(e).fontSize),line:getComputedStyle(e).lineHeight,color:getComputedStyle(e).color})));
    check(`${route}: actual visible captions at least16px`,readable.length>0&&readable.every(e=>e.size>=16),readable);
    if(route==='/work/'){
      await p.setViewport({width:1440,height:900});
      for(const id of ['wabrix','deadbolt','flowdesk'])await selection(p,id);
      await selection(p,'deadbolt','key');
      await p.send('Runtime.evaluate',{expression:'history.back()'});await sleep(300);
      check('/work/: back restores FlowDesk',await p.eval(()=>location.hash==='#flowdesk'&&!document.getElementById('flowdesk').hidden),{});
      await p.send('Runtime.evaluate',{expression:'history.forward()'});await sleep(300);
      check('/work/: forward restores Deadbolt',await p.eval(()=>location.hash==='#deadbolt'&&!document.getElementById('deadbolt').hidden),{});
      await activate(p,'[data-work-panel]:not([hidden]) .work-back');
      check('/work/: return link reaches project chooser',await p.eval(()=>location.hash==='#work-index'&&document.getElementById('work-index').getBoundingClientRect().top<80),{});
      await activate(p,'.work-more [data-work-related="flowdesk"] a');
      check('/work/: related image link opens FlowDesk',await p.eval(()=>location.hash==='#flowdesk'&&!document.getElementById('flowdesk').hidden),{});
    }
    await p.close();
    const mobile=await open(route,{width:390,mobile:true});
    if(route==='/work/')for(const id of ['wabrix','deadbolt','flowdesk'])await selection(mobile,id,'touch');
    await lens(mobile,`${route} mobile`,true);await mobile.close();
    const reduced=await open(route,{reducedMotion:true,width:390,mobile:true});
    await reduced.wheel(1300,{step:500,pauseMs:30});
    await lens(reduced,`${route} reduced`);
    const motion=await reduced.eval(()=>({reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,scroll:getComputedStyle(document.documentElement).scrollBehavior,running:document.getAnimations().filter(a=>a.playState==='running').length,animated:[...document.querySelectorAll('body *')].filter(e=>{const s=getComputedStyle(e);return s.animationName!=='none'||s.transitionDuration.split(',').some(t=>parseFloat(t)>0)}).length}));
    check(`${route}: reduced motion has no travel/animation`,motion.reduced&&motion.scroll==='auto'&&motion.running===0&&motion.animated===0,motion);await reduced.close();
    const n=await open(route,{noJS:true});
    const staticContent=await n.eval(()=>({main:!!document.querySelector('main#main'),body:document.body.innerText,projects:[...document.querySelectorAll('[data-work-panel]')].map(e=>({id:e.id,visible:!e.hidden&&e.getBoundingClientRect().height>0})),lens:[...document.querySelectorAll('[data-lens-panel]')].every(e=>!e.hidden&&e.getBoundingClientRect().height>0),controlsHidden:document.querySelector('.b-lens-controls').hidden}));
    check(`${route}: noJS keeps all projects and both image explanations`,staticContent.main&&['FlowDesk','Wabrix','Deadbolt'].every(t=>staticContent.body.includes(t))&&staticContent.projects.every(e=>e.visible)&&staticContent.lens&&staticContent.controlsHidden,{...staticContent,body:undefined});
    if(route==='/')await disclosures(n,route+' noJS');await n.close();
  }
  for(const id of ['flowdesk','wabrix','deadbolt']){
    const p=await open('/work/#'+id);
    check(`Deep link ${id} opens correct project`,await p.eval(id=>!document.getElementById(id).hidden,id),{});await p.close();
  }
  const missing=await open('/404.html',{width:390,mobile:true});
  check('404 has a useful home destination',await missing.eval(()=>document.querySelector('main a')?.getAttribute('href')==='/'&&document.documentElement.scrollWidth<=innerWidth),{});await missing.close();
} catch(error){report.error=error.stack;check('Verification script completed',false,error.message);}
finally {
  await browser.close();
  report.summary={passed:report.checks.filter(c=>c.pass).length,failed:report.checks.filter(c=>!c.pass).length};
  mkdirSync('outputs',{recursive:true});
  writeFileSync('outputs/production-interactions.json',JSON.stringify(report,null,2)+'\n');
  writeFileSync('outputs/production-interactions.md',`# Production browser checks\n\nChecked ${report.checkedAt} on ${base}. **${report.summary.passed} passed; ${report.summary.failed} failed**. Native Chromium mouse/touch/Tab/Enter/Space via installed Taste CDP helper.\n\nIncludes responsive overflow320/390/768/1440, rendered fonts, project hash selection/history/deep links, image-view controls, native disclosures, actual caption sizes, asset decode/network/console, reduced motion and noJS reading. Exact measurements and failures are in production-interactions.json.\n\nLimitations: bounded browser baseline, not a WCAG audit, cross-browser certification or deployed performance test. External source/contact hrefs checked, not mailbox delivery or remote runtime availability. Host reduced-motion setting preserved; media explicitly emulated per test.\n\nRe-run: node scripts/verify-production.mjs with current local preview running.\n`);
  console.log(JSON.stringify(report.summary));if(report.summary.failed)process.exitCode=1;
}
