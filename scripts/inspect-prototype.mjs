// Run the unchanged Taste inspector with explicit baseline media. macOS requests
// reduced motion here; leaving media implicit otherwise mislabels correct support
// as missing animation. The inspector's own reduced-motion page remains reduced.
import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
const originalNewPage = Browser.prototype.newPage;
Browser.prototype.newPage = async function (options = {}) {
  const page = await originalNewPage.call(this, options);
  await page.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: options.reducedMotion ? 'reduce' : 'no-preference' }],
  });
  return page;
};
await import('../.agents/skills/design-taste-frontend/scripts/inspect.mjs');
