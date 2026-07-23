---
title: Installing Dimension
date: 2026-03-01
template: post
published: true
summary: Add Dimension to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, dimension]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-dimension@1.0.0 --activate
```

## From a ZIP

Grab `dimension-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/dimension/`, then set `theme.name: dimension` in `site.yaml`.
