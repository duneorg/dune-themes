/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatReadOnlyDate, postExcerpt } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const continueLabel = tr("post.continue", "Read more");
  const items = collection?.items ?? [];

  return (
    <LayoutComponent {...props}>
      <section>
        <div class="container">
          <header class="major">
            <h2>{page.frontmatter.title ?? "Blog"}</h2>
          </header>
          {children}
          <div class="features">
            {items.map((post) => {
              const fm = post.frontmatter;
              const cover = safeHref(fm.cover);
              const excerpt = postExcerpt(fm);
              const date = fm.date ? String(fm.date) : "";
              return (
                <article key={post.route}>
                  {cover && (
                    <a href={post.route} class="image">
                      <img src={cover} alt="" />
                    </a>
                  )}
                  <div class="inner">
                    <h4><a href={post.route}>{String(fm.title ?? post.route)}</a></h4>
                    {date && <p><time datetime={date}>{formatReadOnlyDate(date)}</time></p>}
                    {excerpt && <p>{excerpt}</p>}
                    <ul class="actions">
                      <li><a href={post.route} class="button">{continueLabel}</a></li>
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
          {(pagination?.newer || pagination?.older) && (
            <ul class="actions">
              {pagination.older && (
                <li><a href={pagination.older} class="button">← {tr("pagination.older", "Older")}</a></li>
              )}
              {pagination.newer && (
                <li><a href={pagination.newer} class="button">{tr("pagination.newer", "Newer")} →</a></li>
              )}
            </ul>
          )}
        </div>
      </section>
    </LayoutComponent>
  );
}
