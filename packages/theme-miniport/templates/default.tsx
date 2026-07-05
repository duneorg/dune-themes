/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  site?: { title?: string; description?: string };
  config?: { theme?: { name?: string } };
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, site, config, themeConfig } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const themeName = config?.theme?.name ?? "miniport";
  const heroImage = (themeConfig?.hero_image as string) ||
    `/themes/${themeName}/static/html5up/images/pic00.jpg`;
  const homeHeadline = (themeConfig?.home_headline as string) ||
    page.frontmatter.title || site?.title || "Miniport";

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        <article id="top" class="wrapper style1">
          <div class="container">
            <div class="row">
              <div class="col-4 col-5-large col-12-medium">
                <span class="image fit">
                  <img src={heroImage} alt="" />
                </span>
              </div>
              <div class="col-8 col-7-large col-12-medium">
                <header>
                  <h1>{homeHeadline}</h1>
                </header>
                {site?.description && <p>{site.description}</p>}
                {children && <div data-dune-body>{children}</div>}
              </div>
            </div>
          </div>
        </article>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <article class="wrapper style2">
        <div class="container">
          <header>
            <h2>{page.frontmatter.title}</h2>
          </header>
          {cover && (
            <span class="image fit">
              <img src={cover} alt="" />
            </span>
          )}
          <div data-dune-body>{children}</div>
        </div>
      </article>
    </LayoutComponent>
  );
}
