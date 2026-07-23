---
title: Installing Helios
date: 2026-03-01
template: post
published: true
summary: Add Helios to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, helios]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-helios@1.0.0 --activate
```

## From a ZIP

Grab `helios-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/helios/`, then set `theme.name: helios` in `site.yaml`.
