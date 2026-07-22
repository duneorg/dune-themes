/**
 * Adapted blocks — team-showcase, portfolio, gallery.
 * Inline people/items instead of Hugo authors/folders.
 */
import type { Collection, Page } from "@dune/core/content/types";
import { Icon } from "../icon.tsx";
import {
  CardList,
  type ViewConfig,
} from "../views.tsx";
import {
  inlineMarkdown,
  linkTarget,
  markdownBlock,
  namedCollection,
  normalizeRoute,
  pageSummary,
  pageTitle,
  str,
  strArr,
} from "../../utils/blox.ts";
import { safeHref } from "../../utils/safe-url.ts";
import type { BlockContext } from "./shared.ts";
import { contentItems } from "./shared.ts";

function asMap(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, unknown> : {};
}

function asMaps(v: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(v)) {
    return v.filter((x): x is Record<string, unknown> => !!x && typeof x === "object");
  }
  if (v && typeof v === "object") return [v as Record<string, unknown>];
  return [];
}

function boolOpt(v: unknown, fallback: boolean): boolean {
  if (v === true || v === false) return v;
  return fallback;
}

function intOpt(v: unknown, fallback: number): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/** Page tags: frontmatter.taxonomy.tag (canonical) or legacy frontmatter.tags. */
function pageTags(item: Page): string[] {
  const fm = item.frontmatter as Record<string, unknown>;
  const tax = fm.taxonomy as Record<string, unknown> | undefined;
  // Also accept a non-standard `taxonomies` key if present on the page object.
  const top = (item as unknown as Record<string, unknown>).taxonomies;
  const fromTop = top && typeof top === "object"
    ? strArr((top as Record<string, unknown>).tag ?? (top as Record<string, unknown>).tags)
    : [];
  return [
    ...strArr(tax?.tag),
    ...strArr(fm.tags),
    ...fromTop,
  ].filter(Boolean);
}

