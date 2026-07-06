---
title: Theming Your Site
template: default
published: true
order: 2
metadata:
  description: Installing, configuring, and building themes.
---

Install a theme from JSR or a local path:

```bash
dune theme:install jsr:@dune/theme-caravan@1.0.0 --activate
dune theme:install ./themes/my-custom-theme --name custom --activate
```

A theme is a directory with `theme.yaml`, `templates/`, `components/`, and
`static/`. The minimum viable theme needs:

- `templates/default.tsx` — the fallback page template
- `components/layout.tsx` — the HTML shell (head, nav, footer)
- `theme.yaml` — metadata and an optional `config_schema`

> Themes may declare `parent: some-base-theme` in `theme.yaml` to inherit
> templates, components, and locales, overriding only what differs.

## Customizing without forking

Most visual changes (accent color, footer text, toggles) are exposed
through the theme's `config_schema` and editable from `config/site.yaml`
under `theme_config`, or from the admin panel if installed — no code
changes needed for the common cases.
