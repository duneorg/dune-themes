---
title: Installing Twenty
date: 2026-03-01
template: post
published: true
summary: Add Twenty to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, twenty]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-twenty@1.0.0 --activate
```

## From a ZIP

Grab `twenty-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/twenty/`, then set `theme.name: twenty` in `site.yaml`.
