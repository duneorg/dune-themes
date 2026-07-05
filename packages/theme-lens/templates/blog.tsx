/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { postExcerpt, postThumbUrl } from "../utils/content.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  config?: { theme?: { name?: string } };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, config } = props;
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "lens";

  return (
    <LayoutComponent {...props}>
      {page.frontmatter.title && <h2 class="visually-hidden">{page.frontmatter.title}</h2>}
      {children}
      <section id="thumbnails">
        {items.map((post, index) => {
          const fm = post.frontmatter;
          const thumb = postThumbUrl(fm, themeName, index);
          const excerpt = postExcerpt(fm);
          return (
            <article key={post.route}>
              <a class="thumbnail" href={post.route}>
                <img src={thumb} alt="" />
              </a>
              <h2><a href={post.route}>{String(fm.title ?? post.route)}</a></h2>
              {excerpt && <p>{excerpt}</p>}
            </article>
          );
        })}
      </section>
      {(pagination?.newer || pagination?.older) && (
        <section class="content-panel pagination">
          {pagination.older && <p><a href={pagination.older}>&larr; Older</a></p>}
          {pagination.newer && <p><a href={pagination.newer}>Newer &rarr;</a></p>}
        </section>
      )}
    </LayoutComponent>
  );
}
