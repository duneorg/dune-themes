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
  const themeName = config?.theme?.name ?? "directive";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <header class="major container medium">
          <h2>{page.frontmatter.title ?? "Welcome to Directive"}</h2>
          {children && <div data-dune-body>{children}</div>}
        </header>

        <div class="box alt container">
          <section class="feature left">
            <span class="image icon solid fa-signal">
              <img src={img("pic01.jpg")} alt="" />
            </span>
            <div class="content">
              <h3><a href={withBase(basePath, "/blog")}>The Blog</a></h3>
              <p>Collection-driven posts with markdown, code samples, and taxonomy tags.</p>
            </div>
          </section>
          <section class="feature right">
            <span class="image icon solid fa-code">
              <img src={img("pic02.jpg")} alt="" />
            </span>
            <div class="content">
              <h3><a href={withBase(basePath, "/search")}>Search</a></h3>
              <p>Query demo pages through Dune&apos;s search template and API endpoint.</p>
            </div>
          </section>
          <section class="feature left">
            <span class="image icon solid fa-mobile-alt">
              <img src={img("pic03.jpg")} alt="" />
            </span>
            <div class="content">
              <h3><a href={withBase(basePath, "/archives")}>Archives</a></h3>
              <p>Browse all posts grouped by year in a chronological index.</p>
            </div>
          </section>
        </div>

        <footer class="major container medium">
          <h3>Ready to explore?</h3>
          <p>Start with the blog or browse the about page for more on this demo site.</p>
          <ul class="actions special">
            <li><a href={withBase(basePath, "/blog")} class="button">{tr("cta.read_blog", "Read the Blog")}</a></li>
            <li><a href={withBase(basePath, "/about")} class="button alt">{tr("cta.about", "About")}</a></li>
          </ul>
        </footer>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div class="box container">
        <header>
          <h2>{page.frontmatter.title}</h2>
          {subtitle && <p>{String(subtitle)}</p>}
        </header>
        {cover && (
          <span class="image fit">
            <img src={cover} alt="" />
          </span>
        )}
        <div data-dune-body>{children}</div>
      </div>
    </LayoutComponent>
  );
}
