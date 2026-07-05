/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const themeName = config?.theme?.name ?? "stellar";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <div id="main">
          <section id="intro" class="main">
            <div class="spotlight">
              <div class="content">
                <header class="major"><h2>Ipsum sed adipiscing</h2></header>
                <p>
                  {page.frontmatter.title ?? "Stellar for Dune"} — adapted from{" "}
                  <a href="https://html5up.net/stellar">HTML5 UP</a> with blog, search, and archives.
                </p>
                {children && <div data-dune-body>{children}</div>}
                <ul class="actions"><li><a href="/blog" class="button">Learn More</a></li></ul>
              </div>
              <span class="image"><img src={img("pic01.jpg")} alt="" /></span>
            </div>
          </section>

          <section id="first" class="main special">
            <header class="major"><h2>Magna veroeros</h2></header>
            <ul class="features">
              <li>
                <span class="icon solid major style1 fa-code"></span>
                <h3><a href="/blog">Blog &amp; posts</a></h3>
                <p>Collection-driven blog listing with dated posts and markdown samples.</p>
              </li>
              <li>
                <span class="icon major style3 fa-copy"></span>
                <h3><a href="/search">Search</a></h3>
                <p>Query demo pages through Dune&apos;s search template.</p>
              </li>
              <li>
                <span class="icon major style5 fa-gem"></span>
                <h3><a href="/archives">Archives</a></h3>
                <p>Posts grouped by year in a chronological index.</p>
              </li>
            </ul>
            <footer class="major">
              <ul class="actions special"><li><a href="/blog" class="button">Learn More</a></li></ul>
            </footer>
          </section>

          <section id="second" class="main special">
            <header class="major">
              <h2>Ipsum consequat</h2>
              <p>Upstream Stellar CSS with logo header, nav, spotlight sections, and statistics grid.</p>
            </header>
            <ul class="statistics">
              <li class="style1"><span class="icon solid fa-code-branch"></span><strong>3</strong> Posts</li>
              <li class="style2"><span class="icon fa-folder-open"></span><strong>5</strong> Pages</li>
              <li class="style3"><span class="icon solid fa-signal"></span><strong>1</strong> Theme</li>
              <li class="style4"><span class="icon solid fa-laptop"></span><strong>100</strong> Responsive</li>
            </ul>
            <footer class="major">
              <ul class="actions special"><li><a href="/about" class="button">About</a></li></ul>
            </footer>
          </section>

          <section id="cta" class="main special">
            <header class="major">
              <h2>Congue imperdiet</h2>
              <p>Start with the blog or browse the about page for more on this demo site.</p>
            </header>
            <footer class="major">
              <ul class="actions special">
                <li><a href="/blog" class="button primary">Get Started</a></li>
                <li><a href="/about" class="button">Learn More</a></li>
              </ul>
            </footer>
          </section>
        </div>

        <footer id="footer">
          <section>
            <h2>Aliquam sed mauris</h2>
            <p>Design by HTML5 UP (CC BY 3.0). Keep visible attribution on live sites.</p>
            <ul class="actions"><li><a href="/blog" class="button">Learn More</a></li></ul>
          </section>
          <section>
            <h2>Explore</h2>
            <ul class="icons">
              <li><a href="/blog" class="icon solid fa-th alt"><span class="label">Blog</span></a></li>
              <li><a href="/search" class="icon solid fa-search alt"><span class="label">Search</span></a></li>
              <li><a href="/archives" class="icon solid fa-archive alt"><span class="label">Archives</span></a></li>
            </ul>
          </section>
          <p class="copyright">&copy; {new Date().getFullYear()} Stellar Demo. Design: <a href="https://html5up.net/stellar">HTML5 UP</a>.</p>
        </footer>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main">
        <section id="content" class="main">
          {cover && <span class="image main"><img src={cover} alt="" /></span>}
          <h2>{page.frontmatter.title}</h2>
          {subtitle && <p>{String(subtitle)}</p>}
          <div data-dune-body>{children}</div>
        </section>
      </div>
    </LayoutComponent>
  );
}
