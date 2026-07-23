/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatAlphaDate, postExcerpt } from "../utils/content.ts";
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
  const learnMore = tr("cta.learn_more", "Learn More");

  if (isHome) {
    return <LayoutComponent {...props} />;
  }

  return (
    <LayoutComponent {...props}>
      <header>
        <h2>{page.frontmatter.title ?? tr("nav.blog", "The Blog")}</h2>
      </header>
      {children}
      <div class="row">
        {items.map((post) => {
          const fm = post.frontmatter;
          const date = fm.date ? String(fm.date) : "";
          const cover = safeHref(fm.cover);
          const excerpt = postExcerpt(fm);
          return (
            <div class="col-6 col-12-narrower" key={post.route}>
              <section class="box special">
                {cover && (
                  <span class="image featured">
                    <img src={cover} alt="" />
                  </span>
                )}
                <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                {date && <p><time datetime={date}>{formatAlphaDate(date)}</time></p>}
                {excerpt && <p>{excerpt}</p>}
                <ul class="actions special">
                  <li><a href={post.route} class="button alt">{learnMore}</a></li>
                </ul>
              </section>
            </div>
          );
        })}
      </div>
      {(pagination?.newer || pagination?.older) && (
        <ul class="actions special">
          {pagination.older && (
            <li>
              <a href={pagination.older} class="button alt">
                ← {tr("pagination.older", "Older")}
              </a>
            </li>
          )}
          {pagination.newer && (
            <li>
              <a href={pagination.newer} class="button alt">
                {tr("pagination.newer", "Newer")} →
              </a>
            </li>
          )}
        </ul>
      )}
    </LayoutComponent>
  );
}
