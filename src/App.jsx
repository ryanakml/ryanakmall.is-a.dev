import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
} from 'framer-motion';
import {
  OrganicSeedBlob,
  BrandLogoSVG,
  BranchSpineSVG,
  EMBLEM_TIP_OFFSETS,
  ArrowIcon,
  ProgramEmblem,
  QuotePartnerMark,
  BuildRailSchematic,
  MonumentalWordmark,
  TechnicalGridBackdrop,
  FlowDeskChatFragment,
  DeadboltFencingDiagram,
  WabrixEdgeFragment,
  CuratedPRStack,
  EngineerProfilePractice,
} from './components/Graphics';
import {
  SkillIconsProvider,
  PORTFOLIO_SKILLS_LIST,
  SkillMarqueeBadge,
  SkillLogo,
} from './components/SkillIconsProvider';

/* ==========================================================================
   Core Choreography Easing & Viewport Constants
   ========================================================================== */
const EASE_MORPH = [0.22, 1, 0.36, 1];
const EASE_COUNT = [0.16, 1, 0.3, 1];
const VIEWPORT_ONCE = { once: true, amount: 0.25 };

/* ==========================================================================
   7 Video-Extracted Hero Seed Coordinates (from intro_14.jpg -> intro_18.jpg)
   ========================================================================== */
const HERO_SEEDS = [
  {
    id: 0,
    variant: 0,
    size: 18,
    clusterDx: -10,
    clusterDy: -22,
    heroX: 0.33,
    heroY: 0.098,
  },
  {
    id: 1,
    variant: 1,
    size: 35,
    clusterDx: -26,
    clusterDy: -4,
    heroX: 0.168,
    heroY: 0.252,
  },
  {
    id: 2,
    variant: 2,
    size: 44,
    clusterDx: 22,
    clusterDy: -16,
    heroX: 0.805,
    heroY: 0.14,
  },
  {
    id: 3,
    variant: 3,
    size: 37,
    clusterDx: -22,
    clusterDy: 16,
    heroX: 0.06,
    heroY: 0.49,
  },
  {
    id: 4,
    variant: 4,
    size: 54,
    clusterDx: 24,
    clusterDy: 12,
    heroX: 0.845,
    heroY: 0.435,
  },
  {
    id: 5,
    variant: 5,
    size: 22,
    clusterDx: -6,
    clusterDy: 20,
    heroX: 0.282,
    heroY: 0.605,
  },
  {
    id: 6,
    variant: 6,
    size: 68,
    clusterDx: 4,
    clusterDy: 28,
    heroX: 0.54,
    heroY: 0.818,
  },
];

/* ==========================================================================
   4. Engineering Build Rail (687px cards, 9.4px gutters, 70x70px Arrow Squares)
   ========================================================================== */
const BUILD_RAIL_ITEMS = [
  {
    id: 'flowdesk',
    alt: 'FlowDesk AI transactional outbox architecture and webhook replay runner',
    caption:
      'FlowDesk AI · Multi-tenant WhatsApp inbox with PostgreSQL transactional outbox & replay tests',
    repoLabel: 'flowdesk-ai ↗',
    repoHref: 'https://github.com/ryanakml/flowdesk-ai',
    accent: 'yellow',
  },
  {
    id: 'deadbolt',
    alt: 'Deadbolt collaborative Go workflow engine lease fencing and recovery check',
    caption:
      'Deadbolt · Collaborative Go workflow engine exploring worker leases, fencing tokens & failure recovery',
    repoLabel: 'Deadbolt ↗',
    repoHref: 'https://github.com/ryanakml/Deadbolt',
    accent: 'orange',
  },
  {
    id: 'wabrix',
    alt: 'Wabrix edge webhook ingress on Cloudflare Workers and Hono with Convex state',
    caption:
      'Wabrix · Edge webhook ingress on Cloudflare Workers and Hono with Convex real-time state & AI handoff',
    repoLabel: 'wabrix.nylo.me ↗',
    repoHref: 'https://wabrix.nylo.me',
    accent: 'green',
  },
];

/* ==========================================================================
   5. Tech Stack Marquee (50s Linear Infinite Monochrome Strip)
   ========================================================================== */
const TECH_STACK_ITEMS = [
  { name: 'TypeScript', glyph: 'grid-frame' },
  { name: 'React', glyph: 'circle-core' },
  { name: 'Next.js', glyph: 'twin-node' },
  { name: 'Node.js', glyph: 'hex-core' },
  { name: 'PostgreSQL', glyph: 'globe-node' },
  { name: 'Go', glyph: 'arch-beam' },
  { name: 'Redis', glyph: 'stacked-stone' },
  { name: 'NATS JetStream', glyph: 'asterisk-tree' },
  { name: 'Convex', glyph: 'circle-core' },
  { name: 'Cloudflare Workers', glyph: 'cloud-outline' },
  { name: 'Docker', glyph: 'grid-frame' },
  { name: 'OpenTelemetry', glyph: 'twin-node' },
];

/* ==========================================================================
   5. Three Unboxed 131px Serif Count-Up Proof Numerals
   ========================================================================== */
const PROOF_METRICS = [
  {
    value: 9,
    suffix: '',
    label: 'Merged pull requests in upstream open-source repos',
  },
  {
    value: 3,
    suffix: '',
    label: 'Full-stack applications and workflow systems shipped',
  },
  {
    value: 3,
    suffix: '',
    label: 'Professional full-stack and data certifications',
  },
];

/* ==========================================================================
   6. Upstream Merged Pull Requests Ledger (Inspectable on Card 1 of Chapter 2)
   ========================================================================== */
