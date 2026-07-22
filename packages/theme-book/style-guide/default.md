---
title: Style Guide
template: default
published: true
nav_title: Style Guide
bookToC: true
metadata:
  description: Every ported hugo-book shortcode and common markdown element, in one place.
---

Reference page for the shortcodes this port ships and the markdown surfaces
upstream's stylesheet already styles. Compare against
[hugo-book's own shortcode docs](https://github.com/alex-shpak/hugo-book/tree/master/exampleSite/content.en/docs/content/shortcodes).

## Hints

<blockquote class="book-hint info">
<p><strong>Info</strong> — use the <code>Hint</code> MDX component with <code>type="info"</code> in <code>.mdx</code> pages.</p>
</blockquote>

<blockquote class="book-hint warning">
<p><strong>Warning</strong> — <code>type="warning"</code>.</p>
</blockquote>

<blockquote class="book-hint danger">
<p><strong>Danger</strong> — <code>type="danger"</code>.</p>
</blockquote>

## Details

<details>
<summary>Click to expand</summary>
<div class="markdown-inner">

Hidden detail body. In `.mdx` content this is the `<Details title="…">`
component.

</div>
</details>

## Buttons

<a href="/getting-started/" class="book-btn">Internal button</a>
<a href="https://github.com/alex-shpak/hugo-book" class="book-btn" target="_blank" rel="noopener">Upstream repo</a>

## Steps

<div class="book-steps">

1. Install the theme from JSR
2. Set `book_section` to your docs root (or `*`)
3. Write pages — the sidebar filetree builds itself

</div>

## Columns

<div class="book-columns flex flex-wrap">

<div class="flex-even markdown-inner">

**Left column**

Column layouts use the upstream `.book-columns` markup.

</div>

<div class="flex-even markdown-inner">

**Right column**

In `.mdx`, wrap a markdown list with `<Columns>`.

</div>

</div>

## Typography

| Element | Example |
| --- | --- |
| Inline code | `book_theme` |
| Link | [Caravan](https://themes.getdune.org/caravan) |
| Emphasis | *italic* and **bold** |

```ts
// Code blocks keep upstream highlighting hooks + click-to-copy
export const bookSection = "*";
```

> A plain blockquote, distinct from the coloured hint variants above.

## Keyboard

With search enabled, press `/` or `⌘K` / `Ctrl+K` anywhere on the page to
focus the sidebar search input — same shortcuts as upstream `search.js`.
