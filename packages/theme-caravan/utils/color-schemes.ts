/**
 * Curated color presets for the `color_scheme` config option. Each preset
 * is a light/dark pair of {accent, menuBackground}:
 *
 * - `accent` drives links and the active sidebar item — chosen for
 *   contrast against caravan's neutral page background (`#fff` / `#1b1d1e`):
 *   light-mode shades sit around Tailwind's 700 step, dark-mode around 400,
 *   the usual accessible pairing (darker/more saturated on a light page,
 *   lighter/brighter on a dark one).
 * - `menuBackground` is a subtle tint of the scheme's hue over the neutral
 *   sidebar gray (`#f8f9fa` / `#16181a`), so a scheme reads as more than
 *   "the links are a different color" without tinting body text or code
 *   blocks, which stay neutral for readability regardless of scheme.
 *
 * "Slate" is the neutral/monochrome option — its menuBackground is the
 * theme's original untinted gray.
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
    dark: { accent: "#60a5fa", menuBackground: "#131b2e" },
  },
  slate: {
    label: "Slate",
    light: { accent: "#334155", menuBackground: "#f8f9fa" },
    dark: { accent: "#94a3b8", menuBackground: "#16181a" },
  },
  green: {
    label: "Green",
    light: { accent: "#15803d", menuBackground: "#f0fdf4" },
    dark: { accent: "#4ade80", menuBackground: "#12261a" },
  },
  purple: {
    label: "Purple",
    light: { accent: "#6d28d9", menuBackground: "#f5f3ff" },
    dark: { accent: "#a78bfa", menuBackground: "#1e1b2e" },
  },
  amber: {
    label: "Amber",
    light: { accent: "#a16207", menuBackground: "#fffbeb" },
    dark: { accent: "#fbbf24", menuBackground: "#2b2410" },
  },
  rose: {
    label: "Rose",
    light: { accent: "#be123c", menuBackground: "#fff1f2" },
    dark: { accent: "#fb7185", menuBackground: "#2b1620" },
  },
};

export const DEFAULT_COLOR_SCHEME = "blue";

export function resolveColorScheme(id: unknown): ColorScheme {
  if (typeof id === "string" && COLOR_SCHEMES[id]) return COLOR_SCHEMES[id];
  return COLOR_SCHEMES[DEFAULT_COLOR_SCHEME];
}

/**
 * CSS overriding `--color-link` / `--menu-background` for light/dark,
 * mirroring the `[data-theme]` / `prefers-color-scheme` pattern
 * static/style.css already uses for backgrounds — so the scheme switches
 * in lockstep with the manual theme toggle, not just the OS preference.
 */
export function colorSchemeCss(scheme: ColorScheme): string {
  const vars = (v: ColorSchemeVariant) => `--color-link:${v.accent};--menu-background:${v.menuBackground}`;
  return `:root{${vars(scheme.light)}}` +
    `@media (prefers-color-scheme: dark){:root:not([data-theme]){${vars(scheme.dark)}}}` +
    `:root[data-theme="dark"]{${vars(scheme.dark)}}` +
    `:root[data-theme="light"]{${vars(scheme.light)}}`;
}
