/** @jsxImportSource preact */
/**
 * Section index — Dune adaptation for pages with a `collection` frontmatter
 * block (the shared docs fixture uses `template: section`). Upstream
 * hugo-book's `list.html` is empty (content-only); this adds a child-page
 * list so section indexes are navigable without authoring the links by hand.
 */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import { addHeadingIds, buildToc, extractHeadings } from "../utils/content.ts";

export default async function SectionTemplate(props: any) {
  const { page, Layout, collection } = props;
  const LayoutComponent = Layout ?? StaticLayout;

  const html = addHeadingIds(await page.html());
  const tocHtml = buildToc(extractHeadings(html));
  const title = page?.frontmatter?.title as string | undefined;
  const bodyHasH1 = /^\s*<h1[\s>]/i.test(html);

  return (
    <LayoutComponent {...props} tocHtml={tocHtml}>
      <article class="markdown book-article">
        {title && !bodyHasH1 && <h1>{title}</h1>}
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
      </article>
    </LayoutComponent>
  );
}
