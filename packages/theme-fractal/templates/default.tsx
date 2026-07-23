/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";
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
  config?: { theme?: { name?: string } };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, t, site } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "fractal";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const learnMore = tr("post.read_more", "Learn More");
  const getStarted = tr("cta.get_started", "Get Started");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="one" class="wrapper style2 special">
          <header class="major">
            <h2>{String(fm.title ?? "Welcome")}</h2>
            {subtitle && <p>{String(subtitle)}</p>}
          </header>
          {children && <div data-dune-body>{children}</div>}
          <ul class="actions special">
            <li><a href={blogHref} class="button wide primary">{getStarted}</a></li>
          </ul>
        </section>

        <section id="two" class="wrapper">
          <div class="inner alt">
            <section class="spotlight">
              <div class="image"><img src={img("pic01.jpg")} alt="" /></div>
              <div class="content">
                <h3>{tr("nav.blog", "Projects")}</h3>
                <p>{tr("home.blog_sub", "Browse sample portfolio posts and demos.")}</p>
                <ul class="actions">
                  <li><a href={blogHref} class="button">{learnMore}</a></li>
                </ul>
              </div>
            </section>
            <section class="spotlight">
              <div class="image"><img src={img("pic02.jpg")} alt="" /></div>
              <div class="content">
                <h3>{tr("search.title", "Search")}</h3>
                <p>{tr("home.search_sub", "Query demo pages through the search template.")}</p>
                <ul class="actions">
                  <li><a href={searchHref} class="button">{learnMore}</a></li>
                </ul>
              </div>
            </section>
            <section class="spotlight">
              <div class="image"><img src={img("pic03.jpg")} alt="" /></div>
              <div class="content">
                <h3>{tr("nav.archives", "Archives")}</h3>
                <p>{tr("home.archives_sub", "Browse all posts grouped by year.")}</p>
                <ul class="actions">
                  <li><a href={archivesHref} class="button">{learnMore}</a></li>
                </ul>
              </div>
            </section>
            <section class="special">
              <ul class="icons">
                <li>
                  <a href={blogHref} class="icon solid fa-folder">
                    <span class="label">{tr("nav.blog", "Projects")}</span>
                  </a>
                </li>
                <li>
                  <a href={aboutHref} class="icon solid fa-info-circle">
                    <span class="label">{tr("nav.about", "About")}</span>
                  </a>
                </li>
                <li>
                  <a href={searchHref} class="icon solid fa-search">
                    <span class="label">{tr("search.title", "Search")}</span>
                  </a>
                </li>
                <li>
                  <a href={archivesHref} class="icon solid fa-archive">
                    <span class="label">{tr("nav.archives", "Archives")}</span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section class="wrapper">
        <div class="inner">
          <header class="major">
            <h2>{String(fm.title ?? "")}</h2>
            {subtitle && <p>{String(subtitle)}</p>}
          </header>
          {cover && (
            <span class="image fit">
              <img src={cover} alt="" />
            </span>
          )}
          <div data-dune-body>{children}</div>
        </div>
      </section>
    </LayoutComponent>
  );
}
