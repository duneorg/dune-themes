---
title: Installing Solid State
date: 2026-03-01
template: post
published: true
summary: Add Solid State to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, solid-state]
---

Solid State is a spotlight-driven business landing page — a gem-icon banner, alternating
image/copy sections, and a closing feature grid. You want that shell running against real
Dune content, not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-solid-state@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync` picks up
the change, so the vendored `static/html5up/` CSS, spotlight images, and webfonts ship with
the package — no hand-copying files into `themes/solid-state/`.

## From a ZIP

Grab `solid-state-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/solid-state/`, then set:

```yaml
# site.yaml
theme:
  name: solid-state
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
