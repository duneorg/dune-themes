/**
 * Collection views — ports of layouts/_partials/views/
 * (card, article-grid, citation, date-title-summary).
 */
import type { Page } from "@dune/core/content/types";
import {
  formatDateLong,
  inlineMarkdown,
  linkTarget,
  normalizeRoute,
  pageDate,
  pageSummary,
  pageTitle,
  readingTime,
  resolvePublication,
  str,
  strArr,
  yearOf,
} from "../utils/blox.ts";
import { Icon } from "./icon.tsx";

export interface ViewConfig {
  columns?: number;
  fillImage?: boolean;
  showDate?: boolean;
  showReadTime?: boolean;
  showReadMore?: boolean;
  t: (k: string) => string;
}

function itemLink(item: Page): { link: string; external: boolean } {
  const fm = item.frontmatter as Record<string, unknown>;
  const ext = str(fm.external_link);
  if (ext) return { link: ext, external: true };
  return { link: normalizeRoute(item.route), external: false };
}

function coverUrl(item: Page): string | null {
  const fm = item.frontmatter as Record<string, unknown>;
  const image = fm.image;
  let filename = "";
  if (typeof image === "string") filename = image;
  else if (image && typeof image === "object") {
    filename = str((image as Record<string, unknown>).filename);
  }
  if (!filename) return null;
  if (/^https?:\/\//.test(filename) || filename.startsWith("/")) return filename;
  const media = (item.media ?? []).find((m) => m.name === filename);
  return media?.url ?? null;
}

// ── card ────────────────────────────────────────────────────────────────────

export function CardView({ item, index, config }: { item: Page; index: number; config: ViewConfig }) {
  const { t } = config;
  const fm = item.frontmatter as Record<string, unknown>;
  const { link, external } = itemLink(item);
  const target = external ? { target: "_blank", rel: "noopener" } : {};
  const cover = coverUrl(item);
  const showDate = config.showDate !== false;
  const showReadTime = config.showReadTime !== false;
  const showReadMore = config.showReadMore !== false;
  const hasMeta = showDate || showReadTime || showReadMore;
  const fillImage = config.fillImage !== false;
  const tags = strArr((fm.taxonomy as Record<string, unknown> | undefined)?.tag ?? fm.tags);
  const authors = strArr(fm.authors);
  const displayDate = str(fm.event_start) || pageDate(item) || "";

  return (
    <div
      class="group bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl ring-1 ring-zinc-900/5 dark:ring-white/10 shadow-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-primary-500/50"
      role="article"
    >
      {/* Image Section */}
      <div class="relative overflow-hidden aspect-[16/9] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        {cover
          ? (
            <a href={link} {...target} class="block">
              <img
                class={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 ${
                  fillImage ? "object-fill" : "object-contain"
                }`}
                src={cover}
                loading="lazy"
                decoding="async"
                fetchpriority={index === 0 ? "high" : undefined}
                style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
                alt={`${pageTitle(item)} featured image`}
              />
            </a>
          )
          : (
            <a href={link} {...target} class="block w-full h-full">
              <div class="w-full h-full bg-gradient-to-br from-primary-600/40 via-secondary-600/30 to-primary-800/50 flex items-center justify-center transition-all duration-300 group-hover:from-primary-500/50 group-hover:via-secondary-500/40 group-hover:to-primary-700/60">
                <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </a>
          )}
        <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </div>
      </div>

      {/* Content Section */}
      <div class="p-8 space-y-4">
        {tags.length > 0 && (
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300">
              {tags[0]}
            </span>
          </div>
        )}

        <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 leading-tight">
          <a href={link} {...target} class="hover:underline">
            {pageTitle(item)}
            {external && (
              <Icon
                name="arrow-top-right-on-square"
                class="inline-flex h-4 w-4 ml-1 align-text-top"
                style="height: 1em;"
              />
            )}
          </a>
        </h3>

        <p class="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed line-clamp-3">
          {pageSummary(item)}
        </p>

        {hasMeta && (
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <div class="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500 flex-wrap mb-3">
              {authors.length > 0 && (
                <>
                  <div class="flex items-center gap-2 min-w-0">
                    <div class="relative h-6 w-6 flex-shrink-0">
                      <div class="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Icon name="user" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                    <span class="truncate max-w-[9rem] text-sm">{authors[0]}</span>
                  </div>
                  <span class="opacity-40">•</span>
                </>
              )}
              {showDate && displayDate && (
                <time class="hidden sm:inline whitespace-nowrap" dateTime={displayDate.slice(0, 10)}>
                  {formatDateLong(displayDate)}
                </time>
              )}
              {showDate && showReadTime && <span class="hidden sm:inline opacity-40">•</span>}
              {showReadTime && (
                <span class="hidden sm:inline whitespace-nowrap">
                  {readingTime(item.rawContent ?? "")} {t("minute_read")}
                </span>
              )}
            </div>

            {showReadMore && (
              <div class="pt-2 border-t border-zinc-200/50 dark:border-zinc-700/50">
                <a
                  href={link}
                  {...target}
                  class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-all duration-300 group/link"
                >
                  <span>{t("read_more")}</span>
                  <svg
                    class="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** card view wrapper (card--start/--end). */
export function CardList({ items, config }: { items: Page[]; config: ViewConfig }) {
  return (
    <div class="container max-w-[65ch] mx-auto grid grid-cols-1 gap-6 my-5">
      {items.map((item, i) => <CardView item={item} index={i} config={config} key={item.route} />)}
    </div>
  );
}

// ── article-grid ────────────────────────────────────────────────────────────

export function ArticleGrid({ items, config }: { items: Page[]; config: ViewConfig }) {
  const columns = config.columns ?? 2;
  return (
    <div
      class={`container px-8 mx-auto xl:px-5 py-5 lg:py-8 ${
        items.length === 1 ? "max-w-[500px] justify-center" : "max-w-screen-lg"
      }`}
    >
      <div class={`grid gap-10 md:grid-cols-${columns} lg:gap-10`}>
        {items.map((item, i) => <CardView item={item} index={i} config={config} key={item.route} />)}
      </div>
    </div>
  );
}

// ── citation ────────────────────────────────────────────────────────────────

export function CitationView({ item, t }: { item: Page; t: (k: string) => string }) {
  const fm = item.frontmatter as Record<string, unknown>;
  const year = yearOf(str(fm.event_start) || pageDate(item));
  const pub = resolvePublication(fm);
  const authors = strArr(fm.authors);
  void t;

  return (
    <div class="pub-list-item view-citation" style="margin-bottom: 1rem">
      <Icon name="document-text" class="pub-icon inline-block w-4 h-4" />{" "}
      <span class="article-metadata li-cite-author">
        {authors.map((a, i) => (
          <span key={a}>
            {i > 0 && ", "}
            {a}
          </span>
        ))}
      </span>{" "}
      ({year}). <a href={normalizeRoute(item.route)} class="underline">{pageTitle(item)}</a>.{" "}
      {pub.displayShort && (
        <span
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(pub.displayShort) + "." }}
        />
      )}
    </div>
  );
}

/** citation view wrapper (citation--start/--end). */
export function CitationList({ items, t }: { items: Page[]; t: (k: string) => string }) {
  return (
    <div class="mt-16 sm:mt-20 container max-w-3xl w-full">
      <div class="flex flex-col space-y-3">
        {items.map((item) => <CitationView item={item} t={t} key={item.route} />)}
      </div>
    </div>
  );
}

// ── date-title-summary ──────────────────────────────────────────────────────

export function DateTitleSummaryView({ item, t }: { item: Page; t: (k: string) => string }) {
  const fm = item.frontmatter as Record<string, unknown>;
  const displayDate = str(fm.event_start) || pageDate(item) || "";
  const link = normalizeRoute(item.route);

  return (
    <article class="md:grid md:grid-cols-4 md:items-baseline">
      <div class="md:col-span-3 group relative flex flex-col items-start">
        <h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl">
          </div>
          <a href={link}>
            <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
            <span class="relative z-10">{pageTitle(item)}</span>
          </a>
        </h2>
        <time
          class="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-1"
          dateTime={displayDate.slice(0, 10)}
        >
          {formatDateLong(displayDate)}
        </time>
        <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {pageSummary(item)}
        </p>
        <div aria-hidden class="relative z-10 mt-4 flex items-center text-sm font-medium text-primary-500">
          {t("read_more")}
          <svg aria-hidden class="ml-1 h-4 w-4 stroke-current" fill="none" viewBox="0 0 16 16">
            <path
              d="M6.75 5.75 9.25 8l-2.5 2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
            </path>
          </svg>
        </div>
      </div>
      <time
        class="mt-1 hidden md:block relative z-10 order-first mb-3 items-center text-sm text-zinc-400 dark:text-zinc-500"
        dateTime={displayDate.slice(0, 10)}
      >
        {formatDateLong(displayDate)}
      </time>
    </article>
  );
}

export function DateTitleSummaryList({ items, t }: { items: Page[]; t: (k: string) => string }) {
  return (
    <div class="mt-16 sm:mt-20 container max-w-3xl">
      <div class="flex flex-col space-y-16">
        {items.map((item) => <DateTitleSummaryView item={item} t={t} key={item.route} />)}
      </div>
    </div>
  );
}
