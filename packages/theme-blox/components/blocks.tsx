/**
 * Landing-page blocks — ports of blox/<id>/block.html and the section
 * wrapper from functions/parse_block_v3.html.
 *
 * Deviation from upstream: author-profile blocks (resume-*) read the
 * profile from the block's `content.author` map (same shape as upstream's
 * data/authors/me.yaml) instead of a content/authors/ page, since Dune
 * templates don't read arbitrary pages.
 */
import type { ComponentChildren } from "preact";
import type { Collection, Page, TemplateProps } from "@dune/core";
import { Icon } from "./icon.tsx";
import {
  formatMonthYear,
  formatMonthYearLong,
  inlineMarkdown,
  linkTarget,
  markdownBlock,
  namedCollection,
  str,
  strArr,
  toDate,
} from "../utils/blox.ts";
import { ArticleGrid, CardList, CitationList, DateTitleSummaryList, type ViewConfig } from "./views.tsx";

// ── Types ───────────────────────────────────────────────────────────────────

export interface BlockDef {
  block: string;
  id?: string;
  content?: Record<string, unknown>;
  design?: Record<string, unknown>;
}

export interface BlockContext {
  props: TemplateProps;
  t: (k: string) => string;
}

interface AuthorProfile {
  name?: { display?: string; pronunciation?: string; pronouns?: string } | string;
  status?: { icon?: string };
  role?: string;
  bio?: string;
  avatar?: string;
  affiliations?: Array<{ name?: string; url?: string } | string>;
  links?: Array<{ icon?: string; url?: string; label?: string }>;
  interests?: string[];
  education?: Array<Record<string, unknown>>;
  experience?: Array<Record<string, unknown>>;
  skills?: Array<Record<string, unknown>>;
  languages?: Array<Record<string, unknown>>;
  awards?: Array<Record<string, unknown>>;
}

function profileOf(content: Record<string, unknown>): AuthorProfile {
  const a = content.author;
  return (a && typeof a === "object" ? a : {}) as AuthorProfile;
}

function profileName(p: AuthorProfile): { display: string; pronunciation: string; pronouns: string } {
  if (typeof p.name === "string") return { display: p.name, pronunciation: "", pronouns: "" };
  return {
    display: str(p.name?.display),
    pronunciation: str(p.name?.pronunciation),
    pronouns: str(p.name?.pronouns),
  };
}

// ── Block registry + section wrapper ────────────────────────────────────────

const ALIASES: Record<string, string> = {
  awards: "resume-awards",
  biography: "resume-biography",
  experience: "resume-experience",
  languages: "resume-languages",
  skills: "resume-skills",
  collection: "content-collection",
};

export function renderBlock(block: BlockDef, ctx: BlockContext) {
  const raw = str(block.block).toLowerCase() || "markdown";
  const type = ALIASES[raw] ?? raw;
  const content = (block.content ?? {}) as Record<string, unknown>;
  const design = (block.design ?? {}) as Record<string, unknown>;
  const id = block.id ?? `section-${type}`;

  let inner;
  switch (type) {
    case "resume-biography":
    case "resume-biography-3":
      inner = <ResumeBiography3 content={content} design={design} ctx={ctx} />;
      break;
    case "markdown":
      inner = <MarkdownBlock content={content} />;
      break;
    case "content-collection":
      inner = <CollectionBlock content={content} design={design} ctx={ctx} />;
      break;
    case "resume-skills":
      inner = <ResumeSkills content={content} design={design} />;
      break;
    case "resume-experience":
      inner = <ResumeExperience content={content} design={design} ctx={ctx} />;
      break;
    case "resume-awards":
      inner = <ResumeAwards content={content} ctx={ctx} />;
      break;
    case "resume-languages":
      inner = <ResumeLanguages content={content} />;
      break;
    case "cta-card":
      inner = <CtaCard content={content} design={design} />;
      break;
    default:
      inner = <MarkdownBlock content={content} />;
  }

  // Section wrapper (parse_block_v3): bg color, padding, css_class, gradient mesh.
  const bg = (design.background ?? {}) as Record<string, unknown>;
  const mesh = (bg.gradient_mesh ?? {}) as Record<string, unknown>;
  const hasMesh = mesh.enable === true;
  const spacing = (design.spacing ?? {}) as Record<string, unknown>;
  const padding = Array.isArray(spacing.padding) ? (spacing.padding as unknown[]).join(" ") : "";

  let style = "";
  if (typeof bg.color === "string") style += `background-color: ${bg.color};`;
  if (padding) style += `padding: ${padding};`;
  if (typeof design.css_style === "string") style += design.css_style;

  return (
    <section
      id={id}
      class={`relative isolate ${hasMesh ? "overflow-hidden" : ""} hbb-section blox-${type} ${
        str(design.css_class)
      }`}
      style={style || undefined}
    >
      {hasMesh && <GradientMesh />}
      <div class="home-section-bg"></div>
      {inner}
    </section>
  );
}

