---
title: Configuring Tessellate
date: 2026-03-08
template: post
published: true
summary: What each Tessellate config key actually changes on the live demo.
taxonomy:
  tag: [config, tessellate]
---

Tessellate’s schema brands the hero and footer — the scroll sections below
`#header` stay fixed markup in `templates/default.tsx`. Here’s what this demo
sets, and what each key does on the page.

## `hero_title`

Headline inside `#header h1`. This demo sets **“Tessellate for Dune”** via
`demo-config.json`. Empty falls back to `Welcome to {site title}`.

## `hero_subtitle`

Supporting line under the hero title. This demo sets **“Scroll sections, icon
features, and dark content bands for Dune.”** Empty falls back to the site
description, then a built-in HTML5 UP / Dune sentence.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) in `#footer
.copyright` on home and in the layout footer on inner pages. Leave it on unless
you hold a separate Pixelarity license — the toggle should hide every credit
surface together, not orphan one while another lingers.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Tessellate Demo”** so the line reads as a short demo label instead of a long
site title. Empty falls back to the site title.

Because the schema stops there, Tessellate’s fidelity comes from the fixed
section markup — see the chrome post for `#first` through `#fourth`. There is
no dark mode or color-scheme preset in this port; a Dune lift may land later as
an enhancement, not as fidelity.
