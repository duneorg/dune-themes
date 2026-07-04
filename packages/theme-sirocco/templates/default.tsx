/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: any) {
  const { page, children, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  return (
    <LayoutComponent {...props}>
      <article class="post-single">
        <header class="post-header">
          <h1 class="post-title">{page.frontmatter.title}</h1>
          {page.frontmatter.metadata?.description && (
            <div class="post-description">{page.frontmatter.metadata.description}</div>
          )}
        </header>
        <div class="post-content">{children}</div>
      </article>
    </LayoutComponent>
  );
}
