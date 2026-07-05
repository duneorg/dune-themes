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
  if (route === "/") return "icon solid fa-home";
  if (route.includes("blog")) return "icon solid fa-th";
  if (route.includes("search")) return "icon solid fa-search";
  if (route.includes("archiv")) return "icon solid fa-archive";
  return "icon solid fa-link";
}

const THUMB_COUNT = 12;

export function defaultThumbUrl(themeName: string, index: number): string {
  const n = String((index % THUMB_COUNT) + 1).padStart(2, "0");
  return `/themes/${themeName}/static/html5up/images/thumbs/${n}.jpg`;
}

export function postThumbUrl(
  fm: Record<string, unknown>,
  themeName: string,
  index: number,
): string {
  return typeof fm.cover === "string" ? fm.cover : defaultThumbUrl(themeName, index);
}
