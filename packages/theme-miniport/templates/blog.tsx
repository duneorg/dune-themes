/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { boxIconClass, postExcerpt } from "../utils/content.ts";

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
    return <LayoutComponent {...props} />;
  }

  return (
    <LayoutComponent {...props}>
      <article class="wrapper style2">
        <div class="container">
          <header>
            <h2>{page.frontmatter.title ?? tr("nav.blog", "Blog")}</h2>
          </header>
          {children}
          <div class="row aln-center">
            {items.map((post, index) => {
              const fm = post.frontmatter;
              const excerpt = postExcerpt(fm);
              return (
                <div class="col-4 col-6-medium col-12-small" key={post.route}>
                  <section class="box style1">
                    <span class={boxIconClass(index)}></span>
                    <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    {excerpt && <p>{excerpt}</p>}
                    <ul class="actions special">
                      <li>
                        <a href={post.route} class="button">
                          {tr("post.read_more", "Read More")}
                        </a>
                      </li>
                    </ul>
                  </section>
                </div>
              );
            })}
          </div>
          {(pagination?.newer || pagination?.older) && (
            <footer>
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
            </footer>
          )}
        </div>
      </article>
    </LayoutComponent>
  );
}
