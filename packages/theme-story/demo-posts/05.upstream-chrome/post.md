---
title: Story chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Story's banner, spotlights, gallery, and icon footer map onto Dune — including one honest mismatch.
taxonomy:
  tag: [chrome, story, fidelity]
---

Upstream Story's home route is one long `divided` wrapper: a fullscreen
banner with a smooth-scroll "Get Started" button into `#first`, three
alternating-orientation spotlight sections (Blog, Search demo, Archives), a
six-image lightbox gallery, a closing CTA row, and `StoryFooter` at the
bottom. Inner pages drop the spotlights and gallery but keep the same banner
shape and footer, rendered by a shared `<StoryFooter>` component so the icon
row and copyright never drift between routes.

One honest mismatch worth flagging: `StoryFooter`'s three icon links use
upstream's original brand classes (`fa-twitter`, `fa-facebook-f`,
`fa-instagram`) but point at `/blog`, `/search`, and `/archives` — this port
kept the visual icon set but repurposed the destinations for a Dune site with
no social presence to link out to. It's not a bug; it's a deliberate reuse
worth knowing about before you screenshot the footer.

Compare against [html5up.net/story](https://html5up.net/story): the banner's
image-fade-in, the spotlights' onscroll-fade timing, and the lightbox
gallery's thumb/full pairing should all feel like the same template. No dark
mode — Story upstream is a single design.
