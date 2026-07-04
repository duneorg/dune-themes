/**
 * Single-page template — port of single.html: title, date/author/reading-time
 * row, publication/event metadata grid, prose content.
 */
import type { TemplateProps } from "@dune/core";
import Layout from "../components/layout.tsx";
import {
  formatDateLong,
  inlineMarkdown,
  linkTarget,
  markdownBlock,
  pageDate,
  pageTitle,
  readingTime,
  resolvePublication,
  str,
  strArr,
} from "../utils/blox.ts";
import { Icon } from "../components/icon.tsx";

interface PageLink {
  type?: string;
  url?: string;
  name?: string;
  icon?: string;
}

export default async function DefaultTemplate(props: TemplateProps) {
  const t = (props as unknown as { t?: (k: string) => string }).t ?? ((k: string) => k);
  const page = props.page;
  const fm = page.frontmatter as Record<string, unknown>;
  const html = await page.html();
  const Frame = (props.Layout ?? Layout) as typeof Layout;

  const authors = strArr(fm.authors);
  const displayDate = str(fm.event_start) || pageDate(page) || "";
  const showDate = fm.show_date !== false && displayDate;
  const minutes = readingTime(page.rawContent ?? "");
  const pub = resolvePublication(fm);
  const abstract = str(fm.abstract);
  const pubTypes = strArr(fm.publication_types);
  const links = Array.isArray(fm.links) ? fm.links as PageLink[] : [];
  const doi = str(fm.doi);
  const eventName = str(fm.event_name) || str(fm.event);
  const location = str(fm.location);
  const hasMetaGrid = Boolean(abstract || !pub.isEmpty || pubTypes.length || eventName || location);

  return (
    <Frame {...props}>
      <div class="mx-auto flex max-w-screen-xl">
        <article class="w-full break-words flex min-h-[calc(100vh-var(--navbar-height))] min-w-0 justify-center pb-8">
          <main class="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
            <h1 class="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {pageTitle(page)}
            </h1>

            <div class="mt-4 mb-16">
              <div class="text-gray-500 dark:text-gray-300 text-sm flex items-center flex-wrap gap-y-2">
                {showDate && (
                  <>
                    <span class="mr-1">{formatDateLong(displayDate)}</span>
                    {authors.length > 0 && <span class="mx-1">·</span>}
                  </>
                )}
                {authors.map((author, i) => (
                  <span key={author}>
                    {i > 0 && <span class="mr-1">,</span>}
                    <div class="group inline-flex items-center text-current gap-x-1.5 mx-1">
                      <div>{author}</div>
                    </div>
                  </span>
                ))}
                {fm.reading_time !== false && (
                  <>
                    <span class="mx-1">·</span>
                    <span class="mx-1">{minutes} {t("minute_read")}</span>
                  </>
                )}
              </div>

              {(links.length > 0 || doi) && (
                <div class="mt-3 flex flex-wrap space-x-3">
                  {doi && (
                    <a
                      class="hb-attachment-link hb-attachment-link-large"
                      href={`https://doi.org/${doi}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <Icon name="link" class="inline-block" style="height: 1em" /> DOI
                    </a>
                  )}
                  {links.map((link) => {
                    const url = str(link.url);
                    if (!url) return null;
                    return (
                      <a
                        class="hb-attachment-link hb-attachment-link-large"
                        href={url}
                        {...linkTarget(url)}
                        key={url}
                      >
                        <Icon name={str(link.icon) || "link"} class="inline-block" style="height: 1em" />{" "}
                        {str(link.name) || str(link.type) || "Link"}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {hasMetaGrid && (
              <div class="max-w-prose grid grid-cols-1 md:grid-cols-[200px_auto] gap-4 my-6">
                {abstract && (
                  <>
                    <div class="font-bold text-2xl">{t("abstract")}</div>
                    <div
                      // deno-lint-ignore react-no-danger
                      dangerouslySetInnerHTML={{ __html: markdownBlock(abstract) }}
                    />
                  </>
                )}
                {pubTypes.length > 0 && (
                  <>
                    <div class="font-bold text-2xl">{t("publication_type")}</div>
                    <div>
                      {t(`pub_${pubTypes[0].replace(/-/g, "_")}`) === `pub_${pubTypes[0].replace(/-/g, "_")}`
                        ? pubTypes[0].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
                        : t(`pub_${pubTypes[0].replace(/-/g, "_")}`)}
                    </div>
                  </>
                )}
                {!pub.isEmpty && (
                  <>
                    <div class="font-bold text-2xl">{t("publication")}</div>
                    <div
                      // deno-lint-ignore react-no-danger
                      dangerouslySetInnerHTML={{
                        __html: inlineMarkdown(pub.display) +
                          (pub.publisher ? `. ${inlineMarkdown(pub.publisher)}` : ""),
                      }}
                    />
                  </>
                )}
                {(fm.peer_reviewed === true || fm.open_access === true) && (
                  <>
                    <div class="font-bold text-2xl">{t("status")}</div>
                    <div class="flex flex-wrap gap-2">
                      {fm.peer_reviewed === true && (
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 ring-1 ring-emerald-500/30">
                          {t("peer_reviewed")}
                        </span>
                      )}
                      {fm.open_access === true && (
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 ring-1 ring-emerald-500/30">
                          {t("open_access")}
                        </span>
                      )}
                    </div>
                  </>
                )}
                {eventName && (
                  <>
                    <div class="font-bold text-2xl">{t("event")}</div>
                    <div>
                      {str(fm.event_url)
                        ? (
                          <a href={str(fm.event_url)} target="_blank" rel="noopener">
                            {eventName}
                          </a>
                        )
                        : eventName}
                    </div>
                  </>
                )}
                {location && (
                  <>
                    <div class="font-bold text-2xl">{t("location")}</div>
                    <div>
                      <p>{location}</p>
                    </div>
                  </>
                )}
              </div>
            )}

            <div
              class="prose prose-slate lg:prose-xl dark:prose-invert"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </main>
        </article>
      </div>
    </Frame>
  );
}
