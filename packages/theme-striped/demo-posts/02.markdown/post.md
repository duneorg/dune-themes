---
title: Striped's typography
date: 2026-02-01
template: post
published: true
summary: How Striped sets headings, lists, blockquotes, code, and links.
taxonomy:
  tag: [typography, striped]
---

Striped is the HTML5 UP sidebar blog adapted for Dune. This post dogfoods
the markdown surfaces the vendored stylesheet paints — so you can see
headings, lists, code, and tables in the same chrome as a normal entry.

## Headings

This is an `h2` — section headings sit a size below the post title, with
enough margin above to read as a break, not a continuation.

### And this is an `h3`

One size down again, for a subsection within a section. Striped doesn’t
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

| Option | Type | Default |
| --- | --- | --- |
| `show_html5up_credit` | toggle | `true` |
| `sidebar_tagline` | text | `A Dune site` |
| `footer_text` | text | *(empty)* |

## Links

**Bold**, *italic*, and [links](https://getdune.org) all read at the same
weight as the rest of the paragraph — nothing about Striped’s typography
shouts.

---

That horizontal rule is the divider Striped’s stylesheet defines — a plain
line in the muted border colour used elsewhere in the chrome.
