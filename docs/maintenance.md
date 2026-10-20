# Maintenance and verification

## Required checks

```sh
npm ci
npm run check
npm run build
```

Preview locally with `npm run preview -- --port 4321`. Home, Work and 404 are the only production routes. JavaScript enhances reading and project selection; meaningful content remains available without it. Recheck keyboard navigation, deep links, responsive image selection, reduced motion and no-JavaScript reading when changing interactions.

Source-publication checks on 2026-10-20 passed from an export of the staged files: clean `npm ci`, typecheck (0 errors/warnings/hints) and production build (3 pages). Gitleaks 8.30.1 found no leaks in the staged source; a separate sensitive-file/contact/path and PNG-metadata check found only the intended public contact email. No supplied real-data screenshots or private state were staged. This verifies the source package locally, not hosted CI or a deployed website.

## Optional design/browser tools

Build/typecheck need only the npm dependencies. The repository's browser QA/artwork scripts additionally use a separately installed [Taste Skill](https://github.com/Leonxlnx/taste-skill), recorded in `skills-lock.json`, at `.agents/skills/design-taste-frontend/`. Tool installation is ignored by Git. Read its current instructions before visual work. Its CDP helper requires a supported Chromium-family browser and Node 22+; `CHROME_PATH` can specify the browser executable.

With the skill installed and a current local preview running on port 4321:

```sh
node .agents/skills/design-taste-frontend/scripts/lint.mjs src/
node scripts/verify-production.mjs
node scripts/final-editorial-review.mjs
node scripts/inspect-prototype.mjs http://127.0.0.1:4321/ --out .taste-skill/production/home/final
node scripts/inspect-prototype.mjs http://127.0.0.1:4321/work/ --out .taste-skill/production/work/final
```

The inspector wrapper sets baseline motion explicitly while preserving separate reduced-motion checks. Review screenshots at actual sizes; passing assertions alone do not establish visual quality. Reports/screenshots are written to ignored `outputs/` and `.taste-skill/`; the dated final-review output path is a historical label, not an assertion of a new review date.

Previous local final review on 2026-10-20 recorded 65/65 interaction assertions and 45/45 focused caption/contrast/evidence assertions. Captions/notes measured at least 16px; Home/Work were inspected at 1440, 768 and 390px, with overflow also checked at 320px. These are bounded local Chromium-family checks, not cross-browser certification, an exhaustive accessibility audit or deployed-runtime proof. Generated inspection files and recordings are intentionally omitted from source publication.

## Editable artwork

`artwork/flowdesk-interface.html` is a fixed 1460×1000 illustration using fictional data. Regenerate its PNG with `node scripts/render-flowdesk-art.mjs` after installing the optional Taste helper/browser. The HTML belongs outside `public/`: it is artwork source, not another website route.

Original diagrams can be regenerated using Python 3 with Pillow installed:

```sh
python3 scripts/generate-art.py
```

This fetches official Google Fonts masters over HTTPS and writes the three original PNGs in `public/art/`. Review any regenerated images before rebuilding. `node scripts/capture-social-preview.mjs` captures the local approved Home composition as the social PNG. These commands deliberately overwrite their named assets; they are not part of `npm run build`.

## Future live launch

Live deployment is not authorized. No hosting/deployment workflow is included. Before a separately approved launch, confirm the production origin and public copy/asset rights, set Astro's `site`, review `Base.astro` and `public/robots.txt` indexing policy, and check resulting canonical/social URLs. Publish only `dist/` through an explicitly approved hosting action, never the workspace root.
