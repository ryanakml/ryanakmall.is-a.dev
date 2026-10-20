import './b';

const workBrowser = document.querySelector<HTMLElement>('[data-work-browser]');

if (workBrowser) {
  const links = [...workBrowser.querySelectorAll<HTMLAnchorElement>('[data-work-select]')];
  const panels = [...workBrowser.querySelectorAll<HTMLElement>('[data-work-panel]')];
  const ids = new Set(panels.map(panel => panel.dataset.workPanel!));
  const first = panels[0]?.dataset.workPanel;
  let current: string | undefined;

  const readHash = () => {
    try { return decodeURIComponent(window.location.hash.slice(1)); }
    catch { return ''; }
  };

  const select = (id: string) => {
    if (!ids.has(id) || current === id) return;
    current = id;
    links.forEach(link => {
      if (link.dataset.workSelect === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.workPanel !== id; });
    document.querySelectorAll<HTMLElement>('[data-work-related]').forEach(item => {
      item.hidden = item.dataset.workRelated === id;
    });
  };

  const followHash = (scroll: boolean) => {
    const id = readHash();
    if (ids.has(id)) {
      select(id);
      if (scroll) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
    } else if (!id && first) select(first);
  };

  links.forEach(link => {
    const id = link.dataset.workSelect!;
    // Preview on real keyboard focus; native link activation owns URL/history.
    link.addEventListener('focus', () => select(id));
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      select(id);
    });
  });

  if (first) {
    select(ids.has(readHash()) ? readHash() : first);
    workBrowser.dataset.workReady = '';
    // Both native hash links and browser back/forward update the same reading.
    window.addEventListener('hashchange', () => followHash(true));
    if (ids.has(readHash())) document.fonts.ready.then(() => followHash(true));
  }
}
