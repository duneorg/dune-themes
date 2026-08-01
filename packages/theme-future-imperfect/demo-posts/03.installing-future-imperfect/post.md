---
title: Installing Future Imperfect
date: 2026-03-01
template: post
published: true
summary: Add Future Imperfect to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, future-imperfect]
---

Future Imperfect is the card-grid magazine port — the header's search
overlay and flyout `#menu` are the two moving parts you're checking for
once the theme is on disk, not just that `dune serve` boots without errors.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-future-imp@1.0.1 --activate
```

This pins an exact version in the site's import map. `dune lockfile:sync`
picks up the pin afterward — no hand-copying `templates/`, `components/`,
or the vendored `static/html5up/` assets that the card layout and its
avatar images depend on.

## From a ZIP

Grab `future-imperfect-1.0.1.zip` from the
[dune-themes releases](https://github.com/duneorg/dune-themes/releases)
page, extract it into `themes/future-imperfect/`, then point `site.yaml` at
it:

```yaml
theme:
  name: future-imperfect
```

## After install

Set `author_name` (and optionally `author_avatar`) in your theme config
before anyone hits `/` — the byline sits on every card's meta row, and a
placeholder like "Author" reads as an unfinished demo rather than a real
magazine blog. Either install path drops the same package; JSR just keeps
future updates a version bump away instead of a re-download.
