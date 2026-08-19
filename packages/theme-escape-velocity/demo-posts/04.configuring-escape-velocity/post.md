---
title: Configuring Escape Velocity
date: 2026-03-08
template: post
published: true
summary: What each option changes on the live Escape Velocity demo.
taxonomy:
  tag: [config, escape-velocity]
---

Escape Velocity’s config surface brands the logo line, intro section title, and copyright
— the feature list and highlight cards are fixed markup in `templates/default.tsx`.

## `tagline`

Paragraph under the site title inside `#logo`. This demo sets **"Sectioned marketing for
Dune"** so the header doesn’t fall back to a long site description. Empty uses the site
description, then a built-in HTML5 UP-style default. Visible on every page.

## `intro_title`

Text in `#intro .title` on the home landing only. This demo sets **"The Introduction"**
to match upstream’s section label. Empty falls back to that same default string.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#copyright` — on home
that block lives in `#footer`, on inner pages it sits below the no-sidebar content. Leave
it on unless you hold a separate Pixelarity license — the toggle should hide every credit
surface together.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets **"Escape Velocity
Demo"** so the footer reads as a short demo label instead of falling back to a long site
title. Empty falls back to the site title.

There is no dark mode or color-scheme preset in this port; a Dune lift may land later as
an enhancement, not as fidelity.
