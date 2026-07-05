/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";

function StoryFooter({ showCredit }: { showCredit: boolean }) {
  if (!showCredit) return null;
  return (
    <footer class="wrapper style1 align-center">
      <div class="inner">
        <ul class="icons">
          <li><a href="/blog" class="icon brands style2 fa-twitter"><span class="label">Blog</span></a></li>
          <li><a href="/search" class="icon brands style2 fa-facebook-f"><span class="label">Search</span></a></li>
          <li><a href="/archives" class="icon brands style2 fa-instagram"><span class="label">Archives</span></a></li>
        </ul>
        <p>&copy; {new Date().getFullYear()} Story Demo. Design: <a href="https://html5up.net/story">HTML5 UP</a>.</p>
      </div>
    </footer>
  );
}

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
  const themeName = config?.theme?.name ?? "story";
  const img = (file: string) => themeImage(themeName, file);
  const showCredit = themeConfig?.show_html5up_credit !== false;

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
          <div class="content">
            <h1>{page.frontmatter.title ?? "Story"}</h1>
            <p class="major">
              A responsive one-page template adapted from{" "}
              <a href="https://html5up.net/story">HTML5 UP</a> for Dune CMS — blog, search, and archives included.
            </p>
            {children && <div data-dune-body>{children}</div>}
            <ul class="actions stacked">
              <li><a href="#first" class="button big wide smooth-scroll-middle">Get Started</a></li>
            </ul>
          </div>
          <div class="image"><img src={img("banner.jpg")} alt="" /></div>
        </section>

        <section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="first">
          <div class="content">
            <h2>Read the blog</h2>
            <p>Sample posts with markdown, code blocks, and taxonomy tags from the shared demo content.</p>
            <ul class="actions stacked"><li><a href="/blog" class="button">Learn More</a></li></ul>
          </div>
          <div class="image"><img src={img("spotlight01.jpg")} alt="" /></div>
        </section>

        <section class="spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in">
          <div class="content">
            <h2>Search demo</h2>
            <p>Query demo pages through Dune&apos;s search template and API endpoint.</p>
            <ul class="actions stacked"><li><a href="/search" class="button">Learn More</a></li></ul>
          </div>
          <div class="image"><img src={img("spotlight02.jpg")} alt="" /></div>
        </section>

        <section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in">
          <div class="content">
            <h2>Browse archives</h2>
            <p>All posts grouped by year in a clean chronological index.</p>
            <ul class="actions stacked"><li><a href="/archives" class="button">Learn More</a></li></ul>
          </div>
          <div class="image"><img src={img("spotlight03.jpg")} alt="" /></div>
        </section>

        <section class="wrapper style1 align-center">
          <div class="inner">
            <h2>Massa sed condimentum</h2>
            <p>Upstream Story CSS with divided wrapper, fullscreen banner, spotlight sections, and gallery grid preserved.</p>
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
            <h2>Ready to explore?</h2>
            <p>Start with the blog or browse the about page for more on this demo site.</p>
            <ul class="actions stacked special">
              <li><a href="/blog" class="button wide">Read the Blog</a></li>
              <li><a href="/about" class="button wide">About</a></li>
            </ul>
          </div>
        </section>

        <StoryFooter showCredit={showCredit} />
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
      <StoryFooter showCredit={showCredit} />
    </LayoutComponent>
  );
}
