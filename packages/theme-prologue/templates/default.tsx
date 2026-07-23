/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

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
  const { page, children, pathname, config, site, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const basePath = site?.basePath ?? "";
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const isHome = (() => { const r = pathname ?? page?.route ?? "/"; const n = r !== "/" && r.endsWith("/") ? r.slice(0, -1) : r; return n === "/" || n === "/home"; })();
  const themeName = config?.theme?.name ?? "prologue";
  const img = (file: string) => themeImage(themeName, file);
  const siteTitle = site?.title ?? "Prologue";
  const creditHref = safeHref("https://html5up.net/prologue") ?? "https://html5up.net/prologue";

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="top" class="one dark cover">
          <div class="container">
            <header>
              <h2 class="alt">
                Hi! I&apos;m <strong>{siteTitle}</strong>, a responsive<br />
                site template adapted from{" "}
                <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
              </h2>
              <p>
                {page.frontmatter.title ?? "Prologue for Dune"} — blog posts, search, archives,<br />
                and inner pages with the upstream sidebar shell preserved.
              </p>
            </header>
            {children && <div data-dune-body>{children}</div>}
            <footer>
              <a href="#portfolio" class="button scrolly">{tr("cta.explore", "Explore")}</a>
            </footer>
          </div>
        </section>

        <section id="portfolio" class="two">
          <div class="container">
            <header><h2>Portfolio</h2></header>
            <p>Sample destinations from the shared demo content — blog posts, search, and archives.</p>
            <div class="row">
              <div class="col-4 col-12-mobile">
                <article class="item">
                  <a href={withBase(basePath, "/blog")} class="image fit"><img src={img("pic02.jpg")} alt="" /></a>
                  <header><h3><a href={withBase(basePath, "/blog")}>The Blog</a></h3></header>
                </article>
                <article class="item">
                  <a href={withBase(basePath, "/search")} class="image fit"><img src={img("pic03.jpg")} alt="" /></a>
                  <header><h3><a href={withBase(basePath, "/search")}>Search</a></h3></header>
                </article>
              </div>
              <div class="col-4 col-12-mobile">
                <article class="item">
                  <a href={withBase(basePath, "/archives")} class="image fit"><img src={img("pic04.jpg")} alt="" /></a>
                  <header><h3><a href={withBase(basePath, "/archives")}>Archives</a></h3></header>
                </article>
                <article class="item">
                  <a href={withBase(basePath, "/about")} class="image fit"><img src={img("pic05.jpg")} alt="" /></a>
                  <header><h3><a href={withBase(basePath, "/about")}>{tr("cta.about", "About")}</a></h3></header>
                </article>
              </div>
              <div class="col-4 col-12-mobile">
                <article class="item">
                  <a href={withBase(basePath, "/blog")} class="image fit"><img src={img("pic06.jpg")} alt="" /></a>
                  <header><h3><a href={withBase(basePath, "/blog")}>Welcome Post</a></h3></header>
                </article>
                <article class="item">
                  <a href={withBase(basePath, "/blog/welcome")} class="image fit"><img src={img("pic07.jpg")} alt="" /></a>
                  <header><h3><a href={withBase(basePath, "/blog/welcome")}>Welcome</a></h3></header>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="about" class="three">
          <div class="container">
            <header><h2>About Me</h2></header>
            <a href={withBase(basePath, "/about")} class="image featured"><img src={img("pic08.jpg")} alt="" /></a>
            <p>
              This demo site uses Dune CMS with the Prologue sidebar layout — icon navigation,
              portfolio grid, and scroll sections from the upstream template.
            </p>
          </div>
        </section>

        <section id="contact" class="four">
          <div class="container">
            <header><h2>Get Started</h2></header>
            <p>Browse the blog or read the about page to explore this theme with real content.</p>
            <ul class="actions">
              <li><a href={withBase(basePath, "/blog")} class="button">{tr("cta.read_blog", "Read the Blog")}</a></li>
              <li><a href={withBase(basePath, "/about")} class="button">{tr("cta.about", "About")}</a></li>
            </ul>
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section class="three">
        <div class="container">
          <header><h2>{page.frontmatter.title}</h2></header>
          {subtitle && <p>{String(subtitle)}</p>}
          {cover && (
            <a href={page.route} class="image featured">
              <img src={cover} alt="" />
            </a>
          )}
          <div data-dune-body>{children}</div>
        </div>
      </section>
    </LayoutComponent>
  );
}
