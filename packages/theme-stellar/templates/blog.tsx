/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatStellarDate, postExcerpt } from "../utils/content.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, pathname, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const isHome = (() => { const r = pathname ?? page?.route ?? "/"; const n = r !== "/" && r.endsWith("/") ? r.slice(0, -1) : r; return n === "/" || n === "/home"; })();
  const items = collection?.items ?? [];

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main">
        <section class="main">
          <header class="major"><h2>{page.frontmatter.title ?? "Blog"}</h2></header>
          {children}
          <div class="row">
            {items.map((post) => {
              const fm = post.frontmatter;
              const date = fm.date ? String(fm.date) : "";
              const excerpt = postExcerpt(fm);
              return (
                <div class="col-6 col-12-medium" key={post.route}>
                  <section>
                    <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    {date && <p><time datetime={date}>{formatStellarDate(date)}</time></p>}
                    {excerpt && <p>{excerpt}</p>}
                    <ul class="actions"><li><a href={post.route} class="button">{tr("cta.learn_more", "Learn More")}</a></li></ul>
                  </section>
                </div>
              );
            })}
          </div>
          {(pagination?.newer || pagination?.older) && (
            <ul class="actions">
              {pagination.older && <li><a href={pagination.older} class="button">← {tr("pagination.older", "Older")}</a></li>}
              {pagination.newer && <li><a href={pagination.newer} class="button">{tr("pagination.newer", "Newer")} →</a></li>}
            </ul>
          )}
        </section>
      </div>
    </LayoutComponent>
  );
}
