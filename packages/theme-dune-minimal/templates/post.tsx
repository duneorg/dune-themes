/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import PostMeta from "../components/post-meta.tsx";
import TagList from "../components/tag-list.tsx";

export default function PostTemplate(props: any) {
  const { page, children, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  return (
    <LayoutComponent {...props}>
      <article>
        <header>
          <h1>{page.frontmatter.title}</h1>
          <PostMeta page={page} />
        </header>
        {children}
        <footer>
          <TagList page={page} />
        </footer>
      </article>
    </LayoutComponent>
  );
}