const UPSTREAM_MERGED_PRS = [
  { repo: 'OpenHands', pr: '#12223 · #12219' },
  { repo: 'Mastra', pr: '#15346' },
  { repo: 'Celery', pr: '#10739' },
  { repo: 'Django', pr: '#22093' },
  { repo: 'SciPy', pr: '#26327' },
  { repo: 'Pylint', pr: '#11487' },
  { repo: 'Typeshed', pr: '#16450' },
  { repo: 'Haystack', pr: '#4011' },
];

/* ==========================================================================
   7. Isolated Engineering Philosophy Quotations
   ========================================================================== */
const PHILOSOPHY_QUOTES = [
  {
    id: 'phil-1',
    quote:
      '"I want to understand the entire lifecycle of a feature: from user interaction and API validation, down to database transactions and background workers, and back to the client state."',
    attribution: 'Ryan Akmal Pasya · Full-Stack & Backend Focus',
    tag: 'ryanakml',
  },
  {
    id: 'phil-2',
    quote:
      '"Workers must never assume they still own a job. Heartbeat leases, fencing tokens, and explicit database transaction boundaries are what keep recovery safe when networks partition."',
    attribution: 'Lessons from Deadbolt · Workflow Exploration',
    tag: 'Deadbolt',
  },
  {
    id: 'phil-3',
    quote:
      '"AI tools speed up exploration and syntax generation, but system architecture requires human scrutiny. My focus stays on verifying data flow, weighing operational tradeoffs, and proving edge-case behavior with tests."',
    attribution: 'Engineering Workflow · Aceh, Indonesia',
    tag: 'Practice',
  },
];

/* ==========================================================================
   Easing Helpers for Scroll-Linked Seed Trajectory
   ========================================================================== */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/* ==========================================================================
   Subcomponents
   ========================================================================== */

function StackGlyph({ type }) {
  switch (type) {
    case 'hex-core':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="#262d29" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="2.8" fill="#262d29" />
        </svg>
      );
    case 'cloud-outline':
      return (
        <svg width="24" height="18" viewBox="0 0 28 20" fill="none" aria-hidden="true">
          <path
            d="M7.5 17.5H21C23.8 17.5 26 15.3 26 12.5C26 9.9 24 7.8 21.5 7.5C20.6 4.4 17.8 2 14.5 2C10.4 2 7 5.4 7 9.5C4.2 9.8 2 12.1 2 15C2 16.4 3.1 17.5 4.5 17.5H7.5Z"
            stroke="#262d29"
            strokeWidth="1.5"
          />
        </svg>
      );
    case 'globe-node':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#262d29" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke="#262d29" strokeWidth="1.3" />
          <path d="M3.5 12H20.5" stroke="#262d29" strokeWidth="1.3" />
        </svg>
      );
    case 'asterisk-tree':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M9 2V16M3 6L15 12M15 6L3 12"
            stroke="#262d29"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'grid-frame':
      return (
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" stroke="#262d29" strokeWidth="1.5" />
          <path d="M2.5 10H17.5M10 2.5V17.5" stroke="#262d29" strokeWidth="1.3" />
        </svg>
      );
    case 'arch-beam':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 16V10C4 6.686 6.686 4 10 4C13.314 4 16 6.686 16 10V16" stroke="#262d29" strokeWidth="1.5" />
          <circle cx="10" cy="12" r="2.5" fill="#262d29" />
        </svg>
      );
    case 'stacked-stone':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="12" height="3.2" rx="1.6" fill="#262d29" />
          <rect x="3" y="8.5" width="14" height="3.2" rx="1.6" stroke="#262d29" strokeWidth="1.3" />
          <rect x="5" y="13" width="10" height="3.2" rx="1.6" fill="#262d29" />
        </svg>
      );
    case 'twin-node':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="10" r="4" stroke="#262d29" strokeWidth="1.5" />
          <circle cx="13.5" cy="10" r="4" fill="#262d29" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7.5" stroke="#262d29" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2.8" fill="#262d29" />
        </svg>
      );
  }
}

/**
 * Synchronized 1000ms Count-Up Proof Numeral using Framer Motion's animate()
 * with cubic-bezier(0.16, 1, 0.3, 1).
 */
function CountUpStat({ value, suffix, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.0,
      ease: EASE_COUNT,
      onUpdate(latest) {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="proof-number-block"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.55, ease: EASE_MORPH }}
    >
      <div className="type-stat" aria-label={`${value}${suffix}`}>
        {displayValue}
        {suffix}
      </div>
      <p className="type-body proof-number-label">{label}</p>
    </motion.div>
  );
}

/**
 * Ruled Section Introduction:
 * 1px #262d29 rule draws left-to-right (scaleX: 0 -> 1, 600ms) on viewport entry,
 * followed by heading/lead at 18.7px inset and right baseline Text link.
 */
function RuledSectionIntro({
  title,
  support,
  linkLabel,
  linkHref = '#contact',
  external = false,
  variant = 'heading',
  extraRight = null,
}) {
  return (
    <div className="ruled-header">
      <motion.div
        className="section-rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.6, ease: EASE_MORPH }}
      />
      <div className="ruled-header-row">
        <div className="ruled-header-copy">
          {variant === 'lead' ? (
            <motion.h2
              className="type-lead"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55, delay: 0.06, ease: EASE_MORPH }}
            >
              {title}
            </motion.h2>
          ) : (
            <motion.h2
              className="type-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55, delay: 0.06, ease: EASE_MORPH }}
            >
              {title}
            </motion.h2>
          )}
          {support && (
            <motion.p
              className="type-body ruled-header-support"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55, delay: 0.12, ease: EASE_MORPH }}
            >
              {support}
            </motion.p>
          )}
        </div>
        <div className="systems-peek-controls">
          {extraRight}
          {linkLabel && (
            <motion.a
              href={linkHref}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="type-body text-link"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE_MORPH }}
            >
              {linkLabel}
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Main Application Component
   ========================================================================== */

