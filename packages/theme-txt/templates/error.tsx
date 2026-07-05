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
    <LayoutComponent {...props}>
      <div class="row">
        <div class="col-12">
          <div class="content">
            <article class="box page-content error-page">
              <header>
                <h2>{String(code)}</h2>
                <p>{tr("error.notfound")}</p>
              </header>
              <ul class="actions">
                <li><a href="/" class="button">{tr("error.home")}</a></li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
