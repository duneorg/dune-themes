# Dune Themes

Official theme packages for [Dune CMS](https://getdune.org).

We ship two tiers:

- **Inspired** — Dune-native themes (`sirocco`, `caravan`, …) — *inspired by* upstream work, not ports
- **Faithful** — `{Upstream} for Dune` (`papermod`, `book`, `starlight`, `blox`)

All packages live under `packages/theme-{slug}/`. The `theme.yaml` `name:` field is the logical slug used in site config and static URLs.

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

### Base theme

| Package | Name | Use case |
|---------|------|----------|
| `@dune/theme-dune-minimal` | Dune Minimal | Semantic base; inherit via `parent: dune-minimal` |

## Install

```bash
dune theme:install jsr:@dune/theme-sirocco@0.1.0 --activate
dune theme:install ./packages/theme-caravan --name caravan --activate
```

## Development

```bash
deno task scaffold   # regenerates scaffold-managed packages (ink, gale, …) + registry.json
deno task pack:all   # ZIPs every catalog theme with a package on disk
```

Hand-maintained themes (`sirocco`, `caravan`, `fennec`, `nightfall`, `oasis`, faithful ports, …) are edited directly under `packages/theme-{slug}/`. Scaffold-managed themes (`ink`, `gale`, `salon`, `syntax`, `herald`, `lucid`, `manual`) live in `scripts/theme-customizations/`.
