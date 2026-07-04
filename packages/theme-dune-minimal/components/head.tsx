/** @jsxImportSource preact */
import { h } from "preact";

/**
 * Standard document head: charset, viewport, title, description, canonical,
 * Open Graph tags, and the active theme's stylesheet.
 *
 * Child themes get correct SEO metadata for free by using the base layout,
 * or can import this component into their own layout:
 *
 * ```tsx
 * import Head from "../../dune-minimal/components/head.tsx";
 * <head><Head {...props} /><link rel="..." /></head>
 * ```
 *
 * The stylesheet link always points at the *active* theme's
 * `static/style.css` — child themes ship their own style.css that
 * `@import`s the base stylesheet (see dune-minimal/README.md).
 */
export default function Head(
  { site, config, page, pageTitle, pathname, extra }: any,
) {
  const themeName = config?.theme?.name ?? "dune-minimal";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const title = pageTitle ?? site?.title ?? "";

  return (
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={page?.frontmatter?.date ? "article" : "website"} />
      {page?.coverImage && <meta property="og:image" content={`${siteUrl}${page.coverImage}`} />}
      <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
      {extra}
    </head>
  );
}
