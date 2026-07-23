/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatEventuallyDate, postExcerpt } from "../utils/content.ts";

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
  const isHome = (() => { const r = pathname ?? page?.route ?? "/"; const n = r !== "/" && r.endsWith("/") ? r.slice(0, -1) : r; return n === "/" || n === "/home"; })();
  const items = collection?.items ?? [];

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      {page.frontmatter.title && <h2>{page.frontmatter.title}</h2>}
      {children}
      <ul class="post-list">
        {items.map((post) => {
          const fm = post.frontmatter;
          const excerpt = postExcerpt(fm);
          const date = fm.date ? String(fm.date) : "";
          return (
            <li key={post.route}>
              <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
              {date && (
                <div class="post-meta">
                  <time datetime={date}>{formatEventuallyDate(date)}</time>
                </div>
              )}
              {excerpt && <p>{excerpt}</p>}
            </li>
          );
        })}
      </ul>
      {(pagination?.newer || pagination?.older) && (
        <nav class="pagination" aria-label="Pagination">
          {pagination.newer && <a href={pagination.newer}>← {tr("pagination.newer", "Newer")}</a>}
          {pagination.older && <a href={pagination.older}>{tr("pagination.older", "Older")} →</a>}
        </nav>
      )}
    </LayoutComponent>
  );
}
