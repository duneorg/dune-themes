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
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "spectral";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title ||
    String(fm.title ?? "Spectral");
  const creditHref = safeHref("https://html5up.net/spectral") ?? "https://html5up.net/spectral";
  const getStarted = tr("cta.get_started", "Get Started");
  const learnMore = tr("post.read_more", "Read More");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="banner">
          <div class="inner">
            <h2>{String(fm.title ?? "Spectral")}</h2>
            <p>
              Responsive site template adapted from{" "}
              <a href={creditHref}>HTML5 UP</a><br />
              for Dune CMS — blog, search, and archives included.
            </p>
            <ul class="actions special">
              <li><a href={blogHref} class="button primary">{getStarted}</a></li>
            </ul>
          </div>
          <a href="#one" class="more scrolly">{learnMore}</a>
        </section>

        <section id="one" class="wrapper style1 special">
          <div class="inner">
            <header class="major">
              <h2>Built for Dune CMS</h2>
              <p>
                Blog posts, search, archives, and inner pages with the landing and generic
                layouts preserved.
              </p>
            </header>
            {children && <div data-dune-body>{children}</div>}
            <ul class="icons major">
              <li><span class="icon fa-gem major style1"><span class="label">Blog</span></span></li>
              <li><span class="icon fa-heart major style2"><span class="label">Search</span></span></li>
              <li>
                <span class="icon solid fa-code major style3">
                  <span class="label">Archives</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section id="two" class="wrapper alt style2">
          <section class="spotlight">
            <div class="image"><img src={img("pic01.jpg")} alt="" /></div>
            <div class="content">
              <h2>Read the blog<br />at /blog</h2>
              <p>
                Sample posts with markdown, code blocks, and taxonomy tags from the shared
                demo content.
              </p>
              <ul class="actions">
                <li><a href={blogHref} class="button">{learnMore}</a></li>
              </ul>
            </div>
          </section>
          <section class="spotlight">
            <div class="image"><img src={img("pic02.jpg")} alt="" /></div>
            <div class="content">
              <h2>Search<br />demo pages</h2>
              <p>Query demo pages through Dune&apos;s search template and API endpoint.</p>
              <ul class="actions">
                <li><a href={searchHref} class="button">{learnMore}</a></li>
              </ul>
            </div>
          </section>
          <section class="spotlight">
            <div class="image"><img src={img("pic03.jpg")} alt="" /></div>
            <div class="content">
              <h2>Browse<br />archives</h2>
              <p>All posts grouped by year in a clean chronological index.</p>
              <ul class="actions">
                <li><a href={archivesHref} class="button">{learnMore}</a></li>
              </ul>
            </div>
          </section>
        </section>

        <section id="three" class="wrapper style3 special">
          <div class="inner">
            <header class="major">
              <h2>Explore the demo</h2>
              <p>Start with the blog or browse the about page for more on this theme.</p>
            </header>
            <ul class="features">
              <li class="icon fa-paper-plane">
                <h3><a href={blogHref}>Blog</a></h3>
                <p>Collection-driven blog listing with dated posts and pagination support.</p>
              </li>
              <li class="icon solid fa-laptop">
                <h3><a href={aboutHref}>About</a></h3>
                <p>Inner pages use the upstream generic article layout.</p>
              </li>
              <li class="icon solid fa-code">
                <h3><a href={searchHref}>Search</a></h3>
                <p>Full-text search across demo content.</p>
              </li>
              <li class="icon solid fa-headphones-alt">
                <h3><a href={archivesHref}>Archives</a></h3>
                <p>Year-grouped post index.</p>
              </li>
            </ul>
          </div>
        </section>

        <section id="cta" class="wrapper style4">
          <div class="inner">
            <header>
              <h2>Ready to explore?</h2>
              <p>Upstream Spectral CSS with landing body class and panel menu preserved.</p>
            </header>
            <ul class="actions stacked">
              <li><a href={blogHref} class="button fit primary">{getStarted}</a></li>
              <li><a href={aboutHref} class="button fit">{learnMore}</a></li>
            </ul>
          </div>
        </section>

        <footer id="footer">
          <ul class="icons">
            <li>
              <a href={blogHref} class="icon solid fa-th"><span class="label">Blog</span></a>
            </li>
            <li>
              <a href={searchHref} class="icon solid fa-search">
                <span class="label">Search</span>
              </a>
            </li>
            <li>
              <a href={archivesHref} class="icon solid fa-archive">
                <span class="label">Archives</span>
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
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <article id="main">
        <header>
          <h2>{String(fm.title ?? "")}</h2>
          {subtitle && <p>{String(subtitle)}</p>}
        </header>
        <section class="wrapper style5">
          <div class="inner">
            {cover && <span class="image fit"><img src={cover} alt="" /></span>}
            <div data-dune-body>{children}</div>
          </div>
        </section>
      </article>
    </LayoutComponent>
  );
}
