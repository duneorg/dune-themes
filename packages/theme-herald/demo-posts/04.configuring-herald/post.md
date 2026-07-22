---
title: Configuring Herald
date: 2026-07-15
template: post
published: true
summary: Every config_schema option, and what this demo has set.
taxonomy:
  tag: [configuration, herald]
cover: /themes/herald/static/demo/cover-configuring.jpg
---

Herald keeps its `theme.yaml` config_schema to publication-blog options.
Here's what each one does, and what this demo site actually has set.

## `color_scheme`

One of eight curated presets. Default **blue** uses Casper's sky accent
(`#3eb0ef`) with matched light/dark surfaces. This demo turns on the
visitor scheme switcher so you can try the others.

## `scheme_switcher`

On in this demo. Swatch dropdown next to the dark-mode toggle; choice
persists in `localStorage` for this browser only.

## `default_dark`

Off in this demo. Header toggle still switches at runtime. With no stored
choice, OS light/dark preference decides (including with JS disabled).

## Hero fields

`hero_title`, `hero_subtitle`, and `hero_image` drive the full-width home
masthead. This demo seeds a local Unsplash landscape under
`themes/herald/static/demo/hero.jpg` by
[Sam Ferrara](https://unsplash.com/@samferrara?utm_source=dune_themes&utm_medium=referral)
(see `CREDITS.md`).

## Author fields

`default_author` and `default_avatar` fill the feed and post meta when a
post doesn't set its own. This demo sets an author name so cards show it.

## `footer_text`

Optional override for the footer line. Leave empty for the default
© year · Powered by Dune line.

---

*Cover photo by [Glenn Carstens-Peters](https://unsplash.com/@glenncarstenspeters?utm_source=dune_themes&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=dune_themes&utm_medium=referral).*
