# Phase 03 — Two Real Working Prototypes

**Enter:** Checkpoint A approved and two distinct art directions documented. **Exit:** Checkpoint B explicit user selection or request for revision.

## Build

Lead owns the codebase. Build **two genuinely different working homepage experiences**, not two themes of the same template. Isolate experiments via separate routes/directories or isolated worktrees; avoid overlapping multi-agent edits. Use the **same approved identity and truthful available content** in both so comparison is fair. Unverified facts must be clearly labeled in development or omitted.

Both prototypes need navigation, strong hero, personal introduction, credible selected-work treatment, human personality, closing/contact, responsive layout and at least one purposeful interaction. Keep code lean; these are convincing experiments, not two full production apps.

Taste Skill (`design-taste-frontend`) is mandatory: follow its current real implementation and visual-inspection workflow separately for each prototype. Do not just say it was used. Consider Motion Primitives (https://motion-primitives.com/) or 21st.dev (https://21st.dev/) **only if** a particular design need justifies dependencies, license, performance and accessibility. Otherwise implement simply.

## Browser evidence

Run both locally and inspect actual browser renders. Use Taste Skill's browser procedure and Playwright (https://playwright.dev/) or a verified equivalent for repeatable checks. Screenshot approximately **1440px / 768px / 390px** widths for both; verify interaction, responsive layout, cropping, overflow, type hierarchy, navigation, reduced motion and keyboard behavior. Record visible defects, fix major issues, and capture updated screenshots. If browser testing is blocked, report it honestly rather than claiming completion.

Write `outputs/prototype-comparison.md` with links/local entry points, screenshots, strengths/weaknesses, identity fit, performance/implementation tradeoffs, actual corrections made, and the lead's recommendation.

## Checkpoint B — Stop and ask

Present **two actual working prototypes** and real screenshots (desktop, tablet, mobile), plus a grounded comparative critique. Ask the user to choose, revise or combine directions. **Do not begin the full production site until the user explicitly approves a direction.** Record the outcome in `state/decisions.md` and then load `phases/04-production.md`.
