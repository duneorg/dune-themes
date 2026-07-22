---
title: Installing Gale
date: 2026-07-20
template: post
published: true
summary: Add Gale to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, gale]
---

Two install paths — same theme either way.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-gale@1.0.0 --activate
```

## From a ZIP

Grab the release ZIP from [dune-themes releases](https://github.com/duneorg/dune-themes/releases)
and extract it into `themes/gale/`, then set:

```yaml
# site.yaml
theme:
  name: gale
```

JSR is easier to keep updated; the ZIP is better if you want the theme
vendored in your own repo.
