---
title: Configuring Verti
date: 2026-03-08
template: post
published: true
summary: What each Verti config key actually changes on the live demo.
taxonomy:
  tag: [config, verti]
---

Verti’s schema brands the logo line and footer — banner copy, feature boxes,
and sidebar thumbnails stay fixed markup. Here’s what this demo sets.

## `tagline`

Span under the site title inside `#logo`. This demo sets **“Verti for Dune”**
via `demo-config.json`. Empty falls back to the site description, then
**“by HTML5 UP”**.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside
`#copyright` on both the landing widget footer and the compact inner-page
footer. Leave it on unless you hold a separate Pixelarity license — the toggle
should hide every credit surface together.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Verti Demo”** so the line reads as a short demo label instead of a long site
title. Empty falls back to the site title.

Banner headline and description still come from the site title / site
description, not from theme knobs — see the chrome post for how
`#banner-wrapper` and `#features-wrapper` are wired. There is no dark mode or
color-scheme preset in this port; a Dune lift may land later as an enhancement,
not as fidelity.
