/** @jsxImportSource preact */
/**
 * 404/500 page — kept inside the book layout (sidebar nav + search) rather
 * than a standalone page, so a lost reader can navigate straight back into
 * the docs instead of hitting a dead end.
 */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

export default function ErrorTemplate(props: any) {
  const { page, Layout, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const LayoutComponent = Layout ?? StaticLayout;
  const status = page?.frontmatter?.statusCode ?? 404;
  const message = page?.frontmatter?.message;

  return (
    <LayoutComponent {...props}>
      <h1>{status} — {tr("page_not_found", "Page not found")}</h1>
      <p>{message ?? tr("page_not_found_message", "The page you're looking for doesn't exist or was moved.")}</p>
      <p>
        <a href="/">{tr("back_home", "Back to home")}</a>
      </p>
    </LayoutComponent>
  );
}
