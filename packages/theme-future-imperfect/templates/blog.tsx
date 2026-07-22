/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatFiDate, postExcerpt } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, themeConfig, config, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "future-imperfect";
  const authorName = (themeConfig?.author_name as string) || "Author";
  const authorAvatar = safeHref(themeConfig?.author_avatar) ||
    `/themes/${themeName}/static/html5up/images/avatar.jpg`;

  return (
    <LayoutComponent {...props}>
      {page.frontmatter.title && (
        <article class="post">
          <header>
            <div class="title">
              <h2>{page.frontmatter.title}</h2>
            </div>
          </header>
          {children && <div data-dune-body>{children}</div>}
        </article>
      )}
      {!page.frontmatter.title && children}

      {items.map((post) => {
        const fm = post.frontmatter;
        const date = fm.date ? String(fm.date) : "";
        const cover = safeHref(fm.cover);
        const excerpt = postExcerpt(fm);
        const subtitle = typeof fm.subtitle === "string" ? fm.subtitle : undefined;

        return (
          <article class="post" key={post.route}>
            <header>
              <div class="title">
                <h2><a href={post.route}>{String(fm.title ?? post.route)}</a></h2>
                {subtitle && <p>{subtitle}</p>}
              </div>
              {date && (
                <div class="meta">
                  <time class="published" datetime={date}>{formatFiDate(date)}</time>
                  <span class="author">
                    <span class="name">{authorName}</span>
                    <img src={authorAvatar} alt="" />
                  </span>
                </div>
              )}
            </header>
            {cover && (
              <a href={post.route} class="image featured">
                <img src={cover} alt="" />
              </a>
            )}
            {excerpt && <p>{excerpt}</p>}
            <footer>
              <ul class="actions">
                <li>
                  <a href={post.route} class="button large">
                    {tr("post.continue", "Continue Reading")}
                  </a>
                </li>
              </ul>
            </footer>
          </article>
        );
      })}

      {(pagination?.newer || pagination?.older) && (
        <ul class="actions pagination">
          {pagination.older && (
            <li>
              <a href={pagination.older} class="button">
                {tr("pagination.older", "← Older")}
              </a>
            </li>
          )}
          {pagination.newer && (
            <li>
              <a href={pagination.newer} class="button">
                {tr("pagination.newer", "Newer →")}
              </a>
            </li>
          )}
        </ul>
      )}
    </LayoutComponent>
  );
}
