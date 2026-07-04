/** @jsxImportSource preact */
/** Ports of TableOfContents.astro, MobileTableOfContents.astro and
 * components-internals/TableOfContents/TableOfContentsList.astro. */
import { Fragment, h } from "preact";
import Icon from "./icon.tsx";
import type { TocItem } from "../utils/starlight.ts";

function TocList(
  { toc, isMobile = false, depth = 0 }: {
    toc: TocItem[];
    isMobile?: boolean;
    depth?: number;
  },
) {
  return (
    <ul class={isMobile ? "isMobile" : undefined} style={`--depth: ${depth}`}>
      {toc.map((heading) => (
        <li>
          <a href={"#" + heading.slug}>
            <span>{heading.text}</span>
          </a>
          {heading.children.length > 0 && (
            <TocList toc={heading.children} depth={depth + 1} isMobile={isMobile} />
          )}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents(
  { toc, t }: { toc: TocItem[]; t: (k: string) => string },
) {
  return (
    <starlight-toc data-min-h="2" data-max-h="3">
      <nav aria-labelledby="starlight__on-this-page">
        <h2 id="starlight__on-this-page">{t("tableOfContents.onThisPage")}</h2>
        <TocList toc={toc} />
      </nav>
    </starlight-toc>
  );
}

export function MobileTableOfContents(
  { toc, t }: { toc: TocItem[]; t: (k: string) => string },
) {
  return (
    <mobile-starlight-toc data-min-h="2" data-max-h="3">
      <nav aria-labelledby="starlight__on-this-page--mobile">
        <details id="starlight__mobile-toc">
          <summary id="starlight__on-this-page--mobile" class="sl-flex">
            <span class="toggle sl-flex">
              {t("tableOfContents.onThisPage")}
              <Icon name="right-caret" class="caret" size="1rem" />
            </span>
            <span class="display-current" />
          </summary>
          <div class="dropdown">
            <TocList toc={toc} isMobile />
          </div>
        </details>
      </nav>
    </mobile-starlight-toc>
  );
}

/** Port of PageSidebar.astro. */
export default function PageSidebar(
  { toc, t }: { toc: TocItem[] | null; t: (k: string) => string },
) {
  if (!toc) return null;
  return (
    <Fragment>
      <div class="lg:sl-hidden">
        <MobileTableOfContents toc={toc} t={t} />
      </div>
      <div class="right-sidebar-panel sl-hidden lg:sl-block">
        <div class="sl-container">
          <TableOfContents toc={toc} t={t} />
        </div>
      </div>
    </Fragment>
  );
}
