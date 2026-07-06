/**
 * Shared JSR package manifest helpers for theme packages.
 */

export const THEME_PACKAGE_MOD_TS = `/**
 * JSR entry point for this Dune theme package.
 * Dune resolves \`jsr:@dune/theme-*@version\` to the directory containing theme.yaml.
 */
export {};
`;

export interface ThemePackageManifestOptions {
  slug: string;
  version?: string;
}

/** Build deno.json contents for a publishable theme package. */
export function themeDenoJson(options: ThemePackageManifestOptions): string {
  const { slug, version = "1.0.0" } = options;
  return JSON.stringify({
    name: `@dune/theme-${slug}`,
    version,
    license: "MIT",
    exports: "./mod.ts",
    imports: {
      "@dune/core/content/types": "jsr:@dune/core@^0.27/content/types",
      "@dune/core/theme-helpers": "jsr:@dune/core@^0.27/theme-helpers",
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
    publish: {
      exclude: ["screenshots/"],
    },
  }, null, 2) + "\n";
}
