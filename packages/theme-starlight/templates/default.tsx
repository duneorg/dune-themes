/** @jsxImportSource preact */
/** Docs page — upstream Page.astro non-hero branch: sidebar, ToC, footer. */
import { h } from "preact";
import Layout from "../components/layout.tsx";
import { addHeadingIds, buildTocItems, extractHeadings } from "../utils/starlight.ts";

export default async function DefaultTemplate(props: any) {
  const { page, t } = props;
  const html = addHeadingIds(await page.html());
  const fm = page?.frontmatter ?? {};
  const tr = t ?? ((k: string) => k);
  const showToc = fm.tableOfContents !== false;
  const tocItems = showToc
    ? buildTocItems(extractHeadings(html), tr("tableOfContents.overview"))
    : null;

  return (
    <Layout {...props} tocItems={tocItems} hasSidebar={fm.sidebar !== false}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}
