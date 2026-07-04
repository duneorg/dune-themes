/** @jsxImportSource preact */
import { h } from "preact";
import { formatDate } from "@dune/core/theme-helpers";

/**
 * Date / author line for a post. Accepts a `page` or any object with
 * `frontmatter`; renders nothing if there is no date or author.
 */
export default function PostMeta({ page, language }: any) {
  const fm = page?.frontmatter ?? {};
  const ts = fm.date ? new Date(fm.date).getTime() : undefined;
  if (!ts && !fm.author) return null;
  return (
    <p class="post-meta">
      {ts && (
        <time datetime={new Date(ts).toISOString()}>
          {formatDate(ts, language ?? page?.language ?? "en", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      )}
      {ts && fm.author && " · "}
      {fm.author && <span>{fm.author}</span>}
    </p>
  );
}
