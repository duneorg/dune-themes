/** @jsxImportSource preact */
/** Port of layouts/_partials/breadcrumbs.html. Ancestors are derived from
 * the page route segments (Dune routes mirror the content hierarchy). */
import { h, Fragment } from "preact";
import { ChevronRightIcon } from "./icons.tsx";

export default function Breadcrumbs({ page, t }: any) {
  const tr = t ?? ((k: string) => k);
  const route: string = page?.route ?? "/";
  const segments = route.split("/").filter(Boolean);
  // Ancestors only — the current page itself is not linked (matches upstream)
  const crumbs = [{ href: "/", label: tr("home") }];
  let acc = "";
  for (const seg of segments.slice(0, -1)) {
    acc += `/${seg}`;
    crumbs.push({ href: acc, label: seg.replace(/-/g, " ") });
  }
  return (
    <nav class="breadcrumbs" role="navigation" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <Fragment key={c.href}>
          {i > 0 && <ChevronRightIcon />}
          <a href={c.href}>{c.label}</a>
        </Fragment>
      ))}
      <ChevronRightIcon />
    </nav>
  );
}
