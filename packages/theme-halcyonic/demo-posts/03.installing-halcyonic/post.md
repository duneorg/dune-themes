---
title: Installing Halcyonic
date: 2026-03-01
template: post
published: true
summary: Add Halcyonic to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, halcyonic]
---

Halcyonic is a calm business landing page — logo-and-nav header, two-column
banner with a large CTA, and a four-up bordered feature grid. You want that
shell running against real Dune content, not a static HTML5 UP unzip sitting
next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-halcyonic@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, banner image,
feature thumbnails, and webfonts ship with the package — no hand-copying files
into `themes/halcyonic/`.

## From a ZIP

Grab `halcyonic-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract
into `themes/halcyonic/`, then set:

```yaml
# site.yaml
theme:
  name: halcyonic
```

Either path installs the same package. Prefer JSR when you want theme updates
without re-downloading ZIPs by hand.
