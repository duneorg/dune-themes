export function formatMinimaxingDate(raw: string): string {
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
