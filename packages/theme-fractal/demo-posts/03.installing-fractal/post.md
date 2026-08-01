---
title: Installing Fractal
date: 2026-03-01
template: post
published: true
summary: Add Fractal to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, fractal]
---

Fractal's signature is the phone mockup hero — a header image framed inside
a device outline, sitting beside the title and subtitle on `/`. Getting the
theme onto a site means the mockup frame CSS and the vendored spotlight
images come along, not just the templates that reference them.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-fractal@1.0.1 --activate
```

Pins an exact version, vendored `static/html5up/` assets included. Follow
up with `dune lockfile:sync` so the pin is recorded everywhere the site
tracks its theme dependency — no manual copying of the mockup frame image
or the three spotlight pictures the home page uses.

## From a ZIP

Grab `fractal-1.0.1.zip` from the
[dune-themes releases](https://github.com/duneorg/dune-themes/releases)
page, extract it into `themes/fractal/`, then set:

```yaml
theme:
  name: fractal
```

## After install

Set `header_title`, `header_subtitle`, and `phone_image` before shipping —
an empty phone mockup frame or a placeholder subtitle both read as an
unfinished port. Either install path gives you the same package; JSR just
keeps the demo assets current without a manual re-download each time.
