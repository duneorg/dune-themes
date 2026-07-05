/**
 * Canonical catalog of free HTML5 UP templates (CC BY 3.0).
 * Source: https://html5up.net — 44 templates as of 2026-07.
 */

import type { ThemeArchetype, ThemeDef } from "./theme-defs.ts";

export const HTML5UP_LICENSE = "CC BY 3.0";
export const HTML5UP_ATTRIBUTION_URL = "https://html5up.net/license";

export interface Html5UpTemplate {
  slug: string;
  name: string;
  archetype: ThemeArchetype;
  /** Short use-case hint for descriptions */
  useCase: string;
}

/** All free HTML5 UP templates — slug matches html5up.net path. */
export const HTML5UP_TEMPLATES: Html5UpTemplate[] = [
  { slug: "aerial", name: "Aerial", archetype: "landing", useCase: "Fullscreen landing" },
  { slug: "alpha", name: "Alpha", archetype: "landing", useCase: "Business landing" },
  { slug: "arcana", name: "Arcana", archetype: "landing", useCase: "Corporate site" },
  { slug: "astral", name: "Astral", archetype: "portfolio", useCase: "Portfolio grid" },
  { slug: "big-picture", name: "Big Picture", archetype: "landing", useCase: "Scroll-driven gallery" },
  { slug: "dimension", name: "Dimension", archetype: "landing", useCase: "Modal panel navigation" },
  { slug: "directive", name: "Directive", archetype: "landing", useCase: "Simple landing" },
  { slug: "dopetrope", name: "Dopetrope", archetype: "blog-magazine", useCase: "Magazine blog" },
  { slug: "editorial", name: "Editorial", archetype: "blog-magazine", useCase: "Editorial magazine" },
  { slug: "escape-velocity", name: "Escape Velocity", archetype: "landing", useCase: "Marketing site" },
  { slug: "ethereal", name: "Ethereal", archetype: "landing", useCase: "Elegant landing" },
  { slug: "eventually", name: "Eventually", archetype: "landing", useCase: "Coming soon" },
  { slug: "forty", name: "Forty", archetype: "landing", useCase: "Multipurpose landing" },
  { slug: "fractal", name: "Fractal", archetype: "portfolio", useCase: "Portfolio showcase" },
  { slug: "future-imperfect", name: "Future Imperfect", archetype: "blog-magazine", useCase: "Blog with sidebar" },
  { slug: "halcyonic", name: "Halcyonic", archetype: "landing", useCase: "Business layout" },
  { slug: "helios", name: "Helios", archetype: "landing", useCase: "Multipurpose site" },
  { slug: "highlights", name: "Highlights", archetype: "landing", useCase: "Photo landing" },
  { slug: "hyperspace", name: "Hyperspace", archetype: "landing", useCase: "Sidebar landing" },
  { slug: "landed", name: "Landed", archetype: "landing", useCase: "Product landing" },
  { slug: "lens", name: "Lens", archetype: "portfolio", useCase: "Fullscreen gallery" },
  { slug: "massively", name: "Massively", archetype: "blog-hero", useCase: "Hero blog" },
  { slug: "minimaxing", name: "Minimaxing", archetype: "landing", useCase: "Compact landing" },
  { slug: "miniport", name: "Miniport", archetype: "portfolio", useCase: "Minimal portfolio" },
  { slug: "multiverse", name: "Multiverse", archetype: "landing", useCase: "Multipurpose landing" },
  { slug: "paradigm-shift", name: "Paradigm Shift", archetype: "landing", useCase: "Split layout landing" },
  { slug: "parallelism", name: "Parallelism", archetype: "portfolio", useCase: "Portfolio grid" },
  { slug: "phantom", name: "Phantom", archetype: "blog-minimal", useCase: "Minimal blog" },
  { slug: "photon", name: "Photon", archetype: "portfolio", useCase: "Single-page portfolio" },
  { slug: "prologue", name: "Prologue", archetype: "landing", useCase: "Intro landing" },
  { slug: "read-only", name: "Read Only", archetype: "blog-minimal", useCase: "Read-only blog" },
  { slug: "solid-state", name: "Solid State", archetype: "landing", useCase: "Business landing" },
  { slug: "spectral", name: "Spectral", archetype: "landing", useCase: "Event landing" },
  { slug: "stellar", name: "Stellar", archetype: "landing", useCase: "Multipurpose landing" },
  { slug: "story", name: "Story", archetype: "landing", useCase: "Scroll narrative" },
  { slug: "strata", name: "Strata", archetype: "portfolio", useCase: "Portfolio + contact" },
  { slug: "striped", name: "Striped", archetype: "blog-minimal", useCase: "Sidebar blog" },
  { slug: "strongly-typed", name: "Strongly Typed", archetype: "blog-minimal", useCase: "Typography blog" },
  { slug: "telephasic", name: "Telephasic", archetype: "landing", useCase: "Business site" },
  { slug: "tessellate", name: "Tessellate", archetype: "landing", useCase: "Grid landing" },
  { slug: "twenty", name: "Twenty", archetype: "landing", useCase: "Multipurpose landing" },
  { slug: "txt", name: "TXT", archetype: "portfolio", useCase: "Text-forward portfolio" },
  { slug: "verti", name: "Verti", archetype: "landing", useCase: "Business landing" },
  { slug: "zerofour", name: "Zerofour", archetype: "landing", useCase: "404 / minimal page" },
];

const DEFAULT_CSS_VARS: Record<string, string> = {
  "--font": "system-ui, -apple-system, sans-serif",
  "--text": "#3a3a3a",
  "--muted": "#777",
  "--bg": "#ffffff",
  "--bg-alt": "#f4f4f4",
  "--border": "#ddd",
  "--accent": "#e89980",
  "--max-width": "960px",
};

/** Per-template accent overrides (refined during graduation). */
const ACCENT_OVERRIDES: Partial<Record<string, string>> = {
  striped: "#e89980",
  dimension: "#ffffff",
  massively: "#2e3842",
  hyperspace: "#5b6ba4",
  editorial: "#f2849e",
  phantom: "#5385c1",
};

export function html5UpThemeDef(t: Html5UpTemplate): ThemeDef {
  const accent = ACCENT_OVERRIDES[t.slug] ?? DEFAULT_CSS_VARS["--accent"];
  return {
    slug: t.slug,
    name: t.name,
    tier: "html5up",
    family: "html5up",
    description:
      `${t.name} — responsive site theme adapted from HTML5 UP for Dune. ${t.useCase}.`,
    upstream: `HTML5 UP ${t.name}`,
    upstreamUrl: `https://html5up.net/${t.slug}`,
    upstreamLicense: HTML5UP_LICENSE,
    tags: ["html5up", t.archetype.split("-")[0], "responsive"],
    archetype: t.archetype,
    cssVars: { ...DEFAULT_CSS_VARS, "--accent": accent },
  };
}

/** Hand-finished ports — graduate script skips these. */
export const HAND_MAINTAINED_HTML5UP_SLUGS = new Set<string>(["striped"]);

/** All HTML5 UP slugs — scaffold must not overwrite graduated packages. */
export const GRADUATED_HTML5UP_SLUGS = new Set<string>(HTML5UP_TEMPLATES.map((t) => t.slug));

export const HTML5UP_THEME_DEFS: ThemeDef[] = [];
