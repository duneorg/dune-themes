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
  const themeName = config?.theme?.name ?? "helios";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const welcomeHref = withBase(basePath, "/blog/welcome");
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const creditHref = safeHref("https://html5up.net/helios") ?? "https://html5up.net/helios";
  const continueReading = tr("post.continue", "Continue Reading");

  if (isHome) {
    const carousel = [
      { img: "pic01.jpg", title: "Blog", href: blogHref, text: "Sample posts with markdown and code." },
      {
        img: "pic02.jpg",
        title: "Search",
        href: searchHref,
        text: "Query demo pages through Dune search.",
      },
      {
        img: "pic03.jpg",
        title: "Archives",
        href: archivesHref,
        text: "Browse posts grouped by year.",
      },
      { img: "pic04.jpg", title: "About", href: aboutHref, text: "Learn more about this demo site." },
      {
        img: "pic05.jpg",
        title: "Welcome",
        href: welcomeHref,
        text: "Read the welcome post.",
      },
    ];
    return (
      <LayoutComponent {...props} landing>
        <section class="carousel">
          <div class="reel">
            {carousel.map((item) => (
              <article key={item.href}>
                <a href={item.href} class="image featured">
                  <img src={img(item.img)} alt="" />
                </a>
                <header>
                  <h3><a href={item.href}>{item.title}</a></h3>
                </header>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div class="wrapper style2">
          <article id="main" class="container special">
            <header>
              <h2><a href={blogHref}>{String(fm.title ?? "Welcome")}</a></h2>
              {subtitle && <p>{String(subtitle)}</p>}
            </header>
            {children && <div data-dune-body>{children}</div>}
            <footer>
              <a href={blogHref} class="button">{continueReading}</a>
            </footer>
          </article>
        </div>

        <div class="wrapper style1">
          <section id="features" class="container special">
            <div class="row">
              <div class="col-4 col-12-medium">
                <section class="special">
                  <a href={blogHref} class="image featured">
                    <img src={img("pic06.jpg")} alt="" />
                  </a>
                  <header><h3><a href={blogHref}>The Blog</a></h3></header>
                  <p>Collection-driven posts with pagination support.</p>
                </section>
              </div>
              <div class="col-4 col-12-medium">
                <section class="special">
                  <a href={searchHref} class="image featured">
                    <img src={img("pic07.jpg")} alt="" />
                  </a>
                  <header><h3><a href={searchHref}>Search</a></h3></header>
                  <p>Find pages across the demo site.</p>
                </section>
              </div>
              <div class="col-4 col-12-medium">
                <section class="special">
                  <a href={archivesHref} class="image featured">
                    <img src={img("pic08.jpg")} alt="" />
                  </a>
                  <header><h3><a href={archivesHref}>Archives</a></h3></header>
                  <p>Chronological index of all posts.</p>
                </section>
              </div>
            </div>
          </section>
        </div>

        <div class="copyright">
          <ul class="menu">
            <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
            {showCredit && (
              <li>
                {tr("credit.design", "Design")}:{" "}
                <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
              </li>
            )}
          </ul>
        </div>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div class="wrapper style1">
        <div class="container">
          <article id="main" class="special">
            <header>
              <h2><a href={page.route}>{String(fm.title ?? "")}</a></h2>
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
