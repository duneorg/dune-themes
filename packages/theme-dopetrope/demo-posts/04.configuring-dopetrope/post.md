---
title: Configuring Dopetrope
date: 2026-03-08
template: post
published: true
summary: What each option changes on the live Dopetrope demo.
taxonomy:
  tag: [config, dopetrope]
---

Dopetrope’s config surface brands the home banner and copyright line — the magazine post
grid is collection-driven markup, not a schema knob.

## `show_banner`

When on (default), home renders `#banner` inside `#header` with the configured headline
and subtitle. Flip it off and home keeps the title/`#nav` row but drops the hero strip —
useful for a quieter front page, less useful when you’re QA’ing against upstream.

## `banner_title`

`<h2>` inside `#banner header`. This demo sets **"Welcome to Dopetrope"**. Empty falls
back to the site title.

## `banner_subtitle`

`<p>` under that headline in `#banner`. This demo sets **"Magazine columns for Dune"**
so the hero doesn’t fall back to a long site description. Empty uses the site description,
then a built-in default.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#footer #copyright`.
Leave it on unless you hold a separate Pixelarity license — the toggle should hide every
credit surface together, not orphan one in the footer while another lingers elsewhere.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets **"Dopetrope
Demo"** so the footer reads as a short demo label instead of falling back to a long site
title. Empty falls back to the site title.

There is no dark mode or color-scheme preset in this port; a Dune lift may land later as
an enhancement, not as fidelity.
