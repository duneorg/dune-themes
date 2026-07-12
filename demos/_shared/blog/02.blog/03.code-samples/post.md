---
title: Code samples
date: 2026-03-10
template: post
published: true
summary: Syntax highlighting and copy buttons on code blocks.
taxonomy:
  tag: [code, demo]
---

Some themes add a copy button to fenced code blocks, configurable via their
own `theme.yaml` options.

```css
.post-content pre {
  overflow-x: auto;
  border-radius: var(--radius);
}
```

```yaml
theme:
  name: <theme-slug>
```

```bash
dune theme:install jsr:@dune/theme-<slug>@1.0.0 --activate
```
