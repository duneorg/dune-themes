/** @jsxImportSource preact */
import { h } from "preact";

/**
 * Taxonomy tag links for a page. Reads `frontmatter.taxonomy.tag` (or
 * `tags`) and links each to Dune's `/tag:<name>` taxonomy route.
 */
export default function TagList({ page, taxonomy = "tag" }: any) {
  const tax = page?.frontmatter?.taxonomy ?? {};
  const tags: string[] = tax[taxonomy] ?? tax[`${taxonomy}s`] ?? [];
  if (!tags.length) return null;
  return (
    <ul class="tag-list">
      {tags.map((t) => (
        <li key={t}>
          <a href={`/${taxonomy}:${encodeURIComponent(t)}`}>{t}</a>
        </li>
      ))}
    </ul>
  );
}
