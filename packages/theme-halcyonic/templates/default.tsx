/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

function withBase(basePath: string, path: string): string {
  const joined = `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
  return joined.replace(/([^:]\/)\/+/g, "$1") || "/";
}


export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, site, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const basePath = site?.basePath ?? "";
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const isHome = (() => { const r = pathname ?? page?.route ?? "/"; const n = r !== "/" && r.endsWith("/") ? r.slice(0, -1) : r; return n === "/" || n === "/home"; })();
  const themeName = config?.theme?.name ?? "halcyonic";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="features">
          <div class="container">
            <div class="row">
              <div class="col-3 col-6-medium col-12-small">
                <section>
                  <a href={withBase(basePath, "/blog")} class="bordered-feature-image">
                    <img src={img("pic01.jpg")} alt="" />
                  </a>
                  <h2>Welcome to {page.frontmatter.title ?? "Halcyonic"}</h2>
                  <p>
                    A responsive site theme adapted from HTML5 UP for Dune CMS — blog posts,
                    search, archives, and clean business layouts.
                  </p>
                </section>
              </div>
              <div class="col-3 col-6-medium col-12-small">
                <section>
                  <a href={withBase(basePath, "/about")} class="bordered-feature-image">
                    <img src={img("pic02.jpg")} alt="" />
                  </a>
                  <h2>Responsive</h2>
                  <p>
                    Built on HTML5 and CSS3 with upstream markup preserved so the original
                    Halcyonic styling applies out of the box.
                  </p>
                </section>
              </div>
              <div class="col-3 col-6-medium col-12-small">
                <section>
                  <a href={withBase(basePath, "/archives")} class="bordered-feature-image">
                    <img src={img("pic03.jpg")} alt="" />
                  </a>
                  <h2>Archives &amp; Search</h2>
                  <p>
                    Browse posts by date or search the demo content with Dune&apos;s built-in
                    search template.
                  </p>
                </section>
              </div>
              <div class="col-3 col-6-medium col-12-small">
                <section>
                  <a href="https://html5up.net/halcyonic" class="bordered-feature-image">
                    <img src={img("pic04.jpg")} alt="" />
                  </a>
                  <h2>HTML5 UP</h2>
                  <p>
                    Design by HTML5 UP (CC BY 3.0). Keep visible credit on live sites per the
                    upstream license.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>

        {children && (
          <section id="content">
            <div class="container">
              <div class="row aln-center">
                <div class="col-12">
                  <section>
                    {page.frontmatter.title && (
                      <header>
                        <h2>{page.frontmatter.title}</h2>
                        {subtitle && <h3>{String(subtitle)}</h3>}
                      </header>
                    )}
                    <div data-dune-body>{children}</div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        )}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section>
        <header>
          <h2>{page.frontmatter.title}</h2>
          {subtitle && <h3>{String(subtitle)}</h3>}
        </header>
        {cover && (
          <a href={page.route} class="feature-image">
            <img src={cover} alt="" />
          </a>
        )}
        <div data-dune-body>{children}</div>
      </section>
    </LayoutComponent>
  );
}
