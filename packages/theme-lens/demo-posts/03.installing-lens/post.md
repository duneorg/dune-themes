---
title: Installing Lens
date: 2026-03-01
template: post
published: true
summary: Add Lens to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, lens]
---

Lens is the fullscreen thumbnail gallery — a twelve-tile grid on `/` backed
by vendored `static/html5up/images/thumbs/` and `fulls/` art. Getting the
theme onto a site means getting those images (and the gallery CSS that
positions them) along for the ride, not just the templates.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-lens@1.0.1 --activate
```

Pins an exact version in the site's import map, vendored assets included.
Run `dune lockfile:sync` afterward so the pin is reflected everywhere the
site records its theme dependency — no hand-copying `static/` yourself.

## From a ZIP

Grab `lens-1.0.1.zip` from the
[dune-themes releases](https://github.com/duneorg/dune-themes/releases)
page, extract it into `themes/lens/`, then set:

```yaml
theme:
  name: lens
```

## After install

Set `home_subtitle` before shipping — an empty tagline under the site title
reads as an unfinished port, since upstream Lens always shows one. Both
install paths ship the identical package; JSR just keeps the twelve-tile
demo art current without another manual re-download.
