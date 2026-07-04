/** @jsxImportSource preact */
/** Port of Hero.astro. Frontmatter shape matches upstream:
 * hero: { title?, tagline?, image: { file | html | dark/light }, actions: [{ text, link, icon, variant }] } */
import { h } from "preact";
import Icon from "./icon.tsx";
import LinkButton from "./link-button.tsx";

export default function Hero(
  { page }: { page: Record<string, unknown> },
) {
  const fm = (page?.frontmatter ?? {}) as Record<string, any>;
  const hero = fm.hero ?? {};
  const title: string = hero.title ?? fm.title ?? "";
  const tagline: string | undefined = hero.tagline;
  const image = hero.image ?? {};
  const actions: Array<Record<string, any>> = hero.actions ?? [];
  const imgSrc: string | undefined = image.file ?? image.dark;
  const lightSrc: string | undefined = image.dark ? image.light : undefined;
  const rawHtml: string | undefined = image.html;

  return (
    <div class="hero">
      {imgSrc && (
        <img
          src={imgSrc}
          loading="eager"
          decoding="async"
          width={400}
          height={400}
          alt={image.alt ?? ""}
          class={lightSrc ? "light:sl-hidden" : undefined}
        />
      )}
      {lightSrc && (
        <img
          src={lightSrc}
          loading="eager"
          decoding="async"
          width={400}
          height={400}
          alt={image.alt ?? ""}
          class="dark:sl-hidden"
        />
      )}
      {rawHtml && (
        <div class="hero-html sl-flex" dangerouslySetInnerHTML={{ __html: rawHtml }} />
      )}
      <div class="sl-flex stack">
        <div class="sl-flex copy">
          <h1 id="_top" data-page-title dangerouslySetInnerHTML={{ __html: title }} />
          {tagline && <div class="tagline" dangerouslySetInnerHTML={{ __html: tagline }} />}
        </div>
        {actions.length > 0 && (
          <div class="sl-flex actions">
            {actions.map((action) => (
              <LinkButton
                href={action.link}
                variant={action.variant ?? "primary"}
                icon={action.icon}
              >
                {action.text}
              </LinkButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
