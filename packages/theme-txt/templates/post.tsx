/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatTxtDate, postExcerpt } from "../utils/content.ts";
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
  const subtitle = postExcerpt(fm) ?? (typeof fm.subtitle === "string" ? fm.subtitle : undefined);

  return (
    <LayoutComponent {...props}>
      <div class="row">
        <div class="col-12">
          <div class="content">
            <article class="box page-content">
              <header>
                <h2>{page.frontmatter.title}</h2>
                {subtitle && <p>{subtitle}</p>}
                {date && (
                  <ul class="meta">
                    <li class="icon fa-clock">
                      <time datetime={date}>{formatTxtDate(date)}</time>
                    </li>
                  </ul>
                )}
              </header>
              {cover && (
                <span class="image featured">
                  <img src={cover} alt="" />
                </span>
              )}
              <section>
                <div data-dune-body>{children}</div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
