/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatMultiverseDate, postExcerpt } from "../utils/content.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

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
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const items = collection?.items ?? [];

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <h2>{page.frontmatter.title ?? "Blog"}</h2>
      {children}
      {items.map((post) => {
        const fm = post.frontmatter;
        const date = fm.date ? String(fm.date) : "";
        const excerpt = postExcerpt(fm);
        return (
          <section key={post.route}>
            <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
            {date && <p><time datetime={date}>{formatMultiverseDate(date)}</time></p>}
            {excerpt && <p>{excerpt}</p>}
          </section>
        );
      })}
      {(pagination?.newer || pagination?.older) && (
        <nav class="pagination" aria-label={tr("pagination.label", "Pagination")}>
          {pagination.older && (
            <a href={pagination.older}>← {tr("pagination.older", "Older")}</a>
          )}
          {pagination.newer && (
            <a href={pagination.newer}>{tr("pagination.newer", "Newer")} →</a>
          )}
        </nav>
      )}
    </LayoutComponent>
  );
}
