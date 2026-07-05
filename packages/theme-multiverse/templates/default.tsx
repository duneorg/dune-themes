/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { GALLERY_ITEMS, galleryHref } from "../utils/content.ts";

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
  const themeName = config?.theme?.name ?? "multiverse";
  const img = (file: string) => galleryHref(themeName, file);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <div id="main">
          {GALLERY_ITEMS.map((item, i) => (
            <article class="thumb" key={item.thumb}>
              <a href={img(item.full)} class="image">
                <img src={img(item.thumb)} alt="" />
              </a>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <footer id="footer" class="panel">
          <div class="inner split">
            <div>
              <section>
                <h2>{site?.title ?? "Multiverse"} for Dune</h2>
                <p>
                  {site?.description ??
                    "A responsive gallery landing theme adapted from HTML5 UP — blog posts, search, archives, and inner pages."}
                </p>
                {children && <div data-dune-body>{children}</div>}
              </section>
              <section>
                <h2>Explore</h2>
                <ul class="icons">
                  <li><a href="/blog" class="icon solid fa-comment"><span class="label">Blog</span></a></li>
                  <li><a href="/search" class="icon solid fa-search"><span class="label">Search</span></a></li>
                  <li><a href="/archives" class="icon solid fa-archive"><span class="label">Archives</span></a></li>
                  <li><a href="/about" class="icon solid fa-info-circle"><span class="label">About</span></a></li>
                </ul>
              </section>
              <p class="copyright">
                &copy; {new Date().getFullYear()} {copyrightName}. Design:{" "}
                <a href="https://html5up.net/multiverse">HTML5 UP</a>.
              </p>
            </div>
            <div>
              <section>
                <h2>Get started</h2>
                <p>Start with the blog or browse sample posts from the shared demo content.</p>
                <ul class="actions">
                  <li><a href="/blog" class="button primary">Read the Blog</a></li>
                  <li><a href="/about" class="button">About</a></li>
                </ul>
              </section>
            </div>
          </div>
        </footer>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <h2>{page.frontmatter.title}</h2>
      {subtitle && <p>{String(subtitle)}</p>}
      {cover && (
        <a href={cover} class="image"><img src={cover} alt="" /></a>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
