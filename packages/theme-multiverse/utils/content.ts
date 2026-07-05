export function formatMultiverseDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function postExcerpt(fm: Record<string, unknown>): string | undefined {
  const meta = fm.metadata as Record<string, unknown> | undefined;
  const summary = fm.summary ?? meta?.description;
  return summary ? String(summary) : undefined;
}

export function themeImage(themeName: string, file: string): string {
  return `/themes/${themeName}/static/html5up/images/${file}`;
}

/** Demo gallery thumbs for the landing grid (01–12). */
export const GALLERY_ITEMS = [
  { full: "fulls/01.jpg", thumb: "thumbs/01.jpg", title: "Magna feugiat lorem", text: "Blog posts, search, and archives for Dune CMS." },
  { full: "fulls/02.jpg", thumb: "thumbs/02.jpg", title: "Read the blog", text: "Collection-driven listing at /blog with dated posts." },
  { full: "fulls/03.jpg", thumb: "thumbs/03.jpg", title: "Search", text: "Query demo pages through Dune's search template." },
  { full: "fulls/04.jpg", thumb: "thumbs/04.jpg", title: "Archives", text: "Browse all posts grouped by year." },
  { full: "fulls/05.jpg", thumb: "thumbs/05.jpg", title: "About", text: "Learn more about this demo site." },
  { full: "fulls/06.jpg", thumb: "thumbs/06.jpg", title: "Responsive shell", text: "Upstream Multiverse CSS with thumb grid preserved." },
  { full: "fulls/07.jpg", thumb: "thumbs/07.jpg", title: "HTML5 UP", text: "Design by HTML5 UP (CC BY 3.0)." },
  { full: "fulls/08.jpg", thumb: "thumbs/08.jpg", title: "Dune CMS", text: "Built for modern static sites with Dune." },
  { full: "fulls/09.jpg", thumb: "thumbs/09.jpg", title: "Markdown posts", text: "Sample posts with code blocks and tags." },
  { full: "fulls/10.jpg", thumb: "thumbs/10.jpg", title: "Lightbox grid", text: "Fullscreen gallery landing from HTML5 UP Multiverse." },
  { full: "fulls/11.jpg", thumb: "thumbs/11.jpg", title: "Get started", text: "Install the theme and point your site config at multiverse." },
  { full: "fulls/12.jpg", thumb: "thumbs/12.jpg", title: "Explore", text: "Start with the welcome post on the blog." },
] as const;

export function galleryHref(themeName: string, file: string): string {
  return themeImage(themeName, file);
}
