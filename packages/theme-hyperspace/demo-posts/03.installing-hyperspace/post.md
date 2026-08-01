---
title: Installing Hyperspace
date: 2026-03-01
template: post
published: true
summary: Add Hyperspace to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, hyperspace]
---

Hyperspace pairs a fixed left `#sidebar` nav with a full-screen `#intro`
section on `/` — two pieces of chrome that have to render together from
the first request, not assemble themselves after the page loads.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-hyperspace@1.0.1 --activate
```

Pins an exact version in the site's import map, vendored `static/html5up/`
assets included. Run `dune lockfile:sync` afterward so the pin is recorded
everywhere the site tracks its theme dependency.

## From a ZIP

Grab `hyperspace-1.0.1.zip` from the
[dune-themes releases](https://github.com/duneorg/dune-themes/releases)
page, extract it into `themes/hyperspace/`, then set:

```yaml
theme:
  name: hyperspace
```

## After install

Set `intro_title` and `intro_subtitle` before shipping — an empty intro
headline on a full-screen section reads as broken, not minimal, since
upstream Hyperspace always shows both. If a real site doesn't want the
intro section at all, `show_intro: false` skips straight to `#content`.
Either install path ships the identical package; JSR just keeps future
updates a version bump away.
