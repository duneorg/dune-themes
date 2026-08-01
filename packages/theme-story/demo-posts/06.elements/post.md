---
title: Elements — Story typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Story's banner-and-wrapper post shell.
taxonomy:
  tag: [elements, typography, story]
---

Every Story post gets its own mini-banner (`h1` title, optional date) above a
plain `wrapper style1 align-center` body. This page exists so that body gets
tested with something other than a single narrative paragraph.

## Headings

## Section heading (h2)

### Subsection heading (h3)

Story's spotlight sections already use large, image-paired headings on home —
post bodies should stay calmer. Keep hierarchy to two levels; a third means
the article probably wants to be two posts.

## Lists and quotes

- Spotlight sections, the lightbox gallery, and the icon footer belong on
  home; posts use ordinary markdown
- Nested lists indent without picking up a spotlight-style image
  - like this nested item
1. Ordered lists share the wrapper's line-height
2. Keep numbered steps short inside the centered column

> A blockquote here should read as quiet citation against the plain wrapper
> background — Story already spent its drama on the banner and spotlights.

## Code

Inline `class="divided"`, and a fence:

```ts
const isHome = normalizedPath === "/" || normalizedPath === "/home";
```

When you're done, return to [Home](/) and confirm the fullscreen banner and
spotlight sequence still render in order, with the same icon footer at the
bottom.
