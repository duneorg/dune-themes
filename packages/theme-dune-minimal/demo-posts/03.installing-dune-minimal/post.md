---
title: Installing Dune Minimal
date: 2026-08-01
template: post
published: true
summary: The two ways to add Dune Minimal to a site — JSR or a ZIP.
taxonomy:
  tag: [install, dune-minimal]
---

If you're looking at this demo and want the real thing on your own site,
there are two install paths.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-dune-minimal@1.0.1 --activate
```

Pins an exact version in your site's import map — `dune lockfile:sync`
picks up the change, no manual file copying. `dune theme:install` also
walks a theme's `parent:` chain automatically now, so any theme that
declares `parent: dune-minimal` pulls this in as a dependency without a
separate install step.

## From a ZIP

Grab the release ZIP from [the dune-themes GitHub
releases](https://github.com/duneorg/dune-themes/releases) and extract it
into `themes/dune-minimal/` in your site.

Either path gets you the same theme — JSR is easier to keep updated, the
ZIP works if you'd rather vendor the theme's code directly into your repo.
