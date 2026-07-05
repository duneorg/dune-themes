/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatFractalDate } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  config?: { theme?: { name?: string } };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, config } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const themeName = config?.theme?.name ?? "fractal";

  return (
    <LayoutComponent {...props}>
      <section class="wrapper">
        <div class="inner alt">
          <section class="spotlight">
            <div class="image">
              <img src={cover ?? `/themes/${themeName}/static/html5up/images/pic01.jpg`} alt="" />
            </div>
            <div class="content">
              <h3>{page.frontmatter.title}</h3>
              {date && <p><time datetime={date}>{formatFractalDate(date)}</time></p>}
              <div data-dune-body>{children}</div>
            </div>
          </section>
        </div>
      </section>
    </LayoutComponent>
  );
}
