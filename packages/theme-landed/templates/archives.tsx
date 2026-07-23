/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatLandedDate } from "../utils/content.ts";

export default function ArchivesTemplate(props: TemplateProps & {
  children?: ComponentChildren;
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
      <div id="main" class="wrapper style1">
        <div class="container">
          <header class="major">
            <h2>{page.frontmatter.title}</h2>
          </header>
          <section id="content">
            {children}
            {years.map((year) => (
              <section key={year}>
                <header class="major"><h3>{year}</h3></header>
                <ul class="alt">
                  {byYear.get(year)!.map((post) => {
                    const date = post.frontmatter.date ? String(post.frontmatter.date) : "";
                    return (
                      <li key={post.route}>
                        <a href={post.route}>{String(post.frontmatter.title ?? post.route)}</a>
                        {date && <> — <time datetime={date}>{formatLandedDate(date)}</time></>}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </section>
        </div>
      </div>
    </LayoutComponent>
  );
}
