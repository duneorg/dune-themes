/** @jsxImportSource preact */
import { h } from "preact";
import { formatDate, truncate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function BlogTemplate(props: any) {
  const { page, children, Layout, collection, themeConfig, t, pathname } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  // page.route is the page's own folder-derived route (e.g. "/home/"); the
  // homepage is served for request path "/" regardless of what that is —
  // pathname is the actual request path, route is not.
  const isHome = pathname === "/";
  // page.route already carries a trailing slash — appending "/page:N"
  // directly produces a double slash, same class of bug as the nav-link
  // matching fix elsewhere.
  const routeBase = page.route.endsWith("/") ? page.route.slice(0, -1) : page.route;
  // home_subtitle is a homepage-only setting — any other page using this
  // template (e.g. the /blog archive) falls back to its own description
  // instead of inheriting the homepage's subtitle.
  const subtitle = (isHome && themeConfig?.home_subtitle) || page.frontmatter.metadata?.description;

  return (
    <LayoutComponent {...props}>
      {(page.frontmatter.title || subtitle) && (
        <div class="home-info">
          {page.frontmatter.title && <h1>{page.frontmatter.title}</h1>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {children}
      <div class="post-entries">
        {(collection?.items ?? []).map((post: any) => {
          const date = post.frontmatter.date ? new Date(post.frontmatter.date).getTime() : undefined;
          const summary = post.frontmatter.metadata?.description ??
            (post.excerpt ? truncate(post.excerpt.replace(/<[^>]+>/g, ""), 180) : "");
          return (
            <article class="post-entry" key={post.route}>
              <header class="entry-header">
                <h2>{post.frontmatter.title}</h2>
              </header>
              {summary && <div class="entry-content"><p>{summary}</p></div>}
              <footer class="entry-footer">
                {date && (
                  <time datetime={new Date(date).toISOString()}>
                    {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                )}
                {post.frontmatter.author && <span>&nbsp;·&nbsp;{post.frontmatter.author}</span>}
              </footer>
              <a
                class="entry-link"
                aria-label={`${tr("post_link_aria_prefix", "post link to")} ${post.frontmatter.title}`}
                href={post.route}
              >
              </a>
            </article>
          );
        })}
      </div>
      {isHome && (
        <p class="see-all-posts">
          <a href="/blog/">{tr("see_all_posts", "See all posts →")}</a>
        </p>
      )}
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="pagination">
          {collection.hasPrev && (
            <a class="prev" href={`${routeBase}/page:${(collection.page ?? 2) - 1}`}>
              {tr("pagination_newer", "« Newer")}
            </a>
          )}
          {collection.hasNext && (
            <a class="next" href={`${routeBase}/page:${(collection.page ?? 1) + 1}`}>
              {tr("pagination_older", "Older »")}
            </a>
          )}
        </nav>
      )}
    </LayoutComponent>
  );
}
