/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatHeliosDate, postExcerpt } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = postExcerpt(fm);

  return (
    <LayoutComponent {...props} landing={false}>
      <div class="wrapper style1">
        <div class="container">
          <article id="main" class="special">
            <header>
              <h2><a href={page.route}>{page.frontmatter.title}</a></h2>
              {date && <p><time datetime={date}>{formatHeliosDate(date)}</time></p>}
              {!date && subtitle && <p>{subtitle}</p>}
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
    </LayoutComponent>
  );
}
