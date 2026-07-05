/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
  site?: { title?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, site } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const themeName = config?.theme?.name ?? "minimaxing";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <div id="main">
          <div class="container">
            <div class="row main-row">
              <div class="col-4 col-12-medium">
                <section>
                  <h2>Welcome to {site?.title ?? "Minimaxing"}!</h2>
                  <p>
                    This is <strong>Minimaxing</strong> for Dune — adapted from{" "}
                    <a href="https://html5up.net/minimaxing">HTML5 UP</a> with blog posts, search,
                    archives, and responsive column layouts.
                  </p>
                  {children && <div data-dune-body>{children}</div>}
                  <footer class="controls">
                    <a href="/blog" class="button">Read the blog</a>
                  </footer>
                </section>
              </div>
              <div class="col-4 col-6-medium col-12-small">
                <section>
                  <h2>Explore</h2>
                  <ul class="small-image-list">
                    <li>
                      <a href="/blog"><img src={img("pic2.jpg")} alt="" class="left" /></a>
                      <h4><a href="/blog">Blog</a></h4>
                      <p>Sample posts with markdown, code blocks, and taxonomy tags.</p>
                    </li>
                    <li>
                      <a href="/search"><img src={img("pic1.jpg")} alt="" class="left" /></a>
                      <h4><a href="/search">Search</a></h4>
                      <p>Query demo pages through Dune&apos;s search template.</p>
                    </li>
                  </ul>
                </section>
              </div>
              <div class="col-4 col-6-medium col-12-small">
                <section>
                  <h2>Quick links</h2>
                  <div class="row">
                    <div class="col-6 col-12-small">
                      <ul class="link-list">
                        <li><a href="/archives">Archives</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/blog">Latest posts</a></li>
                      </ul>
                    </div>
                    <div class="col-6 col-12-small">
                      <ul class="link-list">
                        <li><a href="https://html5up.net/minimaxing">HTML5 UP</a></li>
                        <li><a href="https://getdune.org">Dune CMS</a></li>
                        <li><a href="https://github.com/duneorg/dune-themes">Source</a></li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
              <div class="col-6 col-12-medium">
                <section>
                  <h2>Featured content</h2>
                  <ul class="big-image-list">
                    <li>
                      <a href="/blog"><img src={img("pic3.jpg")} alt="" class="left" /></a>
                      <h3>Blog &amp; posts</h3>
                      <p>Collection-driven listing at /blog with dated posts and pagination support.</p>
                    </li>
                    <li>
                      <a href="/archives"><img src={img("pic4.jpg")} alt="" class="left" /></a>
                      <h3>Archives</h3>
                      <p>Browse all posts grouped by year in a clean chronological index.</p>
                    </li>
                  </ul>
                </section>
              </div>
              <div class="col-6 col-12-medium">
                <article class="blog-post">
                  <h2>Built for Dune CMS</h2>
                  <a href="/blog"><img src={img("pic6.jpg")} alt="" class="top blog-post-image" /></a>
                  <h3>Get started</h3>
                  <p>
                    Upstream Minimaxing CSS with header, banner, multi-column main area, and footer
                    wrappers preserved. Inner pages use the one-column layout from the upstream template.
                  </p>
                  <footer class="controls">
                    <a href="/blog" class="button">Continue Reading</a>
                  </footer>
                </article>
              </div>
            </div>
          </div>
        </div>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main">
        <div class="container">
          <div class="row main-row">
            <div class="col-12">
              <section>
                <h2>{page.frontmatter.title}</h2>
                {subtitle && <p>{String(subtitle)}</p>}
                {cover && <img src={cover} alt="" class="top blog-post-image" />}
                <div data-dune-body>{children}</div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
