---
title: Installing Landed
date: 2026-03-01
template: post
published: true
summary: Add Landed to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, landed]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-landed@1.0.0 --activate
```

## From a ZIP

Grab `landed-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/landed/`, then set `theme.name: landed` in `site.yaml`.
