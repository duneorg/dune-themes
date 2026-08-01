---
title: Configuring Twenty
date: 2026-03-08
template: post
published: true
summary: Banner title, tagline, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, twenty]
---

Twenty's config surface stays close to what upstream actually exposes: a banner headline, a
tagline next to the logo, and the credit/copyright pair every HTML5 UP port needs.

## `banner_title`

The big headline inside `#banner` on home. This demo sets it to **"TWENTY"** via
`demo-config.json` so side-by-side QA against
[html5up.net/twenty](https://html5up.net/twenty) isn't comparing against an uppercased site
title placeholder. Empty falls back to the site title, uppercased.

## `tagline`

Rendered next to the site title inside `#logo` — `{Site Title} {tagline}`. This demo sets
**"for Dune demos"** so the header reads as a short byline instead of the schema default
("by HTML5 UP"). Change it when the demo should read as your own product.

## `show_html5up_credit`

On here. The footer link back to HTML5 UP is required under CC BY while the toggle is on;
turn it off only alongside a separate Pixelarity license, and hide every credit surface
together, not just the footer line.

## `footer_text`

Copyright name. This demo uses **Twenty Demo** so the footer stays short instead of
repeating a long site title.

There is no dark mode or color-scheme preset in this port — Twenty upstream ships one
design, and a Dune lift may land later as an enhancement, not as fidelity.
