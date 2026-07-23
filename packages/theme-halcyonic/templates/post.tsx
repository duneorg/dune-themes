/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatHalcyonicDate } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = safeHref(fm.cover);

  return (
    <LayoutComponent {...props} landing={false}>
      <section>
        <header>
          <h2>{page.frontmatter.title}</h2>
          {date && <p><time datetime={date}>{formatHalcyonicDate(date)}</time></p>}
        </header>
        {cover && (
          <a href={page.route} class="feature-image">
            <img src={cover} alt="" />
          </a>
        )}
        <div data-dune-body>{children}</div>
      </section>
    </LayoutComponent>
  );
}