/** Default "orbs" gradient mesh (subtle intensity, pulse animation). */
function GradientMesh() {
  return (
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20"></div>
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full filter blur-3xl animate-pulse"></div>
      <div
        class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/30 rounded-full filter blur-3xl animate-pulse"
        style="animation-delay: 2s;"
      >
      </div>
    </div>
  );
}

// ── markdown ────────────────────────────────────────────────────────────────

function MarkdownBlock({ content }: { content: Record<string, unknown> }) {
  const title = str(content.title);
  const text = str(content.text);
  return (
    <div class="flex flex-col items-center max-w-prose mx-auto gap-3 justify-center px-6">
      {title && (
        <div
          class="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
        />
      )}
      {text && (
        <div
          class="prose prose-slate lg:prose-xl dark:prose-invert max-w-prose"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: markdownBlock(text) }}
        />
      )}
    </div>
  );
}

// ── content-collection ──────────────────────────────────────────────────────

function CollectionBlock(
  { content, design, ctx }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
    ctx: BlockContext;
  },
) {
  const { t } = ctx;
  const view = str(design.view) || "card";
  const name = str(content.collection);
  const collection: Collection | undefined = name ? namedCollection(ctx.props, name) : undefined;
  let items: Page[] = collection?.items ?? [];

  const count = typeof content.count === "number" ? content.count : 0;
  if (count > 0) items = items.slice(0, count);

  const title = str(content.title);
  const text = str(content.text);
  const config: ViewConfig = {
    columns: typeof design.columns === "number" ? design.columns : Number(design.columns) || 2,
    fillImage: design.fill_image !== false,
    showDate: design.show_date !== false,
    showReadTime: design.show_read_time !== false,
    showReadMore: design.show_read_more !== false,
    t,
  };

  let list;
  switch (view) {
    case "article-grid":
      list = <ArticleGrid items={items} config={config} />;
      break;
    case "citation":
      list = <CitationList items={items} t={t} />;
      break;
    case "date-title-summary":
      list = <DateTitleSummaryList items={items} t={t} />;
      break;
    default:
      list = <CardList items={items} config={config} />;
  }

  const archive = (content.archive ?? {}) as Record<string, unknown>;
  const archiveLink = str(archive.link);
  const showArchive = archive.enable === true && archiveLink;

  return (
    <>
      {title && (
        <div class="flex flex-col items-center max-w-prose mx-auto gap-3 justify-center px-6 md:px-0">
          <div
            class="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
          />
          {text && (
            <p
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }}
            />
          )}
        </div>
      )}
      <div class="flex flex-col items-center px-6">{list}</div>
      {showArchive && (
        <div class="container mx-auto max-w-screen-lg px-8 xl:px-5 pb-5 lg:pb-8">
          <div class="mt-10 flex justify-center">
            <a
              class="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
              href={archiveLink}
            >
              <span>{str(archive.text) || t("more_pages")}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// ── resume-biography-3 ──────────────────────────────────────────────────────

const NAME_CLASS: Record<string, string> = {
  xs: "text-xl sm:text-2xl lg:text-3xl",
  sm: "text-2xl sm:text-3xl lg:text-4xl",
  md: "text-3xl sm:text-4xl lg:text-5xl",
  lg: "text-4xl sm:text-5xl lg:text-6xl",
  xl: "text-5xl sm:text-6xl lg:text-7xl",
};

const AVATAR_SIZE: Record<string, number> = {
  small: 150,
  medium: 200,
  large: 320,
  xl: 400,
  xxl: 500,
};

const AVATAR_SHAPE: Record<string, string> = {
  circle: "rounded-full",
  square: "rounded-none",
  rounded: "rounded-lg",
};

function SectionHeading(
  { icon, children, level = 2 }: { icon: string; children: ComponentChildren; level?: 2 | 3 },
) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <div class="flex items-center gap-4 mb-8">
      <div class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
        <Icon name={icon} class="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <H class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
        {children}
      </H>
    </div>
  );
}

