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
  size = 44,
  color = '#fb5e00',
  className = '',
  style = {},
}) {
  const path = SEED_PATHS[variant % SEED_PATHS.length];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', ...style }}
      aria-hidden="true"
    >
      <path d={path} fill={color} />
    </svg>
  );
}

/**
 * Custom SVG Brand Logo for ryanakml:
 * Combines a #262d29 forest-charcoal rounded emblem with an architectural
 * butter-paper 'r' branching stem, a #fb5e00 hot-orange organic seed node,
 * and the lowercase Swiss grotesk logotype.
 */
export function BrandLogoSVG() {
  return (
    <span className="brand-logo-lockup">
      <svg
        width="30"
        height="30"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-logo-mark-svg"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="15" fill="#262d29" />
        <path
          d="M21 48V20M21 31C21 24.5 26.2 20 33.5 20H36"
          stroke="#f7f6e3"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 38L34 48"
          stroke="#f7f6e3"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M44.2 14.3C48.8 14.0 52.4 17.5 52.6 22.2C52.8 26.9 49.1 30.8 44.4 31.0C39.7 31.2 35.9 27.6 35.7 22.8C35.5 18.0 39.6 14.6 44.2 14.3Z"
          fill="#fb5e00"
        />
        <circle cx="43.5" cy="46.5" r="3.5" fill="#ffff48" />
      </svg>
      <span className="brand-logo-text">ryanakml</span>
    </span>
  );
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
 * Architectural & Terminal Showcase Overlays for the 4 Engineering Build Rail Cards
 * Marked with data-ui so they render crisp inspectable engineering diagrams over dark card plates.
 */
export function BuildRailSchematic({ id }) {
  if (id === 'flowdesk') {
    return (
      <div className="rail-schematic-overlay" data-ui="true">
        <div className="rail-schematic-header">
          <span className="rail-schematic-dot rail-schematic-dot--orange" />
          <span className="rail-schematic-dot rail-schematic-dot--yellow" />
          <span className="rail-schematic-title">
            flowdesk-ai / transactional-outbox &amp; replay-runner
          </span>
          <span className="rail-schematic-badge">PASS · 105/105 specs</span>
        </div>

        <div className="rail-schematic-flow">
          <div className="rail-node">
            <span className="rail-node-tag">INGRESS</span>
            <strong>WhatsApp Webhook</strong>
            <span>HMAC-SHA256 + idempotency key</span>
          </div>
          <div className="rail-arrow">→</div>
          <div className="rail-node rail-node--highlight">
            <span className="rail-node-tag">POSTGRESQL TX</span>
            <strong>Messages + Outbox</strong>
            <span>Atomic commit · tenant_id RLS</span>
          </div>
          <div className="rail-arrow">→</div>
          <div className="rail-node">
            <span className="rail-node-tag">BULLMQ WORKER</span>
            <strong>Relay &amp; AI Triage</strong>
            <span>At-least-once delivery + backoff</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'deadbolt') {
    return (
      <div className="rail-schematic-overlay" data-ui="true">
        <div className="rail-schematic-header">
          <span className="rail-schematic-dot rail-schematic-dot--orange" />
          <span className="rail-schematic-title">
            deadbolt / go-control-plane / lease_fencing_test.go
          </span>
          <span className="rail-schematic-badge rail-schematic-badge--yellow">
            EPOCH FENCE #05
          </span>
        </div>

        <div className="rail-schematic-flow">
          <div className="rail-node rail-node--muted">
            <span className="rail-node-tag">WORKER A · STALE</span>
            <strong>lease_epoch: 04</strong>
            <span>Heartbeat expired → Write rejected</span>
          </div>
          <div className="rail-arrow">⇥</div>
          <div className="rail-node rail-node--highlight">
            <span className="rail-node-tag">POSTGRES + NATS</span>
            <strong>Fencing Token Guard</strong>
            <span>WHERE lease_epoch = current_epoch</span>
          </div>
          <div className="rail-arrow">→</div>
          <div className="rail-node">
            <span className="rail-node-tag">WORKER B · ACTIVE</span>
            <strong>lease_epoch: 05</strong>
            <span>Reclaimed step_02 → Committed</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'wabrix') {
    return (
      <div className="rail-schematic-overlay" data-ui="true">
        <div className="rail-schematic-header">
          <span className="rail-schematic-dot rail-schematic-dot--yellow" />
          <span className="rail-schematic-title">
            wabrix.nylo.me / edge-ingress + convex-realtime
          </span>
          <span className="rail-schematic-badge">EDGE · HONO + CONVEX</span>
        </div>

        <div className="rail-schematic-flow">
          <div className="rail-node">
            <span className="rail-node-tag">CLOUDFLARE WORKERS</span>
            <strong>Hono Webhook Edge</strong>
            <span>Zero-cold-start signature verify</span>
          </div>
          <div className="rail-arrow">→</div>
          <div className="rail-node rail-node--highlight">
            <span className="rail-node-tag">CONVEX STATE</span>
            <strong>Reactive Thread Sync</strong>
            <span>Deterministic state &amp; AI draft</span>
          </div>
          <div className="rail-arrow">→</div>
          <div className="rail-node">
            <span className="rail-node-tag">NEXT.JS OPERATOR UI</span>
            <strong>Human Handoff</strong>
            <span>Live takeover on confidence drop</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rail-schematic-overlay" data-ui="true">
      <div className="rail-schematic-header">
        <span className="rail-schematic-dot rail-schematic-dot--orange" />
        <span className="rail-schematic-title">
          syntrop / sqlite-wal + causal-dag-memory
        </span>
        <span className="rail-schematic-badge rail-schematic-badge--yellow">
          LOCAL-FIRST DAG
        </span>
      </div>

      <div className="rail-schematic-flow">
        <div className="rail-node">
          <span className="rail-node-tag">NODE 01 · DECISION</span>
          <strong>Schema Boundary</strong>
          <span>sha256: 7c91a4 · parent: root</span>
        </div>
        <div className="rail-arrow">→</div>
        <div className="rail-node rail-node--highlight">
          <span className="rail-node-tag">NODE 02 · INVARIANT</span>
          <strong>SQLite FTS5 + DAG</strong>
          <span>Causal traversal · zero network drift</span>
        </div>
        <div className="rail-arrow">→</div>
        <div className="rail-node">
          <span className="rail-node-tag">NODE 03 · VERIFY</span>
          <strong>Agent Recall Slice</strong>
          <span>Deterministic context assembly</span>
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
