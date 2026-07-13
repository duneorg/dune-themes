/**
 * Curated color presets for the `color_scheme` config option — the same
 * six tones as caravan's `utils/color-schemes.ts`, but simplified: Sirocco
 * has no sidebar to tint, so each preset here is just a light/dark accent
 * pair (drives links, the active nav underline, blockquote borders), not
 * caravan's fuller {accent, menuBackground, body/code retint} set.
 */
export interface ColorScheme {
  label: string;
  light: string;
  dark: string;
}

export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  blue: { label: "Blue", light: "#1d4ed8", dark: "#60a5fa" },
  slate: { label: "Slate", light: "#587a9b", dark: "#94b0cc" },
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
 * `--accent` for light/dark, mirroring the `.dark` class pattern
 * static/style.css already uses for backgrounds. Unlike caravan, Sirocco's
 * dark mode has no `prefers-color-scheme` CSS fallback — layout.tsx's
 * inline script decides `.dark` before first paint from localStorage or
 * `default_dark`, so there's nothing for a media query here to do.
 */
export function colorSchemeCss(scheme: ColorScheme): string {
  return `:root{--accent:${scheme.light}}.dark{--accent:${scheme.dark}}`;
}

/**
 * Precomputed `{ [schemeId]: { light, dark } }` table of accent values,
 * for embedding into the client-side scheme-switcher script
 * (`components/layout.tsx`).
 */
export function clientSchemeTable(): Record<string, { light: string; dark: string }> {
  return Object.fromEntries(
    Object.entries(COLOR_SCHEMES).map(([id, s]) => [id, { light: s.light, dark: s.dark }]),
  );
}
