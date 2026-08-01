---
title: Installing Parallelism
date: 2026-03-01
template: post
published: true
summary: Add Parallelism to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, parallelism]
---

Parallelism is a horizontal masonry gallery — an intro tile followed by eight
staggered thumbs that scroll sideways with the mouse wheel, arrow keys, or
edge zones. You want that scroll behavior wired up on a real Dune site, not a
static HTML5 UP export where the thumbs link to files that no longer exist.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-parallelism@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune
lockfile:sync` picks up the change — the wheel/keyboard scroll script, the
mobile `overflow-x` fallback, and the vendored `static/html5up/` thumbnail
images all ship with the theme package.

## From a ZIP

Grab `parallelism-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/parallelism/`, then set:

```yaml
# site.yaml
theme:
  name: parallelism
```

Same package either way. JSR is easier to keep updated across releases; the
ZIP path suits teams vendoring theme code directly into a monorepo instead of
resolving it from the registry at build time.
