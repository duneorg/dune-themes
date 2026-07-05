/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function ErrorTemplate(props: TemplateProps & {
  Layout?: typeof StaticLayout;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const tr = props.t ?? ((k: string) => k);
  const code = (props.page?.frontmatter as Record<string, unknown>)?.errorCode ?? 404;

  return (
    <LayoutComponent {...props} landing={false}>
      <div class="error-page">
        <header>
          <h2 class="major">{String(code)}</h2>
          <p>{tr("error.notfound")}</p>
        </header>
        <ul class="actions">
          <li><a href="/" class="button primary">{tr("error.home")}</a></li>
        </ul>
      </div>
    </LayoutComponent>
  );
}
