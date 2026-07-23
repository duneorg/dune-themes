---
title: Installing Alpha
date: 2026-03-01
template: post
published: true
summary: Add Alpha to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, alpha]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-alpha@1.0.0 --activate
```

## From a ZIP

Grab `alpha-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/alpha/`, then set `theme.name: alpha` in `site.yaml`.
