---
title: Installing Spectral
date: 2026-03-01
template: post
published: true
summary: Add Spectral to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, spectral]
---

Spectral is the tall-banner landing — a single-page design stretched
across `#banner`, three stacked content sections, and a CTA band, all over
vendored `static/html5up/` art. Installing the theme means all of that
comes with it, ready to render on `/` without any assembly.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-spectral@1.0.1 --activate
```

Pins an exact version, vendored assets included. Run `dune lockfile:sync`
afterward so the pin propagates everywhere the site tracks its theme
dependency — no manual copying of the banner or spotlight images.

## From a ZIP

Grab `spectral-1.0.1.zip` from the
[dune-themes releases](https://github.com/duneorg/dune-themes/releases)
page, extract it into `themes/spectral/`, then set:

```yaml
theme:
  name: spectral
```

## After install

Spectral's config surface is thin by design — there's no hero copy to
seed, only `footer_text` and `show_html5up_credit` to check. Set the
former before shipping so the footer doesn't just echo the site's own
title. Either install path drops the same package; JSR keeps future
updates a version bump away instead of a fresh download.
