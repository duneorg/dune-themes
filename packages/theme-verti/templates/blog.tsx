/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import DefaultTemplate from "./default.tsx";
import { formatVertiDate, postExcerpt } from "../utils/content.ts";

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
      <div id="main-wrapper">
        <div class="container">
          <div id="content">
            <article>
              <h2>{page.frontmatter.title ?? "Blog"}</h2>
              {children}
              {items.map((post) => {
                const fm = post.frontmatter;
                const date = fm.date ? String(fm.date) : "";
                const excerpt = postExcerpt(fm);
                return (
                  <section key={post.route}>
                    <header>
                      <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    </header>
                    {date && <p><time datetime={date}>{formatVertiDate(date)}</time></p>}
                    {excerpt && <p>{excerpt}</p>}
                  </section>
                );
              })}
              {(pagination?.newer || pagination?.older) && (
                <ul class="actions">
                  {pagination.older && <li><a href={pagination.older} class="button">← Older</a></li>}
                  {pagination.newer && <li><a href={pagination.newer} class="button">Newer →</a></li>}
                </ul>
              )}
            </article>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
