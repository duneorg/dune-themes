---
title: Installing Miniport
date: 2026-03-01
template: post
published: true
summary: Add Miniport to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, miniport]
---

Miniport is a portrait-led scrolly folio — a hero image, a headline, and article tiles that
carry the eye down the page. You want that shell running on a real Dune site, not a static
HTML5 UP unzip sitting next to your content.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-miniport@1.0.1 --activate
```

This pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, webfonts, and demo images ship
with the package — no hand-copying assets into `themes/miniport/`.

## From a ZIP

Grab `miniport-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/miniport/`, then set:

```yaml
# site.yaml
theme:
  name: miniport
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
