import { MERGED_PR_COUNT } from '../contributions';
import React from 'react';

/**
 * Seven distinct organic near-circular Bezier blob paths.
 * Extracted to match the uneven hand-drawn contours in the reference recording.
 */
export const SEED_PATHS = [
  'M51.5,6.2 C74.8,4.8 93.4,21.5 94.6,46.2 C95.8,70.9 77.2,93.1 52.4,94.5 C27.6,95.9 6.8,77.4 5.4,51.8 C4.0,26.2 28.2,7.6 51.5,6.2 Z',
  'M47.2,5.5 C71.6,3.9 94.1,23.8 94.8,49.4 C95.5,75.0 74.3,94.8 49.1,94.2 C23.9,93.6 4.9,74.5 5.6,48.7 C6.3,22.9 22.8,7.1 47.2,5.5 Z',
  'M53.8,5.8 C78.2,8.1 95.2,27.4 93.9,52.6 C92.6,77.8 72.1,95.2 46.8,93.8 C21.5,92.4 4.8,72.3 6.2,47.1 C7.6,21.9 29.4,3.5 53.8,5.8 Z',
  'M49.4,4.9 C73.9,5.4 94.4,24.2 94.9,49.8 C95.4,75.4 76.1,94.1 50.6,94.9 C25.1,95.7 5.2,76.8 4.9,51.2 C4.6,25.6 24.9,4.4 49.4,4.9 Z',
  'M52.1,6.4 C76.5,5.2 93.8,25.1 94.4,50.3 C95.0,75.5 75.4,93.9 50.2,94.6 C25.0,95.3 6.1,76.2 5.5,50.8 C4.9,25.4 27.7,7.6 52.1,6.4 Z',
  'M48.6,5.9 C72.8,4.6 93.7,22.9 94.7,48.1 C95.7,73.3 76.8,94.4 51.4,94.8 C26.0,95.2 5.4,75.9 5.1,50.4 C4.8,24.9 24.4,7.2 48.6,5.9 Z',
  'M50.8,5.3 C75.6,6.7 94.6,26.3 94.2,51.5 C93.8,76.7 73.9,94.7 48.7,94.3 C23.5,93.9 5.3,74.1 5.7,48.9 C6.1,23.7 26.0,3.9 50.8,5.3 Z',
];

export function OrganicSeedBlob({
  variant = 0,
  size,
  color = '#fb5e00',
  className = '',
  style = {},
}) {
  const path = SEED_PATHS[variant % SEED_PATHS.length];
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: 'block',
        width: size ? `${size}px` : '100%',
        height: size ? `${size}px` : '100%',
        shapeRendering: 'geometricPrecision',
        ...style,
      }}
      aria-hidden="true"
    >
      <path d={path} fill={color} />
    </svg>
  );
}

/**
 * Brand Logo Text for ryanakml:
 * Clean, Swiss grotesk lowercase wordmark matching the masthead typography.
 */
export function BrandLogoSVG() {
  return <span className="brand-logo-text">ryanakml</span>;
}

/**
 * Exact Branch Tip Coordinates inside the 122x193px Branch Emblem container
 * (measured relative to the center (61, 96.5) of the 122x193 emblem box),
 * matching mid_12.jpg and mid_13.jpg from the reference video:
 * 1 top crown + 3 left V-branch tips + 3 right V-branch tips = 7 tips.
 */
export const EMBLEM_TIP_OFFSETS = [
  { id: 0, dx: 0, dy: -66.5, size: 24 },   // Top crown tip (61, 30)
  { id: 1, dx: -27, dy: -41.5, size: 24 }, // Upper-left branch tip (34, 55)
  { id: 2, dx: 27, dy: -41.5, size: 24 },  // Upper-right branch tip (88, 55)
  { id: 3, dx: -35, dy: -3.5, size: 24 },  // Middle-left branch tip (26, 93)
  { id: 4, dx: 35, dy: -3.5, size: 24 },   // Middle-right branch tip (96, 93)
  { id: 5, dx: -29, dy: 36.5, size: 24 },  // Lower-left branch tip (32, 133)
  { id: 6, dx: 29, dy: 36.5, size: 24 },   // Lower-right branch tip (90, 133)
];

/**
 * Centered 122x193px #fb5e00 Branch Spine & Symmetrical V-Branches SVG.
 */
