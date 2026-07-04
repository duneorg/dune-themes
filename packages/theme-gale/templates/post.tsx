/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function PostTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;

  return (
    <LayoutComponent {...props}>
      <div class="gale-page-hero">
        <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
        {date && (
          <time datetime={new Date(date).toISOString()}>
            {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        )}
      </div>
      <article class="gale-page-content prose">
        {cover && <img class="post-cover" src={cover} alt="" style="border-radius:12px;margin-bottom:1.5rem" />}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
