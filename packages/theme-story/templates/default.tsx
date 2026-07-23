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

function StoryFooter({
  showCredit,
  copyrightName,
  creditHref,
  blogHref,
  searchHref,
  archivesHref,
  tr,
}: {
  showCredit: boolean;
  copyrightName: string;
  creditHref: string;
  blogHref: string;
  searchHref: string;
  archivesHref: string;
  tr: (key: string, fallback: string) => string;
}) {
  return (
    <footer class="wrapper style1 align-center">
      <div class="inner">
        <ul class="icons">
          <li>
            <a href={blogHref} class="icon brands style2 fa-twitter">
              <span class="label">{tr("nav.blog", "Blog")}</span>
            </a>
          </li>
          <li>
            <a href={searchHref} class="icon brands style2 fa-facebook-f">
              <span class="label">{tr("search.title", "Search")}</span>
            </a>
          </li>
          <li>
            <a href={archivesHref} class="icon brands style2 fa-instagram">
              <span class="label">{tr("nav.archives", "Archives")}</span>
            </a>
          </li>
        </ul>
        <p>
          &copy; {new Date().getFullYear()} {copyrightName}.
          {showCredit && (
            <>
              {" "}{tr("credit.design", "Design")}:{" "}
              <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
            </>
          )}
        </p>
      </div>
    </footer>
  );
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
  const themeName = config?.theme?.name ?? "story";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Story Demo";
  const creditHref = safeHref("https://html5up.net/story") ?? "https://html5up.net/story";
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const aboutHref = withBase(basePath, "/about");
  const footerProps = {
    showCredit,
    copyrightName,
    creditHref,
    blogHref,
    searchHref,
    archivesHref,
    tr,
  };

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
          <div class="content">
            <h1>{page.frontmatter.title ?? "Story"}</h1>
            <p class="major">
              A responsive one-page template adapted from{" "}
              <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a> for Dune
              CMS — blog, search, and archives included.
            </p>
            {children && <div data-dune-body>{children}</div>}
            <ul class="actions stacked">
              <li>
                <a href="#first" class="button big wide smooth-scroll-middle">
                  {tr("cta.get_started", "Get Started")}
                </a>
              </li>
            </ul>
          </div>
          <div class="image"><img src={img("banner.jpg")} alt="" /></div>
        </section>

        <section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="first">
          <div class="content">
            <h2>{tr("home.read_blog", "Read the blog")}</h2>
            <p>
              Sample posts with markdown, code blocks, and taxonomy tags from the shared demo
              content.
            </p>
            <ul class="actions stacked">
              <li>
                <a href={blogHref} class="button">{tr("cta.learn_more", "Learn More")}</a>
              </li>
            </ul>
          </div>
          <div class="image"><img src={img("spotlight01.jpg")} alt="" /></div>
        </section>

        <section class="spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in">
          <div class="content">
            <h2>{tr("home.search_demo", "Search demo")}</h2>
            <p>Query demo pages through Dune&apos;s search template and API endpoint.</p>
            <ul class="actions stacked">
              <li>
                <a href={searchHref} class="button">{tr("cta.learn_more", "Learn More")}</a>
              </li>
            </ul>
          </div>
          <div class="image"><img src={img("spotlight02.jpg")} alt="" /></div>
        </section>

        <section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in">
          <div class="content">
            <h2>{tr("home.browse_archives", "Browse archives")}</h2>
            <p>All posts grouped by year in a clean chronological index.</p>
            <ul class="actions stacked">
              <li>
                <a href={archivesHref} class="button">{tr("cta.learn_more", "Learn More")}</a>
              </li>
            </ul>
          </div>
          <div class="image"><img src={img("spotlight03.jpg")} alt="" /></div>
        </section>

        <section class="wrapper style1 align-center">
          <div class="inner">
            <h2>{tr("home.gallery_title", "Massa sed condimentum")}</h2>
            <p>
              Upstream Story CSS with divided wrapper, fullscreen banner, spotlight sections, and
              gallery grid preserved.
            </p>
          </div>
          <div class="gallery style2 medium lightbox onscroll-fade-in">
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const num = String(n).padStart(2, "0");
              return (
                <article key={num}>
                  <a href={img(`gallery/fulls/${num}.jpg`)} class="image">
                    <img src={img(`gallery/thumbs/${num}.jpg`)} alt="" />
                  </a>
                  <div class="caption">
                    <h3>Demo {n}</h3>
                    <p>Gallery item from the upstream Story template assets.</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section class="wrapper style1 align-center">
          <div class="inner medium">
            <h2>{tr("home.ready", "Ready to explore?")}</h2>
            <p>
              {tr(
                "home.ready_sub",
                "Start with the blog or browse the about page for more on this demo site.",
              )}
            </p>
            <ul class="actions stacked special">
              <li>
                <a href={blogHref} class="button wide">{tr("cta.read_blog", "Read the Blog")}</a>
              </li>
              <li>
                <a href={aboutHref} class="button wide">{tr("nav.about", "About")}</a>
              </li>
            </ul>
          </div>
        </section>

        <StoryFooter {...footerProps} />
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section class="banner style1 orient-left content-align-left image-position-right">
        <div class="content">
          <h1>{page.frontmatter.title}</h1>
          {subtitle && <p class="major">{String(subtitle)}</p>}
        </div>
        <div class="image">
          <img src={cover ?? img("banner.jpg")} alt="" />
        </div>
      </section>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <div data-dune-body>{children}</div>
        </div>
      </section>
      <StoryFooter {...footerProps} />
    </LayoutComponent>
  );
}
