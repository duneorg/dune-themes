/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatHighlightsDate, postExcerpt } from "../utils/content.ts";

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
      <header class="major">
        <h2>{page.frontmatter.title ?? "Blog"}</h2>
      </header>
      {children}
      {items.map((post) => {
        const fm = post.frontmatter;
        const date = fm.date ? String(fm.date) : "";
        const excerpt = postExcerpt(fm);
        return (
          <section key={post.route}>
            <header>
              <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
              {date && <p><time datetime={date}>{formatHighlightsDate(date)}</time></p>}
            </header>
            {excerpt && <p>{excerpt}</p>}
            <ul class="actions">
              <li><a href={post.route} class="button">Continue Reading</a></li>
            </ul>
          </section>
        );
      })}
      {(pagination?.newer || pagination?.older) && (
        <ul class="actions special">
          {pagination.older && <li><a href={pagination.older} class="button">← Older</a></li>}
          {pagination.newer && <li><a href={pagination.newer} class="button">Newer →</a></li>}
        </ul>
      )}
    </LayoutComponent>
  );
}
