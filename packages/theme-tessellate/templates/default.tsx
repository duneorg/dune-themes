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
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, themeConfig, site, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const basePath = site?.basePath ?? "";
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const isHome = (() => { const r = pathname ?? page?.route ?? "/"; const n = r !== "/" && r.endsWith("/") ? r.slice(0, -1) : r; return n === "/" || n === "/home"; })();
  const themeName = config?.theme?.name ?? "tessellate";
  const img = (file: string) => themeImage(themeName, file);
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const heroTitle = (themeConfig?.hero_title as string) || `Welcome to ${site?.title ?? "Tessellate"}`;
  const heroSubtitle = (themeConfig?.hero_subtitle as string) || site?.description ||
    "A responsive site theme adapted from HTML5 UP for Dune CMS";
  const creditHref = safeHref("https://html5up.net/tessellate") ?? "https://html5up.net/tessellate";
  const githubHref = safeHref("https://github.com/duneorg/dune-themes") ??
    "https://github.com/duneorg/dune-themes";
  const duneHref = safeHref("https://getdune.org") ?? "https://getdune.org";

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="header" class="dark">
          <header>
            <h1>{heroTitle}</h1>
            <p>{heroSubtitle}</p>
          </header>
          <footer>
            <a href="#first" class="button scrolly">{tr("cta.explore", "Explore the demo")}</a>
          </footer>
        </section>

        <section id="first" class="main">
          <header>
            <div class="container">
              <h2>Tessellate for Dune</h2>
              <p>
                Full-screen sections, icon features, image grids, and contact footer —
                adapted from HTML5 UP with blog, search, and archives templates.
              </p>
            </div>
          </header>
          <div class="content dark style1 featured">
            <div class="container">
              <div class="row">
                <div class="col-4 col-12-narrow">
                  <section>
                    <span class="feature-icon"><span class="icon fa-clock"></span></span>
                    <header><h3>Blog</h3></header>
                    <p>Sample posts with markdown, code blocks, and tags at <a href={withBase(basePath, "/blog")}>/blog</a>.</p>
                  </section>
                </div>
                <div class="col-4 col-12-narrow">
                  <section>
                    <span class="feature-icon"><span class="icon solid fa-bolt"></span></span>
                    <header><h3>Search</h3></header>
                    <p>Query demo pages through Dune&apos;s search template at <a href={withBase(basePath, "/search")}>/search</a>.</p>
                  </section>
                </div>
                <div class="col-4 col-12-narrow">
                  <section>
                    <span class="feature-icon"><span class="icon solid fa-cloud"></span></span>
                    <header><h3>Archives</h3></header>
                    <p>Browse posts by year at <a href={withBase(basePath, "/archives")}>/archives</a>.</p>
                  </section>
                </div>
                <div class="col-12">
                  <footer>
                    <a href="#second" class="button scrolly">See the gallery</a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="second" class="main">
          <header>
            <div class="container">
              <h2>Built on HTML5 UP</h2>
              <p>Upstream Tessellate CSS with scroll sections and responsive grid preserved.</p>
            </div>
          </header>
          <div class="content dark style2">
            <div class="container">
              <div class="row">
                <div class="col-4 col-12-narrow">
                  <section>
                    <h3>Responsive shell</h3>
                    <p>Section-based landing layout with dark content bands and featured styles.</p>
                    <footer>
                      <a href="#third" class="button scrolly">Continue</a>
                    </footer>
                  </section>
                </div>
                <div class="col-8 col-12-narrow">
                  <div class="row">
                    <div class="col-6"><a href={withBase(basePath, "/blog")} class="image fit"><img src={img("pic01.jpg")} alt="" /></a></div>
                    <div class="col-6"><a href={withBase(basePath, "/about")} class="image fit"><img src={img("pic02.jpg")} alt="" /></a></div>
                    <div class="col-6"><a href={withBase(basePath, "/search")} class="image fit"><img src={img("pic03.jpg")} alt="" /></a></div>
                    <div class="col-6"><a href={withBase(basePath, "/archives")} class="image fit"><img src={img("pic04.jpg")} alt="" /></a></div>
                    <div class="col-6"><a href={withBase(basePath, "/blog")} class="image fit"><img src={img("pic05.jpg")} alt="" /></a></div>
                    <div class="col-6"><a href="https://html5up.net/tessellate" class="image fit"><img src={img("pic06.jpg")} alt="" /></a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="third" class="main">
          <header>
            <div class="container">
              <h2>Dune CMS ready</h2>
              <p>Inner pages use a simplified Tessellate content band with the same typography.</p>
            </div>
          </header>
          <div class="content dark style3">
            <div class="container">
              <span class="image featured"><img src={img("pic07.jpg")} alt="" /></span>
              <div class="row">
                <div class="col-4 col-12-narrow">
                  <h3>CC BY 3.0</h3>
                  <p>Design by HTML5 UP. Keep visible attribution on live sites per the upstream license.</p>
                </div>
                <div class="col-4 col-12-narrow">
                  <p>
                    Tessellate is a single-page scroll template — this port keeps the landing
                    faithful while adding standard Dune blog and utility templates.
                  </p>
                </div>
                <div class="col-4 col-12-narrow">
                  <p>Start with the blog or read the about page for more on this demo site.</p>
                  <footer>
                    <a href="#fourth" class="button scrolly">Contact band</a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="fourth" class="main">
          <header>
            <div class="container">
              <h2>Ready to explore?</h2>
              <p>Links below point to the demo templates included with this theme.</p>
            </div>
          </header>
          <div class="content style4 featured">
            <div class="container medium">
              <ul class="actions special">
                <li><a href={withBase(basePath, "/blog")} class="button">{tr("nav.blog", "Blog")}</a></li>
                <li><a href={withBase(basePath, "/about")} class="button alt">{tr("cta.about", "About")}</a></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="footer">
          <ul class="icons">
            <li>
              <a href={githubHref} class="icon brands fa-github" target="_blank" rel="noopener noreferrer">
                <span class="label">GitHub</span>
              </a>
            </li>
            <li>
              <a href={duneHref} class="icon solid fa-globe" target="_blank" rel="noopener noreferrer">
                <span class="label">Dune</span>
              </a>
            </li>
            <li>
              <a href={creditHref} class="icon brands fa-html5" target="_blank" rel="noopener noreferrer">
                <span class="label">HTML5 UP</span>
              </a>
            </li>
          </ul>
          <div class="copyright">
            <ul class="menu">
              <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
              {showCredit && (
                <li>
                  {tr("credit.design", "Design")}:{" "}
                  <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                </li>
              )}
            </ul>
          </div>
        </section>

        {children && <div class="container" data-dune-body>{children}</div>}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section class="main">
        <header>
          <div class="container">
            <h2>{page.frontmatter.title}</h2>
            {subtitle && <p>{String(subtitle)}</p>}
          </div>
        </header>
        <div class="content dark style1">
          <div class="container">
            {cover && (
              <span class="image featured"><img src={cover} alt="" /></span>
            )}
            <div data-dune-body>{children}</div>
            <ul class="actions special">
              <li><a href={withBase(basePath, "/")} class="button alt">{tr("error.home", "Back to home")}</a></li>
            </ul>
          </div>
        </div>
      </section>
    </LayoutComponent>
  );
}
