---
title: Installing Striped
date: 2026-03-01
template: post
published: true
summary: Add Striped to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, striped]
---

Striped is a two-column sidebar blog: a sticky sidebar with logo, nav,
search, and recent posts on the left, dated entries in the main column
on the right, collapsing into a `#titleBar` drawer on narrow viewports.
You want that whole shell on a real Dune site, not a static HTML5 UP
unzip with hand-edited links.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-striped@1.0.1 --activate
```

This pins an exact version of the theme package in your site’s import
map. After install, run `dune lockfile:sync` so the lockfile picks up
the new dependency — no manually copying template or static files into
`themes/`.

## From a ZIP

Grab `striped-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/striped/`, then set:

```yaml
# site.yaml
theme:
  name: striped
```

Either path gives you the same package: the same sidebar layout, the
same `blog`, `post`, `archives`, and `search` templates, and the same
vendored coral stylesheet. Prefer JSR when you want version bumps
without re-downloading and re-extracting ZIPs by hand.
