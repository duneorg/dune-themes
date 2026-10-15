/** Content helpers for the Book theme (shared conventions with the papermod port). */

export interface Heading {
  level: number;
  id: string;
  text: string;
}

/** GitHub-style slug for heading ids (marked emits none). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

/** Add ids to h1–h6 in rendered HTML (deduplicated GitHub-style). */
export function addHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(
    /<h([1-6])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g,
    (match, level, attrs = "", inner) => {
      if (/\sid=/.test(attrs)) return match;
      const text = inner.replace(/<[^>]+>/g, "");
      let id = slugify(text);
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );
}

/**
 * Strip tags from heading HTML for use as plain TOC text. `buildToc` splices
 * this into raw HTML, so it must not leave markup behind. Stripping complete
 * tags is not enough: an unclosed `<` (e.g. `x <img src=x onerror=…` with no
 * `>`) survives `/<[^>]+>/g` and becomes a live tag once the TOC wraps it in
 * `<a>…</a>`. Escape any bracket left over. Existing entities (`&amp;`) are
 * kept as-is: the input is already-rendered HTML, so re-escaping `&` would
 * double-encode.
 */
export function headingText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

/** Extract heading list from HTML that already carries ids. */
export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const re = /<h([1-6])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    headings.push({
      level: Number(m[1]),
      id: m[2],
      text: headingText(m[3]),
    });
  }
  return headings;
}

/** Hugo .TableOfContents equivalent: nested <ul> from h2–h4 headings. */
export function buildToc(headings: Heading[], min = 2, max = 4): string {
  const items = headings.filter((h) => h.level >= min && h.level <= max);
  if (items.length === 0) return "";

  let i = 0;
  function renderLevel(level: number): string {
    let out = "<ul>";
    while (i < items.length && items[i].level >= level) {
      if (items[i].level > level) {
        out += renderLevel(items[i].level);
        continue;
      }
      const h = items[i++];
      out += `<li><a href="#${h.id}">${h.text}</a>`;
      if (i < items.length && items[i].level > level) {
        out += renderLevel(items[i].level);
      }
      out += "</li>";
    }
    return out + "</ul>";
  }

  return `<nav id="TableOfContents">${renderLevel(items[0].level)}</nav>`;
}
