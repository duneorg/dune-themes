---
title: Style Guide
template: default
published: true
nav_title: Style Guide
metadata:
  description: Lucid typography and markdown surfaces in one place.
---

Reference for headings, lists, code, and tables as Lucid styles them.
The right-hand TOC (when present) picks up the headings below.

## Headings

This is an `h2` — section headings sit below the page title with enough
margin to read as a break.

### And this is an `h3`

One size down for subsections. Deeper levels are available but Lucid’s
docs rhythm usually stops here.

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
| `color_scheme` | select | `blue` |
| `scheme_switcher` | toggle | `false` |
| `default_dark` | toggle | `false` |

## Links

**Bold**, *italic*, and [links](https://getdune.org) sit at the same
weight as the surrounding paragraph.

---

That horizontal rule is the divider Lucid’s stylesheet defines — a plain
line in the muted border colour used elsewhere in the chrome.
