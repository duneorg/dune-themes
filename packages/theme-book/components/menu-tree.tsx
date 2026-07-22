/** @jsxImportSource preact */
/** Port of _partials/docs/menu-filetree.html — server-rendered from navAll. */
import { h } from "preact";
import { navLabel, type NavNode, normalizeRoute } from "../utils/nav.ts";

function stripSlash(p: string): string {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

export default function MenuTree(
  { nodes, pathname }: { nodes: NavNode[]; pathname: string },
) {
  const current = stripSlash(pathname);
  return (
    <ul>
      {nodes.map((node) => {
        const active = stripSlash(normalizeRoute(node.route)) === current ||
          stripSlash(node.route) === current;
        return (
          <li key={node.route}>
            <a href={node.route} class={active ? "active" : undefined}>
              {navLabel(node)}
            </a>
            {node.children.length > 0 && (
              <MenuTree nodes={node.children} pathname={pathname} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
