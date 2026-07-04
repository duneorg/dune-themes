/** @jsxImportSource preact */
/** Port of layouts/list.html (incl. home_info.html). Drive it with a
 * `collection:` block in frontmatter. The home-info box comes from
 * frontmatter `homeInfo: { title, content, social: [...] }` or the
 * theme config's home_title / home_content. */
import { h, Fragment } from "preact";
import StaticLayout from "../components/layout.tsx";
import PostMeta from "../components/post-meta.tsx";
import Cover from "../components/cover.tsx";
import SocialIcons from "../components/social-icons.tsx";
import { DraftIcon } from "../components/icons.tsx";
import { markdownText, readingTime, summarize } from "../utils/content.ts";

export default function BlogTemplate(props: any) {
  const { page, children, Layout, collection, themeConfig, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const fm = page.frontmatter;
  // The home page's own route may be e.g. "/home/" — the request pathname
  // is the reliable home signal.
  const requestPath = props.pathname ?? page.route;
  const isHome = requestPath === "/" || page.route === "/";
  const currentPage = collection?.page ?? 1;

  const homeInfo = fm.homeInfo ??
    (themeConfig?.home_title || themeConfig?.home_content
      ? { title: themeConfig.home_title, content: themeConfig.home_content }
      : null);
  const showHomeInfo = isHome && homeInfo && currentPage === 1;
  // Upstream: first post on home page 1 gets the big "first-entry" style
  // unless home-info is shown.
  const firstEntry = isHome && currentPage === 1 && !showHomeInfo &&
    fm.disableSpecial1stPost !== true;

  const items = collection?.items ?? [];
  // Templates render synchronously, so summaries/word counts come from the
  // raw markdown (rendered HTML is only available async via post.html()).
  const entries = items.map((post: any) => {
    const pfm = post.frontmatter;
    let summary = pfm.metadata?.description ?? pfm.description ?? pfm.summary;
    let truncated = false;
    let words = 0;
    const text = post.rawContent ? markdownText(post.rawContent) : "";
    if (text) words = text.split(/\s+/).filter(Boolean).length;
    if (!summary && text) [summary, truncated] = summarize(text);
    return { post, summary, truncated, words };
  });

  return (
    <LayoutComponent {...props} bodyClass="list">
      {!isHome && fm.title && (
        <header class="page-header">
          <h1>{fm.title}</h1>
          {(fm.metadata?.description ?? fm.description) && (
            <div class="post-description">{fm.metadata?.description ?? fm.description}</div>
          )}
        </header>
      )}
      {children}
      {showHomeInfo && (
        <article class="first-entry home-info">
          <header class="entry-header">
            <h1>{homeInfo.title}</h1>
          </header>
          <div class="entry-content md-content">
            <p>{homeInfo.content}</p>
          </div>
          <footer class="entry-footer">
            <SocialIcons social={homeInfo.social} />
          </footer>
        </article>
      )}
      {entries.map(({ post, summary, truncated, words }: any, index: number) => {
        const pfm = post.frontmatter;
        const isDraft = pfm.status === "draft" || pfm.published === false;
        return (
          <article class={firstEntry && index === 0 ? "first-entry" : "post-entry"} key={post.route}>
            <Cover page={post} />
            <header class="entry-header">
              <h2 class="entry-hint-parent">
                {pfm.title}
                {isDraft && (
                  <span class="entry-hint" title="Draft">
                    <DraftIcon height={20} />
                  </span>
                )}
              </h2>
            </header>
            {pfm.hideSummary !== true && summary && (
              <div class="entry-content">
                <p>{summary}{truncated && "..."}</p>
              </div>
            )}
            {pfm.hideMeta !== true && (
              <footer class="entry-footer">
                <PostMeta
                  page={post}
                  words={words}
                  minutes={words ? readingTime(words) : undefined}
                  themeConfig={themeConfig}
                  t={t}
                />
              </footer>
            )}
            <a class="entry-link" aria-label={`post link to ${pfm.title}`} href={post.route}></a>
          </article>
        );
      })}
      {(collection?.hasPrev || collection?.hasNext) && (
        <footer class="page-footer">
          <nav class="pagination">
            {collection.hasPrev && (
              <a class="prev" href={currentPage === 2 ? page.route : `${page.route}/page:${currentPage - 1}`}>
                «&nbsp;{(t ?? ((k: string) => k))("prev_page")}
              </a>
            )}
            {collection.hasNext && (
              <a class="next" href={`${page.route}/page:${currentPage + 1}`}>
                {(t ?? ((k: string) => k))("next_page")}&nbsp;»
              </a>
            )}
          </nav>
        </footer>
      )}
    </LayoutComponent>
  );
}
