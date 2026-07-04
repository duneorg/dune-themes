/** @jsxImportSource preact */
/** Ports of Footer.astro, EditLink.astro, LastUpdated.astro and
 * Pagination.astro. The footer element carries an extra `sl-footer` class
 * (and the edit link `sl-edit-link`) for the descoped styles. */
import { h } from "preact";
import Icon from "./icon.tsx";
import { navLabel, type NavPage } from "../utils/starlight.ts";

export default function Footer(
  { page, prev, next, dir, t, themeConfig }: {
    page: Record<string, unknown> | undefined;
    prev: NavPage | null;
    next: NavPage | null;
    dir: string;
    t: (k: string) => string;
    themeConfig: Record<string, unknown>;
  },
) {
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const isRtl = dir === "rtl";
  const editBase = (themeConfig?.edit_link_base as string) || "";
  const editUrl = editBase && page?.path
    ? editBase.replace(/\/$/, "") + "/" + String(page.path).replace(/^\//, "")
    : null;
  const lastUpdatedRaw = fm.lastUpdated ?? fm.updated;
  const lastUpdated = lastUpdatedRaw ? new Date(lastUpdatedRaw as string) : null;
  const pagination = themeConfig?.pagination !== false;
  const lang = (page?.language as string) ?? "en";

  return (
    <footer class="sl-flex sl-footer">
      <div class="meta sl-flex">
        {editUrl && (
          <a href={editUrl} class="sl-flex print:hidden sl-edit-link">
            <Icon name="pencil" size="1.2em" />
            {t("page.editLink")}
          </a>
        )}
        {lastUpdated && !isNaN(lastUpdated.getTime()) && (
          <p>
            {t("page.lastUpdated")}{" "}
            <time datetime={lastUpdated.toISOString()}>
              {lastUpdated.toLocaleDateString(lang, { dateStyle: "medium", timeZone: "UTC" })}
            </time>
          </p>
        )}
      </div>
      {pagination && (prev || next) && (
        <div class="pagination-links print:hidden" dir={dir as "ltr" | "rtl"}>
          {prev && (
            <a href={prev.route} rel="prev">
              <Icon name={isRtl ? "right-arrow" : "left-arrow"} size="1.5rem" />
              <span>
                {t("page.previousLink")}
                <br />
                <span class="link-title">{navLabel(prev)}</span>
              </span>
            </a>
          )}
          {next && (
            <a href={next.route} rel="next">
              <Icon name={isRtl ? "left-arrow" : "right-arrow"} size="1.5rem" />
              <span>
                {t("page.nextLink")}
                <br />
                <span class="link-title">{navLabel(next)}</span>
              </span>
            </a>
          )}
        </div>
      )}
      {themeConfig?.credits === true && (
        <a class="kudos sl-flex" href="https://starlight.astro.build">
          <Icon name="starlight" /> {t("builtWithStarlight.label")}
        </a>
      )}
    </footer>
  );
}
