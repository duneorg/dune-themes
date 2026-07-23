---
title: Installing Massively
date: 2026-03-01
template: post
published: true
summary: Add Massively to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, massively]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-massively@1.0.0 --activate
```

## From a ZIP

Grab `massively-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/massively/`, then set `theme.name: massively` in `site.yaml`.
