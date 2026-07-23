---
title: Installing Lens
date: 2026-03-01
template: post
published: true
summary: Add Lens to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, lens]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-lens@1.0.0 --activate
```

## From a ZIP

Grab `lens-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/lens/`, then set `theme.name: lens` in `site.yaml`.
