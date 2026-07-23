/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatFortyDate, postExcerpt } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

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

  // Home uses default.tsx for the tile landing; if a blog template is
  // somehow bound to home, keep the banner chrome without a listing.
  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section id="one">
        <div class="inner">
          <header class="major">
            <h1>{page.frontmatter.title ?? "Blog"}</h1>
          </header>
          {children}
          <div class="post-list">
            {items.map((post) => {
              const fm = post.frontmatter;
              const date = fm.date ? String(fm.date) : "";
              const excerpt = postExcerpt(fm);
              const cover = safeHref(fm.cover);
              return (
                <article key={post.route}>
                  {cover && (
                    <a href={post.route} class="image">
                      <img src={cover} alt="" />
                    </a>
                  )}
                  <header class="major">
                    <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    {date && <p><time datetime={date}>{formatFortyDate(date)}</time></p>}
                  </header>
                  {excerpt && <p>{excerpt}</p>}
                  <ul class="actions">
                    <li><a href={post.route} class="button">{readMore}</a></li>
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
        </div>
      </section>
    </LayoutComponent>
  );
}
