/** @jsxImportSource preact */
import { formatDate, truncate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
  collection?: {
    items?: Array<{ route: string; frontmatter: Record<string, unknown>; excerpt?: string }>;
    hasPrev?: boolean;
    hasNext?: boolean;
    page?: number;
  };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, themeConfig } = props;
  const subtitle = (themeConfig?.home_subtitle as string) ||
    (page.frontmatter.metadata as Record<string, unknown>)?.description;

  return (
    <LayoutComponent {...props}>
      <div class="syntax-index">
        <div class="syntax-index-head">
          <h1>{page.frontmatter.title || "Posts"}</h1>
          {subtitle && <p>{String(subtitle)}</p>}
        </div>
        {children}
        <ul class="syntax-list">
          {(collection?.items ?? []).map((post) => {
            const date = post.frontmatter.date ? new Date(String(post.frontmatter.date)).getTime() : undefined;
            const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
            const summary = meta.description ??
              (post.excerpt ? truncate(post.excerpt.replace(/<[^>]+>/g, ""), 160) : "");
            const tags = (post.frontmatter.taxonomy as Record<string, string[]>)?.tag ??
              (Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags as string[] : []);
            return (
              <li key={post.route}>
                <div class="syntax-list-date">
                  {date && formatDate(date, page.language ?? "en", { month: "short", day: "numeric", year: "numeric" })}
                </div>
                <div class="syntax-list-body">
                  <h2>
                    {post.frontmatter.pinned === true && <span class="syntax-pin">📌 </span>}
                    <a href={post.route}>{String(post.frontmatter.title)}</a>
                  </h2>
                  {summary && <p>{String(summary)}</p>}
                  {tags.length > 0 && (
                    <div class="syntax-tags">
                      {tags.slice(0, 4).map((t) => (
                        <a class="syntax-tag" key={t} href={`/tags/${encodeURIComponent(t)}/`}>{t}</a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {(collection?.hasPrev || collection?.hasNext) && (
          <nav class="pagination" aria-label="Pagination">
            {collection?.hasPrev && <a href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>← Newer</a>}
            {collection?.hasNext && <a href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>Older →</a>}
          </nav>
        )}
      </div>
    </LayoutComponent>
  );
}
