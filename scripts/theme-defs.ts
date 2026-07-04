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
export const THEME_DEFS: ThemeDef[] = [
  {
    slug: "ink",
    name: "Ink",
    tier: "inspired",
    description: "Long-form writing theme inspired by Ghost Attila — Dune-native, not a port.",
    upstream: "Attila",
    upstreamUrl: "https://github.com/zutrinken/attila",
    upstreamLicense: "MIT",
    tags: ["blog", "writing", "serif", "inspired"],
    archetype: "blog-minimal",
    cssVars: {
      "--bg": "#faf9f7",
      "--bg-alt": "#f0eeeb",
      "--text": "#2c2c2c",
      "--muted": "#888888",
      "--accent": "#c0392b",
      "--border": "#e0ddd8",
      "--font": "'Libre Baskerville', Georgia, serif",
      "--font-serif": "'Libre Baskerville', Georgia, serif",
      "--max-width": "680px",
    },
  },
  {
    slug: "gale",
    name: "Gale",
    tier: "inspired",
    description: "Landing and blog theme inspired by AstroWind — Dune-native, not a port.",
    upstream: "AstroWind",
    upstreamUrl: "https://github.com/onwidget/astrowind",
    upstreamLicense: "MIT",
    tags: ["landing", "business", "inspired"],
    archetype: "landing",
    cssVars: {
      "--bg": "#ffffff",
      "--bg-alt": "#f8fafc",
      "--text": "#0f172a",
      "--muted": "#64748b",
      "--accent": "#6366f1",
      "--accent-2": "#8b5cf6",
      "--border": "#e2e8f0",
      "--font": "Inter, system-ui, sans-serif",
    },
  },
  {
    slug: "salon",
    name: "Salon",
    tier: "inspired",
    description: "Magazine-style blog inspired by Ghost Liebling — Dune-native, not a port.",
    upstream: "Liebling",
    upstreamUrl: "https://github.com/eddiesigner/liebling",
    upstreamLicense: "MIT",
    tags: ["blog", "magazine", "inspired"],
    archetype: "blog-magazine",
    cssVars: {
      "--bg": "#ffffff",
      "--bg-alt": "#fafafa",
      "--text": "#151515",
      "--muted": "#757575",
      "--accent": "#ff5722",
      "--border": "#eeeeee",
      "--font": "'Helvetica Neue', Arial, sans-serif",
    },
  },
  {
    slug: "syntax",
    name: "Syntax",
    tier: "inspired",
    description: "Technical blog theme inspired by Jekyll Chirpy — Dune-native, not a port.",
    upstream: "jekyll-theme-chirpy",
    upstreamUrl: "https://github.com/cotes2020/jekyll-theme-chirpy",
    upstreamLicense: "MIT",
    tags: ["blog", "tech", "inspired"],
    archetype: "blog-tech",
    cssVars: {
      "--bg": "#fefefe",
      "--bg-alt": "#f6f8fa",
      "--text": "#24292f",
      "--muted": "#656d76",
      "--accent": "#0969da",
      "--border": "#d0d7de",
      "--font": "system-ui, sans-serif",
      "--font-mono": "ui-monospace, 'Cascadia Code', monospace",
      "--max-width": "760px",
    },
  },
  {
    slug: "herald",
    name: "Herald",
    tier: "inspired",
    description: "Publication-style blog inspired by Ghost Casper — Dune-native, not a port.",
    upstream: "Casper",
    upstreamUrl: "https://github.com/TryGhost/Casper",
    upstreamLicense: "MIT",
    tags: ["blog", "publication", "inspired"],
    archetype: "blog-hero",
    cssVars: {
      "--bg": "#ffffff",
      "--bg-alt": "#f4f4f4",
      "--text": "#15171a",
      "--muted": "#738a94",
      "--accent": "#3eb0ef",
      "--border": "#e1e1e1",
      "--font": "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "--header-bg": "#15171a",
    },
  },
  {
    slug: "lucid",
    name: "Lucid",
    tier: "inspired",
    description: "Modern docs theme inspired by Hugo Hextra — Dune-native, not a port.",
    upstream: "Hextra",
    upstreamUrl: "https://github.com/imfing/hextra",
    upstreamLicense: "MIT",
    tags: ["docs", "modern", "inspired"],
    archetype: "docs-modern",
    cssVars: {
      "--bg": "#ffffff",
      "--bg-alt": "#f9fafb",
      "--sidebar-bg": "#fafafa",
      "--text": "#111827",
      "--muted": "#6b7280",
      "--accent": "#7c3aed",
      "--border": "#e5e7eb",
      "--font": "Inter, system-ui, sans-serif",
      "--sidebar-width": "260px",
    },
  },
  {
    slug: "manual",
    name: "Manual",
    tier: "inspired",
    description: "Product documentation theme inspired by Just the Docs — Dune-native, not a port.",
    upstream: "Just the Docs",
    upstreamUrl: "https://github.com/just-the-docs/just-the-docs",
    upstreamLicense: "MIT",
    tags: ["docs", "product", "inspired"],
    archetype: "docs-sidebar",
    cssVars: {
      "--bg": "#ffffff",
      "--bg-alt": "#f5f5f5",
      "--sidebar-bg": "#f8f9fa",
      "--text": "#272727",
      "--muted": "#606060",
      "--accent": "#7253ed",
      "--border": "#dee2e6",
      "--font": "system-ui, -apple-system, sans-serif",
      "--sidebar-width": "264px",
    },
  },
];

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
