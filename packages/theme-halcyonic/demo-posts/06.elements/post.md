---
title: Elements — Halcyonic typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Halcyonic’s inner-page content column.
taxonomy:
  tag: [elements, typography, halcyonic]
---

The home route is a banner plus four bordered feature cards. This post exists
so `/blog` links land on something that exercises the plain `#content`
inner-page layout instead of another feature caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Halcyonic’s banner and feature headings already carry a business-landing
weight on home — keep in-post hierarchy shallow so it doesn’t compete with
that. A fourth level usually means the post should split in two.

## Lists and quotes

- Banner image, feature thumbnails, and the large CTA belong on home; posts
  read as plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column wrapper

> A blockquote here should read like a short client note, not a banner slogan.

## Code

Inline `theme.name: halcyonic`, and a fence:

```ts
const banner = { textKey: "banner_text", imageKey: "banner_image", cta: "/blog" };
```

When you’re done, return to [Home](/) and confirm the banner image still sits
beside the copy before you scroll into the four feature cards.
