/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
function formatHtml5UpDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function PostTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;

  return (
    <LayoutComponent {...props}>
      <article class="post">
        <header>
          
          <h2>{page.frontmatter.title}</h2>
        </header>
        {date && <p class="meta"><time>{date}</time></p>}
        {cover && <a href={page.route} class="image featured"><img src={cover} alt="" /></a>}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
