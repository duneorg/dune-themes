---
title: Installing Tessellate
date: 2026-03-01
template: post
published: true
summary: Add Tessellate to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, tessellate]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-tessellate@1.0.0 --activate
```

## From a ZIP

Grab `tessellate-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/tessellate/`, then set `theme.name: tessellate` in `site.yaml`.
