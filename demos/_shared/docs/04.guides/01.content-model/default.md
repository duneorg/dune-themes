---
title: Content Model
template: default
published: true
order: 1
metadata:
  description: Pages, collections, and taxonomy.
---

Dune's content model has three moving parts:

1. **Pages** — one file per page, addressed by its directory path
2. **Collections** — declarative queries (`@self.children`, `@page.children`,
   `@taxonomy.*`) resolved at request time, not a separate content type
3. **Taxonomy** — free-form tag/category values in frontmatter, queryable
   via collections

A collection block looks like this:

```yaml
collection:
  items:
    "@self.children": true
  order:
    by: date
    dir: desc
  filter:
    taxonomy:
      tag: [tutorial]
```

Themes read the resolved result from `props.collection` (single) or
`props.collections` (a named map, for pages that need several independent
lists — a landing page showing both "Recent posts" and "Recent talks",
for example).

Taxonomy values are indexed automatically, but HTML term pages are
authored content: a page with `termPageFor: <term>` (and usually a
`@taxonomy.tag` collection) becomes the listing for that term. Demo sites
generate these under `/tags/{name}/` during `demo:link`.
