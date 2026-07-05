/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatLandedDate, postExcerpt } from "../utils/content.ts";

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
      <div id="main" class="wrapper style1">
        <div class="container">
          <header class="major">
            <h2>{page.frontmatter.title ?? "Blog"}</h2>
          </header>
          <section id="content">
            {children}
            <div class="row">
              {items.map((post) => {
                const fm = post.frontmatter;
                const date = fm.date ? String(fm.date) : "";
                const excerpt = postExcerpt(fm);
                const cover = typeof fm.cover === "string" ? fm.cover : undefined;
                return (
                  <div class="col-6 col-12-medium" key={post.route}>
                    <section>
                      {cover && (
                        <a href={post.route} class="image fit"><img src={cover} alt="" /></a>
                      )}
                      <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                      {date && <p><time datetime={date}>{formatLandedDate(date)}</time></p>}
                      {excerpt && <p>{excerpt}</p>}
                      <ul class="actions">
                        <li><a href={post.route} class="button">Continue Reading</a></li>
                      </ul>
                    </section>
                  </div>
                );
              })}
            </div>
            {(pagination?.newer || pagination?.older) && (
              <ul class="actions">
                {pagination.older && <li><a href={pagination.older} class="button">← Older</a></li>}
                {pagination.newer && <li><a href={pagination.newer} class="button">Newer →</a></li>}
              </ul>
            )}
          </section>
        </div>
      </div>
    </LayoutComponent>
  );
}
