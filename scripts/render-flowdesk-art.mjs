// A code-native reconstruction of the owner-supplied FlowDesk interface.
// Every message and account field is fictional. Never labelled a runtime capture.
import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const browser = await Browser.launch();
try {
 const p = await browser.newPage({ width:1460, height:1000 });
 await p.goto(pathToFileURL(resolve('artwork/flowdesk-interface.html')).href);
 await p.screenshot({path:'src/assets/flowdesk-interface.png',format:'png'});
} finally {await browser.close();}
