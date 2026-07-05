/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function ErrorTemplate(props: TemplateProps & { Layout?: typeof StaticLayout; t?: (key: string) => string }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const tr = props.t ?? ((k: string) => k);
  const code = (props.page?.frontmatter as Record<string, unknown>)?.errorCode ?? 404;
  return (
    <LayoutComponent {...props}>
      <article class="post error-page">
        <header><h2>{String(code)}</h2><p>{tr("error.notfound")}</p></header>
        <p><a href="/">{tr("error.home")}</a></p>
      </article>
    </LayoutComponent>
  );
}
