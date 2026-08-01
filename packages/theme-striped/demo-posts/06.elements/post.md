---
title: Elements — type inside Striped's main column
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code in the column next to Striped's sidebar.
taxonomy:
  tag: [elements, typography, striped]
---

The sidebar (`#sidebar`) carries almost all of the branding — logo,
`sidebar_tagline`, nav, search, recent posts, and the `#copyright`
credit line. The main column next to it just needs to render markdown
well. This post exists so that column gets exercised beyond a two-line
install summary.

## Headings

## Section (h2)

Section headings sit a size below the post title, with margin above
that reads as a break rather than a continuation of the previous
paragraph.

### Subsection (h3)

One size down again. Striped doesn’t define a fourth level in its
vendored stylesheet — if a post needs one, it should probably be split
into two posts instead.

## Lists and quotes

- Unordered lists share the same line-height as body copy
- Nested items indent without shrinking the type
  - Like this nested item
- A list is still just paragraphs, visually

1. Ordered lists use the same rhythm as unordered ones
2. Numbers don’t invent a second stylesheet
3. Mixing both kinds in one post is fine — one shared style covers both

> Blockquotes get a left border and slightly muted text, reading as
> “someone else said this” rather than an alert banner.

## Code

Inline `theme.name: striped`, and a fenced block:

```ts
const sidebar = { logo: true, search: true, recentPosts: 5, titleBar: true };
```

## Checking the chrome

Scroll back up and confirm the sidebar’s recent-posts list includes
this entry, then resize to a narrow viewport and open `#titleBar` — the
drawer should reveal the same sidebar markup, credit line included.
That round-trip is the fidelity check this Elements page supports.
