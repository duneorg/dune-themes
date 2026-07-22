/** @jsxImportSource preact */
/** Port of layouts/single.html. */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import PostMeta from "../components/post-meta.tsx";
import Breadcrumbs from "../components/breadcrumbs.tsx";
import Cover from "../components/cover.tsx";
import Toc from "../components/toc.tsx";
import ShareIcons from "../components/share-icons.tsx";
import { DraftIcon } from "../components/icons.tsx";
import {
  addHeadingIds,
  anchorHeadings,
  extractHeadings,
  readingTime,
  wordCount,
} from "../utils/content.ts";

export default async function PostTemplate(props: any) {
  const { page, Layout, themeConfig, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const fm = page.frontmatter;
  const isDraft = fm.status === "draft" || fm.published === false;

  let html = addHeadingIds(await page.html());
  const headings = extractHeadings(html).filter((h2) => h2.level >= 2);
  if (fm.disableAnchoredHeadings !== true) html = anchorHeadings(html);
  const words = wordCount(html);

  const showToc = fm.showToc ?? fm.ShowToc ?? themeConfig?.show_toc === true;
  const tocOpen = fm.tocOpen ?? fm.TocOpen ?? themeConfig?.toc_open === true;
  const showBreadcrumbs = fm.showBreadcrumbs ?? themeConfig?.show_breadcrumbs === true;
  const showShare = fm.disableShare !== true && themeConfig?.show_share_buttons === true;
  const tags: string[] = fm.taxonomy?.tag ?? fm.taxonomy?.tags ?? [];

  return (
    <LayoutComponent {...props} isPost>
      <article class="post-single">
        <header class="post-header">
          {showBreadcrumbs && <Breadcrumbs page={page} t={t} />}
          <h1 class="post-title entry-hint-parent">
            {fm.title}
            {isDraft && (
              <span class="entry-hint" title="Draft">
                <DraftIcon height={35} />
              </span>
            )}
          </h1>
          {(fm.metadata?.description ?? fm.description) && (
            <div class="post-description">{fm.metadata?.description ?? fm.description}</div>
          )}
          {fm.hideMeta !== true && (
            <div class="post-meta">
              <PostMeta
                page={page}
                words={words}
                minutes={readingTime(words)}
                translations={props.translations}
                themeConfig={themeConfig}
                t={t}
              />
            </div>
          )}
        </header>
        <Cover page={page} isSingle />
        {showToc && <Toc headings={headings} open={tocOpen} t={t} />}
        <div class="post-content md-content" dangerouslySetInnerHTML={{ __html: html }} />
        <footer class="post-footer">
          {tags.length > 0 && (
            <ul class="post-tags">
              {tags.map((tag) => (
                <li key={tag}>
                  <a href={`/tags/${encodeURIComponent(tag)}/`}>{tag}</a>
                </li>
              ))}
            </ul>
          )}
          {showShare && <ShareIcons page={page} site={props.site} />}
        </footer>
      </article>
    </LayoutComponent>
  );
}
