/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatEscapeVelocityDate, postExcerpt } from "../utils/content.ts";
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
  const continueReading = tr("post.continue", "Continue Reading");

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main" class="wrapper style2">
        <div class="title">{page.frontmatter.title ?? "Blog"}</div>
        <div class="container">
          <div id="content">
            {children}
            <div class="row">
              {items.map((post) => {
                const fm = post.frontmatter;
                const date = fm.date ? String(fm.date) : "";
                const excerpt = postExcerpt(fm);
                const cover = safeHref(fm.cover);
                return (
                  <div class="col-6 col-12-medium" key={post.route}>
                    <section class="box">
                      {cover && (
                        <a href={post.route} class="image featured">
                          <img src={cover} alt="" />
                        </a>
                      )}
                      <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                      {date && (
                        <p><time datetime={date}>{formatEscapeVelocityDate(date)}</time></p>
                      )}
                      {excerpt && <p>{excerpt}</p>}
                      <ul class="actions">
                        <li>
                          <a href={post.route} class="button style1">{continueReading}</a>
                        </li>
                      </ul>
                    </section>
                  </div>
                );
              })}
            </div>
            {(pagination?.newer || pagination?.older) && (
              <ul class="actions">
                {pagination.older && (
                  <li>
                    <a href={pagination.older} class="button style2">
                      ← {tr("pagination.older", "Older")}
                    </a>
                  </li>
                )}
                {pagination.newer && (
                  <li>
                    <a href={pagination.newer} class="button style2">
                      {tr("pagination.newer", "Newer")} →
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
