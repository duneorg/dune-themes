/** @jsxImportSource preact */
/** Splash page — upstream `template: splash`: hero, no sidebar, no ToC.
 * Select with frontmatter `template: splash`. */
import { h } from "preact";
import Layout from "../components/layout.tsx";

export default async function SplashTemplate(props: any) {
  const { page } = props;
  const html = await page.html();

  return (
    <Layout {...props} hero={true} hasSidebar={false} tocItems={null}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}
