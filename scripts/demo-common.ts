/**
 * Demo site helpers.
 */

import { join } from "@std/path";
import { CATALOG } from "./catalog.ts";

export const ROOT = new URL("..", import.meta.url).pathname;

/** Slugs with a demo site under demos/{slug}/ */
export const DEMO_SLUGS = ["papermod"] as const;

export type DemoSlug = (typeof DEMO_SLUGS)[number];

export function demoDir(slug: string): string {
  return join(ROOT, "demos", slug);
}

export function isDemoSlug(slug: string): slug is DemoSlug {
  return (DEMO_SLUGS as readonly string[]).includes(slug);
}

export function catalogHasSlug(slug: string): boolean {
  return CATALOG.some((e) => e.slug === slug);
}

/** Ensure themes/{slug} and content symlinks exist for a demo site. */
export async function linkDemo(slug: string): Promise<void> {
  const dir = demoDir(slug);
  const themesDir = join(dir, "themes");
  const themeLink = join(themesDir, slug);
  const packageDir = join(ROOT, "packages", `theme-${slug}`);
  const contentLink = join(dir, "content");
  const sharedContent = join(ROOT, "demos", "_shared", "blog");

  await Deno.mkdir(themesDir, { recursive: true });

  try {
    await Deno.lstat(packageDir);
  } catch {
    throw new Error(`Theme package not found: packages/theme-${slug}`);
  }

  await ensureSymlink(themeLink, join("..", "..", "..", "packages", `theme-${slug}`));
  await ensureSymlink(contentLink, join("..", "_shared", "blog"));
}

async function ensureSymlink(linkPath: string, target: string): Promise<void> {
  try {
    const stat = await Deno.lstat(linkPath);
    if (stat.isSymlink) {
      const current = await Deno.readLink(linkPath);
      if (current === target) return;
      await Deno.remove(linkPath);
    } else {
      throw new Error(`${linkPath} exists and is not a symlink`);
    }
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) throw err;
  }
  await Deno.symlink(target, linkPath);
}

/** Parse `papermod-v1.0.0` → { slug: papermod, version: 1.0.0 } */
export function parseReleaseTag(tag: string): { slug: string; version: string } | null {
  const m = tag.match(/^(.+)-v(\d+\.\d+\.\d+(?:[-+][\w.-]+)?)$/);
  if (!m) return null;
  return { slug: m[1]!, version: m[2]! };
}
