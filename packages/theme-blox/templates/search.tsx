/**
 * Search results page for Dune's /search route (upstream is modal-only; the
 * modal is also available via the navbar / Ctrl+K).
 */
import type { TemplateProps } from "@dune/core/content/types";
import Layout from "../components/layout.tsx";
import { normalizeRoute } from "../utils/blox.ts";

export default function SearchTemplate(props: TemplateProps) {
  const t = (props as unknown as { t?: (k: string) => string }).t ?? ((k: string) => k);
  const Frame = (props.Layout ?? Layout) as typeof Layout;
  const query = props.searchQuery ?? "";
  const results = props.searchResults ?? [];
  const basePath = (props.site as { basePath?: string } | undefined)?.basePath ?? "";
  const action = `${basePath}/search`.replace(/([^:]\/)\/+/g, "$1") || "/search";

  return (
    <Frame {...props}>
      <div class="max-w-prose mx-auto px-6">
        <article class="prose prose-slate lg:prose-xl dark:prose-invert">
          <h1>{t("search")}</h1>
        </article>
        <form action={action} method="get" class="my-6 flex gap-3">
          <input
            type="search"
            name="q"
            value={query}
            placeholder={`${t("search")}...`}
            class="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primary-500"
            autofocus
          />
          <button
            type="submit"
            class="rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 px-5 py-2 font-medium text-white shadow-lg hover:from-primary-600 hover:to-primary-700"
          >
            {t("search")}
          </button>
        </form>
        {query && results.length === 0 && (
          <p class="text-gray-500 dark:text-gray-400">{t("search.noResults")}</p>
        )}
        <div class="flex flex-col gap-4">
          {results.map((r) => (
            <a
              href={normalizeRoute(r.route)}
              class="search-result block rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-primary-300 dark:hover:border-primary-700"
              key={r.route}
            >
              <div class="font-semibold text-gray-900 dark:text-white">{r.title}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{r.excerpt}</div>
            </a>
          ))}
        </div>
      </div>
    </Frame>
  );
}
