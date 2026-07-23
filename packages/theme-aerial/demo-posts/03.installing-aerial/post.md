---
title: Installing Aerial
date: 2026-03-01
template: post
published: true
summary: Add Aerial to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, aerial]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-aerial@1.0.0 --activate
```

## From a ZIP

Grab `aerial-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/aerial/`, then set `theme.name: aerial` in `site.yaml`.
