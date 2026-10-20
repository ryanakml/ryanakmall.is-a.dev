// Source scopes and merge dates verified in state/evidence.json, 2026-10-19.
// Internal publication/evidence records stay outside the public bundle.
export const contributions = [
  { name: 'Mastra', description: 'Mapping tool-approval callbacks correctly, with regression tests for function and boolean options.', url: 'https://github.com/mastra-ai/mastra/pull/15346', detail: 'Tool approval' },
  { name: 'Celery', description: 'Expanding ~ in multi-worker path options, with regression tests and documentation.', url: 'https://github.com/celery/celery/pull/10739', detail: 'Worker paths' },
  { name: 'Django', description: 'Clarifying how upload-size checks differ between request.body and request.POST.', url: 'https://github.com/django/django/pull/22093', detail: 'Documentation' },
] as const;
