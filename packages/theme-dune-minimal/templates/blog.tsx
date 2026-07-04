/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import PostMeta from "../components/post-meta.tsx";
import Pagination from "../components/pagination.tsx";

export default function BlogTemplate(props: any) {
  const { page, children, Layout, collection } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  return (
    <LayoutComponent {...props}>
      <h1>{page.frontmatter.title}</h1>
      {children}
      <div class="entry-list">
        {(collection?.items ?? []).map((post: any) => (
          <article class="entry" key={post.route}>
            <h2>
              <a href={post.route}>{post.frontmatter.title}</a>
            </h2>
            <PostMeta page={post} language={page.language} />
            {post.frontmatter.metadata?.description && (
              <p>{post.frontmatter.metadata.description}</p>
            )}
          </article>
        ))}
      </div>
      <Pagination {...props} />
    </LayoutComponent>
  );
}