export default function App() {
  /* ------------------------------------------------------------------------
     1. Video-Exact 4-Stage Intro Preloader State Machine (0ms - 4850ms)
     ------------------------------------------------------------------------ */
  const [introStage, setIntroStage] = useState(1);
  const [introRunId, setIntroRunId] = useState(0);

  useEffect(() => {
    setIntroStage(1);
    const t2 = setTimeout(() => setIntroStage(2), 700);
    const t3 = setTimeout(() => setIntroStage(3), 1450);
    const t35 = setTimeout(() => setIntroStage(3.5), 3100);
    const t4 = setTimeout(() => setIntroStage(4), 3350);
    const t5 = setTimeout(() => setIntroStage(5), 4850);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t35);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [introRunId]);

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIntroRunId((prev) => prev + 1);
  }, []);

  const handleSkipIntro = useCallback(() => {
    setIntroStage(5);
  }, []);

  /* ------------------------------------------------------------------------
     2. Scroll-Linked Convergence of the 7 Hero Seeds into the 7 Berries
        of the 122x193px Branch Emblem
     ------------------------------------------------------------------------ */
  const emblemTargetRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    vw: typeof window !== 'undefined' ? window.innerWidth : 1440,
    vh: typeof window !== 'undefined' ? window.innerHeight : 900,
    emblemDocX: typeof window !== 'undefined' ? window.innerWidth / 2 : 720,
    emblemDocY: 1450,
  });

  const measureLayout = useCallback(() => {
    if (typeof window === 'undefined') return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    let emblemDocX = vw / 2;
    let emblemDocY = vh * 1.65;

    if (emblemTargetRef.current) {
      const rect = emblemTargetRef.current.getBoundingClientRect();
      emblemDocX = rect.left + window.scrollX + rect.width / 2;
      emblemDocY = rect.top + window.scrollY + rect.height / 2;
    }

    setScrollState({
      scrollY,
      vw,
      vh,
      emblemDocX,
      emblemDocY,
    });
  }, []);

  useLayoutEffect(() => {
    measureLayout();
    let rafId = null;

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        measureLayout();
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    const tRecalc = setTimeout(measureLayout, 600);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      clearTimeout(tRecalc);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [measureLayout, introStage]);

  const dockScrollY = Math.max(
    360,
    scrollState.emblemDocY - scrollState.vh * 0.53
  );
  const rawScrollProgress = Math.max(
    0,
    Math.min(1, scrollState.scrollY / dockScrollY)
  );

  const branchDrawProgress =
    rawScrollProgress < 0.48
      ? 0
      : Math.min(1, (rawScrollProgress - 0.48) / 0.46);

  /* ------------------------------------------------------------------------
     3. Engineering Build Rail Carousel State (687px cards, 9.4px gap)
     ------------------------------------------------------------------------ */
  const [activeRailIndex, setActiveRailIndex] = useState(0);

  const handlePrevRail = () => {
    setActiveRailIndex((prev) =>
      prev === 0 ? BUILD_RAIL_ITEMS.length - 1 : prev - 1
    );
  };

  const handleNextRail = () => {
    setActiveRailIndex((prev) =>
      prev === BUILD_RAIL_ITEMS.length - 1 ? 0 : prev + 1
    );
  };

  /* ------------------------------------------------------------------------
     4. Selected Systems Peeking 3rd Card Shift State
     ------------------------------------------------------------------------ */
  const [systemsOffsetIndex, setSystemsOffsetIndex] = useState(0);

  /* ------------------------------------------------------------------------
     5. Isolated Engineering Philosophy Quotation Carousel State
     ------------------------------------------------------------------------ */
  const [quoteState, setQuoteState] = useState({ index: 0, direction: 1 });

  const handlePrevQuote = () => {
    setQuoteState((prev) => ({
      index: prev.index === 0 ? PHILOSOPHY_QUOTES.length - 1 : prev.index - 1,
      direction: -1,
    }));
  };

  const handleNextQuote = () => {
    setQuoteState((prev) => ({
      index: prev.index === PHILOSOPHY_QUOTES.length - 1 ? 0 : prev.index + 1,
      direction: 1,
    }));
  };

  /* ------------------------------------------------------------------------
     6. Direct Email / Message Field in Monumental Footer
     ------------------------------------------------------------------------ */
  const [messageInput, setMessageInput] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      messageInput.trim() ||
        'Hi Ryan, I checked out your portfolio and would like to connect.'
    );
    window.location.href = `mailto:ryan@nylo.me?subject=${encodeURIComponent(
      'Engineering Inquiry via ryanakml Portfolio'
    )}&body=${body}`;
  };

  const isBurstStarted = introStage >= 4;
  const isClusterVisible = introStage >= 3.5;
  const activeQuote = PHILOSOPHY_QUOTES[quoteState.index];

  /* Track translation formula centering the active 687px Build Rail card
     with 9.4px gutters and peeking adjacent cards on both viewport edges */
  const railTrackTransform = `translate3d(calc(50vw - (min(687px, 84vw) / 2) - ${activeRailIndex} * (min(687px, 84vw) + 9.4px)), 0, 0)`;

  /* Selected Systems 3-card track shift when inspecting Card 3 ("Wabrix") */
  const systemsRailTransform =
    systemsOffsetIndex === 1 && scrollState.vw > 991
      ? 'translate3d(calc(-50% - 4.7px), 0, 0)'
      : 'translate3d(0, 0, 0)';

  return (
    <div className="page-canvas">
      {/* ====================================================================
          SEQUENCE 1: Video-Exact Intro Organic Blob & Diagonal Word Drift
          ("Big things" [orange circle] "Start small")
          ==================================================================== */}
      <AnimatePresence>
        {introStage < 3.5 && (
          <motion.div
            key={`blob-morph-${introRunId}`}
            className="intro-overlay-layer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
          >
            <motion.div
              className="intro-central-blob"
              initial={{ scale: 24, rotate: 0 }}
              animate={
                introStage === 1
                  ? { scale: 24, rotate: 0 }
                  : introStage === 2
                  ? { scale: 1.14, rotate: -18 }
                  : { scale: 0.44, rotate: -28 }
              }
              transition={{
                duration: introStage === 3 ? 0.65 : 0.75,
                ease: EASE_MORPH,
              }}
            >
              <OrganicSeedBlob variant={0} size={100} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introStage < 5 && (
          <React.Fragment key={`words-${introRunId}`}>
            <motion.span
              className="intro-floating-word intro-floating-word--left"
              initial={{ opacity: 0, x: -46, y: 0 }}
              animate={
                introStage < 4
                  ? { opacity: 1, x: -46, y: 0 }
                  : {
                      opacity: [1, 0.26, 0],
                      x: -scrollState.vw * 0.27,
                      y: -scrollState.vh * 0.3,
                    }
              }
              exit={{ opacity: 0 }}
              transition={
                introStage < 4
                  ? { duration: 0.42, ease: EASE_MORPH }
                  : {
                      duration: 1.4,
                      ease: EASE_MORPH,
                      opacity: { duration: 1.4, times: [0, 0.45, 1] },
                    }
              }
            >
              Big things
            </motion.span>

            <motion.span
              className="intro-floating-word intro-floating-word--right"
              initial={{ opacity: 0, x: 46, y: 0 }}
              animate={
                introStage === 1
                  ? { opacity: 0, x: 46, y: 0 }
                  : introStage < 4
                  ? { opacity: 1, x: 46, y: 0 }
                  : {
                      opacity: [1, 0.26, 0],
                      x: scrollState.vw * 0.27,
                      y: -scrollState.vh * 0.3,
                    }
              }
              exit={{ opacity: 0 }}
              transition={
                introStage < 4
                  ? { duration: 0.45, delay: 0.18, ease: EASE_MORPH }
                  : {
                      duration: 1.4,
                      ease: EASE_MORPH,
                      opacity: { duration: 1.4, times: [0, 0.45, 1] },
                    }
              }
            >
              Start small
            </motion.span>

            {introStage < 4 && (
              <button
                type="button"
                onClick={handleSkipIntro}
                className="type-caption preloader-skip-btn"
              >
                Skip intro
              </button>
            )}
          </React.Fragment>
        )}
      </AnimatePresence>

      {/* ====================================================================
          SEQUENCE 2 & 4: The 7 Organic #fb5e00 Seeds Layer
          - Stage 3.5: Cluster at viewport center
          - Stage 4: Burst radially to 7 Hero coordinates
          - On Scroll: Converge downward into the 7 branch tips of BranchSpineSVG
          ==================================================================== */}
      {isClusterVisible && (
        <div className="scroll-seeds-document-layer" aria-hidden="true">
          {HERO_SEEDS.map((seed, idx) => {
            const tip = EMBLEM_TIP_OFFSETS[idx];

            const clusterX = scrollState.vw * 0.5 + seed.clusterDx;
            const clusterY = scrollState.vh * 0.5 + seed.clusterDy;
            const clusterSize = 26;

            const heroDocX = seed.heroX * scrollState.vw;
            const heroDocY = seed.heroY * scrollState.vh;

            const targetDocX = scrollState.emblemDocX + tip.dx;
            const targetDocY = scrollState.emblemDocY + tip.dy;

            const staggeredP = Math.max(
              0,
              Math.min(1, Math.pow(rawScrollProgress, 0.92 + (idx % 3) * 0.08))
            );
            const easeX = easeInOutCubic(staggeredP);
            const easeY = easeInOutQuad(staggeredP);

            const currentDocX = isBurstStarted
              ? heroDocX + (targetDocX - heroDocX) * easeX
              : clusterX;
            const currentDocY = isBurstStarted
              ? heroDocY + (targetDocY - heroDocY) * easeY
              : clusterY;
            const currentSize = isBurstStarted
              ? seed.size + (tip.size - seed.size) * easeX
              : clusterSize;

            return (
              <motion.div
                key={`seed-${seed.id}-${introRunId}`}
                className="scroll-seed-item"
                initial={{
                  x: clusterX - clusterSize / 2,
                  y: clusterY - clusterSize / 2,
                  width: clusterSize,
                  height: clusterSize,
                }}
                animate={{
                  x: currentDocX - currentSize / 2,
                  y: currentDocY - currentSize / 2,
                  width: currentSize,
                  height: currentSize,
                }}
                transition={
                  scrollState.scrollY > 4
                    ? { duration: 0.06, ease: 'linear' }
                    : { duration: 0.88, ease: EASE_MORPH }
                }
              >
                <div
                  className={
                    rawScrollProgress < 0.85 ? `seed-drift-${seed.id}` : ''
                  }
                >
                  <OrganicSeedBlob
                    variant={seed.variant}
                    size={currentSize}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ====================================================================
          FIRST SCREEN: Sky Fade, ryanakml Masthead & 2-Column Index Navigation,
          42.1px Centered Serif Promise & Engineering Build Rail
          ==================================================================== */}
      <div className="hero-wrapper">
        <motion.div
          className="sky-fade-surface"
          initial={{ opacity: 0 }}
          animate={{
            opacity: introStage === 3.5 ? 0.45 : isBurstStarted ? 1 : 0,
          }}
          transition={{ duration: 0.85, ease: EASE_MORPH }}
        />

        {/* 2. Masthead & 2-Column Index Navigation */}
        <motion.header
          className="masthead main-container"
          initial={{ opacity: 0 }}
          animate={{
            opacity: introStage === 3.5 ? 0.35 : isBurstStarted ? 1 : 0,
          }}
          transition={{ duration: 0.75, ease: EASE_MORPH }}
        >
          <div className="masthead-grid">
            <a
              href="#top"
              className="brand-mark-link"
              id="top"
              aria-label="ryanakml · Ryan Akmal Pasya"
            >
              <BrandLogoSVG />
            </a>

            <nav className="index-nav" aria-label="Primary index">
              <ul className="index-nav-column">
                <li>
                  <a
                    href="#systems"
                    className="type-nav index-nav-link"
                    aria-current="page"
                  >
                    <span className="index-dot" aria-hidden="true" />
                    <span>Work</span>
                  </a>
                </li>
                <li>
                  <a href="#open-source" className="type-nav index-nav-link">
                    <span className="index-dot" aria-hidden="true" />
                    <span>Open Source</span>
                  </a>
                </li>
                <li>
                  <a href="#build-rail" className="type-nav index-nav-link">
                    <span className="index-dot" aria-hidden="true" />
                    <span>Architecture</span>
                  </a>
                </li>
                <li>
                  <a href="#stack" className="type-nav index-nav-link">
                    <span className="index-dot" aria-hidden="true" />
                    <span>Stack</span>
                  </a>
                </li>
              </ul>

              <ul className="index-nav-column">
                <li>
                  <a href="#principles" className="type-nav index-nav-link">
                    <span className="index-dot" aria-hidden="true" />
                    <span>About</span>
                  </a>
                </li>
                <li>
                  <a href="#contact" className="type-nav index-nav-link">
                    <span className="index-dot" aria-hidden="true" />
                    <span>Certifications</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ryanakml"
                    target="_blank"
                    rel="noreferrer"
                    className="type-nav index-nav-link"
                  >
                    <span className="index-dot" aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="#contact" className="type-nav index-nav-link">
                    <span className="index-dot" aria-hidden="true" />
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </nav>

            <div className="masthead-actions">
              <button
                type="button"
                onClick={handleReplayIntro}
                className="type-caption outline-button outline-button--subtle"
                title="Replay 4-stage intro choreography"
              >
                Replay intro
              </button>
              <a href="#contact" className="type-caption outline-button">
                Get in touch
              </a>
            </div>
          </div>
        </motion.header>

        {/* 3. Centered 42.1px Regular Serif Opening Promise + Compact Identity Line */}
        <main id="work">
          <section
            className="hero-promise-stage main-container"
            aria-label="Opening statement"
          >
            <motion.h1
              className="type-display opening-measure"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isBurstStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.85, delay: 0.08, ease: EASE_MORPH }}
            >
              I build both sides of the loading spinner: responsive web
              interfaces upfront, and the background jobs, databases, and APIs
              that keep them reliable when things break.
            </motion.h1>

            <motion.div
              className="type-caption hero-identity-pill"
              initial={{ opacity: 0, y: 8 }}
              animate={
                isBurstStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.75, delay: 0.18, ease: EASE_MORPH }}
            >
              <span className="hero-identity-dot" aria-hidden="true" />
              <span>
                Ryan Akmal Pasya · Full-Stack Developer (TS, React, Node.js,
                PostgreSQL, Go) · Aceh, ID (UTC+7)
              </span>
            </motion.div>
          </section>

          {/* 4. Engineering Build Rail Controls (70x70px Arrow Squares, right-aligned) */}
          <motion.div
            id="build-rail"
            className="main-container"
            initial={{ opacity: 0 }}
            animate={{
              opacity: introStage === 3.5 ? 0.35 : isBurstStarted ? 1 : 0,
            }}
            transition={{ duration: 0.75, ease: EASE_MORPH }}
          >
            <div className="rail-controls-row">
              <button
                type="button"
                onClick={handlePrevRail}
                className="arrow-square"
                aria-label="Previous engineering showcase panel"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={handleNextRail}
                className="arrow-square"
                aria-label="Next engineering showcase panel"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </motion.div>

          {/* 4. Horizontal Engineering Build Rail (687px cards, 9.4px gap) */}
          <motion.section
            className="photo-rail-viewport"
            aria-label="Engineering architecture and build rail"
            initial={{ opacity: 0, y: 130 }}
            animate={
              isBurstStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 130 }
            }
            transition={{ duration: 0.88, delay: 0.12, ease: EASE_MORPH }}
          >
            <div
              className="photo-rail-track"
              style={{ transform: railTrackTransform }}
            >
              {BUILD_RAIL_ITEMS.map((item, idx) => (
                <article
                  key={item.id}
                  className="photo-rail-card"
                  aria-current={idx === activeRailIndex ? 'true' : undefined}
                  onClick={() => setActiveRailIndex(idx)}
                  style={{
                    cursor: idx === activeRailIndex ? 'default' : 'pointer',
                  }}
                >
                  <TechnicalGridBackdrop accent={item.accent} opacity={0.55} />
                  <BuildRailSchematic id={item.id} />
                  <div className="photo-shade-scrim" />
                  <div className="photo-rail-caption">
                    <p className="type-caption photo-rail-caption-title">
                      {item.caption}
                    </p>
                    <a
                      href={item.repoHref}
                      target="_blank"
                      rel="noreferrer"
                      className="type-caption photo-rail-repo-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.repoLabel}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>

          {/* ================================================================
              5. Tech Stack Marquee (50s Linear Infinite with @thesvg/react Provider) &
              Centered 122x193px #fb5e00 Branch Emblem
              ================================================================ */}
          <SkillIconsProvider
            variant="mono"
            size={20}
            color="#262d29"
            hoverColorReveal={true}
          >
            <section
              id="stack"
              className="marquee-section"
              aria-label="Core engineering stack"
            >
              <div className="marquee-track">
                {[0, 1].map((dupIndex) => (
                  <div
                    key={dupIndex}
                    className="marquee-group"
                    aria-hidden={dupIndex === 1 ? 'true' : undefined}
                  >
                    {PORTFOLIO_SKILLS_LIST.map((skillName) => (
                      <SkillMarqueeBadge
                        key={`${dupIndex}-${skillName}`}
                        name={skillName}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </SkillIconsProvider>

          {/* Centered 122x193px #fb5e00 Organic Branch Emblem inside ~150px paper space */}
          <div className="main-container emblem-clearing">
            <div ref={emblemTargetRef} className="emblem-dock-target">
              <BranchSpineSVG
                drawProgress={branchDrawProgress}
                showDockedBerries={!isClusterVisible}
              />
            </div>
          </div>

          {/* ================================================================
              5. Ruled Section Intro & Three Unboxed 131px Serif Count-Up Numerals
              (9 Merged PRs, 4 Systems Built, 3 IBM & Google Certifications)
              ================================================================ */}
          <section
            id="proof"
            className="main-container chapter-section"
            aria-label="Engineering proof in numbers"
          >
            <RuledSectionIntro
              variant="lead"
              title="Inspectable code, integration tests, and merged upstream fixes."
              linkLabel="GitHub (@ryanakml) ↗"
              linkHref="https://github.com/ryanakml"
              external={true}
            />

            <div className="proof-numbers-grid">
              {PROOF_METRICS.map((metric) => (
                <CountUpStat
                  key={metric.label}
                  value={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                />
              ))}
            </div>
          </section>

          {/* ================================================================
              6A. Chapter 1: "Selected Systems" (687x790px cards, 9.4px gap)
              - Card 1: FlowDesk AI (#ffff48 dot + "Systems & Outbox")
              - Card 2: Deadbolt (In Progress) (#fb5e00 quote + "Go & Distributed State")
              - Card 3: Wabrix (Peeking right + "Managed Edge & AI")
              ================================================================ */}
          <section
            id="systems"
            className="main-container chapter-section"
            aria-label="Selected Systems"
          >
            <RuledSectionIntro
              variant="heading"
              title="Selected Systems"
              support="Full-stack web applications, distributed workflow explorations, and edge ingress systems."
              linkLabel="All repositories ↗"
              linkHref="https://github.com/ryanakml"
              external={true}
              extraRight={
                <button
                  type="button"
                  onClick={() =>
                    setSystemsOffsetIndex((prev) => (prev === 0 ? 1 : 0))
                  }
                  className="type-caption outline-button"
                >
                  {systemsOffsetIndex === 0
                    ? 'Slide to Wabrix →'
                    : '← Back to FlowDesk & Deadbolt'}
                </button>
              }
            />

            <div className="paired-cards-wrapper">
              <div
                className="peeking-three-rail"
                style={{ transform: systemsRailTransform }}
              >
                {/* Card 1: FlowDesk AI (Zoomed-in WhatsApp + RAG Outbox interaction fragment) */}
                <motion.article
                  className="editorial-media-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.55, delay: 0, ease: EASE_MORPH }}
                >
                  <div className="card-media-backdrop card-media-backdrop--fragment">
                    <TechnicalGridBackdrop accent="yellow" opacity={0.4} />
                    <FlowDeskChatFragment />
                  </div>
                  <div className="photo-shade-scrim" />

                  <div className="card-content-stack">
                    <div className="card-text-group">
                      <h3 className="type-card-heading">FlowDesk AI</h3>
                      <p className="type-body card-description">
                        Multi-tenant WhatsApp support platform built around
                        reliable messaging. Uses PostgreSQL row-level security
                        for tenant isolation, an atomic transactional outbox to
                        prevent lost webhook dispatches, and BullMQ workers with
                        deterministic replay testing.
                      </p>
                    </div>
                    <div className="card-date-tag-row">
                      <span className="type-caption card-stack-icons-inline">
                        <SkillLogo name="React" size={14} variant="mono" />
                        <SkillLogo name="Express" size={14} variant="mono" />
                        <SkillLogo name="PostgreSQL" size={14} variant="mono" />
                        <SkillLogo name="Redis" size={14} variant="mono" />
                        <span>React · Express · PostgreSQL · Redis</span>
                      </span>
                      <a
                        href="https://github.com/ryanakml/flowdesk-ai"
                        target="_blank"
                        rel="noreferrer"
                        className="type-caption card-outline-tag"
                      >
                        Systems &amp; Outbox
                      </a>
                    </div>
                  </div>
                </motion.article>

                {/* Card 2: Deadbolt (In Progress) (Native Stripe/Linear-grade lease fencing diagram) */}
                <motion.article
                  className="editorial-media-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.55, delay: 0.09, ease: EASE_MORPH }}
                >
                  <div className="card-media-backdrop card-media-backdrop--fragment">
                    <TechnicalGridBackdrop accent="orange" opacity={0.4} />
                    <DeadboltFencingDiagram />
                  </div>
                  <div className="photo-shade-scrim" />

                  <div className="card-content-stack">
                    <div className="card-text-group">
                      <h3 className="type-card-heading">
                        Deadbolt (In Progress)
                      </h3>
                      <p className="type-body card-description">
                        Collaborative Go workflow engine exploring fault-tolerant
                        job execution. Pairs PostgreSQL state persistence with
                        NATS JetStream, using heartbeat leases and fencing tokens
                        to prevent zombie workers from corrupting state during
                        network partitions.
                      </p>
                    </div>
                    <div className="card-date-tag-row">
                      <span className="type-caption card-stack-icons-inline">
                        <SkillLogo name="Go" size={15} variant="mono" />
                        <SkillLogo name="PostgreSQL" size={14} variant="mono" />
                        <SkillLogo
                          name="NATS JetStream"
                          size={14}
                          variant="mono"
                        />
                        <span>Go · PostgreSQL · NATS JetStream</span>
                      </span>
                      <a
                        href="https://github.com/ryanakml/Deadbolt"
                        target="_blank"
                        rel="noreferrer"
                        className="type-caption card-outline-tag"
                      >
                        Go &amp; Distributed Systems
                      </a>
                    </div>
                  </div>
                </motion.article>

                {/* Card 3: Wabrix (Peeking right beyond the 2-column edge) */}
                <motion.article
                  className="editorial-media-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.55, delay: 0.18, ease: EASE_MORPH }}
                  onClick={() =>
                    setSystemsOffsetIndex((prev) => (prev === 0 ? 1 : 0))
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-media-backdrop card-media-backdrop--fragment">
                    <TechnicalGridBackdrop accent="green" opacity={0.4} />
                    <WabrixEdgeFragment />
                  </div>
                  <div className="photo-shade-scrim" />

                  <div className="card-content-stack">
                    <div className="card-text-group">
                      <h3 className="type-card-heading">Wabrix</h3>
                      <p className="type-body card-description">
                        Edge webhook ingress on Cloudflare Workers and Hono, syncing
                        reactive state through Convex for live operator takeover when
                        automated message triage drops below confidence thresholds.
                      </p>
                    </div>
                    <div className="card-date-tag-row">
                      <span className="type-caption card-stack-icons-inline">
                        <SkillLogo name="Next.js" size={14} variant="mono" />
                        <SkillLogo name="Convex" size={14} variant="mono" />
                        <SkillLogo
                          name="Cloudflare Workers"
                          size={14}
                          variant="mono"
                        />
                        <SkillLogo name="Hono" size={14} variant="mono" />
                        <span>Next.js · Convex · Cloudflare · Hono</span>
                      </span>
                      <a
                        href="https://wabrix.nylo.me"
                        target="_blank"
                        rel="noreferrer"
                        className="type-caption card-outline-tag"
                        onClick={(e) => e.stopPropagation()}
                      >
                        wabrix.nylo.me ↗
                      </a>
                    </div>
                  </div>
                </motion.article>
              </div>
            </div>
          </section>

          {/* ================================================================
              6B. Chapter 2: "Open Source & Engineering Practice" (687x790px)
              - Card 1: 9 Merged Upstream Contributions (#ffff48 button "Inspect Upstream PRs")
              - Card 2: How I Build & Available Roles (#ffff48 button "Email ryan@nylo.me")
              ================================================================ */}
          <section
            id="open-source"
            className="main-container chapter-section"
            aria-label="Open Source and Engineering Practice"
          >
            <RuledSectionIntro
              variant="heading"
              title="Open Source &amp; Engineering Practice"
              support="Reading unfamiliar codebases, reproducing bugs, and shipping tested patches upstream."
              linkLabel="View merged PRs ↗"
              linkHref="https://github.com/search?q=author%3Aryanakml+is%3Apr+is%3Amerged+-user%3Aryanakml&type=pullrequests"
              external={true}
            />

            <div className="paired-cards-wrapper paired-media-grid">
              {/* Card 1: 9 Merged Upstream Contributions */}
              <motion.article
                className="editorial-media-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.55, delay: 0, ease: EASE_MORPH }}
              >
                <div className="card-media-backdrop card-media-backdrop--stack">
                  <TechnicalGridBackdrop accent="green" opacity={0.35} />
                  <CuratedPRStack />
                </div>
                <div className="photo-shade-scrim" />

                <div className="card-content-stack">
                  <div className="card-program-header">
                    <ProgramEmblem variant="opensource" />
                    <span className="type-label">Upstream Open Source</span>
                  </div>
                  <div className="card-text-group">
                    <h3 className="type-card-heading">
                      9 Merged Upstream Contributions
                    </h3>
                    <p className="type-body card-description">
                      Shipped bug fixes, regression tests, and documentation
                      into active production ecosystems. Highlights include
                      fixing approval-callback routing in Mastra (#15346),
                      multi-worker path expansion in Celery (#10739),
                      upload-size boundary docs in Django (#22093), and UI
                      fixes in OpenHands (#12223, #12219).
                    </p>
                  </div>
                  <a
                    href="https://github.com/search?q=author%3Aryanakml+is%3Apr+is%3Amerged+-user%3Aryanakml&type=pullrequests"
                    target="_blank"
                    rel="noreferrer"
                    className="type-caption participation-yellow-btn"
                  >
                    Inspect Upstream PRs
                  </a>
                </div>
              </motion.article>

              {/* Card 2: How I Build & Available Roles */}
              <motion.article
                className="editorial-media-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.55, delay: 0.09, ease: EASE_MORPH }}
              >
                <div className="card-media-backdrop card-media-backdrop--stack">
                  <TechnicalGridBackdrop accent="orange" opacity={0.35} />
                  <EngineerProfilePractice />
                </div>
                <div className="photo-shade-scrim" />

                <div className="card-content-stack">
                  <div className="card-program-header">
                    <ProgramEmblem variant="practice" />
                    <span className="type-label">
                      Aceh, Indonesia (UTC+7) · Remote Ready
                    </span>
                  </div>
                  <div className="card-text-group">
                    <h3 className="type-card-heading">
                      How I Build &amp; Available Roles
                    </h3>
                    <p className="type-body card-description">
                      Early-career engineer based in Aceh, Indonesia (UTC+7).
                      My background in data analysis and MLOps shaped my
                      disciplined approach to data contracts and failure
                      modes, leading directly into full-stack and distributed
                      systems. Ready to contribute to remote teams as a
                      full-stack or backend engineer.
                    </p>
                  </div>
                  <a
                    href="mailto:ryan@nylo.me"
                    className="type-caption participation-yellow-btn"
                  >
                    Start a Conversation
                  </a>
                </div>
              </motion.article>
            </div>
          </section>

          {/* ================================================================
              7. Isolated 42.1px Serif Engineering Philosophy Quote Carousel
              ================================================================ */}
          <section
            id="principles"
            className="main-container isolated-quote-section"
            aria-label="Engineering philosophy"
          >
            <div className="isolated-quote-inner">
              <AnimatePresence mode="wait" custom={quoteState.direction}>
                <motion.div
                  key={activeQuote.id}
                  className="quote-stage-box"
                  initial={{ opacity: 0, x: quoteState.direction * 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: quoteState.direction * -20 }}
                  transition={{ duration: 0.36, ease: EASE_MORPH }}
                >
                  <span className="type-caption quote-attribution-single">
                    {activeQuote.attribution}
                  </span>

                  <blockquote className="type-display">
                    {activeQuote.quote}
                  </blockquote>

                  <QuotePartnerMark name={activeQuote.tag} />
                </motion.div>
              </AnimatePresence>

              <div className="quote-controls-pair">
                <button
                  type="button"
                  onClick={handlePrevQuote}
                  className="arrow-square"
                  aria-label="Previous engineering principle"
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  type="button"
                  onClick={handleNextQuote}
                  className="arrow-square"
                  aria-label="Next engineering principle"
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ====================================================================
          7. Monumental #262d29 Charcoal Footer & Edge-to-Edge ryanakml Wordmark
          ==================================================================== */}
      <footer id="contact" className="monumental-footer">
        <div className="footer-inner">
          <motion.div
            className="footer-utility-grid"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: EASE_MORPH }}
          >
            {/* Left Utility Block (Cols 1-4): Availability & Joined Email Action */}
            <div className="footer-col-newsletter">
              <h2 className="type-footer-label">Availability</h2>
              <p className="footer-muted-copy">
                Available for remote engineering roles, internships &amp; contract builds
              </p>

              <form
                className="newsletter-joined-field"
                onSubmit={handleEmailSubmit}
                aria-label="Send direct email to ryan@nylo.me"
              >
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Share your email or a quick note"
                  aria-label="Share your email or a quick note"
                  className="type-caption newsletter-input"
                />
                <button
                  type="submit"
                  className="type-caption newsletter-submit-btn"
                >
                  Send Note
                </button>
              </form>

              <div className="footer-pledge-strip">
                <a
                  href="/Ryan-Akmal-Pasya-CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="carbon-box"
                >
                  <OrganicSeedBlob variant={1} size={10} color="#ffff48" />
                  <span>Download Resume (PDF) ↗</span>
                </a>
              </div>
            </div>

            {/* Cols 5-6: CONTACT */}
            <div className="footer-col-contact">
              <h2 className="type-footer-label">Contact</h2>
              <ul className="footer-link-list">
                <li>
                  <a href="mailto:ryan@nylo.me" className="footer-link">
                    ryan@nylo.me
                  </a>
                </li>
                <li>
                  <span className="footer-link">
                    Aceh, Indonesia (UTC+7)
                  </span>
                </li>
                <li>
                  <span className="footer-link">
                    Indonesian &amp; English
                  </span>
                </li>
              </ul>
            </div>

            {/* Cols 7-8: PROFILES */}
            <div className="footer-col-profiles">
              <h2 className="type-footer-label">Profiles</h2>
              <ul className="footer-link-list">
                <li>
                  <a
                    href="https://github.com/ryanakml"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    GitHub (github.com/ryanakml)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/ryanakmalpasya"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    LinkedIn (in/ryanakmalpasya)
                  </a>
                </li>
                <li>
                  <a
                    href="https://nylo.me"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    Portfolio (nylo.me)
                  </a>
                </li>
                <li>
                  <a
                    href="https://ryanakmall.is-a.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    Mirror (ryanakmall.is-a.dev)
                  </a>
                </li>
              </ul>
            </div>

            {/* Cols 9-10: REPOSITORIES */}
            <div className="footer-col-repos">
              <h2 className="type-footer-label">Repositories</h2>
              <ul className="footer-link-list">
                <li>
                  <a
                    href="https://github.com/ryanakml/flowdesk-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    flowdesk-ai
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ryanakml/Deadbolt"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    Deadbolt
                  </a>
                </li>
                <li>
                  <a
                    href="https://wabrix.nylo.me"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    wabrix
                  </a>
                </li>
              </ul>
            </div>

            {/* Cols 11-12: CREDENTIALS */}
            <div className="footer-col-credentials">
              <h2 className="type-footer-label">Credentials</h2>
              <ul className="footer-link-list">
                <li>
                  <a
                    href="https://www.linkedin.com/in/ryanakmalpasya"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    IBM Full Stack Developer
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/ryanakmalpasya"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    IBM Data Science
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/ryanakmalpasya"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    Google Advanced Data Analytics
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Bottom Edge-to-Edge #f7f6e3 Monumental Wordmark: ryanakml */}
          <motion.div
            className="footer-wordmark-stage"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: EASE_MORPH }}
          >
            <MonumentalWordmark />
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
