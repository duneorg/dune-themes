/** @jsxImportSource preact */
/** Port of layouts/404.html. */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

export default function ErrorTemplate(props: any) {
  const { page, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const status = page?.frontmatter?.statusCode ?? 404;
  return (
    <LayoutComponent {...props}>
      <div class="not-found">{status}</div>
    </LayoutComponent>
  );
}
