---
title: Installing Big Picture
date: 2026-03-01
template: post
published: true
summary: Add Big Picture to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, big-picture]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-big-picture@1.0.0 --activate
```

## From a ZIP

Grab `big-picture-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/big-picture/`, then set `theme.name: big-picture` in `site.yaml`.
