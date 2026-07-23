---
title: Installing Zerofour
date: 2026-03-01
template: post
published: true
summary: Add Zerofour to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, zerofour]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-zerofour@1.0.0 --activate
```

## From a ZIP

Grab `zerofour-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/zerofour/`, then set `theme.name: zerofour` in `site.yaml`.
