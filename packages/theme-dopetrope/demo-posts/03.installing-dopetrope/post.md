---
title: Installing Dopetrope
date: 2026-03-01
template: post
published: true
summary: Add Dopetrope to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, dopetrope]
---

Dopetrope is a magazine blog shell — `#header` with `#nav`, an optional home `#banner`,
and a two-column grid of boxed posts. You want that chrome running against a real Dune
collection, not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-dopetrope@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync` picks up
the change, so the vendored `static/html5up/` CSS, magazine images, and webfonts ship with
the package — no hand-copying files into `themes/dopetrope/`.

## From a ZIP

Grab `dopetrope-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/dopetrope/`, then set:

```yaml
# site.yaml
theme:
  name: dopetrope
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
