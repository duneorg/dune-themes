/**
 * Shared JSR package manifest helpers for theme packages.
 */

export const THEME_PACKAGE_MOD_TS = `/**
 * JSR entry point for this Dune theme package.
 * Dune resolves \`jsr:@dune/theme-*@version\` to the directory containing theme.yaml.
 */
export {};
`;

/**
 * JSR package names are limited to 20 characters. Slugs that would push
 * `theme-{slug}` over that limit use a stable shortened package name.
 * Install docs / registry `jsr` fields must use this helper (not raw slug).
 */
const JSR_PACKAGE_NAME_OVERRIDES: Record<string, string> = {
  "escape-velocity": "theme-escape-vel",
  "future-imperfect": "theme-future-imp",
};

/** JSR package name without scope (e.g. `theme-striped`). */
export function jsrPackageName(slug: string): string {
  return JSR_PACKAGE_NAME_OVERRIDES[slug] ?? `theme-${slug}`;
}

export interface ThemePackageManifestOptions {
  slug: string;
  version?: string;
}

/** Build deno.json contents for a publishable theme package. */
export function themeDenoJson(options: ThemePackageManifestOptions): string {
  const { slug, version = "1.0.0" } = options;
  return JSON.stringify({
    name: `@dune/${jsrPackageName(slug)}`,
    version,
    license: "MIT",
    exports: "./mod.ts",
    imports: {
      "@dune/core/content/types": "jsr:@dune/core@^0.28/content/types",
      "@dune/core/theme-helpers": "jsr:@dune/core@^0.28/theme-helpers",
      preact: "npm:preact@^10",
      "preact/hooks": "npm:preact@^10/hooks",
      "preact/jsx-runtime": "npm:preact@^10/jsx-runtime",
      "preact/jsx-dev-runtime": "npm:preact@^10/jsx-dev-runtime",
    },
    compilerOptions: {
      jsx: "react-jsx",
      jsxImportSource: "preact",
      lib: ["deno.window", "dom"],
    },
  }, null, 2) + "\n";
}
