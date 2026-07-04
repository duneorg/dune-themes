/** @jsxImportSource preact */
/** Port of _partials/docs/menu-filetree.html — server-rendered from navAll. */
import { h } from "preact";
import { navLabel, type NavNode, normalizeRoute } from "../utils/nav.ts";

export default function MenuTree(
  { nodes, pathname }: { nodes: NavNode[]; pathname: string },
) {
  const current = normalizeRoute(pathname);
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.route}>
          <a
            href={node.route}
            class={normalizeRoute(node.route) === current ? "active" : undefined}
          >
            {navLabel(node)}
          </a>
          {node.children.length > 0 && (
            <MenuTree nodes={node.children} pathname={pathname} />
          )}
        </li>
      ))}
    </ul>
  );
}
