---
title: Installing Photon
date: 2026-03-01
template: post
published: true
summary: Add Photon from JSR or a release ZIP.
taxonomy:
  tag: [install, photon]
---

Photon is a single-page portfolio: a full-viewport `#header` hero, a
six-icon feature column, and gallery-style project tiles, all on one
route with inner content dropping into a plain `.main.style1` panel.
You want that shell — and the vendored `static/html5up/images/pic*.jpg`
set — on a real Dune site, not a hand-patched static export.

## From JSR

```bash
dune theme:install jsr:@dune/theme-photon@1.0.1 --activate
```

This pins an exact package version in your site’s import map. Run `dune
lockfile:sync` afterward so the lockfile records the dependency — the
theme’s templates, `components/layout.tsx`, and static assets install
together instead of being copied in by hand.

## From a ZIP

Extract `photon-1.0.1.zip` into `themes/photon/` and set
`theme.name: photon` in `site.yaml`. Same package either way — the
hero, icon grid, and gallery-style project tiles over vendored HTML5 UP
images are identical; JSR just makes future version bumps a one-line
change instead of a re-download.
