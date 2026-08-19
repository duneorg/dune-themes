---
title: Installing Eventually
date: 2026-03-01
template: post
published: true
summary: Add Eventually to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, eventually]
---

Eventually is a coming-soon landing — sparse header, email signup form, footer icons, and
rotating full-bleed backgrounds. You want that shell running against real Dune content for
the thin post set behind it, not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-eventually@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync` picks up
the change, so the vendored `static/html5up/` CSS, `bg01`–`bg03` images, and webfonts ship
with the package — no hand-copying files into `themes/eventually/`.

## From a ZIP

Grab `eventually-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/eventually/`, then set:

```yaml
# site.yaml
theme:
  name: eventually
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
