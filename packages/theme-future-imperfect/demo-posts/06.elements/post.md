---
title: Elements — inside a Future Imperfect card
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code once a card opens into a full post.
taxonomy:
  tag: [elements, typography, future-imperfect]
---

Cards on `/` are deliberately terse — a title, a byline, an excerpt, and a
button. This post is what a reader lands on after clicking "Continue
Reading," so it needs to exercise the full type scale a card's excerpt
never shows.

## Headings

## Section heading (h2)

### Subsection (h3)

Future Imperfect's post body sits inside the same `article.post` wrapper as
the card, just without the excerpt truncation. Keep hierarchy to two levels
before splitting into a new post — a third level starts to compete with the
byline's own visual weight.

## Lists and quotes

- Byline, avatar, and date live in the header's `.meta` block, not the body
- Nested lists indent without picking up a new heading level
  - Like this nested item
- The "Continue Reading" button never appears inside the body itself

1. Ordered lists share the same line-height as the rest of the article
2. Numbers don't reset the type size or margin

> Blockquotes should read like something the byline's author is citing,
> not a magazine pull-quote fighting the card grid for attention.

## Code

Inline `theme.name: future-imperfect`, and a fence:

```ts
const card = { author: "Mara Solis", showCredit: true, footer: "Future Imperfect Demo" };
```

Head back to `/` and confirm the card grid re-renders with the same author
byline and avatar you just saw in this post's header — that round-trip is
what this Elements leaf is here to check.
