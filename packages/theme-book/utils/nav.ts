/** Sidebar tree + document order from the full nav list (TemplateProps.navAll). */

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

/** Depth-first tree order — the sequence prev/next walks. */
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
