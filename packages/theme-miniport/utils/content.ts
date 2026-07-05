export function formatMiniportDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function postExcerpt(fm: Record<string, unknown>): string | undefined {
  const meta = fm.metadata as Record<string, unknown> | undefined;
  return meta?.description ? String(meta.description) : undefined;
}

const BOX_ICONS = [
  "fa-comments",
  "fa-camera-retro",
  "fa-thumbs-up",
  "fa-code",
  "fa-chart-bar",
  "fa-lightbulb",
] as const;

export function boxIconClass(index: number): string {
  return `icon solid featured ${BOX_ICONS[index % BOX_ICONS.length]!}`;
}
