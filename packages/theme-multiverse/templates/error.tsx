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
      <h2>{String(code)}</h2>
      <p>{tr("error.notfound", "This page could not be found.")}</p>
      <ul class="actions">
        <li><a href={homeHref} class="button primary">{tr("error.home", "Back to home")}</a></li>
      </ul>
    </LayoutComponent>
  );
}
