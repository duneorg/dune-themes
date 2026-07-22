/** @jsxImportSource preact */
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

/**
 * Lightweight academic landing — avatar, role, org, social, bio,
 * optional education / interests, then a recent collection.
 *
 * Frontmatter:
 *   hero:
 *     avatar, role, organization
 *     social: [{ label, url }]
 *     education: [{ area, institution, years? }]
 *     interests: [string]
 */
export default function LandingTemplate(props: any) {
  const { page, children, Layout, themeConfig, collection, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const hero = page.frontmatter.hero ?? {};
  const avatar = safeHref(hero.avatar ?? themeConfig?.avatar_url) ?? "";
  const role = hero.role ?? themeConfig?.role ?? "";
  const org = hero.organization ?? themeConfig?.organization ?? "";
  const social: any[] = hero.social ?? [];
  const education: any[] = hero.education ?? [];
  const interests: string[] = hero.interests ?? [];

  return (
    <LayoutComponent {...props}>
      <section class="bx-hero">
        {avatar && (
          <img
            class="bx-avatar"
            src={avatar}
            alt=""
            width="200"
            height="200"
          />
        )}
        <h1>{page.frontmatter.title}</h1>
        {role && <p class="bx-role">{role}</p>}
        {org && <p class="bx-org">{org}</p>}
        {social.length > 0 && (
          <div class="bx-social">
            {social.map((s: any) => {
              const href = safeHref(s.url);
              if (!href) return null;
              const external = /^https?:/i.test(href);
              return (
                <a
                  key={href}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {s.label}
                </a>
              );
            })}
          </div>
        )}
      </section>
      <section class="bx-bio">
        {children}
      </section>
      {(education.length > 0 || interests.length > 0) && (
        <section class="bx-cv">
          {education.length > 0 && (
            <div class="bx-cv-block">
              <h2>{tr("landing.education", "Education")}</h2>
              <ul class="bx-education">
                {education.map((ed: any, i: number) => (
                  <li key={i}>
                    <strong>{ed.area}</strong>
                    {ed.institution && <span class="bx-edu-inst">{ed.institution}</span>}
                    {ed.years && <span class="bx-edu-years">{ed.years}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {interests.length > 0 && (
            <div class="bx-cv-block">
              <h2>{tr("landing.interests", "Interests")}</h2>
              <ul class="bx-interests">
                {interests.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
      {collection?.items?.length > 0 && (
        <section class="bx-section">
          <h2>{page.frontmatter.collection_title ?? tr("landing.recent", "Recent")}</h2>
          <div class="bx-card-grid">
            {collection.items.map((item: any) => {
              const lead = item.frontmatter.summary ??
                item.frontmatter.metadata?.description;
              return (
                <a class="bx-card" href={item.route} key={item.route}>
                  <h3>{item.frontmatter.title}</h3>
                  {lead && <p>{lead}</p>}
                </a>
              );
            })}
          </div>
        </section>
      )}
    </LayoutComponent>
  );
}
