---
title: Configuring Gale
date: 2026-07-21
template: post
published: true
summary: Accent colour, dark mode, hero CTAs, and the three feature columns.
taxonomy:
  tag: [configuration, gale]
---

Gale’s config schema is landing-shaped: the homepage hero and feature
grid are driven entirely from theme config, so you can rebrand the demo
without editing templates.

## Brand

- `color_scheme` — blue / slate / green / purple / amber / rose /
  terracotta / teal (default **teal**; labels Cobalt / Emerald / Indigo / Crimson,
  etc.). Matched light/dark accents plus tinted page and code-block
  backgrounds.
- `scheme_switcher` — visitor preview dropdown (on in this demo)
- `default_dark` — start visitors in dark mode before any stored preference

## Hero

- `hero_badge`, `hero_title`, `hero_subtitle`
- `hero_primary_label` / `hero_primary_url`
- `hero_secondary_label` / `hero_secondary_url`

Empty `hero_title` falls back to the site title.

## Header CTA

`header_cta_label` and `header_cta_url` power the pill in the sticky
header (hidden on small screens where the menu takes priority).

## Features

Three columns: `feature_1_title` / `feature_1_text` through
`feature_3_*`. Keep them short — one idea each.

## Blog strip

`home_subtitle` sits under the “latest posts” heading on the homepage
and the `/blog/` index.
