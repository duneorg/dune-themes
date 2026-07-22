/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatMassivelyDate } from "../utils/content.ts";
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
  const subtitle = typeof fm.subtitle === "string" ? fm.subtitle : undefined;

  return (
    <LayoutComponent {...props} hideIntro>
      <article class="post">
        <header class="major">
          {date && <span class="date">{formatMassivelyDate(date)}</span>}
          <h1>{page.frontmatter.title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </header>
        {cover && (
          <span class="image main">
            <img src={cover} alt="" />
          </span>
        )}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
