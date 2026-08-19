---
title: Installing Read Only
date: 2026-03-01
template: post
published: true
summary: Add Read Only to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, read-only]
---

Read Only is a resume-style sidebar blog — avatar, tagline, and nav in a
persistent column beside the reading surface, with a mobile titleBar toggle.
You want that shell running against real Dune content, not a static HTML5 UP
unzip sitting next to it.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-read-only@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune lockfile:sync`
picks up the change, so the vendored `static/html5up/` CSS, avatar image, and
webfonts ship with the package — no hand-copying files into
`themes/read-only/`.

## From a ZIP

Grab `read-only-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases), extract
into `themes/read-only/`, then set:

```yaml
# site.yaml
theme:
  name: read-only
```

Either path installs the same package. Prefer JSR when you want theme updates
without re-downloading ZIPs by hand.
