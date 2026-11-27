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
import { MERGED_PR_COUNT, UPSTREAM_PROJECT_COUNT } from './contributions';
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
    id: 'wabrix',
    alt: 'Wabrix edge webhook ingress on Cloudflare Workers and Hono with Convex state',
    caption:
      'Wabrix · Edge webhook ingress on Cloudflare Workers and Hono with Convex real-time state & AI handoff',
    repoLabel: 'wabrix.nylo.me ↗',
    repoHref: 'https://wabrix.nylo.me',
    accent: 'green',
  },
  {
    id: 'flowdesk',
    alt: 'FlowDesk transactional outbox architecture and webhook replay runner',
    caption:
      'FlowDesk · Multi-tenant WhatsApp inbox with PostgreSQL transactional outbox & replay tests',
    repoLabel: 'flowdesk-ai ↗',
    repoHref: 'https://github.com/ryanakml/flowdesk-ai',
    accent: 'yellow',
  },
  {
    id: 'deadbolt',
    alt: 'Deadbolt collaborative Go workflow engine lease fencing and recovery check',
    caption:
      'Deadbolt · Collaborative Go workflow engine with distributed worker leases, fencing tokens & failure recovery',
    repoLabel: 'Deadbolt ↗',
    repoHref: 'https://github.com/ryanakml/deadbolt',
    accent: 'orange',
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
    value: MERGED_PR_COUNT,
    suffix: '',
    label: `Merged pull requests across ${UPSTREAM_PROJECT_COUNT} upstream projects`,
  },
  {
    value: 3,
    suffix: '',
    label: 'Applications and workflow systems featured here',
  },
  {
    value: 3,
    suffix: '',
    label: 'Professional full-stack and data certifications',
  },
];

/* ==========================================================================
   7. Technical Convictions & Engineering Takes (No AI slop, no cringe quotes)
   ========================================================================== */
