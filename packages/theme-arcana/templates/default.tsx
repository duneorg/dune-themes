/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
  t?: (key: string, fallback?: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = safeHref(fm.cover);
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";

  // Upstream Arcana never drops body into #page-wrapper bare — every band
  // after #banner is section.wrapper.styleN > .container (> #content).
  // Home demo markdown uses the same shell; banner already carries the brand.
  if (isHome) {
    return (
      <LayoutComponent {...props}>
        {children && (
          <section class="wrapper style1">
            <div class="container">
              <div id="content">
                <div data-dune-body>{children}</div>
              </div>
            </div>
          </section>
        )}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <section class="wrapper style1">
        <div class="container">
          <div id="content">
            <article>
              <header>
                <h2>{page.frontmatter.title}</h2>
                {subtitle && <p>{String(subtitle)}</p>}
              </header>
              {cover && (
                <span class="image featured">
                  <img src={cover} alt="" />
                </span>
              )}
              <div data-dune-body>{children}</div>
            </article>
          </div>
        </div>
      </section>
    </LayoutComponent>
  );
}
