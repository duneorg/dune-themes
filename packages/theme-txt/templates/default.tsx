/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const isHome = (pathname ?? page?.route ?? "/") === "/";

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        <div class="row gtr-200">
          <div class="col-12">
            <section class="box highlight">
              {page.frontmatter.title && (
                <header>
                  <h2>{page.frontmatter.title}</h2>
                  {subtitle && <p>{String(subtitle)}</p>}
                </header>
              )}
              {children && <div data-dune-body>{children}</div>}
            </section>
          </div>
        </div>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <div class="row">
        <div class="col-12">
          <div class="content">
            <article class="box page-content">
              <header>
                <h2>{page.frontmatter.title}</h2>
                {subtitle && <p>{String(subtitle)}</p>}
              </header>
              {cover && (
                <span class="image featured">
                  <img src={cover} alt="" />
                </span>
              )}
              <section>
                <div data-dune-body>{children}</div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
