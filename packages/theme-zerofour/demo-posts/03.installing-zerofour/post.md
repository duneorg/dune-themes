---
title: Installing Zerofour
date: 2026-03-01
template: post
published: true
summary: Add ZeroFour to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, zerofour]
---

ZeroFour is a minimal page shell — header logo, nav, and a strong banner
tagline with an Explore CTA. You want that shell running against real Dune
content, not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-zerofour@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, banner assets, and
webfonts ship with the package — no hand-copying files into `themes/zerofour/`.

## From a ZIP

Grab `zerofour-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/zerofour/`, then set:

```yaml
# site.yaml
theme:
  name: zerofour
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
