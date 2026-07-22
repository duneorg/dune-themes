/** @jsxImportSource preact */
import { h } from "preact";

/**
 * Taxonomy tag links for a page. Reads `frontmatter.taxonomy.tag` (or
 * `tags`) and links each to `/tags/<name>/` (or `/{taxonomy}s/<name>/`
 * for other vocabularies). Demos generate matching `termPageFor` pages
 * via `demo:link`; sites need the same authored term pages.
 */
export default function TagList({ page, taxonomy = "tag" }: any) {
  const tax = page?.frontmatter?.taxonomy ?? {};
  const tags: string[] = tax[taxonomy] ?? tax[`${taxonomy}s`] ?? [];
  if (!tags.length) return null;
  const base = taxonomy === "tag" ? "tags" : `${taxonomy}s`;
  return (
    <ul class="tag-list">
      {tags.map((t) => (
        <li key={t}>
          <a href={`/${base}/${encodeURIComponent(t)}/`}>{t}</a>
        </li>
      ))}
    </ul>
  );
}
