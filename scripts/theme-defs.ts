export type ThemeArchetype =
  | "blog-minimal"
  | "blog-hero"
  | "blog-magazine"
  | "blog-tech"
  | "docs-sidebar"
  | "docs-modern"
  | "landing"
  | "portfolio";

export type ThemeTier = "inspired" | "faithful";

export interface ThemeDef {
  slug: string;
  /** Marketplace / UI display name */
  name: string;
  tier: ThemeTier;
  description: string;
  /** Upstream project this theme references (inspired-by or port source) */
  upstream: string;
  upstreamUrl: string;
  upstreamLicense: string;
  tags: string[];
  archetype: ThemeArchetype;
  cssVars: Record<string, string>;
}

/**
 * Planned best-effort ports that reuse the upstream-facing slug and display as
 * "{Upstream} for Dune". Do not scaffold these until fidelity work begins.
 */
export const FAITHFUL_PORT_PLANS = [
  {
    slug: "papermod",
    name: "PaperMod for Dune",
    upstream: "hugo-PaperMod",
    upstreamUrl: "https://github.com/adityatelange/hugo-PaperMod",
    upstreamLicense: "MIT",
    useCase: "Near-identical PaperMod blog experience on Dune",
  },
  {
    slug: "book",
    name: "Hugo Book for Dune",
    upstream: "hugo-book",
    upstreamUrl: "https://github.com/alex-shpak/hugo-book",
    upstreamLicense: "MIT",
    useCase: "Sidebar docs theme matching hugo-book layout and UX",
  },
  {
    slug: "starlight",
    name: "Starlight for Dune",
    upstream: "Starlight",
    upstreamUrl: "https://github.com/withastro/starlight",
    upstreamLicense: "MIT",
    useCase: "Astro Starlight-style documentation site",
  },
  {
    slug: "blox",
    name: "Hugo Blox for Dune",
    upstream: "Hugo Blox",
    upstreamUrl: "https://github.com/HugoBlox/hugo-blox-builder",
    upstreamLicense: "MIT",
    useCase: "Academic / portfolio sites (Hugo Blox Builder)",
  },
] as const;

/** Dune-native themes — inspired by upstream work, not claiming to be ports. */
export const THEME_DEFS: ThemeDef[] = [];

/** Old upstream-misleading slugs removed when renaming to inspired names. */
export const RETIRED_PACKAGE_SLUGS = [
  "paper",
  "paperish",
  "memo",
  "shelf",
  "margin",
  "writer",
  "astrowind",
  "bloom",
  "liebling",
  "pinion",
  "orbit",
  "chirpy",
  "astrofy",
  "casper",
  "hextra",
  "just-docs",
];
