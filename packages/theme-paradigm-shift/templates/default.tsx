/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { galleryImage, themeImage } from "../utils/content.ts";
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
  site?: { title?: string; description?: string; basePath?: string };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, themeConfig, site, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "paradigm-shift";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const gal = (file: string) => galleryImage(themeName, file);
  const bannerTitle = (themeConfig?.banner_title as string) || site?.title || "Paradigm Shift";
  const tagline = (themeConfig?.tagline as string) ||
    "A responsive site theme adapted from HTML5 UP for Dune CMS";
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const creditHref = safeHref("https://html5up.net/paradigm-shift") ??
    "https://html5up.net/paradigm-shift";
  const duneHref = safeHref("https://getdune.org") ?? "https://getdune.org";
  const html5upHref = safeHref("https://html5up.net") ?? "https://html5up.net";
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const aboutHref = withBase(basePath, "/about");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section class="intro">
          <header>
            <h1>{bannerTitle}</h1>
            <p>{tagline}</p>
            <ul class="actions">
              <li>
                <a href="#first" class="arrow scrolly">
                  <span class="label">{tr("cta.next", "Next")}</span>
                </a>
              </li>
            </ul>
          </header>
          <div class="content">
            <span class="image fill" data-position="center">
              <img src={img("pic01.jpg")} alt="" />
            </span>
          </div>
        </section>

        <section id="first">
          <header>
            <h2>{page.frontmatter.title ?? bannerTitle} for Dune</h2>
          </header>
          <div class="content">
            <p>
              <strong>{tr("home.built_for", "Built for Dune CMS")}</strong> — blog posts, search,
              archives, and inner pages with the upstream Paradigm Shift section layout preserved.
            </p>
            {children && <div data-dune-body>{children}</div>}
            <span class="image main"><img src={img("pic02.jpg")} alt="" /></span>
          </div>
        </section>

        <section>
          <header>
            <h2>{tr("home.explore", "Explore the demo")}</h2>
          </header>
          <div class="content">
            <p>
              Collection-driven blog at <a href={blogHref}>{blogHref}</a> with dated posts and
              pagination.
            </p>
            <ul class="feature-icons">
              <li class="icon solid fa-comment">
                <a href={blogHref}>{tr("nav.blog", "Blog")} &amp; posts</a>
              </li>
              <li class="icon solid fa-search">
                <a href={searchHref}>{tr("search.title", "Search")}</a>
              </li>
              <li class="icon solid fa-archive">
                <a href={archivesHref}>{tr("nav.archives", "Archives")}</a>
              </li>
              <li class="icon solid fa-info-circle">
                <a href={aboutHref}>{tr("nav.about", "About")}</a>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <header>
            <h2>{tr("home.gallery", "Gallery")}</h2>
          </header>
          <div class="content">
            <div class="gallery">
              <a href={gal("fulls/01.jpg")} class="landscape">
                <img src={gal("thumbs/01.jpg")} alt="" />
              </a>
              <a href={gal("fulls/02.jpg")}><img src={gal("thumbs/02.jpg")} alt="" /></a>
              <a href={gal("fulls/03.jpg")}><img src={gal("thumbs/03.jpg")} alt="" /></a>
              <a href={gal("fulls/04.jpg")} class="landscape">
                <img src={gal("thumbs/04.jpg")} alt="" />
              </a>
            </div>
          </div>
        </section>

        <section>
          <header>
            <h2>{tr("cta.get_started", "Get started")}</h2>
          </header>
          <div class="content">
            <p>
              {tr(
                "home.get_started_sub",
                "Start with the blog or browse sample posts from the shared demo content.",
              )}
            </p>
            <ul class="actions">
              <li>
                <a href={blogHref} class="button primary large">
                  {tr("cta.read_blog", "Read the Blog")}
                </a>
              </li>
              <li>
                <a href={aboutHref} class="button large">
                  {tr("cta.learn_more", "Learn More")}
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <header>
            <h2>{tr("home.get_in_touch", "Get in touch")}</h2>
          </header>
          <div class="content">
            <p>
              {tr("credit.design", "Design")} by{" "}
              <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>{" "}
              (CC BY 3.0).
            </p>
          </div>
          <footer>
            <ul class="items">
              <li>
                <h3>{tr("nav.site", "Site")}</h3>
                <a href={blogHref}>{tr("nav.blog", "Blog")}</a>
              </li>
              <li>
                <h3>{tr("home.elsewhere", "Elsewhere")}</h3>
                <ul class="icons">
                  <li>
                    <a href={duneHref} class="icon solid fa-cloud">
                      <span class="label">Dune</span>
                    </a>
                  </li>
                  <li>
                    <a href={html5upHref} class="icon solid fa-code">
                      <span class="label">HTML5 UP</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <p class="copyright">
              &copy; {new Date().getFullYear()} {copyrightName}.
              {showCredit && (
                <>
                  {" "}{tr("credit.design", "Design")}:{" "}
                  <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                </>
              )}
            </p>
          </footer>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      {subtitle && <p>{String(subtitle)}</p>}
      {cover && <span class="image main"><img src={cover} alt="" /></span>}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
