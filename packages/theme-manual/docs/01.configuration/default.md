---
title: Configuration
template: default
published: true
label: New
metadata:
  description: Color schemes, sidebar tagline, and dark mode.
---

Manual's `theme.yaml` config_schema is intentionally small.

## `color_scheme`

One of eight curated presets. Default **purple** uses Just the Docs'
accent (`#7253ed`) with matched light/dark surfaces. This demo turns on
the visitor scheme switcher so you can try the others.

## `scheme_switcher`

On in this demo. Swatch dropdown next to the dark-mode toggle; choice
persists in `localStorage` for this browser only.

## `default_dark`

Off in this demo. Toolbar toggle still switches at runtime. With no
stored choice, OS light/dark preference decides (including with JS
disabled).

## `site_tagline`

Shown under the site title in the sidebar brand block. Default is
"Product documentation".

## `footer_text`

Optional override for the footer line.
