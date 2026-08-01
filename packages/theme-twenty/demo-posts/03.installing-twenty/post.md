---
title: Installing Twenty
date: 2026-03-01
template: post
published: true
summary: Add Twenty to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, twenty]
---

Twenty is a full multipurpose landing page — a banner, icon features, image sections, and a
closing CTA. You want that shell running against real Dune content, not a static HTML5 UP
unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-twenty@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync` picks up
the change, so the vendored `static/html5up/` CSS, section images, and webfonts ship with
the package — no hand-copying files into `themes/twenty/`.

## From a ZIP

Grab `twenty-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract into
`themes/twenty/`, then set:

```yaml
# site.yaml
theme:
  name: twenty
```

Either path installs the same package. Prefer JSR when you want theme updates without
re-downloading ZIPs by hand.
