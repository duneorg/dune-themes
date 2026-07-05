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
