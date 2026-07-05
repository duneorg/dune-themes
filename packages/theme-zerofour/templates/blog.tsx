/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatZerofourDate, postExcerpt } from "../utils/content.ts";

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
      <article>
        <header class="major">
          <h2>{page.frontmatter.title}</h2>
        </header>
        {children}
        <section class="box article-list">
          <ul class="post-list">
            {items.map((post) => {
              const fm = post.frontmatter;
              const excerpt = postExcerpt(fm);
              const date = fm.date ? String(fm.date) : "";
              return (
                <li key={post.route}>
                  <article class="box excerpt">
                    <header>
                      {date && <span class="date">{formatZerofourDate(date)}</span>}
                      <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    </header>
                    {excerpt && <p>{excerpt}</p>}
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
        {(pagination?.newer || pagination?.older) && (
          <nav class="pagination" aria-label="Pagination">
            {pagination.newer && <a href={pagination.newer} class="button medium">← Newer</a>}
            {pagination.older && <a href={pagination.older} class="button medium alt">Older →</a>}
          </nav>
        )}
      </article>
    </LayoutComponent>
  );
}
