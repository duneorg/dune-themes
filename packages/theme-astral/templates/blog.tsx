/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { postExcerpt, postPicUrl } from "../utils/content.ts";

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
  const themeName = config?.theme?.name ?? "astral";

  return (
    <LayoutComponent {...props}>
      <article id="work" class="panel">
        <header>
          <h2>{page.frontmatter.title ?? "Blog"}</h2>
        </header>
        {children}
        <section>
          <div class="row">
            {items.map((post, index) => {
              const fm = post.frontmatter;
              const pic = postPicUrl(fm, themeName, index);
              const excerpt = postExcerpt(fm);
              return (
                <div class="col-4 col-6-medium col-12-small" key={post.route}>
                  <a href={post.route} class="image fit">
                    <img src={pic} alt="" />
                  </a>
                  <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                  {excerpt && <p>{excerpt}</p>}
                </div>
              );
            })}
          </div>
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
      </article>
    </LayoutComponent>
  );
}
