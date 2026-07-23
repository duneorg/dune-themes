---
title: Installing TXT
date: 2026-03-01
template: post
published: true
summary: Add TXT to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, txt]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-txt@1.0.0 --activate
```

## From a ZIP

Grab `txt-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/txt/`, then set `theme.name: txt` in `site.yaml`.
