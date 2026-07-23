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
  const themeName = config?.theme?.name ?? "photon";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const getStarted = tr("cta.get_started", "Get Started");
  const learnMore = tr("post.read_more", "Learn More");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="one" class="main style1 special">
          <div class="container">
            <header class="major">
              <h2>{String(fm.title ?? "Welcome")}</h2>
            </header>
            {children && <div data-dune-body>{children}</div>}
            {!children && subtitle && <p>{String(subtitle)}</p>}
            <ul class="actions special">
              <li><a href={blogHref} class="button wide">{getStarted}</a></li>
            </ul>
          </div>
        </section>

        <section id="two" class="main style2">
          <div class="container">
            <div class="row gtr-150">
              <div class="col-6 col-12-medium">
                <ul class="major-icons">
                  <li><span class="icon solid style1 major fa-code"></span></li>
                  <li><span class="icon solid style2 major fa-bolt"></span></li>
                  <li><span class="icon solid style3 major fa-camera"></span></li>
                  <li><span class="icon solid style4 major fa-cog"></span></li>
                  <li><span class="icon solid style5 major fa-desktop"></span></li>
                  <li><span class="icon solid style6 major fa-calendar"></span></li>
                </ul>
              </div>
              <div class="col-6 col-12-medium">
                <header class="major">
                  <h2>{tr("home.explore", "Explore the demo")}</h2>
                </header>
                <p>
                  {tr(
                    "home.explore_sub",
                    "Jump into sample projects, search, archives, or the about page.",
                  )}
                </p>
                <ul class="actions">
                  <li><a href={blogHref} class="button">{tr("nav.blog", "Projects")}</a></li>
                  <li><a href={aboutHref} class="button">{tr("nav.about", "About")}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="three" class="main style1 special">
          <div class="container">
            <header class="major">
              <h2>{tr("home.gallery", "Gallery entry points")}</h2>
            </header>
            <div class="row gtr-150">
              <div class="col-4 col-12-medium">
                <span class="image fit"><img src={img("pic01.jpg")} alt="" /></span>
                <h3>{tr("nav.blog", "Projects")}</h3>
                <p>{tr("home.blog_sub", "Browse sample portfolio posts.")}</p>
                <ul class="actions special">
                  <li><a href={blogHref} class="button">{learnMore}</a></li>
                </ul>
              </div>
              <div class="col-4 col-12-medium">
                <span class="image fit"><img src={img("pic02.jpg")} alt="" /></span>
                <h3>{tr("search.title", "Search")}</h3>
                <p>{tr("home.search_sub", "Query demo pages and posts.")}</p>
                <ul class="actions special">
                  <li><a href={searchHref} class="button">{learnMore}</a></li>
                </ul>
              </div>
              <div class="col-4 col-12-medium">
                <span class="image fit"><img src={img("pic03.jpg")} alt="" /></span>
                <h3>{tr("nav.archives", "Archives")}</h3>
                <p>{tr("home.archives_sub", "Browse posts grouped by year.")}</p>
                <ul class="actions special">
                  <li><a href={archivesHref} class="button">{learnMore}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
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
    </LayoutComponent>
  );
}
