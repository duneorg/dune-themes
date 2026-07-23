---
title: Installing Future Imperfect
date: 2026-03-01
template: post
published: true
summary: Add Future Imperfect to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, future-imperfect]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-future-imperfect@1.0.0 --activate
```

## From a ZIP

Grab `future-imperfect-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/future-imperfect/`, then set `theme.name: future-imperfect` in `site.yaml`.
