---
title: Elements — Photon type and chrome
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code on Photon's `.main.style1` post template.
taxonomy:
  tag: [elements, typography, photon]
---

Photon’s `#header` hero and gallery tiles are loud on purpose — big
type, icon spans, wide buttons. Inner posts render inside a plain
`.main.style1` panel instead, which is the part this Elements page
exists to exercise.

## Headings

## Section (h2)

Section headings sit a size below the post title, with margin that
reads as a break in the article rather than a continuation of the
previous paragraph.

### Subsection (h3)

One size down again, for a subsection inside a section. Photon’s post
chrome doesn’t define a fourth level — a post needing one should
probably be two gallery entries instead.

## Lists

- Icon sections on home use Font Awesome-style spans (`fa-code`,
  `fa-bolt`, `fa-diamond`) styled by the vendored `static/html5up/`
  stylesheet
- Posts, by contrast, use ordinary markdown lists with no icon styling
  - Nested items stay quiet and don’t pick up the icon treatment
- A list is still just paragraphs with a bullet, visually

> Quotes inside `.main.style1` should look cited — a left border and
> muted tone — not like one of the home page’s call-to-action stickers.

## Code

Inline `theme.name: photon`, and a fenced block:

```js
const tile = { title: "Project", cover: "/themes/photon/static/html5up/images/pic01.jpg" };
console.log("photon elements");
```

Links back to [projects](/blog) and [home](/) confirm routes stay
`basePath`-safe when the site is mounted under a subpath, and that
returning to `/` restores the full-viewport `#header` hero rather than
leaving the `.main.style1` panel chrome behind.
