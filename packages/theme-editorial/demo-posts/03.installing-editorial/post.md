---
title: Installing Editorial
date: 2026-03-01
template: post
published: true
summary: Add Editorial to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, editorial]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-editorial@1.0.0 --activate
```

## From a ZIP

Grab `editorial-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/editorial/`, then set `theme.name: editorial` in `site.yaml`.
