---
title: Installing Stellar
date: 2026-03-01
template: post
published: true
summary: Add Stellar to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, stellar]
---

Stellar is a multipurpose landing — alt logo header, spotlight intro, icon
features, statistics band, and dual CTA. You want that shell running against
real Dune content, not a static HTML5 UP unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-stellar@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, spotlight images,
logo SVG, and webfonts ship with the package — no hand-copying files into
`themes/stellar/`.

## From a ZIP

Grab `stellar-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/stellar/`, then set:

```yaml
# site.yaml
theme:
  name: stellar
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
