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
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = safeHref(fm.cover);
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;

  return (
    <LayoutComponent {...props}>
      <div id="content">
        <article class="box post">
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
    </LayoutComponent>
  );
}
