/** @jsxImportSource preact */
import { formatDate, truncate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  collection?: {
    items?: Array<{ route: string; frontmatter: Record<string, unknown>; excerpt?: string }>;
    hasPrev?: boolean;
    hasNext?: boolean;
    page?: number;
  };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, themeConfig, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const subtitle = (themeConfig?.home_subtitle as string) ||
    (page.frontmatter.metadata as Record<string, unknown>)?.description;

  return (
    <LayoutComponent {...props}>
      {(page.frontmatter.title || subtitle) && (
        <div class="ink-intro">
          {page.frontmatter.title && <h1>{page.frontmatter.title}</h1>}
          {subtitle && <p>{String(subtitle)}</p>}
        </div>
      )}
      {children && <div class="ink-blog-lead">{children}</div>}
      <div class="post-entries">
        {(collection?.items ?? []).map((post) => {
          const date = post.frontmatter.date
            ? new Date(String(post.frontmatter.date)).getTime()
            : undefined;
          const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
          const summary = meta.description ??
            post.frontmatter.summary ??
            (post.excerpt ? truncate(String(post.excerpt).replace(/<[^>]+>/g, ""), 200) : "");
          return (
            <article class="post-entry" key={post.route}>
              <header class="entry-header">
                <h2>{String(post.frontmatter.title ?? post.route)}</h2>
              </header>
              {summary && (
                <div class="entry-content">
                  <p>{String(summary)}</p>
                </div>
              )}
              <footer class="entry-footer">
                {date && (
                  <time datetime={new Date(date).toISOString()}>
                    {formatDate(date, page.language ?? "en", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                )}
                {post.frontmatter.author && (
                  <span>&nbsp;·&nbsp;{String(post.frontmatter.author)}</span>
                )}
              </footer>
              <a
                class="entry-link"
                aria-label={`${tr("blog.read", "Read")} ${post.frontmatter.title}`}
                href={post.route}
              />
            </article>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="pagination" aria-label={tr("blog.pagination", "Pagination")}>
          {collection.hasPrev && (
            <a href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>
              ← {tr("blog.newer", "Newer")}
            </a>
          )}
          {collection.hasNext && (
            <a href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>
              {tr("blog.older", "Older")} →
            </a>
          )}
        </nav>
      )}
    </LayoutComponent>
  );
}
