---
title: Installing Forty
date: 2026-03-01
template: post
published: true
summary: Add Forty to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, forty]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-forty@1.0.0 --activate
```

Pins the package in your import map; `dune lockfile:sync` picks up the
change without copying files by hand.

## From a ZIP

Grab `forty-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/forty/`, then set `theme.name: forty` in `site.yaml`.

Either path gives you the same tile landing, banner, and slide-out
`#menu`. JSR is easier to keep updated.
