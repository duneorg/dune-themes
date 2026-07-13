---
title: Sirocco's typography
date: 2026-02-01
template: post
published: true
summary: How Sirocco sets headings, lists, blockquotes, code, and links.
taxonomy:
  tag: [typography, sirocco]
---

Sirocco keeps its type scale small on purpose — five sizes across the whole
theme, reused everywhere from the nav to a post's largest heading. Fewer
sizes means less to get wrong, and it's easier to keep every page feeling
like the same theme.

## Headings and lists

Section headings sit a size below the post title, with enough margin above
to read as a break, not a continuation:

- Ordered and unordered lists share the same line height as body text
- Nested items indent without changing size
- A list is still just paragraphs, visually

> Blockquotes get a left border in the accent color and slightly muted
> text — enough to read as "someone else said this" without looking like
> an alert box.

## Code

Inline `code` uses the same monospace stack as fenced blocks:

```ts
function formatDate(ms: number, lang: string) {
  return new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(ms);
}
```

## Links

**Bold**, *italic*, and [links](https://getdune.org) all read at the same
weight as the rest of the paragraph — nothing about Sirocco's typography
shouts.
