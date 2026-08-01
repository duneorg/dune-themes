---
title: Installing Phantom
date: 2026-03-01
template: post
published: true
summary: Add Phantom to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, phantom]
---

Phantom is a minimal tile/grid blog with a slide-out `#menu` panel — the kind
of chrome that reads well once real posts are behind it. You want that shell
on a real Dune site, not a static HTML5 UP unzip sitting next to your content.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-phantom@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune
lockfile:sync` picks up the change — no hand-copying theme files, and no
separate step to wire the `#menu` toggle script; it ships with the theme.

## From a ZIP

Grab `phantom-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/phantom/`, then set:

```yaml
# site.yaml
theme:
  name: phantom
```

Either path installs the same package — templates, the tile-grid `blog.tsx`
listing, and the vendored `static/html5up/` assets that back the logo mark and
menu icons. Prefer JSR when you want version bumps without re-downloading
ZIPs; the ZIP path is useful when you're vendoring the theme directly into a
monorepo instead of pulling from the registry.
