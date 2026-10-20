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
| `public/art/flowdesk.png` | Original editorial illustration of event storage, PostgreSQL/outbox and worker processing; also used in the hero. Not a runtime trace. |
| `public/art/deadbolt.png` | Original conceptual worker-ownership/fencing illustration for collaborative work. Not a recorded execution. |
| `public/art/contribution.png` | Original editorial illustration of Celery's tilde path expansion. |
| `public/social-preview.png`, `public/favicon.svg` | Sharing composition derived from the approved website, and the website's vector mark. |

Original supplied app captures contain real data and are excluded from both this repository and the production source. No stock portrait, gallery reference image or AI-generated app screenshot is shipped. Raster illustration sources are in `scripts/generate-art.py`.

## Fonts and reuse

Self-hosted Google Fonts files retain SIL Open Font License notices in `public/fonts/*-OFL.txt`. Exact download sources are in `public/fonts/sources.json` and the original stylesheet in `public/fonts/google-fonts-source.css`.

Imbue is the display face and Albert Sans the text/control face. Archivo is retained for the editable original raster illustrations and earlier typography work; the production layout uses Imbue/Albert Sans. The illustration generator fetches official font masters in memory.

Keep font notices when redistributing. Other artwork has separate provenance as described above; public repository access is not a blanket third-party reuse license.
