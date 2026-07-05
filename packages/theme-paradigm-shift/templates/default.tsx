/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { galleryImage, themeImage } from "../utils/content.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
  themeConfig?: Record<string, unknown>;
  site?: { title?: string; description?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, themeConfig, site } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const themeName = config?.theme?.name ?? "paradigm-shift";
  const img = (file: string) => themeImage(themeName, file);
  const gal = (file: string) => galleryImage(themeName, file);
  const bannerTitle = (themeConfig?.banner_title as string) || site?.title || "Paradigm Shift";
  const tagline = (themeConfig?.tagline as string) ||
    "A responsive site theme adapted from HTML5 UP for Dune CMS";
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section class="intro">
          <header>
            <h1>{bannerTitle}</h1>
            <p>{tagline}</p>
            <ul class="actions">
              <li><a href="#first" class="arrow scrolly"><span class="label">Next</span></a></li>
            </ul>
          </header>
          <div class="content">
            <span class="image fill" data-position="center"><img src={img("pic01.jpg")} alt="" /></span>
          </div>
        </section>

        <section id="first">
          <header>
            <h2>{page.frontmatter.title ?? bannerTitle} for Dune</h2>
          </header>
          <div class="content">
            <p>
              <strong>Built for Dune CMS</strong> — blog posts, search, archives, and inner pages
              with the upstream Paradigm Shift section layout preserved.
            </p>
            {children && <div data-dune-body>{children}</div>}
            <span class="image main"><img src={img("pic02.jpg")} alt="" /></span>
          </div>
        </section>

        <section>
          <header>
            <h2>Explore the demo</h2>
          </header>
          <div class="content">
            <p>Collection-driven blog at <a href="/blog">/blog</a> with dated posts and pagination.</p>
            <ul class="feature-icons">
              <li class="icon solid fa-comment"><a href="/blog">Blog &amp; posts</a></li>
              <li class="icon solid fa-search"><a href="/search">Search</a></li>
              <li class="icon solid fa-archive"><a href="/archives">Archives</a></li>
              <li class="icon solid fa-info-circle"><a href="/about">About</a></li>
            </ul>
          </div>
        </section>

        <section>
          <header>
            <h2>Gallery</h2>
          </header>
          <div class="content">
            <div class="gallery">
              <a href={gal("fulls/01.jpg")} class="landscape"><img src={gal("thumbs/01.jpg")} alt="" /></a>
              <a href={gal("fulls/02.jpg")}><img src={gal("thumbs/02.jpg")} alt="" /></a>
              <a href={gal("fulls/03.jpg")}><img src={gal("thumbs/03.jpg")} alt="" /></a>
              <a href={gal("fulls/04.jpg")} class="landscape"><img src={gal("thumbs/04.jpg")} alt="" /></a>
            </div>
          </div>
        </section>

        <section>
          <header>
            <h2>Get started</h2>
          </header>
          <div class="content">
            <p>Start with the blog or browse sample posts from the shared demo content.</p>
            <ul class="actions">
              <li><a href="/blog" class="button primary large">Read the Blog</a></li>
              <li><a href="/about" class="button large">Learn More</a></li>
            </ul>
          </div>
        </section>

        <section>
          <header>
            <h2>Get in touch</h2>
          </header>
          <div class="content">
            <p>Design by <a href="https://html5up.net/paradigm-shift">HTML5 UP</a> (CC BY 3.0).</p>
          </div>
          <footer>
            <ul class="items">
              <li>
                <h3>Site</h3>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <h3>Elsewhere</h3>
                <ul class="icons">
                  <li><a href="https://getdune.org" class="icon solid fa-cloud"><span class="label">Dune</span></a></li>
                  <li><a href="https://html5up.net" class="icon solid fa-code"><span class="label">HTML5 UP</span></a></li>
                </ul>
              </li>
            </ul>
            <p class="copyright">
              &copy; {new Date().getFullYear()} {copyrightName}. Design:{" "}
              <a href="https://html5up.net/paradigm-shift">HTML5 UP</a>
            </p>
          </footer>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      {subtitle && <p>{String(subtitle)}</p>}
      {cover && <span class="image main"><img src={cover} alt="" /></span>}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
