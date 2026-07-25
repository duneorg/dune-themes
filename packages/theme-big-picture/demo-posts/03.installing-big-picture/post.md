---
title: Installing Big Picture
date: 2026-03-01
template: post
published: true
summary: Add Big Picture’s scroll-driven gallery landing to a Dune site.
taxonomy:
  tag: [install, big-picture]
---

Big Picture is a scroll story: fullscreen intro, alternating left/right
sections, a gallery block, then explore CTAs. On Dune that story wraps real
routes — blog, search, archives — instead of dead HTML anchors.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-big-picture@1.0.1 --activate
```

## From a ZIP

Extract `big-picture-1.0.1.zip` into `themes/big-picture/` and set:

```yaml
theme:
  name: big-picture
```

Open `/` and scroll the `#intro` → `#one` → `#two` → `#work` chain before
you judge the port. Inner posts like this one use the content box, not the
fullscreen sections. Prefer JSR for versioned updates.
