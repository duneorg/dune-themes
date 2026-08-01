---
title: Configuring Future Imperfect
date: 2026-03-08
template: post
published: true
summary: Author byline, avatar, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, future-imperfect]
---

Future Imperfect's config surface exists to brand the magazine chrome, not
to invent settings upstream never had. Here's what this demo actually sets,
and why.

## `author_name`

This demo sets **“Mara Solis”** via `demo-config.json`. It shows up next to
the avatar in every card's meta row on `/`, right under the post title —
the same slot upstream Future Imperfect reserves for a byline. Leaving it
at the schema default of "Author" would make every card look
machine-generated instead of like a real magazine feed.

## `author_avatar`

Left at the theme default (an empty string), which falls back to the
vendored `static/html5up/images/avatar.jpg` placeholder headshot. A real
site would point this at a hosted image; the demo keeps the stock art so
the meta row still renders a face instead of a broken `<img>`.

## `show_html5up_credit`

On. This gates the visible **HTML5 UP** design credit inside `#menu`'s
footer, required under CC BY whenever the toggle is on. Turn it off only
with a separate Pixelarity license — it should hide every credit surface
at once, not orphan one in the flyout while leaving another live.

## `footer_text`

Set to **“Future Imperfect Demo”** so the copyright line under the credit
reads as a demo, not a real publication borrowing the site's own title.

No dark mode or color-scheme preset here — upstream Future Imperfect is one
design, and a Dune lift stays a future enhancement, not part of fidelity.
