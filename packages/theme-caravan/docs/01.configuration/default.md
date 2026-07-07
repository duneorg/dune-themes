---
title: Configuration
template: default
published: true
order: 1
metadata:
  description: Caravan's config_schema options and where they're stored.
---

Caravan declares its configurable options in `theme.yaml`'s `config_schema`.
Values are stored in `data/theme-config.json` and editable from the admin
panel's Theme Settings tab (Settings → Theme), or by hand in that file.

## Options

| Key | Type | Default | What it does |
| --- | --- | --- | --- |
| `color_scheme` | select | `blue` | Accent color + sidebar tint. One of `blue`, `slate`, `green`, `purple`, `amber`, `rose` — see [Customization](../customization/) for what each pair actually contains. |
| `scheme_switcher` | toggle | `false` | Adds a sidebar dropdown so *visitors* can preview the other presets client-side (stored in their browser's `localStorage`). Doesn't change your site's actual `color_scheme` — off by default, since most sites want one consistent brand color rather than letting visitors repaint the site. This demo has it turned on so you can try the presets. |
| `show_search` | toggle | `true` | Shows the live search box at the top of the sidebar. |
| `footer_text` | text | *(empty)* | Replaces the default "Built with Dune — theme Caravan" footer line. |

## Setting them

```json
// data/theme-config.json
{
  "color_scheme": "green",
  "show_search": true,
  "footer_text": "© 2026 Acme Docs"
}
```

Or through the admin panel, which renders a form from the same
`config_schema` — no code changes needed for any of the above.

## Per-page and per-section overrides

Caravan itself doesn't currently read anything beyond the site-level config
above — every page uses the same `color_scheme`. Dune's own per-section
config-override mechanism (a page or section overriding specific keys via
frontmatter, the way `collections:` already works) is being tracked for the
theme library more broadly; once it lands, a `theme_config:` block in a
section's frontmatter will let e.g. a `/blog/` section use a different
accent than the rest of the site.
