/** @jsxImportSource preact */
import { h } from "preact";
import { formatDate, truncate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function BlogTemplate(props: any) {
  const { page, children, Layout, collection, themeConfig } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const subtitle = themeConfig?.home_subtitle || page.frontmatter.metadata?.description;

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
              <a class="entry-link" aria-label={`post link to ${post.frontmatter.title}`} href={post.route}></a>
            </article>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="pagination">
          {collection.hasPrev && (
            <a class="prev" href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>« Newer</a>
          )}
          {collection.hasNext && (
            <a class="next" href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>Older »</a>
          )}
        </nav>
      )}
    </LayoutComponent>
  );
}
