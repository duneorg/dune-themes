/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { postExcerpt, postThumbUrl } from "../utils/content.ts";

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
  const { page, children, collection, pagination, pathname, config, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "lens";

  if (isHome) {
    return <LayoutComponent {...props} />;
  }

  return (
    <LayoutComponent {...props}>
      {page.frontmatter.title && <h2 class="visually-hidden">{page.frontmatter.title}</h2>}
      {children}
      <section id="thumbnails">
        {items.map((post, index) => {
          const fm = post.frontmatter;
          const thumb = postThumbUrl(fm, themeName, index);
          const excerpt = postExcerpt(fm);
          return (
            <article key={post.route}>
              <a class="thumbnail" href={post.route} data-position="center">
                <img src={thumb} alt="" />
              </a>
              <h2><a href={post.route}>{String(fm.title ?? post.route)}</a></h2>
              {excerpt && <p>{excerpt}</p>}
            </article>
          );
        })}
      </section>
      {(pagination?.newer || pagination?.older) && (
        <section class="content-panel pagination">
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
        </section>
      )}
    </LayoutComponent>
  );
}
