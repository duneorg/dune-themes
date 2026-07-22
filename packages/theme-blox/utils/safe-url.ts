/**
 * Neutralizes `javascript:`/`data:`/etc. URLs before they reach an
 * `href`. Same allowlist as papermod/book/starlight/caravan.
 */
export function safeHref(url: unknown): string | undefined {
  if (typeof url !== "string" || url.length === 0) return undefined;
  const trimmed = url.trim();
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  return undefined;
}
