---
title: Installing Escape Velocity
date: 2026-03-01
template: post
published: true
summary: Add Escape Velocity to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, escape-velocity]
---

Escape Velocity is a sectioned marketing landing — logo header, intro band, feature list,
and a three-card highlights row. You want that shell running against real Dune content,
not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-escape-vel@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync` picks up
the change, so the vendored `static/html5up/` CSS, highlight images, and webfonts ship with
the package — no hand-copying files into `themes/escape-velocity/`.

## From a ZIP

Grab `escape-velocity-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/escape-velocity/`, then set:

```yaml
# site.yaml
theme:
  name: escape-velocity
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand. Note the JSR name is `@dune/theme-escape-vel` — shortened
for the registry — while the theme folder and `theme.name` stay `escape-velocity`.
