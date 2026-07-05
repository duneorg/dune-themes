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
    <LayoutComponent {...props}>
      <article class="prose">
        <h1>{page.frontmatter.title}</h1>
        {children}
        <div class="entry-list">
          {items.map((post) => (
            <article class="entry" key={post.route}>
              <h2><a href={post.route}>{String(post.frontmatter.title ?? post.route)}</a></h2>
              {post.frontmatter.date && (
                <div class="post-meta"><time>{String(post.frontmatter.date)}</time></div>
              )}
              {post.frontmatter.metadata?.description && (
                <p>{String((post.frontmatter.metadata as Record<string, unknown>).description)}</p>
              )}
            </article>
          ))}
        </div>
        {(pagination?.newer || pagination?.older) && (
          <nav class="pagination" aria-label="Pagination">
            {pagination.newer && <a href={pagination.newer}>← Newer</a>}
            {pagination.older && <a href={pagination.older}>Older →</a>}
          </nav>
        )}
      </article>
    </LayoutComponent>
  );
}
