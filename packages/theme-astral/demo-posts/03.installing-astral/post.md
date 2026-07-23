---
title: Installing Astral
date: 2026-03-01
template: post
published: true
summary: Add Astral to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, astral]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-astral@1.0.0 --activate
```

## From a ZIP

Grab `astral-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/astral/`, then set `theme.name: astral` in `site.yaml`.
