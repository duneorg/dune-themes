/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatSolidStateDate, postExcerpt } from "../utils/content.ts";
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

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section id="wrapper">
        <header>
          <div class="inner">
            <h2>{page.frontmatter.title ?? "Blog"}</h2>
          </div>
        </header>
        <div class="wrapper">
          <div class="inner">
            {children}
            <section class="features">
              {items.map((post) => {
                const fm = post.frontmatter;
                const date = fm.date ? String(fm.date) : "";
                const cover = safeHref(fm.cover);
                const excerpt = postExcerpt(fm);
                return (
                  <article key={post.route}>
                    {cover && (
                      <a href={post.route} class="image"><img src={cover} alt="" /></a>
                    )}
                    <h3 class="major">
                      <a href={post.route}>{String(fm.title ?? post.route)}</a>
                    </h3>
                    {date && <p><time datetime={date}>{formatSolidStateDate(date)}</time></p>}
                    {excerpt && <p>{excerpt}</p>}
                    <a href={post.route} class="special">{readMore}</a>
                  </article>
                );
              })}
            </section>
            {(pagination?.newer || pagination?.older) && (
              <ul class="actions">
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
        </div>
      </section>
    </LayoutComponent>
  );
}
