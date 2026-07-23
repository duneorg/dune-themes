import { safeHref } from "./safe-url.ts";

export function formatStrataDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function postExcerpt(fm: Record<string, unknown>): string | undefined {
  const meta = fm.metadata as Record<string, unknown> | undefined;
  return meta?.description ? String(meta.description) : undefined;
}

export function themeImage(themeName: string, file: string): string {
  return `/themes/${themeName}/static/html5up/images/${file}`;
}

const THUMB_COUNT = 6;

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
