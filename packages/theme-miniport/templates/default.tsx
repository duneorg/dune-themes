/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { boxIconClass, themeImage } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

function withBase(basePath: string, path: string): string {
  const joined = `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
  return joined.replace(/([^:]\/)\/+/g, "$1") || "/";
}

export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
  site?: { title?: string; description?: string; basePath?: string };
  config?: { theme?: { name?: string } };
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, site, config, themeConfig, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "miniport";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const heroImage = safeHref(themeConfig?.hero_image) || img("pic00.jpg");
  const homeHeadline = (themeConfig?.home_headline as string) ||
    page.frontmatter.title || site?.title || "Miniport";
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const aboutHref = withBase(basePath, "/about");

  if (isHome) {
    const boxes = [
      { href: blogHref, title: tr("nav.blog", "Blog"), sub: tr("home.blog_sub", "Read sample posts") },
      { href: searchHref, title: tr("search.title", "Search"), sub: tr("home.search_sub", "Query demo pages") },
      { href: archivesHref, title: tr("nav.archives", "Archives"), sub: tr("home.archives_sub", "Browse by year") },
      { href: aboutHref, title: tr("nav.about", "About"), sub: tr("home.about_sub", "Learn more") },
    ];
    return (
      <LayoutComponent {...props}>
        <article id="top" class="wrapper style1">
          <div class="container">
            <div class="row">
              <div class="col-4 col-5-large col-12-medium">
                <span class="image fit">
                  <img src={heroImage} alt="" />
                </span>
              </div>
              <div class="col-8 col-7-large col-12-medium">
                <header>
                  <h1>{homeHeadline}</h1>
                </header>
                {site?.description && <p>{site.description}</p>}
                {children && <div data-dune-body>{children}</div>}
                <ul class="actions">
                  <li>
                    <a href={blogHref} class="button large scrolly">
                      {tr("cta.see_work", "See my work")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        <article class="wrapper style2">
          <div class="container">
            <header>
              <h2>{tr("home.explore", "Explore")}</h2>
            </header>
            <div class="row aln-center">
              {boxes.map((box, index) => (
                <div class="col-4 col-6-medium col-12-small" key={box.href}>
                  <section class="box style1">
                    <span class={boxIconClass(index)}></span>
                    <h3><a href={box.href}>{box.title}</a></h3>
                    <p>{box.sub}</p>
                  </section>
                </div>
              ))}
            </div>
          </div>
        </article>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <article class="wrapper style2">
        <div class="container">
          <header>
            <h2>{page.frontmatter.title}</h2>
          </header>
          {cover && (
            <span class="image fit">
              <img src={cover} alt="" />
            </span>
          )}
          <div data-dune-body>{children}</div>
        </div>
      </article>
    </LayoutComponent>
  );
}
