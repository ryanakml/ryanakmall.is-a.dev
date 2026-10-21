# Evidence and asset provenance

Project descriptions distinguish source review from independently running a system. The linked code/tests were inspected; upstream services and test suites were not executed as part of this website review. No customer, adoption, performance or production-reliability claim follows from an illustration or repository link.

## Technical evidence

The exact file links and line ranges live alongside the public copy in `src/data/projects.ts`.

| Project | Reviewed snapshot | Evidence and limits |
| --- | --- | --- |
| [FlowDesk](https://github.com/ryanakml/flowdesk-ai) | `e92d1030419cd5a6b13f8bb45dcb1adc9d98b300` | `packages/db/src/webhooks.ts` and `apps/worker/src/normalization.ts`: stored webhook events, outbox and worker processing. Source reviewed; runtime not independently tested. |
| [Wabrix](https://github.com/ryanakml/wabrix) | `101002833ac75e262a8829c0e881ccce4e79771d` | `apps/ingress/src/whatsapp.ts` and `packages/backend/convex/whatsappWebhookEvents.ts`: ingress, Convex event storage and scheduled processing. Source reviewed; runtime not independently tested. |
| [Deadbolt](https://github.com/ryanakml/Deadbolt) | `cda91c15467207d4fea274bde21f223b998303a3` | `internal/worker/lease.go`, `internal/worker/lease_test.go` and `docs/reports/M4-schedule-ui-acceptance.md`: lease handling, test source and a development report. Collaborative work in active development; neither report nor tests establish independent runtime verification or release readiness. |

Upstream contribution links describe scoped contributions, not employment or ownership of those projects:

- [Mastra #15346](https://github.com/mastra-ai/mastra/pull/15346): tool-approval callback mapping and regression tests.
- [Celery #10739](https://github.com/celery/celery/pull/10739): tilde expansion in multi-worker path options, tests and documentation.
- [Django #22093](https://github.com/django/django/pull/22093): documentation clarifying request body/POST upload-size behavior.

## Images

| Asset | Origin and representation |
| --- | --- |
| `src/assets/flowdesk-interface.png` | Code-native reconstruction of the owner's interface with entirely fictional conversation/account data. Editable source: `artwork/flowdesk-interface.html`. Its footer and page captions explicitly identify reconstruction and fictional data. It is not an authentic runtime screenshot. |
| `src/assets/wabrix-concept.png` | Unaltered [owner-repository banner](https://github.com/ryanakml/wabrix/blob/101002833ac75e262a8829c0e881ccce4e79771d/apps/web-2/public/banner.png), presented as repository concept artwork with sample interface data. It does not prove real users or achieved metrics. |
| `src/assets/hero-mobile.png`, `hero-tablet.png`, `hero-desktop.png` | Owner-supplied editorial artwork selected on 2026-10-20: mobile v2, tablet v4, desktop v3. Abstract graphite/teal gesture representing thinking through a question; decorative, not project evidence or a handwriting sample. Received as generated candidates; model and exact generation provenance were not supplied. Production serves optimized WebP derivatives. |
| `public/art/flowdesk.png` | Original editorial illustration of event storage, PostgreSQL/outbox and worker processing. Not a runtime trace. |
| `public/art/deadbolt.png` | Original conceptual worker-ownership/fencing illustration for collaborative work. Not a recorded execution. |
| `public/art/contribution.png` | Original editorial illustration of Celery's tilde path expansion. |
| `public/social-preview.png`, `public/favicon.svg` | Sharing composition derived from the approved website, and the website's vector mark. |

Original supplied app captures contain real data and are excluded from both this repository and the production source. No stock portrait, gallery reference image or AI-generated app screenshot is shipped. Raster illustration sources are in `scripts/generate-art.py`.

## Fonts and reuse

Self-hosted Google Fonts files retain SIL Open Font License notices in `public/fonts/*-OFL.txt`. Exact download sources are in `public/fonts/sources.json` and the original stylesheet in `public/fonts/google-fonts-source.css`.

Imbue is the display face and Albert Sans the text/control face. Archivo is retained for the editable original raster illustrations and earlier typography work; the production layout uses Imbue/Albert Sans. The illustration generator fetches official font masters in memory.

Keep font notices when redistributing. Other artwork has separate provenance as described above; public repository access is not a blanket third-party reuse license.

## Product figure revision — 2026-10-21

Current Home/Work figures use `public/art/products/`, with editable sources and font notices in `artwork/product-figures/`. Earlier raster assets above are archived provenance, not current primary figures. Hero selection is unchanged.

- Wabrix: owner-provided `product-guide.md` establishes the WhatsApp-first assistant, knowledge and operator takeover story. Fictional hours and conversations; editorial reconstruction, not runtime evidence.
- FlowDesk: the supplied execution blueprint explicitly says pre-development. The AI draft showcase is a **design concept**, with review-before-send, not evidence of current implementation. Its supplied ownership figure remains conceptual. No automatic outbound AI result is depicted.
- Deadbolt: the supplied `milestones.md` explains durable coordination, persisted task state, workers and eligible retry retaining committed outputs. The figure illustrates that design concept, not a recorded run or an implemented Inspector screen. Unknown external outcomes require reconciliation before retry. Owner-supplied documentation informs product narrative; this portfolio change did not run product tests.
- Celery: supplied `generated-assets-new/portfolio-assets-oss/PROVENANCE.md` and `BRIEF.md` retain the exact PR, regression evidence and illustration-fixture distinction. The 1400px WebP is used without changing its technical content.
- Composition references reviewed: [Intercom Inbox](https://www.intercom.com/helpdesk/inbox), [Linear](https://linear.app/), [Inngest](https://www.inngest.com/). No third-party screenshots or visual assets are shipped.

## Owner clarification and CV — 2026-10-21

The owner explicitly confirms functioning Wabrix bot features, functional FlowDesk integrations/backend systems and Deadbolt implementation through M4. Public copy uses that confirmation and the documented architecture instead of treating absence of an agent runtime rerun as a product limitation. The UI figures remain editorial presentations; their method/provenance stays documented here without repeatedly qualifying the projects on public pages. Collaboration credit and specific recovery semantics remain accurate.

`public/documents/Ryan-Akmal-Pasya-CV.pdf` is an unchanged copy of the existing global CV supplied by the owner. Source and served copy SHA-256: `4bb2bfff36f504377ab5802ae2c6299cdb5a521198fb4d0d496a726c37bf929c`. It is linked from the shared footer as Résumé (PDF), with no replacement CV generated.

The selected Celery source and specification are retained in `artwork/oss/`, including the supplied Celery and Albert Sans notices. The visual describes [Celery PR #10739](https://github.com/celery/celery/pull/10739): home-directory expansion for worker paths. `/home/demo` is an illustration fixture, not a real customer path. Raw incoming asset packets remain local; selected production files and editable sources are published.