const PHILOSOPHY_QUOTES = [
  {
    id: 'conviction-1',
    quote:
      '“A pretty loading spinner is just an apology for an unoptimized backend. If your query takes 1.8 seconds to return 20 rows, no amount of micro-interactions can rescue the UX.”',
    attribution: 'CONVICTION 01 · LATENCY & DATA FLOW',
    tag: 'Latency First',
  },
  {
    id: 'conviction-2',
    quote:
      '“AI can vomit 500 lines of boilerplate in 3 seconds. It can’t tell you why line 43 will deadlock PostgreSQL under 500 concurrent webhook workers. System architecture still requires human paranoia.”',
    attribution: 'CONVICTION 02 · AI & CONCURRENCY',
    tag: 'Human Paranoia',
  },
  {
    id: 'conviction-3',
    quote:
      '“If a background worker can’t survive getting SIGKILLed mid-transaction and replayed safely from an atomic outbox, it’s not fault-tolerant—it was just lucky.”',
    attribution: 'CONVICTION 03 · DISTRIBUTED INVARIANTS',
    tag: 'Worker Leases',
  },
  {
    id: 'conviction-4',
    quote:
      '“ORMs are delightful until a 3-line abstraction generates 47 hidden roundtrips. When throughput and money are on the line, explicit SQL boundaries beat magic every single time.”',
    attribution: 'CONVICTION 04 · SCHEMA INTEGRITY',
    tag: 'Explicit SQL',
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

/**
 * Isolated GPU-accelerated Scroll & Spore Bloom Seed Layer.
 * - During Stage 4: Spores burst outwards from screen center (vw * 0.5, vh * 0.5)
 *   purely using hardware composite transforms (translate3d + scale).
 * - On scroll: Computes dock trajectory on RAF and updates only seed transforms,
 *   COMPLETELY bypassing full-page App re-renders.
 */
function ScrollSeedLayer({
  isBurstStarted,
  introRunId,
  vw,
  vh,
  emblemTargetRef,
  onBranchProgress,
}) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = null;
    let lastBranchP = -1;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;
        let emblemDocY = vh * 1.65;
        if (emblemTargetRef.current) {
          const rect = emblemTargetRef.current.getBoundingClientRect();
          emblemDocY = rect.top + window.scrollY + rect.height / 2;
        }
        const dockScrollY = Math.max(360, emblemDocY - vh * 0.53);
        const progress = Math.max(0, Math.min(1, scrollY / dockScrollY));
        setScrollProgress(progress);

        if (onBranchProgress) {
          const branchP =
            progress < 0.48 ? 0 : Math.min(1, (progress - 0.48) / 0.46);
          if (
            Math.abs(branchP - lastBranchP) > 0.008 ||
            branchP === 1 ||
            branchP === 0
          ) {
            lastBranchP = branchP;
            onBranchProgress(branchP);
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [vh, emblemTargetRef, onBranchProgress]);

  let emblemDocX = vw / 2;
  let emblemDocY = vh * 1.65;
  if (emblemTargetRef.current) {
    const rect = emblemTargetRef.current.getBoundingClientRect();
    emblemDocX = rect.left + window.scrollX + rect.width / 2;
    emblemDocY = rect.top + window.scrollY + rect.height / 2;
  }

  const centerX = vw * 0.5;
  const centerY = vh * 0.5;

  return (
    <div className="scroll-seeds-document-layer" aria-hidden="true">
      {HERO_SEEDS.map((seed, idx) => {
        const tip = EMBLEM_TIP_OFFSETS[idx];
        const heroDocX = seed.heroX * vw;
        const heroDocY = seed.heroY * vh;
        const targetDocX = emblemDocX + tip.dx;
        const targetDocY = emblemDocY + tip.dy;

        const staggeredP = Math.max(
          0,
          Math.min(1, Math.pow(scrollProgress, 0.92 + (idx % 3) * 0.08))
        );
        const easeX = easeInOutCubic(staggeredP);
        const easeY = easeInOutQuad(staggeredP);

        const currentDocX = heroDocX + (targetDocX - heroDocX) * easeX;
        const currentDocY = heroDocY + (targetDocY - heroDocY) * easeY;
        const currentSize = seed.size + (tip.size - seed.size) * easeX;

        return (
          <motion.div
            key={`seed-${seed.id}-${introRunId}`}
            className="scroll-seed-item"
            initial={{
              x: centerX - 50,
              y: centerY - 50,
              scale: 0.44,
              opacity: 0,
            }}
            animate={
              isBurstStarted
                ? {
                    x: currentDocX - 50,
                    y: currentDocY - 50,
                    scale: currentSize / 100,
                    opacity: 1,
                  }
                : {
                    x: centerX - 50,
                    y: centerY - 50,
                    scale: 0.44,
                    opacity: 0,
                  }
            }
            transition={
              scrollProgress > 0.01
                ? { duration: 0.05, ease: 'linear' }
                : {
                    duration: 0.85,
                    delay: idx * 0.02,
                    ease: EASE_MORPH,
                    opacity: { duration: 0.2 },
                  }
            }
          >
            <div
              className={
                scrollProgress < 0.85 ? `seed-drift-${seed.id}` : ''
              }
              style={{ width: '100%', height: '100%' }}
            >
              <OrganicSeedBlob variant={seed.variant} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Reusable hook enabling natural mouse drag-to-scroll on desktop
 * while preserving touch momentum and horizontal trackpad swipe.
 */
function useDragToScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e) => {
      if (e.button !== 0 || e.target.closest('a, button')) return;
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.35;
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      isDown = false;
    };

    const onMouseLeave = () => {
      isDown = false;
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return ref;
}

/* ==========================================================================
   Main Application Component
   ========================================================================== */

export default function App() {
  /* ------------------------------------------------------------------------
     1. Video-Exact 4-Stage Intro Preloader State Machine (0ms - 3500ms)
     Streamlined & buttery smooth: eliminates dead air and mounting spikes
     ------------------------------------------------------------------------ */
  const [introStage, setIntroStage] = useState(1);
  const [introRunId, setIntroRunId] = useState(0);

  useEffect(() => {
    setIntroStage(1);
    const t2 = setTimeout(() => setIntroStage(2), 650);
    const t3 = setTimeout(() => setIntroStage(3), 1350);
    const t4 = setTimeout(() => setIntroStage(4), 2150);
    const t5 = setTimeout(() => setIntroStage(5), 3500);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
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
     2. Layout Dimensions & Emblem Target (Resize only - NO scroll re-renders)
     ------------------------------------------------------------------------ */
  const emblemTargetRef = useRef(null);
  const [viewportSize, setViewportSize] = useState(() => ({
    vw: typeof window !== 'undefined' ? window.innerWidth : 1440,
    vh: typeof window !== 'undefined' ? window.innerHeight : 900,
  }));
  const [branchDrawProgress, setBranchDrawProgress] = useState(0);

  useEffect(() => {
    let rafId = null;
    const onResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setViewportSize({
          vw: window.innerWidth,
          vh: window.innerHeight,
        });
      });
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  /* ------------------------------------------------------------------------
     3. Engineering Build Rail & Selected Systems Drag-to-Scroll Refs
     ------------------------------------------------------------------------ */
  const [activeRailIndex, setActiveRailIndex] = useState(0);
  const heroRailRef = useDragToScroll();
  const systemsRailRef = useDragToScroll();

  const handlePrevRail = () => {
    if (heroRailRef.current) {
      const card = heroRailRef.current.querySelector('.photo-rail-card');
      const step = card ? card.clientWidth + 9.4 : 696;
      heroRailRef.current.scrollBy({ left: -step, behavior: 'smooth' });
    }
  };

  const handleNextRail = () => {
    if (heroRailRef.current) {
      const card = heroRailRef.current.querySelector('.photo-rail-card');
      const step = card ? card.clientWidth + 9.4 : 696;
      heroRailRef.current.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  /* ------------------------------------------------------------------------
     4. Isolated Engineering Philosophy Quotation Carousel State
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
     5. Direct Email / Message Field in Monumental Footer
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
  const isClusterVisible = introStage >= 3;
  const activeQuote = PHILOSOPHY_QUOTES[quoteState.index];


  return (
    <div className="page-canvas">
      {/* ====================================================================
          SEQUENCE 1: Video-Exact Intro Organic Blob & Diagonal Word Drift
          ("Big things" [orange circle] "Start small")
          ==================================================================== */}
      <AnimatePresence>
        {introStage < 4 && (
          <motion.div
            key={`blob-morph-${introRunId}`}
            className="intro-overlay-layer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.15 } }}
          >
            <motion.div
              className="intro-central-blob"
              initial={{ scale: 24, rotate: 0 }}
              animate={
                introStage === 1
                  ? { scale: 24, rotate: 0 }
                  : introStage === 2
                  ? { scale: 1.14, rotate: -18 }
                  : introStage === 3
                  ? { scale: 0.44, rotate: -28 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: introStage === 3 ? 0.65 : 0.72,
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
                      x: -viewportSize.vw * 0.27,
                      y: -viewportSize.vh * 0.3,
                    }
              }
              exit={{ opacity: 0 }}
              transition={
                introStage < 4
                  ? { duration: 0.42, ease: EASE_MORPH }
                  : {
                      duration: 1.1,
                      ease: EASE_MORPH,
                      opacity: { duration: 1.1, times: [0, 0.45, 1] },
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
                      x: viewportSize.vw * 0.27,
                      y: -viewportSize.vh * 0.3,
                    }
              }
              exit={{ opacity: 0 }}
              transition={
                introStage < 4
                  ? { duration: 0.45, delay: 0.18, ease: EASE_MORPH }
                  : {
                      duration: 1.1,
                      ease: EASE_MORPH,
                      opacity: { duration: 1.1, times: [0, 0.45, 1] },
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
          Pre-rendered at center during stage 3, explodes outward in stage 4,
          and converges downward into the branch tips on scroll.
          ==================================================================== */}
      {isClusterVisible && (
        <ScrollSeedLayer
          isBurstStarted={isBurstStarted}
          introRunId={introRunId}
          vw={viewportSize.vw}
          vh={viewportSize.vh}
          emblemTargetRef={emblemTargetRef}
          onBranchProgress={setBranchDrawProgress}
        />
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
            ref={heroRailRef}
            aria-label="Engineering architecture and build rail"
            initial={{ opacity: 0, y: 130 }}
            animate={
              isBurstStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 130 }
            }
            transition={{ duration: 0.88, delay: 0.12, ease: EASE_MORPH }}
          >
            <div className="photo-rail-track">
              {BUILD_RAIL_ITEMS.map((item, idx) => (
                <article
                  key={item.id}
                  className="photo-rail-card"
                  aria-current={idx === activeRailIndex ? 'true' : undefined}
                  onClick={(e) => {
                    if (e.target.closest('a')) return;
                    setActiveRailIndex(idx);
                    if (heroRailRef.current) {
                      const cards =
                        heroRailRef.current.querySelectorAll('.photo-rail-card');
                      if (cards[idx]) {
                        cards[idx].scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                          inline: 'center',
                        });
                      }
                    }
                  }}
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
                showDockedBerries={introStage === 5 && branchDrawProgress >= 0.95}
              />
            </div>
          </div>

          {/* ================================================================
              5. Ruled Section Intro & Three Unboxed 131px Serif Count-Up Numerals
              (upstream PRs, featured systems, and certifications)
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
              6A. Chapter 1: "Selected Systems" (2-at-a-time horizontal snap)
              - Card 1: Wabrix (Managed Edge & AI Handoff)
              - Card 2: FlowDesk (Systems & Outbox)
              - Card 3: Deadbolt (Go & Distributed State)
              ================================================================ */}
          <section
            id="systems"
            className="main-container chapter-section"
            aria-label="Selected Systems"
          >
            <RuledSectionIntro
              variant="heading"
              title="Selected Systems"
              support="Full-stack web applications, distributed workflow systems, and edge ingress platforms."
              linkLabel="All repositories ↗"
              linkHref="https://github.com/ryanakml"
              external={true}
            />

            <div
              className="paired-cards-wrapper"
              ref={systemsRailRef}
            >
              <div className="peeking-three-rail">
                {/* Card 1: Wabrix */}
                <motion.article
                  className="editorial-media-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.55, delay: 0, ease: EASE_MORPH }}
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
                        WhatsApp support app with Next.js, Convex, and Clerk. Cloudflare
                        Workers and Hono handle incoming webhooks. Operators can take over
                        conversations from the knowledge-grounded bot.
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
                      >
                        wabrix.nylo.me ↗
                      </a>
                    </div>
                  </div>
                </motion.article>

                {/* Card 2: FlowDesk */}
                <motion.article
                  className="editorial-media-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.55, delay: 0.09, ease: EASE_MORPH }}
                >
                  <div className="card-media-backdrop card-media-backdrop--fragment">
                    <TechnicalGridBackdrop accent="yellow" opacity={0.4} />
                    <FlowDeskChatFragment />
                  </div>
                  <div className="photo-shade-scrim" />

                  <div className="card-content-stack">
                    <div className="card-text-group">
                      <h3 className="type-card-heading">FlowDesk</h3>
                      <p className="type-body card-description">
                        Shared WhatsApp inbox with a React frontend and Express APIs.
                        PostgreSQL row-level security isolates tenants, and a transactional
                        outbox drives webhook retries. Integration tests cover repeated
                        delivery, and pgvector supplies context for AI drafts.
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

                {/* Card 3: Deadbolt */}
                <motion.article
                  className="editorial-media-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.55, delay: 0.18, ease: EASE_MORPH }}
                >
                  <div className="card-media-backdrop card-media-backdrop--fragment">
                    <TechnicalGridBackdrop accent="orange" opacity={0.4} />
                    <DeadboltFencingDiagram />
                  </div>
                  <div className="photo-shade-scrim" />

                  <div className="card-content-stack">
                    <div className="card-text-group">
                      <h3 className="type-card-heading">Deadbolt</h3>
                      <p className="type-body card-description">
                        Collaborative Go workflow engine in its final release phase. It
                        pairs PostgreSQL state with NATS JetStream and uses worker
                        leases and fencing tokens to recover runs after worker loss.
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
                        href="https://github.com/ryanakml/deadbolt"
                        target="_blank"
                        rel="noreferrer"
                        className="type-caption card-outline-tag"
                      >
                        Go &amp; Distributed Systems
                      </a>
                    </div>
                  </div>
                </motion.article>
              </div>
            </div>
          </section>

          {/* ================================================================
              6B. Chapter 2: "Open Source & Engineering Practice" (687x790px)
              - Card 1: Merged upstream contributions
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
              {/* Card 1: Merged upstream contributions */}
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
                      {MERGED_PR_COUNT} Merged Upstream Contributions
                    </h3>
                    <p className="type-body card-description">
                      Across {UPSTREAM_PROJECT_COUNT} projects, I fixed function-valued
                      tool approvals in Mastra (#15346), path expansion in Celery
                      (#10739), and chat loading and routing in OpenHands (#12223).
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
                  aria-label="Previous technical conviction"
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  type="button"
                  onClick={handleNextQuote}
                  className="arrow-square"
                  aria-label="Next technical conviction"
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
                    href="https://ryanakmall.is-a.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    Portfolio
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
                    href="https://github.com/ryanakml/deadbolt"
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
