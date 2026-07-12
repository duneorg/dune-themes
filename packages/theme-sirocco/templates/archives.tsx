/** @jsxImportSource preact */
import { h } from "preact";
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

/** Year-grouped post list for the shared blog fixture's archives page. */
export default function ArchivesTemplate(props: any) {
  const { page, children, Layout, collection, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const LayoutComponent = Layout ?? StaticLayout;

  const byYear = new Map<number, any[]>();
  for (const post of collection?.items ?? []) {
    if (!post.frontmatter.date) continue;
    const year = new Date(post.frontmatter.date).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(post);
  }
  const years = [...byYear.keys()].sort((a, b) => b - a);

  return (
    <LayoutComponent {...props}>
      <header class="post-header">
        <h1 class="post-title">{page.frontmatter.title}</h1>
      </header>
      {children}
      <div class="archives">
        {years.map((year) => (
          <section class="archive-year" key={year}>
            <h2>{year}</h2>
            <ul class="archive-list">
              {byYear.get(year)!.map((post: any) => {
                const date = new Date(post.frontmatter.date).getTime();
                const linkLabel = tr("post_link_to", "post link to {title}")
                  .replace("{title}", post.frontmatter.title ?? "");
                return (
                  <li key={post.route}>
                    <time datetime={new Date(date).toISOString()}>
                      {formatDate(date, page.language ?? "en", { day: "numeric", month: "short" })}
                    </time>
                    <a href={post.route} aria-label={linkLabel}>{post.frontmatter.title}</a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </LayoutComponent>
  );
}
