/** Sidebar tree from the full nav list (TemplateProps.navAll). */

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
export function buildNavTree(items: NavPage[]): NavNode[] {
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
  return roots;
}

/** True if `route` is `ancestorRoute` itself or nested under it. */
export function isRouteWithin(route: string, ancestorRoute: string): boolean {
  const r = normalizeRoute(route);
  const a = normalizeRoute(ancestorRoute);
  return r === a || r.startsWith(a);
}
