/** @jsxImportSource preact */
import { h } from "preact";
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function BlogTemplate(props: any) {
  const { page, children, Layout, collection } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  return (
    <LayoutComponent {...props}>
      <div class="af-prose">
        <h1>{page.frontmatter.title}</h1>
        {children}
      </div>
      <div class="af-post-list">
        {(collection?.items ?? []).map((post: any) => {
          const date = post.frontmatter.date ? new Date(post.frontmatter.date).getTime() : undefined;
          return (
            <a class="af-post-card" href={post.route} key={post.route}>
              <div class="af-post-card-body">
                <h3>{post.frontmatter.title}</h3>
                {date && (
                  <time datetime={new Date(date).toISOString()}>
                    {formatDate(date, page.language ?? "en", { day: "numeric", month: "short", year: "numeric" })}
                  </time>
                )}
                {post.frontmatter.metadata?.description && <p>{post.frontmatter.metadata.description}</p>}
                <span class="af-badge">Read more →</span>
              </div>
            </a>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="af-pagination">
          {collection.hasPrev && <a href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>« Newer</a>}
          {collection.hasNext && <a href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>Older »</a>}
        </nav>
      )}
    </LayoutComponent>
  );
}
