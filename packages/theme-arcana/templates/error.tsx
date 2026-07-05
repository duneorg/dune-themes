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
      <section class="wrapper style1">
        <div class="container">
          <div id="content">
            <article>
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
      </section>
    </LayoutComponent>
  );
}
