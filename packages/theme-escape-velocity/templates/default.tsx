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
  const themeName = config?.theme?.name ?? "escape-velocity";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const introTitle = (themeConfig?.intro_title as string) || "The Introduction";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const creditHref = safeHref("https://html5up.net/escape-velocity") ??
    "https://html5up.net/escape-velocity";
  const getStarted = tr("cta.get_started", "Get Started");
  const learnMore = tr("post.read_more", "Read More");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="intro" class="wrapper style1">
          <div class="title">{introTitle}</div>
          <div class="container">
            <p class="style1">So in case you were wondering what this is all about …</p>
            <p class="style2">
              {String(fm.title ?? "Escape Velocity")} for Dune<br class="mobile-hide" />
              — adapted from <a href={creditHref} class="nobr">HTML5 UP</a>
            </p>
            {children && (
              <div class="style3" data-dune-body>{children}</div>
            )}
            <ul class="actions">
              <li><a href={blogHref} class="button style3 large">{getStarted}</a></li>
            </ul>
          </div>
        </section>

        <section id="main" class="wrapper style2">
          <div class="title">The Details</div>
          <div class="container">
            <a href={blogHref} class="image featured">
              <img src={img("pic01.jpg")} alt="" />
            </a>
            <section id="features">
              <header class="style1">
                <h2>Built for Dune CMS</h2>
                <p>Blog posts, search, archives, and inner pages with the no-sidebar layout</p>
              </header>
              <div class="feature-list">
                <div class="row">
                  <div class="col-6 col-12-medium">
                    <section>
                      <h3 class="icon fa-comment">Blog &amp; posts</h3>
                      <p>
                        Collection-driven blog listing at <a href={blogHref}>/blog</a> with dated
                        posts and pagination support.
                      </p>
                    </section>
                  </div>
                  <div class="col-6 col-12-medium">
                    <section>
                      <h3 class="icon solid fa-sync">Responsive shell</h3>
                      <p>
                        Upstream Escape Velocity CSS with homepage and inner-page body classes
                        preserved.
                      </p>
                    </section>
                  </div>
                  <div class="col-6 col-12-medium">
                    <section>
                      <h3 class="icon fa-image">Search &amp; archives</h3>
                      <p>Demo templates for search results and year-grouped archives.</p>
                    </section>
                  </div>
                  <div class="col-6 col-12-medium">
                    <section>
                      <h3 class="icon solid fa-cog">HTML5 UP credit</h3>
                      <p>
                        Design by HTML5 UP (CC BY 3.0). Keep visible attribution on live sites.
                      </p>
                    </section>
                  </div>
                </div>
              </div>
              <ul class="actions special">
                <li><a href={blogHref} class="button style1 large">{getStarted}</a></li>
                <li><a href={aboutHref} class="button style2 large">{learnMore}</a></li>
              </ul>
            </section>
          </div>
        </section>

        <section id="highlights" class="wrapper style3">
          <div class="title">Highlights</div>
          <div class="container">
            <div class="row aln-center">
              <div class="col-4 col-12-medium">
                <section class="highlight">
                  <a href={blogHref} class="image featured">
                    <img src={img("pic02.jpg")} alt="" />
                  </a>
                  <h3><a href={blogHref}>Read the blog</a></h3>
                  <p>
                    Sample posts with markdown, code blocks, and taxonomy tags from the shared
                    demo content.
                  </p>
                  <ul class="actions">
                    <li><a href={blogHref} class="button style1">{learnMore}</a></li>
                  </ul>
                </section>
              </div>
              <div class="col-4 col-12-medium">
                <section class="highlight">
                  <a href={searchHref} class="image featured">
                    <img src={img("pic03.jpg")} alt="" />
                  </a>
                  <h3><a href={searchHref}>Search</a></h3>
                  <p>Query demo pages through Dune&apos;s search template and API endpoint.</p>
                  <ul class="actions">
                    <li><a href={searchHref} class="button style1">{learnMore}</a></li>
                  </ul>
                </section>
              </div>
              <div class="col-4 col-12-medium">
                <section class="highlight">
                  <a href={archivesHref} class="image featured">
                    <img src={img("pic04.jpg")} alt="" />
                  </a>
                  <h3><a href={archivesHref}>Archives</a></h3>
                  <p>Browse all posts grouped by year in a clean chronological index.</p>
                  <ul class="actions">
                    <li><a href={archivesHref} class="button style1">{learnMore}</a></li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section id="footer" class="wrapper">
          <div class="title">The Rest Of It</div>
          <div class="container">
            <header class="style1">
              <h2>Ready to explore?</h2>
              <p>Start with the blog or browse the about page for more on this demo site.</p>
            </header>
            <div id="copyright">
              <ul>
                <li>&copy; {new Date().getFullYear()} {copyrightName}.</li>
                {showCredit && (
                  <li>
                    {tr("credit.design", "Design")}:{" "}
                    <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main" class="wrapper style2">
        <div class="title">{String(fm.title ?? "")}</div>
        <div class="container">
          <div id="content">
            <article class="box post">
              <header class="style1">
                <h2>{String(fm.title ?? "")}</h2>
                {subtitle && <p>{String(subtitle)}</p>}
              </header>
              {cover && (
                <a href={page.route} class="image featured">
                  <img src={cover} alt="" />
                </a>
              )}
              <div data-dune-body>{children}</div>
            </article>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
