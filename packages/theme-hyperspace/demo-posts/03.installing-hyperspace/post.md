---
title: Installing Hyperspace
date: 2026-03-01
template: post
published: true
summary: Add Hyperspace to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, hyperspace]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-hyperspace@1.0.0 --activate
```

## From a ZIP

Grab `hyperspace-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/hyperspace/`, then set `theme.name: hyperspace` in `site.yaml`.
