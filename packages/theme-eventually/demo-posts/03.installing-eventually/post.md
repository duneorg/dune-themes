---
title: Installing Eventually
date: 2026-03-01
template: post
published: true
summary: Add Eventually to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, eventually]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-eventually@1.0.0 --activate
```

## From a ZIP

Grab `eventually-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/eventually/`, then set `theme.name: eventually` in `site.yaml`.
