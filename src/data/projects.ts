export type ProjectId = 'flowdesk' | 'wabrix' | 'deadbolt';

export interface ProjectNote {
  heading: string;
  paragraphs: readonly string[];
}

export interface Project {
  id: ProjectId;
  name: string;
  introduction: string;
  notes: readonly ProjectNote[];
  repository: string;
  evidence: readonly { label: string; url: string }[];
  related?: { id: ProjectId; label: string };
}

// Public evidence/provenance: docs/evidence-and-assets.md. Private interview
// notes and verification records stay in the untracked local state directory.
// These descriptions do not claim production usage, runtime guarantees or solo
// ownership of collaborative work. Visual provenance belongs to each caption.
export const projects: readonly Project[] = [
  {
    id: 'flowdesk',
    name: 'FlowDesk',
    introduction: 'A WhatsApp support project that took me from the inbox into the work happening behind it.',
    notes: [
      {
        heading: 'The question',
        paragraphs: [
          'A conversation starts in an inbox. A reply might involve an AI response, a person taking over, or work happening in the background. I wanted to follow how those pieces connect.',
          'FlowDesk revisits the support problem I had explored in Wabrix, with a different set of building decisions.',
        ],
      },
      {
        heading: 'The approach',
        paragraphs: [
          'I used React and TypeScript for the interface, Express for the API and PostgreSQL for state. Incoming webhook events are stored and queued in an outbox for a separate worker.',
          'That separation gave me more of the path to think about: what the interface asks for, where state belongs, and what work continues beyond a request.',
        ],
      },
      {
        heading: 'The scope',
        paragraphs: [
          'A personal build, revisiting an earlier idea with a different architecture. The interface shown here is a reconstruction with fictional conversations and accounts.',
          'The diagram explains the event-storage and background-processing path. The linked source shows the implementation behind that illustration.',
        ],
      },
    ],
    repository: 'https://github.com/ryanakml/flowdesk-ai',
    evidence: [
      { label: 'Event storage & outbox', url: 'https://github.com/ryanakml/flowdesk-ai/blob/e92d1030419cd5a6b13f8bb45dcb1adc9d98b300/packages/db/src/webhooks.ts#L34-L120' },
      { label: 'Worker processing', url: 'https://github.com/ryanakml/flowdesk-ai/blob/e92d1030419cd5a6b13f8bb45dcb1adc9d98b300/apps/worker/src/normalization.ts#L495-L577' },
    ],
    related: { id: 'wabrix', label: 'Read about the earlier Wabrix exploration' },
  },
  {
    id: 'wabrix',
    name: 'Wabrix',
    introduction: 'An earlier exploration of a shared WhatsApp inbox, AI replies and human handoff.',
    notes: [
      {
        heading: 'The question',
        paragraphs: [
          'How could a WhatsApp conversation move between an AI response and a person who needs to take over? Wabrix was one way I explored that support workflow.',
          'The same product territory later became a reason to try another route with FlowDesk.',
        ],
      },
      {
        heading: 'The approach',
        paragraphs: [
          'Wabrix uses Next.js for the interface, Convex for data and realtime updates, Clerk for identity, and Cloudflare Workers with Hono around webhooks.',
          'Incoming events are stored in Convex, with scheduled functions processing inbound messages and statuses. FlowDesk takes a different route with PostgreSQL and outbox workers.',
        ],
      },
      {
        heading: 'The scope',
        paragraphs: [
          'A personal project, presented here through its repository concept artwork with illustrative interface data.',
          'Wabrix sits earlier in this exploration. FlowDesk follows the same support question with a different stack.',
        ],
      },
    ],
    repository: 'https://github.com/ryanakml/wabrix',
    evidence: [
      { label: 'Webhook ingress', url: 'https://github.com/ryanakml/wabrix/blob/101002833ac75e262a8829c0e881ccce4e79771d/apps/ingress/src/whatsapp.ts#L118-L154' },
      { label: 'Event storage & scheduling', url: 'https://github.com/ryanakml/wabrix/blob/101002833ac75e262a8829c0e881ccce4e79771d/packages/backend/convex/whatsappWebhookEvents.ts#L97-L172' },
    ],
    related: { id: 'flowdesk', label: 'Follow the idea into FlowDesk' },
  },
  {
    id: 'deadbolt',
    name: 'Deadbolt',
    introduction: 'A workflow-runtime project with a friend, exploring worker ownership, leases and recovery.',
    notes: [
      {
        heading: 'The question',
        paragraphs: [
          'A worker is doing a job. Then it disappears. What should the system trust next, and which worker is still allowed to act?',
          'Those questions bring me to ownership, leases, fencing and recovery rather than just the task at the end of a request.',
        ],
      },
      {
        heading: 'The approach',
        paragraphs: [
          'Deadbolt explores workflow execution in Go and PostgreSQL. One part of the worker code tracks a local lease budget using elapsed time, a round-trip allowance and a safety margin.',
          'The lease tests cover short TTLs, renewal and elapsed-time handling. The ownership illustration is conceptual; it is not a recorded execution.',
        ],
      },
      {
        heading: 'The scope',
        paragraphs: [
          'Collaborative work with a friend, in active development. Work and authorship are shared.',
          'The linked M4 implementation report provides a more recent development snapshot than the README. Release readiness and production reliability are not claimed here.',
        ],
      },
    ],
    repository: 'https://github.com/ryanakml/Deadbolt',
    evidence: [
      { label: 'Worker lease budget', url: 'https://github.com/ryanakml/Deadbolt/blob/cda91c15467207d4fea274bde21f223b998303a3/internal/worker/lease.go#L19-L92' },
      { label: 'Lease test source', url: 'https://github.com/ryanakml/Deadbolt/blob/cda91c15467207d4fea274bde21f223b998303a3/internal/worker/lease_test.go#L10-L54' },
      { label: 'M4 implementation report', url: 'https://github.com/ryanakml/Deadbolt/blob/cda91c15467207d4fea274bde21f223b998303a3/docs/reports/M4-schedule-ui-acceptance.md#L17-L86' },
    ],
  },
];
