/**
 * Content transforms for the PaperMod port.
 *
 * PaperMod post-processes Hugo's rendered HTML with regexes (see upstream
 * layouts/_partials/anchored_headings.html and toc.html). Dune's marked
 * pipeline emits headings without ids, so we add GitHub-style slug ids
 * first, then apply the same anchor / TOC transforms.
 */

export interface Heading {
  level: number;
  id: string;
  text: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ");
}

/** Add slug ids to h1–h6 elements that don't have one. Duplicate slugs get
 * a -1, -2… suffix (GitHub convention). */
export function addHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(
    /<h([1-6])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g,
    (match, level, attrs = "", inner) => {
      if (/\bid=/.test(attrs)) return match;
      let slug = slugify(stripTags(inner)) || "heading";
      const count = seen.get(slug) ?? 0;
      seen.set(slug, count + 1);
      if (count > 0) slug = `${slug}-${count}`;
      return `<h${level} id="${slug}"${attrs}>${inner}</h${level}>`;
    },
  );
}

/** PaperMod's anchored_headings.html transform: append a hidden `#` anchor
 * link inside each heading that has an id. */
export function anchorHeadings(html: string): string {
  return html.replace(
    /(<h[1-6] id="([^"]+)"[^>]*>[\s\S]+?)(<\/h[1-6]>)/g,
    `$1<a hidden class="anchor" aria-hidden="true" href="#$2">#</a>$3`,
  );
}

/** Extract headings (level, id, text) for the TOC. Run after addHeadingIds. */
export function extractHeadings(html: string): Heading[] {
  const out: Heading[] = [];
  const re = /<h([1-6]) id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    out.push({
      level: Number(m[1]),
      id: m[2],
      text: stripTags(m[3]).replace(/\s+/g, " ").trim(),
    });
  }
  return out;
}

/** Word count of the visible text. */
export function wordCount(html: string): number {
  return stripTags(html).split(/\s+/).filter(Boolean).length;
}

/** Hugo's .ReadingTime formula: (words + 212) / 213, floored, min 1. */
export function readingTime(words: number): number {
  return Math.max(1, Math.floor((words + 212) / 213));
}

/** Hugo-style .Summary: first `count` words of plain text. Returns
 * [summary, truncated]. */
export function summarize(html: string, count = 70): [string, boolean] {
  const words = stripTags(html).split(/\s+/).filter(Boolean);
  if (words.length <= count) return [words.join(" "), false];
  return [words.slice(0, count).join(" "), true];
}

/** Rough plain text from raw markdown (for summaries / word counts of
 * collection items, whose rendered HTML is only available async). */
export function markdownText(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>#|-]/g, " ")
    .replace(/<[^>]+>/g, " ");
}

/**
 * Label for a language in the switcher. Precedence: theme locale string
 * keyed by the language code (t("de") → "Deutsch") → Intl.DisplayNames
 * endonym when the language_labels theme option is "name" → the code itself.
 */
export function langLabel(
  lang: string,
  t: ((key: string) => string) | undefined,
  mode: unknown,
): string {
  const fromLocale = t ? t(lang) : lang;
  if (fromLocale !== lang) return fromLocale;
  if (mode === "name") {
    try {
      return new Intl.DisplayNames([lang], { type: "language" }).of(lang) ?? lang;
    } catch {
      return lang;
    }
  }
  return lang;
}
