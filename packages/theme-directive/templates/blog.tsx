/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatDirectiveDate, postExcerpt } from "../utils/content.ts";

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
      <div class="box container">
        <header class="major">
          <h2>{page.frontmatter.title ?? "Blog"}</h2>
        </header>
        {children}
        <div class="post-list">
          {items.map((post) => {
            const fm = post.frontmatter;
            const date = fm.date ? String(fm.date) : "";
            const excerpt = postExcerpt(fm);
            return (
              <section class="feature left" key={post.route}>
                <div class="content">
                  <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                  {date && <p><time datetime={date}>{formatDirectiveDate(date)}</time></p>}
                  {excerpt && <p>{excerpt}</p>}
                  <ul class="actions">
                    <li><a href={post.route} class="button alt">Read More</a></li>
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
        {(pagination?.newer || pagination?.older) && (
          <ul class="actions special pagination">
            {pagination.older && (
              <li><a href={pagination.older} class="button alt">← Older</a></li>
            )}
            {pagination.newer && (
              <li><a href={pagination.newer} class="button alt">Newer →</a></li>
            )}
          </ul>
        )}
      </div>
    </LayoutComponent>
  );
}
