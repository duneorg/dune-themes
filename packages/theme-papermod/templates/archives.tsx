/** @jsxImportSource preact */
/** Port of layouts/archives.html — posts grouped by year and month with
 * anchor-linked headers. Drive it with a `collection:` block. */
import { h } from "preact";
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";
import PostMeta from "../components/post-meta.tsx";

export default function ArchivesTemplate(props: any) {
  const { page, children, Layout, collection, themeConfig, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const fm = page.frontmatter;
  const lang = page.language ?? "en";

  // Group by year, then month (newest first), like GroupByPublishDate
  const byYear = new Map<number, Map<number, any[]>>();
  for (const post of collection?.items ?? []) {
    if (!post.frontmatter.date) continue;
    const d = new Date(post.frontmatter.date);
    const year = d.getFullYear();
    const month = d.getMonth();
    if (!byYear.has(year)) byYear.set(year, new Map());
    const months = byYear.get(year)!;
    if (!months.has(month)) months.set(month, []);
    months.get(month)!.push(post);
  }
  const years = [...byYear.keys()].sort((a, b) => b - a);
  const monthName = (y: number, m: number) =>
    new Intl.DateTimeFormat(lang, { month: "long" }).format(new Date(y, m, 1));

  return (
    <LayoutComponent {...props} bodyClass="list">
      <header class="page-header">
        <h1>{fm.title}</h1>
        {(fm.metadata?.description ?? fm.description) && (
          <div class="post-description">{fm.metadata?.description ?? fm.description}</div>
        )}
      </header>
      {children}
      {years.map((year) => {
        const months = byYear.get(year)!;
        const count = [...months.values()].reduce((n, posts) => n + posts.length, 0);
        return (
          <div class="archive-year" key={year}>
            <h2 class="archive-year-header" id={String(year)}>
              <a class="archive-header-link" href={`#${year}`}>{year}</a>
              <sup class="archive-count">&nbsp;{count}</sup>
            </h2>
            {[...months.keys()].sort((a, b) => b - a).map((month) => {
              const posts = months.get(month)!;
              const label = monthName(year, month);
              return (
                <div class="archive-month" key={month}>
                  <h3 class="archive-month-header" id={`${year}-${label}`}>
                    <a class="archive-header-link" href={`#${year}-${label}`}>{label}</a>
                    <sup class="archive-count">&nbsp;{posts.length}</sup>
                  </h3>
                  <div class="archive-posts">
                    {posts.map((post: any) => (
                      <div class="archive-entry" key={post.route}>
                        <h3 class="archive-entry-title entry-hint-parent">
                          {post.frontmatter.title}
                        </h3>
                        <div class="archive-meta">
                          <PostMeta page={post} themeConfig={{ ...themeConfig, show_reading_time: false }} t={t} />
                        </div>
                        <a class="entry-link" aria-label={`post link to ${post.frontmatter.title}`} href={post.route}></a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </LayoutComponent>
  );
}
