/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function ArchivesTemplate(props: any) {
  const { page, children, Layout, collection, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
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
      <div class="gale-page-hero">
        <h1>{fm.title ?? tr("archives.title", "Archives")}</h1>
      </div>
      <article class="gale-page-content prose">
        {children}
        {years.map((year) => {
          const months = byYear.get(year)!;
          const monthKeys = [...months.keys()].sort((a, b) => b - a);
          return (
            <div class="gale-archive-year" key={year}>
              <h2>{year}</h2>
              {monthKeys.map((month) => (
                <div class="gale-archive-month" key={`${year}-${month}`}>
                  <h3>{monthName(year, month)}</h3>
                  <ul>
                    {months.get(month)!.map((post: any) => {
                      const d = post.frontmatter.date
                        ? new Date(post.frontmatter.date).getTime()
                        : undefined;
                      return (
                        <li key={post.route}>
                          {d && (
                            <time datetime={new Date(d).toISOString()}>
                              {formatDate(d, lang, { day: "numeric", month: "short" })}
                            </time>
                          )}
                          <a href={post.route}>{post.frontmatter.title ?? post.route}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          );
        })}
      </article>
    </LayoutComponent>
  );
}
