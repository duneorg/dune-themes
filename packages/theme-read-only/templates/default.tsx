/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  config?: TemplateProps["config"];
  pathname?: string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, config, pathname } = props;
  const themeName = config?.theme?.name ?? "read-only";
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = safeHref(fm.cover);
  const banner = typeof fm.banner === "string" ? fm.banner :
    (pathname ?? page?.route ?? "/") === "/" ?
      `/themes/${themeName}/static/html5up/images/banner.jpg` : undefined;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;

  return (
    <LayoutComponent {...props}>
      <section>
        {banner && (
          <div class="image main" data-position="center">
            <img src={banner} alt="" />
          </div>
        )}
        <div class="container">
          <header class="major">
            <h2>{page.frontmatter.title}</h2>
            {subtitle && <p>{String(subtitle)}</p>}
          </header>
          {cover && !banner && (
            <div class="image main" data-position="center">
              <img src={cover} alt="" />
            </div>
          )}
          <div data-dune-body>{children}</div>
        </div>
      </section>
    </LayoutComponent>
  );
}
