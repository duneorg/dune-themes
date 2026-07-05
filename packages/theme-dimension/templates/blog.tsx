/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatDimensionDate, postExcerpt } from "../utils/content.ts";

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
      <h2 class="major">{page.frontmatter.title ?? "Blog"}</h2>
      {children}
      {items.map((post) => {
        const fm = post.frontmatter;
        const date = fm.date ? String(fm.date) : "";
        const excerpt = postExcerpt(fm);
        return (
          <section key={post.route}>
            <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
            {date && <p><time datetime={date}>{formatDimensionDate(date)}</time></p>}
            {excerpt && <p>{excerpt}</p>}
            <ul class="actions">
              <li><a href={post.route} class="button small">Read</a></li>
            </ul>
            <hr />
          </section>
        );
      })}
      {(pagination?.newer || pagination?.older) && (
        <ul class="actions">
          {pagination.older && (
            <li><a href={pagination.older} class="button small">← Older</a></li>
          )}
          {pagination.newer && (
            <li><a href={pagination.newer} class="button small">Newer →</a></li>
          )}
        </ul>
      )}
    </LayoutComponent>
  );
}
