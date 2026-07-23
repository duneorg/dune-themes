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
  const themeName = config?.theme?.name ?? "twenty";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const bannerTitle = (themeConfig?.banner_title as string) || site?.title?.toUpperCase() ||
    "TWENTY";
  const creditHref = safeHref("https://html5up.net/twenty") ?? "https://html5up.net/twenty";
  const githubHref = safeHref("https://github.com/duneorg/dune-themes") ??
    "https://github.com/duneorg/dune-themes";
  const duneHref = safeHref("https://getdune.org") ?? "https://getdune.org";
  const getStarted = tr("cta.get_started", "Get Started");
  const learnMore = tr("post.read_more", "Read More");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="banner">
          <div class="inner">
            <header>
              <h2>{bannerTitle}</h2>
            </header>
            <p>
              This is <strong>Twenty</strong> for Dune<br />
              a responsive landing theme<br />
              adapted from <a href={creditHref}>HTML5 UP</a>.
            </p>
            <footer>
              <ul class="buttons stacked">
                <li><a href="#main" class="button fit scrolly">{learnMore}</a></li>
              </ul>
            </footer>
          </div>
        </section>

        <article id="main">
          <header class="special container">
            <span class="icon solid fa-chart-bar"></span>
            <h2>
              Multipurpose landing with <strong>blog</strong>, search, and archives
            </h2>
            <p>
              Upstream Twenty CSS with banner, icon features, image sections, and CTA —
              plus Dune templates for posts and utility pages.
            </p>
          </header>

          <section class="wrapper style2 container special-alt">
            <div class="row gtr-50">
              <div class="col-8 col-12-narrower">
                <header>
                  <h2>Built for <strong>Dune CMS</strong></h2>
                </header>
                <p>
                  Collection-driven blog at <a href={blogHref}>/blog</a>, full-text search,
                  year-grouped archives, and no-sidebar inner pages with the original Twenty
                  styling.
                </p>
                <footer>
                  <ul class="buttons">
                    <li><a href={blogHref} class="button">{getStarted}</a></li>
                  </ul>
                </footer>
              </div>
              <div class="col-4 col-12-narrower imp-narrower">
                <ul class="featured-icons">
                  <li><span class="icon fa-clock"><span class="label">Blog</span></span></li>
                  <li>
                    <span class="icon solid fa-volume-up"><span class="label">Search</span></span>
                  </li>
                  <li>
                    <span class="icon solid fa-laptop"><span class="label">Archives</span></span>
                  </li>
                  <li><span class="icon solid fa-inbox"><span class="label">Posts</span></span></li>
                  <li>
                    <span class="icon solid fa-lock"><span class="label">CC BY 3.0</span></span>
                  </li>
                  <li>
                    <span class="icon solid fa-cog"><span class="label">HTML5 UP</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section class="wrapper style1 container special">
            <div class="row">
              <div class="col-4 col-12-narrower">
                <section>
                  <span class="icon solid featured fa-check"></span>
                  <header><h3>Responsive</h3></header>
                  <p>Mobile-first layout with drop-down navigation and scroll-friendly banner.</p>
                </section>
              </div>
              <div class="col-4 col-12-narrower">
                <section>
                  <span class="icon solid featured fa-check"></span>
                  <header><h3>Demo content</h3></header>
                  <p>Shared demo posts with markdown, code samples, and taxonomy tags.</p>
                </section>
              </div>
              <div class="col-4 col-12-narrower">
                <section>
                  <span class="icon solid featured fa-check"></span>
                  <header><h3>Attribution</h3></header>
                  <p>Design by HTML5 UP — keep visible credit on live sites.</p>
                </section>
              </div>
            </div>
          </section>

          <section class="wrapper style3 container special">
            <header class="major">
              <h2>Featured <strong>images</strong></h2>
            </header>
            <div class="row">
              <div class="col-6 col-12-narrower">
                <section>
                  <a href={blogHref} class="image featured">
                    <img src={img("pic01.jpg")} alt="" />
                  </a>
                  <header><h3>Read the blog</h3></header>
                  <p>Sample posts with pagination support from the shared demo content.</p>
                </section>
              </div>
              <div class="col-6 col-12-narrower">
                <section>
                  <a href={searchHref} class="image featured">
                    <img src={img("pic02.jpg")} alt="" />
                  </a>
                  <header><h3>Search</h3></header>
                  <p>Query demo pages through Dune&apos;s search template.</p>
                </section>
              </div>
            </div>
            <div class="row">
              <div class="col-6 col-12-narrower">
                <section>
                  <a href={archivesHref} class="image featured">
                    <img src={img("pic03.jpg")} alt="" />
                  </a>
                  <header><h3>Archives</h3></header>
                  <p>Browse posts grouped by publication year.</p>
                </section>
              </div>
              <div class="col-6 col-12-narrower">
                <section>
                  <a href={aboutHref} class="image featured">
                    <img src={img("pic04.jpg")} alt="" />
                  </a>
                  <header><h3>About</h3></header>
                  <p>Inner pages use the no-sidebar Twenty layout.</p>
                </section>
              </div>
            </div>
          </section>
        </article>

        <section id="cta">
          <header>
            <h2>Ready to <strong>explore</strong>?</h2>
            <p>Start with the blog or browse the about page.</p>
          </header>
          <footer>
            <ul class="buttons">
              <li><a href={blogHref} class="button primary">{getStarted}</a></li>
              <li><a href={aboutHref} class="button">{learnMore}</a></li>
            </ul>
          </footer>
        </section>

        <footer id="footer">
          <ul class="icons">
            <li>
              <a href={githubHref} class="icon brands circle fa-github">
                <span class="label">GitHub</span>
              </a>
            </li>
            <li>
              <a href={duneHref} class="icon solid circle fa-globe">
                <span class="label">Dune</span>
              </a>
            </li>
            <li>
              <a href={creditHref} class="icon brands circle fa-html5">
                <span class="label">HTML5 UP</span>
              </a>
            </li>
          </ul>
          <ul class="copyright">
            <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
            {showCredit && (
              <li>
                {tr("credit.design", "Design")}:{" "}
                <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
              </li>
            )}
          </ul>
        </footer>

        {children && <div class="container" data-dune-body>{children}</div>}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <article id="main">
        <header class="special container">
          <span class="icon solid fa-file-alt"></span>
          <h2>{String(fm.title ?? "")}</h2>
          {subtitle && <p>{String(subtitle)}</p>}
        </header>
        <section class="wrapper style4 container">
          <div class="content">
            <section>
              {cover && (
                <a href={page.route} class="image featured">
                  <img src={cover} alt="" />
                </a>
              )}
              <div data-dune-body>{children}</div>
            </section>
          </div>
        </section>
      </article>
    </LayoutComponent>
  );
}
