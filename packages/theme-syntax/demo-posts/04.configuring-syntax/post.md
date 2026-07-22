---
title: Configuring Syntax
date: 2026-07-15
template: post
published: true
summary: Every config_schema option, and what this demo has set.
taxonomy:
  tag: [configuration, syntax]
---

Syntax keeps its `theme.yaml` config_schema to a handful of tech-blog
options. Here's what each one does, and what this demo site actually has
set — you're reading the result of these values right now.

## `color_scheme`

One of eight curated presets (blue, slate, green, purple, amber, rose,
terracotta, teal — labels Cobalt / Emerald / Indigo / Crimson / Terracotta / Teal,
etc.). Default **blue** (Cobalt / GitHub blue). Each sets a matched light/dark
accent plus tinted page and code-block backgrounds. This demo uses blue with
the visitor scheme switcher on so you can try the others.

## `scheme_switcher`

On in this demo. Adds a swatch dropdown next to the dark-mode toggle;
the choice persists in `localStorage` for this browser only and does not
change the site's configured scheme.

## `default_dark`

Off in this demo. The header toggle still switches at runtime and
remembers your choice in `localStorage`. When this is off and you haven't
chosen yet, your OS light/dark preference decides (including with JS
disabled, via a CSS media query).

## `show_reading_time`

On in this demo. Every post's meta line includes an "N min" estimate from
the post's word count.

## `home_subtitle`

Shown under the home title on the `blog` template. Seeded in this demo so
the index introduces Syntax instead of a blank subtitle.

## `footer_text`

Optional override for the footer line. Leave empty for the default
© year · Powered by Dune line.
