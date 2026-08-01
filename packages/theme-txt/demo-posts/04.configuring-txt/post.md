---
title: Configuring TXT
date: 2026-03-08
template: post
published: true
summary: Avatar, tagline, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, txt]
---

TXT's config surface stays close to what upstream actually exposes: an optional avatar, a
tagline under the logo, and the credit/copyright pair every HTML5 UP port needs.

## `avatar`

Optional portrait URL used where the theme's layout calls for one. This demo leaves it
empty and keeps the theme default treatment, since TXT's header is text-only by design —
set a URL only if your fork of the layout adds an image slot.

## `tagline`

The line under the logo in `#header`, and inside the scrolly `#banner` on home. This demo
sets **"Notes, essays, and short-form writing on Dune"** via `demo-config.json` so both
spots read as a real byline instead of the schema's generic fallback. Empty falls back to
the site description.

## `show_html5up_credit`

On here. The footer link back to HTML5 UP is required under CC BY while the toggle is on;
turn it off only alongside a separate Pixelarity license, and hide every credit surface
together, not just the footer line.

## `footer_text`

Copyright name. This demo uses **TXT Demo** so the footer stays short instead of repeating
a long site title.

There is no dark mode or color-scheme preset in this port — TXT upstream ships one design,
and a Dune lift may land later as an enhancement, not as fidelity.
