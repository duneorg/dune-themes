/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import DefaultTemplate from "./default.tsx";
import { formatTwentyDate, postExcerpt } from "../utils/content.ts";

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
    return <DefaultTemplate {...props} Layout={LayoutComponent} />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <article id="main">
        <header class="special container">
          <span class="icon solid fa-newspaper"></span>
          <h2>{page.frontmatter.title ?? "Blog"}</h2>
        </header>
        <section class="wrapper style1 container special">
          {children}
          <div class="row">
            {items.map((post) => {
              const fm = post.frontmatter;
              const date = fm.date ? String(fm.date) : "";
              const excerpt = postExcerpt(fm);
              return (
                <div class="col-4 col-12-narrower" key={post.route}>
                  <section>
                    <header>
                      <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    </header>
                    {date && <p><time datetime={date}>{formatTwentyDate(date)}</time></p>}
                    {excerpt && <p>{excerpt}</p>}
                    <ul class="buttons">
                      <li><a href={post.route} class="button small">Continue Reading</a></li>
                    </ul>
                  </section>
                </div>
              );
            })}
          </div>
          {(pagination?.newer || pagination?.older) && (
            <ul class="buttons">
              {pagination.older && <li><a href={pagination.older} class="button">← Older</a></li>}
              {pagination.newer && <li><a href={pagination.newer} class="button">Newer →</a></li>}
            </ul>
          )}
        </section>
      </article>
    </LayoutComponent>
  );
}
