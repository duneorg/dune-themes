---
title: Elements — past the phone mockup
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code once you're inside a Fractal post.
taxonomy:
  tag: [elements, typography, fractal]
---

The mockup hero is all device chrome and buttons; this post exists so the
project write-ups it links to have somewhere to exercise ordinary
typography instead of fighting the phone-frame CSS.

## Headings

## Section heading (h2)

### Subsection (h3)

Fractal's landing chrome (phone mockup, spotlight panels) is louder than
any post body needs to be. Stay to two heading levels inside a post — a
third starts competing with the spotlight headings for visual weight.

## Lists and quotes

- Spotlight panels and the icon row belong on `/`; posts use plain markdown
- Nested lists indent without inventing a fourth heading level
  - Like this nested item
- The device-mockup frame never wraps a code block or image inside a post

1. Ordered lists share the same rhythm as the rest of the body
2. Numbers don't reset margin or type size

> Blockquotes should read as a project note, not a spotlight blurb
> competing with the hero for attention.

## Code

Inline `theme.name: fractal`, and a fence:

```ts
const hero = { title: "Fractal", subtitle: "A phone-first portfolio for Dune demos" };
```

Return to [Home](/) and confirm the phone mockup and its three spotlight
panels render exactly as before — that round-trip is what this Elements
leaf checks.
