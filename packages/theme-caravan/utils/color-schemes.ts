/**
 * Curated accent-color presets for the `color_scheme` config option.
 * Each pair is chosen for contrast against caravan's neutral light
 * (`#fff`) and dark (`#1b1d1e`) backgrounds — light-mode shades sit
 * around Tailwind's 700 step, dark-mode shades around 400, the usual
 * accessible pairing (darker/more saturated on a light page, lighter/
 * brighter on a dark one).
 */
export interface ColorScheme {
  label: string;
  light: string;
  dark: string;
}

export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  blue: { label: "Blue", light: "#1d4ed8", dark: "#60a5fa" },
  slate: { label: "Slate", light: "#334155", dark: "#94a3b8" },
  green: { label: "Green", light: "#15803d", dark: "#4ade80" },
  purple: { label: "Purple", light: "#6d28d9", dark: "#a78bfa" },
  amber: { label: "Amber", light: "#a16207", dark: "#fbbf24" },
  rose: { label: "Rose", light: "#be123c", dark: "#fb7185" },
};

export const DEFAULT_COLOR_SCHEME = "blue";

export function resolveColorScheme(id: unknown): ColorScheme {
  if (typeof id === "string" && COLOR_SCHEMES[id]) return COLOR_SCHEMES[id];
  return COLOR_SCHEMES[DEFAULT_COLOR_SCHEME];
}

/**
 * CSS overriding `--color-link` for light/dark, mirroring the
 * `[data-theme]` / `prefers-color-scheme` pattern static/style.css already
 * uses for backgrounds — so the accent switches in lockstep with the
 * manual theme toggle, not just the OS preference.
 */
export function colorSchemeCss(scheme: ColorScheme): string {
  return `:root{--color-link:${scheme.light}}` +
    `@media (prefers-color-scheme: dark){:root:not([data-theme]){--color-link:${scheme.dark}}}` +
    `:root[data-theme="dark"]{--color-link:${scheme.dark}}` +
    `:root[data-theme="light"]{--color-link:${scheme.light}}`;
}
