---
title: Installing Strata
date: 2026-03-01
template: post
published: true
summary: Add Strata to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, strata]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-strata@1.0.0 --activate
```

## From a ZIP

Grab `strata-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/strata/`, then set `theme.name: strata` in `site.yaml`.
