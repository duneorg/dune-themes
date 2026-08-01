---
title: Elements — Paradigm Shift typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Paradigm Shift's plain content section.
taxonomy:
  tag: [elements, typography, paradigm-shift]
---

Home is a stack of full-bleed sections with icons and galleries. Inner posts
render as a single plain `content` block, so this page exists to prove that
block still typesets cleanly without any section chrome around it.

## Headings

## Section heading (h2)

### Subsection heading (h3)

Paradigm Shift's home sections already use large section-level `<h2>`s — post
bodies should read one size calmer. Keep to two levels of hierarchy; a third
usually means the post should split into two.

## Lists and quotes

- Feature icons, the gallery, and the arrow-scroll cue belong to home; posts
  use ordinary markdown lists
- Nested items indent without picking up a `feature-icons` icon
  - like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Short numbered steps read best inside the plain content column

> A blockquote here should read as citation, not as an intro-section
> headline — Paradigm Shift already spent its visual drama on the stack.

## Code

Inline `class="dune-nav"`, and a fence:

```ts
const isLanding = landing ?? isHome;
```

When you're done, return to [Home](/) and confirm the intro, section stack,
and closing credit still render top to bottom without a stuck scroll anchor.
