/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatFiDate, postExcerpt } from "../utils/content.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, themeConfig, config } = props;
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "future-imperfect";
  const authorName = (themeConfig?.author_name as string) || "Author";
  const authorAvatar = (themeConfig?.author_avatar as string) ||
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
        const cover = typeof fm.cover === "string" ? fm.cover : undefined;
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
                <li><a href={post.route} class="button large">Continue Reading</a></li>
              </ul>
            </footer>
          </article>
        );
      })}

      {(pagination?.newer || pagination?.older) && (
        <ul class="actions pagination">
          {pagination.older && (
            <li><a href={pagination.older} class="button">← Older</a></li>
          )}
          {pagination.newer && (
            <li><a href={pagination.newer} class="button">Newer →</a></li>
          )}
        </ul>
      )}
    </LayoutComponent>
  );
}
