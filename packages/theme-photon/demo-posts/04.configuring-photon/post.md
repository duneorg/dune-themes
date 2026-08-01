---
title: Configuring Photon
date: 2026-03-08
template: post
published: true
summary: Avatar, tagline, and credit — what this demo shows on the hero.
taxonomy:
  tag: [config, photon]
---

Photon’s config is intentionally thin so the upstream single-page portfolio
shell stays intact. Three of its four keys are non-default in this demo’s
`demo-config.json`.

## `tagline`

Hero supporting copy that continues the `#header` headline. Upstream
Photon’s `h1` reads “Hi, I’m &lt;Name&gt;” — this port appends the
tagline right after the comma, so this demo’s value, **“a gallery-style
portfolio for Dune”**, renders as “Hi, I’m Photon, a gallery-style
portfolio for Dune.” It’s lowercase on purpose to keep that sentence
readable. Empty falls back to the site description; if both are empty
the headline trails off mid-sentence, so seed one before you screenshot.

## `avatar`

Optional image URL reserved for a future portrait treatment in the
header. Left empty in this demo — the current `#header` markup doesn’t
render it yet, so setting a URL here has no visible effect until that
lands; leave it blank rather than seeding a value nothing displays.

## `show_html5up_credit`

Set to `true`. The `#footer` copyright list appends a “Design: HTML5 UP”
line, linking to [html5up.net/photon](https://html5up.net/photon),
which is required while this port stays under CC BY. No dark mode or
color schemes — Photon upstream is one light portfolio design.

## `footer_text`

Set to **“Photon Demo”**, replacing the site title in the `#footer`
copyright line so a long product name doesn’t crowd the single-page
footer next to the credit link.
