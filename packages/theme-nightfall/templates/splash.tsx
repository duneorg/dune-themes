/** @jsxImportSource preact */
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

/**
 * Splash / landing — hero without sidebar.
 * Frontmatter: hero.tagline, hero.actions[{ text, link, variant }]
 */
export default function SplashTemplate(props: any) {
  const { page, children, Layout, themeConfig, site } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const hero = page.frontmatter.hero ?? {};
  const tagline = hero.tagline ?? themeConfig?.tagline ?? site?.description ?? "";
  const actions: any[] = hero.actions ?? [];

  return (
    <LayoutComponent {...props} hideSidebar>
      <div class="nf-splash">
        <section class="nf-hero">
          <h1>{hero.title ?? page.frontmatter.title}</h1>
          {tagline && <p class="nf-tagline">{tagline}</p>}
          {actions.length > 0 && (
            <div class="nf-actions">
              {actions.map((a: any) => {
                const href = safeHref(a.link);
                if (!href) return null;
                return (
                  <a
                    key={href}
                    href={href}
                    class={`nf-btn ${a.variant === "primary" ? "primary" : "minimal"}`}
                  >
                    {a.text}
                  </a>
                );
              })}
            </div>
          )}
        </section>
        <section class="nf-splash-content">
          {children}
        </section>
      </div>
    </LayoutComponent>
  );
}
