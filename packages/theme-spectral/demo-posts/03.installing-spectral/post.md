---
title: Installing Spectral
date: 2026-03-01
template: post
published: true
summary: Add Spectral to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, spectral]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-spectral@1.0.0 --activate
```

## From a ZIP

Grab `spectral-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/spectral/`, then set `theme.name: spectral` in `site.yaml`.
