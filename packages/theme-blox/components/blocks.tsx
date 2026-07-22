/**
 * Landing-page blocks — ports of blox/<id>/block.html and the section
 * wrapper from functions/parse_block_v3.html.
 *
 * Deviation from upstream: author-profile blocks (resume-*) read the
 * profile from the block's `content.author` map (same shape as upstream's
 * data/authors/me.yaml) instead of a content/authors/ page, since Dune
 * templates don't read arbitrary pages.
 */
import { str } from "../utils/blox.ts";
import { CollectionBlock } from "./blocks/collection.tsx";
import { CtaCard } from "./blocks/cta-card.tsx";
import {
  GalleryBlock,
  PortfolioBlock,
  TeamShowcase,
} from "./blocks/adapted.tsx";
import { MapBlock } from "./blocks/map.tsx";
import {
  FaqBlock,
  LogosBlock,
  PricingBlock,
  StatsBlock,
} from "./blocks/interactive.tsx";
import {
  ComparisonTable,
  DevHero,
  HeroBlock,
  StepsBlock,
} from "./blocks/layout-blocks.tsx";
import { MarkdownBlock } from "./blocks/markdown.tsx";
import {
  ResumeAwards,
  ResumeBiography3,
  ResumeExperience,
  ResumeLanguages,
  ResumeSkills,
} from "./blocks/resume.tsx";
import type { BlockContext, BlockDef } from "./blocks/shared.ts";
import {
  ContactInfo,
  CtaButtonList,
  CtaImageParagraph,
  FeaturesBlock,
  FocusAreas,
  TechStack,
  TestimonialsBlock,
} from "./blocks/static.tsx";

export type { BlockContext, BlockDef };

const ALIASES: Record<string, string> = {
  awards: "resume-awards",
  biography: "resume-biography",
  experience: "resume-experience",
  languages: "resume-languages",
  skills: "resume-skills",
  collection: "content-collection",
  "research-areas": "focus-areas",
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
    case "features":
      inner = <FeaturesBlock content={content} design={design} />;
      break;
    case "cta-button-list":
      inner = <CtaButtonList content={content} />;
      break;
    case "testimonials":
      inner = <TestimonialsBlock content={content} />;
      break;
    case "cta-image-paragraph":
      inner = <CtaImageParagraph content={content} />;
      break;
    case "focus-areas":
      inner = <FocusAreas content={content} design={design} />;
      break;
    case "tech-stack":
      inner = <TechStack content={content} design={design} />;
      break;
    case "contact-info":
      inner = <ContactInfo content={content} ctx={ctx} />;
      break;
    case "faq":
      inner = <FaqBlock content={content} />;
      break;
    case "stats":
      inner = <StatsBlock content={content} design={design} />;
      break;
    case "pricing":
      inner = <PricingBlock content={content} />;
      break;
    case "logos":
      inner = <LogosBlock content={content} design={design} />;
      break;
    case "hero":
      inner = <HeroBlock content={content} design={design} />;
      break;
    case "steps":
      inner = <StepsBlock content={content} design={design} />;
      break;
    case "comparison-table":
      inner = <ComparisonTable content={content} design={design} />;
      break;
    case "dev-hero":
      inner = <DevHero content={content} design={design} ctx={ctx} />;
      break;
    case "team-showcase":
      inner = <TeamShowcase content={content} design={design} ctx={ctx} />;
      break;
    case "portfolio":
      inner = <PortfolioBlock content={content} design={design} ctx={ctx} />;
      break;
    case "gallery":
      inner = <GalleryBlock content={content} design={design} />;
      break;
    case "map":
      inner = <MapBlock content={content} design={design} />;
      break;
    default:
      inner = <MarkdownBlock content={content} />;
  }

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
