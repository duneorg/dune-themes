---
title: Prologue chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Prologue’s sidebar and scrolly main sections map onto Dune.
taxonomy:
  tag: [chrome, prologue, fidelity]
---

Upstream Prologue keeps a fixed `#header` sidebar (avatar, title, tagline, icon
nav, bottom shortcut icons) while `#main` scrolls through `#top` cover,
`#portfolio` grid, `#about`, and `#contact`, with `#footer` copyright beneath.
On this Dune port the sidebar and footer live in `components/layout.tsx`; the
section stack lives in `templates/default.tsx`, styled by vendored
`static/html5up/` CSS.

Compare side-by-side with [html5up.net/prologue](https://html5up.net/prologue):

- Explore scrolls to `#portfolio`; portfolio tiles and contact buttons resolve
  to Blog, Search, Archives, About, and sample blog paths
- Sidebar nav mirrors site nav with icon classes; bottom icons shortcut Blog /
  Search / Archives
- Scrolly links should smooth-scroll to section IDs at mobile width (sidebar
  collapses per upstream CSS)
- Footer credit stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: multi-page upstream HTML becomes ordinary Dune routes;
search is server-side `/api/search`; the contact band has no mail backend. No
dark mode — Prologue upstream is one design; a Dune lift may land later as an
enhancement, not as fidelity.
