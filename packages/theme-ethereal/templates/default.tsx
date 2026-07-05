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
  const themeName = config?.theme?.name ?? "ethereal";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section class="panel spotlight medium right" id="first">
          <div class="content span-7">
            <h2 class="major">{page.frontmatter.title ?? "Welcome"}</h2>
            {children && <div data-dune-body>{children}</div>}
            {!children && subtitle && <p>{String(subtitle)}</p>}
          </div>
          <div class="image filtered tinted" data-position="top left">
            <img src={img("pic02.jpg")} alt="" />
          </div>
        </section>

        <section class="panel color1">
          <div class="intro joined">
            <h2 class="major">Built for Dune</h2>
            <p>Blog posts, search, archives, and inner pages with the Ethereal panel layout.</p>
          </div>
          <div class="inner">
            <ul class="grid-icons three connected">
              <li><a href="/blog" class="icon fa-comment"><span class="label">Blog</span></a></li>
              <li><a href="/search" class="icon solid fa-search"><span class="label">Search</span></a></li>
              <li><a href="/archives" class="icon solid fa-archive"><span class="label">Archives</span></a></li>
              <li><a href="/about" class="icon solid fa-user"><span class="label">About</span></a></li>
            </ul>
          </div>
        </section>

        <section class="panel spotlight large left">
          <div class="content span-5">
            <h2 class="major">Explore the demo</h2>
            <p>
              Sample posts with markdown, code blocks, and taxonomy tags from the shared demo content.
              Start with the <a href="/blog">blog</a>.
            </p>
          </div>
          <div class="image filtered tinted" data-position="top right">
            <img src={img("pic03.jpg")} alt="" />
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <header>
        <h2 class="major">{page.frontmatter.title}</h2>
        {subtitle && <p>{String(subtitle)}</p>}
      </header>
      {cover && (
        <span class="image fit">
          <img src={cover} alt="" />
        </span>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
