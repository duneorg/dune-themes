# dune-minimal

Minimal, semantic base theme for Dune. Usable on its own (a clean, classless-ish
blog/docs look), but primarily designed to be **inherited**:

```yaml
# themes/my-theme/theme.yaml
name: my-theme
parent: dune-minimal
```

## What you get by inheriting

Dune resolves the theme chain child → parent for each of these:

| Mechanism | Behaviour |
|---|---|
| `templates/*.tsx` | Any template your theme doesn't define falls back to the base (whole-file override — no partial/block inheritance) |
| `components/layout.tsx` | The `Layout` prop passed to every template resolves through the chain — **base templates automatically render inside your layout** once you define one |
| `locales/*.json` | Merged; your keys override base keys. Templates receive the merged strings via the `t()` prop |
| `islands/` | Collected across the whole chain |

The base provides: `default`, `post`, `blog`, `section`, `search`, `error`
templates; a layout with correct head metadata (title/description/canonical/
Open Graph), RTL `dir`, and a persisted dark-mode toggle; and reusable
components (`head.tsx`, `nav.tsx`, `post-meta.tsx`, `pagination.tsx`,
`tag-list.tsx`).

## Two ways to build a child theme

### Pattern A — derived skin (restyle the base)

Keep all base templates and markup; change the look via CSS tokens.
Your theme needs only two files:

```
themes/my-theme/
├── theme.yaml            # name + parent: dune-minimal
└── static/style.css
```

```css
/* themes/my-theme/static/style.css */
@import url("/themes/dune-minimal/static/style.css");

:root {
  --accent: #c9943a;
  --bg: #faf6ef;
  --font-body: Georgia, serif;
  --content-width: 40rem;
}
.dark { --bg: #1a150e; }
```

The base layout always links `/themes/<active-theme>/static/style.css`, so a
child **must** ship a `style.css` (starting with the `@import` above).
Override individual templates only where the markup itself needs to differ.

### Pattern B — independent look (own layout, borrow behaviour)

Ship your own `components/layout.tsx` and main templates with their own
markup and a fully independent stylesheet. Inherit the *behavioural*
templates you'd otherwise have to reimplement — `search`, `error`,
`section` — which automatically render inside **your** layout via the
`Layout` prop. Style their semantic hooks in your CSS:

```css
form[role="search"] { … }
.search-results { … }
.error-page { … }
.section-list { … }
.pagination { … }
```

Reuse base components in your own templates with static imports (fine for
anything except the layout itself):

```tsx
import PostMeta from "../../dune-minimal/components/post-meta.tsx";
import Pagination from "../../dune-minimal/components/pagination.tsx";
```

## Rules that keep inheritance working

1. **Always use the `Layout` prop** in templates, with a static import only as
   fallback: `const LayoutComponent = Layout ?? StaticLayout;`. This is what
   lets inherited templates pick up the child's layout, and what keeps
   hot-reload working.
2. **Namespace static asset URLs by the owning theme.** Base assets live at
   `/themes/dune-minimal/static/…` forever; child assets at
   `/themes/<child>/static/…`. Never assume the active theme's namespace for
   a file you didn't ship.
3. **UI strings go through `t()`** and `locales/<lang>.json`, never hardcoded
   in templates — children and translations override them without touching
   markup.
4. **`mdx-components.ts` does not inherit** (Dune loads only the active
   theme's file). A child that wants the base set re-exports and extends it:
   ```ts
   // themes/my-theme/mdx-components.ts
   import base from "../dune-minimal/mdx-components.ts";
   import { MyChart } from "./components/MyChart.tsx";
   export default { ...base, MyChart };
   ```
5. **`config_schema` does not inherit** — the admin UI reads only the active
   theme's manifest. Copy the base fields your theme actually uses into your
   own `theme.yaml` (and keep the same keys, since base templates read them:
   `accent_color`, `default_dark`, `footer_text`).
