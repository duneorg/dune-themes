/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatHeliosDate, postExcerpt } from "../utils/content.ts";

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
      <div class="wrapper style1">
        <div class="container">
          <article id="main" class="special">
            <header>
              <h2><a href={page.route}>{page.frontmatter.title ?? "Blog"}</a></h2>
            </header>
            {children}
            <div class="row post-list">
              {items.map((post) => {
                const fm = post.frontmatter;
                const date = fm.date ? String(fm.date) : "";
                const excerpt = postExcerpt(fm);
                const cover = typeof fm.cover === "string" ? fm.cover : undefined;
                return (
                  <div class="col-6 col-12-medium" key={post.route}>
                    <section class="special">
                      {cover && (
                        <a href={post.route} class="image featured">
                          <img src={cover} alt="" />
                        </a>
                      )}
                      <header>
                        <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                        {date && <p><time datetime={date}>{formatHeliosDate(date)}</time></p>}
                      </header>
                      {excerpt && <p>{excerpt}</p>}
                      <footer>
                        <a href={post.route} class="button">Continue Reading</a>
                      </footer>
                    </section>
                  </div>
                );
              })}
            </div>
            {(pagination?.newer || pagination?.older) && (
              <footer class="pagination">
                {pagination.older && (
                  <a href={pagination.older} class="button">← Older</a>
                )}
                {pagination.newer && (
                  <a href={pagination.newer} class="button">Newer →</a>
                )}
              </footer>
            )}
          </article>
        </div>
      </div>
    </LayoutComponent>
  );
}
