/**
 * Curated color presets for the `color_scheme` config option — the same
 * six tones and `cardBackground` tints as caravan's `utils/color-schemes.ts`
 * (reused verbatim from caravan's `menuBackground`, since both are "a tint
 * of the scheme's hue over a neutral card/panel gray"), plus the same
 * retint() approach for a derived body background *and* a subtly retinted
 * code-block background (mirroring caravan's low-`satT` code treatment) —
 * not caravan's fuller sidebar-specific `menuBackground` concept, since
 * Sirocco has no sidebar to tint.
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
    label: "Blue",
    light: { accent: "#1d4ed8", cardBackground: "#d3dae9" },
    dark: { accent: "#60a5fa", cardBackground: "#1b2336" },
  },
  slate: {
    label: "Slate",
    light: { accent: "#587a9b", cardBackground: "#dedede" },
    dark: { accent: "#94b0cc", cardBackground: "#272c30" },
  },
  green: {
    label: "Green",
    light: { accent: "#15803d", cardBackground: "#d6e7dd" },
    dark: { accent: "#4ade80", cardBackground: "#1c3024" },
  },
  purple: {
    label: "Purple",
    light: { accent: "#6d28d9", cardBackground: "#d9d7e5" },
    dark: { accent: "#a78bfa", cardBackground: "#262336" },
  },
  amber: {
    label: "Amber",
    light: { accent: "#a16207", cardBackground: "#e7e3d6" },
    dark: { accent: "#fbbf24", cardBackground: "#332e1e" },
  },
  rose: {
    label: "Rose",
    light: { accent: "#be123c", cardBackground: "#e7d6de" },
    dark: { accent: "#fb7185", cardBackground: "#331e28" },
  },
};

export const DEFAULT_COLOR_SCHEME = "blue";

export function resolveColorScheme(id: unknown): ColorScheme {
  if (typeof id === "string" && COLOR_SCHEMES[id]) return COLOR_SCHEMES[id];
  return COLOR_SCHEMES[DEFAULT_COLOR_SCHEME];
}

/** Neutral `--theme` (body) and `--code-bg` backgrounds from static/style.css, tinted toward `cardBackground` below. */
const NEUTRAL_THEME = { light: "#ffffff", dark: "#1d1e20" };
const NEUTRAL_CODE = { light: "#f5f5f5", dark: "#2e2e33" };

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const c = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
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
  return [hue2rgb(p, q, h + 1 / 3) * 255, hue2rgb(p, q, h) * 255, hue2rgb(p, q, h - 1 / 3) * 255];
}

/**
 * Retint `neutralHex` with `tintHex`'s hue, keeping `neutralHex`'s own
 * lightness (plus `lightnessBoost`) and blending `satT` of the way from
 * `neutralHex`'s own saturation to `tintHex`'s saturation. `satT` near 1
 * (body) picks up close to the scheme's full color; `satT` near 0 (code)
 * keeps it close to neutral, just hue-shifted — same idea as caravan's
 * body/code retint split.
 *
 * When `tintHex` itself is (near-)achromatic (slate), its hue is
 * mathematically undefined — collapse straight to gray rather than
 * leaking an arbitrary hue through.
 */
function retint(neutralHex: string, tintHex: string, satT: number, lightnessBoost: number): string {
  const [, sn, ln] = rgbToHsl(hexToRgb(neutralHex));
  const [ht, st] = rgbToHsl(hexToRgb(tintHex));
  const l = Math.min(1, Math.max(0, ln + lightnessBoost));
  if (st < 0.001) return rgbToHex(hslToRgb([0, 0, l]));
  const s = sn + (st - sn) * satT;
  return rgbToHex(hslToRgb([ht, s, l]));
}

/**
 * In dark mode the neutral surfaces sit near the bottom of the lightness
 * range, so retinting nudges lightness *up* toward the (brighter)
 * cardBackground. In light mode the neutral surfaces sit at/near the very
 * top (pure white can't get any lighter), so the same move goes the other
 * way: nudge lightness *down* toward the (still very light, but not
 * literally white) cardBackground.
 */
const LIGHTNESS_BOOST = {
  light: { theme: -0.055, code: -0.1015 },
  dark: { theme: 0.004, code: 0.006 },
};

export interface SchemeSurfaceVars {
  accent: string;
  entry: string;
  theme: string;
  codeBg: string;
}

/**
 * Computes the full set of CSS custom property values (accent + all three
 * tinted surfaces) for one scheme variant + mode. Used both for the CSS
 * `colorSchemeCss` renders at SSR time and for the client-side scheme
 * switcher (see `clientSchemeTable`), so both stay in sync.
 */
function surfaceVars(v: ColorSchemeVariant, mode: "light" | "dark"): SchemeSurfaceVars {
  const boost = LIGHTNESS_BOOST[mode];
  return {
    accent: v.accent,
    entry: v.cardBackground,
    theme: retint(NEUTRAL_THEME[mode], v.cardBackground, 1, boost.theme),
    codeBg: retint(NEUTRAL_CODE[mode], v.cardBackground, 0.05, boost.code),
  };
}

/**
 * `--accent` / `--entry` / `--theme` / `--code-bg` for light/dark,
 * mirroring the `data-theme` attribute + `prefers-color-scheme` fallback
 * pattern static/style.css uses for backgrounds (same shape as caravan's
 * `colorSchemeCss`) — a real no-JS visitor gets scheme-tinted surfaces
 * matching their OS preference purely from CSS; layout.tsx's pre-paint
 * script sets `data-theme` explicitly once JS runs, which then wins over
 * the media-query fallback via cascade order below.
 */
export function colorSchemeCss(scheme: ColorScheme): string {
  const toCss = (v: SchemeSurfaceVars) =>
    `--accent:${v.accent};--entry:${v.entry};--theme:${v.theme};--code-bg:${v.codeBg}`;
  const light = toCss(surfaceVars(scheme.light, "light"));
  const dark = toCss(surfaceVars(scheme.dark, "dark"));
  return `:root{${light}}` +
    `@media (prefers-color-scheme: dark){:root:not([data-theme]){${dark}}}` +
    `:root[data-theme="dark"]{${dark}}` +
    `:root[data-theme="light"]{${light}}`;
}

/**
 * Precomputed `{ [schemeId]: { light, dark } }` table of every CSS custom
 * property value, for embedding into the client-side scheme-switcher script
 * (`components/layout.tsx`) — the switcher looks values up here instead of
 * recomputing the HSL retint math in vanilla JS.
 */
export function clientSchemeTable(): Record<string, { light: SchemeSurfaceVars; dark: SchemeSurfaceVars }> {
  return Object.fromEntries(
    Object.entries(COLOR_SCHEMES).map((
      [id, s],
    ) => [id, { light: surfaceVars(s.light, "light"), dark: surfaceVars(s.dark, "dark") }]),
  );
}
