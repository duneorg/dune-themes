/** @jsxImportSource preact */
/** Port of layouts/_partials/cover.html. Uses the page's `cover.image`
 * frontmatter (absolute URL or a co-located media path) or Dune's
 * indexed `coverImage`. Hugo's responsive resizing is replaced by Dune's
 * image processor via plain src (resizing params can be added by users). */
import { h } from "preact";

export default function Cover(
  { page, isSingle = false }: any,
) {
  const fm = page?.frontmatter ?? {};
  const cover = fm.cover ?? {};
  const hidden = isSingle
    ? (cover.hiddenInSingle ?? cover.hidden ?? false)
    : (cover.hiddenInList ?? cover.hidden ?? false);
  const src = cover.image ?? page?.coverImage;
  if (!src || hidden) return null;
  const alt = cover.alt ?? cover.caption ?? "";
  return (
    <figure class="entry-cover">
      <img loading={isSingle ? "eager" : "lazy"} src={src} alt={alt} />
      {isSingle && cover.caption && <figcaption>{cover.caption}</figcaption>}
    </figure>
  );
}
