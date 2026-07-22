/** @jsxImportSource preact */
/**
 * Section index — Dune adaptation for pages with a `collection` frontmatter
 * block (the shared docs fixture uses `template: section`). Upstream
 * Starlight has no separate section template; this lists child pages so
 * section indexes stay navigable.
 */
import { h } from "preact";
import Layout from "../components/layout.tsx";
import { addHeadingIds, buildTocItems, extractHeadings } from "../utils/starlight.ts";

export default async function SectionTemplate(props: any) {
  const { page, collection, t } = props;
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
      {collection?.items?.length > 0 && (
        <ul>
          {collection.items.map((child: any) => (
            <li key={child.route}>
              <a href={child.route}>{child.frontmatter?.title ?? child.title}</a>
              {child.frontmatter?.metadata?.description && (
                <p>{child.frontmatter.metadata.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
