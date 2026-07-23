/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatPhotonDate, postExcerpt, postPicUrl } from "../utils/content.ts";
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
  config?: { theme?: { name?: string } };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, pathname, config, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "photon";
  const readMore = tr("post.read_more", "Read More");

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      {page.frontmatter.title && (
        <header class="major">
          <h2>{page.frontmatter.title}</h2>
        </header>
      )}
      {children}
      <div class="row gtr-150">
        {items.map((post, index) => {
          const fm = post.frontmatter;
          const cover = safeHref(fm.cover) ?? postPicUrl(fm, themeName, index);
          const excerpt = postExcerpt(fm);
          const date = fm.date ? String(fm.date) : "";
          return (
            <div class="col-6 col-12-medium" key={post.route}>
              <a href={post.route} class="image fit">
                <img src={cover} alt="" />
              </a>
              <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
              {date && <p><time datetime={date}>{formatPhotonDate(date)}</time></p>}
              {excerpt && <p>{excerpt}</p>}
              <ul class="actions special">
                <li><a href={post.route} class="button">{readMore}</a></li>
              </ul>
            </div>
          );
        })}
      </div>
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
    </LayoutComponent>
  );
}
