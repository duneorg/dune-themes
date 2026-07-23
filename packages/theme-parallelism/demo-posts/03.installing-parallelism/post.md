---
title: Installing Parallelism
date: 2026-03-01
template: post
published: true
summary: Add Parallelism to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, parallelism]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-parallelism@1.0.0 --activate
```

## From a ZIP

Grab `parallelism-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/parallelism/`, then set `theme.name: parallelism` in `site.yaml`.
