---
title: Installing Aerial
date: 2026-03-01
template: post
published: true
summary: Add Aerial to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, aerial]
---

Aerial is a fullscreen landing: background, overlay, and a sparse header
with icon-style social/nav links. You want that shell on a real Dune site,
not a static HTML unzip.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-aerial@1.0.2 --activate
```

Pins an exact version in the site import map. After install, `dune
lockfile:sync` picks up the change — no hand-copying theme files.

## From a ZIP

Grab `aerial-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/aerial/`, then set:

```yaml
# site.yaml
theme:
  name: aerial
```

Either path is the same package. Prefer JSR when you want updates without
re-downloading ZIPs.
