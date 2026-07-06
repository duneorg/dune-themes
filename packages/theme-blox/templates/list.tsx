/**
 * List template — port of list.html. The page's markdown renders above the
 * item list; items come from the page's `collection:` frontmatter.
 * Frontmatter `view:` selects the list view (card, article-grid, citation,
 * date-title-summary), `columns:` the grid width.
 */
import type { TemplateProps } from "@dune/core/content/types";
import Layout from "../components/layout.tsx";
import { ArticleGrid, CardList, CitationList, DateTitleSummaryList, type ViewConfig } from "../components/views.tsx";
import {
  pageTitle,
  str,
} from "../utils/blox.ts";

export default async function ListTemplate(props: TemplateProps) {
  const t = (props as unknown as { t?: (k: string) => string }).t ?? ((k: string) => k);
  const page = props.page;
  const fm = page.frontmatter as Record<string, unknown>;
  const html = await page.html();
  const Frame = (props.Layout ?? Layout) as typeof Layout;

  const items = props.collection?.items ?? [];
  const view = str(fm.view) || "card";
  const config: ViewConfig = {
    columns: Number(fm.columns) || 2,
    fillImage: fm.fill_image !== false,
    showDate: fm.show_date !== false,
    showReadTime: fm.show_read_time !== false,
    showReadMore: fm.show_read_more !== false,
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

  return (
    <Frame {...props}>
      <div class="max-w-prose mx-auto flex justify-center">
        <article class="prose prose-slate lg:prose-xl dark:prose-invert">
          <h1 class="lg:text-6xl">{pageTitle(page)}</h1>
          <div
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
      <div class="flex flex-col items-center">{list}</div>
    </Frame>
  );
}
