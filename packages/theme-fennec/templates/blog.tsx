/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

function postLead(fm: Record<string, any>): string | undefined {
  return fm.summary ?? fm.metadata?.description ?? fm.description;
}

export default function BlogTemplate(props: any) {
  const { page, children, Layout, collection, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;

  return (
    <LayoutComponent {...props}>
      <div class="af-prose">
        <h1>{page.frontmatter.title}</h1>
        {children}
      </div>
      <div class="af-post-list">
        {(collection?.items ?? []).map((post: any) => {
          const date = post.frontmatter.date
            ? new Date(post.frontmatter.date).getTime()
            : undefined;
          const lead = postLead(post.frontmatter);
          return (
            <a class="af-post-card" href={post.route} key={post.route}>
              <div class="af-post-card-body">
                <h3>{post.frontmatter.title}</h3>
                {date && (
                  <time datetime={new Date(date).toISOString()}>
                    {formatDate(date, page.language ?? "en", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                )}
                {lead && <p>{lead}</p>}
                <span class="af-badge">{tr("post.read_more", "Read more")}</span>
              </div>
            </a>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="af-pagination" aria-label={tr("pagination.label", "Pagination")}>
          {collection.hasPrev && (
            <a href={`${page.route}/page:${(collection.page ?? 2) - 1}`}>
              {tr("pagination.newer", "Newer")}
            </a>
          )}
          {collection.hasNext && (
            <a href={`${page.route}/page:${(collection.page ?? 1) + 1}`}>
              {tr("pagination.older", "Older")}
            </a>
          )}
        </nav>
      )}
    </LayoutComponent>
  );
}
