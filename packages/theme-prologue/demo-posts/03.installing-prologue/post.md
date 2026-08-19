---
title: Installing Prologue
date: 2026-03-01
template: post
published: true
summary: Add Prologue to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, prologue]
---

Prologue is a personal one-pager — avatar sidebar, cover intro, portfolio
grid, about band, and get-started actions. You want that shell running against
real Dune content, not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-prologue@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, avatar and portfolio
images, and webfonts ship with the package — no hand-copying files into
`themes/prologue/`.

## From a ZIP

Grab `prologue-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/prologue/`, then set:

```yaml
# site.yaml
theme:
  name: prologue
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
