---
title: Installing Prologue
date: 2026-03-01
template: post
published: true
summary: Add Prologue to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, prologue]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-prologue@1.0.0 --activate
```

## From a ZIP

Grab `prologue-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/prologue/`, then set `theme.name: prologue` in `site.yaml`.
