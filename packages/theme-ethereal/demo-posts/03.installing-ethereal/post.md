---
title: Installing Ethereal
date: 2026-03-01
template: post
published: true
summary: Add Ethereal to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, ethereal]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-ethereal@1.0.0 --activate
```

## From a ZIP

Grab `ethereal-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/ethereal/`, then set `theme.name: ethereal` in `site.yaml`.
