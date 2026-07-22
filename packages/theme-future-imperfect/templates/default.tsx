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
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const subtitle = meta.description ?? fm.description;

  return (
    <LayoutComponent {...props}>
      <article class="post">
        <header>
          <div class="title">
            <h2>{page.frontmatter.title}</h2>
            {subtitle && <p>{String(subtitle)}</p>}
          </div>
        </header>
        {cover && (
          <span class="image featured">
            <img src={cover} alt="" />
          </span>
        )}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
