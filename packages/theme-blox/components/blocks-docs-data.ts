/**
 * Live demos + metadata for the Blocks and shortcodes docs page
 * (`template: blocks-docs`). Single source for preview + YAML snippet.
 */
import type { BlockDef } from "./blocks.tsx";

export interface BlockDocExample {
  /** Fragment id (without #). */
  anchor: string;
  /** Block id shown as the heading code. */
  title: string;
  alias?: string;
  blurb: string;
  demo: BlockDef;
}

export interface BlockDocGroup {
  title: string;
  intro?: string;
  examples: BlockDocExample[];
}

export const BLOCK_DOC_GROUPS: BlockDocGroup[] = [
  {
    title: "Landing blocks",
    intro:
      "Declare blocks in a page's `sections:` list (`template: landing`). Author profiles live inline under `content.author` (same shape as upstream `data/authors/me.yaml`).",
    examples: [
      {
        anchor: "resume-biography-3",
        title: "resume-biography-3",
        alias: "biography",
        blurb:
          "Hero profile — name/pronouns/role, affiliations, social icons, bio, CTA, education cards, interest pills.",
        demo: {
          block: "resume-biography-3",
          content: {
            author: {
              name: { display: "Ada Lovelace", pronouns: "she/her" },
              role: "Research scientist",
              bio: "Short bio with **markdown**.",
              links: [
                {
                  icon: "brands/github",
                  url: "https://github.com/HugoBlox/hugo-blox-builder",
                  label: "GitHub",
                },
              ],
              interests: ["Machine learning", "Docs"],
              education: [
                {
                  area: "Mathematics",
                  institution: "University of London",
                  date_start: "1830-01-01",
                },
              ],
            },
            button: { text: "Browse publications", url: "/publications/" },
          },
          design: { background: { gradient_mesh: { enable: true } } },
        },
      },
      {
        anchor: "markdown",
        title: "markdown",
        blurb: "Titled prose section. Inline markdown in `title` / `text`.",
        demo: {
          block: "markdown",
          content: {
            title: "Research",
            text: "Speak to your mission here. **Bold** and [links](/) work.",
          },
        },
      },
      {
        anchor: "collection",
        title: "collection",
        alias: "content-collection",
        blurb:
          "Renders a named entry from the page's `collections:` map. Views: `card`, `article-grid`, `citation`, `date-title-summary`. This page declares `pubs` → `/publications`.",
        demo: {
          block: "collection",
          content: {
            title: "Publications",
            collection: "pubs",
            count: 3,
            archive: { enable: true, link: "/publications/", text: "See all" },
          },
          design: { view: "citation" },
        },
      },
      {
        anchor: "resume-experience",
        title: "resume-experience",
        alias: "experience",
        blurb:
          "Work + education timelines. Work items use `role` / `org` (or `position` / `company_name`).",
        demo: {
          block: "resume-experience",
          content: {
            author: {
              experience: [
                {
                  role: "Research Scientist",
                  org: "Analytical Engines Lab",
                  date_start: "2020-01-01",
                  summary: "Leading documentation tooling.",
                },
              ],
              education: [
                {
                  area: "Computer Science",
                  institution: "University of London",
                  date_start: "2012-01-01",
                  date_end: "2016-01-01",
                },
              ],
            },
          },
        },
      },
      {
        anchor: "resume-skills",
        title: "resume-skills",
        alias: "skills",
        blurb: "Grouped skill bars. Items use `level` 0–5. Optional `design.columns`.",
        demo: {
          block: "resume-skills",
          content: {
            title: "Skills",
            author: {
              skills: [
                {
                  name: "Technical",
                  items: [
                    { name: "TypeScript", level: 5 },
                    { name: "Deno", level: 4 },
                  ],
                },
                {
                  name: "Writing",
                  items: [{ name: "Technical writing", level: 4 }],
                },
              ],
            },
          },
        },
      },
      {
        anchor: "resume-awards",
        title: "resume-awards",
        alias: "awards",
        blurb: "Award cards from `author.awards` — optional `url` and `certificate_url`.",
        demo: {
          block: "resume-awards",
          content: {
            title: "Awards",
            author: {
              awards: [
                {
                  title: "Best Paper",
                  awarder: "Hugo Blox Conference",
                  date: "2024-01-01",
                  summary: "Top 5 of 8000 submissions.",
                  url: "https://example.com/award",
                },
              ],
            },
          },
        },
      },
      {
        anchor: "resume-languages",
        title: "resume-languages",
        alias: "languages",
        blurb: "Progress rings. Use `percent` (0–100) or numeric `level` (0–5 → ×20).",
        demo: {
          block: "resume-languages",
          content: {
            title: "Languages",
            author: {
              languages: [
                { name: "English", percent: 100 },
                { name: "French", level: "3.5", label: "Conversational" },
              ],
            },
          },
        },
      },
      {
        anchor: "cta-card",
        title: "cta-card",
        blurb: "Full-width call-to-action with title, text, and button.",
        demo: {
          block: "cta-card",
          content: {
            title: "Build your own academic site",
            text: "Install from JSR and compose landing pages from blocks.",
            button: { text: "Using Blox", url: "/theme-docs/" },
          },
        },
      },
    ],
  },
  {
    title: "Marketing & content blocks",
    intro:
      "Same `sections:` authoring as above. A composed landing lives on the [Block showcase](/theme-docs/block-showcase/).",
    examples: [
      {
        anchor: "hero",
        title: "hero",
        blurb: "Headline + dual CTAs. Layouts: `stacked`, `split-left`, `split-right`.",
        demo: {
          block: "hero",
          content: {
            eyebrow: "Hugo Blox for Dune",
            title: "Landing blocks, ported",
            text: "Faithful Academic CV and marketing sections.",
            primary_action: { text: "Using Blox", url: "/theme-docs/" },
            secondary_action: { text: "Homepage", url: "/", style: "outline" },
          },
          design: { layout: "stacked" },
        },
      },
      {
        anchor: "dev-hero",
        title: "dev-hero",
        blurb: "Developer greeting with optional typewriter strings (`blox.js`).",
        demo: {
          block: "dev-hero",
          content: {
            greeting: "Hi, I'm",
            name: "Ada Lovelace",
            role: "Research scientist",
            bio: "I build documentation systems.",
            links: [
              {
                icon: "brands/github",
                url: "https://github.com/HugoBlox/hugo-blox-builder",
                label: "GitHub",
              },
            ],
            typewriter: {
              enable: true,
              prefix: "I work on ",
              strings: ["docs", "DX", "open science"],
            },
            cta_buttons: [{ text: "Publications", url: "/publications/" }],
          },
        },
      },
      {
        anchor: "features",
        title: "features",
        blurb: "Icon grid. `design.layout`: `grid` (default) or `bento`.",
        demo: {
          block: "features",
          content: {
            title: "Why blocks",
            subtitle: "Compose pages",
            items: [
              {
                name: "Academic CV",
                description: "Biography, experience, skills.",
                icon: "academic-cap",
              },
              {
                name: "Marketing",
                description: "Hero, pricing, FAQ, logos.",
                icon: "sparkles",
              },
              {
                name: "Collections",
                description: "Wire pubs and posts by name.",
                icon: "document-duplicate",
              },
            ],
          },
          design: { layout: "grid" },
        },
      },
      {
        anchor: "stats",
        title: "stats",
        blurb: "Animated counters (`blox.js`). Layouts: `cards`, `compact`, `minimal`.",
        demo: {
          block: "stats",
          content: {
            title: "Impact at a glance",
            items: [
              { statistic: "120+", description: "Publications", icon: "book-open" },
              { statistic: "45", description: "Collaborators" },
              { statistic: "12", description: "Open-source projects" },
            ],
          },
          design: { layout: "cards", numbers_gradient: true },
        },
      },
      {
        anchor: "faq",
        title: "faq",
        blurb: "Single-open accordion. Items accept `question`/`answer` or `title`/`text`.",
        demo: {
          block: "faq",
          content: {
            title: "FAQ",
            items: [
              {
                question: "Are Academic CV blocks included?",
                answer:
                  "Yes — biography, experience, skills, awards, languages, collections.",
              },
              {
                question: "What is still deferred?",
                answer:
                  "Pagefind search-hero and help-center taxonomies.",
              },
            ],
            button: { text: "Adapting to Dune", url: "/theme-docs/adapting-to-dune/" },
          },
        },
      },
      {
        anchor: "logos",
        title: "logos",
        blurb:
          "Partners / sponsors. Layouts: `row`, `grid`, `marquee`. Style: `grayscale`, `color`, `white`.",
        demo: {
          block: "logos",
          content: {
            title: "Built with",
            items: [
              { name: "Deno", icon: "brands/github" },
              { name: "Hugo Blox", icon: "brands/github", url: "https://hugoblox.com" },
              { name: "Dune", icon: "brands/github" },
            ],
          },
          design: { layout: "row", logo_style: "grayscale", logo_size: "md" },
        },
      },
      {
        anchor: "steps",
        title: "steps",
        blurb: "Process / how-it-works. Layouts: `vertical`, `horizontal`, `timeline`.",
        demo: {
          block: "steps",
          content: {
            title: "How it works",
            items: [
              { title: "Install", text: "Add the theme from JSR.", icon: "arrow-down-tray" },
              { title: "Configure", text: "Set menu, theme mode, and CTA." },
              {
                title: "Compose",
                text: "Stack blocks on a landing page.",
                cta: { text: "Docs", url: "/theme-docs/" },
              },
            ],
          },
          design: { layout: "horizontal" },
        },
      },
      {
        anchor: "testimonials",
        title: "testimonials",
        blurb: "Quote cards. One item → featured; several → grid. `image` is an avatar URL.",
        demo: {
          block: "testimonials",
          content: {
            title: "What people say",
            items: [
              {
                name: "Ada",
                role: "Research scientist",
                text: "The block vocabulary matches upstream Hugo Blox.",
              },
              {
                name: "Charles",
                role: "Lab manager",
                text: "Stats, FAQ, and contact cover our homepage.",
              },
            ],
          },
        },
      },
      {
        anchor: "pricing",
        title: "pricing",
        blurb: "Tiers with optional monthly/yearly toggle (`blox.js`).",
        demo: {
          block: "pricing",
          content: {
            title: "Plans",
            billing_toggle: {
              enabled: true,
              monthly_label: "Monthly",
              yearly_label: "Yearly",
              yearly_discount: "Save 20%",
            },
            tiers: [
              {
                name: "Starter",
                description: "Personal academic site",
                price: { monthly: "0", yearly: "0", currency: "$" },
                price_suffix: "/mo",
                cta: { text: "Get started", url: "/theme-docs/installing/" },
                features: ["Academic CV blocks", "Search modal", "Dark mode"],
              },
              {
                name: "Lab",
                highlight: true,
                badge: "Popular",
                price: { monthly: "29", yearly: "23", currency: "$" },
                price_suffix: "/mo",
                cta: { text: "Contact", url: "/theme-docs/", style: "primary" },
                features: [
                  { text: "Everything in Starter", included: true },
                  { text: "Team showcase", included: true },
                  { text: "Priority support", included: false },
                ],
              },
            ],
          },
        },
      },
      {
        anchor: "comparison-table",
        title: "comparison-table",
        blurb: "Feature matrix across competitors (desktop table / mobile cards).",
        demo: {
          block: "comparison-table",
          content: {
            title: "Compared",
            competitors: [
              { name: "This port", highlight: true, badge: "You are here" },
              { name: "Upstream Hugo" },
            ],
            rows: [
              { feature: "Academic CV blocks", values: [true, true] },
              { feature: "Dune collections", values: [true, false] },
              { feature: "Pagefind search-hero", values: [false, true] },
            ],
          },
        },
      },
      {
        anchor: "focus-areas",
        title: "focus-areas",
        alias: "research-areas",
        blurb: "Research theme cards. Layouts: `cards`, `hexagon`, `timeline`.",
        demo: {
          block: "focus-areas",
          content: {
            title: "Research themes",
            items: [
              {
                name: "Documentation systems",
                description: "Tooling for researchers who write.",
                status: "active",
                topics: ["docs", "DX"],
                gradient: "from-primary-400 to-secondary-400",
              },
              {
                name: "Open science",
                description: "Reproducible publishing pipelines.",
                status: "emerging",
                topics: ["open-source"],
                gradient: "from-secondary-400 to-primary-400",
              },
            ],
          },
          design: { layout: "cards" },
        },
      },
      {
        anchor: "tech-stack",
        title: "tech-stack",
        blurb:
          "Categorised tools. `design.style`: `grid` | `list`. Optional level bars.",
        demo: {
          block: "tech-stack",
          content: {
            title: "Tech stack",
            categories: [
              {
                name: "Runtime",
                items: [
                  { name: "Deno", icon: "code-bracket", level: "expert" },
                  { name: "TypeScript", icon: "code-bracket", level: "expert" },
                ],
              },
              {
                name: "Content",
                items: [
                  { name: "Markdown", icon: "book-open", level: "advanced" },
                ],
              },
            ],
          },
          design: { style: "grid", show_levels: true },
        },
      },
      {
        anchor: "contact-info",
        title: "contact-info",
        blurb:
          "Address, hours, email/phone, social, optional map link. Form only when `form_action` is set.",
        demo: {
          block: "contact-info",
          content: {
            title: "Contact",
            visit_title: "Visit",
            connect_title: "Connect",
            text: "Open to collaborations.",
            address: { lines: ["Analytical Engines Lab", "London"] },
            office_hours: ["Mon–Fri 10:00–16:00"],
            email: "ada@example.com",
            social: [
              {
                icon: "brands/github",
                url: "https://github.com/HugoBlox/hugo-blox-builder",
                label: "GitHub",
              },
            ],
          },
        },
      },
      {
        anchor: "cta-button-list",
        title: "cta-button-list",
        blurb: "Link-in-bio style button stack.",
        demo: {
          block: "cta-button-list",
          content: {
            buttons: [
              { text: "Publications", url: "/publications/", icon: "book-open" },
              { text: "Blog", url: "/blog/", icon: "document-duplicate" },
              { text: "Using Blox", url: "/theme-docs/", icon: "sparkles" },
            ],
          },
        },
      },
      {
        anchor: "cta-image-paragraph",
        title: "cta-image-paragraph",
        blurb: "Alternating image + text rows (odd rows reverse).",
        demo: {
          block: "cta-image-paragraph",
          content: {
            items: [
              {
                title: "Compose freely",
                text: "Stack marketing and CV blocks on any landing page.",
                features: ["YAML sections", "Shared author maps", "safeHref links"],
                button: {
                  text: "Block showcase",
                  url: "/theme-docs/block-showcase/",
                },
              },
            ],
          },
        },
      },
      {
        anchor: "team-showcase",
        title: "team-showcase",
        blurb:
          "Inline people (not `content/authors/` pages). Use flat `people` or `groups`.",
        demo: {
          block: "team-showcase",
          content: {
            title: "Team",
            people: [
              {
                name: "Ada Lovelace",
                role: "PI",
                links: [
                  {
                    icon: "brands/github",
                    url: "https://github.com/HugoBlox",
                  },
                ],
              },
              { name: "Charles Babbage", role: "Collaborator" },
            ],
          },
          design: { show_role: true, show_social: true, max_columns: 2 },
        },
      },
      {
        anchor: "portfolio",
        title: "portfolio",
        blurb:
          "Named collection + optional tag chips (`blox.js`). Tags from each page's `taxonomy.tag`.",
        demo: {
          block: "portfolio",
          content: {
            title: "Projects",
            collection: "pubs",
            count: 3,
            filters: { tags: ["all", "software", "paper"] },
            archive: { enable: true, link: "/publications/", text: "See all" },
          },
        },
      },
      {
        anchor: "map",
        title: "map",
        blurb:
          "Interactive MapLibre + OpenFreeMap (no API key). Layouts: `side-by-side` (default) or `map-only`. Styles: `streets`, `light`, `dark`, `bright`.",
        demo: {
          block: "map",
          content: {
            title: "Visit the lab",
            subtitle: "Analytical Engines Lab",
            location: {
              lat: 51.5246,
              lng: -0.1339,
              address: "Gower Street\nLondon WC1E 6BT",
            },
            zoom: 14,
            cta: {
              phone: "+44 20 0000 0000",
              email: "ada@example.com",
              directions: { text: "Get directions" },
            },
          },
          design: {
            layout: "side-by-side",
            height: "md",
            style: "streets",
          },
        },
      },
      {
        anchor: "gallery",
        title: "gallery",
        blurb:
          "Layouts: `grid`, `masonry`, `justified`, `carousel`, `slideshow`. Lightbox on by default (`design.lightbox: false` to disable). Optional `aspect_ratio`, `gap`, `caption_position`.",
        demo: {
          block: "gallery",
          content: {
            title: "Gallery",
            items: [
              {
                src: "https://picsum.photos/seed/blox-docs-1/640/400",
                alt: "Sample one",
                caption: "Sample image",
                aspect_ratio: 1.6,
              },
              {
                src: "https://picsum.photos/seed/blox-docs-2/640/800",
                alt: "Sample two",
                caption: "Tall sample",
                aspect_ratio: 0.8,
              },
              {
                src: "https://picsum.photos/seed/blox-docs-3/640/400",
                alt: "Sample three",
                caption: "Sample image",
                aspect_ratio: 1.6,
              },
            ],
          },
          design: { layout: "masonry", columns: 3, lightbox: true },
        },
      },
    ],
  },
];
