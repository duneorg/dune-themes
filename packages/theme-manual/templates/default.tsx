/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

function pageLabel(fm: Record<string, unknown>): string | null {
  const label = fm.label ?? fm.status;
  return typeof label === "string" ? label : null;
}

export default function DefaultTemplate(props: TemplateProps & {
  children?: any;
  Layout?: typeof StaticLayout;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const label = pageLabel(fm);

  return (
    <LayoutComponent {...props}>
      <article class="manual-content prose">
        <h1>
          {String(fm.title ?? page.frontmatter.title)}
          {label && <span class={`manual-label manual-label-${label.toLowerCase()}`}>{label}</span>}
        </h1>
        {meta.description && <p class="manual-lead">{String(meta.description)}</p>}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
