/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

/**
 * Section index — page body plus a linked list of child pages from the
 * frontmatter `collection` block (same pattern as caravan).
 */
export default function SectionTemplate(props: TemplateProps & {
  children?: any;
  Layout?: typeof StaticLayout;
  collection?: { items?: { route: string; frontmatter: Record<string, any> }[] };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection } = props;
  const meta = (page.frontmatter.metadata ?? {}) as Record<string, unknown>;
  const items = collection?.items ?? [];

  return (
    <LayoutComponent {...props}>
      <article class="manual-content prose">
        <h1>{page.frontmatter.title}</h1>
        {meta.description && <p class="manual-lead">{String(meta.description)}</p>}
        <div data-dune-body>{children}</div>
        {items.length > 0 && (
          <ul class="manual-section-list">
            {items.map((child) => (
              <li key={child.route}>
                <a href={child.route}>{child.frontmatter.title}</a>
                {child.frontmatter.metadata?.description && (
                  <p>{child.frontmatter.metadata.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </article>
    </LayoutComponent>
  );
}
