/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatMinimaxingDate, postExcerpt } from "../utils/content.ts";
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
  const subtitle = postExcerpt(fm);

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main">
        <div class="container">
          <div class="row main-row">
            <div class="col-12">
              <article class="blog-post">
                <h2>{page.frontmatter.title}</h2>
                {date && <p><time datetime={date}>{formatMinimaxingDate(date)}</time></p>}
                {!date && subtitle && <p>{subtitle}</p>}
                {cover && <img src={cover} alt="" class="top blog-post-image" />}
                <div data-dune-body>{children}</div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
