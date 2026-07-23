---
title: Installing Fractal
date: 2026-03-01
template: post
published: true
summary: Add Fractal to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, fractal]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-fractal@1.0.0 --activate
```

## From a ZIP

Grab `fractal-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/fractal/`, then set `theme.name: fractal` in `site.yaml`.
