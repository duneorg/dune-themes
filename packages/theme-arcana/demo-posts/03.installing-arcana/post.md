---
title: Installing Arcana
date: 2026-03-01
template: post
published: true
summary: Add Arcana to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, arcana]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-arcana@1.0.0 --activate
```

## From a ZIP

Grab `arcana-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/arcana/`, then set `theme.name: arcana` in `site.yaml`.
