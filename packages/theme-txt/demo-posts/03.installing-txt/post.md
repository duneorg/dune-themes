---
title: Installing TXT
date: 2026-03-01
template: post
published: true
summary: Add TXT to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, txt]
---

TXT is a compact, text-forward layout — a slim header, a scrolly banner, and a boxed intro
over a feature grid. You want that shell running against real Dune content, not a static
HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-txt@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync` picks up
the change, so the vendored `static/html5up/` CSS, feature images, and webfonts ship with
the package — no hand-copying files into `themes/txt/`.

## From a ZIP

Grab `txt-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/txt/`, then set:

```yaml
# site.yaml
theme:
  name: txt
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
