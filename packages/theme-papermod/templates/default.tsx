/** @jsxImportSource preact */
/** Plain page — single.html without post extras (meta/tags/share). */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import { addHeadingIds, anchorHeadings } from "../utils/content.ts";

export default async function DefaultTemplate(props: any) {
  const { page, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const fm = page.frontmatter;
  let html = addHeadingIds(await page.html());
  if (fm.disableAnchoredHeadings !== true) html = anchorHeadings(html);

  return (
    <LayoutComponent {...props}>
      <article class="post-single">
        <header class="post-header">
          <h1 class="post-title">{fm.title}</h1>
          {(fm.metadata?.description ?? fm.description) && (
            <div class="post-description">{fm.metadata?.description ?? fm.description}</div>
          )}
        </header>
        <div class="post-content md-content" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </LayoutComponent>
  );
}
