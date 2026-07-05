/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatSolidStateDate, postExcerpt } from "../utils/content.ts";

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
      <section id="wrapper">
        <header>
          <div class="inner">
            <h2>{page.frontmatter.title ?? "Blog"}</h2>
          </div>
        </header>
        <div class="wrapper">
          <div class="inner">
            {children}
            <section class="features">
              {items.map((post) => {
                const fm = post.frontmatter;
                const date = fm.date ? String(fm.date) : "";
                const cover = typeof fm.cover === "string" ? fm.cover : undefined;
                const excerpt = postExcerpt(fm);
                return (
                  <article key={post.route}>
                    {cover && (
                      <a href={post.route} class="image"><img src={cover} alt="" /></a>
                    )}
                    <h3 class="major"><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    {date && <p><time datetime={date}>{formatSolidStateDate(date)}</time></p>}
                    {excerpt && <p>{excerpt}</p>}
                    <a href={post.route} class="special">Learn more</a>
                  </article>
                );
              })}
            </section>
            {(pagination?.newer || pagination?.older) && (
              <ul class="actions">
                {pagination.older && <li><a href={pagination.older} class="button">← Older</a></li>}
                {pagination.newer && <li><a href={pagination.newer} class="button">Newer →</a></li>}
              </ul>
            )}
          </div>
        </div>
      </section>
    </LayoutComponent>
  );
}
