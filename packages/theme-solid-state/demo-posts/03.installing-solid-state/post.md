---
title: Installing Solid State
date: 2026-03-01
template: post
published: true
summary: Add Solid State to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, solid-state]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-solid-state@1.0.0 --activate
```

## From a ZIP

Grab `solid-state-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/solid-state/`, then set `theme.name: solid-state` in `site.yaml`.
