/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatEventuallyDate, postExcerpt } from "../utils/content.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, pathname } = props;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
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
          {pagination.newer && <a href={pagination.newer}>← Newer</a>}
          {pagination.older && <a href={pagination.older}>Older →</a>}
        </nav>
      )}
    </LayoutComponent>
  );
}
