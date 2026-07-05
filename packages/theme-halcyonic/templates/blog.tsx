/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatHalcyonicDate, postExcerpt } from "../utils/content.ts";

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
      <section>
        <header>
          <h2>{page.frontmatter.title ?? "Blog"}</h2>
        </header>
        {children}
        {items.map((post) => {
          const fm = post.frontmatter;
          const date = fm.date ? String(fm.date) : "";
          const excerpt = postExcerpt(fm);
          return (
            <section key={post.route}>
              <header>
                <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                {date && <p><time datetime={date}>{formatHalcyonicDate(date)}</time></p>}
              </header>
              {excerpt && <p>{excerpt}</p>}
            </section>
          );
        })}
        {(pagination?.newer || pagination?.older) && (
          <nav class="pagination" aria-label="Pagination">
            {pagination.older && <a href={pagination.older} class="button">← Older</a>}
            {pagination.newer && <a href={pagination.newer} class="button">Newer →</a>}
          </nav>
        )}
      </section>
    </LayoutComponent>
  );
}
