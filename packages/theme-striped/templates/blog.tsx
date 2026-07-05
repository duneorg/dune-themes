/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

function formatStripedDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  const month = d.toLocaleString("en-US", { month: "short" });
  const monthTail = month.slice(1);
  const monthHead = month.slice(0, 1);
  return `<span class="month">${monthHead}<span>${monthTail}</span></span> <span class="day">${d.getDate()}</span><span class="year">, ${d.getFullYear()}</span>`;
}

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
      {page.frontmatter.title && (
        <header class="box post post-excerpt">
          <h2>{page.frontmatter.title}</h2>
          {page.frontmatter.metadata?.description && (
            <p>{String((page.frontmatter.metadata as Record<string, unknown>).description)}</p>
          )}
        </header>
      )}
      {children}
      {items.map((post, index) => {
        const fm = post.frontmatter;
        const date = fm.date ? String(fm.date) : "";
        const cover = typeof fm.cover === "string" ? fm.cover : undefined;
        const excerpt = (fm.metadata as Record<string, unknown> | undefined)?.description;
        const className = index === 0 ? "box post post-excerpt" : "box post post-excerpt";

        return (
          <article class={className} key={post.route}>
            <header>
              <h2><a href={post.route}>{String(fm.title ?? post.route)}</a></h2>
              {excerpt && <p>{String(excerpt)}</p>}
            </header>
            {date && (
              <div class="info">
                <span class="date" dangerouslySetInnerHTML={{ __html: formatStripedDate(date) }} />
              </div>
            )}
            {cover && (
              <a href={post.route} class="image featured">
                <img src={cover} alt="" />
              </a>
            )}
          </article>
        );
      })}
      {(pagination?.newer || pagination?.older) && (
        <div class="pagination">
          {pagination.older && <a href={pagination.older} class="button previous">Previous Page</a>}
          <div class="pages">
            {pagination.newer && <a href={pagination.newer}>Newer</a>}
            {pagination.older && <a href={pagination.older}>Older</a>}
          </div>
          {pagination.newer && <a href={pagination.newer} class="button next">Next Page</a>}
        </div>
      )}
    </LayoutComponent>
  );
}
