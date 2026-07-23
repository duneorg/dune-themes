/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatEscapeVelocityDate } from "../utils/content.ts";
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
      <div id="main" class="wrapper style2">
        <div class="title">{page.frontmatter.title}</div>
        <div class="container">
          <div id="content">
            <article class="box post">
              <header class="style1">
                <h2>{page.frontmatter.title}</h2>
                {date && <p><time datetime={date}>{formatEscapeVelocityDate(date)}</time></p>}
              </header>
              {cover && (
                <a href={page.route} class="image featured">
                  <img src={cover} alt="" />
                </a>
              )}
              <div data-dune-body>{children}</div>
            </article>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
