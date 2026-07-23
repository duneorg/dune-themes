import { safeHref } from "./safe-url.ts";

const SPANS = ["span-1", "span-2", "span-3"] as const;
const DELAYS = ["delay-1", "delay-2", "delay-3", "delay-4", "delay-5", "delay-6"] as const;
const THUMB_COUNT = 8;

export function formatParallelismDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function postExcerpt(fm: Record<string, unknown>): string | undefined {
  const meta = fm.metadata as Record<string, unknown> | undefined;
  if (meta?.description) return String(meta.description);
  if (fm.summary) return String(fm.summary);
  return undefined;
}

export function spanClass(index: number): string {
  return SPANS[index % SPANS.length]!;
}

export function delayClass(index: number): string {
  return DELAYS[index % DELAYS.length]!;
}

export function themeImage(themeName: string, file: string): string {
  return `/themes/${themeName}/static/html5up/images/${file}`;
}

export function defaultThumbUrl(themeName: string, index: number): string {
  const n = String((index % THUMB_COUNT) + 1).padStart(2, "0");
  return themeImage(themeName, `thumbs/${n}.jpg`);
}

export function postThumbUrl(
  fm: Record<string, unknown>,
  themeName: string,
  index: number,
): string {
  return safeHref(fm.cover) ?? defaultThumbUrl(themeName, index);
}

/** Demo masonry tiles for the home landing grid. */
export const GALLERY_ITEMS = [
  { thumb: "thumbs/01.jpg", title: "Blog", href: "/blog", text: "Project listing" },
  { thumb: "thumbs/02.jpg", title: "Search", href: "/search", text: "Query demo pages" },
  { thumb: "thumbs/03.jpg", title: "Archives", href: "/archives", text: "Browse by year" },
  { thumb: "thumbs/04.jpg", title: "About", href: "/about", text: "Learn more" },
  { thumb: "thumbs/05.jpg", title: "Welcome", href: "/blog/welcome", text: "Demo introduction" },
  { thumb: "thumbs/06.jpg", title: "Markdown", href: "/blog/markdown", text: "Formatting demo" },
  { thumb: "thumbs/07.jpg", title: "Project Alpha", href: "/blog/project-alpha", text: "Sample project" },
  { thumb: "thumbs/08.jpg", title: "Project Beta", href: "/blog/project-beta", text: "Sample project" },
] as const;