function coverUrl(item: Page): string | null {
  const fm = item.frontmatter as Record<string, unknown>;
  const image = fm.image;
  let filename = "";
  if (typeof image === "string") filename = image;
  else if (image && typeof image === "object") {
    filename = str((image as Record<string, unknown>).filename);
  }
  if (!filename) return null;
  if (/^https?:\/\//.test(filename) || filename.startsWith("/")) return filename;
  const media = (item.media ?? []).find((m) => m.name === filename);
  return media?.url ?? null;
}

// ── team-showcase ───────────────────────────────────────────────────────────

interface Person {
  name: string;
  role: string;
  avatar: string;
  organizations: string[];
  interests: string[];
  links: Array<{ icon: string; url: string; label: string }>;
}

function parsePerson(raw: Record<string, unknown>): Person | null {
  const name = str(raw.name) || str(raw.title);
  if (!name) return null;

  const orgsRaw = raw.organizations ?? raw.affiliations;
  const organizations: string[] = [];
  if (Array.isArray(orgsRaw)) {
    for (const o of orgsRaw) {
      if (typeof o === "string" && o) {
        organizations.push(o);
      } else if (o && typeof o === "object") {
        const m = o as Record<string, unknown>;
        const n = str(m.name) || str(m.title);
        if (n) organizations.push(n);
      }
    }
  } else if (typeof orgsRaw === "string" && orgsRaw) {
    organizations.push(orgsRaw);
  }

  const links: Person["links"] = [];
  for (const link of asMaps(raw.links)) {
    const url = safeHref(link.url) || safeHref(link.link);
    if (!url) continue;
    links.push({
      icon: str(link.icon) || "hero/link",
      url,
      label: str(link.label) || str(link.name),
    });
  }

  return {
    name,
    role: str(raw.role),
    avatar: str(raw.avatar),
    organizations,
    interests: strArr(raw.interests),
    links,
  };
}

function PersonCard(
  { person, design }: {
    person: Person;
    design: {
      showRole: boolean;
      showOrganizations: boolean;
      showInterests: boolean;
      maxInterests: number;
      showSocial: boolean;
    };
  },
) {
  const initial = person.name.charAt(0).toUpperCase() || "?";
  const org = person.organizations[0] || "";
  const roleText = person.role || org;

  return (
    <div class="group relative">
      <div class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="block relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          {person.avatar
            ? (
              <img
                src={person.avatar}
                alt={person.name}
                loading="lazy"
                class="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
              />
            )
            : (
              <div class="absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-4xl font-semibold text-gray-600 dark:text-gray-200">
                {initial}
              </div>
            )}
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{person.name}</h3>
          {design.showRole && (roleText || (design.showOrganizations && org)) && (
            <div class="text-gray-600 dark:text-gray-400 mb-3">
              {roleText && <p class="font-medium">{roleText}</p>}
              {design.showOrganizations && org && person.role && (
                <p class="text-sm mt-1">{org}</p>
              )}
            </div>
          )}
          {design.showInterests && design.maxInterests > 0 && person.interests.length > 0 && (
            <div class="mb-4">
              <div class="flex flex-wrap gap-1">
                {person.interests.slice(0, design.maxInterests).map((interest) => (
                  <span
                    key={interest}
                    class="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
          {design.showSocial && person.links.length > 0 && (
            <div class="flex gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
              {person.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  {...linkTarget(link.url)}
                  aria-label={link.label || link.icon}
                  title={link.label || undefined}
                  class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Icon name={link.icon} class="w-5 h-5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TeamShowcase(
  { content, design, ctx }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
    ctx: BlockContext;
  },
) {
  void ctx;
  const showRole = boolOpt(design.show_role, true);
  const showOrganizations = boolOpt(design.show_organizations, true);
  const showInterests = boolOpt(design.show_interests, false);
  const showSocial = boolOpt(design.show_social, true);
  const maxInterests = intOpt(design.max_interests, 3);
  let maxColumns = intOpt(design.max_columns, 4);
  if (maxColumns < 2) maxColumns = 2;
  if (maxColumns > 4) maxColumns = 4;
  const align = str(design.align) === "left" ? "left" : "center";

  const columnsClasses: Record<number, string> = {
    2: "grid grid-cols-1 gap-8 sm:grid-cols-2",
    3: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };
  const gridClass = columnsClasses[maxColumns] ?? columnsClasses[4];

  const headerClass = align === "left"
    ? "max-w-3xl mb-12 text-left"
    : "text-center max-w-3xl mx-auto mb-12";
  const ctaAlign = align === "left" ? "text-left" : "text-center";

  const cardDesign = { showRole, showOrganizations, showInterests, maxInterests, showSocial };

  type Group = { name: string; people: Person[] };
  const groups: Group[] = [];

  const groupsRaw = asMaps(content.groups);
  if (groupsRaw.length) {
    for (const g of groupsRaw) {
      const people = asMaps(g.people).map(parsePerson).filter((p): p is Person => !!p);
      groups.push({ name: str(g.name) || str(g.title), people });
    }
  } else {
    const people = asMaps(content.people).map(parsePerson).filter((p): p is Person => !!p);
    if (people.length) groups.push({ name: "", people });
  }

  const cta = asMap(content.cta);
  const ctaHref = safeHref(cta.url);

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {(str(content.title) || str(content.subtitle) || str(content.text)) && (
        <div class={headerClass}>
          {str(content.title) && (
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.title)) }}
            />
          )}
          {str(content.subtitle) && (
            <p
              class="text-xl text-primary-600 dark:text-primary-400 font-medium mb-3"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.subtitle)) }}
            />
          )}
          {str(content.text) && (
            <div
              class="prose dark:prose-invert"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: markdownBlock(str(content.text)) }}
            />
          )}
        </div>
      )}

      {groups.map((group, gi) => (
        <div key={gi}>
          {group.name && groups.length > 1 && (
            <div class={`col-span-full ${gi > 0 ? "mt-8 md:mt-10 lg:mt-12" : ""} mb-4`}>
              <h3
                class="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(group.name) }}
              />
            </div>
          )}
          <div class={`${gridClass} w-full`}>
            {group.people.map((person) => (
              <PersonCard key={person.name} person={person} design={cardDesign} />
            ))}
          </div>
        </div>
      ))}

      {str(cta.text) && ctaHref && (
        <div class={`mt-12 ${ctaAlign}`}>
          <a
            href={ctaHref}
            {...linkTarget(ctaHref)}
            class="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {str(cta.text)}
            {str(cta.icon) && <Icon name={str(cta.icon)} class="ml-2 w-5 h-5" />}
          </a>
        </div>
      )}
    </div>
  );
}

// ── portfolio ───────────────────────────────────────────────────────────────

