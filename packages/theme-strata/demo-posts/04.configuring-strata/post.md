---
title: Configuring Strata
date: 2026-03-08
template: post
published: true
summary: Avatar, tagline, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, strata]
---

Strata's config surface stays close to what upstream actually exposes: an avatar, a tagline
next to the site name, and the credit/copyright pair every HTML5 UP port needs.

## `avatar`

Round portrait in `#header`. This demo leaves it at the theme default
(`static/html5up/images/avatar.jpg`) so the header renders without depending on an external
URL staying online. Set a URL when the demo should feel like your own studio.

## `tagline`

Appended after the site title inside `<h1>` — `{Site Title}, {tagline}`. This demo sets
**"A visual studio built for Dune demos"** via `demo-config.json` so the header reads as a
real byline instead of falling back to the site description. Change it when the demo should
sound like your product.

## `show_html5up_credit`

On here. The footer link back to HTML5 UP is required under CC BY while the toggle is on;
turn it off only alongside a separate Pixelarity license, and hide every credit surface
together, not just the footer line.

## `footer_text`

Copyright name. This demo uses **Strata Demo** so the footer stays short instead of
repeating a long site title.

There is no dark mode or color-scheme preset in this port — Strata upstream ships one
design, and a Dune lift may land later as an enhancement, not as fidelity.
