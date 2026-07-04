import type { ThemeDef } from "../theme-defs.ts";

export interface ThemeCustomization {
  /** Extra CSS appended after baseline + archetype styles */
  cssExtra?: (def: ThemeDef) => string;
  layoutTsx?: (def: ThemeDef) => string;
  postTemplate?: () => string;
  blogTemplate?: () => string;
  defaultTemplate?: () => string;
  sectionTemplate?: () => string;
  /** Replaces baseline config_schema block in theme.yaml */
  configSchemaYaml?: (def: ThemeDef) => string;
  /** Merged into locales/en.json */
  localeStrings?: Record<string, string>;
  /** Optional extra files relative to theme root, e.g. components/foo.tsx */
  extraFiles?: Record<string, string>;
}
