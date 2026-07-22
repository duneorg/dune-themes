/** @jsxImportSource preact */
import { formatDate, truncate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

function postTags(fm: Record<string, unknown>): string[] {
  return (fm.taxonomy as Record<string, string[]>)?.tag ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
}

function tagHref(basePath: string, tag: string): string {
  return `${basePath}/tags/${encodeURIComponent(tag)}/`.replace(/([^:]\/)\/+/g, "$1");
}

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
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
  const items = collection?.items ?? [];
  const [featured, ...rest] = items;
  const subtitle = (themeConfig?.home_subtitle as string) ||
    (page.frontmatter.metadata as Record<string, unknown>)?.description;
  const featuredCover = featured ? safeHref(featured.frontmatter.cover) : undefined;
  const featuredTags = featured ? postTags(featured.frontmatter) : [];

  return (
    <LayoutComponent {...props}>
      <div class="salon-masthead">
        {page.frontmatter.title && <h1>{page.frontmatter.title}</h1>}
        {subtitle && <p>{String(subtitle)}</p>}
      </div>
      {children}
      {featured && (
        <section class="salon-featured">
          <article class="salon-featured-card">
            {featuredCover && (
              <a class="salon-featured-media" href={featured.route} tabindex={-1} aria-hidden="true">
                <img src={featuredCover} alt="" />
              </a>
            )}
            {!featuredCover && <div class="salon-featured-media salon-featured-fallback" aria-hidden="true" />}
            <div class="salon-featured-body">
              {featuredTags[0] && (
                <a class="tag" href={tagHref(basePath, featuredTags[0])}>
                  {featuredTags[0]}
                </a>
              )}
              <h2>
                <a href={featured.route}>{String(featured.frontmatter.title)}</a>
              </h2>
              {(featured.frontmatter.metadata as Record<string, unknown>)?.description && (
                <p>{String((featured.frontmatter.metadata as Record<string, unknown>).description)}</p>
              )}
              {!((featured.frontmatter.metadata as Record<string, unknown>)?.description) &&
                featured.frontmatter.summary && (
                <p>{String(featured.frontmatter.summary)}</p>
              )}
              <div class="salon-featured-meta">
                {featured.frontmatter.date &&
                  formatDate(
                    new Date(String(featured.frontmatter.date)).getTime(),
                    page.language ?? "en",
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
              </div>
            </div>
          </article>
        </section>
      )}
      <div class="salon-grid">
        {rest.map((post) => {
          const date = post.frontmatter.date
            ? new Date(String(post.frontmatter.date)).getTime()
            : undefined;
          const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
          const summary = meta.description ??
            post.frontmatter.summary ??
            (post.excerpt ? truncate(String(post.excerpt).replace(/<[^>]+>/g, ""), 120) : "");
          const tags = postTags(post.frontmatter);
          const cover = safeHref(post.frontmatter.cover);
          return (
            <article class="salon-card" key={post.route}>
              {cover && (
                <a href={post.route} tabindex={-1} aria-hidden="true">
                  <img src={cover} alt="" />
                </a>
              )}
              <div class="salon-card-body">
                {tags[0] && (
                  <a class="tag" href={tagHref(basePath, tags[0])}>{tags[0]}</a>
                )}
                <h3><a href={post.route}>{String(post.frontmatter.title)}</a></h3>
                {summary && <p>{String(summary)}</p>}
                <div class="salon-card-meta">
                  {date &&
                    formatDate(date, page.language ?? "en", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav
          class="pagination"
          aria-label={tr("blog.pagination", "Pagination")}
          style="justify-content:center;padding-bottom:2rem"
        >
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
    </LayoutComponent>
  );
}
