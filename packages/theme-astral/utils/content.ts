import { safeHref } from "./safe-url.ts";

export function formatAstralDate(raw: string): string {
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
  if (route.includes("blog")) return "icon solid fa-folder";
  if (route.includes("search")) return "icon solid fa-search";
  if (route.includes("archiv")) return "icon solid fa-archive";
  if (route.includes("about") || route.includes("contact")) return "icon solid fa-envelope";
  return "icon solid fa-link";
}

export function themeImage(themeName: string, file: string): string {
  return `/themes/${themeName}/static/html5up/images/${file}`;
}

const PIC_COUNT = 12;

export function defaultPicUrl(themeName: string, index: number): string {
  const n = String((index % PIC_COUNT) + 1).padStart(2, "0");
  return themeImage(themeName, `pic${n}.jpg`);
}

export function postPicUrl(
  fm: Record<string, unknown>,
  themeName: string,
  index: number,
): string {
  return safeHref(fm.cover) ?? defaultPicUrl(themeName, index);
}
