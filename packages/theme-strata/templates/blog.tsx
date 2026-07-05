/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { postExcerpt } from "../utils/content.ts";

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
      <section id="two">
        {page.frontmatter.title && <h2>{page.frontmatter.title}</h2>}
        {children}
        <div class="row">
          {items.map((post) => {
            const fm = post.frontmatter;
            const cover = typeof fm.cover === "string" ? fm.cover : undefined;
            const excerpt = postExcerpt(fm);
            return (
              <article class="col-6 col-12-xsmall work-item" key={post.route}>
                {cover && (
                  <a href={post.route} class="image fit thumb">
                    <img src={cover} alt="" />
                  </a>
                )}
                <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                {excerpt && <p>{excerpt}</p>}
              </article>
            );
          })}
        </div>
        {(pagination?.newer || pagination?.older) && (
          <ul class="actions">
            {pagination.older && (
              <li><a href={pagination.older} class="button">← Older</a></li>
            )}
            {pagination.newer && (
              <li><a href={pagination.newer} class="button">Newer →</a></li>
            )}
          </ul>
        )}
      </section>
    </LayoutComponent>
  );
}
