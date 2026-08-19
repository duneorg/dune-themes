---
title: Installing Landed
date: 2026-03-01
template: post
published: true
summary: Add Landed to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, landed]
---

Landed is a scroll-snap product landing — sticky header, full-viewport banner,
alternating spotlights, a feature grid, and a closing CTA band. You want that
shell running against real Dune content, not a static HTML5 UP unzip sitting
next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-landed@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, spotlight images,
and webfonts ship with the package — no hand-copying files into
`themes/landed/`.

## From a ZIP

Grab `landed-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract
into `themes/landed/`, then set:

```yaml
# site.yaml
theme:
  name: landed
```

Either path installs the same package. Prefer JSR when you want theme updates
without re-downloading ZIPs by hand.
