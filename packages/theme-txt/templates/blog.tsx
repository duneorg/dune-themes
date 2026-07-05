/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatTxtDate, postExcerpt } from "../utils/content.ts";

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
      <div class="row gtr-200">
        <div class="col-12">
          {page.frontmatter.title && (
            <header>
              <h2 class="major"><span>{page.frontmatter.title}</span></h2>
            </header>
          )}
          {children}
          <section class="box features">
            <div>
              <div class="row">
                {items.map((post) => {
                  const fm = post.frontmatter;
                  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
                  const excerpt = postExcerpt(fm);
                  const date = fm.date ? String(fm.date) : "";
                  return (
                    <div class="col-6 col-12-medium col-12-small" key={post.route}>
                      <section class="box feature">
                        {cover && (
                          <a href={post.route} class="image featured">
                            <img src={cover} alt="" />
                          </a>
                        )}
                        <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                        {date && (
                          <p><time datetime={date}>{formatTxtDate(date)}</time></p>
                        )}
                        {excerpt && <p>{excerpt}</p>}
                      </section>
                    </div>
                  );
                })}
              </div>
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
        </div>
      </div>
    </LayoutComponent>
  );
}
