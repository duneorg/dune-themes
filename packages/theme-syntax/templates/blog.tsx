/** @jsxImportSource preact */
import { formatDate, truncate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

function tagHref(basePath: string, tag: string): string {
  return `${basePath}/tags/${encodeURIComponent(tag)}/`.replace(/([^:]\/)\/+/g, "$1");
}

export default function BlogTemplate(props: TemplateProps & {
  children?: any;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  site?: { basePath?: string };
  collection?: {
    items?: Array<{ route: string; frontmatter: Record<string, unknown>; excerpt?: string }>;
    hasPrev?: boolean;
    hasNext?: boolean;
    page?: number;
  };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, themeConfig, t, site } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const basePath = site?.basePath ?? "";
  const subtitle = (themeConfig?.home_subtitle as string) ||
    (page.frontmatter.metadata as Record<string, unknown>)?.description;

  return (
    <LayoutComponent {...props}>
      <div class="syntax-index">
        <div class="syntax-index-head">
          <h1>{page.frontmatter.title || tr("blog.posts", "Posts")}</h1>
          {subtitle && <p>{String(subtitle)}</p>}
        </div>
        {children}
        <ul class="syntax-list">
          {(collection?.items ?? []).map((post) => {
            const date = post.frontmatter.date
              ? new Date(String(post.frontmatter.date)).getTime()
              : undefined;
            const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
            const summary = meta.description ??
              post.frontmatter.summary ??
              (post.excerpt ? truncate(String(post.excerpt).replace(/<[^>]+>/g, ""), 160) : "");
            const tags = (post.frontmatter.taxonomy as Record<string, string[]>)?.tag ??
              (Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags as string[] : []);
            return (
              <li key={post.route}>
                <div class="syntax-list-date">
                  {date &&
                    formatDate(date, page.language ?? "en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                </div>
                <div class="syntax-list-body">
                  <h2>
                    {post.frontmatter.pinned === true && (
                      <span class="syntax-pin">{tr("post.pinned", "Pinned")}</span>
                    )}
                    <a href={post.route}>{String(post.frontmatter.title)}</a>
                  </h2>
                  {summary && <p>{String(summary)}</p>}
                  {tags.length > 0 && (
                    <div class="syntax-tags">
                      {tags.slice(0, 4).map((tag) => (
                        <a class="syntax-tag" key={tag} href={tagHref(basePath, tag)}>
                          {tag}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
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
