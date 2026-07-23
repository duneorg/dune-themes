/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatStoryDate, postExcerpt, themeImage } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

export default function BlogTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, pathname, config, themeConfig, t, site } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const items = collection?.items ?? [];
  const themeName = config?.theme?.name ?? "story";
  const img = (file: string) => themeImage(themeName, file);
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Story Demo";
  const creditHref = safeHref("https://html5up.net/story") ?? "https://html5up.net/story";
  const learnMore = tr("cta.learn_more", "Learn More");

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
                  <ul class="actions">
                    <li><a href={post.route} class="button">{learnMore}</a></li>
                  </ul>
                </section>
              );
            })}
          </div>
          {(pagination?.newer || pagination?.older) && (
            <ul class="actions stacked">
              {pagination.older && (
                <li>
                  <a href={pagination.older} class="button">
                    ← {tr("pagination.older", "Older")}
                  </a>
                </li>
              )}
              {pagination.newer && (
                <li>
                  <a href={pagination.newer} class="button">
                    {tr("pagination.newer", "Newer")} →
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </section>
      <footer class="wrapper style1 align-center">
        <div class="inner">
          <p>
            &copy; {new Date().getFullYear()} {copyrightName}.
            {showCredit && (
              <>
                {" "}{tr("credit.design", "Design")}:{" "}
                <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
              </>
            )}
          </p>
        </div>
      </footer>
    </LayoutComponent>
  );
}
