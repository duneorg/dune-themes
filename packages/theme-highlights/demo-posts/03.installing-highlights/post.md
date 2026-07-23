---
title: Installing Highlights
date: 2026-03-01
template: post
published: true
summary: Add Highlights to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, highlights]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-highlights@1.0.0 --activate
```

## From a ZIP

Grab `highlights-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/highlights/`, then set `theme.name: highlights` in `site.yaml`.
