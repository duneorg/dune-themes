---
title: Configuration
template: default
published: true
metadata:
  description: Color schemes, sidebar label, and the optional edit link.
---

Lucid's `theme.yaml` config_schema is intentionally small.

## `color_scheme`

One of eight curated presets. Default **purple** uses Hextra's violet
(`#7c3aed`) with matched light/dark surfaces. This demo turns on the
visitor scheme switcher so you can try the others.

## `scheme_switcher`

On in this demo. Swatch dropdown next to the dark-mode toggle; choice
persists in `localStorage` for this browser only.

## `default_dark`

Off in this demo. Header toggle still switches at runtime. With no stored
choice, OS light/dark preference decides (including with JS disabled).

## `sidebar_label`

The uppercase label above the sidebar nav. Default is "Documentation".

## `edit_url`

When set, each docs page shows an "Edit this page" link built from this
base + the page route. This demo points at the Lucid package docs folder
on GitHub.

## `footer_text`

Optional override for the footer line.
