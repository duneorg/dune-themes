/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

/**
 * Splash / landing template — Starlight's hero layout without the sidebar.
 * Frontmatter options:
 *   hero:
 *     tagline: "..."
 *     actions:
 *       - { text: "Get Started", link: "/docs", variant: "primary" }
 *       - { text: "GitHub", link: "https://...", variant: "minimal" }
 */
export default function SplashTemplate(props: any) {
  const { page, children, Layout, themeConfig, site } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const hero = page.frontmatter.hero ?? {};
  const tagline = hero.tagline ?? themeConfig?.tagline ?? site?.description ?? "";
  const actions: any[] = hero.actions ?? [];

  return (
    <LayoutComponent {...props} hideSidebar>
      <div class="sl-splash">
        <section class="sl-hero">
          <h1>{hero.title ?? page.frontmatter.title}</h1>
          {tagline && <p class="sl-tagline">{tagline}</p>}
          {actions.length > 0 && (
            <div class="sl-actions">
              {actions.map((a: any) => (
                <a key={a.link} href={a.link} class={`sl-btn ${a.variant === "primary" ? "primary" : "minimal"}`}>
                  {a.text}
                </a>
              ))}
            </div>
          )}
        </section>
        <section class="sl-splash-content">
          {children}
        </section>
      </div>
    </LayoutComponent>
  );
}
