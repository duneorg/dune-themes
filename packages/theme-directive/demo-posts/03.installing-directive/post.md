---
title: Installing Directive
date: 2026-03-01
template: post
published: true
summary: Add Directive to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, directive]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-directive@1.0.0 --activate
```

## From a ZIP

Grab `directive-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/directive/`, then set `theme.name: directive` in `site.yaml`.
