/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatBigPictureDate, postExcerpt } from "../utils/content.ts";

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
      <header>
        <h2>{page.frontmatter.title ?? "Blog"}</h2>
      </header>
      {children}
      <div class="post-list">
        {items.map((post) => {
          const fm = post.frontmatter;
          const date = fm.date ? String(fm.date) : "";
          const excerpt = postExcerpt(fm);
          return (
            <article key={post.route}>
              <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
              {date && <p><time datetime={date}>{formatBigPictureDate(date)}</time></p>}
              {excerpt && <p>{excerpt}</p>}
              <ul class="actions">
                <li><a href={post.route} class="button style2">Read More</a></li>
              </ul>
            </article>
          );
        })}
      </div>
      {(pagination?.newer || pagination?.older) && (
        <ul class="actions special pagination">
          {pagination.older && (
            <li><a href={pagination.older} class="button style2">← Older</a></li>
          )}
          {pagination.newer && (
            <li><a href={pagination.newer} class="button style2">Newer →</a></li>
          )}
        </ul>
      )}
    </LayoutComponent>
  );
}
