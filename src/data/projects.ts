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
    introduction: 'A WhatsApp support workspace connecting team conversations, integrations and background processing.',
    notes: [
      {
        heading: 'The question',
        paragraphs: [
          'How do you keep a shared inbox useful while messages, replies and assignment changes arrive at the same time?',
          'FlowDesk brings those moving parts into one WhatsApp support workflow.',
        ],
      },
      {
        heading: 'The approach',
        paragraphs: [
          'The React and TypeScript interface talks to an Express API backed by PostgreSQL. Incoming WhatsApp events are stored before a separate worker processes them.',
          'A transactional outbox connects saved events to background work, so message processing can continue beyond the incoming request.',
        ],
      },
      {
        heading: 'The engineering',
        paragraphs: [
          'Conversation assignment uses version checks: when two operators act on the same conversation, a stale update receives a conflict instead of overwriting the current owner.',
          'That coordination between the inbox, stored state and workers is the engineering behind the interface.',
        ],
      },
    ],
    repository: 'https://github.com/ryanakml/flowdesk-ai',
    evidence: [
      { label: 'Event storage & outbox', url: 'https://github.com/ryanakml/flowdesk-ai/blob/e92d1030419cd5a6b13f8bb45dcb1adc9d98b300/packages/db/src/webhooks.ts#L34-L120' },
      { label: 'Worker processing', url: 'https://github.com/ryanakml/flowdesk-ai/blob/e92d1030419cd5a6b13f8bb45dcb1adc9d98b300/apps/worker/src/normalization.ts#L495-L577' },
    ],
    related: { id: 'wabrix', label: 'See the Wabrix chatbot' },
  },
  {
    id: 'wabrix',
    name: 'Wabrix',
    introduction: 'A WhatsApp chatbot that answers from business knowledge and lets a team take over the conversation.',
    notes: [
      {
        heading: 'The question',
        paragraphs: [
          'How can a business automate routine WhatsApp questions without making it harder for a person to step in?',
          'Wabrix keeps the assistant and the team in the same conversation, with shared history and controls for pausing the bot.',
        ],
      },
      {
        heading: 'The approach',
        paragraphs: [
          'The assistant retrieves business knowledge to answer customer questions. Operators can read the conversation, pause automation and reply from the shared inbox.',
          'Next.js provides the interface, Convex keeps conversation state in sync, Clerk handles identity, and Cloudflare Workers receive WhatsApp webhooks.',
        ],
      },
      {
        heading: 'The engineering',
        paragraphs: [
          'Incoming events are stored and processed in the background. Bot replies and operator replies share the outbound queue and delivery tracking.',
          'Pausing the bot blocks new automated work while an operator handles the conversation. The handoff is part of the workflow, not a separate support channel.',
        ],
      },
    ],
    repository: 'https://github.com/ryanakml/wabrix',
    evidence: [
      { label: 'Webhook ingress', url: 'https://github.com/ryanakml/wabrix/blob/101002833ac75e262a8829c0e881ccce4e79771d/apps/ingress/src/whatsapp.ts#L118-L154' },
      { label: 'Event storage & scheduling', url: 'https://github.com/ryanakml/wabrix/blob/101002833ac75e262a8829c0e881ccce4e79771d/packages/backend/convex/whatsappWebhookEvents.ts#L97-L172' },
    ],
    related: { id: 'flowdesk', label: 'See the FlowDesk support workspace' },
  },
  {
    id: 'deadbolt',
    name: 'Deadbolt',
    introduction: 'A distributed workflow engine for orchestrating workers, managing execution and recovering interrupted pipelines.',
    notes: [
      {
        heading: 'The question',
        paragraphs: [
          'A pipeline stops halfway through. How do you recover the interrupted work without repeating the steps that already finished?',
          'Deadbolt coordinates dependencies and multiple workers, tracks execution attempts, and decides which tasks can run next.',
        ],
      },
      {
        heading: 'The approach',
        paragraphs: [
          'A request creates a workflow run. Deadbolt uses PostgreSQL to track progress and coordinate tasks; workers execute the code and report results. The Inspector brings task state, attempts and worker progress into view.',
          'Recovery keeps completed outputs and retries eligible work. When an external action has an unknown outcome, the system reconciles it before retrying.',
        ],
      },
      {
        heading: 'The engineering',
        paragraphs: [
          'Built collaboratively with a friend through milestone M4, covering orchestration, multi-worker execution, execution management and recovery.',
          'Leases and ownership checks keep execution coordinated when workers stop or lose contact. These mechanisms support the larger job: keeping a workflow moving from saved progress.',
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
