---
title: Your First Site
template: default
published: true
order: 3
metadata:
  description: Add content, pick a template, and publish.
---

Content lives under `content/`, one directory per page, numbered for
ordering:

```text
content/
  01.home/default.md
  02.about/default.md
  03.blog/
    default.md
    01.first-post/post.md
```

The filename before the extension picks the template: `default.md` renders
through `templates/default.tsx`, `post.md` through `templates/post.tsx`,
and so on — a theme only needs to ship the templates its content actually
uses.

## Publishing

Set `published: true` in frontmatter (or omit it — Dune defaults content to
draft-only in `system.yaml`'s workflow settings, published everywhere else).
Run `deno task dev` for a live-reloading local server, or `dune build` for a
static export.
