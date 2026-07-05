/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";


export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination } = props;
  const items = collection?.items ?? [];

  return (
    <LayoutComponent
      {...props}
      recentPosts={items.slice(0, 5).map((post) => ({
        route: post.route,
        title: String(post.frontmatter.title ?? post.route),
      }))}
    >
      {page.frontmatter.title && <header><h2>{page.frontmatter.title}</h2></header>}
      {children}
      <section class="posts">
        {items.map((post) => {
          const fm = post.frontmatter;
          const date = fm.date ? String(fm.date) : "";
          const cover = typeof fm.cover === "string" ? fm.cover : undefined;
          const excerpt = (fm.metadata as Record<string, unknown> | undefined)?.description;
          return (
            <article key={post.route} class="post">
              <header>
                
                <h2><a href={post.route}>{String(fm.title ?? post.route)}</a></h2>
                {excerpt && <p>{String(excerpt)}</p>}
              </header>
              {cover && (
                <a href={post.route} class="image featured">
                  <img src={cover} alt="" />
                </a>
              )}
            </article>
          );
        })}
      </section>
      {(pagination?.newer || pagination?.older) && (
        <div class="pagination">
          {pagination.older && <a href={pagination.older} class="button">← Older</a>}
          {pagination.newer && <a href={pagination.newer} class="button">Newer →</a>}
        </div>
      )}
    </LayoutComponent>
  );
}
