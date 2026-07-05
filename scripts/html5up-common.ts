/**
 * Shared README, attribution, and theme.yaml fragments for HTML5 UP themes.
 */

import type { ThemeDef } from "./theme-defs.ts";
import { HTML5UP_ATTRIBUTION_URL } from "./html5up-defs.ts";

export function html5UpAttributionLine(def: ThemeDef): string {
  return `Design by [HTML5 UP](https://html5up.net) — [${def.upstream}](${def.upstreamUrl}) (${def.upstreamLicense})`;
}

export function html5UpThemeYamlAttribution(def: ThemeDef): string {
  return `attribution: "${def.upstream} by HTML5 UP (${def.upstreamLicense}) — https://html5up.net/license"`;
}

export function html5UpReadme(def: ThemeDef): string {
  return `# ${def.name}

Dune theme adapted from [${def.upstream}](${def.upstreamUrl}) by [HTML5 UP](https://html5up.net).

**License:** ${html5UpAttributionLine(def)}. Sites using this theme must keep visible design credit per the [Creative Commons Attribution 3.0 License](${HTML5UP_ATTRIBUTION_URL}).

**Templates:** see \`templates/\` — layout preserves HTML5 UP markup classes where possible so upstream CSS applies.

\`\`\`bash
dune theme:install jsr:@dune/theme-${def.slug}@1.0.0 --activate
\`\`\`

## From template to your site

1. Choose a starting design — this theme, another [HTML5 UP](https://html5up.net) template,
   or a [Pixelarity](https://pixelarity.com) design (including Pixelarity-only templates)
2. We adapt structure, styling, and Dune configuration to your content
3. You get a deployed, maintained Dune site — not a redistributable theme package

Themes we implement from Pixelarity are **bespoke client projects only** (agency-licensed;
not part of the public Dune theme catalog). [Contact us →](https://getdune.org/services)

## Attribution on live sites

Include a visible link to HTML5 UP in your site footer (the theme footer includes this by default).
Do not remove upstream design credit unless you hold a separate [Pixelarity](https://pixelarity.com) license.
`;
}

/** Footer HTML snippet — required CC BY attribution. */
export function html5UpFooterCredit(): string {
  return `<a href="https://html5up.net">Design: HTML5 UP</a>`;
}

export function html5UpConfigSchemaExtra(): string {
  return `  show_html5up_credit:
    type: toggle
    label: Show HTML5 UP design credit in footer
    default: true
`;
}
