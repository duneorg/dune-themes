/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { postExcerpt, tileStyleClass } from "../utils/content.ts";

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
      {page.frontmatter.title && <h1>{page.frontmatter.title}</h1>}
      {children}
      <section class="tiles">
        {items.map((post, index) => {
          const fm = post.frontmatter;
          const cover = typeof fm.cover === "string" ? fm.cover : undefined;
          const excerpt = postExcerpt(fm);
          return (
            <article class={tileStyleClass(index)} key={post.route}>
              {cover && (
                <span class="image">
                  <img src={cover} alt="" />
                </span>
              )}
              <a href={post.route}>
                <h2>{String(fm.title ?? post.route)}</h2>
                {excerpt && (
                  <div class="content">
                    <p>{excerpt}</p>
                  </div>
                )}
              </a>
            </article>
          );
        })}
      </section>
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
    </LayoutComponent>
  );
}
