/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

/**
 * Section index: page body followed by a linked list of children
 * (driven by a `collection:` block in the page frontmatter).
 */
export default function SectionTemplate(props: any) {
  const { page, children, Layout, collection } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  return (
    <LayoutComponent {...props}>
      <article>
        <h1>{page.frontmatter.title}</h1>
        {children}
      </article>
      {collection?.items?.length > 0 && (
        <ul class="section-list">
          {collection.items.map((child: any) => (
            <li key={child.route}>
              <a href={child.route}>{child.frontmatter.title}</a>
              {child.frontmatter.metadata?.description && (
                <p>{child.frontmatter.metadata.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </LayoutComponent>
  );
}
