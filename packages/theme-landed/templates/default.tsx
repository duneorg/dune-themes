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
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, themeConfig, site, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "landed";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const bannerTitle = (themeConfig?.banner_title as string) || "The future has landed";
  const bannerSubtitle = (themeConfig?.tagline as string) || site?.description ||
    "And there are no hoverboards or flying cars. Just apps. Lots of mother flipping apps.";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const creditHref = safeHref("https://html5up.net/landed") ?? "https://html5up.net/landed";
  const getStarted = tr("cta.get_started", "Get Started");
  const learnMore = tr("post.read_more", "Read More");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="banner">
          <div class="content">
            <header>
              <h2>{bannerTitle}</h2>
              <p>{bannerSubtitle}</p>
            </header>
            <span class="image"><img src={img("pic01.jpg")} alt="" /></span>
          </div>
          <a href="#one" class="goto-next scrolly">Next</a>
        </section>

        <section id="one" class="spotlight style1 bottom">
          <span class="image fit main"><img src={img("pic02.jpg")} alt="" /></span>
          <div class="content">
            <div class="container">
              <div class="row">
                <div class="col-4 col-12-medium">
                  <header>
                    <h2>{String(fm.title ?? site?.title ?? "Landed")} for Dune</h2>
                    <p>Adapted from HTML5 UP with blog, search, and archives</p>
                  </header>
                </div>
                <div class="col-4 col-12-medium">
                  <p>
                    Collection-driven blog listing at <a href={blogHref}>/blog</a> with dated
                    posts, pagination, and taxonomy support from Dune CMS.
                  </p>
                </div>
                <div class="col-4 col-12-medium">
                  {children && <div data-dune-body>{children}</div>}
                  {!children && (
                    <p>
                      Upstream Landed CSS with landing body class, banner, spotlight sections,
                      and no-sidebar inner pages preserved.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <a href="#two" class="goto-next scrolly">Next</a>
        </section>

        <section id="two" class="spotlight style2 right">
          <span class="image fit main"><img src={img("pic03.jpg")} alt="" /></span>
          <div class="content">
            <header>
              <h2>Read the blog</h2>
              <p>Sample posts with markdown, code blocks, and tags</p>
            </header>
            <p>
              Browse the shared demo content or start with the welcome post to see how posts
              render in the Landed shell.
            </p>
            <ul class="actions">
              <li><a href={blogHref} class="button">{learnMore}</a></li>
            </ul>
          </div>
          <a href="#three" class="goto-next scrolly">Next</a>
        </section>

        <section id="three" class="spotlight style3 left">
          <span class="image fit main bottom"><img src={img("pic04.jpg")} alt="" /></span>
          <div class="content">
            <header>
              <h2>Search &amp; archives</h2>
              <p>Query demo pages or browse posts by year</p>
            </header>
            <p>
              Dune templates for search results and year-grouped archives use the upstream
              no-sidebar layout.
            </p>
            <ul class="actions">
              <li><a href={searchHref} class="button">{tr("search.title", "Search")}</a></li>
              <li><a href={archivesHref} class="button">{learnMore}</a></li>
            </ul>
          </div>
          <a href="#four" class="goto-next scrolly">Next</a>
        </section>

        <section id="four" class="wrapper style1 special fade-up">
          <div class="container">
            <header class="major">
              <h2>Built for Dune CMS</h2>
              <p>Blog posts, search, archives, and inner pages with the no-sidebar layout</p>
            </header>
            <div class="box alt">
              <div class="row gtr-uniform">
                <section class="col-4 col-6-medium col-12-xsmall">
                  <span class="icon solid alt major fa-comment"></span>
                  <h3>Blog &amp; posts</h3>
                  <p>Collection-driven listing at <a href={blogHref}>/blog</a> with dated posts.</p>
                </section>
                <section class="col-4 col-6-medium col-12-xsmall">
                  <span class="icon solid alt major fa-search"></span>
                  <h3>Search</h3>
                  <p>Query demo pages through Dune&apos;s search template.</p>
                </section>
                <section class="col-4 col-6-medium col-12-xsmall">
                  <span class="icon solid alt major fa-archive"></span>
                  <h3>Archives</h3>
                  <p>Browse all posts grouped by year.</p>
                </section>
              </div>
            </div>
            <footer class="major">
              <ul class="actions special">
                <li><a href={blogHref} class="button">{getStarted}</a></li>
              </ul>
            </footer>
          </div>
        </section>

        <section id="five" class="wrapper style2 special fade">
          <div class="container">
            <header>
              <h2>Ready to explore?</h2>
              <p>Start with the blog or browse the about page for more on this demo site.</p>
            </header>
            <ul class="actions special">
              <li><a href={blogHref} class="button primary">{getStarted}</a></li>
              <li><a href={aboutHref} class="button">{learnMore}</a></li>
            </ul>
          </div>
        </section>

        <footer id="footer">
          <ul class="copyright">
            <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
            {showCredit && (
              <li>
                {tr("credit.design", "Design")}:{" "}
                <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
              </li>
            )}
          </ul>
        </footer>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main" class="wrapper style1">
        <div class="container">
          <header class="major">
            <h2>{String(fm.title ?? "")}</h2>
            {subtitle && <p>{String(subtitle)}</p>}
          </header>
          <section id="content">
            {cover && <a href={page.route} class="image fit"><img src={cover} alt="" /></a>}
            <div data-dune-body>{children}</div>
          </section>
        </div>
      </div>
    </LayoutComponent>
  );
}
