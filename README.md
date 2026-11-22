# Ryan Akmal Pasya — Personal Portfolio

The personal portfolio and engineering showcase for Ryan Akmal Pasya ([@ryanakml](https://github.com/ryanakml)).

An editorial, high-performance web experience highlighting full-stack engineering, distributed systems, and open-source contributions.

## Tech Stack

- **Runtime & Framework**: React 18
- **Build Tool**: Vite 6
- **Animations**: Framer Motion 11
- **Icons & Graphics**: `@thesvg/react` + custom SVG choreography
- **Styling**: Modern semantic CSS with design tokens

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node 22 / 24)
- npm or pnpm

### Installation

```bash
npm install
```

### Local Development

```bash
npm run dev
```

The Vite dev server will start at `http://localhost:5173/`.

### Production Build

```bash
npm run build
npm run preview
```

Static build artifacts will be output to the `dist/` directory.

## Project Structure

```text
├── index.html                  # Entry HTML & SEO metadata
├── src/
│   ├── main.jsx                # React app entry point
│   ├── App.jsx                 # Page layout & choreography
│   ├── styles.css              # Custom styling & animations
│   └── components/
│       ├── Graphics.jsx        # Vector & SVG choreographies
│       └── SkillIconsProvider.jsx # Tech stack badges
├── public/                     # Static media & downloadable assets
└── vite.config.js              # Vite configuration
```
