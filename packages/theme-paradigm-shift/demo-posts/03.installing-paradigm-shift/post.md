---
title: Installing Paradigm Shift
date: 2026-03-01
template: post
published: true
summary: Add Paradigm Shift to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, paradigm-shift]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-paradigm-shift@1.0.0 --activate
```

## From a ZIP

Grab `paradigm-shift-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/paradigm-shift/`, then set `theme.name: paradigm-shift` in `site.yaml`.
