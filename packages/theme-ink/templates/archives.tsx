/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function ArchivesTemplate(props: any) {
  const { page, children, Layout, collection } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const fm = page.frontmatter;
  const lang = page.language ?? "en";

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
    <LayoutComponent {...props}>
      <article class="post-single">
        <header class="post-header">
          <h1 class="post-title">{fm.title}</h1>
          {fm.metadata?.description && (
            <div class="post-description">{fm.metadata.description}</div>
          )}
        </header>
        <div class="post-content">
          {children}
          {years.map((year) => {
            const months = byYear.get(year)!;
            return (
              <div class="archive-year" key={year}>
                <h2 id={String(year)}>{year}</h2>
                {[...months.keys()].sort((a, b) => b - a).map((month) => {
                  const posts = months.get(month)!;
                  return (
                    <div class="archive-month" key={month}>
                      <h3>{monthName(year, month)}</h3>
                      <ul class="archive-posts">
                        {posts.map((post: any) => (
                          <li key={post.route}>
                            <a href={post.route}>{post.frontmatter.title}</a>
                            <time datetime={new Date(post.frontmatter.date).toISOString()}>
                              {formatDate(
                                new Date(post.frontmatter.date).getTime(),
                                lang,
                                { day: "numeric", month: "short" },
                              )}
                            </time>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </article>
    </LayoutComponent>
  );
}
