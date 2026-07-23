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
  const { page, children, pathname, config, themeConfig, t, site } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "highlights";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const bannerTitle = (themeConfig?.banner_title as string) || site?.title || "Highlights";
  const tagline = (themeConfig?.tagline as string) || "A responsive single-page theme for Dune CMS";
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const creditHref = safeHref("https://html5up.net/highlights") ?? "https://html5up.net/highlights";
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const aboutHref = withBase(basePath, "/about");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="header">
          <header class="major">
            <h1>{bannerTitle}</h1>
            <p>{tagline}</p>
          </header>
          <div class="container">
            <ul class="actions special">
              <li>
                <a href="#one" class="button primary scrolly">
                  {tr("cta.begin", "Begin")}
                </a>
              </li>
              <li>
                <a href={blogHref} class="button scrolly">
                  {tr("cta.read_blog", "Read the Blog")}
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="one" class="main special">
          <div class="container">
            <span class="image fit primary"><img src={img("pic01.jpg")} alt="" /></span>
            <div class="content">
              <header class="major">
                <h2>{tr("home.who", "Who we are")}</h2>
              </header>
              <p>
                {page.frontmatter.title ?? bannerTitle} for Dune — adapted from{" "}
                <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP Highlights</a>.
                Blog posts, search, archives, and inner pages use the upstream section layout.
              </p>
              {children && <div data-dune-body>{children}</div>}
            </div>
            <a href="#two" class="goto-next scrolly">{tr("cta.next", "Next")}</a>
          </div>
        </section>

        <section id="two" class="main special">
          <div class="container">
            <span class="image fit primary"><img src={img("pic02.jpg")} alt="" /></span>
            <div class="content">
              <header class="major">
                <h2>{tr("home.what", "What we do")}</h2>
              </header>
              <p>
                Collection-driven blog at <a href={blogHref}>{blogHref}</a> with dated posts,
                pagination, and taxonomy tags.
              </p>
              <ul class="icons-grid">
                <li>
                  <span class="icon solid major fa-pencil-alt"></span>
                  <h3><a href={blogHref}>{tr("nav.blog", "Blog")}</a></h3>
                </li>
                <li>
                  <span class="icon solid major fa-search"></span>
                  <h3><a href={searchHref}>{tr("search.title", "Search")}</a></h3>
                </li>
                <li>
                  <span class="icon solid major fa-archive"></span>
                  <h3><a href={archivesHref}>{tr("nav.archives", "Archives")}</a></h3>
                </li>
                <li>
                  <span class="icon solid major fa-info-circle"></span>
                  <h3><a href={aboutHref}>{tr("nav.about", "About")}</a></h3>
                </li>
              </ul>
            </div>
            <a href="#three" class="goto-next scrolly">{tr("cta.next", "Next")}</a>
          </div>
        </section>

        <section id="three" class="main special">
          <div class="container">
            <span class="image fit primary"><img src={img("pic03.jpg")} alt="" /></span>
            <div class="content">
              <header class="major">
                <h2>{tr("home.more", "One more thing")}</h2>
              </header>
              <p>
                Upstream Highlights CSS with fullscreen scroll sections on the home page and
                a compact inner-page shell for posts and utility pages.
              </p>
              <ul class="actions special">
                <li>
                  <a href={blogHref} class="button primary">
                    {tr("cta.get_started", "Get Started")}
                  </a>
                </li>
              </ul>
            </div>
            <a href="#footer" class="goto-next scrolly">{tr("cta.next", "Next")}</a>
          </div>
        </section>

        <section id="footer">
          <footer>
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
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <header class="major">
        <h2>{page.frontmatter.title}</h2>
        {subtitle && <p>{String(subtitle)}</p>}
      </header>
      {cover && (
        <span class="image fit"><img src={cover} alt="" /></span>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
