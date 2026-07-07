---
title: Templates
template: default
published: true
order: 3
metadata:
  description: What each of Caravan's four templates does and the frontmatter it reads.
---

Caravan ships four templates. A page's filename picks which one renders it
(`default.md` → `default`, `post.md` → `post`, and so on); `template:` in
frontmatter overrides that when needed.

## `default` — a docs page

Renders `page.frontmatter.title` as an `<h1>`, then the page's markdown
body. Reads `metadata.description` (falls back to `site.description`) for
the `<meta name="description">` tag.

## `section` — an index page with a child listing

Same as `default`, plus a linked list of child pages driven by a
`collection` block in frontmatter:

```yaml
collection:
  items:
    "@self.children": true
  order:
    by: order
    dir: asc
```

Every section on this demo site (Getting Started, Guides, Reference, and
this "Using Caravan" section itself) uses exactly this pattern. Each listed
child shows its title plus `metadata.description` if set.

## `search` — the dedicated `/search` results page

The sidebar already has a live search box (fetches `/api/search` as you
type); this template covers visiting `/search?q=...` directly — a
bookmarked search, a shared link, or a browser with JavaScript disabled.

## `error` — 404 and 500 responses

Rendered inside the normal docs layout (sidebar, search, nav) rather than a
bare page, so a visitor who hits a broken link can navigate straight back
into the docs instead of landing on a dead end.
