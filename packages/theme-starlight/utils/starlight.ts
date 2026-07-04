/** Server-side helpers for the Starlight port. Sidebar tree / prev-next
 * follow the same navAll conventions as the book theme; the ToC builder
 * reproduces utils/generateToC.ts (nested TocItem list with an injected
 * "Overview" entry pointing at the page title). */

export interface NavPage {
  route: string;
  title: string;
  navTitle?: string;
  order: number;
  depth: number;
}

export interface NavNode extends NavPage {
  children: NavNode[];
}

export function normalizeRoute(route: string): string {
  return route.endsWith("/") ? route : route + "/";
}

export function navLabel(p: NavPage): string {
  return p.navTitle ?? p.title;
}

/** Nest the flat list by route prefix (parents come first: sorted by depth). */
export function buildTree(items: NavPage[], section: string): NavNode[] {
  const sorted = [...items].sort((a, b) =>
    a.depth !== b.depth ? a.depth - b.depth : a.order - b.order
  );
  const nodes = new Map<string, NavNode>();
  const roots: NavNode[] = [];
  for (const item of sorted) {
    const node: NavNode = { ...item, children: [] };
    const route = normalizeRoute(item.route);
    nodes.set(route, node);
    const parentRoute = route.replace(/[^/]+\/$/, "");
    const parent = nodes.get(parentRoute);
    if (parent && parentRoute !== route) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }
  if (section && section !== "*") {
    const target = nodes.get(normalizeRoute(section.startsWith("/") ? section : "/" + section));
    if (target) return target.children;
  }
  return roots;
}

/** Depth-first tree order — the sequence Starlight's pagination walks. */
export function flattenTree(nodes: NavNode[]): NavPage[] {
  const out: NavPage[] = [];
  const walk = (list: NavNode[]) => {
    for (const node of list) {
      out.push(node);
      walk(node.children);
    }
  };
  walk(nodes);
  return out;
}

export function prevNext(
  items: NavPage[],
  section: string,
  pathname: string,
): { prev: NavPage | null; next: NavPage | null } {
  const flat = flattenTree(buildTree(items, section));
  const current = normalizeRoute(pathname);
  const idx = flat.findIndex((p) => normalizeRoute(p.route) === current);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

/**
 * Label for a language in the switcher. Precedence: theme locale string
 * keyed by the language code (t("de") → "Deutsch") → Intl.DisplayNames
 * endonym when the language_labels theme option is "name" → the code itself.
 */
export function langSwitchLabel(
  lang: string,
  t: ((key: string) => string) | undefined,
  mode: unknown,
): string {
  const fromLocale = t ? t(lang) : lang;
  if (fromLocale !== lang) return fromLocale;
  if (mode === "name") {
    try {
      return new Intl.DisplayNames([lang], { type: "language" }).of(lang) ?? lang;
    } catch {
      return lang;
    }
  }
  return lang;
}

export interface Heading {
  level: number;
  id: string;
  text: string;
}

/** GitHub-style slug for heading ids (marked emits none). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

/** Add ids to h1–h6 in rendered HTML (deduplicated GitHub-style). */
export function addHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(
    /<h([1-6])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g,
    (match, level, attrs = "", inner) => {
      if (/\sid=/.test(attrs)) return match;
      const text = inner.replace(/<[^>]+>/g, "");
      let id = slugify(text);
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );
}

/** Extract heading list from HTML that already carries ids. */
export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const re = /<h([1-6])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    headings.push({
      level: Number(m[1]),
      id: m[2],
      text: m[3].replace(/<[^>]+>/g, "").trim(),
    });
  }
  return headings;
}

/** Nested ToC item, mirroring Starlight's utils/generateToC.ts. */
export interface TocItem {
  depth: number;
  slug: string;
  text: string;
  children: TocItem[];
}

/**
 * Build the ToC tree from extracted headings, injecting the "Overview"
 * entry that links to the page title (#_top), like upstream generateToC.
 */
export function buildTocItems(
  headings: Heading[],
  overviewLabel: string,
  min = 2,
  max = 3,
): TocItem[] {
  const overview: TocItem = { depth: 2, slug: "_top", text: overviewLabel, children: [] };
  const toc: TocItem[] = [overview];
  for (const h of headings) {
    if (h.level < min || h.level > max) continue;
    const item: TocItem = { depth: h.level, slug: h.id, text: h.text, children: [] };
    // Walk down the last branch to find the injection point.
    let list = toc;
    while (true) {
      const last = list[list.length - 1];
      if (!last || last.depth >= item.depth || last === overview) break;
      list = last.children;
    }
    list.push(item);
  }
  return toc;
}
