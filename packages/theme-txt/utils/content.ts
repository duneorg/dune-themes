import { safeHref } from "./safe-url.ts";

export function formatTxtDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

export function postExcerpt(fm: Record<string, unknown>): string | undefined {
  const meta = fm.metadata as Record<string, unknown> | undefined;
  return meta?.description ? String(meta.description) : undefined;
}

export function themeImage(themeName: string, file: string): string {
  return `/themes/${themeName}/static/html5up/images/${file}`;
}

const PIC_FALLBACKS = ["pic01.jpg", "pic02.jpg", "pic03.jpg", "pic04.jpg", "pic05.jpg"] as const;

export function postCoverUrl(
  fm: Record<string, unknown>,
  themeName: string,
  index: number,
): string {
  return safeHref(fm.cover) ??
    themeImage(themeName, PIC_FALLBACKS[index % PIC_FALLBACKS.length]!);
}
