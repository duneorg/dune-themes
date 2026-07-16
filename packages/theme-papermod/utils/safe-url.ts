/**
 * Neutralizes `javascript:`/`data:`/etc. URLs before they reach an
 * `href` — Preact's JSX escaping covers quotes/HTML, not URL schemes, so
 * `<a href={url}>` with an attacker-controlled `url` (frontmatter
 * `social: [...]`, MDX shortcode `link`/`attrlink` props) can still emit
 * a `javascript:` URI verbatim. Allows normal web links, mail links, and
 * site-relative/fragment links; anything else is dropped (the anchor
 * renders without an `href` rather than a live but malicious one).
 */
export function safeHref(url: unknown): string | undefined {
  if (typeof url !== "string" || url.length === 0) return undefined;
  const trimmed = url.trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  return undefined;
}
