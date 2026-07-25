---
title: Configuring Alpha
date: 2026-03-08
template: post
published: true
summary: Banner headline, tagline, and credit — seeded for this live demo.
taxonomy:
  tag: [config, alpha]
---

This demo’s `demo-config.json` turns home into something you can screenshot
without empty schema defaults. You’re reading the result of those values,
not a table of hypothetical knobs.

## `show_banner` and `banner_title`

With the banner on, home uses the `alt` header and `#banner`. This demo
sets **“Alpha for Dune”** as the headline. Turn `show_banner` off and the
first viewport becomes ordinary `#main` content — useful for debugging, but
it no longer matches upstream Alpha’s first impression.

Empty `banner_title` falls back to the site title. Seed a short headline
before you cut a marketplace screenshot.

## `tagline`

Banner subtitle under the headline. Seeded as **“Business landing for
Dune”**. Empty falls back to the site description — if both are blank the
banner feels unfinished.

## `show_html5up_credit` and `footer_text`

Credit stays on (CC BY). Copyright name is **Alpha Demo** so a long site
title doesn’t crowd the footer. No dark mode or multi-scheme — upstream
Alpha is one light corporate design; a Dune lift may land later as an
enhancement, not as fidelity work.
