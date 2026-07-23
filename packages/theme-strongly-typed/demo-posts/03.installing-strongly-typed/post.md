---
title: Installing Strongly Typed
date: 2026-03-01
template: post
published: true
summary: Add Strongly Typed to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, strongly-typed]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-strongly-typed@1.0.0 --activate
```

## From a ZIP

Grab `strongly-typed-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/strongly-typed/`, then set `theme.name: strongly-typed` in `site.yaml`.