function ResumeBiography3(
  { content, design, ctx }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
    ctx: BlockContext;
  },
) {
  const { t } = ctx;
  const profile = profileOf(content);
  const name = profileName(profile);
  const headings = (content.headings ?? {}) as Record<string, unknown>;

  const nameCfg = (design.name ?? {}) as Record<string, unknown>;
  const nameClass = NAME_CLASS[str(nameCfg.size)] ?? NAME_CLASS.lg;
  const avatarCfg = (design.avatar ?? {}) as Record<string, unknown>;
  const displaySize = AVATAR_SIZE[str(avatarCfg.size)] ?? AVATAR_SIZE.large;
  const shapeClass = AVATAR_SHAPE[str(avatarCfg.shape)] ?? "rounded-full";
  const statusIcon = design.show_status === false ? "" : str(profile.status?.icon);

  const bio = str(content.text) || str(profile.bio);
  const button = (content.button ?? {}) as Record<string, unknown>;
  const buttonText = str(button.text);
  const buttonUrl = str(button.url);

  const aboutHeading = str(headings.about) || t("about_me");
  const educationHeading = str(headings.education) || t("education");
  const interestsHeading = str(headings.interests) || t("interests");

  const education = Array.isArray(profile.education) ? profile.education : [];
  const interests = strArr(profile.interests);
  const links = Array.isArray(profile.links) ? profile.links : [];
  const affiliations = Array.isArray(profile.affiliations) ? profile.affiliations : [];

  return (
    <div class="resume-biography py-8 px-4 sm:py-12 md:py-16 lg:py-24 xl:py-32 relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left column */}
          <div class="md:col-span-4 flex flex-col items-center text-center space-y-6 md:space-y-8">
            {profile.avatar && (
              <div
                class="avatar-wrapper mb-4"
                style={`width: ${displaySize}px; height: ${displaySize}px;`}
              >
                <img
                  class={`avatar ${shapeClass} border-4 border-white shadow-2xl`}
                  src={str(profile.avatar)}
                  alt={name.display}
                  width={displaySize}
                  height={displaySize}
                  style={`width: ${displaySize}px; height: ${displaySize}px; object-fit: cover;`}
                />
                {statusIcon && <span class="avatar-emoji">{statusIcon}</span>}
              </div>
            )}

            <div class="space-y-3">
              <h1 class={`${nameClass} font-black text-gray-900 dark:text-white leading-tight`}>
                {name.pronunciation
                  ? (
                    <ruby class="hb-ruby-name">
                      {name.display}
                      <rt>{name.pronunciation}</rt>
                    </ruby>
                  )
                  : name.display}
              </h1>
              {name.pronouns && (
                <p class="text-lg text-gray-600 dark:text-gray-400">({name.pronouns})</p>
              )}
              {profile.role && (
                <p class="text-2xl font-semibold text-primary-600 dark:text-primary-400">
                  {str(profile.role)}
                </p>
              )}
              {affiliations.map((aff) => {
                const affName = typeof aff === "string" ? aff : str(aff.name);
                const affUrl = typeof aff === "string" ? "" : str(aff.url);
                if (!affName) return null;
                return (
                  <p class="text-lg text-gray-700 dark:text-gray-300" key={affName}>
                    {affUrl
                      ? (
                        <a
                          href={affUrl}
                          {...linkTarget(affUrl)}
                          class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {affName}
                        </a>
                      )
                      : affName}
                  </p>
                );
              })}
            </div>

            {links.length > 0 && (
              <div class="flex flex-wrap justify-center gap-4">
                {links.map((link) => {
                  const url = str(link.url);
                  if (!url) return null;
                  return (
                    <a
                      href={url}
                      {...linkTarget(url)}
                      aria-label={str(link.icon) || "link"}
                      title={str(link.label) || undefined}
                      class="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 shadow-md hover:shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                      key={url}
                    >
                      <Icon name={str(link.icon) || "link"} class="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column */}
          <div class="md:col-span-8">
            {bio && (
              <div class="mb-12">
                <SectionHeading icon="identification">{aboutHeading}</SectionHeading>
                <div class="prose prose-lg dark:prose-invert text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
                  <div
                    class="bio-text"
                    // deno-lint-ignore react-no-danger
                    dangerouslySetInnerHTML={{ __html: markdownBlock(bio) }}
                  />
                </div>
              </div>
            )}

            {buttonText && buttonUrl && (
              <div class="mb-16">
                <a
                  href={buttonUrl}
                  {...linkTarget(buttonUrl)}
                  class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Icon name="document-arrow-down" class="w-5 h-5 mr-3" />
                  {buttonText}
                </a>
              </div>
            )}

            {education.length > 0 && (
              <div class="mb-16">
                <SectionHeading icon="academic-cap" level={3}>{educationHeading}</SectionHeading>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {education.map((edu) => {
                    const degree = str(edu.degree) || str(edu.area);
                    const year = str(edu.year);
                    const start = str(edu.start);
                    const end = str(edu.end);
                    const institution = str(edu.institution);
                    return (
                      <div
                        class="group h-full flex flex-col bg-gradient-to-br from-white/90 to-primary-50/30 dark:from-gray-800/90 dark:to-primary-900/20 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary-200 dark:hover:border-primary-800 backdrop-blur-md"
                        key={degree + institution}
                      >
                        <div class="flex gap-4">
                          <div class="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 rounded-full flex items-center justify-center shadow-md">
                            <Icon
                              name={str(edu.icon) || "academic-cap"}
                              class="w-6 h-6 text-primary-600 dark:text-primary-400"
                            />
                          </div>
                          <div class="flex-1 flex-grow">
                            {degree && (
                              <p class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {degree}
                              </p>
                            )}
                            {year
                              ? <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">{year}</p>
                              : start && (
                                <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                  {formatMonthYear(start)}
                                  {end && (
                                    <>
                                      <br />
                                      {formatMonthYear(end)}
                                    </>
                                  )}
                                </p>
                              )}
                            {institution && (
                              <p class="text-gray-700 dark:text-gray-300 text-base">{institution}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {interests.length > 0 && (
              <div>
                <SectionHeading icon="sparkles" level={3}>{interestsHeading}</SectionHeading>
                <div class="flex flex-wrap gap-3">
                  {interests.map((interest) => (
                    <span
                      class="inline-block bg-primary-50 dark:bg-gray-800 text-primary-800 dark:text-primary-200 text-base font-medium px-4 py-2 rounded-full border border-primary-200/50 dark:border-primary-800/50 hover:bg-primary-100 dark:hover:bg-primary-500 dark:hover:text-gray-900 dark:hover:border-primary-500 transition-all duration-200 cursor-default"
                      key={interest}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── resume-skills ───────────────────────────────────────────────────────────

function ResumeSkills(
  { content, design }: { content: Record<string, unknown>; design: Record<string, unknown> },
) {
  const profile = profileOf(content);
  const groups = Array.isArray(profile.skills) ? profile.skills : [];
  const columns = Number(design.columns) || 2;
  const title = str(content.title);
  const text = str(content.text);

  return (
    <>
      <div class="flex flex-col items-center max-w-prose mx-auto gap-3 justify-center">
        <div class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">{title}</div>
        {text && <p>{text}</p>}
      </div>
      <div
        class={`grid grid-cols-1 ${columns >= 2 ? "md:grid-cols-2" : ""} ${
          columns >= 3 ? "lg:grid-cols-3" : ""
        } items-start max-w-prose mx-auto gap-3 px-6 md:px-0`}
      >
        {groups.map((group) => {
          const g = group as Record<string, unknown>;
          const items = Array.isArray(g.items) ? g.items as Array<Record<string, unknown>> : [];
          return (
            <div class="w-full" key={str(g.name)}>
              <div class="mb-5 text-xl font-bold text-gray-900 dark:text-white">
                {str(g.name)}
                {str(g.description) && <p>{str(g.description)}</p>}
              </div>
              {items.map((item) => {
                const label = str(item.label) || str(item.name);
                let level = Number(item.level) || 0;
                level = Math.min(5, Math.max(0, level));
                return (
                  <div class="skills-content" key={label}>
                    {str(item.icon) && (
                      <span class="skills-icon inline-block">
                        <Icon name={str(item.icon)} class="inline-block" style="height: 1em;" />
                      </span>
                    )}
                    <span class="skills-name text-gray-700 dark:text-gray-300">
                      {label}
                      {str(item.description) && (
                        <p class="skills-description">{str(item.description)}</p>
                      )}
                    </span>
                    {level > 0 && (
                      <div class="skills-wrapper">
                        <div class="skills-percent" style={`width: ${level * 20}%;`}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── resume-experience ───────────────────────────────────────────────────────

interface TimelineEntry {
  heading: string;
  sub: string;
  start: string;
  end: string;
  summary: string;
  icon: string;
  tags: string[];
  buttonText: string;
  buttonUrl: string;
  buttonIcon: string;
}

function toTimeline(raw: Array<Record<string, unknown>>, kind: "work" | "edu"): TimelineEntry[] {
  return raw.map((item) => {
    const button = (item.button ?? {}) as Record<string, unknown>;
    return {
      heading: kind === "work"
        ? str(item.role) || str(item.position)
        : str(item.degree) || str(item.area),
      sub: kind === "work"
        ? str(item.org) || str(item.company_name)
        : str(item.institution),
      start: str(item.start) || str(item.date_start),
      end: str(item.end) || str(item.date_end),
      summary: str(item.summary),
      icon: str(item.icon),
      tags: strArr(item.tags),
      buttonText: str(button.text),
      buttonUrl: str(button.url),
      buttonIcon: str(button.icon),
    };
  }).filter((e) => e.heading || e.sub);
}

const WORK_FALLBACK_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 256 256"
    class="w-4 h-4 text-primary-600 dark:text-primary-400"
  >
    <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z">
    </path>
  </svg>
);

const EDU_FALLBACK_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 256 256"
    class="w-4 h-4 text-secondary-600 dark:text-secondary-400"
  >
    <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z">
    </path>
  </svg>
);

function Timeline(
  { entries, color, fallbackIcon, t }: {
    entries: TimelineEntry[];
    color: "primary" | "secondary";
    fallbackIcon: ComponentChildren;
    t: (k: string) => string;
  },
) {
  return (
    <div class="relative">
      <div
        class={`absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-${color}-500 via-${color}-400 to-${color}-600/50`}
      >
      </div>
      <div class="space-y-8">
        {entries.map((item) => (
          <div class="group relative pl-12 sm:pl-16" key={item.heading + item.sub}>
            <div class="absolute left-0 sm:left-2 top-6 flex items-center justify-center">
              <div class="relative">
                <div
                  class={`absolute inset-0 w-8 h-8 bg-${color}-500/30 rounded-full blur-md group-hover:bg-${color}-500/50 transition-all duration-300`}
                >
                </div>
                <div
                  class={`relative w-8 h-8 bg-white dark:bg-gray-900 border-2 border-${color}-500 rounded-full flex items-center justify-center group-hover:border-${color}-400 group-hover:scale-110 transition-all duration-300`}
                >
                  {item.icon
                    ? (
                      <Icon
                        name={item.icon}
                        class={`w-4 h-4 text-${color}-600 dark:text-${color}-400`}
                      />
                    )
                    : fallbackIcon}
                </div>
              </div>
            </div>

            <div
              class={`relative bg-white dark:bg-white/[0.02] backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/[0.06] p-6 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:border-${color}-300 dark:hover:border-${color}-500/30 transition-all duration-300 group-hover:translate-x-1 shadow-sm dark:shadow-none`}
            >
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3
                    class={`text-xl font-bold text-gray-900 dark:text-white group-hover:text-${color}-600 dark:group-hover:text-${color}-400 transition-colors`}
                  >
                    {item.heading}
                  </h3>
                  <p class={`text-${color}-600 dark:text-${color}-400 font-medium mt-1`}>
                    {item.sub}
                  </p>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <time>
                    {item.start && `${formatMonthYear(item.start)} – `}
                    {item.end ? formatMonthYear(item.end) : (
                      <span class="text-primary-600 dark:text-primary-400 font-medium">
                        {t("present")}
                      </span>
                    )}
                  </time>
                </div>
              </div>

              {item.summary && (
                <div
                  class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed"
                  // deno-lint-ignore react-no-danger
                  dangerouslySetInnerHTML={{ __html: markdownBlock(item.summary) }}
                />
              )}

              {item.tags.length > 0 && (
                <div class="flex flex-wrap gap-2 mt-4">
                  {item.tags.map((tag) => (
                    <span
                      class={`px-2.5 py-1 text-xs font-medium rounded-full bg-${color}-100 dark:bg-${color}-500/10 text-${color}-700 dark:text-${color}-300 border border-${color}-200 dark:border-${color}-500/20`}
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {item.buttonUrl && (
                <div class="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                  <a
                    href={item.buttonUrl}
                    {...linkTarget(item.buttonUrl)}
                    class={`inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-${color}-600 dark:hover:text-${color}-400 transition-colors`}
                  >
                    {item.buttonIcon && <Icon name={item.buttonIcon} class="w-4 h-4" />}
                    {item.buttonText || "Learn more"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeExperience(
  { content, design, ctx }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
    ctx: BlockContext;
  },
) {
  const { t } = ctx;
  const profile = profileOf(content);
  const work = toTimeline(
    Array.isArray(profile.experience) ? profile.experience as Array<Record<string, unknown>> : [],
    "work",
  );
  const edu = toTimeline(
    Array.isArray(profile.education) ? profile.education as Array<Record<string, unknown>> : [],
    "edu",
  );
  const eduFirst = design.is_education_first === true;

  return (
    <div class="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class={`flex flex-col gap-16 ${eduFirst ? "flex-col-reverse" : ""}`}>
        {work.length > 0 && (
          <div class="w-full">
            <h2 class="mb-10 text-3xl font-bold text-gray-900 dark:text-white text-center">
              {t("experience")}
            </h2>
            <Timeline entries={work} color="primary" fallbackIcon={WORK_FALLBACK_ICON} t={t} />
          </div>
        )}
        {edu.length > 0 && (
          <div class="w-full">
            <h2 class="mb-10 text-3xl font-bold text-gray-900 dark:text-white text-center">
              {t("education")}
            </h2>
            <Timeline entries={edu} color="secondary" fallbackIcon={EDU_FALLBACK_ICON} t={t} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── resume-awards ───────────────────────────────────────────────────────────

function ResumeAwards(
  { content, ctx }: { content: Record<string, unknown>; ctx: BlockContext },
) {
  const { t } = ctx;
  const profile = profileOf(content);
  const awards = (Array.isArray(profile.awards) ? profile.awards : [])
    .map((a) => a as Record<string, unknown>)
    .filter((a) => str(a.title))
    .sort((a, b) => {
      const da = toDate((a.date ?? a.date_start) as string | Date)?.getTime() ?? 0;
      const db = toDate((b.date ?? b.date_start) as string | Date)?.getTime() ?? 0;
      return db - da;
    });
  const title = str(content.title);
  const text = str(content.text);

  return (
    <div class="flex flex-col items-center max-w-prose mx-auto gap-3 justify-center">
      <div class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">{title}</div>
      {text && <p>{text}</p>}
      <div class="w-full flex flex-col gap-6">
        {awards.map((award) => {
          const url = str(award.url);
          const heading = (
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              {str(award.icon) && (
                <span class="inline-flex items-center justify-center w-7 h-7 text-primary-600 dark:text-primary-300">
                  <Icon name={str(award.icon)} class="w-6 h-6" />
                </span>
              )}
              <span>{str(award.title)}</span>
            </h5>
          );
          const certUrl = str(award.certificate_url);
          const dateValue = str(award.date) || str(award.date_start);
          return (
            <div
              class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={str(award.title)}
            >
              {url ? <a href={url} {...linkTarget(url)}>{heading}</a> : heading}
              <div class="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-300">
                {str(award.awarder) && <>{str(award.awarder)} ∙{" "}</>}
                {dateValue ? formatMonthYearLong(dateValue) : t("present")}
              </div>
              {str(award.summary) && (
                <div
                  class="mb-3 font-normal text-gray-500 dark:text-gray-400 prose"
                  // deno-lint-ignore react-no-danger
                  dangerouslySetInnerHTML={{ __html: markdownBlock(str(award.summary)) }}
                />
              )}
              {certUrl && (
                <a
                  href={certUrl}
                  {...linkTarget(certUrl)}
                  class="inline-flex items-center text-primary-600 dark:text-primary-300 hover:underline"
                >
                  {t("see_certificate")}
                  <svg
                    class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                    aria-hidden
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── resume-languages ────────────────────────────────────────────────────────

function ResumeLanguages({ content }: { content: Record<string, unknown> }) {
  const profile = profileOf(content);
  const langs = (Array.isArray(profile.languages) ? profile.languages : [])
    .map((l) => l as Record<string, unknown>)
    .filter((l) => str(l.name));
  const title = str(content.title);
  const text = str(content.text);

  return (
    <div class="flex flex-col items-center max-w-prose mx-auto gap-3 justify-center">
      <div class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">{title}</div>
      {text && <p>{text}</p>}
      <div class="flex items-center flex-col lg:flex-row gap-y-10 lg:gap-y-0 lg:gap-x-8">
        {langs.map((lang) => {
          const levelText = str(lang.level);
          const numericLevel = /^[0-9]+(\.[0-9]+)?$/.test(levelText);
          let percent = 100;
          if (numericLevel) percent = Number(levelText) * 20;
          else if (str(lang.percent)) percent = Number(lang.percent) || 100;
          percent = Math.min(100, Math.max(0, percent));
          const label = str(lang.label);
          return (
            <div class="flex flex-col items-center" key={str(lang.name)}>
              <div class="flex items-center justify-center w-28 h-28">
                <svg class="transform -rotate-90" viewBox="0 0 288 288">
                  <circle
                    cx="145"
                    cy="145"
                    r="120"
                    stroke="currentColor"
                    stroke-width="30"
                    fill="transparent"
                    class="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="145"
                    cy="145"
                    r="120"
                    stroke="currentColor"
                    stroke-width="30"
                    fill="transparent"
                    class="text-primary-600 dark:text-primary-300"
                    style={`stroke-dasharray: calc(2 * 22 / 7 * 120); stroke-dashoffset: calc((2 * 22 / 7 * 120) - ((2 * 22 / 7 * 120) * ${percent}/100))`}
                  />
                </svg>
                <span class="absolute text-3xl">{percent}%</span>
              </div>
              <span class="text-1xl">{str(lang.name)}</span>
              {label
                ? <span class="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</span>
                : levelText && !numericLevel && (
                  <span class="text-sm text-gray-500 dark:text-gray-400 mt-1">{levelText}</span>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── cta-card ────────────────────────────────────────────────────────────────

function CtaCard(
  { content, design }: { content: Record<string, unknown>; design: Record<string, unknown> },
) {
  const card = (design.card ?? {}) as Record<string, unknown>;
  const cardClass = str(card.css_class);
  const cardStyle = str(card.css_style);

  let textColorMode = str(card.text_color).toLowerCase();
  if (!["light", "dark"].includes(textColorMode)) {
    const looksColored = cardClass.includes("bg-gradient") ||
      /\bbg-(primary|secondary|violet|indigo|blue|purple|pink|fuchsia|rose|red|orange|amber|emerald|teal|cyan|sky)-[4-9]\d{0,2}\b/
        .test(cardClass) ||
      /\bfrom-(primary|secondary|violet|indigo|blue|purple|pink|fuchsia|rose|red|orange|amber|emerald|teal|cyan|sky)-[4-9]/
        .test(cardClass);
    textColorMode = looksColored ? "light" : "dark";
  }

  const titleClasses = textColorMode === "light" ? "text-white" : "text-gray-900 dark:text-white";
  const bodyClasses = textColorMode === "light" ? "text-white/80" : "text-gray-700 dark:text-gray-300";
  const buttonBgClasses = textColorMode === "light"
    ? "bg-white ring-1 ring-white/40 hover:bg-white/95 hover:ring-white/60 shadow-lg"
    : "bg-gray-900 dark:bg-white ring-1 ring-gray-900/10 dark:ring-white/10 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-lg";
  const buttonTextClasses = textColorMode === "light" ? "text-gray-900" : "text-white dark:text-gray-900";

  const button = (content.button ?? {}) as Record<string, unknown>;
  const buttonText = str(button.text);
  const buttonUrl = str(button.url);

  const defaultBgClass = "bg-gradient-to-br from-primary-500/90 via-primary-600/95 to-primary-700/90";
  const finalCardClass = cardClass || defaultBgClass;

  return (
    <div
      class={`relative overflow-hidden ${finalCardClass} p-8 sm:p-12 lg:p-16 xl:p-20 mx-auto max-w-6xl rounded-3xl shadow-2xl flex flex-col items-center text-center`}
      style={`--glassmorphism-opacity: 0.15; ${cardStyle}`}
    >
      {str(content.title) && (
        <h2
          class={`${titleClasses} text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight`}
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.title)) }}
        />
      )}
      {str(content.text) && (
        <div
          class={`${bodyClasses} mt-6 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light`}
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: markdownBlock(str(content.text)) }}
        />
      )}
      {buttonText && buttonUrl && (
        <div class="flex mt-10">
          <a
            href={buttonUrl}
            {...linkTarget(buttonUrl)}
            class={`group inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-semibold ${buttonBgClasses} ${buttonTextClasses} transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
          >
            <span>{buttonText}</span>
          </a>
        </div>
      )}
    </div>
  );
}
