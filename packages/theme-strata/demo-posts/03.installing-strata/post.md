---
title: Installing Strata
date: 2026-03-01
template: post
published: true
summary: Add Strata to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, strata]
---

Strata is an avatar-header studio page: a round portrait, a name, a tagline, and a
thumbnail work grid underneath. You want that shell running against real Dune content, not
a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-strata@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync` picks up
the change, so the vendored `static/html5up/` CSS, thumbnail images, and webfonts ship with
the package — no hand-copying files into `themes/strata/`.

## From a ZIP

Grab `strata-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/strata/`, then set:

```yaml
# site.yaml
theme:
  name: strata
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
