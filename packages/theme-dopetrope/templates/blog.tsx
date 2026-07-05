/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatDopetropeDate, postExcerpt } from "../utils/content.ts";

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
      <section>
        <header class="major">
          <h2>{page.frontmatter.title ?? "The Blog"}</h2>
        </header>
        {children}
        <div class="row">
          {items.map((post) => {
            const fm = post.frontmatter;
            const date = fm.date ? String(fm.date) : "";
            const cover = typeof fm.cover === "string" ? fm.cover : undefined;
            const excerpt = postExcerpt(fm);
            return (
              <div class="col-6 col-12-small" key={post.route}>
                <section class="box">
                  {cover && (
                    <a href={post.route} class="image featured">
                      <img src={cover} alt="" />
                    </a>
                  )}
                  <header>
                    <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    {date && <p><time datetime={date}>{formatDopetropeDate(date)}</time></p>}
                  </header>
                  {excerpt && <p>{excerpt}</p>}
                  <footer>
                    <ul class="actions">
                      <li>
                        <a href={post.route} class="button icon solid fa-file-alt">Continue Reading</a>
                      </li>
                    </ul>
                  </footer>
                </section>
              </div>
            );
          })}
        </div>
        {(pagination?.newer || pagination?.older) && (
          <ul class="actions">
            {pagination.older && (
              <li><a href={pagination.older} class="button alt">← Older</a></li>
            )}
            {pagination.newer && (
              <li><a href={pagination.newer} class="button alt">Newer →</a></li>
            )}
          </ul>
        )}
      </section>
    </LayoutComponent>
  );
}
