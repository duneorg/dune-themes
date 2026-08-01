---
title: Lens chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How the fullscreen thumbnail grid and viewer chrome map onto Dune.
taxonomy:
  tag: [chrome, lens, fidelity]
---

Upstream Lens is a fullscreen photography viewer: a sparse header (site
title, tagline, icon-style nav) sits above a responsive `#thumbnails` grid
where every tile is a `.thumbnail` link into a larger image, plus a
lightbox-style overlay for stepping through the set without leaving the
page.

On this Dune port, the home route renders the same grid shape but points
each of its twelve tiles at a real Dune destination instead of a full-size
image: Blog, Search, Archives, About, and named project routes like
`/blog/project-alpha` sit alongside a few tiles that loop back to `/blog`
for variety. That's the honest fidelity trade — Lens upstream is a photo
viewer, and Dune content is text-first, so the grid becomes a visual site
index rather than a lightbox gallery. Inner pages (a project post, About,
a blog listing) drop into the `.content-panel` wrapper, which keeps
typography readable against the same dark-adjacent chrome.

Compare with [html5up.net/lens](https://html5up.net/lens) for the tile
spacing, hover states, and how the icon nav row collapses on mobile
widths. Deviations worth naming: search is Dune's server-side `/api/search`
rather than a client index; `/archives` and `/about` are generated Dune
routes standing in for static HTML5 UP pages; and the CC BY credit lives in
`#footer`'s copyright list, gated by `show_html5up_credit` like every other
port in this catalog. No dark mode — Lens upstream is one design.
