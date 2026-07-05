/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatStoryDate, postExcerpt, themeImage } from "../utils/content.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, pathname, config, themeConfig } = props;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "story";
  const img = (file: string) => themeImage(themeName, file);
  const showCredit = themeConfig?.show_html5up_credit !== false;

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section class="banner style1 orient-left content-align-left image-position-right">
        <div class="content">
          <h1>{page.frontmatter.title ?? "Blog"}</h1>
        </div>
        <div class="image"><img src={img("spotlight01.jpg")} alt="" /></div>
      </section>
      <section class="wrapper style1 align-center">
        <div class="inner">
          {children}
          <div class="items style1 medium">
            {items.map((post) => {
              const fm = post.frontmatter;
              const date = fm.date ? String(fm.date) : "";
              const excerpt = postExcerpt(fm);
              return (
                <section key={post.route}>
                  <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                  {date && <p><time datetime={date}>{formatStoryDate(date)}</time></p>}
                  {excerpt && <p>{excerpt}</p>}
                  <ul class="actions"><li><a href={post.route} class="button">Learn More</a></li></ul>
                </section>
              );
            })}
          </div>
          {(pagination?.newer || pagination?.older) && (
            <ul class="actions stacked">
              {pagination.older && <li><a href={pagination.older} class="button">← Older</a></li>}
              {pagination.newer && <li><a href={pagination.newer} class="button">Newer →</a></li>}
            </ul>
          )}
        </div>
      </section>
      {showCredit && (
        <footer class="wrapper style1 align-center">
          <div class="inner">
            <p>Design: <a href="https://html5up.net/story">HTML5 UP</a></p>
          </div>
        </footer>
      )}
    </LayoutComponent>
  );
}
