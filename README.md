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

All 44 free [HTML5 UP](https://html5up.net) templates — `deno task scaffold:html5up` bootstraps skeleton packages; each is graduated to 1.0.0 individually.

| Package | Name | Status |
|---------|------|--------|
| `@dune/theme-striped` | Striped | **1.0.0** — pilot (sidebar blog) |
| `@dune/theme-*` | *(43 others)* | scaffold skeleton — not yet 1.0 |

Run `deno task scaffold:html5up` to generate or refresh skeleton packages for non-graduated HTML5 UP themes.

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
