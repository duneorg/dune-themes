---
title: Configuring Salon
date: 2026-07-15
template: post
published: true
summary: Every config_schema option, and what this demo has set.
taxonomy:
  tag: [configuration, salon]
cover: /themes/salon/static/demo/cover-configuring.jpg
---

Salon keeps its `theme.yaml` config_schema to a handful of magazine-blog
options. Here's what each one does, and what this demo site actually has
set — you're reading the result of these values right now.

## `color_scheme`

One of eight curated presets (blue, slate, green, purple, amber, rose,
terracotta, teal — labels Cobalt / Emerald / Indigo / Crimson / Terracotta / Teal,
etc.). Default **rose** (Crimson). Each sets a matched light/dark accent plus
tinted page and code-block backgrounds. This demo uses rose with the
visitor scheme switcher on so you can try the others.

## `scheme_switcher`

On in this demo. Adds a swatch dropdown next to the dark-mode toggle;
the choice persists in `localStorage` for this browser only and does not
change the site's configured scheme.

## `default_dark`

Off in this demo. The header toggle still switches at runtime and
remembers your choice in `localStorage`. When this is off and you haven't
chosen yet, your OS light/dark preference decides (including with JS
disabled, via a CSS media query).

## `home_subtitle`

Shown under the home title on the `blog` template — the magazine tagline.
Seeded in this demo so the masthead introduces Salon instead of a blank
subtitle.

## `footer_text`

Optional override for the footer line. Leave empty for the default
© year · Powered by Dune line.

---

*Cover photo by [Glenn Carstens-Peters](https://unsplash.com/@glenncarstenspeters?utm_source=dune_themes&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=dune_themes&utm_medium=referral).*
