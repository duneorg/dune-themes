/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatMinimaxingDate, postExcerpt } from "../utils/content.ts";

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
      <div id="main">
        <div class="container">
          <div class="row main-row">
            <div class="col-12">
              <section>
                <h2>{page.frontmatter.title ?? "Blog"}</h2>
                {children}
                {items.map((post) => {
                  const fm = post.frontmatter;
                  const date = fm.date ? String(fm.date) : "";
                  const excerpt = postExcerpt(fm);
                  return (
                    <article class="blog-post" key={post.route}>
                      <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                      {date && <p><time datetime={date}>{formatMinimaxingDate(date)}</time></p>}
                      {excerpt && <p>{excerpt}</p>}
                      <footer class="controls">
                        <a href={post.route} class="button">Continue Reading</a>
                      </footer>
                    </article>
                  );
                })}
                {(pagination?.newer || pagination?.older) && (
                  <nav class="pagination" aria-label="Pagination">
                    {pagination.older && <a href={pagination.older} class="button">← Older</a>}
                    {pagination.newer && <a href={pagination.newer} class="button">Newer →</a>}
                  </nav>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
