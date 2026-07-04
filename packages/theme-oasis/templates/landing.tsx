/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

/**
 * Landing template — Hugo Blox "resume-bio" style hero with avatar, role,
 * social icons, and the page body as the biography, followed by recent
 * items from an optional collection (e.g. latest posts/publications).
 *
 * Frontmatter options:
 *   hero:
 *     avatar: "/path/to/avatar.jpg"   # overrides theme config
 *     role: "Professor of AI"
 *     organization: "Example University"
 *     social:
 *       - { label: "GitHub", url: "https://github.com/..." }
 *       - { label: "Email", url: "mailto:..." }
 */
export default function LandingTemplate(props: any) {
  const { page, children, Layout, themeConfig, collection } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const hero = page.frontmatter.hero ?? {};
  const avatar = hero.avatar ?? themeConfig?.avatar_url ?? "";
  const role = hero.role ?? themeConfig?.role ?? "";
  const org = hero.organization ?? themeConfig?.organization ?? "";
  const social: any[] = hero.social ?? [];

  return (
    <LayoutComponent {...props}>
      <section class="bx-hero">
        {avatar && <img class="bx-avatar" src={avatar} alt={page.frontmatter.title} width="200" height="200" />}
        <h1>{page.frontmatter.title}</h1>
        {role && <p class="bx-role">{role}</p>}
        {org && <p class="bx-org">{org}</p>}
        {social.length > 0 && (
          <div class="bx-social">
            {social.map((s: any) => (
              <a key={s.url} href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined} rel="noopener">
                {s.label}
              </a>
            ))}
          </div>
        )}
      </section>
      <section class="bx-bio">
        {children}
      </section>
      {collection?.items?.length > 0 && (
        <section class="bx-section">
          <h2>{page.frontmatter.collection_title ?? "Recent"}</h2>
          <div class="bx-card-grid">
            {collection.items.map((item: any) => (
              <a class="bx-card" href={item.route} key={item.route}>
                <h3>{item.frontmatter.title}</h3>
                {item.frontmatter.metadata?.description && (
                  <p>{item.frontmatter.metadata.description}</p>
                )}
              </a>
            ))}
          </div>
        </section>
      )}
    </LayoutComponent>
  );
}
