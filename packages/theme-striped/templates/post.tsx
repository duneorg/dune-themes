/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

function formatStripedDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  const month = d.toLocaleString("en-US", { month: "short" });
  const monthTail = month.slice(1);
  const monthHead = month.slice(0, 1);
  return `<span class="month">${monthHead}<span>${monthTail}</span></span> <span class="day">${d.getDate()}</span><span class="year">, ${d.getFullYear()}</span>`;
}

export default function PostTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = typeof fm.subtitle === "string" ? fm.subtitle : undefined;

  return (
    <LayoutComponent {...props}>
      <article class="box post">
        <header>
          <h2>{page.frontmatter.title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </header>
        {date && (
          <div class="info">
            <span class="date" dangerouslySetInnerHTML={{ __html: formatStripedDate(date) }} />
          </div>
        )}
        {cover && (
          <a href={page.route} class="image featured">
            <img src={cover} alt="" />
          </a>
        )}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
