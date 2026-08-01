---
title: Installing Forty
date: 2026-03-01
template: post
published: true
summary: Add Forty to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, forty]
---

Forty leads with a full-bleed `#banner` hero and a six-tile mosaic on
`/` and `/home`, with the rest of the site reached through a slide-out
`#menu` rather than a persistent header nav. You want that structure —
banner, tiles, menu, and the alt-header treatment on inner pages — on a
real Dune site, not a static HTML5 UP export with dead anchor links.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-forty@1.0.1 --activate
```

Pins an exact version of the package in your site’s import map. After
install, `dune lockfile:sync` picks up the change, so the theme’s
templates, `components/layout.tsx`, and vendored `static/html5up/`
assets all arrive together without copying files by hand.

## From a ZIP

Grab `forty-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/forty/`, then set `theme.name: forty` in
`site.yaml`.

Either path gives you the same tile landing, banner, and slide-out
`#menu` — the ZIP just requires you to re-download and re-extract on
every version bump instead of letting `dune lockfile:sync` do it.
