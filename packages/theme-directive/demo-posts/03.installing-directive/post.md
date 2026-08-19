---
title: Installing Directive
date: 2026-03-01
template: post
published: true
summary: Add Directive to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, directive]
---

Directive is a paper-plane hero landing — tall `#header`, alternating left/right
feature bands, and a closing major footer. You want that shell running against real
Dune content, not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-directive@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync` picks up
the change, so the vendored `static/html5up/` CSS, feature images, and webfonts ship with
the package — no hand-copying files into `themes/directive/`.

## From a ZIP

Grab `directive-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/directive/`, then set:

```yaml
# site.yaml
theme:
  name: directive
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
