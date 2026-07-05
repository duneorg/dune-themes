/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatArcanaDate, postExcerpt } from "../utils/content.ts";

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
    return <LayoutComponent {...props} />;
  }

  return (
    <LayoutComponent {...props}>
      <section class="wrapper style1">
        <div class="container">
          <div id="content">
            {page.frontmatter.title && (
              <header class="major">
                <h2>{page.frontmatter.title}</h2>
              </header>
            )}
            {children}
            <div class="row">
              {items.map((post) => {
                const fm = post.frontmatter;
                const date = fm.date ? String(fm.date) : "";
                const cover = typeof fm.cover === "string" ? fm.cover : undefined;
                const excerpt = postExcerpt(fm);
                return (
                  <section class="col-6 col-12-narrower" key={post.route}>
                    <div class="box post">
                      {cover && (
                        <a href={post.route} class="image left">
                          <img src={cover} alt="" />
                        </a>
                      )}
                      <div class="inner">
                        <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                        {date && <p><time datetime={date}>{formatArcanaDate(date)}</time></p>}
                        {excerpt && <p>{excerpt}</p>}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
            {(pagination?.newer || pagination?.older) && (
              <ul class="actions">
                {pagination.older && (
                  <li><a href={pagination.older} class="button alt">← Older</a></li>
                )}
                {pagination.newer && (
                  <li><a href={pagination.newer} class="button alt">Newer →</a></li>
                )}
              </ul>
            )}
          </div>
        </div>
      </section>
    </LayoutComponent>
  );
}
