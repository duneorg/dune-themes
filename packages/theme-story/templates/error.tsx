/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";

export default function ErrorTemplate(props: TemplateProps & {
  Layout?: typeof StaticLayout;
  config?: { theme?: { name?: string } };
  t?: (key: string) => string;
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const tr = (key: string, fallback: string) =>
    (props.t ? props.t(key) : undefined) ?? fallback;
  const code = (props.page?.frontmatter as Record<string, unknown>)?.errorCode ?? 404;
  const basePath = props.site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const themeName = props.config?.theme?.name ?? "story";
  const img = (file: string) => themeImage(themeName, file);
  const showCredit = props.themeConfig?.show_html5up_credit !== false;

  return (
    <LayoutComponent {...props} landing={false}>
      <section class="banner style1 orient-left content-align-left image-position-right">
        <div class="content">
          <h1>{String(code)}</h1>
          <p class="major">{tr("error.notfound", "This page could not be found.")}</p>
        </div>
        <div class="image"><img src={img("banner.jpg")} alt="" /></div>
      </section>
      <section class="wrapper style1 align-center">
        <div class="inner error-page">
          <ul class="actions stacked special">
            <li><a href={homeHref} class="button wide">{tr("error.home", "Back to home")}</a></li>
          </ul>
        </div>
      </section>
      {showCredit && (
        <footer class="wrapper style1 align-center">
          <div class="inner"><p>Design: <a href="https://html5up.net/story">HTML5 UP</a></p></div>
        </footer>
      )}
    </LayoutComponent>
  );
}
