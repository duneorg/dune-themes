/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

/**
 * Error template for 404/500 pages. The engine passes `statusCode` and
 * `message` in the page frontmatter.
 */
export default function ErrorTemplate(props: any) {
  const { page, children, Layout, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const tr = t ?? ((k: string) => k);
  const status = page?.frontmatter?.statusCode ?? 404;
  const message = page?.frontmatter?.message ??
    (status === 404 ? tr("error.notfound") : tr("error.server"));
  return (
    <LayoutComponent {...props}>
      <article class="error-page">
        <h1>{status}</h1>
        <p>{message}</p>
        {children}
        <p>
          <a href="/">{tr("error.home")}</a>
        </p>
      </article>
    </LayoutComponent>
  );
}
