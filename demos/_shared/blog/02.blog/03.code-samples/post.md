---
title: Code samples
date: 2026-03-10
template: post
published: true
summary: Syntax highlighting and copy buttons on code blocks.
taxonomy:
  tag: [code, demo]
---

# Code samples

When `show_code_copy_buttons` is enabled in theme config, fenced blocks include
a copy button — matching upstream PaperMod behaviour.

```css
.post-content pre {
  overflow-x: auto;
  border-radius: var(--radius);
}
```

```yaml
theme:
  name: papermod
```

```bash
dune theme:install jsr:@dune/theme-papermod@1.0.0 --activate
```
