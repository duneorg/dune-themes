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

  return (
    <LayoutComponent {...props}>
      <div class="gale-section-title" style="padding-top:3rem">
        <h2>{page.frontmatter.title || "Latest posts"}</h2>
        {(themeConfig?.home_subtitle as string) && <p>{themeConfig?.home_subtitle as string}</p>}
      </div>
      {children}
      <div class="gale-blog-grid">
        {(collection?.items ?? []).map((post) => {
          const date = post.frontmatter.date ? new Date(String(post.frontmatter.date)).getTime() : undefined;
          const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
          const summary = meta.description ??
            (post.excerpt ? truncate(post.excerpt.replace(/<[^>]+>/g, ""), 140) : "");
          const cover = typeof post.frontmatter.cover === "string" ? post.frontmatter.cover : undefined;
          return (
            <article class="gale-post-card" key={post.route}>
              {cover && <img src={cover} alt="" />}
              <div class="gale-post-card-body">
                <h2><a href={post.route}>{String(post.frontmatter.title ?? post.route)}</a></h2>
                {summary && <p>{String(summary)}</p>}
                {date && (
                  <time datetime={new Date(date).toISOString()}>
                    {formatDate(date, page.language ?? "en", { day: "numeric", month: "short", year: "numeric" })}
                  </time>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="pagination" aria-label="Pagination" style="justify-content:center;padding-bottom:3rem">
          {collection.hasPrev && <a href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>← Newer</a>}
          {collection.hasNext && <a href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>Older →</a>}
        </nav>
      )}
    </LayoutComponent>
  );
}
