/** @jsxImportSource preact */
import { h } from "preact";
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function BlogTemplate(props: any) {
  const { page, children, Layout, collection } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  return (
    <LayoutComponent {...props}>
      <div class="bx-article">
        <h1>{page.frontmatter.title}</h1>
        {children}
      </div>
      <div class="bx-card-grid bx-post-grid">
        {(collection?.items ?? []).map((post: any) => {
          const date = post.frontmatter.date ? new Date(post.frontmatter.date).getTime() : undefined;
          return (
            <a class="bx-card" href={post.route} key={post.route}>
              <h3>{post.frontmatter.title}</h3>
              {post.frontmatter.metadata?.description && <p>{post.frontmatter.metadata.description}</p>}
              {date && (
                <time datetime={new Date(date).toISOString()}>
                  {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
                </time>
              )}
            </a>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="bx-pagination">
          {collection.hasPrev && <a href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>« Newer</a>}
          {collection.hasNext && <a href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>Older »</a>}
        </nav>
      )}
    </LayoutComponent>
  );
}
