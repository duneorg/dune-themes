/** @jsxImportSource preact */
import { h } from "preact";

/** Strip a trailing slash for active-state comparison (routes with page
 * folders serve with one, nav hrefs are written without). */
export function stripTrailingSlash(p: string): string {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

/**
 * Top navigation from the `nav` prop, with `aria-current` on the active item.
 */
export default function Nav({ nav, pathname, page }: any) {
  const canonicalPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripTrailingSlash(canonicalPath);
  return (
    <nav aria-label="Site">
      <ul>
      {(nav ?? []).map((item: any) => {
        const active = normalizedPath === stripTrailingSlash(item.route) ||
          (item.route !== "/" && canonicalPath.startsWith(item.route + "/"));
        return (
          <li key={item.route}>
            <a href={item.route} aria-current={active ? "page" : undefined}>
              {item.navTitle ?? item.title}
            </a>
          </li>
        );
      })}
      </ul>
    </nav>
  );
}
