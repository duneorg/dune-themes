/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, site } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = safeHref(fm.cover);
  const isHome = (pathname ?? page?.route ?? "/") === "/";

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        <header>
          <h1>
            {page.frontmatter.title ?? site?.title ?? "Phantom"}
          </h1>
          {(site?.description || children) && (
            <p>{site?.description ?? ""}</p>
          )}
        </header>
        {children && <div data-dune-body>{children}</div>}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <h1>{page.frontmatter.title}</h1>
      {cover && (
        <span class="image main">
          <img src={cover} alt="" />
        </span>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
