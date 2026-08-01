---
title: Elements — Helios typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Helios's content wrapper.
taxonomy:
  tag: [elements, typography, helios]
---

The carousel and banner are Helios's loudest first impression. This post
lives under `/blog` so the `wrapper style1` article container gets a real
typography workout instead of another marketing paragraph.

## Headings

## Section heading (h2)

### Subsection heading (h3)

Helios wraps post headers in an `<article id="main" class="special">` — keep
nesting shallow here too. A fourth heading level reads as noise inside the
centered `special` layout.

## Lists and quotes

- The carousel reel and feature strip belong on home; posts use ordinary
  markdown lists
- Nested items indent without shrinking below body size
  - like this one
1. Ordered lists share Helios's post rhythm
2. Short lists read better inside the centered `container`

> Blockquotes here should read as a calm citation, not a banner-style
> callout — Helios already spent its visual budget on the carousel.

## Code

Inline `theme.name: helios`, and a fence:

```ts
const showBanner = isLanding && themeConfig?.show_banner !== false;
```

When you're done, hit [Home](/) and confirm the banner and carousel reel
return exactly as they left — no residual "Get Started" scroll state.
