---
title: Block showcase
template: landing
published: true
order: 6
date: 2026-07-06
summary: Live renderings of the marketing and content blocks in this port.
nav_title: Block showcase
sections:
  - block: hero
    content:
      eyebrow: Hugo Blox for Dune
      title: Landing blocks, ported
      text: Faithful Academic CV and marketing sections — same vocabulary as upstream.
      primary_action: { text: Using Blox, url: /theme-docs/ }
      secondary_action: { text: Homepage, url: /, style: outline }
    design:
      layout: stacked
  - block: stats
    content:
      title: Impact at a glance
      items:
        - { statistic: "120+", description: Publications }
        - { statistic: "45", description: Collaborators }
        - { statistic: "12", description: Open-source projects }
    design:
      layout: cards
      numbers_gradient: true
  - block: features
    content:
      title: Why blocks
      subtitle: Compose pages
      items:
        - { name: Academic CV, description: Biography, experience, skills, awards., icon: academic-cap }
        - { name: Marketing, description: Hero, pricing, FAQ, logos, and more., icon: sparkles }
        - { name: Collections, description: Wire publications and posts by name., icon: document-duplicate }
    design:
      layout: grid
  - block: logos
    content:
      title: Built with
      items:
        - { name: Deno, icon: brands/github }
        - { name: Hugo Blox, icon: brands/github }
        - { name: Dune, icon: brands/github }
    design:
      layout: row
      logo_style: grayscale
  - block: steps
    content:
      title: How it works
      items:
        - { title: Install, text: Add the theme from JSR. }
        - { title: Configure, text: Set menu, theme mode, and CTA. }
        - { title: Compose, text: Stack blocks on a landing page. }
    design:
      layout: horizontal
  - block: focus-areas
    content:
      title: Research themes
      items:
        - name: Documentation systems
          description: Tooling for researchers who write.
          status: active
          topics: [docs, DX]
          gradient: from-primary-400 to-secondary-400
        - name: Open science
          description: Reproducible publishing pipelines.
          status: emerging
          topics: [open-source]
          gradient: from-secondary-400 to-primary-400
    design:
      layout: cards
  - block: tech-stack
    content:
      title: Tech stack
      categories:
        - name: Runtime
          items:
            - { name: Deno, icon: code-bracket, level: expert }
            - { name: TypeScript, icon: code-bracket, level: expert }
        - name: Content
          items:
            - { name: Markdown, icon: book-open, level: advanced }
            - { name: MDX, icon: book-open, level: intermediate }
    design:
      style: grid
      show_levels: true
  - block: testimonials
    content:
      title: What people say
      items:
        - name: Ada
          role: Research scientist
          text: The block vocabulary matches upstream Hugo Blox — I could migrate my CV in an afternoon.
        - name: Charles
          role: Lab manager
          text: Stats, FAQ, and contact blocks cover our lab homepage without custom HTML.
  - block: faq
    content:
      title: FAQ
      items:
        - question: Are Academic CV blocks included?
          answer: Yes — biography, experience, skills, awards, languages, and collections.
        - question: What is still deferred?
          answer: Pagefind search-hero and help-center taxonomy blocks.
      button: { text: Adapting to Dune, url: /theme-docs/adapting-to-dune/ }
  - block: contact-info
    content:
      title: Contact
      visit_title: Visit
      connect_title: Connect
      address:
        lines: [Analytical Engines Lab, London]
      office_hours: [Mon–Fri 10:00–16:00]
      email: ada@example.com
      social:
        - { icon: brands/github, url: https://github.com/HugoBlox/hugo-blox-builder, label: GitHub }
  - block: map
    content:
      title: Find us
      location:
        lat: 51.5246
        lng: -0.1339
        address: |
          Gower Street
          London WC1E 6BT
      zoom: 14
      cta:
        email: ada@example.com
        directions: { text: Get directions }
    design:
      layout: side-by-side
      height: md
      style: streets
  - block: team-showcase
    content:
      title: Team
      people:
        - name: Ada Lovelace
          role: PI
          links: [{ icon: brands/github, url: https://github.com/HugoBlox }]
        - name: Charles Babbage
          role: Collaborator
    design:
      show_role: true
      show_social: true
      max_columns: 2
  - block: cta-button-list
    content:
      buttons:
        - { text: Publications, url: /publications/, icon: book-open }
        - { text: Blog, url: /blog/, icon: document-duplicate }
        - { text: Using Blox, url: /theme-docs/, icon: sparkles }
  - block: pricing
    content:
      title: Plans
      billing_toggle:
        enabled: true
        monthly_label: Monthly
        yearly_label: Yearly
        yearly_discount: Save 20%
      tiers:
        - name: Starter
          description: Personal academic site
          price: { monthly: "0", yearly: "0", currency: "$" }
          price_suffix: /mo
          cta: { text: Get started, url: /theme-docs/installing/ }
          features: [Academic CV blocks, Search modal, Dark mode]
        - name: Lab
          description: Group homepage
          highlight: true
          badge: Popular
          price: { monthly: "29", yearly: "23", currency: "$" }
          price_suffix: /mo
          cta: { text: Contact, url: /theme-docs/ }
          features:
            - { text: Everything in Starter, included: true }
            - { text: Team showcase, included: true }
            - { text: Priority support, included: false }
  - block: comparison-table
    content:
      title: Compared
      competitors:
        - { name: This port, highlight: true, badge: You are here }
        - { name: Upstream Hugo }
      rows:
        - feature: Academic CV blocks
          values: [true, true]
        - feature: Dune collections
          values: [true, false]
        - feature: Pagefind search-hero
          values: [false, true]
  - block: cta-image-paragraph
    content:
      items:
        - title: Compose freely
          text: Stack marketing and CV blocks on any landing page.
          features: [YAML sections, Shared author maps, safeHref links]
          button: { text: Blocks docs, url: /theme-docs/blocks-and-shortcodes/ }
  - block: gallery
    content:
      title: Gallery
      items:
        - { src: https://picsum.photos/seed/blox1/640/400, alt: Sample one, caption: Sample image, aspect_ratio: 1.6 }
        - { src: https://picsum.photos/seed/blox2/640/800, alt: Sample two, caption: Tall sample, aspect_ratio: 0.8 }
        - { src: https://picsum.photos/seed/blox3/640/400, alt: Sample three, caption: Sample image, aspect_ratio: 1.6 }
    design:
      layout: masonry
      columns: 3
      lightbox: true
  - block: cta-card
    content:
      title: Ready to build?
      text: Install Hugo Blox for Dune and compose with the same block ids.
      button: { text: Installing, url: /theme-docs/installing/ }
---
