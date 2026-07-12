# Dune Themes

Official theme packages for [Dune CMS](https://getdune.org).

We ship three tiers:

- **Inspired** — Dune-native themes (`sirocco`, `caravan`, …) — *inspired by* upstream work, not ports
- **Faithful** — `{Upstream} for Dune` (`papermod`, `book`, `starlight`, `blox`)
- **HTML5 UP** — all [HTML5 UP](https://html5up.net) free templates (CC BY 3.0), adapted for Dune (`striped`, … — 44 total)

All packages live under `packages/theme-{slug}/`. The `theme.yaml` `name:` field is the logical slug used in site config and static URLs.

**Versioning:** Every theme targets **`1.0.0`** for its first JSR and marketplace release. Versions stay at `1.0.0` in-tree until a theme meets our quality bar; nothing is published before then.

### Inspired themes

| Package | Name | Use case | Inspired by |
|---------|------|----------|-------------|
| `@dune/theme-sirocco` | Sirocco | Minimal blog | Hugo PaperMod |
| `@dune/theme-caravan` | Caravan | Sidebar docs | hugo-book |
| `@dune/theme-ink` | Ink | Long-form writing | Ghost Attila |
| `@dune/theme-gale` | Gale | Landing + blog | AstroWind |
| `@dune/theme-salon` | Salon | Magazine blog | Ghost Liebling |
| `@dune/theme-syntax` | Syntax | Technical blog | Jekyll Chirpy |
| `@dune/theme-fennec` | Fennec | Portfolio | Astrofy |
| `@dune/theme-herald` | Herald | Publication blog | Ghost Casper |
| `@dune/theme-lucid` | Lucid | Modern docs | Hugo Hextra |
| `@dune/theme-manual` | Manual | Product docs | Just the Docs |
| `@dune/theme-nightfall` | Nightfall | Dark-first docs | Astro Starlight |
| `@dune/theme-oasis` | Oasis | Landing / academic CV | Hugo Blox |

### Faithful ports

| Package | Name | Use case | Upstream |
|---------|------|----------|----------|
| `@dune/theme-papermod` | PaperMod for Dune | Minimal blog | Hugo PaperMod |
| `@dune/theme-book` | Hugo Book for Dune | Sidebar docs | hugo-book |
| `@dune/theme-starlight` | Starlight for Dune | Modern docs | Astro Starlight |
| `@dune/theme-blox` | Hugo Blox for Dune | Academic / portfolio | Hugo Blox |

### HTML5 UP themes (CC BY 3.0)

All 44 free [HTML5 UP](https://html5up.net) templates, layouts adapted and CSS vendored from upstream. Scaffolded/generated, not individually verified — none have been through the actual QA pass (real demo, manual click-through, visual-parity check against upstream) documented in `notes/RELEASE-PLAN.md`; caravan is currently the only theme in this repo that has. `deno task graduate:html5up` still vendors assets for new work but skips hand-maintained slugs.

| Theme | Layout |
|-------|--------|
| **Striped** | Sidebar blog (reference port) |
| **Massively** | Hero blog |
| **Editorial** | Main + sidebar magazine |
| **Future Imperfect** | Magazine blog |
| **Dimension** | Modal panel landing |
| **Dopetrope** | Magazine blog |
| **Phantom** | Tile grid blog |
| **Hyperspace** | Sidebar landing |
| **Read Only** | Profile sidebar blog |
| **Strongly Typed** | Typography blog |
| **Astral** | Icon-nav portfolio panels |
| **Fractal** | Spotlight portfolio |
| **Lens** | Fullscreen gallery portfolio |
| **Miniport** | Compact portfolio |
| **Parallelism** | Masonry portfolio grid |
| **Photon** | Hero portfolio |
| **Strata** | Avatar portfolio |
| **TXT** | Page-wrapper portfolio |
| **Aerial** | Fullscreen landing |
| **Alpha** | Business landing |
| **Arcana** | Corporate landing |
| **Halcyonic** | Business layout landing |
| **Escape Velocity** | Marketing site landing |
| **Eventually** | Coming-soon landing |
| **ZeroFour** | Minimal page shell |
| **Big Picture** | Scroll-driven gallery landing |
| **Directive** | Simple landing |
| **Ethereal** | Panel grid landing |
| **Forty** | Tile multipurpose landing |
| **Helios** | Carousel landing |
| **Highlights** | Photo scroll landing |
| **Landed** | Product landing |
| **Minimaxing** | Compact landing |
| **Multiverse** | Thumb gallery landing |
| **Paradigm Shift** | Split scroll landing |
| **Prologue** | Sidebar intro landing |
| **Solid State** | Business landing |
| **Spectral** | Event landing |
| **Stellar** | Multipurpose landing |
| **Story** | Scroll narrative landing |
| **Telephasic** | Business site landing |
| **Tessellate** | Grid landing |
| **Twenty** | Multipurpose landing |
| **Verti** | Business landing |

```bash
deno task graduate:html5up           # vendor assets (skips hand-maintained slugs)
deno task graduate:html5up alpha     # single theme
```

### Base theme

| Package | Name | Use case |
|---------|------|----------|
| `@dune/theme-dune-minimal` | Dune Minimal | Semantic base; inherit via `parent: dune-minimal` |

## Install

```bash
dune theme:install jsr:@dune/theme-sirocco@1.0.0 --activate
dune theme:install ./packages/theme-caravan --name caravan --activate
```

## Development

```bash
deno task scaffold        # refresh registry.json; regenerates packages in THEME_DEFS only
deno task sync:manifests  # write mod.ts + deno.json to every catalog package
deno task pack:all        # ZIPs every catalog theme with a package on disk
deno task dry-run:all     # JSR publish dry-run for every catalog package
deno task demo papermod   # local demo server (http://localhost:8765)
deno task demo:validate --all
```

### Smoke test (before tagging a release)

1. **Pack** — `deno task pack:all` and confirm ZIPs under `dist/`.
2. **JSR** — `deno task dry-run:all` (or `deno publish --dry-run` inside one package).
3. **Install ZIP** — extract a ZIP into a test site's `themes/{slug}/`, set `theme.name` in `site.yaml`, run `dune validate` and `dune dev`.
4. **Install JSR** — `dune theme:install jsr:@dune/theme-{slug}@1.0.0`, `dune lockfile:sync`, restart dev server.

All inspired themes are edited directly under `packages/theme-{slug}/`. **Sirocco** is the reference for inheriting from `@dune/theme-dune-minimal` via `parent: dune-minimal` in `theme.yaml`. To scaffold a new theme, add a definition to `scripts/theme-defs.ts` and run `deno task scaffold`.
