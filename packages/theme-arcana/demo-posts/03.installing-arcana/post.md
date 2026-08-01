---
title: Installing Arcana
date: 2026-03-01
template: post
published: true
summary: Add Arcana — HTML5 UP’s corporate landing — to Dune.
taxonomy:
  tag: [install, arcana]
---

Arcana sits next to Alpha in spirit (corporate landing) but with its own
logo/banner treatment and multi-slot footer. Install it the same two ways
as every other Dune theme package.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-arcana@1.0.2 --activate
```

Pins the package; `dune lockfile:sync` picks up the import-map change.

## From a ZIP

Extract `arcana-1.0.2.zip` under `themes/arcana/` and set
`theme.name: arcana` in `site.yaml`.

Then open `/` for the banner and `/blog` for dogfood posts — including
this install note. Prefer JSR when you want updates without re-fetching
ZIPs.
