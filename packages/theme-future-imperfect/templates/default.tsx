/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;

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
