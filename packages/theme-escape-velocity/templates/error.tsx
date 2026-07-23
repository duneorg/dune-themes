/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function ErrorTemplate(props: TemplateProps & {
  Layout?: typeof StaticLayout;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const tr = (key: string, fallback: string) =>
    (props.t ? props.t(key) : undefined) ?? fallback;
  const code = (props.page?.frontmatter as Record<string, unknown>)?.errorCode ?? 404;
  const basePath = props.site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main" class="wrapper style2">
        <div class="title">{String(code)}</div>
        <div class="container">
          <div id="content">
            <article class="box post error-page">
              <header class="style1">
                <h2>{String(code)}</h2>
                <p>{tr("error.notfound", "This page could not be found.")}</p>
              </header>
              <ul class="actions">
                <li><a href={homeHref} class="button style1">{tr("error.home", "Back to home")}</a></li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
