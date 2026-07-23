---
title: Installing Phantom
date: 2026-03-01
template: post
published: true
summary: Add Phantom to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, phantom]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-phantom@1.0.0 --activate
```

## From a ZIP

Grab `phantom-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/phantom/`, then set `theme.name: phantom` in `site.yaml`.
