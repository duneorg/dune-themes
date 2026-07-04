/** @jsxImportSource preact */
/** 404/500 page — upstream routes/static/404.astro renders a splash-style
 * hero with the status code as title and the 404.text string as tagline.
 * Rendered by Dune core with a synthetic page (no page.html()). */
import { h } from "preact";
import Layout from "../components/layout.tsx";

export default function ErrorTemplate(props: any) {
  const { page, t } = props;
  const tr = t ?? ((k: string) => k);
  const fm = page?.frontmatter ?? {};
  const status = fm.statusCode ?? 404;
  const message = status === 404 ? tr("404.text") : (fm.message ?? "");

  const errorPage = {
    ...page,
    frontmatter: {
      ...fm,
      title: String(status),
      hero: { title: String(status), tagline: message },
    },
  };

  return (
    <Layout {...props} page={errorPage} hero={true} hasSidebar={false} tocItems={null}>
    </Layout>
  );
}
