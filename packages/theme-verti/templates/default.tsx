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
  const themeName = config?.theme?.name ?? "verti";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <div id="features-wrapper">
          <div class="container">
            <div class="row">
              <div class="col-4 col-12-medium">
                <section class="box feature">
                  <a href="/blog" class="image featured"><img src={img("pic01.jpg")} alt="" /></a>
                  <div class="inner">
                    <header>
                      <h2>Blog &amp; posts</h2>
                      <p>Collection-driven listing at /blog</p>
                    </header>
                    <p>Sample posts with markdown, code blocks, and taxonomy tags from shared demo content.</p>
                  </div>
                </section>
              </div>
              <div class="col-4 col-12-medium">
                <section class="box feature">
                  <a href="/search" class="image featured"><img src={img("pic02.jpg")} alt="" /></a>
                  <div class="inner">
                    <header>
                      <h2>Search</h2>
                      <p>Full-text demo search</p>
                    </header>
                    <p>Query pages through Dune&apos;s search template and API endpoint.</p>
                  </div>
                </section>
              </div>
              <div class="col-4 col-12-medium">
                <section class="box feature">
                  <a href="/archives" class="image featured"><img src={img("pic03.jpg")} alt="" /></a>
                  <div class="inner">
                    <header>
                      <h2>Archives</h2>
                      <p>Posts grouped by year</p>
                    </header>
                    <p>Browse all demo posts in a clean chronological index.</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div id="main-wrapper">
          <div class="container">
            <div class="row gtr-200">
              <div class="col-4 col-12-medium">
                <div id="sidebar">
                  <section class="widget thumbnails">
                    <h3>Quick links</h3>
                    <div class="grid">
                      <div class="row gtr-50">
                        <div class="col-6"><a href="/blog" class="image fit"><img src={img("pic04.jpg")} alt="" /></a></div>
                        <div class="col-6"><a href="/about" class="image fit"><img src={img("pic05.jpg")} alt="" /></a></div>
                        <div class="col-6"><a href="/search" class="image fit"><img src={img("pic06.jpg")} alt="" /></a></div>
                        <div class="col-6"><a href="https://html5up.net/verti" class="image fit"><img src={img("pic07.jpg")} alt="" /></a></div>
                      </div>
                    </div>
                    <a href="/blog" class="button icon solid fa-file-alt">Read the blog</a>
                  </section>
                </div>
              </div>
              <div class="col-8 col-12-medium imp-medium">
                <div id="content">
                  <section class="last">
                    <h2>So what&apos;s this all about?</h2>
                    <p>
                      <strong>Verti</strong> is a business landing theme adapted from{" "}
                      <a href="https://html5up.net/verti">HTML5 UP</a> for Dune CMS — banner,
                      feature boxes, sidebar thumbnails, and widget footer preserved from upstream.
                    </p>
                    <p>
                      Design by HTML5 UP (CC BY 3.0). Keep visible credit on live sites per the
                      upstream license.
                    </p>
                    {children && <div data-dune-body>{children}</div>}
                    <a href="/about" class="button icon solid fa-arrow-circle-right">Continue reading</a>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main-wrapper">
        <div class="container">
          <div id="content">
            <article>
              <h2>{page.frontmatter.title}</h2>
              {subtitle && <p>{String(subtitle)}</p>}
              {cover && (
                <a href={page.route} class="image featured">
                  <img src={cover} alt="" />
                </a>
              )}
              <div data-dune-body>{children}</div>
            </article>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
