/**
 * Curated color presets for the `color_scheme` config option — same set as
 * sirocco/caravan/ink/gale/salon/syntax/herald (stable ids; labels name the hues). Lucid maps
 * surfaces onto `--accent` / `--bg` / `--bg-alt` / `--code-bg` / `--sidebar-bg`.
 */
export interface ColorSchemeVariant {
  accent: string;
  cardBackground: string;
}

export interface ColorScheme {
  label: string;
  light: ColorSchemeVariant;
  dark: ColorSchemeVariant;
}

export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  blue: {
    label: "Cobalt",
    light: { accent: "#1d4ed8", cardBackground: "#d3dae9" },
    dark: { accent: "#60a5fa", cardBackground: "#1b2336" },
  },
  slate: {
    label: "Slate",
    light: { accent: "#587a9b", cardBackground: "#dedede" },
    dark: { accent: "#94b0cc", cardBackground: "#272c30" },
  },
  green: {
    label: "Emerald",
    light: { accent: "#15803d", cardBackground: "#d6e7dd" },
    dark: { accent: "#4ade80", cardBackground: "#1c3024" },
  },
  purple: {
    label: "Indigo",
    light: { accent: "#7c3aed", cardBackground: "#e4dff0" },
    dark: { accent: "#a78bfa", cardBackground: "#262336" },
  },
  amber: {
    label: "Amber",
    light: { accent: "#a16207", cardBackground: "#e7e3d6" },
    dark: { accent: "#fbbf24", cardBackground: "#332e1e" },
  },
  rose: {
    label: "Crimson",
    light: { accent: "#be123c", cardBackground: "#e7d6de" },
    dark: { accent: "#fb7185", cardBackground: "#331e28" },
  },
  terracotta: {
    label: "Terracotta",
    light: { accent: "#c0392b", cardBackground: "#e8d5c8" },
    dark: { accent: "#e07a5f", cardBackground: "#33241e" },
  },
  teal: {
    label: "Teal",
    light: { accent: "#0d9488", cardBackground: "#d0e8e4" },
    dark: { accent: "#2dd4bf", cardBackground: "#1a302c" },
  },
};

/** Hextra-violet is Lucid's brand accent (stored as scheme id `purple`). */
export const DEFAULT_COLOR_SCHEME = "purple";

export function resolveColorScheme(id: unknown): ColorScheme {
  if (typeof id === "string" && COLOR_SCHEMES[id]) return COLOR_SCHEMES[id];
  return COLOR_SCHEMES[DEFAULT_COLOR_SCHEME];
}

/** Neutrals from static/style.css — retinted toward each scheme's card tint. */
const NEUTRAL_BG = { light: "#ffffff", dark: "#0f172a" };
const NEUTRAL_ALT = { light: "#f9fafb", dark: "#1e293b" };
const NEUTRAL_CODE = { light: "#f3f4f6", dark: "#1e293b" };
const NEUTRAL_SIDEBAR = { light: "#fafafa", dark: "#111827" };

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const c = (v: number) =>
    Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    default:
      h = (r - g) / d + 4;
  }
  return [h / 6, s, l];
}

function hslToRgb([h, s, l]: [number, number, number]): [number, number, number] {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    hue2rgb(p, q, h + 1 / 3) * 255,
    hue2rgb(p, q, h) * 255,
    hue2rgb(p, q, h - 1 / 3) * 255,
  ];
}

function retint(
  neutralHex: string,
  tintHex: string,
  satT: number,
  lightnessBoost: number,
): string {
  const [, sn, ln] = rgbToHsl(hexToRgb(neutralHex));
  const [ht, st] = rgbToHsl(hexToRgb(tintHex));
  const l = Math.min(1, Math.max(0, ln + lightnessBoost));
  if (st < 0.001) return rgbToHex(hslToRgb([0, 0, l]));
  const s = sn + (st - sn) * satT;
  return rgbToHex(hslToRgb([ht, s, l]));
}

const LIGHTNESS_BOOST = {
  light: { bg: -0.02, alt: -0.01, code: -0.04, sidebar: -0.015 },
  dark: { bg: 0.004, alt: 0.008, code: 0.01, sidebar: 0.006 },
};

export interface SchemeSurfaceVars {
  accent: string;
  bg: string;
  bgAlt: string;
  codeBg: string;
  sidebarBg: string;
}

function surfaceVars(
  v: ColorSchemeVariant,
  mode: "light" | "dark",
): SchemeSurfaceVars {
  const boost = LIGHTNESS_BOOST[mode];
  return {
    accent: v.accent,
    bg: retint(NEUTRAL_BG[mode], v.cardBackground, 1, boost.bg),
    bgAlt: retint(NEUTRAL_ALT[mode], v.cardBackground, 0.85, boost.alt),
    codeBg: retint(NEUTRAL_CODE[mode], v.cardBackground, 0.85, boost.code),
    sidebarBg: retint(NEUTRAL_SIDEBAR[mode], v.cardBackground, 0.85, boost.sidebar),
  };
}

export function colorSchemeCss(scheme: ColorScheme): string {
  const toCss = (v: SchemeSurfaceVars) =>
    `--accent:${v.accent};--bg:${v.bg};--bg-alt:${v.bgAlt};--code-bg:${v.codeBg};--sidebar-bg:${v.sidebarBg}`;
  const light = toCss(surfaceVars(scheme.light, "light"));
  const dark = toCss(surfaceVars(scheme.dark, "dark"));
  return `:root{${light}}` +
    `@media (prefers-color-scheme: dark){:root:not([data-theme]){${dark}}}` +
    `:root[data-theme="dark"]{${dark}}` +
    `:root[data-theme="light"]{${light}}`;
}

export function clientSchemeTable(): Record<
  string,
  { light: SchemeSurfaceVars; dark: SchemeSurfaceVars }
> {
  return Object.fromEntries(
    Object.entries(COLOR_SCHEMES).map(([id, s]) => [
      id,
      { light: surfaceVars(s.light, "light"), dark: surfaceVars(s.dark, "dark") },
    ]),
  );
}
