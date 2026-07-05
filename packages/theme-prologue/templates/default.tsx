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
  const themeName = config?.theme?.name ?? "prologue";
  const img = (file: string) => themeImage(themeName, file);
  const siteTitle = themeConfig?.footer_text ? String(themeConfig.footer_text) : "Prologue";

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="top" class="one dark cover">
          <div class="container">
            <header>
              <h2 class="alt">
                Hi! I&apos;m <strong>{siteTitle}</strong>, a responsive<br />
                site template adapted from <a href="https://html5up.net/prologue">HTML5 UP</a>.
              </h2>
              <p>
                {page.frontmatter.title ?? "Prologue for Dune"} — blog posts, search, archives,<br />
                and inner pages with the upstream sidebar shell preserved.
              </p>
            </header>
            {children && <div data-dune-body>{children}</div>}
            <footer>
              <a href="#portfolio" class="button scrolly">Explore</a>
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
                  <a href="/blog" class="image fit"><img src={img("pic02.jpg")} alt="" /></a>
                  <header><h3><a href="/blog">The Blog</a></h3></header>
                </article>
                <article class="item">
                  <a href="/search" class="image fit"><img src={img("pic03.jpg")} alt="" /></a>
                  <header><h3><a href="/search">Search</a></h3></header>
                </article>
              </div>
              <div class="col-4 col-12-mobile">
                <article class="item">
                  <a href="/archives" class="image fit"><img src={img("pic04.jpg")} alt="" /></a>
                  <header><h3><a href="/archives">Archives</a></h3></header>
                </article>
                <article class="item">
                  <a href="/about" class="image fit"><img src={img("pic05.jpg")} alt="" /></a>
                  <header><h3><a href="/about">About</a></h3></header>
                </article>
              </div>
              <div class="col-4 col-12-mobile">
                <article class="item">
                  <a href="/blog" class="image fit"><img src={img("pic06.jpg")} alt="" /></a>
                  <header><h3><a href="/blog">Welcome Post</a></h3></header>
                </article>
                <article class="item">
                  <a href="/blog" class="image fit"><img src={img("pic07.jpg")} alt="" /></a>
                  <header><h3><a href="/blog">Code Samples</a></h3></header>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="about" class="three">
          <div class="container">
            <header><h2>About Me</h2></header>
            <a href="/about" class="image featured"><img src={img("pic08.jpg")} alt="" /></a>
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
              <li><a href="/blog" class="button">Read the Blog</a></li>
              <li><a href="/about" class="button">About</a></li>
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
