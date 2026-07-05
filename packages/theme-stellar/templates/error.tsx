/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function ErrorTemplate(props: TemplateProps & { Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const code = (props.page?.frontmatter as Record<string, unknown>)?.errorCode ?? 404;
  return (
    <LayoutComponent {...props}>
      <div class="error-page prose">
        <h1>{String(code)}</h1>
        <p>Page not found.</p>
        <p><a href="/">← Back home</a></p>
      </div>
    </LayoutComponent>
  );
}
