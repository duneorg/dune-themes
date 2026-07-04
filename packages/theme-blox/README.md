# Hugo Blox for Dune

Faithful port of [Hugo Blox](https://hugoblox.com) (MIT © Lore Labs — see
[LICENSE](LICENSE)), the Tailwind-based block framework behind the Academic
CV template.

The stylesheet is the upstream Tailwind v4 pipeline (theme config, framework
base/components, block styles, safelist) compiled against this port's markup
into `static/blox.css`. Client behaviour (light/dark toggle, mobile menu,
dropdowns, search modal) is ported from the upstream `hb-*.js` assets in
`static/blox.js`.

## Templates

| Template | Upstream | Notes |
|---|---|---|
| `landing` | `home.html` / `landing_page.html` | renders frontmatter `sections:` through the block registry |
| `default` / `post` / `page` | `single.html` | title, date/author/read-time row, publication & event metadata grid, prose |
| `list` | `list.html` | page markdown + item list from the page's `collection:`; `view:`/`columns:` frontmatter |
| `error` | `404.html` | "Page not found" + recent-pages recommendations |
| `search` | — (upstream is modal-only) | results page for Dune's `/search` route |

## Blocks (landing `sections:`)

`resume-biography-3` (avatar, status emoji, name/pronouns/role, affiliations,
social links, bio, CV button, education cards, interest pills, gradient mesh),
`markdown`, `collection` (views: `card`, `article-grid`, `citation`,
`date-title-summary`; archive link), `resume-experience` (work + education
timelines), `resume-skills` (level bars), `resume-awards`, `resume-languages`
(progress rings), `cta-card` (auto text-color detection). Upstream aliases
(`skills` → `resume-skills` etc.) are honoured.

Section wrapper supports `id`, `design.css_class`, `design.css_style`,
`design.background.color`, `design.spacing.padding`, and
`design.background.gradient_mesh.enable` (default orbs mesh).

## Collections on landing pages

Upstream's collection block queries `site.Pages` by folder. Dune resolves
collections declaratively, so a landing page declares them in frontmatter and
blocks reference them by name (requires Dune ≥ the `collections:` map
feature):

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

`featured_only` filtering maps to a taxonomy filter (e.g. tag featured pages
with `taxonomy: { featured: ["yes"] }`).

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
  Pagefind, its filters, and quick actions are not ported.
- **Icons** are a pruned set (~55) of the upstream hero/brands/academicons
  packs covering the blocks, callouts, and common social links; unknown bare
  names fall back to text like upstream's emoji fallback.
- **Block markdown** (titles, bios, summaries) supports the inline subset
  (bold/italic/code/links/paragraphs), not full markdown.
- **Not ported**: the remaining ~20 blocks (hero, features, pricing, stats,
  team, portfolio, FAQ …), docs layout + sidebar/ToC, cover images and
  responsive image processing, author taxonomy pages, awards badges,
  citation styles other than APA, BibTeX cite button, comments, Alpine
  author-note tooltips, slides/notebook/chart/math shortcodes, gradient-mesh
  styles beyond default orbs, background images/videos, section breaks,
  attribution variants (footer credits Hugo Blox plainly).
