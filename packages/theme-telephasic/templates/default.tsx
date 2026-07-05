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
  const themeName = config?.theme?.name ?? "telephasic";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <div class="wrapper">
          <div class="container">
            <div class="row">
              <section class="col-6 col-12-narrower feature">
                <div class="image-wrapper first">
                  <a href="/blog" class="image featured first">
                    <img src={img("pic01.jpg")} alt="" />
                  </a>
                </div>
                <header>
                  <h2>Built for Dune CMS</h2>
                </header>
                <p>
                  Blog posts, search, archives, and inner pages with upstream Telephasic styling
                  preserved from HTML5 UP.
                </p>
                <ul class="actions">
                  <li><a href="/blog" class="button">Read the blog</a></li>
                </ul>
              </section>
              <section class="col-6 col-12-narrower feature">
                <div class="image-wrapper">
                  <a href="/about" class="image featured">
                    <img src={img("pic02.jpg")} alt="" />
                  </a>
                </div>
                <header>
                  <h2>Responsive business layout</h2>
                </header>
                <p>
                  Hero banner, feature rows, promo band, and footer shell match the original
                  Telephasic template structure.
                </p>
                <ul class="actions">
                  <li><a href="/about" class="button">Learn more</a></li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div id="promo-wrapper">
          <section id="promo">
            <h2>Explore the demo site</h2>
            <a href="/blog" class="button">Browse posts</a>
          </section>
        </div>

        <div class="wrapper">
          <section class="container">
            <header class="major">
              <h2>Demo templates included</h2>
              <p>Blog listing, posts, search results, archives, and error pages</p>
            </header>
            <div class="row features">
              <section class="col-4 col-12-narrower feature">
                <div class="image-wrapper first">
                  <a href="/blog" class="image featured"><img src={img("pic03.jpg")} alt="" /></a>
                </div>
                <p>Collection-driven blog at <a href="/blog">/blog</a> with dated posts from shared demo content.</p>
              </section>
              <section class="col-4 col-12-narrower feature">
                <div class="image-wrapper">
                  <a href="/search" class="image featured"><img src={img("pic04.jpg")} alt="" /></a>
                </div>
                <p>Search demo pages through Dune&apos;s search template and API endpoint.</p>
              </section>
              <section class="col-4 col-12-narrower feature">
                <div class="image-wrapper">
                  <a href="/archives" class="image featured"><img src={img("pic05.jpg")} alt="" /></a>
                </div>
                <p>Browse all posts grouped by year in a chronological index.</p>
              </section>
            </div>
            <ul class="actions major">
              <li><a href="/blog" class="button">Get started</a></li>
            </ul>
          </section>
        </div>

        {children && (
          <div class="wrapper">
            <div class="container">
              <div data-dune-body>{children}</div>
            </div>
          </div>
        )}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div class="wrapper">
        <div class="container" id="main">
          <article id="content">
            <header>
              <h2>{page.frontmatter.title}</h2>
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
