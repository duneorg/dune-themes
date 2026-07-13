---
title: Finding things in a Sirocco blog
date: 2026-05-01
template: post
published: true
summary: Tags, archives, and search — three ways to navigate the same posts.
taxonomy:
  tag: [tags, search, archives, navigation]
---

A blog theme's job isn't just to render posts one at a time — it's to help
someone find the one they actually want. Sirocco gives a visitor three
independent ways to do that, and this post is deliberately tagged with
four different terms so you can try all three against it.

## Tags

Every tag on a post — see the row at the bottom of this one — links to
`/tag:{name}`, a real taxonomy route Dune generates automatically from
frontmatter. No manual index to maintain: tag a post, and it's
discoverable.

## Search

The header's search page queries `/api/search` directly — try searching
"organization" or "tags" from here and this post should turn up.

## Archives

The Archives page groups every post by year and month, newest first. It's
the one view that shows you everything at once instead of the home page's
one-page-at-a-time listing.

Three different entry points, same underlying content — pick whichever
fits how you're looking for something.
