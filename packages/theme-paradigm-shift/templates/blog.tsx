/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatParadigmShiftDate, postExcerpt } from "../utils/content.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

export default function BlogTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, pathname, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const items = collection?.items ?? [];

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      {children}
      {items.map((post) => {
        const fm = post.frontmatter;
        const date = fm.date ? String(fm.date) : "";
        const excerpt = postExcerpt(fm);
        return (
          <section key={post.route}>
            <header>
              <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
            </header>
            <div class="content">
              {date && <p><time datetime={date}>{formatParadigmShiftDate(date)}</time></p>}
              {excerpt && <p>{excerpt}</p>}
            </div>
          </section>
        );
      })}
      {(pagination?.newer || pagination?.older) && (
        <ul class="actions">
          {pagination.older && (
            <li>
              <a href={pagination.older} class="button">
                ← {tr("pagination.older", "Older")}
              </a>
            </li>
          )}
          {pagination.newer && (
            <li>
              <a href={pagination.newer} class="button">
                {tr("pagination.newer", "Newer")} →
              </a>
            </li>
          )}
        </ul>
      )}
    </LayoutComponent>
  );
}
