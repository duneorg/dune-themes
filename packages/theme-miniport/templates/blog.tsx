/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { boxIconClass, postExcerpt } from "../utils/content.ts";

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
      <article class="wrapper style2">
        <div class="container">
          <header>
            <h2>{page.frontmatter.title ?? "Blog"}</h2>
          </header>
          {children}
          <div class="row aln-center">
            {items.map((post, index) => {
              const fm = post.frontmatter;
              const excerpt = postExcerpt(fm);
              return (
                <div class="col-4 col-6-medium col-12-small" key={post.route}>
                  <section class="box style1">
                    <span class={boxIconClass(index)}></span>
                    <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    {excerpt && <p>{excerpt}</p>}
                  </section>
                </div>
              );
            })}
          </div>
          {(pagination?.newer || pagination?.older) && (
            <footer>
              <ul class="actions">
                {pagination.older && (
                  <li><a href={pagination.older} class="button">← Older</a></li>
                )}
                {pagination.newer && (
                  <li><a href={pagination.newer} class="button">Newer →</a></li>
                )}
              </ul>
            </footer>
          )}
        </div>
      </article>
    </LayoutComponent>
  );
}
