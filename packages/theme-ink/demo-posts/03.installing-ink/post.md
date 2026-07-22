---
title: Installing Ink
date: 2026-07-20
template: post
published: true
summary: The two ways to add Ink to a Dune site — JSR or a ZIP.
taxonomy:
  tag: [install, ink]
---

If you're looking at this demo and want Ink on your own site, there are
two install paths.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-ink@1.0.0 --activate
```

Pins an exact version in your site's import map — `dune lockfile:sync`
picks up the change, no manual file copying.

## From a ZIP

Grab the release ZIP from [the dune-themes GitHub
releases](https://github.com/duneorg/dune-themes/releases) and extract it
into `themes/ink/` in your site, then set:

```yaml
# site.yaml
theme:
  name: ink
```

Either path gets you the same theme — JSR is easier to keep updated, the
ZIP works if you'd rather vendor the theme's code directly into your repo.
