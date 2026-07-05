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
      <section class="main">
        <header>
          <div class="container">
            <h2>{String(code)}</h2>
            <p>{tr("error.notfound")}</p>
          </div>
        </header>
        <div class="content dark style4">
          <div class="container">
            <ul class="actions special">
              <li><a href="/" class="button">{tr("error.home")}</a></li>
            </ul>
          </div>
        </div>
      </section>
    </LayoutComponent>
  );
}