function ProjectCard({ item }: { item: Page }) {
  const title = pageTitle(item);
  const summary = pageSummary(item);
  const href = normalizeRoute(item.route);
  const cover = coverUrl(item);
  const tags = pageTags(item);
  const fm = item.frontmatter as Record<string, unknown>;
  const status = str(fm.status);

  return (
    <article
      class="group relative flex flex-col bg-white dark:bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/[0.08] overflow-hidden hover:border-primary-500/50 hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10"
      data-tags={tags.join(",")}
    >
      <div class="relative h-48 overflow-hidden">
        {cover
          ? (
            <img
              src={cover}
              alt={title}
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          )
          : (
            <div class="w-full h-full bg-gradient-to-br from-primary-600/40 via-secondary-600/30 to-primary-800/50 flex items-center justify-center">
              <Icon name="code-bracket" class="w-16 h-16 text-white/30" />
            </div>
          )}
        {status && (
          <div class="absolute top-3 right-3">
            <span class="px-2.5 py-1.5 text-xs font-semibold rounded-full border bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/30">
              {status}
            </span>
          </div>
        )}
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
      </div>
      <div class="p-5 flex flex-col flex-grow">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <a href={href} class="stretched-link">{title}</a>
        </h3>
        {summary && (
          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{summary}</p>
        )}
        {tags.length > 0 && (
          <div class="flex flex-wrap gap-1.5 mb-2">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                class="px-2 py-0.5 text-xs font-medium rounded-md bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function PortfolioBlock(
  { content, design, ctx }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
    ctx: BlockContext;
  },
) {
  const { t } = ctx;
  const name = str(content.collection);
  const collection: Collection | undefined = name ? namedCollection(ctx.props, name) : undefined;
  let items: Page[] = collection?.items ?? [];
  const count = intOpt(content.count, 0);
  if (count > 0) items = items.slice(0, count);

  const columns = intOpt(design.columns, 3);
  const gridClass = columns === 2
    ? "md:grid-cols-2"
    : columns === 4
    ? "md:grid-cols-2 lg:grid-cols-4"
    : "md:grid-cols-2 lg:grid-cols-3";

  // Filter buttons: content.buttons[{name,tag}] or content.filters.tags
  let buttons = asMaps(content.buttons).map((b) => ({
    name: str(b.name) || str(b.tag) || "All",
    tag: str(b.tag) || "*",
  }));
  if (!buttons.length) {
    const filters = asMap(content.filters);
    const tags = strArr(filters.tags);
    if (tags.length) {
      buttons = [
        { name: "All", tag: "*" },
        ...tags.map((tag) => ({ name: tag, tag })),
      ];
    }
  }
  if (!buttons.length) buttons = [{ name: "All", tag: "*" }];

  const useCardList = str(design.view) === "card";
  const viewConfig: ViewConfig = {
    columns,
    fillImage: design.fill_image !== false,
    showDate: false,
    showReadTime: false,
    showReadMore: true,
    t,
  };

  const archive = asMap(content.archive);
  const archiveLink = safeHref(archive.link);
  const showArchive = archive.enable === true && archiveLink;

  return (
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" data-portfolio-root>
      {(str(content.title) || str(content.subtitle)) && (
        <div class="text-center mb-12">
          {str(content.title) && (
            <h2
              class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.title)) }}
            />
          )}
          {str(content.subtitle) && (
            <p
              class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.subtitle)) }}
            />
          )}
        </div>
      )}

      {buttons.length > 1 && (
        <div class="flex flex-wrap justify-center gap-2 mb-10">
          {buttons.map((btn) => (
            <button
              type="button"
              key={btn.tag}
              data-portfolio-filter={btn.tag}
              class="px-5 py-2.5 rounded-full text-sm font-medium border backdrop-blur-sm transition-all duration-300 ease-out cursor-pointer bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20"
            >
              {btn.name}
            </button>
          ))}
        </div>
      )}

      {useCardList
        ? <CardList items={items} config={viewConfig} />
        : (
          <div class={`grid grid-cols-1 ${gridClass} gap-6`}>
            {items.map((item) => <ProjectCard key={item.route} item={item} />)}
          </div>
        )}

      {showArchive && (
        <div class="text-center mt-12">
          <a
            href={archiveLink}
            {...linkTarget(archiveLink!)}
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300"
          >
            <span>{str(archive.text) || t("portfolio_view_all") || t("more_pages") || "View All Projects"}</span>
            <Icon name="arrow-right" class="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}

// ── gallery ─────────────────────────────────────────────────────────────────

const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
};

const GAP_CLASS: Record<string, string> = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

/** Custom aspect classes — compiled blox.css lacks most Tailwind aspect-* utilities. */
const ASPECT_CLASS: Record<string, string> = {
  square: "hbx-aspect-square",
  landscape: "hbx-aspect-landscape",
  portrait: "hbx-aspect-portrait",
  wide: "hbx-aspect-wide",
};

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  title: string;
  link?: string;
  aspect: number;
}

