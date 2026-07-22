import type { Collection, Page } from "@dune/core/content/types";
import type { BlockContext } from "./shared.ts";
import { inlineMarkdown, namedCollection, str } from "../../utils/blox.ts";
import { safeHref } from "../../utils/safe-url.ts";
import {
  ArticleGrid,
  CardList,
  CitationList,
  DateTitleSummaryList,
  type ViewConfig,
} from "../views.tsx";

export function CollectionBlock(
  { content, design, ctx }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
    ctx: BlockContext;
  },
) {
  const { t } = ctx;
  const view = str(design.view) || "card";
  const name = str(content.collection);
  const collection: Collection | undefined = name ? namedCollection(ctx.props, name) : undefined;
  let items: Page[] = collection?.items ?? [];

  const count = typeof content.count === "number" ? content.count : 0;
  if (count > 0) items = items.slice(0, count);

  const title = str(content.title);
  const text = str(content.text);
  const config: ViewConfig = {
    columns: typeof design.columns === "number" ? design.columns : Number(design.columns) || 2,
    fillImage: design.fill_image !== false,
    showDate: design.show_date !== false,
    showReadTime: design.show_read_time !== false,
    showReadMore: design.show_read_more !== false,
    t,
  };

  let list;
  switch (view) {
    case "article-grid":
      list = <ArticleGrid items={items} config={config} />;
      break;
    case "citation":
      list = <CitationList items={items} t={t} />;
      break;
    case "date-title-summary":
      list = <DateTitleSummaryList items={items} t={t} />;
      break;
    default:
      list = <CardList items={items} config={config} />;
  }

  const archive = (content.archive ?? {}) as Record<string, unknown>;
  const archiveLink = safeHref(archive.link);
  const showArchive = archive.enable === true && archiveLink;

  return (
    <>
      {title && (
        <div class="flex flex-col items-center max-w-prose mx-auto gap-3 justify-center px-6 md:px-0">
          <div
            class="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
          />
          {text && (
            <p
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }}
            />
          )}
        </div>
      )}
      <div class="flex flex-col items-center px-6">{list}</div>
      {showArchive && (
        <div class="container mx-auto max-w-screen-lg px-8 xl:px-5 pb-5 lg:pb-8">
          <div class="mt-10 flex justify-center">
            <a
              class="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
              href={archiveLink}
            >
              <span>{str(archive.text) || t("more_pages")}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
