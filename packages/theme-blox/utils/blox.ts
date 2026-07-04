/** Shared helpers for the Blox port. */
import type { Collection, Page, PageIndex, TemplateProps } from "@dune/core";

// ── URLs ────────────────────────────────────────────────────────────────────

export function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url);
}

/** Upstream link handling: external links and PDFs open in a new tab. */
export function linkTarget(url: string): { target?: string; rel?: string } {
  if (isExternal(url) || url.endsWith(".pdf")) {
    return { target: "_blank", rel: "noopener" };
  }
  return {};
}

export function normalizeRoute(route: string): string {
  if (!route.endsWith("/")) return route + "/";
  return route;
}

// ── Dates ───────────────────────────────────────────────────────────────────

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** ":date_long" style — e.g. "October 24, 2022". */
export function formatDateLong(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return "";
  return `${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** "Jan 2006" style used by resume timelines. */
export function formatMonthYear(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return typeof value === "string" ? value : "";
  return `${MONTHS_LONG[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()}`;
}

/** "January 2006" style used by the awards block. */
export function formatMonthYearLong(value: string | Date | null | undefined): string {
  const d = toDate(value);
  if (!d) return typeof value === "string" ? value : "";
  return `${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function yearOf(value: string | Date | null | undefined): string {
  const d = toDate(value);
  return d ? String(d.getUTCFullYear()) : "";
}

export function toDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

// ── Mini markdown (block titles / bios / summaries) ────────────────────────
// Covers the inline subset upstream blocks feed through RenderString:
// paragraphs, bold, italics, inline code, and links. Escapes HTML first so
// block config text cannot inject markup.

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function inlineMarkdown(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export function markdownBlock(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((p) => `<p>${inlineMarkdown(p.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}

// ── Page metadata ───────────────────────────────────────────────────────────

export interface PublicationInfo {
  display: string;
  displayShort: string;
  publisher: string;
  isEmpty: boolean;
}

/** Port of functions/resolve_publication.html (structured + legacy shapes). */
export function resolvePublication(fm: Record<string, unknown>): PublicationInfo {
  const raw = fm.publication;
  let name = "", shortName = "", volume = "", issue = "", pages = "", publisher = "";
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const m = raw as Record<string, unknown>;
    name = str(m.name);
    shortName = str(m.short_name);
    volume = str(m.volume);
    issue = str(m.issue);
    pages = str(m.pages);
    publisher = str(m.publisher);
  } else if (typeof raw === "string" && raw) {
    // Legacy flat string, optionally with publication_short
    name = raw;
    shortName = str(fm.publication_short);
  } else {
    return { display: "", displayShort: "", publisher: "", isEmpty: true };
  }
  const detail = [volume && issue ? `${volume}(${issue})` : volume, pages]
    .filter(Boolean)
    .join(", ");
  const display = detail ? `*${stripEm(name)}*, ${detail}` : name;
  const short = shortName || name;
  const displayShort = detail ? `*${stripEm(short)}*, ${detail}` : short;
  return { display, displayShort, publisher, isEmpty: false };
}

function stripEm(s: string): string {
  return s.replace(/^\*|\*$/g, "");
}

export function str(v: unknown): string {
  return v == null ? "" : String(v);
}

export function strArr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x));
  if (typeof v === "string" && v) return [v];
  return [];
}

/** Reading time in minutes at upstream's 200 wpm. */
export function readingTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.floor(words / 200));
}

/** Plain-text summary for list views (frontmatter summary/abstract or content). */
export function pageSummary(item: Page, max = 180): string {
  const fm = item.frontmatter as Record<string, unknown>;
  const s = str(fm.summary) || str(fm.abstract) || (item.rawContent ?? "");
  const plain = s
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>\[\]]/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max).replace(/\s\S*$/, "") + " …" : plain;
}

// ── Collections ─────────────────────────────────────────────────────────────

/** Look up a named collection from props (frontmatter `collections:` map). */
export function namedCollection(
  props: TemplateProps,
  name: string,
): Collection | undefined {
  const map = (props as { collections?: Record<string, Collection> }).collections;
  return map?.[name];
}

// ── Navigation ──────────────────────────────────────────────────────────────

export interface MenuItem {
  name: string;
  url: string;
}

/** Parse the theme-config `menu` value (JSON array or PageIndex-derived). */
export function parseMenu(value: unknown, nav: PageIndex[]): MenuItem[] {
  if (typeof value === "string" && value.trim()) {
    try {
      const arr = JSON.parse(value);
      if (Array.isArray(arr)) {
        return arr
          .filter((m) => m && typeof m === "object" && m.url)
          .map((m) => ({ name: str(m.name) || str(m.url), url: str(m.url) }));
      }
    } catch {
      // fall through to nav
    }
  }
  return nav
    .filter((p) => p.visible && p.routable)
    .map((p) => ({ name: p.navTitle || p.title, url: normalizeRoute(p.route) }));
}

/** Page display title (frontmatter title or navTitle). */
export function pageTitle(item: Page): string {
  return str((item.frontmatter as Record<string, unknown>).title) || item.navTitle;
}

/** Page date from frontmatter. */
export function pageDate(item: Page): string {
  const d = (item.frontmatter as Record<string, unknown>).date;
  if (d instanceof Date) return d.toISOString();
  return str(d);
}
