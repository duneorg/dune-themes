/** @jsxImportSource preact */
import { formatDate, truncate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: any;
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
  const defaultAuthor = (themeConfig?.default_author as string) ?? "";
  const defaultAvatar = safeHref(themeConfig?.default_avatar) ?? "";

  return (
    <LayoutComponent {...props}>
      <div class="herald-feed">
        <div class="herald-feed-head">
          <h2>{page.frontmatter.title || tr("blog.latest", "Latest")}</h2>
        </div>
        {children}
        {(collection?.items ?? []).map((post) => {
          const date = post.frontmatter.date
            ? new Date(String(post.frontmatter.date)).getTime()
            : undefined;
          const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
          const summary = meta.description ??
            post.frontmatter.summary ??
            (post.excerpt ? truncate(String(post.excerpt).replace(/<[^>]+>/g, ""), 200) : "");
          const author = typeof post.frontmatter.author === "string"
            ? post.frontmatter.author
            : defaultAuthor;
          const avatar = safeHref(post.frontmatter.avatar) ?? defaultAvatar;
          const cover = safeHref(post.frontmatter.cover);
          return (
            <article class="herald-card" key={post.route}>
              <div class="herald-card-text">
                <h3><a href={post.route}>{String(post.frontmatter.title)}</a></h3>
                {summary && <p>{String(summary)}</p>}
                <div class="herald-card-meta">
                  {avatar && <img class="herald-avatar" src={avatar} alt="" />}
                  {author && <span>{author}</span>}
                  {date && (
                    <>
                      <span aria-hidden="true">·</span>
                      <time datetime={new Date(date).toISOString()}>
                        {formatDate(date, page.language ?? "en", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </>
                  )}
                </div>
              </div>
              {cover && (
                <div class="herald-card-cover">
                  <a href={post.route} tabindex={-1} aria-hidden="true">
                    <img src={cover} alt="" />
                  </a>
                </div>
              )}
            </article>
          );
        })}
        {(collection?.hasPrev || collection?.hasNext) && (
          <nav class="pagination" aria-label={tr("blog.pagination", "Pagination")}>
            {collection?.hasPrev && (
              <a href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>
                ← {tr("blog.newer", "Newer")}
              </a>
            )}
            {collection?.hasNext && (
              <a href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>
                {tr("blog.older", "Older")} →
              </a>
            )}
          </nav>
        )}
      </div>
    </LayoutComponent>
  );
}
