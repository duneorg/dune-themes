/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatFractalDate, postExcerpt, postPicUrl } from "../utils/content.ts";

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
  const themeName = config?.theme?.name ?? "fractal";
  const readMore = tr("post.read_more", "Read");

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section class="wrapper">
        <div class="inner alt">
          <header class="major">
            <h2>{page.frontmatter.title ?? "Blog"}</h2>
          </header>
          {children}
          {items.map((post, index) => {
            const fm = post.frontmatter;
            const pic = postPicUrl(fm, themeName, index);
            const excerpt = postExcerpt(fm);
            const date = fm.date ? String(fm.date) : "";
            return (
              <section class="spotlight" key={post.route}>
                <div class="image">
                  <img src={pic} alt="" />
                </div>
                <div class="content">
                  <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                  {date && <p><time datetime={date}>{formatFractalDate(date)}</time></p>}
                  {excerpt && <p>{excerpt}</p>}
                  <ul class="actions">
                    <li><a href={post.route} class="button small">{readMore}</a></li>
                  </ul>
                </div>
              </section>
            );
          })}
          {(pagination?.newer || pagination?.older) && (
            <ul class="actions special">
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
