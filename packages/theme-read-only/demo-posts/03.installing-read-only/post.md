---
title: Installing Read Only
date: 2026-03-01
template: post
published: true
summary: Add Read Only to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, read-only]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-read-only@1.0.0 --activate
```

## From a ZIP

Grab `read-only-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/read-only/`, then set `theme.name: read-only` in `site.yaml`.
