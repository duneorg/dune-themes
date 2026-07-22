/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function BlogTemplate(props: any) {
  const { page, children, Layout, collection, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;

  return (
    <LayoutComponent {...props}>
      <div class="bx-article">
        <h1>{page.frontmatter.title}</h1>
        {children}
      </div>
      <div class="bx-card-grid bx-post-grid">
        {(collection?.items ?? []).map((post: any) => {
          const date = post.frontmatter.date
            ? new Date(post.frontmatter.date).getTime()
            : undefined;
          const lead = post.frontmatter.summary ??
            post.frontmatter.metadata?.description;
          return (
            <a class="bx-card" href={post.route} key={post.route}>
              <h3>{post.frontmatter.title}</h3>
              {lead && <p>{lead}</p>}
              {date && (
                <time datetime={new Date(date).toISOString()}>
                  {formatDate(date, page.language ?? "en", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              )}
            </a>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="bx-pagination" aria-label={tr("pagination.label", "Pagination")}>
          {collection.hasPrev && (
            <a href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>
              {tr("pagination.newer", "« Newer")}
            </a>
          )}
          {collection.hasNext && (
            <a href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>
              {tr("pagination.older", "Older »")}
            </a>
          )}
        </nav>
      )}
    </LayoutComponent>
  );
}
