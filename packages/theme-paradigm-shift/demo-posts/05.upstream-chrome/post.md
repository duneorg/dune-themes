---
title: Paradigm Shift chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Paradigm Shift's intro, section stack, and closing credit map onto Dune.
taxonomy:
  tag: [chrome, paradigm-shift, fidelity]
---

Upstream Paradigm Shift's home route is a full-height `section.intro`
(`banner_title`, `tagline`, an arrow-scroll cue into `#first`) followed by six
plain `<section>` blocks: a content panel that echoes the page title, an
explore panel with icon links to Blog/Search/Archives/About, a four-image
gallery, a get-started CTA, and a closing "Get in touch" section carrying the
CC BY credit and a small `items`/`icons` footer with Dune and HTML5 UP links.
Inner pages skip the whole stack for a single `header`/`content` section
wrapped by a `dune-nav` button row, since upstream's original nav doesn't
survive the section-scroll layout once you're off `/`.

Compare against
[html5up.net/paradigm-shift](https://html5up.net/paradigm-shift):

- The arrow-scroll cue from `.intro` to `#first` should land exactly on the
  next section, not overshoot
- The `dune-nav` button row on inner pages is a Dune addition — upstream has
  no equivalent since its nav lives inside the single-page scroll
- The CC BY credit appears twice (get-in-touch section and footer copyright)
  — both should hide together when `show_html5up_credit` is off

Honest deviations: multi-page HTML becomes Dune fixtures; search is
server-side `/api/search`; no dark mode — one upstream design.
