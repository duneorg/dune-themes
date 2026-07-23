/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { delayClass, postThumbUrl, spanClass } from "../utils/content.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

export default function BlogTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  config?: { theme?: { name?: string } };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, pathname, site, config, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "parallelism";

  if (isHome) {
    return <LayoutComponent {...props} />;
  }

  return (
    <LayoutComponent {...props}>
      <div class="items">
        <div class="item intro span-2">
          <h1>{page.frontmatter.title ?? site?.title ?? tr("nav.blog", "Blog")}</h1>
          {site?.description && <p>{site.description}</p>}
        </div>

        {items.map((post, index) => {
          const fm = post.frontmatter;
          const thumb = postThumbUrl(fm, themeName, index);
          return (
            <article
              class={`item thumb ${spanClass(index)} ${delayClass(index)}`}
              key={post.route}
            >
              <h2>{String(fm.title ?? post.route)}</h2>
              <a href={post.route} class="image">
                <img src={thumb} alt="" />
              </a>
            </article>
          );
        })}

        {(pagination?.newer || pagination?.older) && (
          <div class="item intro span-1 pagination-item">
            {pagination.older && (
              <p>
                <a href={pagination.older}>
                  &larr; {tr("pagination.older", "Older")}
                </a>
              </p>
            )}
            {pagination.newer && (
              <p>
                <a href={pagination.newer}>
                  {tr("pagination.newer", "Newer")} &rarr;
                </a>
              </p>
            )}
          </div>
        )}
      </div>
      {children}
    </LayoutComponent>
  );
}
