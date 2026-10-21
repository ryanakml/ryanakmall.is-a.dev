# Thinking Out Loud

Ryan Akmal Pasya's personal internet home. An editorial website about software, the questions behind the work, and a little of the person building it.

Built with Astro, TypeScript, custom CSS, self-hosted Imbue and Albert Sans, and small browser enhancements. Static HTML remains readable without JavaScript. No backend, API credentials, analytics or external font requests are required.

## Local development

Use Node.js 22.22+ (Node 24.21.0 and npm 11.19.0 were used for verification).

```sh
npm ci
npm run dev
```

The development server binds to localhost. Validate and preview the static build:

```sh
npm run check
npm run build
npm run preview -- --port 4321
```

Build output goes to `dist/`. Astro's managed preview can be stopped with `npx astro preview stop`.

## Source map

| Path | Purpose |
| --- | --- |
| `src/pages/` | Home `/`, dedicated Work `/work/`, and `404.html` |
| `src/data/` | Project narratives, commit-pinned technical evidence and upstream contribution links |
| `src/components/` | Shared navigation/footer and the interface/architecture image viewer |
| `src/styles/`, `src/scripts/` | Responsive editorial layout and progressive enhancements |
| `src/assets/` | Project imagery optimized by Astro at build time |
| `public/` | Original illustrations, font files/notices, favicon, social image and robots policy |
| `artwork/` | Editable product figures, contribution illustration and font/license notices |
| `docs/` | Approved decisions, evidence, asset provenance and maintenance/QA notes |
| `AGENTS.md`, `phases/` | Project operating contract and progressive-disclosure workflow |

Edit personal narrative in `src/pages/index.astro`, project notes in `src/data/projects.ts`, and contributions in `src/data/contributions.ts`. Keep claims and image captions consistent with [evidence and assets](docs/evidence-and-assets.md). See [maintenance](docs/maintenance.md) for optional browser QA and artwork regeneration.

## Publication scope

This repository publishes source code, required assets and documentation. Private interview notes, supplied real-data screenshots, installed design tooling, archived prototypes, recordings, generated inspection reports, dependencies and build output are excluded from Git.

Repository publication is authorized; deployment to a live website is **not**. There is no deployment workflow. The site retains `noindex,nofollow` and `robots.txt` disallow rules, with no assumed production origin. A future authorized launch must explicitly configure the origin, indexing and hosting before deploying only the built `dist/` directory.

Font notices and upstream provenance are retained. No blanket license for project imagery or other third-party material is implied by this repository being public.
