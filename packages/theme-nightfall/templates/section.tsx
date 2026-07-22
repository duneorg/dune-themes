/** @jsxImportSource preact */
import StaticLayout from "../components/layout.tsx";

export default function SectionTemplate(props: any) {
  const { page, children, Layout, collection } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const meta = (page.frontmatter.metadata ?? {}) as Record<string, unknown>;
  const items = collection?.items ?? [];

  return (
    <LayoutComponent {...props}>
      <article class="nf-content" style="padding:2rem 2rem 4rem;max-width:45rem;margin:0 auto">
        <h1>{page.frontmatter.title}</h1>
        {meta.description && <p class="nf-tagline" style="text-align:left;margin:0 0 1rem">{String(meta.description)}</p>}
        <div>{children}</div>
        {items.length > 0 && (
          <ul class="nf-section-list">
            {items.map((child: any) => (
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
