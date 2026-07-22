---
title: Herald's typography
date: 2026-02-01
template: post
published: true
summary: How Herald sets headings, lists, blockquotes, code, and links.
taxonomy:
  tag: [typography, herald]
---

Herald’s publication chrome wraps ordinary posts. This entry shows
how body typography looks inside that masthead layout.

## Headings

This is an `h2` — section headings sit a size below the post title, with
enough margin above to read as a break, not a continuation.

### And this is an `h3`

One size down again, for a subsection within a section. Herald doesn’t
go deeper than that in practice — if a post needs a fourth heading level,
it’s a sign the post should probably be two posts.

## Lists

- Ordered and unordered lists share the same line height as body text
- Nested items indent without changing size
  - Like this nested item
- A list is still just paragraphs, visually

1. Numbered lists use the same rules
2. The number doesn’t change the indent or spacing
3. Mix ordered and unordered as needed — they share one stylesheet, not two

> Blockquotes get a left border in the accent color and slightly muted
> text — enough to read as “someone else said this” without looking like
> an alert box.

## Code

Inline `code` uses the same monospace stack as fenced blocks:

```ts
function formatDate(ms: number, lang: string) {
  return new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(ms);
}
```

## Tables

| Option | Type | Default |
| --- | --- | --- |
| `color_scheme` | select | `blue` |
| `scheme_switcher` | toggle | `false` |
| `default_dark` | toggle | `false` |

## Links

**Bold**, *italic*, and [links](https://getdune.org) all read at the same
weight as the rest of the paragraph — nothing about Herald's typography
shouts.

---

That horizontal rule is the divider Herald’s stylesheet defines — a
plain line in the muted border colour used elsewhere in the chrome.
