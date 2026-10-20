const page = document.querySelector('.concept-b');
if (page) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const kind = element.dataset.bReveal;
        const picture = kind === 'picture';
        element.animate(
          picture
            ? [{ transform: 'translateY(20px) scale(.985)' }, { transform: 'translateY(0) scale(1)' }]
            : [{ transform: `translateY(${kind === 'title' ? 24 : 14}px)`, opacity: .72 }, { transform: 'translateY(0)', opacity: 1 }],
          { duration: picture ? 1000 : 780, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'none', delay: element.hasAttribute('data-thought-pause') ? 220 : 0 },
        );
        observer.unobserve(element);
      });
    }, { threshold: .08, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('[data-b-reveal]').forEach((element) => observer.observe(element));
  }

  document.querySelectorAll<HTMLDetailsElement>('.b-deeper').forEach((details) => {
    details.addEventListener('toggle', () => {
      if (!details.open || reduced.matches) return;
      details.querySelector('.b-deeper-content')?.animate(
        [{ transform: 'translateY(-5px)', opacity: .5 }, { transform: 'translateY(0)', opacity: 1 }],
        { duration: 240, easing: 'cubic-bezier(.22,1,.36,1)' },
      );
    });
  });
}

// A progressive enhancement: both explanations remain available without JS.
document.querySelectorAll<HTMLElement>('[data-lens]').forEach((lens) => {
  const buttons = [...lens.querySelectorAll<HTMLButtonElement>('[data-lens-select]')];
  const panels = [...lens.querySelectorAll<HTMLElement>('[data-lens-panel]')];
  function show(id: string, animate = true) {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lensSelect === id)));
    panels.forEach(panel => { panel.hidden = panel.dataset.lensPanel !== id; });
    const current = panels.find(panel => !panel.hidden);
    if (animate && current && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.animate([{ opacity: .5, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' });
    }
  }
  show('interface', false);
  lens.dataset.ready = '';
  lens.querySelector<HTMLElement>('.b-lens-controls')!.hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => show(button.dataset.lensSelect!)));
});
