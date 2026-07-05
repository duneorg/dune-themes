/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, site } = props;
  const isHome = (pathname ?? page?.route ?? "/") === "/";

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        <div class="items">
          <div class="item intro span-2">
            <h1>{page.frontmatter.title ?? site?.title ?? "Parallelism"}</h1>
            {site?.description && <p>{site.description}</p>}
          </div>
        </div>
        {children && (
          <div class="items">
            <article class="item prose span-3">
              <div data-dune-body>{children}</div>
            </article>
          </div>
        )}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <div class="items">
        <div class="item intro span-2">
          <h1>{page.frontmatter.title}</h1>
        </div>
        <article class="item prose span-3">
          <div data-dune-body>{children}</div>
        </article>
      </div>
    </LayoutComponent>
  );
}
