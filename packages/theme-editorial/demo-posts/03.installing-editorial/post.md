---
title: Installing Editorial
date: 2026-03-01
template: post
published: true
summary: Add Editorial to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, editorial]
---

Editorial is a two-column magazine layout: `#main` carries the article
on the left, and a persistent `#sidebar` — search, `#menu` nav, recent
posts, and an about blurb — sits on the right on every route, not just
home. You want that whole shell on a real Dune site, not a static
HTML5 UP export with hand-patched links.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-editorial@1.0.1 --activate
```

This pins an exact version of the theme package into your site’s
import map. After install, run `dune lockfile:sync` so the lockfile
records the dependency — the theme’s templates,
`components/layout.tsx`, and vendored `static/html5up/` assets install
together, without hand-copying files into `themes/`.

## From a ZIP

Grab `editorial-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/editorial/`, then set `theme.name: editorial` in
`site.yaml`.

Either path gives you the identical package: the same `#main`/`#sidebar`
split, the same `blog`, `post`, `archives`, and `search` templates, and
the same vendored stylesheet. JSR is easier to keep updated across
version bumps; the ZIP suits teams that want to vendor and audit files
directly before deploying.

