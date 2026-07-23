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
  const { page, children, pathname, config, site, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "telephasic";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const getStarted = tr("cta.get_started", "Get Started");
  const learnMore = tr("post.read_more", "Read More");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <div class="wrapper">
          <div class="container">
            <div class="row">
              <section class="col-6 col-12-narrower feature">
                <div class="image-wrapper first">
                  <a href={blogHref} class="image featured first">
                    <img src={img("pic01.jpg")} alt="" />
                  </a>
                </div>
                <header>
                  <h2>Built for Dune CMS</h2>
                </header>
                <p>
                  Blog posts, search, archives, and inner pages with upstream Telephasic styling
                  preserved from HTML5 UP.
                </p>
                <ul class="actions">
                  <li><a href={blogHref} class="button">{getStarted}</a></li>
                </ul>
              </section>
              <section class="col-6 col-12-narrower feature">
                <div class="image-wrapper">
                  <a href={aboutHref} class="image featured">
                    <img src={img("pic02.jpg")} alt="" />
                  </a>
                </div>
                <header>
                  <h2>Responsive business layout</h2>
                </header>
                <p>
                  Hero banner, feature rows, promo band, and footer shell match the original
                  Telephasic template structure.
                </p>
                <ul class="actions">
                  <li><a href={aboutHref} class="button">{learnMore}</a></li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div id="promo-wrapper">
          <section id="promo">
            <h2>Explore the demo site</h2>
            <a href={blogHref} class="button">{getStarted}</a>
          </section>
        </div>

        <div class="wrapper">
          <section class="container">
            <header class="major">
              <h2>Demo templates included</h2>
              <p>Blog listing, posts, search results, archives, and error pages</p>
            </header>
            <div class="row features">
              <section class="col-4 col-12-narrower feature">
                <div class="image-wrapper first">
                  <a href={blogHref} class="image featured">
                    <img src={img("pic03.jpg")} alt="" />
                  </a>
                </div>
                <p>
                  Collection-driven blog at <a href={blogHref}>/blog</a> with dated posts from
                  shared demo content.
                </p>
              </section>
              <section class="col-4 col-12-narrower feature">
                <div class="image-wrapper">
                  <a href={searchHref} class="image featured">
                    <img src={img("pic04.jpg")} alt="" />
                  </a>
                </div>
                <p>Search demo pages through Dune&apos;s search template and API endpoint.</p>
              </section>
              <section class="col-4 col-12-narrower feature">
                <div class="image-wrapper">
                  <a href={archivesHref} class="image featured">
                    <img src={img("pic05.jpg")} alt="" />
                  </a>
                </div>
                <p>Browse all posts grouped by year in a chronological index.</p>
              </section>
            </div>
            <ul class="actions major">
              <li><a href={blogHref} class="button">{getStarted}</a></li>
            </ul>
          </section>
        </div>

        {children && (
          <div class="wrapper">
            <div class="container">
              <div data-dune-body>{children}</div>
            </div>
          </div>
        )}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div class="wrapper">
        <div class="container" id="main">
          <article id="content">
            <header>
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
    </LayoutComponent>
  );
}
