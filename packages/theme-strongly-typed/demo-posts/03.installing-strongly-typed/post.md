---
title: Installing Strongly Typed
date: 2026-03-01
template: post
published: true
summary: Add Strongly Typed to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, strongly-typed]
---

Strongly Typed is a typography-forward blog — centered header with tagline and
nav, an optional home banner strip, and a boxed main column. You want that
shell running against real Dune content, not a static HTML5 UP unzip sitting
next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-strongly-typed@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, images, and
webfonts ship with the package — no hand-copying files into
`themes/strongly-typed/`.

## From a ZIP

Grab `strongly-typed-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract
into `themes/strongly-typed/`, then set:

```yaml
# site.yaml
theme:
  name: strongly-typed
```

Either path installs the same package. Prefer JSR when you want theme updates
without re-downloading ZIPs by hand.
