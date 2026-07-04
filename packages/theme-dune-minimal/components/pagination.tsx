/** @jsxImportSource preact */
import { h } from "preact";

/**
 * Prev/next links for a paginated collection. Uses Dune's
 * `/page:N` route suffix convention. `t` is the locale function prop.
 */
export default function Pagination({ collection, page, t }: any) {
  if (!collection?.hasPrev && !collection?.hasNext) return null;
  const tr = t ?? ((k: string) => k);
  const current = collection.page ?? 1;
  return (
    <nav class="pagination" aria-label="Pagination">
      {collection.hasPrev && (
        <a rel="prev" href={current === 2 ? page.route : `${page.route}/page:${current - 1}`}>
          « {tr("pagination.newer")}
        </a>
      )}
      {collection.hasNext && (
        <a rel="next" href={`${page.route}/page:${current + 1}`}>
          {tr("pagination.older")} »
        </a>
      )}
    </nav>
  );
}
