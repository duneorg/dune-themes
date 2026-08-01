---
title: Installing Story
date: 2026-03-01
template: post
published: true
summary: Add Story to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, story]
---

Story is a long-scroll narrative: a fullscreen banner, three alternating
spotlight sections, a lightbox gallery, and an icon-link footer. You want
that full sequence rendering from real Dune routes, not a static HTML5 UP
export with dead links where Blog and Search used to be.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-story@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune
lockfile:sync` picks up the change — the smooth-scroll anchor script, the
divided `#wrapper`, and the vendored `static/html5up/` banner and gallery
images all ship with the theme package, no manual asset copying required.

## From a ZIP

Grab `story-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/story/`, then set:

```yaml
# site.yaml
theme:
  name: story
```

Same package either way. JSR is easier to keep current across releases; the
ZIP path suits teams vendoring the theme directly rather than resolving it
from the registry at build time. Either way you get the same divided-wrapper
banner-and-spotlight sequence on `/`.
