/** @jsxImportSource preact */
import { formatDate, truncate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

function postTags(fm: Record<string, unknown>): string[] {
  return (fm.taxonomy as Record<string, string[]>)?.tag ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
}

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
  const items = collection?.items ?? [];
  const [featured, ...rest] = items;
  const subtitle = (themeConfig?.home_subtitle as string) ||
    (page.frontmatter.metadata as Record<string, unknown>)?.description;

  return (
    <LayoutComponent {...props}>
      <div class="salon-masthead">
        {page.frontmatter.title && <h1>{page.frontmatter.title}</h1>}
        {subtitle && <p>{String(subtitle)}</p>}
      </div>
      {children}
      {featured && (
        <section class="salon-featured">
          <a class="salon-featured-link" href={featured.route}>
            {typeof featured.frontmatter.cover === "string" && (
              <img src={featured.frontmatter.cover as string} alt="" />
            )}
            <div class="salon-featured-body">
              {postTags(featured.frontmatter)[0] && (
                <span class="tag">{postTags(featured.frontmatter)[0]}</span>
              )}
              <h2>{String(featured.frontmatter.title)}</h2>
              {(featured.frontmatter.metadata as Record<string, unknown>)?.description && (
                <p>{String((featured.frontmatter.metadata as Record<string, unknown>).description)}</p>
              )}
              <div class="salon-featured-meta">
                {featured.frontmatter.date && formatDate(new Date(String(featured.frontmatter.date)).getTime(), page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>
          </a>
        </section>
      )}
      <div class="salon-grid">
        {rest.map((post) => {
          const date = post.frontmatter.date ? new Date(String(post.frontmatter.date)).getTime() : undefined;
          const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
          const summary = meta.description ??
            (post.excerpt ? truncate(post.excerpt.replace(/<[^>]+>/g, ""), 120) : "");
          const tags = postTags(post.frontmatter);
          const cover = typeof post.frontmatter.cover === "string" ? post.frontmatter.cover : undefined;
          return (
            <article class="salon-card" key={post.route}>
              {cover && <a href={post.route}><img src={cover} alt="" /></a>}
              <div class="salon-card-body">
                {tags[0] && <a class="tag" href={`/tag:${encodeURIComponent(tags[0])}`}>{tags[0]}</a>}
                <h3><a href={post.route}>{String(post.frontmatter.title)}</a></h3>
                {summary && <p>{String(summary)}</p>}
                <div class="salon-card-meta">
                  {date && formatDate(date, page.language ?? "en", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="pagination" aria-label="Pagination" style="justify-content:center;padding-bottom:2rem">
          {collection?.hasPrev && <a href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>← Newer</a>}
          {collection?.hasNext && <a href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>Older →</a>}
        </nav>
      )}
    </LayoutComponent>
  );
}
