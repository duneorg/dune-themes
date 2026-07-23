/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatEtherealDate, postExcerpt } from "../utils/content.ts";

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
  const readMore = tr("post.read_more", "Read More");

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <header>
        <h2 class="major">{page.frontmatter.title ?? "Blog"}</h2>
      </header>
      {children}
      <div class="post-list">
        {items.map((post) => {
          const fm = post.frontmatter;
          const date = fm.date ? String(fm.date) : "";
          const excerpt = postExcerpt(fm);
          return (
            <article key={post.route}>
              <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
              {date && <p><time datetime={date}>{formatEtherealDate(date)}</time></p>}
              {excerpt && <p>{excerpt}</p>}
              <ul class="actions">
                <li><a href={post.route} class="button primary">{readMore}</a></li>
              </ul>
            </article>
          );
        })}
      </div>
      {(pagination?.newer || pagination?.older) && (
        <ul class="actions pagination">
          {pagination.older && (
            <li>
              <a href={pagination.older} class="button">
                ← {tr("pagination.older", "Older")}
              </a>
            </li>
          )}
          {pagination.newer && (
            <li>
              <a href={pagination.newer} class="button">
                {tr("pagination.newer", "Newer")} →
              </a>
            </li>
          )}
        </ul>
      )}
    </LayoutComponent>
  );
}
