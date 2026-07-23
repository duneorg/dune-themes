export function formatEventuallyDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function postExcerpt(fm: Record<string, unknown>): string | undefined {
  const meta = fm.metadata as Record<string, unknown> | undefined;
  return meta?.description ? String(meta.description) : undefined;
}

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

export function iconForUrl(href: string): string {
  const h = href.toLowerCase();
  if (h.includes("twitter.com") || h.includes("x.com")) return "icon brands fa-twitter";
  if (h.includes("facebook.com")) return "icon brands fa-facebook-f";
  if (h.includes("instagram.com")) return "icon brands fa-instagram";
  if (h.includes("github.com")) return "icon brands fa-github";
  if (h.includes("dribbble.com")) return "icon brands fa-dribbble";
  if (h.includes("linkedin.com")) return "icon brands fa-linkedin-in";
  if (h.startsWith("mailto:")) return "icon fa-envelope";
  return "icon solid fa-link";
}

export function socialLinksFromNav(
  nav: Array<{ route: string; navTitle?: string; title?: string; frontmatter?: { title?: string } }> | undefined,
): SocialLink[] {
  return (nav ?? [])
    .filter((item) => item.route && item.route !== "/")
    .slice(0, 5)
    .map((item) => ({
      href: item.route,
      icon: iconForUrl(item.route),
      label: item.navTitle ?? item.title ?? item.frontmatter?.title ?? item.route,
    }));
}
