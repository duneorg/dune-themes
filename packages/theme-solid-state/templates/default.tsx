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
  const themeName = config?.theme?.name ?? "solid-state";
  const img = (file: string) => themeImage(themeName, file);
  const copyrightName = (themeConfig?.footer_text as string) || "Untitled";

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="banner">
          <div class="inner">
            <div class="logo"><span class="icon fa-gem"></span></div>
            <h2>{page.frontmatter.title ?? "Solid State"}</h2>
            <p>Responsive site template adapted from <a href="https://html5up.net/solid-state">HTML5 UP</a> for Dune CMS.</p>
          </div>
        </section>

        <section id="wrapper">
          <section id="one" class="wrapper spotlight style1">
            <div class="inner">
              <a href="/blog" class="image"><img src={img("pic01.jpg")} alt="" /></a>
              <div class="content">
                <h2 class="major">Blog &amp; posts</h2>
                <p>Collection-driven blog listing with dated posts, markdown, and code samples from the shared demo content.</p>
                <a href="/blog" class="special">Learn more</a>
              </div>
            </div>
          </section>

          <section id="two" class="wrapper alt spotlight style2">
            <div class="inner">
              <a href="/search" class="image"><img src={img("pic02.jpg")} alt="" /></a>
              <div class="content">
                <h2 class="major">Search</h2>
                <p>Query demo pages through Dune&apos;s search template and API endpoint.</p>
                <a href="/search" class="special">Learn more</a>
              </div>
            </div>
          </section>

          <section id="three" class="wrapper spotlight style3">
            <div class="inner">
              <a href="/archives" class="image"><img src={img("pic03.jpg")} alt="" /></a>
              <div class="content">
                <h2 class="major">Archives</h2>
                <p>Browse all posts grouped by year in a clean chronological index.</p>
                <a href="/archives" class="special">Learn more</a>
              </div>
            </div>
          </section>

          <section id="four" class="wrapper alt style1">
            <div class="inner">
              <h2 class="major">Built for Dune</h2>
              <p>Upstream Solid State CSS with homepage spotlight sections and generic-page inner layout preserved.</p>
              {children && <div data-dune-body>{children}</div>}
              <section class="features">
                <article>
                  <a href="/blog" class="image"><img src={img("pic04.jpg")} alt="" /></a>
                  <h3 class="major">Read the blog</h3>
                  <p>Sample posts with markdown, code blocks, and taxonomy tags.</p>
                  <a href="/blog" class="special">Learn more</a>
                </article>
                <article>
                  <a href="/about" class="image"><img src={img("pic05.jpg")} alt="" /></a>
                  <h3 class="major">About page</h3>
                  <p>Inner pages use the upstream generic wrapper layout.</p>
                  <a href="/about" class="special">Learn more</a>
                </article>
                <article>
                  <a href="/search" class="image"><img src={img("pic06.jpg")} alt="" /></a>
                  <h3 class="major">Search demo</h3>
                  <p>Full-text search across demo content.</p>
                  <a href="/search" class="special">Learn more</a>
                </article>
                <article>
                  <a href="/archives" class="image"><img src={img("pic07.jpg")} alt="" /></a>
                  <h3 class="major">Year archives</h3>
                  <p>Chronological post index grouped by year.</p>
                  <a href="/archives" class="special">Learn more</a>
                </article>
              </section>
              <ul class="actions">
                <li><a href="/blog" class="button">Browse All</a></li>
              </ul>
            </div>
          </section>
        </section>

        <section id="footer">
          <div class="inner">
            <h2 class="major">Get in touch</h2>
            <p>Start with the blog or browse the about page for more on this demo site.</p>
            <ul class="actions">
              <li><a href="/blog" class="button">Get Started</a></li>
              <li><a href="/about" class="button">About</a></li>
            </ul>
            <ul class="copyright">
              <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
              <li>Design: <a href="https://html5up.net/solid-state">HTML5 UP</a></li>
            </ul>
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section id="wrapper">
        <header>
          <div class="inner">
            <h2>{page.frontmatter.title}</h2>
            {subtitle && <p>{String(subtitle)}</p>}
          </div>
        </header>
        <div class="wrapper">
          <div class="inner">
            {cover && (
              <a href={page.route} class="image">
                <img src={cover} alt="" />
              </a>
            )}
            <div data-dune-body>{children}</div>
          </div>
        </div>
      </section>
    </LayoutComponent>
  );
}
