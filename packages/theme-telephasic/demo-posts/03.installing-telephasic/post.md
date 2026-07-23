---
title: Installing Telephasic
date: 2026-03-01
template: post
published: true
summary: Add Telephasic to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, telephasic]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-telephasic@1.0.0 --activate
```

## From a ZIP

Grab `telephasic-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/telephasic/`, then set `theme.name: telephasic` in `site.yaml`.
