/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = safeHref(fm.cover);
  const isHome = (() => { const r = pathname ?? page?.route ?? "/"; const n = r !== "/" && r.endsWith("/") ? r.slice(0, -1) : r; return n === "/" || n === "/home"; })();

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        {/* Home is the Dimension landing header; optional body omitted. */}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <h2 class="major">{page.frontmatter.title}</h2>
      {cover && (
        <span class="image main">
          <img src={cover} alt="" />
        </span>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
