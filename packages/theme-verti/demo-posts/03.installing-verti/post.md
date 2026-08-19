---
title: Installing Verti
date: 2026-03-01
template: post
published: true
summary: Add Verti to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, verti]
---

Verti is a business landing — boxed banner, three feature cards, sidebar
thumbnails, and a widget footer. You want that shell running against real Dune
content, not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-verti@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, feature images, and
webfonts ship with the package — no hand-copying files into `themes/verti/`.

## From a ZIP

Grab `verti-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/verti/`, then set:

```yaml
# site.yaml
theme:
  name: verti
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
