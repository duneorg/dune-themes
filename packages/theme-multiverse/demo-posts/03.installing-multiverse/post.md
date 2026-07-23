---
title: Installing Multiverse
date: 2026-03-01
template: post
published: true
summary: Add Multiverse to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, multiverse]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-multiverse@1.0.0 --activate
```

## From a ZIP

Grab `multiverse-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/multiverse/`, then set `theme.name: multiverse` in `site.yaml`.
