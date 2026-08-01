---
title: Installing Paradigm Shift
date: 2026-03-01
template: post
published: true
summary: Add Paradigm Shift to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, paradigm-shift]
---

Paradigm Shift is a full-height intro followed by six stacked sections — an
explore panel, a gallery, a get-started CTA, and a closing credit section. You
want that whole stack rendering from a real Dune site, not a static HTML5 UP
export where the "Get in touch" section still points at a dead contact form.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-paradigm-shift@1.0.1 --activate
```

Pins an exact version in the site import map. After install, `dune
lockfile:sync` picks up the change — the arrow-scroll intro script, the
`dune-nav` button row on inner pages, and the vendored `static/html5up/`
gallery images all ship with the package.

## From a ZIP

Grab `paradigm-shift-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/paradigm-shift/`, then set:

```yaml
# site.yaml
theme:
  name: paradigm-shift
```

Same package either way. JSR is easier to keep current; the ZIP path suits
teams vendoring theme code directly into a monorepo instead of resolving it
from the registry. Either path gives you the full section stack, intro
through closing credit.
