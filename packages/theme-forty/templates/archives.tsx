/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatFortyDate } from "../utils/content.ts";

export default function ArchivesTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection } = props;
  const items = collection?.items ?? [];
  const byYear = new Map<number, typeof items>();
  for (const post of items) {
    const raw = post.frontmatter.date;
    if (!raw) continue;
    const year = new Date(String(raw)).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(post);
  }
  const years = [...byYear.keys()].sort((a, b) => b - a);

  return (
    <LayoutComponent {...props} landing={false}>
      <section id="one">
        <div class="inner">
          <header class="major">
            <h1>{page.frontmatter.title}</h1>
          </header>
          {children}
          {years.map((year) => (
            <section key={year}>
              <header class="major"><h2>{year}</h2></header>
              <ul>
                {byYear.get(year)!.map((post) => {
                  const date = post.frontmatter.date ? String(post.frontmatter.date) : "";
                  return (
                    <li key={post.route}>
                      <a href={post.route}>{String(post.frontmatter.title ?? post.route)}</a>
                      {date && <> — <time datetime={date}>{formatFortyDate(date)}</time></>}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </LayoutComponent>
  );
}
