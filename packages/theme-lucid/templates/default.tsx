/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: any;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const editBase = safeHref(themeConfig?.edit_url) ?? "";
  const editHref = editBase
    ? `${editBase.replace(/\/$/, "")}${page.route}`.replace(/\/$/, "") + ".md"
    : "";

  return (
    <LayoutComponent {...props}>
      <article class="lucid-content prose">
        <h1>{page.frontmatter.title}</h1>
        <div data-dune-body>{children}</div>
        {editHref && (
          <p class="lucid-edit">
            <a href={editHref} target="_blank" rel="noopener noreferrer">
              {tr("edit.page", "Edit this page")}
            </a>
          </p>
        )}
      </article>
    </LayoutComponent>
  );
}
