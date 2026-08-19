---
title: Configuring Highlights
date: 2026-03-08
template: post
published: true
summary: What each Highlights config key actually changes on the live demo.
taxonomy:
  tag: [config, highlights]
---

Highlights’ schema brands the hero and footer — the three special sections stay
fixed markup in `templates/default.tsx`. Here’s what this demo sets.

## `banner_title`

`<h1>` inside `#header .major`. This demo sets **“Welcome to Highlights”** via
`demo-config.json`. Empty falls back to the site title, then **“Highlights”**.

## `tagline`

Supporting line under the hero title. This demo sets **“Highlights for Dune”**.
Empty falls back to a built-in “responsive single-page theme” sentence.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) in `#footer` on home
and in the layout footer on inner pages. Leave it on unless you hold a separate
Pixelarity license — the toggle should hide every credit surface together.

## `footer_text`

Copyright name in the footer list. This demo sets **“Highlights Demo”** so the
line reads as a short demo label instead of a long site title. Empty falls back
to the site title.

Section headings (“Who we are”, “What we do”, “One more thing”) are template
copy, not config keys — see the chrome post for `#one` / `#two` / `#three`.
There is no dark mode or color-scheme preset in this port; a Dune lift may land
later as an enhancement, not as fidelity.
