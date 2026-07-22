# Hugo Blox for Dune

Faithful port of [Hugo Blox](https://hugoblox.com) (MIT © Lore Labs — see
[LICENSE](LICENSE)), the Tailwind-based block framework behind the Academic
CV template.

![Blox screenshot](https://themes.getdune.org/blox/themes/blox/static/screenshot.png)

**Demo**: https://themes.getdune.org/blox

**Tags**: dune-theme, portfolio, academic, landing, faithful

## Install

```bash
dune theme:install jsr:@dune/theme-blox@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: blox
    src: jsr:@dune/theme-blox@1.0.0

theme:
  name: blox
  src: jsr:@dune/theme-blox@1.0.0
```

The stylesheet is the upstream Tailwind v4 pipeline (theme config, framework
base/components, block styles, safelist) compiled against this port's markup
into `static/blox.css`. Client behaviour (light/dark toggle, mobile menu,
dropdowns, search modal) is ported from the upstream `hb-*.js` assets in
`static/blox.js`.

Full deviations-from-upstream detail and a config walkthrough are in the
[live demo](https://themes.getdune.org/blox)'s **Using Blox** section.

## Templates

| Template | Upstream | Notes |
|---|---|---|
| `landing` | `home.html` / `landing_page.html` | renders frontmatter `sections:` through the block registry |
| `blocks-docs` | (Dune-native) | live block previews + YAML for the Blocks and shortcodes page |
| `default` / `post` / `page` | `single.html` | title, date/author/read-time row, publication & event metadata grid, prose |
| `list` | `list.html` | page markdown + item list from the page's `collection:`; `view:`/`columns:` frontmatter |
| `error` | `404.html` | "Page not found" + recent-pages recommendations |
| `search` | — (upstream is modal-only) | results page for Dune's `/search` route |

## Blocks (landing `sections:`)

Academic CV: `resume-biography-3`, `markdown`, `collection`,
`resume-experience`, `resume-skills`, `resume-awards`, `resume-languages`,
`cta-card`. Marketing / content: `hero`, `dev-hero`, `features`, `stats`,
`faq`, `logos`, `steps`, `testimonials`, `pricing`, `comparison-table`,
`focus-areas`, `tech-stack`, `contact-info`, `cta-button-list`,
`cta-image-paragraph`, `team-showcase`, `portfolio`, `gallery`, `map`.
Aliases (`skills` → `resume-skills`, `research-areas` → `focus-areas`,
etc.) are honoured. See the demo's
[Blocks and shortcodes](https://themes.getdune.org/blox/theme-docs/blocks-and-shortcodes/)
and [Block showcase](https://themes.getdune.org/blox/theme-docs/block-showcase/).

Section wrapper supports `id`, `design.css_class`, `design.css_style`,
`design.background.color`, `design.spacing.padding`, and
`design.background.gradient_mesh.enable` (default orbs mesh).

## Collections on landing pages

Upstream's collection block queries `site.Pages` by folder. Dune resolves
collections declaratively, so a landing page declares them in frontmatter and
blocks reference them by name:

```yaml
collections:
  pubs:
    items: { "@page.children": /publications }
    order: { by: date, dir: desc }
sections:
  - block: collection
    content: { title: Recent Publications, collection: pubs }
    design: { view: citation }
```

## MDX components

`Callout` (all Obsidian types), `Button` (style/size/rounded/align/icon),
`InlineIcon`, `Spoiler`, `Video`, `Audio` — ports of the equivalent
shortcodes. The theme declares its sanitizer allowances via the `sanitize`
export in `mdx-components.ts`, so no `trusted_html: true` is needed.

## Configuration

Admin-editable (`config_schema`): `title`, `menu` (JSON array of
`{name, url}`; defaults to top-level nav), `theme_mode`
(system/light/dark), `theme_toggle`, `search`, `sticky_header`, `cta` (JSON
`{text, url}`), `language_labels` (code/name), `footer_text`.

## Deviations from upstream

- **Author profiles** live inline in the block's `content.author` (same
  shape as upstream `data/authors/me.yaml`) instead of `content/authors/`
  pages — Dune templates don't read arbitrary pages. `avatar` is a URL.
- **Search** is Dune's `/api/search` in the upstream modal shell (Ctrl/Cmd+K);
  Pagefind, its filters, and quick actions are not ported. Fetch URLs
  respect `site.basePath` for path-prefix multisite hosting.
- **Icons** are a pruned set (~55) of the upstream hero/brands/academicons
  packs covering the blocks, callouts, and common social links; unknown bare
  names fall back to text like upstream's emoji fallback.
- **Block markdown** (titles, bios, summaries) supports the inline subset
  (bold/italic/code/links/paragraphs), not full markdown.
- **Not ported**: `search-hero` (Pagefind), `help-categories` /
  `help-questions`, docs layout + sidebar/ToC, cover image processing,
  BibTeX cite button, niche shortcodes (`cite`, `math`, `chart`,
  `notebook`, `slide`, …), full icon packs beyond the pruned ~55.
