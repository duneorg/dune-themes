/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, themeConfig } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const themeName = config?.theme?.name ?? "helios";
  const img = (file: string) => themeImage(themeName, file);
  const copyrightName = (themeConfig?.footer_text as string) || "Untitled";

  if (isHome) {
    const carousel = [
      { img: "pic01.jpg", title: "Blog", href: "/blog", text: "Sample posts with markdown and code." },
      { img: "pic02.jpg", title: "Search", href: "/search", text: "Query demo pages through Dune search." },
      { img: "pic03.jpg", title: "Archives", href: "/archives", text: "Browse posts grouped by year." },
      { img: "pic04.jpg", title: "About", href: "/about", text: "Learn more about this demo site." },
      { img: "pic05.jpg", title: "Welcome", href: "/blog/welcome", text: "Read the welcome post." },
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
              <h2><a href="/blog">{page.frontmatter.title ?? "Welcome"}</a></h2>
              {subtitle && <p>{String(subtitle)}</p>}
            </header>
            {children && <div data-dune-body>{children}</div>}
            <footer>
              <a href="/blog" class="button">Continue Reading</a>
            </footer>
          </article>
        </div>

        <div class="wrapper style1">
          <section id="features" class="container special">
            <div class="row">
              <div class="col-4 col-12-medium">
                <section class="special">
                  <a href="/blog" class="image featured"><img src={img("pic06.jpg")} alt="" /></a>
                  <header><h3><a href="/blog">The Blog</a></h3></header>
                  <p>Collection-driven posts with pagination support.</p>
                </section>
              </div>
              <div class="col-4 col-12-medium">
                <section class="special">
                  <a href="/search" class="image featured"><img src={img("pic07.jpg")} alt="" /></a>
                  <header><h3><a href="/search">Search</a></h3></header>
                  <p>Find pages across the demo site.</p>
                </section>
              </div>
              <div class="col-4 col-12-medium">
                <section class="special">
                  <a href="/archives" class="image featured"><img src={img("pic08.jpg")} alt="" /></a>
                  <header><h3><a href="/archives">Archives</a></h3></header>
                  <p>Chronological index of all posts.</p>
                </section>
              </div>
            </div>
          </section>
        </div>

        <div class="copyright">
          <ul class="menu">
            <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
            <li>Design: <a href="https://html5up.net/helios">HTML5 UP</a></li>
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
              <h2><a href={page.route}>{page.frontmatter.title}</a></h2>
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
