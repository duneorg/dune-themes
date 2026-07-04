import type { ThemeCustomization } from "./types.ts";
import { galeCustomization } from "./gale.ts";
import { heraldCustomization } from "./herald.ts";
import { inkCustomization } from "./ink.ts";
import { lucidCustomization } from "./lucid.ts";
import { manualCustomization } from "./manual.ts";
import { salonCustomization } from "./salon.ts";
import { syntaxCustomization } from "./syntax.ts";

const CUSTOMIZATIONS: Record<string, ThemeCustomization> = {
  ink: inkCustomization,
  gale: galeCustomization,
  salon: salonCustomization,
  syntax: syntaxCustomization,
  herald: heraldCustomization,
  lucid: lucidCustomization,
  manual: manualCustomization,
};

export function getCustomization(slug: string): ThemeCustomization | undefined {
  return CUSTOMIZATIONS[slug];
}

export function isCustomized(slug: string): boolean {
  return slug in CUSTOMIZATIONS;
}

/** All scaffold-managed slugs with polish applied. */
export const POLISHED_SLUGS = Object.keys(CUSTOMIZATIONS);
