/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { GALLERY_ITEMS, galleryHref } from "../utils/content.ts";
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
  const themeName = config?.theme?.name ?? "multiverse";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => galleryHref(themeName, file);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const creditHref = safeHref("https://html5up.net/multiverse") ??
    "https://html5up.net/multiverse";
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const aboutHref = withBase(basePath, "/about");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <div id="main">
          {GALLERY_ITEMS.map((item) => (
            <article class="thumb" key={item.thumb}>
              <a href={img(item.full)} class="image">
                <img src={img(item.thumb)} alt="" />
              </a>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <footer id="footer" class="panel">
          <div class="inner split">
            <div>
              <section>
                <h2>{site?.title ?? "Multiverse"} for Dune</h2>
                <p>
                  {site?.description ??
                    "A responsive gallery landing theme adapted from HTML5 UP — blog posts, search, archives, and inner pages."}
                </p>
                {children && <div data-dune-body>{children}</div>}
              </section>
              <section>
                <h2>{tr("home.explore", "Explore")}</h2>
                <ul class="icons">
                  <li>
                    <a href={blogHref} class="icon solid fa-comment">
                      <span class="label">{tr("nav.blog", "Blog")}</span>
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
                  <li>
                    <a href={aboutHref} class="icon solid fa-info-circle">
                      <span class="label">{tr("nav.about", "About")}</span>
                    </a>
                  </li>
                </ul>
              </section>
              <p class="copyright">
                &copy; {new Date().getFullYear()} {copyrightName}.
                {showCredit && (
                  <>
                    {" "}{tr("credit.design", "Design")}:{" "}
                    <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
                  </>
                )}
              </p>
            </div>
            <div>
              <section>
                <h2>{tr("cta.get_started", "Get started")}</h2>
                <p>
                  {tr(
                    "home.get_started_sub",
                    "Start with the blog or browse sample posts from the shared demo content.",
                  )}
                </p>
                <ul class="actions">
                  <li>
                    <a href={blogHref} class="button primary">
                      {tr("cta.read_blog", "Read the Blog")}
                    </a>
                  </li>
                  <li>
                    <a href={aboutHref} class="button">{tr("nav.about", "About")}</a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </footer>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <h2>{page.frontmatter.title}</h2>
      {subtitle && <p>{String(subtitle)}</p>}
      {cover && (
        <a href={cover} class="image"><img src={cover} alt="" /></a>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
