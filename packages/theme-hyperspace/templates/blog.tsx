/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatHyperspaceDate, postExcerpt } from "../utils/content.ts";

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
  const items = collection?.items ?? [];

  return (
    <LayoutComponent {...props}>
      <h2>{page.frontmatter.title ?? "Blog"}</h2>
      {children}
      <div class="features">
        {items.map((post) => {
          const fm = post.frontmatter;
          const date = fm.date ? String(fm.date) : "";
          const excerpt = postExcerpt(fm);
          return (
            <section key={post.route}>
              <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
              {date && <p><time datetime={date}>{formatHyperspaceDate(date)}</time></p>}
              {excerpt && <p>{excerpt}</p>}
              <ul class="actions">
                <li><a href={post.route} class="button">{tr("cta.learn_more", "Learn more")}</a></li>
              </ul>
            </section>
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
    </LayoutComponent>
  );
}
