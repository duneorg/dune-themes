/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { delayClass, postThumbUrl, spanClass } from "../utils/content.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, site, config } = props;
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "parallelism";

  return (
    <LayoutComponent {...props}>
      <div class="items">
        <div class="item intro span-2">
          <h1>{page.frontmatter.title ?? site?.title ?? "Blog"}</h1>
          {site?.description && <p>{site.description}</p>}
        </div>

        {items.map((post, index) => {
          const fm = post.frontmatter;
          const thumb = postThumbUrl(fm, themeName, index);
          return (
            <article
              class={`item thumb ${spanClass(index)} ${delayClass(index)}`}
              key={post.route}
            >
              <h2>{String(fm.title ?? post.route)}</h2>
              <a href={post.route} class="image">
                <img src={thumb} alt="" />
              </a>
            </article>
          );
        })}

        {(pagination?.newer || pagination?.older) && (
          <div class="item intro span-1 pagination-item">
            {pagination.older && <p><a href={pagination.older}>&larr; Older</a></p>}
            {pagination.newer && <p><a href={pagination.newer}>Newer &rarr;</a></p>}
          </div>
        )}
      </div>
      {children}
    </LayoutComponent>
  );
}
