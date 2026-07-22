/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

function postLead(fm: Record<string, any>): string | undefined {
  return fm.summary ?? fm.metadata?.description ?? fm.description;
}

/**
 * Home — Astrofy-style bold greeting + page body + "Latest from blog" cards.
 */
export default function HomeTemplate(props: any) {
  const { page, children, Layout, themeConfig, collection, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const greeting = page.frontmatter.greeting ??
    themeConfig?.hero_greeting ??
    tr("hero.greeting", "Hey there");

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
          <h2>{tr("home.latest", "Latest from blog")}</h2>
          <div class="af-post-list">
            {collection.items.map((post: any) => {
              const date = post.frontmatter.date
                ? new Date(post.frontmatter.date).getTime()
                : undefined;
              const lead = postLead(post.frontmatter);
              return (
                <a class="af-post-card" href={post.route} key={post.route}>
                  <div class="af-post-card-body">
                    <h3>{post.frontmatter.title}</h3>
                    {date && (
                      <time datetime={new Date(date).toISOString()}>
                        {formatDate(date, page.language ?? "en", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    )}
                    {lead && <p>{lead}</p>}
                    <span class="af-badge">{tr("post.read_more", "Read more")}</span>
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
