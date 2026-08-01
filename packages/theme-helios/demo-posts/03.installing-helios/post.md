---
title: Installing Helios
date: 2026-03-01
template: post
published: true
summary: Add Helios to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, helios]
---

Helios is a page-wrapper landing: a centered header with a tagline, a home
banner, and a five-card carousel reel above a three-column feature strip. You
want that carousel and banner rendering from real Dune content, not a static
HTML5 UP export sitting beside your posts.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-helios@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune
lockfile:sync` picks up the change — the carousel markup, the smooth-scroll
"Get Started" script, and the vendored `static/html5up/` images all come
along with the package, so there's nothing extra to wire up by hand.

## From a ZIP

Grab `helios-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/helios/`, then set:

```yaml
# site.yaml
theme:
  name: helios
```

Either path is the same package. JSR is easier to keep updated across
releases; the ZIP path suits teams vendoring theme code directly into a
monorepo instead of resolving it from the registry at build time.
