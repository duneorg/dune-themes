---
title: Read Only's typography
date: 2026-02-01
template: post
published: true
summary: How Read Only sets headings, lists, blockquotes, code, and links.
taxonomy:
  tag: [typography, read-only]
---

Read Only is an HTML5 UP blog theme adapted for Dune. This post dogfoods
the markdown surfaces the vendored stylesheet paints.

## Headings

This is an `h2` — section headings sit a size below the post title, with
enough margin above to read as a break, not a continuation.

### And this is an `h3`

One size down again, for a subsection within a section.

## Lists

- Ordered and unordered lists share the same line height as body text
- Nested items indent without changing size
  - Like this nested item
- A list is still just paragraphs, visually

1. Numbered lists use the same rules
2. The number doesn’t change the indent or spacing
3. Mix ordered and unordered as needed

> Blockquotes get a left border and slightly muted text — enough to read
> as “someone else said this” without looking like an alert box.

## Code

Inline `code` uses the same monospace stack as fenced blocks:

```ts
function formatDate(ms: number, lang: string) {
  return new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(ms);
}
```

## Tables

| `avatar_url` | text | *(theme default)* |
| `sidebar_tagline` | text | *(site description)* |
| `show_html5up_credit` | toggle | `true` |
| `footer_text` | text | *(empty)* |

## Links

**Bold**, *italic*, and [links](https://getdune.org) all read at the same
weight as the rest of the paragraph.

---

That horizontal rule is the divider Read Only's stylesheet defines.
