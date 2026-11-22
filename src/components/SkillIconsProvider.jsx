import React, { createContext, useContext, useState } from 'react';
import TypescriptIcon from '@thesvg/react/typescript';
import ReactIcon from '@thesvg/react/react';
import NextdotjsIcon from '@thesvg/react/nextdotjs';
import NodedotjsIcon from '@thesvg/react/nodedotjs';
import PostgresqlIcon from '@thesvg/react/postgresql';
import GoIcon from '@thesvg/react/go';
import RedisIcon from '@thesvg/react/redis';
import NatsdotioIcon from '@thesvg/react/natsdotio';
import ConvexIcon from '@thesvg/react/convex';
import CloudflareWorkersIcon from '@thesvg/react/cloudflare-workers';
import DockerIcon from '@thesvg/react/docker';
import OpentelemetryIcon from '@thesvg/react/opentelemetry';
import SqliteIcon from '@thesvg/react/sqlite';
import HonoIcon from '@thesvg/react/hono';
import ExpressIcon from '@thesvg/react/express';
import PythonIcon from '@thesvg/react/python';

/**
 * Centralized registry mapping every portfolio skill to its official
 * @thesvg/react vector component.
 */
export const SKILL_ICON_REGISTRY = {
  TypeScript: TypescriptIcon,
  React: ReactIcon,
  'Next.js': NextdotjsIcon,
  'Node.js': NodedotjsIcon,
  PostgreSQL: PostgresqlIcon,
  Go: GoIcon,
  Redis: RedisIcon,
  'NATS JetStream': NatsdotioIcon,
  Convex: ConvexIcon,
  'Cloudflare Workers': CloudflareWorkersIcon,
  Docker: DockerIcon,
  OpenTelemetry: OpentelemetryIcon,
  SQLite: SqliteIcon,
  Hono: HonoIcon,
  Express: ExpressIcon,
  Python: PythonIcon,
};

export const PORTFOLIO_SKILLS_LIST = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Go',
  'Redis',
  'NATS JetStream',
  'Convex',
  'Cloudflare Workers',
  'Docker',
  'OpenTelemetry',
  'SQLite',
  'Hono',
  'Express',
  'Python',
];

const SkillIconsContext = createContext({
  variant: 'mono',
  size: 20,
  color: '#262d29',
  hoverColorReveal: true,
  registry: SKILL_ICON_REGISTRY,
});

/**
 * SkillIconsProvider wraps the application (or skills showcase section)
 * so every skill icon renders with uniform sizing, monochrome #262d29 ink,
 * and consistent SVG attributes from @thesvg/react.
 */
export function SkillIconsProvider({
  variant = 'mono',
  size = 20,
  color = '#262d29',
  hoverColorReveal = true,
  children,
}) {
  return (
    <SkillIconsContext.Provider
      value={{
        variant,
        size,
        color,
        hoverColorReveal,
        registry: SKILL_ICON_REGISTRY,
      }}
    >
      {children}
    </SkillIconsContext.Provider>
  );
}

export function useSkillIcons() {
  return useContext(SkillIconsContext);
}

/**
 * Renders a single real brand SVG logo from @thesvg/react using the
 * shared SkillIconsProvider configuration.
 */
export function SkillLogo({ name, size: customSize, variant: customVariant }) {
  const { variant, size, color, registry } = useSkillIcons();
  const IconComponent = registry[name];

  if (!IconComponent) return null;

  const finalSize = customSize || size;
  const finalVariant = customVariant || variant;

  return (
    <IconComponent
      variant={finalVariant}
      width={finalSize}
      height={finalSize}
      style={{
        color,
        flexShrink: 0,
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Marquee item combining the official @thesvg/react icon and label.
 * Defaults to monochrome #262d29 ink to match the Airtree editorial system,
 * and subtly reveals the official brand color variant on hover when enabled.
 */
export function SkillMarqueeBadge({ name }) {
  const { variant, hoverColorReveal } = useSkillIcons();
  const [hovered, setHovered] = useState(false);

  const activeVariant =
    hoverColorReveal && hovered ? 'default' : variant;

  return (
    <div
      className="partner-monochrome-mark"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SkillLogo name={name} variant={activeVariant} />
      <span>{name}</span>
    </div>
  );
}
