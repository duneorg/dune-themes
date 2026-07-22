/** @jsxImportSource preact */
/**
 * Port of the baseof.html "main" block (single.html is empty upstream).
 *
 * Dune adaptation: when the markdown body doesn't open with an `<h1>`,
 * render the frontmatter title — Dune fixtures keep the title out of the
 * body (unlike hugo-book's exampleSite, which opens each page with
 * `# Title`). Without this, desktop pages only show the title in the
 * mobile header.
 */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import { addHeadingIds, buildToc, extractHeadings } from "../utils/content.ts";

export default async function DefaultTemplate(props: any) {
  const { page, Layout } = props;
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
      </article>
    </LayoutComponent>
  );
}
