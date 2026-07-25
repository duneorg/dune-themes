---
title: Installing Astral
date: 2026-03-01
template: post
published: true
summary: Add Astral’s icon-nav portfolio panels to a Dune site.
taxonomy:
  tag: [install, astral]
---

Astral is a portfolio shell: icon navigation, an intro panel with a
portrait jumplink, and additional panels for projects and links. On Dune
those panels deep-link to real routes instead of static HTML fragments from
the upstream zip.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-astral@1.0.1 --activate
```

Pins the package in the import map; `dune lockfile:sync` afterward.

## From a ZIP

Extract `astral-1.0.1.zip` into `themes/astral/` and set
`theme.name: astral`.

Visit `/` for the intro panel and `/blog` for project leaves with covers.
Prefer JSR when you want versioned updates without re-extracting archives.
