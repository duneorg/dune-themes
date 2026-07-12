/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

export default function ErrorTemplate(props: any) {
  const { page, children, Layout, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const LayoutComponent = Layout ?? StaticLayout;
  const status = page?.frontmatter?.statusCode ?? 404;
  const message = page?.frontmatter?.message ??
    (status === 404
      ? tr("page_not_found_message", "This page could not be found.")
      : tr("server_error", "Something went wrong."));

  return (
    <LayoutComponent {...props}>
      <article class="error-page">
        <h1>{status}</h1>
        <p>{message}</p>
        {children}
        <p>
          <a href="/">{tr("back_home", "Back to home")}</a>
        </p>
      </article>
    </LayoutComponent>
  );
}
