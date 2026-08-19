---
title: Installing Multiverse
date: 2026-03-01
template: post
published: true
summary: Add Multiverse to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, multiverse]
---

Multiverse is a fullscreen gallery landing — a thumb grid over a footer panel
with explore icons and CTAs. You want that shell running against real Dune
content, not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-multiverse@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, thumb/full
gallery images, and webfonts ship with the package — no hand-copying files into
`themes/multiverse/`.

## From a ZIP

Grab `multiverse-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract
into `themes/multiverse/`, then set:

```yaml
# site.yaml
theme:
  name: multiverse
```

Either path installs the same package. Prefer JSR when you want theme updates
without re-downloading ZIPs by hand.
