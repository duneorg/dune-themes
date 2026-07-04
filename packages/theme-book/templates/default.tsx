/** @jsxImportSource preact */
/** Port of the baseof.html "main" block (single.html/list.html are empty). */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import { addHeadingIds, buildToc, extractHeadings } from "../utils/content.ts";

export default async function DefaultTemplate(props: any) {
  const { page, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;

  const html = addHeadingIds(await page.html());
  const tocHtml = buildToc(extractHeadings(html));

  return (
    <LayoutComponent {...props} tocHtml={tocHtml}>
      <article
        class="markdown book-article"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </LayoutComponent>
  );
}
