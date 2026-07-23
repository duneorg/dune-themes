---
title: Installing Dopetrope
date: 2026-03-01
template: post
published: true
summary: Add Dopetrope to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, dopetrope]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-dopetrope@1.0.0 --activate
```

## From a ZIP

Grab `dopetrope-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/dopetrope/`, then set `theme.name: dopetrope` in `site.yaml`.
