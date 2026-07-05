/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatStoryDate, themeImage } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  config?: { theme?: { name?: string } };
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, config, themeConfig } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const themeName = config?.theme?.name ?? "story";
  const img = (file: string) => themeImage(themeName, file);
  const showCredit = themeConfig?.show_html5up_credit !== false;

  return (
    <LayoutComponent {...props} landing={false}>
      <section class="banner style1 orient-left content-align-left image-position-right">
        <div class="content">
          <h1>{page.frontmatter.title}</h1>
          {date && <p class="major"><time datetime={date}>{formatStoryDate(date)}</time></p>}
        </div>
        <div class="image"><img src={img("spotlight02.jpg")} alt="" /></div>
      </section>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <div data-dune-body>{children}</div>
        </div>
      </section>
      {showCredit && (
        <footer class="wrapper style1 align-center">
          <div class="inner">
            <p>Design: <a href="https://html5up.net/story">HTML5 UP</a></p>
          </div>
        </footer>
      )}
    </LayoutComponent>
  );
}
