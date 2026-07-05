/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, site, config, themeConfig, nav } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const themeName = config?.theme?.name ?? "astral";
  const avatarUrl = (themeConfig?.avatar as string) ||
    `/themes/${themeName}/static/html5up/images/me.jpg`;
  const homeSubtitle = (themeConfig?.home_subtitle as string) || site?.description || "";
  const workLink = (nav ?? []).find((item) => item.route !== "/" && item.route.includes("blog"))
    ?.route ?? (nav ?? []).find((item) => item.route !== "/")?.route ?? "#work";

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        <article id="home" class="panel intro">
          <header>
            <h1>{page.frontmatter.title ?? site?.title ?? "Astral"}</h1>
            {homeSubtitle && <p>{homeSubtitle}</p>}
          </header>
          <a href={workLink} class="jumplink pic">
            <span class="arrow icon solid fa-chevron-right">
              <span>See my work</span>
            </span>
            <img src={avatarUrl} alt="" />
          </a>
          {children && <div data-dune-body>{children}</div>}
        </article>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <article class="panel">
        <header>
          <h2>{page.frontmatter.title}</h2>
        </header>
        {cover && (
          <a href={page.route} class="image fit">
            <img src={cover} alt="" />
          </a>
        )}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
