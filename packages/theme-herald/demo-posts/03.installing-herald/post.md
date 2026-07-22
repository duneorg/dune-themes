---
title: Installing Herald
date: 2026-07-20
template: post
published: true
summary: The two ways to add Herald to a Dune site — JSR or a ZIP.
taxonomy:
  tag: [install, herald]
cover: /themes/herald/static/demo/cover-installing.jpg
---

If you're looking at this demo and want Herald on your own site, there are
two install paths.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-herald@1.0.0 --activate
```

Pins an exact version in your site's import map — `dune lockfile:sync`
picks up the change, no manual file copying.

## From a ZIP

Grab the release ZIP from [the dune-themes GitHub
releases](https://github.com/duneorg/dune-themes/releases) and extract it
into `themes/herald/` in your site, then set:

```yaml
# site.yaml
theme:
  name: herald
```

Either path gets you the same theme — JSR is easier to keep updated, the
ZIP works if you'd rather vendor the theme's code directly into your repo.

---

*Cover photo by [Andrew Neel](https://unsplash.com/@andrewtneel?utm_source=dune_themes&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=dune_themes&utm_medium=referral).*
