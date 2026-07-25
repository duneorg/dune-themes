---
title: Installing Alpha
date: 2026-03-01
template: post
published: true
summary: Add Alpha — HTML5 UP’s business landing — to a Dune site.
taxonomy:
  tag: [install, alpha]
---

Alpha is the classic “alt header + banner + container main” business
landing. On Dune it becomes a multisite demo under `/alpha/` with blog,
search, and archives as real CTA destinations — not static HTML siblings
from the upstream zip.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-alpha@1.0.1 --activate
```

That pins an exact version in the site import map. Run `dune lockfile:sync`
afterward so the lockfile matches; you should not copy theme files by hand.

## From a ZIP

Grab `alpha-1.0.1.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/alpha/`, then set:

```yaml
theme:
  name: alpha
```

Either path is the same package. Prefer JSR when you want updates without
re-downloading archives. After activate, visit `/` for the banner and
`/blog` for posts like this one.
