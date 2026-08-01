---
title: Installing Massively
date: 2026-03-01
template: post
published: true
summary: Add Massively to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, massively]
---

Massively is a hero-blog theme: a full-screen `#intro` on the home
route, an `#header` logo and `#nav` bar, then a card grid of post
excerpts in `#main`. You want that whole shell — intro, nav, and card
layout — on a real Dune site, not a static HTML5 UP export with
hand-edited links.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-massively@1.0.1 --activate
```

This pins an exact version of the theme package into your site’s
import map. After install, run `dune lockfile:sync` so the lockfile
records the new dependency — the theme’s templates,
`components/layout.tsx`, and vendored `static/html5up/` assets all
arrive together, without hand-copying files into `themes/`.

## From a ZIP

Grab `massively-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/massively/`, then set `theme.name: massively` in
`site.yaml`.

Either path gives you the identical package: the same `#intro` markup,
the same `blog`, `post`, `archives`, and `search` templates, and the
same vendored stylesheet. JSR is easier to keep updated across version
bumps; the ZIP is useful when you want to vendor and audit the files
directly before deploying.

