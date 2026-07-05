/**
 * HTML5 UP shell layout families — maps each template slug to a shared Dune layout pattern.
 */

export type Html5UpLayoutFamily =
  | "page-wrapper"
  | "wrapper-main"
  | "wrapper-editorial"
  | "wrapper-fi"
  | "wrapper-massively"
  | "hyperspace"
  | "dimension"
  | "portfolio"
  | "aerial"
  | "minimal";

const WRAPPER_MAIN: Html5UpLayoutFamily = "wrapper-main";

/** Per-slug layout family (striped is hand-maintained separately). */
export const SLUG_LAYOUT_FAMILY: Record<string, Html5UpLayoutFamily> = {
  alpha: "page-wrapper",
  arcana: "page-wrapper",
  halcyonic: "page-wrapper",
  dopetrope: "page-wrapper",
  "escape-velocity": "page-wrapper",

  editorial: "wrapper-editorial",
  "future-imperfect": "wrapper-fi",
  massively: "wrapper-massively",
  hyperspace: "hyperspace",
  dimension: "dimension",
  aerial: "aerial",

  astral: "portfolio",
  fractal: "portfolio",
  lens: "portfolio",
  miniport: "portfolio",
  parallelism: "portfolio",
  photon: "portfolio",
  strata: "portfolio",
  txt: "portfolio",

  eventually: "minimal",
  zerofour: "minimal",
};

export function layoutFamilyForSlug(slug: string): Html5UpLayoutFamily {
  return SLUG_LAYOUT_FAMILY[slug] ?? WRAPPER_MAIN;
}

/** Archetypes that need blog + archives templates. */
export const BLOG_ARCHETYPES = new Set([
  "blog-minimal",
  "blog-hero",
  "blog-magazine",
  "blog-tech",
]);

export function needsArchives(archetype: string): boolean {
  return BLOG_ARCHETYPES.has(archetype);
}
