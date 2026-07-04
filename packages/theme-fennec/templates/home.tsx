/** @jsxImportSource preact */
import { h } from "preact";
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

/**
 * Home template — Astrofy's bold hero greeting followed by the page body
 * and a "Latest from blog" card list driven by a collection block.
 */
export default function HomeTemplate(props: any) {
  const { page, children, Layout, themeConfig, collection } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const greeting = page.frontmatter.greeting ?? themeConfig?.hero_greeting ?? "Hey there 👋";

  return (
    <LayoutComponent {...props}>
      <section class="af-hero">
        <p class="af-greeting">{greeting}</p>
        <h1>{page.frontmatter.title}</h1>
      </section>
      <div class="af-prose af-hero-body">
        {children}
      </div>
      {collection?.items?.length > 0 && (
        <section class="af-latest">
          <h2>Latest from blog</h2>
          <div class="af-post-list">
            {collection.items.map((post: any) => {
              const date = post.frontmatter.date ? new Date(post.frontmatter.date).getTime() : undefined;
              return (
                <a class="af-post-card" href={post.route} key={post.route}>
                  <div class="af-post-card-body">
                    <h3>{post.frontmatter.title}</h3>
                    {date && (
                      <time datetime={new Date(date).toISOString()}>
                        {formatDate(date, page.language ?? "en", { day: "numeric", month: "short", year: "numeric" })}
                      </time>
                    )}
                    {post.frontmatter.metadata?.description && (
                      <p>{post.frontmatter.metadata.description}</p>
                    )}
                    <span class="af-badge">Read more →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </LayoutComponent>
  );
}
