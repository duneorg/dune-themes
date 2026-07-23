---
title: Installing Minimaxing
date: 2026-03-01
template: post
published: true
summary: Add Minimaxing to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, minimaxing]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-minimaxing@1.0.0 --activate
```

## From a ZIP

Grab `minimaxing-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/minimaxing/`, then set `theme.name: minimaxing` in `site.yaml`.
