---
title: Installing Miniport
date: 2026-03-01
template: post
published: true
summary: Add Miniport to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, miniport]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-miniport@1.0.0 --activate
```

## From a ZIP

Grab `miniport-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/miniport/`, then set `theme.name: miniport` in `site.yaml`.
