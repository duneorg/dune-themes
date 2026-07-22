---
title: Style Guide
template: default
published: true
nav_title: Style Guide
metadata:
  description: Oasis typography and markdown surfaces in one place.
---

Reference for headings, lists, code, and tables as Oasis styles them.
Card grids and the CV landing hero are separate surfaces — this page is
the body typography.

## Headings

This is an `h2` — section headings sit below the page title with enough
margin to read as a break.

### And this is an `h3`

One size down for subsections.

## Lists

- Ordered and unordered lists share body line height
- Nested items indent without changing size
  - Like this nested item
- A list still reads as paragraphs, visually

1. Numbered lists use the same rules
2. The number doesn’t change indent or spacing
3. Mix ordered and unordered as needed

> Blockquotes get a left border and muted text — enough to read as
> “someone else said this” without looking like an alert.

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
| `color_scheme` | select | `teal` |
| `scheme_switcher` | toggle | `false` |
| `avatar_url` | text | *(empty)* |

## Links

**Bold**, *italic*, and [links](https://getdune.org) sit at the same
weight as the surrounding paragraph.

---

That horizontal rule is the divider Oasis’s stylesheet defines — a plain
line in the muted border colour used elsewhere in the chrome.
