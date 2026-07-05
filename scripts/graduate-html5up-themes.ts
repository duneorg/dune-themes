#!/usr/bin/env -S deno run -A
/**
 * Graduate HTML5 UP themes: vendor upstream assets + write Dune layout/templates.
 *
 *   deno task graduate:html5up              # all except hand-maintained (striped)
 *   deno task graduate:html5up massively alpha
 */

import { join } from "@std/path";
import {
  GRADUATED_HTML5UP_SLUGS,
  HAND_MAINTAINED_HTML5UP_SLUGS,
  HTML5UP_TEMPLATES,
  html5UpThemeDef,
} from "./html5up-defs.ts";
import {
  html5UpConfigSchemaExtra,
  html5UpReadme,
  html5UpThemeYamlAttribution,
} from "./html5up-common.ts";
import { layoutFamilyForSlug, needsArchives } from "./html5up/layout-families.ts";
import { generateLayout } from "./html5up/generate-layout.ts";
import {
  generateArchivesTemplate,
  generateBlogTemplate,
  generateDefaultTemplate,
  generateErrorTemplate,
  generatePostTemplate,
  generateSearchTemplate,
  shouldGenerateBlog,
} from "./html5up/generate-templates.ts";
import { styleCss } from "./html5up/style-css.ts";
import { vendorHtml5UpAssets } from "./html5up/vendor-assets.ts";
import { localesEnJson, configSchemaYaml } from "./scaffold-baseline.ts";
import { THEME_PACKAGE_MOD_TS, themeDenoJson } from "./theme-package.ts";

const ROOT = new URL("..", import.meta.url).pathname;

const args = Deno.args.filter((a) => !a.startsWith("--"));
const allFlag = Deno.args.includes("--all") || args.length === 0;

const targets = allFlag
  ? HTML5UP_TEMPLATES.map((t) => t.slug).filter((s) => !HAND_MAINTAINED_HTML5UP_SLUGS.has(s))
  : args;

if (targets.length === 0) {
  console.error("No themes to graduate. Pass slugs or use --all.");
  Deno.exit(1);
}

function themeYaml(def: ReturnType<typeof html5UpThemeDef>): string {
  const baseSchema = configSchemaYaml(def).trimEnd();
  const withCredit = baseSchema.replace(
    /footer_text:[\s\S]*?default: ""\n/,
    `$&${html5UpConfigSchemaExtra()}`,
  );
  return `name: ${def.slug}
version: 1.0.0
description: "${def.description.replace(/"/g, '\\"')}"
author: Dune Themes
license: MIT
source: https://github.com/duneorg/dune-themes/tree/main/packages/theme-${def.slug}
${html5UpThemeYamlAttribution(def)}
${withCredit}
`;
}

async function graduateSlug(slug: string): Promise<void> {
  const template = HTML5UP_TEMPLATES.find((t) => t.slug === slug);
  if (!template) {
    console.warn(`  skip ${slug} (not in HTML5UP_TEMPLATES)`);
    return;
  }
  if (HAND_MAINTAINED_HTML5UP_SLUGS.has(slug)) {
    console.warn(`  skip ${slug} (hand-maintained)`);
    return;
  }

  const def = html5UpThemeDef(template);
  const family = layoutFamilyForSlug(slug);
  const dir = join(ROOT, "packages", `theme-${slug}`);

  process.stdout.write(`  ${slug} … `);
  const assets = await vendorHtml5UpAssets(slug);

  await Deno.mkdir(join(dir, "templates"), { recursive: true });
  await Deno.mkdir(join(dir, "components"), { recursive: true });
  await Deno.mkdir(join(dir, "locales"), { recursive: true });

  await Deno.writeTextFile(join(dir, "theme.yaml"), themeYaml(def));
  await Deno.writeTextFile(join(dir, "README.md"), html5UpReadme(def));
  await Deno.writeTextFile(join(dir, "mod.ts"), THEME_PACKAGE_MOD_TS);
  await Deno.writeTextFile(join(dir, "deno.json"), themeDenoJson({ slug }));
  await Deno.writeTextFile(join(dir, "components", "layout.tsx"), generateLayout(def, family));
  await Deno.writeTextFile(join(dir, "templates", "default.tsx"), generateDefaultTemplate());
  await Deno.writeTextFile(join(dir, "templates", "post.tsx"), generatePostTemplate(family));
  await Deno.writeTextFile(join(dir, "templates", "error.tsx"), generateErrorTemplate());
  await Deno.writeTextFile(join(dir, "templates", "search.tsx"), generateSearchTemplate());
  if (shouldGenerateBlog(def)) {
    await Deno.writeTextFile(join(dir, "templates", "blog.tsx"), generateBlogTemplate(family));
  }
  if (needsArchives(def.archetype)) {
    await Deno.writeTextFile(join(dir, "templates", "archives.tsx"), generateArchivesTemplate());
  }
  await Deno.writeTextFile(join(dir, "locales", "en.json"), localesEnJson());
  await Deno.writeTextFile(join(dir, "static", "style.css"), styleCss(assets));

  console.log(`✓ (${family})`);
}

console.log(`Graduating ${targets.length} HTML5 UP theme(s)…\n`);
for (const slug of targets) {
  try {
    await graduateSlug(slug);
  } catch (err) {
    console.log("✗");
    console.error(`  ERROR ${slug}:`, err);
    Deno.exitCode = 1;
  }
}
console.log("\nDone. Add slugs to GRADUATED_HTML5UP_SLUGS after review, then sync catalog.");
