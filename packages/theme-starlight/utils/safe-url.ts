/**
 * Neutralizes `javascript:`/`data:`/etc. URLs before they reach an
 * `href` — Preact's JSX escaping covers quotes/HTML, not URL schemes.
 * Same allowlist as papermod/book/caravan — don't invent a per-theme variant.
 */
export function safeHref(url: unknown): string | undefined {
  if (typeof url !== "string" || url.length === 0) return undefined;
  const trimmed = url.trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  return undefined;
}
