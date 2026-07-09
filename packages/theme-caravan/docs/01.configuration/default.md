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
| `flat_nav` | toggle | `false` | The sidebar shows the full nested page tree by default (click a section to expand it, current page's ancestors start expanded). Turn this on to show only top-level pages instead. |
| `footer_text` | text | *(empty)* | Replaces the default "Built with Dune — theme Caravan" footer line. |

## Setting them

`data/theme-config.json` is namespaced by theme name, so switching themes
and back doesn't discard your settings:

```json
// data/theme-config.json
{
  "caravan": {
    "color_scheme": "green",
    "show_search": true,
    "footer_text": "© 2026 Acme Docs"
  }
}
```

Or through the admin panel, which renders a form from the same
`config_schema` (dropdowns for `select` fields, real checkboxes for
`toggle`, a native color picker for `color`) — no code changes needed for
any of the above.

## Per-page and per-section overrides

A page or section can override any of the options above for itself and its
descendants with a `theme_config:` block in frontmatter — the same
mechanism `collections:` uses. Site-level config applies first, then the
nearest ancestor section's `theme_config`, then the page's own — each layer
only overriding the keys it sets:

```yaml
# a section's default.md
title: Blog
theme_config:
  color_scheme: purple
```

Every page under that section renders with `color_scheme: purple` instead
of the site-level default, without Caravan needing to know or care —
`props.themeConfig` already arrives pre-resolved by the time a template
sees it.
