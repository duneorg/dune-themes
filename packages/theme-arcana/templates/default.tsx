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
    return <LayoutComponent {...props} />;
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
