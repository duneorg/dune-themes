---
title: Installing Escape Velocity
date: 2026-03-01
template: post
published: true
summary: Add Escape Velocity to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, escape-velocity]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-escape-vel@1.0.0 --activate
```

## From a ZIP

Grab `escape-velocity-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/escape-velocity/`, then set `theme.name: escape-velocity` in `site.yaml`.
