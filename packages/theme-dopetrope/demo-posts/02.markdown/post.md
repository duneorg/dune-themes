---
title: Dopetrope's typography
date: 2026-02-01
template: post
published: true
summary: How Dopetrope sets headings, lists, blockquotes, code, and links in article.box.post.
taxonomy:
  tag: [typography, dopetrope]
---

Dopetrope is an HTML5 UP magazine blog adapted for Dune. This leaf dogfoods the markdown
surfaces the vendored stylesheet paints inside `article.box.post` — the same wrapper the
blog grid’s “Continue Reading” buttons open.

## Headings

This is an `h2` — section headings sit a size below the post title, with enough margin
above to read as a break, not a continuation of the banner’s display type.

### And this is an `h3`

One size down again, for a subsection within a section. Dopetrope’s home `#banner` already
owns the loudest type on the site; keep post hierarchy shallow so it doesn’t compete.

## Lists

- Ordered and unordered lists share the same line height as body text
- Nested items indent without changing size
  - Like this nested item
- A list is still just paragraphs, visually — not another boxed feature card

1. Numbered lists use the same rules
2. The number doesn’t change the indent or spacing
3. Mix ordered and unordered as needed

> Blockquotes get a left border and slightly muted text — enough to read as “someone else
> said this” without looking like a banner subtitle under `#banner`.

## Code

Inline `code` uses the same monospace stack as fenced blocks:

```ts
function formatDate(ms: number, lang: string) {
  return new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(ms);
}
```

## Tables

| Key | Type | Demo value |
|---|---|---|
| `show_banner` | toggle | `true` |
| `banner_title` | text | Welcome to Dopetrope |
| `banner_subtitle` | text | Magazine columns for Dune |
| `show_html5up_credit` | toggle | `true` |
| `footer_text` | text | Dopetrope Demo |

## Links

**Bold**, *italic*, and [links](https://getdune.org) all read at the same weight as the
rest of the paragraph.

---

That horizontal rule is the divider Dopetrope’s stylesheet defines inside the post box.
