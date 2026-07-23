import { safeHref } from "./safe-url.ts";

export function formatLensDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function postExcerpt(fm: Record<string, unknown>): string | undefined {
  const meta = fm.metadata as Record<string, unknown> | undefined;
  return meta?.description ? String(meta.description) : undefined;
}

export function navIconClass(route: string): string {
  if (route === "/" || route.endsWith("/home")) return "icon solid fa-home";
  if (route.includes("blog")) return "icon solid fa-th";
  if (route.includes("search")) return "icon solid fa-search";
  if (route.includes("archiv")) return "icon solid fa-archive";
  if (route.includes("about")) return "icon solid fa-info-circle";
  return "icon solid fa-link";
}

const THUMB_COUNT = 12;

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

/** Demo gallery thumbs for the home landing grid (01–12). */
export const GALLERY_ITEMS = [
  { thumb: "thumbs/01.jpg", full: "fulls/01.jpg", title: "Blog", href: "/blog", text: "Browse projects" },
  { thumb: "thumbs/02.jpg", full: "fulls/02.jpg", title: "Search", href: "/search", text: "Query demo pages" },
  { thumb: "thumbs/03.jpg", full: "fulls/03.jpg", title: "Archives", href: "/archives", text: "Browse by year" },
  { thumb: "thumbs/04.jpg", full: "fulls/04.jpg", title: "About", href: "/about", text: "Learn more" },
  { thumb: "thumbs/05.jpg", full: "fulls/05.jpg", title: "Welcome", href: "/blog/welcome", text: "Demo introduction" },
  { thumb: "thumbs/06.jpg", full: "fulls/06.jpg", title: "Markdown", href: "/blog/markdown", text: "Formatting demo" },
  { thumb: "thumbs/07.jpg", full: "fulls/07.jpg", title: "Project Alpha", href: "/blog/project-alpha", text: "Sample project" },
  { thumb: "thumbs/08.jpg", full: "fulls/08.jpg", title: "Project Beta", href: "/blog/project-beta", text: "Sample project" },
  { thumb: "thumbs/09.jpg", full: "fulls/09.jpg", title: "Responsive", href: "/blog", text: "Upstream Lens CSS preserved" },
  { thumb: "thumbs/10.jpg", full: "fulls/10.jpg", title: "HTML5 UP", href: "/about", text: "Design by HTML5 UP" },
  { thumb: "thumbs/11.jpg", full: "fulls/11.jpg", title: "Dune CMS", href: "/blog", text: "Built for modern static sites" },
  { thumb: "thumbs/12.jpg", full: "fulls/12.jpg", title: "Explore", href: "/blog/welcome", text: "Start with the welcome post" },
] as const;