function parseGalleryItems(content: Record<string, unknown>): GalleryItem[] {
  const raw = contentItems(content).length ? contentItems(content) : asMaps(content.items);
  return raw.map((item) => {
    const src = str(item.src);
    const w = Number(item.width) || 0;
    const h = Number(item.height) || 0;
    let aspect = Number(item.aspect_ratio) || 0;
    if (!aspect && w > 0 && h > 0) aspect = w / h;
    if (!aspect) aspect = 1.333;
    return {
      src,
      alt: str(item.alt),
      caption: str(item.caption),
      credit: str(item.credit),
      title: str(item.title),
      link: safeHref(item.link) || undefined,
      aspect,
    };
  }).filter((i) => !!i.src);
}

function GalleryTile(
  { item, index, aspectClass, captionPosition, hoverZoom, lightbox, masonry }: {
    item: GalleryItem;
    index: number;
    aspectClass: string;
    captionPosition: string;
    hoverZoom: boolean;
    lightbox: boolean;
    masonry?: boolean;
  },
) {
  const hoverImg = hoverZoom ? "transition-transform duration-500 group-hover:scale-105" : "";
  const showOverlay = captionPosition === "overlay" && (item.caption || item.title);
  const showHover = captionPosition === "hover" && (item.caption || item.title);
  const label = item.alt || item.caption || item.title || "Image";

  const img = (
    <img
      src={item.src}
      alt={label}
      loading="lazy"
      decoding="async"
      data-gallery-src={item.src}
      data-gallery-alt={item.alt}
      data-gallery-caption={item.caption}
      data-gallery-credit={item.credit}
      data-gallery-title={item.title}
      data-gallery-link={item.link || ""}
      class={masonry
        ? `hbx-gallery-img hbx-gallery-img-natural ${hoverImg}`
        : `hbx-gallery-img hbx-gallery-img-cover ${hoverImg}`}
    />
  );

  const body = lightbox
    ? (
      <button
        type="button"
        data-gallery-open={String(index)}
        class={masonry
          ? "hbx-gallery-trigger relative block w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          : "hbx-gallery-trigger absolute inset-0 w-full h-full block focus:outline-none focus:ring-2 focus:ring-primary-500"}
        aria-label={`Open image: ${label}`}
        style={masonry ? `aspect-ratio: ${item.aspect}` : undefined}
      >
        {img}
        {showOverlay && (
          <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12 text-left pointer-events-none">
            <span class="block text-sm font-semibold text-white">{item.title || item.caption}</span>
          </span>
        )}
        {showHover && (
          <span class="absolute inset-0 flex items-end p-4 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 pointer-events-none">
            <span class="block text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.caption || item.title}
            </span>
          </span>
        )}
      </button>
    )
    : item.link
    ? (
      <a
        href={item.link}
        {...linkTarget(item.link)}
        class={masonry
          ? "relative block w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
          : "absolute inset-0 block"}
        style={masonry ? `aspect-ratio: ${item.aspect}` : undefined}
      >
        {img}
      </a>
    )
    : (
      <div
        class={masonry ? "relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800" : "absolute inset-0"}
        style={masonry ? `aspect-ratio: ${item.aspect}` : undefined}
      >
        {img}
      </div>
    );

  return (
    <figure
      class={masonry
        ? "hbx-gallery-tile hbx-gallery-tile-masonry group relative mb-4"
        : `hbx-gallery-tile group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 ${aspectClass}`}
      data-gallery-item
      data-gallery-index={String(index)}
    >
      {body}
      {captionPosition === "below" && (item.caption || item.title || item.credit) && (
        <figcaption class="pt-2 text-sm text-gray-600 dark:text-gray-400">
          {item.title && (
            <span
              class="font-semibold text-gray-900 dark:text-white"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(item.title) }}
            />
          )}
          {item.title && item.caption && " — "}
          {item.caption && (
            <span
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(item.caption) }}
            />
          )}
          {item.credit && <span class="block text-xs mt-0.5">{item.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export function GalleryBlock(
  { content, design }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
  },
) {
  const items = parseGalleryItems(content);
  let columns = intOpt(design.columns, 3);
  if (columns < 1) columns = 1;
  if (columns > 6) columns = 6;

  const layoutRaw = str(design.layout).toLowerCase() || "grid";
  const layout = ["grid", "masonry", "justified", "carousel", "slideshow"].includes(layoutRaw)
    ? layoutRaw
    : "grid";
  const gap = GAP_CLASS[str(design.gap)] || GAP_CLASS.md;
  const captionPosition = str(design.caption_position) || "below";
  const hoverZoom = design.hover_zoom !== false;
  const lightbox = design.lightbox !== false;
  const aspectKey = str(design.aspect_ratio) ||
    (layout === "slideshow" ? "wide" : "square");
  const aspectClass = ASPECT_CLASS[aspectKey] || ASPECT_CLASS.square;
  const rowHeight = intOpt(design.row_height, 220);

  if (!items.length) {
    return (
      <div class="py-12 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Gallery has no images. Add `items[]` with src/alt/caption.
      </div>
    );
  }

  let layoutEl;
  if (layout === "masonry") {
    layoutEl = (
      <div class={`hbx-gallery-masonry ${gap}`} data-cols={String(columns)}>
        {items.map((item, i) => (
          <GalleryTile
            key={i}
            item={item}
            index={i}
            aspectClass=""
            captionPosition={captionPosition}
            hoverZoom={hoverZoom}
            lightbox={lightbox}
            masonry
          />
        ))}
      </div>
    );
  } else if (layout === "justified") {
    layoutEl = (
      <div class={`hbx-gallery-justified flex flex-wrap ${gap}`}>
        {items.map((item, i) => (
          <figure
            class="hbx-gallery-justified-item group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
            style={`flex-basis: ${item.aspect * rowHeight}px; flex-grow: ${item.aspect}; height: ${rowHeight}px; min-width: 0;`}
            data-gallery-item
            data-gallery-index={String(i)}
            key={i}
          >
            {lightbox
              ? (
                <button
                  type="button"
                  data-gallery-open={String(i)}
                  class="hbx-gallery-trigger absolute inset-0 w-full h-full"
                  aria-label={`Open image: ${item.alt || item.caption || "Image"}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt || ""}
                    loading="lazy"
                    class={`hbx-gallery-img hbx-gallery-img-cover ${
                      hoverZoom ? "transition-transform duration-500 group-hover:scale-105" : ""
                    }`}
                    data-gallery-src={item.src}
                    data-gallery-caption={item.caption}
                    data-gallery-title={item.title}
                    data-gallery-credit={item.credit}
                    data-gallery-alt={item.alt}
                    data-gallery-link={item.link || ""}
                  />
                </button>
              )
              : (
                <img
                  src={item.src}
                  alt={item.alt || ""}
                  loading="lazy"
                  class="hbx-gallery-img hbx-gallery-img-cover"
                />
              )}
          </figure>
        ))}
      </div>
    );
  } else if (layout === "carousel") {
    layoutEl = (
      <div class={`hbx-gallery-carousel ${gap}`} data-cols={String(columns)}>
        {items.map((item, i) => (
          <div class="hbx-gallery-carousel-item" key={i}>
            <GalleryTile
              item={item}
              index={i}
              aspectClass={aspectClass}
              captionPosition={captionPosition}
              hoverZoom={hoverZoom}
              lightbox={lightbox}
            />
          </div>
        ))}
      </div>
    );
  } else if (layout === "slideshow") {
    layoutEl = (
      <div class="hbx-gallery-slideshow relative" data-gallery-slideshow>
        {items.map((item, i) => (
          <div
            class={`hbx-gallery-slide ${i === 0 ? "" : "hidden"}`}
            data-gallery-slide={String(i)}
            key={i}
          >
            <GalleryTile
              item={item}
              index={i}
              aspectClass={aspectClass}
              captionPosition={captionPosition}
              hoverZoom={hoverZoom}
              lightbox={lightbox}
            />
          </div>
        ))}
        {items.length > 1 && (
          <div class="flex justify-center gap-3 mt-4">
            <button
              type="button"
              data-gallery-slide-prev
              class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              type="button"
              data-gallery-slide-next
              class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  } else {
    layoutEl = (
      <div class={`grid ${GRID_COLS[columns] || GRID_COLS[3]} ${gap}`}>
        {items.map((item, i) => (
          <GalleryTile
            key={i}
            item={item}
            index={i}
            aspectClass={aspectClass}
            captionPosition={captionPosition}
            hoverZoom={hoverZoom}
            lightbox={lightbox}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      class="py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
      data-gallery-root
      data-gallery-lightbox={lightbox ? "true" : "false"}
    >
      <div class="max-w-7xl mx-auto">
        {(str(content.title) || str(content.subtitle)) && (
          <div class="text-center max-w-3xl mx-auto mb-10">
            {str(content.title) && (
              <h2
                class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.title)) }}
              />
            )}
            {str(content.subtitle) && (
              <p
                class="text-lg text-gray-600 dark:text-gray-400"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.subtitle)) }}
              />
            )}
          </div>
        )}
        {layoutEl}
      </div>
    </div>
  );
}
