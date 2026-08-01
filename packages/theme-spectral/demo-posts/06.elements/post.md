---
title: Elements — past Spectral's banner
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code once you leave the landing sections.
taxonomy:
  tag: [elements, typography, spectral]
---

Spectral's home is five stacked sections of banner, spotlights, and CTAs —
none of them ordinary prose. This post exists so `/blog` links land on
something that exercises plain article typography instead of another
button-and-icon panel.

## Headings

## Section heading (h2)

### Subsection (h3)

Spectral's landing chrome (banner, spotlights, feature grid) is louder
than any post body needs to be. Keep hierarchy to two levels here — a
third starts competing with the feature grid's own headings.

## Lists and quotes

- Spotlight panels and the CTA band belong on `/`; posts use ordinary markdown
- Nested lists indent without inventing a fourth heading level
  - Like this nested item
- The scroll-to-anchor arrow from `#banner` never appears inside a post

1. Ordered lists share the same rhythm as the rest of the body
2. Numbers don't reset margin or type size

> Blockquotes should read as citation, not as another spotlight panel
> competing for the reader's attention.

## Code

Inline `theme.name: spectral`, and a fence:

```ts
const sections = ["banner", "one", "two", "three", "cta"];
```

Return to [Home](/) and confirm the banner, three spotlights, and CTA band
all render in order — that round-trip is what this Elements leaf checks.
