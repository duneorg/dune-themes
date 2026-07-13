---
title: Installing Sirocco
date: 2026-03-01
template: post
published: true
summary: The two ways to add Sirocco to a Dune site — JSR or a ZIP.
taxonomy:
  tag: [install, sirocco]
---

If you're looking at this demo and want the real thing on your own site,
there are two install paths.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-sirocco@1.0.0 --activate
```

Pins an exact version in your site's import map — `dune lockfile:sync`
picks up the change, no manual file copying.

## From a ZIP

Grab the release ZIP from [the dune-themes GitHub
releases](https://github.com/duneorg/dune-themes/releases) and extract it
into `themes/sirocco/` in your site, then set:

```yaml
# site.yaml
theme:
  name: sirocco
```

Either path gets you the same theme — JSR is easier to keep updated, the
ZIP works if you'd rather vendor the theme's code directly into your repo.
