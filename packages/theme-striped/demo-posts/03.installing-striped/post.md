---
title: Installing Striped
date: 2026-03-01
template: post
published: true
summary: Add Striped to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, striped]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-striped@1.0.0 --activate
```

## From a ZIP

Grab `striped-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/striped/`, then set:

```yaml
# site.yaml
theme:
  name: striped
```

Either path gives you the same package. JSR is easier to keep updated.
