---
title: Installing Verti
date: 2026-03-01
template: post
published: true
summary: Add Verti to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, verti]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-verti@1.0.0 --activate
```

## From a ZIP

Grab `verti-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/verti/`, then set `theme.name: verti` in `site.yaml`.