export function BranchSpineSVG({ drawProgress = 1, showDockedBerries = false }) {
  const clamped = Math.max(0, Math.min(1, drawProgress));
  const spineLength = 142;
  const branchLength = 46;

  return (
    <svg
      width="122"
      height="193"
      viewBox="0 0 122 193"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Organic branch and seed emblem"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Central 3px vertical spine from bottom (61, 172) up to top crown (61, 30) */}
      <path
        d="M61 172 L61 30"
        stroke="#fb5e00"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={spineLength}
        strokeDashoffset={spineLength * (1 - clamped)}
      />

      {/* Lower V-branch pair */}
      <path
        d="M61 170 L32 148 M61 170 L90 148"
        stroke="#fb5e00"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={branchLength}
        strokeDashoffset={branchLength * (1 - Math.max(0, Math.min(1, (clamped - 0.1) / 0.6)))}
      />

      {/* Middle V-branch pair */}
      <path
        d="M61 126 L26 102 M61 126 L96 102"
        stroke="#fb5e00"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={branchLength}
        strokeDashoffset={branchLength * (1 - Math.max(0, Math.min(1, (clamped - 0.25) / 0.6)))}
      />

      {/* Upper V-branch pair */}
      <path
        d="M61 80 L34 62 M61 80 L88 62"
        stroke="#fb5e00"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={branchLength}
        strokeDashoffset={branchLength * (1 - Math.max(0, Math.min(1, (clamped - 0.4) / 0.6)))}
      />

      {showDockedBerries &&
        EMBLEM_TIP_OFFSETS.map((tip, idx) => {
          const cx = 61 + tip.dx;
          const cy = 96.5 + tip.dy;
          const r = tip.size / 2;
          return (
            <g
              key={tip.id}
              transform={`translate(${cx - r}, ${cy - r}) scale(${tip.size / 100})`}
            >
              <path d={SEED_PATHS[idx % SEED_PATHS.length]} fill="#fb5e00" />
            </g>
          );
        })}
    </svg>
  );
}

/**
 * 22px simple directional arrow for the 70x70px Arrow Square controls.
 */
export function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: direction === 'left' ? 'rotate(180deg)' : 'none',
        display: 'block',
      }}
      aria-hidden="true"
    >
      <path
        d="M3.5 11H18.5M18.5 11L12 4.5M18.5 11L12 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Small monochrome program emblem for Open Source & Engineering Practice cards.
 */
