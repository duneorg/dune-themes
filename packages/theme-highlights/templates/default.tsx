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
  const themeName = config?.theme?.name ?? "highlights";
  const img = (file: string) => themeImage(themeName, file);
  const bannerTitle = (themeConfig?.banner_title as string) || siteTitleFrom(props) || "Highlights";
  const tagline = (themeConfig?.tagline as string) || "A responsive single-page theme for Dune CMS";
  const copyrightName = (themeConfig?.footer_text as string) || siteTitleFrom(props) || "Untitled";

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="header">
          <header class="major">
            <h1>{bannerTitle}</h1>
            <p>{tagline}</p>
          </header>
          <div class="container">
            <ul class="actions special">
              <li><a href="#one" class="button primary scrolly">Begin</a></li>
              <li><a href="/blog" class="button scrolly">Read the Blog</a></li>
            </ul>
          </div>
        </section>

        <section id="one" class="main special">
          <div class="container">
            <span class="image fit primary"><img src={img("pic01.jpg")} alt="" /></span>
            <div class="content">
              <header class="major">
                <h2>Who we are</h2>
              </header>
              <p>
                {page.frontmatter.title ?? bannerTitle} for Dune — adapted from{" "}
                <a href="https://html5up.net/highlights">HTML5 UP Highlights</a>.
                Blog posts, search, archives, and inner pages use the upstream section layout.
              </p>
              {children && <div data-dune-body>{children}</div>}
            </div>
            <a href="#two" class="goto-next scrolly">Next</a>
          </div>
        </section>

        <section id="two" class="main special">
          <div class="container">
            <span class="image fit primary"><img src={img("pic02.jpg")} alt="" /></span>
            <div class="content">
              <header class="major">
                <h2>What we do</h2>
              </header>
              <p>Collection-driven blog at <a href="/blog">/blog</a> with dated posts, pagination, and taxonomy tags.</p>
              <ul class="icons-grid">
                <li>
                  <span class="icon solid major fa-pencil-alt"></span>
                  <h3><a href="/blog">Blog</a></h3>
                </li>
                <li>
                  <span class="icon solid major fa-search"></span>
                  <h3><a href="/search">Search</a></h3>
                </li>
                <li>
                  <span class="icon solid major fa-archive"></span>
                  <h3><a href="/archives">Archives</a></h3>
                </li>
                <li>
                  <span class="icon solid major fa-info-circle"></span>
                  <h3><a href="/about">About</a></h3>
                </li>
              </ul>
            </div>
            <a href="#three" class="goto-next scrolly">Next</a>
          </div>
        </section>

        <section id="three" class="main special">
          <div class="container">
            <span class="image fit primary"><img src={img("pic03.jpg")} alt="" /></span>
            <div class="content">
              <header class="major">
                <h2>One more thing</h2>
              </header>
              <p>
                Upstream Highlights CSS with fullscreen scroll sections on the home page and
                a compact inner-page shell for posts and utility pages.
              </p>
              <ul class="actions special">
                <li><a href="/blog" class="button primary">Get Started</a></li>
              </ul>
            </div>
            <a href="#footer" class="goto-next scrolly">Next</a>
          </div>
        </section>

        <section id="footer">
          <footer>
            <ul class="copyright">
              <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
              <li>Design: <a href="https://html5up.net/highlights">HTML5 UP</a></li>
            </ul>
          </footer>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <header class="major">
        <h2>{page.frontmatter.title}</h2>
        {subtitle && <p>{String(subtitle)}</p>}
      </header>
      {cover && (
        <span class="image fit"><img src={cover} alt="" /></span>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}

function siteTitleFrom(props: TemplateProps): string | undefined {
  return props.site?.title;
}
