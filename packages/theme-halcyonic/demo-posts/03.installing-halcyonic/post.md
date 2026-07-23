---
title: Installing Halcyonic
date: 2026-03-01
template: post
published: true
summary: Add Halcyonic to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, halcyonic]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-halcyonic@1.0.0 --activate
```

## From a ZIP

Grab `halcyonic-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/halcyonic/`, then set `theme.name: halcyonic` in `site.yaml`.
