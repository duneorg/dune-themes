---
title: Installing Stellar
date: 2026-03-01
template: post
published: true
summary: Add Stellar to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, stellar]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-stellar@1.0.0 --activate
```

## From a ZIP

Grab `stellar-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/stellar/`, then set `theme.name: stellar` in `site.yaml`.
