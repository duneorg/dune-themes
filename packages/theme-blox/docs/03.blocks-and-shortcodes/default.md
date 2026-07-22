---
title: Blocks and shortcodes
template: blocks-docs
published: true
order: 3
date: 2026-07-03
summary: Every ported landing block and MDX shortcode, with live previews and authoring snippets.
lead: |
  This port covers the **Academic CV block set**, the common **marketing /
  landing blocks**, and the shortcodes most used in content. Unknown block
  ids fall through to a markdown block so a typo doesn't blank the page.

  Each block below shows a live preview and the YAML that produced it. A full
  composed landing also lives on the [Block showcase](/theme-docs/block-showcase/).
collections:
  pubs:
    items:
      "@page.children": /publications
    order:
      by: date
      dir: desc
---

## Shortcodes → MDX components

In `.mdx` content (not plain Markdown), use these components — markup
matches upstream shortcodes. Visual samples below use the same CSS classes.

### Callout

<div class="callout flex px-4 py-3 mb-6 rounded-md border-l-4 bg-blue-100 dark:bg-blue-900 border-blue-500" data-callout="note">
<div class="mr-3 text-blue-600 dark:text-blue-300">Note</div>
<div class="w-full dark:text-gray-200">Use for asides that should stand out from body copy.</div>
</div>

<div class="callout flex px-4 py-3 mb-6 rounded-md border-l-4 bg-emerald-100 dark:bg-emerald-900 border-emerald-500" data-callout="tip">
<div class="mr-3 text-emerald-600 dark:text-emerald-300">Tip</div>
<div class="w-full dark:text-gray-200">Also: <code>warning</code>, <code>danger</code>, <code>info</code>, <code>success</code>, and the other Obsidian-compatible types.</div>
</div>

```mdx
<Callout type="tip" title="Optional title">
Helpful hint with **markdown** inside.
</Callout>
```

### Button

```mdx
<Button url="/publications/" style="primary" size="lg" icon="arrow-right">
Browse publications
</Button>

<Button url="https://hugoblox.com" style="outline" new_tab>
Upstream docs
</Button>
```

Styles: `primary`, `outline`, `ghost`, `link`. Sizes: `sm`, `md`, `lg`.

### InlineIcon

```mdx
Built with <InlineIcon name="brands/github" /> and Deno.
```

Icon names from the pruned set (~55): `brands/github`, `brands/x`,
`academicons/cv`, heroicons like `arrow-right`, `check-circle`, etc.
Unknown names fall back to text like upstream.

### Spoiler

```mdx
<Spoiler text="Click to reveal">
Hidden solution or aside.
</Spoiler>
```

### Video / Audio

```mdx
<Video src="/media/demo.mp4" controls />
<Audio src="/media/track.mp3" />
```

## Not in this port

Deferred landing blocks: `search-hero` (Pagefind), `help-categories` /
`help-questions` (Hugo help-center taxonomies).

Shortcodes not ported: `cite`, `math`, `chart`, `notebook`, `slide`,
`embed`, `card`/`cards`, `toc`, and similar. See
[Adapting to Dune](../adapting-to-dune/) for the other platform gaps
(Pagefind, BibTeX, docs layout).
