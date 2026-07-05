/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatStoryDate, themeImage } from "../utils/content.ts";

export default function ArchivesTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  config?: { theme?: { name?: string } };
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, config, themeConfig } = props;
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "story";
  const img = (file: string) => themeImage(themeName, file);
  const showCredit = themeConfig?.show_html5up_credit !== false;
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
      <section class="banner style1 orient-left content-align-left image-position-right">
        <div class="content"><h1>{page.frontmatter.title}</h1></div>
        <div class="image"><img src={img("spotlight01.jpg")} alt="" /></div>
      </section>
      <section class="wrapper style1 align-center">
        <div class="inner">
          {children}
          {years.map((year) => (
            <section key={year}>
              <h2>{year}</h2>
              <ul>
                {byYear.get(year)!.map((post) => {
                  const date = post.frontmatter.date ? String(post.frontmatter.date) : "";
                  return (
                    <li key={post.route}>
                      <a href={post.route}>{String(post.frontmatter.title ?? post.route)}</a>
                      {date && <> — <time datetime={date}>{formatStoryDate(date)}</time></>}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>
      {showCredit && (
        <footer class="wrapper style1 align-center">
          <div class="inner"><p>Design: <a href="https://html5up.net/story">HTML5 UP</a></p></div>
        </footer>
      )}
    </LayoutComponent>
  );
}
