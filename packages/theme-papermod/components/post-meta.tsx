/** @jsxImportSource preact */
/** Port of layouts/_partials/post_meta.html — date · reading time ·
 * word count · author, joined with "&nbsp;·&nbsp;" — plus
 * translation_list.html ("Translations: …" with class i18n_list). */
import { h, Fragment } from "preact";
import { formatDate } from "@dune/core/theme-helpers";
import { langLabel as langLabelFor } from "../utils/content.ts";

export default function PostMeta(
  { page, words, minutes, themeConfig, t, translations }: any,
) {
  const tr = t ?? ((k: string) => k);
  const fm = page?.frontmatter ?? {};
  const parts: any[] = [];

  if (fm.date) {
    const ts = new Date(fm.date).getTime();
    parts.push(
      <span title={new Date(ts).toISOString()}>
        {formatDate(ts, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
      </span>,
    );
  }
  if (themeConfig?.show_reading_time !== false && minutes != null) {
    parts.push(<span>{minutes} {tr("read_time")}</span>);
  }
  if (themeConfig?.show_word_count === true && words != null) {
    parts.push(<span>{words} {tr("words")}</span>);
  }
  if (fm.author && fm.hideAuthor !== true) {
    parts.push(<span>{fm.author}</span>);
  }

  const currentLang = page?.language ?? "en";
  const otherLangs = (translations ?? []).filter(
    (tl: { lang: string }) => tl.lang !== currentLang,
  );
  const langLabel = (lang: string) =>
    langLabelFor(lang, t, themeConfig?.language_labels);

  if (!parts.length && !otherLangs.length) return null;
  return (
    <Fragment>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && " · "}
          {p}
        </Fragment>
      ))}
      {otherLangs.length > 0 && (
        <Fragment>
          {parts.length > 0 && " | "}
          <span>{tr("translations")}:</span>
          <ul class="i18n_list">
            {otherLangs.map((tl: { lang: string; url: string }) => (
              <li key={tl.lang}>
                <a href={tl.url}>{langLabel(tl.lang)}</a>
              </li>
            ))}
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
}
