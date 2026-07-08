/**
 * Curated color presets for the `color_scheme` config option. Each preset
 * is a light/dark pair of {accent, menuBackground}:
 *
 * - `accent` drives links and the active sidebar item — chosen for
 *   contrast against caravan's neutral page background (`#fff` / `#1b1d1e`):
 *   light-mode shades sit around Tailwind's 700 step, dark-mode around 400,
 *   the usual accessible pairing (darker/more saturated on a light page,
 *   lighter/brighter on a dark one).
 * - `menuBackground` is a tint of the scheme's hue over the neutral sidebar
 *   gray (`#f8f9fa` / `#16181a`).
 *
 * The body and code-block backgrounds aren't hand-picked per scheme —
 * `colorSchemeCss` derives them from the neutral body/code colors by
 * rotating hue to match `menuBackground`'s hue while keeping each surface's
 * own lightness (see `retint()`), so the whole page reads as one harmonic
 * surface instead of "tinted sidebar, neutral everything else." Body picks
 * up close to `menuBackground`'s own saturation; code stays close to the
 * neutral's low saturation so it still reads as "code," just tinted.
 *
 * "Slate" is the neutral/monochrome option — its menuBackground is close to
 * the theme's original untinted gray, so its own low saturation keeps the
 * retinted body/code subtle without needing a special case.
 */
export interface ColorSchemeVariant {
  accent: string;
  menuBackground: string;
}

export interface ColorScheme {
  label: string;
  light: ColorSchemeVariant;
  dark: ColorSchemeVariant;
}

export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  blue: {
    label: "Blue",
    light: { accent: "#1d4ed8", menuBackground: "#eff4ff" },
    dark: { accent: "#60a5fa", menuBackground: "#1b2336" },
  },
  slate: {
    label: "Slate",
    light: { accent: "#334155", menuBackground: "#f8f9fa" },
    dark: { accent: "#94a3b8", menuBackground: "#1e2022" },
  },
  green: {
    label: "Green",
    light: { accent: "#15803d", menuBackground: "#f0fdf4" },
    dark: { accent: "#4ade80", menuBackground: "#1c3024" },
  },
  purple: {
    label: "Purple",
    light: { accent: "#6d28d9", menuBackground: "#f5f3ff" },
    dark: { accent: "#a78bfa", menuBackground: "#262336" },
  },
  amber: {
    label: "Amber",
    light: { accent: "#a16207", menuBackground: "#fffbeb" },
    dark: { accent: "#fbbf24", menuBackground: "#332e1e" },
  },
  rose: {
    label: "Rose",
    light: { accent: "#be123c", menuBackground: "#fff1f2" },
    dark: { accent: "#fb7185", menuBackground: "#331e28" },
  },
};

export const DEFAULT_COLOR_SCHEME = "blue";

export function resolveColorScheme(id: unknown): ColorScheme {
  if (typeof id === "string" && COLOR_SCHEMES[id]) return COLOR_SCHEMES[id];
  return COLOR_SCHEMES[DEFAULT_COLOR_SCHEME];
}

/** Neutral body/code backgrounds from static/style.css, tinted toward `menuBackground` below. */
const NEUTRAL_SURFACES = {
  light: { body: "#ffffff", code: "#f8f9fa" },
  dark: { body: "#1b1d1e", code: "#24272a" },
};

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const c = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
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
 * Retint `neutralHex` with `menuHex`'s hue, keeping `neutralHex`'s own
 * lightness (plus `lightnessBoost`) and blending `satT` of the way from
 * `neutralHex`'s own saturation to `menuHex`'s saturation. `satT` near 1
 * (body) makes the surface pick up close to the scheme's full color;
 * `satT` near 0 (code) keeps it close to neutral, just hue-shifted.
 */
function retint(neutralHex: string, menuHex: string, satT: number, lightnessBoost: number): string {
  const [, sn, ln] = rgbToHsl(hexToRgb(neutralHex));
  const [hm, sm] = rgbToHsl(hexToRgb(menuHex));
  const s = sn + (sm - sn) * satT;
  const l = Math.min(1, Math.max(0, ln + lightnessBoost));
  return rgbToHex(hslToRgb([hm, s, l]));
}

const LIGHTNESS_BOOST = {
  light: { body: 0, code: 0 },
  dark: { body: 0.004, code: 0.006 },
} as const;

export interface SchemeSurfaceVars {
  "color-link": string;
  "menu-background": string;
  "body-background": string;
  "code-background": string;
}

/**
 * Computes the full set of CSS custom property values (accent + all three
 * tinted backgrounds) for one scheme variant + mode. Used both for the CSS
 * `colorSchemeCss` renders at SSR time and for the client-side scheme
 * switcher (see `clientSchemeTable`), so both stay in sync — the switcher
 * used to only patch `--color-link`/`--menu-background`, leaving body/code
 * backgrounds stuck at whatever the server rendered for the site's
 * configured default scheme.
 */
function surfaceVars(v: ColorSchemeVariant, mode: "light" | "dark"): SchemeSurfaceVars {
  const neutral = NEUTRAL_SURFACES[mode];
  const boost = LIGHTNESS_BOOST[mode];
  return {
    "color-link": v.accent,
    "menu-background": v.menuBackground,
    "body-background": retint(neutral.body, v.menuBackground, 1, boost.body),
    "code-background": retint(neutral.code, v.menuBackground, 0.05, boost.code),
  };
}

/**
 * CSS overriding `--color-link` / `--menu-background` / `--body-background` /
 * `--code-background` for light/dark, mirroring the `[data-theme]` /
 * `prefers-color-scheme` pattern static/style.css already uses for
 * backgrounds — so the scheme switches in lockstep with the manual theme
 * toggle, not just the OS preference.
 */
export function colorSchemeCss(scheme: ColorScheme): string {
  const toCss = (v: SchemeSurfaceVars) => Object.entries(v).map(([k, val]) => `--${k}:${val}`).join(";");
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