export function ProgramEmblem({ variant = 'opensource' }) {
  if (variant === 'practice') {
    return (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="15" cy="15" r="13.5" stroke="#f7f6e3" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="15" cy="9" r="2.2" fill="#ffff48" />
        <circle cx="10" cy="17.5" r="2.2" fill="#f7f6e3" />
        <circle cx="20" cy="17.5" r="2.2" fill="#f7f6e3" />
        <path d="M15 11.2L11.2 15.8M15 11.2L18.8 15.8M12.2 17.5H17.8" stroke="#f7f6e3" strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="15" cy="15" r="13.5" stroke="#f7f6e3" strokeWidth="1" />
      <circle cx="11" cy="11" r="2.2" fill="#ffff48" />
      <circle cx="11" cy="19" r="2.2" fill="#f7f6e3" />
      <circle cx="19" cy="15" r="2.2" fill="#f7f6e3" />
      <path d="M11 13.2V16.8M12.8 11.8L17.2 14.2" stroke="#f7f6e3" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * Monochrome Engineering Philosophy mark for the Isolated Quotation section.
 */
export function QuotePartnerMark({ name = 'ryanakml' }) {
  return (
    <div className="quote-partner-mark" aria-label={name}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="7.5" stroke="#262d29" strokeWidth="1.4" />
        <circle cx="10" cy="10" r="3" fill="#fb5e00" />
      </svg>
      <span>{name}</span>
    </div>
  );
}

/**
 * Razor-sharp inline SVG architectural pipeline arrow for BuildRailSchematic.
 */
function SchematicArrow({ fenced = false }) {
  return (
    <div className={`rail-arrow ${fenced ? 'rail-arrow--fenced' : ''}`} aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        {fenced ? (
          <path
            d="M4 10H14M14 10L10 6M14 10L10 14M16 5V15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M3 10H16M16 10L11 5M16 10L11 15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}

/**
 * Architectural & Terminal Showcase Overlays for the 4 Engineering Build Rail Cards
 * Marked with data-ui so they render crisp inspectable engineering diagrams over dark card plates.
 */
export function BuildRailSchematic({ id }) {
  const configs = {
    flowdesk: {
      title: 'flowdesk-ai / transactional-outbox',
      badge: 'ARCHITECTURE',
      nodes: [
        { tag: 'INGRESS', title: 'Webhook Event', meta: 'HMAC Validated' },
        { tag: 'POSTGRES', title: 'Transactional Outbox', meta: 'Atomic Write', active: true },
        { tag: 'WORKER', title: 'PostgreSQL Worker', meta: 'Bounded Retries' },
      ],
    },
    deadbolt: {
      title: 'deadbolt / lease-fencing',
      badge: 'EPOCH GUARD #05',
      nodes: [
        { tag: 'WORKER A', title: 'Stale Heartbeat', meta: 'Epoch 04 (Expired)', stale: true },
        { tag: 'GUARD', title: 'Lease Token Guard', meta: 'Fence Zombie Writes', active: true },
        { tag: 'WORKER B', title: 'Active Leader', meta: 'Epoch 05 (Committed)' },
      ],
    },
    wabrix: {
      title: 'wabrix.nylo.me / edge-ingress',
      badge: 'ARCHITECTURE',
      nodes: [
        { tag: 'EDGE', title: 'Hono Webhook', meta: 'Cloudflare Workers' },
        { tag: 'STATE', title: 'Convex Thread Sync', meta: 'Realtime Reactive', active: true },
        { tag: 'OPERATOR', title: 'Live Handoff', meta: 'Human Handoff' },
      ],
    },
  };
  const cfg = configs[id] || configs.flowdesk;

  return (
    <div className="hero-rail-node-canvas" data-ui="true">
      <div className="hero-rail-top-bar">
        <div className="hero-rail-traffic">
          <span className="dot dot--orange" />
          <span className="dot dot--yellow" />
        </div>
        <span className="hero-rail-path">{cfg.title}</span>
        <span className="hero-rail-badge">{cfg.badge}</span>
      </div>

      <div className="hero-rail-nodes-track">
        {cfg.nodes.map((node, i) => (
          <React.Fragment key={node.title}>
            <div
              className={`hero-node-box ${
                node.active ? 'hero-node-box--active' : ''
              } ${node.stale ? 'hero-node-box--stale' : ''}`}
            >
              <span className="hero-node-tag">{node.tag}</span>
              <strong className="hero-node-title">{node.title}</strong>
              <span className="hero-node-meta">{node.meta}</span>
            </div>
            {i < cfg.nodes.length - 1 && (
              <div className="hero-connector-wire">
                <svg width="44" height="12" viewBox="0 0 44 12" fill="none">
                  <line
                    x1="0"
                    y1="6"
                    x2="44"
                    y2="6"
                    stroke="rgba(247, 246, 227, 0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx="22"
                    cy="6"
                    r="3"
                    fill="var(--color-yellow)"
                    className="pulse-signal-dot"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/**
 * Zoomed-in WhatsApp + RAG Grounded Interaction Fragment for FlowDesk AI.
 * Replaces shrunk landing page screenshots with a crisp, 100% readable product interaction.
 */
export function FlowDeskChatFragment() {
  return (
    <div className="flowdesk-chat-fragment" data-ui="true">
      <div className="fragment-header">
        <span className="fragment-dot fragment-dot--green" />
        <span className="fragment-title">WhatsApp Webhook &amp; Outbox Flow</span>
        <span className="fragment-status-badge">ILLUSTRATION</span>
      </div>

      <div className="fragment-chat-canvas">
        {/* User Incoming WhatsApp Message */}
        <div className="chat-bubble chat-bubble--incoming">
          <p className="chat-bubble-text">
            “What happens if Meta sends the same webhook twice?”
          </p>
          <span className="chat-bubble-meta">Example incoming event</span>
        </div>

        {/* System RAG Grounded & Outbox Response */}
        <div className="chat-bubble chat-bubble--grounded">
          <div className="grounded-badge-row">
            <span className="grounded-pill">ATOMIC OUTBOX</span>
            <span className="grounded-latency">PostgreSQL</span>
          </div>
          <p className="chat-bubble-text">
            Ingress deduplicates the webhook and commits the event with its outbox record.
            The worker claims the job from PostgreSQL and retries transient failures.
          </p>
          <div className="grounded-source-row">
            <span className="grounded-file">PostgreSQL outbox</span>
            <span className="grounded-spec">Replay integration test</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Native SVG & HTML Distributed Lease Fencing Diagram for Deadbolt.
 * Replaces blurry presentation slide images with a sharp, Stripe/Linear quality visual.
 */
export function DeadboltFencingDiagram() {
  return (
    <div className="deadbolt-fencing-canvas" data-ui="true">
      <div className="deadbolt-fencing-header">
        <span className="fragment-dot fragment-dot--orange" />
        <span className="deadbolt-fencing-title">DISTRIBUTED LEASE FENCING PROTOCOL</span>
        <span className="deadbolt-epoch-badge">EXAMPLE · EPOCH #05</span>
      </div>

      <div className="deadbolt-lanes-container">
        {/* Worker A (Zombie / Stale) */}
        <div className="deadbolt-lane deadbolt-lane--stale">
          <div className="deadbolt-worker-card deadbolt-worker-card--stale">
            <div className="worker-header">
              <span className="worker-status-badge worker-status-badge--stale">ZOMBIE</span>
              <strong className="worker-name">Worker A</strong>
            </div>
            <span className="worker-epoch">lease_epoch: 04 (expired)</span>
          </div>
          <div className="deadbolt-arrow-line deadbolt-arrow-line--blocked">
            <span className="deadbolt-barrier-action">✕ WRITE BLOCKED</span>
          </div>
        </div>

        {/* The Fence Guard */}
        <div className="deadbolt-fence-divider">
          <div className="fence-pillar">
            <span className="fence-label">FENCING TOKEN GUARD</span>
            <span className="fence-condition">WHERE epoch == 05</span>
          </div>
        </div>

        {/* Worker B (Active Leader) */}
        <div className="deadbolt-lane deadbolt-lane--active">
          <div className="deadbolt-worker-card deadbolt-worker-card--active">
            <div className="worker-header">
              <span className="worker-status-badge worker-status-badge--active">LEADER</span>
              <strong className="worker-name">Worker B</strong>
            </div>
            <span className="worker-epoch">lease_epoch: 05 (valid)</span>
          </div>
          <div className="deadbolt-arrow-line deadbolt-arrow-line--permitted">
            <span className="deadbolt-barrier-action">✔ COMMITTED TO DB</span>
          </div>
        </div>
      </div>

      <div className="deadbolt-footer-invariant">
        <span>INVARIANT: Monotonic token rejects split-brain writes during partition</span>
      </div>
    </div>
  );
}

/**
 * Zoomed-in Edge Webhook Ingress & Live Operator Handoff Fragment for Wabrix.
 */
export function WabrixEdgeFragment() {
  return (
    <div className="wabrix-edge-fragment" data-ui="true">
      <div className="fragment-header">
        <span className="fragment-dot fragment-dot--yellow" />
        <span className="fragment-title">Cloudflare Workers · Example Ingress</span>
        <span className="fragment-status-badge">HONO + CONVEX</span>
      </div>

      <div className="wabrix-steps-stack">
        <div className="wabrix-step-row">
          <span className="step-badge">INGRESS</span>
          <span className="step-name">POST /webhooks/whatsapp</span>
          <span className="step-status">HMAC SHA-256 ✔</span>
        </div>
        <div className="wabrix-step-row wabrix-step-row--alert">
          <span className="step-badge step-badge--alert">CONFIDENCE</span>
          <span className="step-name">Operator requests takeover</span>
          <span className="step-status step-status--alert">HANDOFF REQUESTED</span>
        </div>
        <div className="wabrix-step-row wabrix-step-row--handoff">
          <span className="step-badge step-badge--handoff">CONVEX SYNC</span>
          <span className="step-name">Thread Routed to Operator Dashboard</span>
          <span className="step-status step-status--handoff">OPERATOR LIVE</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Curated PR Stack UI
 * Replaces blurry, microscopic GitHub window screenshots with 3 bold, legible PR rows
 * and a subtle fade-out row at 13-14px font size.
 */
export function CuratedPRStack() {
  const PRS = [
    {
      repo: 'mastra-ai/mastra',
      pr: '#15346',
      title: 'Support function-valued tool approvals',
      change: 'Bug fix and regression test',
      badge: 'Merged',
    },
    {
      repo: 'celery/celery',
      pr: '#10739',
      title: 'Expand ~ in spawned workers’ --workdir paths',
      change: 'Bug fix and regression test',
      badge: 'Merged',
    },
    {
      repo: 'OpenHands/OpenHands',
      pr: '#12223',
      title: 'Add chat loading skeletons and stabilize conversation routing',
      change: 'React UI and routing',
      badge: 'Merged',
    },
  ];

  return (
    <div className="curated-pr-stack-canvas" data-ui="true">
      <div className="curated-pr-header">
        <div className="curated-pr-lights">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <span className="curated-pr-header-title">
          upstream pull requests
        </span>
        <span className="curated-pr-count-badge">{MERGED_PR_COUNT} MERGED PRs</span>
      </div>

      <div className="curated-pr-list">
        {PRS.map((item) => (
          <div key={item.pr} className="curated-pr-row">
            <div className="curated-pr-row-top">
              <span className="curated-pr-repo">{item.repo}</span>
              <span className="curated-pr-badge-merged">{item.badge}</span>
            </div>
            <div className="curated-pr-row-title">
              <span className="curated-pr-num">{item.pr}</span>
              <span className="curated-pr-text">{item.title}</span>
            </div>
            <div className="curated-pr-row-meta">
              <span className="curated-pr-diff">{item.change}</span>
              <span className="curated-pr-verified">Merged upstream</span>
            </div>
          </div>
        ))}

        {/* Fade-out 4th row indicating additional PRs */}
        <div className="curated-pr-fade-row">
          <span>+{MERGED_PR_COUNT - PRS.length} more merged PRs</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Engineering Profile & Practice Card (How I Build & Available Roles)
 * Clean, human, authentic engineer scorecard + workflow philosophy.
 * Replaces disconnected architecture diagrams with a clear, relevant profile overview.
 */
export function EngineerProfilePractice() {
  return (
    <div className="engineer-profile-canvas" data-ui="true">
      <div className="engineer-profile-header">
        <div className="engineer-profile-badge-row">
          <span className="profile-status-indicator" />
          <span className="profile-status-text">AVAILABLE · REMOTE</span>
        </div>
        <span className="profile-tz-pill">UTC+7 · ACEH</span>
      </div>

      <div className="engineer-spec-grid">
        <div className="engineer-spec-item">
          <span className="spec-label">FOCUS</span>
          <strong className="spec-val">Full-Stack &amp; Distributed Backend</strong>
        </div>
        <div className="engineer-spec-item">
          <span className="spec-label">BACKGROUND</span>
          <strong className="spec-val">Data Science &amp; MLOps ➔ Web Systems</strong>
        </div>
      </div>

      <div className="engineer-principles-list">
        <div className="principle-item">
          <span className="principle-bullet">01</span>
          <div className="principle-content">
            <strong>Contracts First:</strong>
            <span>Schema validation &amp; strict typing before writing handlers.</span>
          </div>
        </div>
        <div className="principle-item">
          <span className="principle-bullet">02</span>
          <div className="principle-content">
            <strong>Deterministic Replays:</strong>
            <span>Replay tests check deduplication and recovery.</span>
          </div>
        </div>
        <div className="principle-item">
          <span className="principle-bullet">03</span>
          <div className="principle-content">
            <strong>Upstream Discipline:</strong>
            <span>Reproduce bugs with minimal test specs before fixing.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Edge-to-edge #f7f6e3 monumental lowercase grotesk wordmark ("ryanakml")
 * spanning the bottom of the #262d29 footer.
 */
export function MonumentalWordmark() {
  return (
    <svg
      viewBox="0 0 1384 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="monumental-wordmark-svg"
      role="img"
      aria-label="ryanakml"
    >
      <text
        x="-4"
        y="252"
        fill="#f7f6e3"
        fontFamily='"Inter", "Suisseintl", Arial, sans-serif'
        fontWeight="400"
        fontSize="315"
        letterSpacing="-0.04em"
        textLength="1388"
        lengthAdjust="spacingAndGlyphs"
      >
        ryanakml
      </text>
    </svg>
  );
}

/**
 * Subtle architectural coordinate/dot grid backdrop for technical cards.
 * Zero external asset requests, crisp vector rendering on all display densities.
 */
export function TechnicalGridBackdrop({ accent = 'orange', opacity = 0.5 }) {
  const glowColor =
    accent === 'yellow'
      ? 'rgba(255, 255, 72, 0.1)'
      : accent === 'green'
      ? 'rgba(63, 185, 80, 0.12)'
      : 'rgba(251, 94, 0, 0.1)';

  return (
    <div
      className="technical-grid-backdrop"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#181d1a',
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id={`tech-grid-${accent}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="0.85" fill="rgba(247, 246, 227, 0.22)" />
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="rgba(247, 246, 227, 0.035)"
              strokeWidth="0.8"
            />
          </pattern>
          <radialGradient
            id={`glow-${accent}`}
            cx="80%"
            cy="20%"
            r="60%"
            fx="80%"
            fy="20%"
          >
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="rgba(24, 29, 26, 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#glow-${accent})`} />
        <rect width="100%" height="100%" fill={`url(#tech-grid-${accent})`} />
      </svg>
    </div>
  );
}

/**
 * Upstream Contributions Terminal Canvas
 * Replaces generic cafe stock photos with an authentic GitHub PR inspector showing
 * merged upstream pull requests with repo badges, commit diffs, and verification pills.
 */
export function UpstreamContributionsTerminal() {
  const PRS = [
    {
      repo: 'mastra-ai/mastra',
      pr: '#15346',
      title: 'Support function-valued tool approvals',
      change: 'Bug fix and regression test',
      tag: 'TypeScript · Core',
    },
    {
      repo: 'celery/celery',
      pr: '#10739',
      title: 'Expand multi-worker path configurations with home shorthand',
      change: 'Bug fix and regression test',
      tag: 'Python · Distributed',
    },
    {
      repo: 'django/django',
      pr: '#22093',
      title: 'Clarify upload-size multipart boundary verification in docs',
      change: 'Documentation',
      tag: 'Python · Framework',
    },
    {
      repo: 'OpenHands/OpenHands',
      pr: '#12223',
      title: 'Add chat loading skeletons and stabilize conversation routing',
      change: 'React UI and routing',
      tag: 'Python · Agent Runtime',
    },
  ];

  return (
    <div className="upstream-terminal-canvas" data-ui="true">
      <div className="upstream-terminal-header">
        <div className="upstream-terminal-traffic-lights">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <span className="upstream-terminal-title">
          github.com/search?q=author:ryanakml+is:merged
        </span>
        <span className="upstream-terminal-badge">
          <span className="upstream-terminal-status-glow" /> {MERGED_PR_COUNT} MERGED UPSTREAM
        </span>
      </div>

      <div className="upstream-terminal-body">
        {PRS.map((item) => (
          <div key={item.pr} className="upstream-pr-card">
            <div className="upstream-pr-top">
              <span className="upstream-pr-repo">{item.repo}</span>
              <span className="upstream-pr-badge-merged">MERGED</span>
            </div>
            <div className="upstream-pr-title">
              <span className="upstream-pr-number">{item.pr}</span>
              <span>{item.title}</span>
            </div>
            <div className="upstream-pr-meta">
              <span className="upstream-pr-tag">{item.tag}</span>
              <span className="upstream-pr-diff">{item.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Engineering Invariants & Execution Matrix
 * Replaces generic notebook/coffee desk photos with an authentic architectural
 * reliability scorecard detailing core engineering standards and production discipline.
 */
export function EngineeringInvariantsMatrix() {
  const INVARIANTS = [
    {
      code: 'TX-OUTBOX',
      label: 'ATOMIC OUTBOX PATTERN',
      desc: 'Single ACID transaction for PostgreSQL state mutation + outbox enqueue. Eliminates dual-write divergence.',
      pill: 'ATOMIC WRITE',
    },
    {
      code: 'EPOCH-FENCE',
      label: 'LEASE FENCING & TOKEN GUARDS',
      desc: 'Monotonic epoch counters reject stale heartbeat writes from zombie workers during network partitions.',
      pill: 'FAULT TOLERANT',
    },
    {
      code: 'REPLAY-HARNESS',
      label: 'DETERMINISTIC REPLAY HARNESS',
      desc: 'Deterministic webhook replays against ephemeral sandbox DBs verify idempotency and error boundaries.',
      pill: 'REPRODUCIBLE',
    },
    {
      code: 'UPSTREAM-SPEC',
      label: 'UPSTREAM-FIRST DISCIPLINE',
      desc: 'Isolate production edge cases into minimal reproduction test suites before shipping patches upstream.',
      pill: 'TEST-DRIVEN',
    },
  ];

  return (
    <div className="invariants-matrix-canvas" data-ui="true">
      <div className="invariants-matrix-header">
        <div className="invariants-header-left">
          <span className="invariants-dot-indicator" />
          <span className="invariants-spec-title">
            ENGINEERING EXECUTION SPEC · INVARIANTS
          </span>
        </div>
        <span className="invariants-status-tag">DESIGN PATTERNS</span>
      </div>

      <div className="invariants-matrix-list">
        {INVARIANTS.map((inv) => (
          <div key={inv.code} className="invariant-row">
            <div className="invariant-row-header">
              <span className="invariant-num">{inv.code}</span>
              <span className="invariant-label">{inv.label}</span>
              <span className="invariant-pill">{inv.pill}</span>
            </div>
            <p className="invariant-desc">{inv.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

