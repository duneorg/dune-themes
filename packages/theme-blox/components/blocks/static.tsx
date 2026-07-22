/**
 * Static landing blocks — ports of blox/{features,cta-button-list,testimonials,
 * cta-image-paragraph,focus-areas,tech-stack,contact-info}.
 */
import type { ComponentChildren } from "preact";
import { Icon } from "../icon.tsx";
import {
  inlineMarkdown,
  linkTarget,
  markdownBlock,
  str,
  strArr,
} from "../../utils/blox.ts";
import { safeHref } from "../../utils/safe-url.ts";
import { type BlockContext, contentItems } from "./shared.ts";

// ── features ────────────────────────────────────────────────────────────────

function FeatureCard(
  { item, variant = "grid", large = false }: {
    item: Record<string, unknown>;
    variant?: "grid" | "bento";
    large?: boolean;
  },
) {
  const isCard = variant === "bento";
  const wrapperCls = isCard
    ? `relative h-full rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800/50 ${
      large ? "p-8 lg:p-10" : "p-6"
    } hover:ring-primary-300 dark:hover:ring-primary-600 hover:shadow-lg transition-all duration-300 overflow-hidden`
    : "";
  const iconWrapper = large ? "w-14 h-14 lg:w-16 lg:h-16" : "w-11 h-11 lg:w-12 lg:h-12";
  const iconSize = large ? "height:1.75rem;width:auto" : "height:1.4rem;width:auto";
  const titleSize = large ? "text-2xl lg:text-3xl" : isCard ? "text-lg lg:text-xl" : "text-xl";
  const descSize = large ? "text-base lg:text-lg" : "text-sm lg:text-base";
  const icon = str(item.icon);
  const image = safeHref(item.image) ?? (typeof item.image === "string" && item.image.startsWith("/")
    ? item.image
    : "");
  const name = str(item.name);
  const description = str(item.description);

  return (
    <div class={wrapperCls}>
      {icon && (
        <div
          class={`flex justify-center items-center mb-5 ${iconWrapper} rounded-2xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300`}
        >
          <Icon name={icon} class="inline-block" style={iconSize} />
        </div>
      )}
      {name && (
        <h3
          class={`mb-2 ${titleSize} font-bold text-gray-900 dark:text-white tracking-tight`}
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(name) }}
        />
      )}
      {description && (
        <p
          class={`${descSize} text-gray-600 dark:text-gray-400 leading-relaxed`}
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(description) }}
        />
      )}
      {large && image && (
        <div class="mt-6 -mx-2 lg:-mx-4">
          <img
            src={image}
            alt={name}
            class="w-full rounded-xl ring-1 ring-gray-200 dark:ring-gray-700"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

export function FeaturesBlock(
  { content, design }: { content: Record<string, unknown>; design: Record<string, unknown> },
) {
  const items = contentItems(content);
  const layout = str(design.layout).toLowerCase() || "grid";
  const title = str(content.title);
  const subtitle = str(content.subtitle);
  const text = str(content.text);

  return (
    <div class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        {(title || text || subtitle) && (
          <div class="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            {subtitle && (
              <p class="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
                {subtitle}
              </p>
            )}
            {title && (
              <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
              />
            )}
            {text && (
              <p
                class="text-lg text-gray-600 dark:text-gray-400"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }}
              />
            )}
          </div>
        )}

        {items.length > 0 && layout === "bento" && (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 grid-flow-dense auto-rows-fr">
            {items.map((item, idx) => {
              const large = idx === 0;
              return (
                <div key={idx} class={large ? "md:col-span-2 lg:row-span-2" : ""}>
                  <FeatureCard item={item} variant="bento" large={large} />
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 && layout !== "bento" && (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {items.map((item, idx) => <FeatureCard key={idx} item={item} variant="grid" />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ── cta-button-list ─────────────────────────────────────────────────────────

function coerceButtons(raw: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(raw)) {
    return raw.map((item) => {
      if (item && typeof item === "object") return item as Record<string, unknown>;
      if (typeof item === "string") return { url: item };
      return {};
    });
  }
  if (raw && typeof raw === "object") return [raw as Record<string, unknown>];
  if (typeof raw === "string" && raw) return [{ url: raw }];
  return [];
}

export function CtaButtonList({ content }: { content: Record<string, unknown> }) {
  const buttons = coerceButtons(content.buttons);

  return (
    <div class="flex items-center flex-col mx-auto w-full justify-center mt-4 px-8 pb-5">
      {buttons.map((item, idx) => {
        const text = str(item.text) || str(item.label) || str(item.name);
        const url = safeHref(item.url) ?? safeHref(item.link) ?? "";
        const icon = str(item.icon);
        const label = text || url;
        if (!url) return null;
        return (
          <a
            key={idx}
            href={url}
            {...linkTarget(url)}
            class="flex items-center p-1 w-full rounded-md hover:scale-105 transition-all bg-gray-100 mb-3 max-w-3xl"
          >
            <div class="flex text-center w-full">
              <div class="w-10 h-10 text-gray-700">
                {icon && <Icon name={icon} class="rounded-sm" style="height:40px;width:40px" />}
              </div>
              <div
                class="flex justify-center items-center font-semibold w-full text-gray-700 -ml-10"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(label) }}
              />
            </div>
          </a>
        );
      })}
    </div>
  );
}

// ── testimonials ────────────────────────────────────────────────────────────

function Avatar(
  { item, avatarUrl, size = "lg" }: {
    item: Record<string, unknown>;
    avatarUrl: string;
    size?: "lg" | "sm";
  },
) {
  const sizeClass = size === "lg" ? "w-14 h-14" : "w-10 h-10";
  const textSize = size === "lg" ? "text-xl" : "text-base";
  const name = str(item.name);
  const initial = name ? name.trim()[0]!.toUpperCase() : "?";

  if (avatarUrl) {
    return (
      <img
        class={`${sizeClass} rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900/50`}
        src={avatarUrl}
        width={size === "lg" ? 56 : 40}
        height={size === "lg" ? 56 : 40}
        alt={name}
        loading="lazy"
      />
    );
  }

  return (
    <div
      class={`${sizeClass} rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold ${textSize} flex-shrink-0`}
    >
      {initial}
    </div>
  );
}

function testimonialAvatar(item: Record<string, unknown>): string {
  const raw = item.image;
  if (typeof raw !== "string" || !raw) return "";
  return safeHref(raw) ?? (raw.startsWith("/") ? raw : "");
}

function TestimonialFeatured({ item }: { item: Record<string, unknown> }) {
  const avatarUrl = testimonialAvatar(item);
  return (
    <div class="relative max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-10 sm:p-14 shadow-xl ring-1 ring-gray-100 dark:ring-gray-700 overflow-hidden">
      <div
        class="absolute top-6 left-8 text-9xl font-serif font-bold text-primary-100 dark:text-primary-900/30 leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        {"“"}
      </div>
      <blockquote class="relative">
        <p
          class="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: `“${inlineMarkdown(str(item.text))}”` }}
        />
      </blockquote>
      <div class="mt-8 flex items-center gap-4">
        <Avatar item={item} avatarUrl={avatarUrl} size="lg" />
        <div>
          {str(item.name) && (
            <div class="font-semibold text-gray-900 dark:text-white">{str(item.name)}</div>
          )}
          {str(item.role) && (
            <div class="text-sm text-gray-500 dark:text-gray-400">{str(item.role)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ item }: { item: Record<string, unknown> }) {
  const avatarUrl = testimonialAvatar(item);
  return (
    <div class="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700 hover:shadow-md transition-shadow duration-200">
      <blockquote class="flex-1 mb-6">
        <p
          class="text-base text-gray-700 dark:text-gray-300 leading-relaxed"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: `“${inlineMarkdown(str(item.text))}”` }}
        />
      </blockquote>
      <div class="flex items-center gap-3">
        <Avatar item={item} avatarUrl={avatarUrl} size="sm" />
        <div>
          {str(item.name) && (
            <div class="text-sm font-semibold text-gray-900 dark:text-white">{str(item.name)}</div>
          )}
          {str(item.role) && (
            <div class="text-xs text-gray-500 dark:text-gray-400">{str(item.role)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsBlock({ content }: { content: Record<string, unknown> }) {
  const title = str(content.title);
  const text = str(content.text);
  const items = contentItems(content);
  const gridCols = items.length === 1
    ? ""
    : items.length === 2
    ? "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
      {(title || text) && (
        <div class="max-w-screen-md mb-12 lg:mb-16 mx-auto text-center">
          {title && (
            <h2
              class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
            />
          )}
          {text && (
            <p
              class="text-gray-500 sm:text-xl dark:text-gray-400"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }}
            />
          )}
        </div>
      )}
      {items.length === 1
        ? <TestimonialFeatured item={items[0]!} />
        : (
          <div class={gridCols}>
            {items.map((item, idx) => <TestimonialCard key={idx} item={item} />)}
          </div>
        )}
    </div>
  );
}

// ── cta-image-paragraph ─────────────────────────────────────────────────────

const ARROW_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>`;

function itemImageSrc(item: Record<string, unknown>): string {
  const raw = item.image;
  if (typeof raw !== "string" || !raw) return "";
  return safeHref(raw) ?? (raw.startsWith("/") ? raw : "");
}

export function CtaImageParagraph({ content }: { content: Record<string, unknown> }) {
  const items = contentItems(content);

  return (
    <div>
      {items.map((item, idx) => {
        const imageSrc = itemImageSrc(item);
        const isReversed = idx % 2 === 1;
        const button = (item.button && typeof item.button === "object")
          ? item.button as Record<string, unknown>
          : {};
        const buttonUrl = safeHref(button.url) ?? "";
        const buttonText = str(button.text);
        const features = Array.isArray(item.features)
          ? item.features.map((f) => String(f))
          : typeof item.features === "string"
          ? [item.features]
          : [];
        const featureIcon = str(item.feature_icon);

        return (
          <div
            key={idx}
            class={`flex flex-col gap-10 items-center py-10 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ${
              imageSrc ? "md:flex-row md:gap-16" : ""
            } ${isReversed && imageSrc ? "md:flex-row-reverse" : ""}`}
          >
            {imageSrc && (
              <div class="w-full md:w-1/2 flex-shrink-0">
                <div class="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-100 dark:ring-gray-700">
                  <img
                    class="w-full h-auto object-cover"
                    src={imageSrc}
                    alt={str(item.title)}
                  />
                </div>
              </div>
            )}
            <div class="w-full md:w-1/2">
              {str(item.title) && (
                <h2
                  class="mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
                  // deno-lint-ignore react-no-danger
                  dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(item.title)) }}
                />
              )}
              {str(item.text) && (
                <p
                  class="mb-8 text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
                  // deno-lint-ignore react-no-danger
                  dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(item.text)) }}
                />
              )}
              {features.length > 0 && (
                <ul class="space-y-4 mb-8">
                  {features.map((feature, fIdx) => (
                    <li key={fIdx} class="flex items-start gap-3">
                      <span class="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/40">
                        {featureIcon
                          ? (
                            <Icon
                              name={featureIcon}
                              class="text-primary-600 dark:text-primary-400"
                              style="width:0.65rem;height:0.65rem"
                            />
                          )
                          : (
                            <svg
                              class="w-3 h-3 text-primary-600 dark:text-primary-400"
                              fill="currentColor"
                              viewBox="0 0 12 12"
                              aria-hidden="true"
                            >
                              <path d="M10.28 2.28a1 1 0 0 0-1.44 0L4 7.12 3.16 6.28a1 1 0 0 0-1.44 1.44l2 2a1 1 0 0 0 1.44 0l6-6a1 1 0 0 0 0-1.44z" />
                            </svg>
                          )}
                      </span>
                      <span
                        class="text-gray-700 dark:text-gray-300"
                        // deno-lint-ignore react-no-danger
                        dangerouslySetInnerHTML={{ __html: inlineMarkdown(feature) }}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {buttonText && buttonUrl && (
                <a
                  href={buttonUrl}
                  {...linkTarget(buttonUrl)}
                  class="inline-flex items-center gap-2 rounded-full bg-primary-600 text-white px-6 py-3 text-sm font-semibold hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {buttonText}
                  <span
                    class="w-4 h-4 flex-shrink-0"
                    // deno-lint-ignore react-no-danger
                    dangerouslySetInnerHTML={{ __html: ARROW_SVG }}
                  />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── focus-areas ─────────────────────────────────────────────────────────────

function statusClass(status: string): string {
  if (status === "active") return "text-green-600 dark:text-green-400";
  if (status === "emerging") return "text-yellow-600 dark:text-yellow-400";
  if (status === "planning") return "text-blue-600 dark:text-blue-400";
  return "";
}

function titleCase(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function focusMetrics(item: Record<string, unknown>): Array<Record<string, string>> {
  const raw = item.metrics;
  if (Array.isArray(raw)) {
    return raw
      .filter((m): m is Record<string, unknown> => !!m && typeof m === "object")
      .map((m) => ({
        icon: str(m.icon),
        value: str(m.value),
        label: str(m.label),
      }))
      .filter((m) => m.value || m.label)
      .slice(0, 3);
  }
  const out: Array<Record<string, string>> = [];
  const team = str(item.team_size).replace(/ researchers/g, "");
  const pubs = str(item.publications).replace(/ papers/g, "");
  const funding = str(item.funding);
  if (team) out.push({ icon: "hero/user-group", value: team, label: "team" });
  if (pubs) out.push({ icon: "hero/document-text", value: pubs, label: "papers" });
  if (funding) out.push({ icon: "hero/currency-dollar", value: funding, label: "funding" });
  return out.slice(0, 3);
}

function FocusCard({ item }: { item: Record<string, unknown> }) {
  const name = str(item.name);
  const description = str(item.description);
  const icon = str(item.icon) || str(item.emoji);
  const image = itemImageSrc(item);
  const gradient = str(item.gradient) || "from-primary-400 to-secondary-400";
  const itemUrl = safeHref(item.url) ?? "";
  const status = str(item.status).toLowerCase();
  const topics = strArr(item.topics);
  const metrics = focusMetrics(item);
  const cta = (item.cta && typeof item.cta === "object")
    ? item.cta as Record<string, unknown>
    : {};
  const ctaUrl = safeHref(cta.url) ?? "";
  const ctaText = str(cta.text);

  let header: ComponentChildren = null;
  if (image) {
    header = (
      <img
        src={image}
        alt={name}
        class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
      />
    );
  } else if (icon) {
    header = (
      <div class="absolute inset-0 flex items-center justify-center">
        <Icon
          name={icon}
          class="w-24 h-24 text-white/80 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    );
  }

  return (
    <div class="group relative">
      <div class="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col">
        {ctaUrl && header
          ? (
            <a
              href={ctaUrl}
              {...linkTarget(ctaUrl)}
              class={`block relative h-48 bg-gradient-to-br ${gradient} overflow-hidden`}
            >
              {header}
            </a>
          )
          : (
            <div class={`relative h-48 bg-gradient-to-br ${gradient} overflow-hidden`}>
              {header}
            </div>
          )}

        {status && (
          <div class="absolute top-4 right-4 z-10">
            <span
              class={`px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs font-semibold rounded-full ${statusClass(status)}`}
            >
              {titleCase(status)}
            </span>
          </div>
        )}

        <div class="flex flex-col flex-1 p-6">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {itemUrl
                ? (
                  <a
                    href={itemUrl}
                    {...linkTarget(itemUrl)}
                    class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {name}
                    <Icon
                      name="hero/arrow-top-right-on-square"
                      class="inline-block w-4 h-4 ml-1"
                    />
                  </a>
                )
                : name}
            </h3>
            {description && (
              <p
                class="text-gray-600 dark:text-gray-400 mb-4"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: markdownBlock(description) }}
              />
            )}
            {topics.length > 0 && (
              <div class="flex flex-wrap gap-2 mb-6">
                {topics.slice(0, 3).map((topic) => (
                  <span class="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                    {topic}
                  </span>
                ))}
                {topics.length > 3 && (
                  <span class="inline-block px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                    +{topics.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          <div class="mt-auto">
            {metrics.length > 0 && (
              <div class="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mb-4">
                {metrics.map((m) => (
                  <div class="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
                    {m.icon && <Icon name={m.icon} class="w-4 h-4 mx-auto mb-1" />}
                    {m.value && <span class="text-xs leading-tight">{m.value}</span>}
                    {m.label && <span class="text-xs text-gray-400">{m.label}</span>}
                  </div>
                ))}
              </div>
            )}
            {ctaUrl && ctaText && (
              <a
                href={ctaUrl}
                {...linkTarget(ctaUrl)}
                class="inline-flex items-center w-full justify-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300"
              >
                {ctaText}
                <Icon name="hero/arrow-right" class="ml-1 w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FocusAreas(
  { content, design }: { content: Record<string, unknown>; design: Record<string, unknown> },
) {
  const layoutRaw = str(design.layout).toLowerCase();
  const layout = ["cards", "hexagon", "timeline"].includes(layoutRaw) ? layoutRaw : "cards";
  const title = str(content.title);
  const subtitle = str(content.subtitle);
  const text = str(content.text);
  const items = contentItems(content).filter((i) => str(i.name) || str(i.description));
  const cta = (content.cta && typeof content.cta === "object")
    ? content.cta as Record<string, unknown>
    : {};
  const ctaUrl = safeHref(cta.url) ?? "";
  const ctaText = str(cta.text);
  const ctaIcon = str(cta.icon);

  return (
    <div class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          {title && (
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
            />
          )}
          {subtitle && (
            <p
              class="text-xl text-primary-600 dark:text-primary-400 font-medium mb-3"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(subtitle) }}
            />
          )}
          {text && (
            <p
              class="text-lg text-gray-600 dark:text-gray-400"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }}
            />
          )}
        </div>

        {layout === "cards" && (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {items.map((item, idx) => <FocusCard key={idx} item={item} />)}
          </div>
        )}

        {layout === "hexagon" && (
          <>
            <div class="flex flex-wrap justify-center gap-8 lg:gap-4">
              {items.map((item, idx) => {
                const gradient = str(item.gradient) || "from-primary-400 to-secondary-400";
                const icon = str(item.icon) || str(item.emoji);
                const desc = str(item.description);
                return (
                  <div key={idx} class="hexagon-container group">
                    <div
                      class={`hexagon bg-gradient-to-br ${gradient} shadow-xl hover:shadow-2xl transition-all duration-300`}
                    >
                      <div class="hexagon-content">
                        {icon && <Icon name={icon} class="w-12 h-12 text-white mb-3" />}
                        <h3 class="text-lg font-bold text-white mb-2">{str(item.name)}</h3>
                        <p class="text-white/90 text-sm">
                          {desc.length > 60 ? desc.slice(0, 60) + "…" : desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <style>
              {`.hexagon-container{position:relative;width:200px;height:200px;margin:30px}
.hexagon{position:absolute;width:100%;height:100%;clip-path:polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%);display:flex;align-items:center;justify-content:center;transition:transform .3s ease}
.hexagon:hover{transform:scale(1.05)}
.hexagon-content{text-align:center;padding:20px}
@media(max-width:768px){.hexagon-container{width:150px;height:150px}}`}
            </style>
          </>
        )}

        {layout === "timeline" && (
          <div class="relative">
            <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-400 to-secondary-400">
            </div>
            <div class="space-y-12">
              {items.map((item, idx) => {
                const icon = str(item.icon) || str(item.emoji);
                return (
                  <div
                    key={idx}
                    class={`relative flex items-center ${
                      idx % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div class="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-gray-800 border-4 border-primary-500 rounded-full z-10">
                    </div>
                    <div class={`w-5/12 ${idx % 2 === 1 ? "mr-auto" : ""}`}>
                      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div class="flex items-center gap-3 mb-3">
                          {icon && (
                            <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
                              <Icon
                                name={icon}
                                class="w-5 h-5 text-primary-600 dark:text-primary-400"
                              />
                            </div>
                          )}
                          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                            {str(item.name)}
                          </h3>
                        </div>
                        <p
                          class="text-gray-600 dark:text-gray-400"
                          // deno-lint-ignore react-no-danger
                          dangerouslySetInnerHTML={{
                            __html: markdownBlock(str(item.description)),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {ctaUrl && ctaText && (
          <div class="mt-12 text-center">
            <a
              href={ctaUrl}
              {...linkTarget(ctaUrl)}
              class="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-300"
            >
              {ctaText}
              {ctaIcon && <Icon name={ctaIcon} class="ml-2 w-5 h-5" />}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ── tech-stack ──────────────────────────────────────────────────────────────

function levelStyle(level: string): { width: string; color: string } {
  switch (level) {
    case "expert":
      return { width: "100%", color: "bg-emerald-500" };
    case "advanced":
      return { width: "75%", color: "bg-primary-500" };
    case "intermediate":
      return { width: "50%", color: "bg-amber-500" };
    case "beginner":
      return { width: "25%", color: "bg-gray-400" };
    default:
      return { width: "0%", color: "bg-gray-500" };
  }
}

function techCategories(content: Record<string, unknown>): Array<{
  name: string;
  items: Array<{ name: string; icon: string; level: string }>;
}> {
  const raw = content.categories;
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object"
    ? [raw]
    : [];
  return list
    .filter((c): c is Record<string, unknown> => !!c && typeof c === "object")
    .map((cat) => {
      const itemsRaw = cat.items;
      const itemsList = Array.isArray(itemsRaw)
        ? itemsRaw
        : itemsRaw && typeof itemsRaw === "object"
        ? [itemsRaw]
        : [];
      const items = itemsList
        .filter((i): i is Record<string, unknown> => !!i && typeof i === "object")
        .map((i) => ({
          name: str(i.name),
          icon: str(i.icon),
          level: str(i.level).toLowerCase(),
        }))
        .filter((i) => i.name);
      return { name: str(cat.name), items };
    })
    .filter((c) => c.items.length > 0);
}

export function TechStack(
  { content, design }: { content: Record<string, unknown>; design: Record<string, unknown> },
) {
  const styleRaw = str(design.style).toLowerCase();
  const style = styleRaw === "list" ? "list" : "grid";
  const showLevels = design.show_levels === true;
  const title = str(content.title);
  const subtitle = str(content.subtitle);
  const categories = techCategories(content);

  return (
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        {title && (
          <h2
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
          />
        )}
        {subtitle && (
          <p
            class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(subtitle) }}
          />
        )}
      </div>

      {style !== "list" && (
        <div class="space-y-12">
          {categories.map((cat, cIdx) => (
            <div key={cIdx}>
              {cat.name && (
                <h3 class="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-6 flex items-center justify-center gap-4">
                  <span class="h-px w-12 bg-gradient-to-r from-transparent to-primary-500/50"></span>
                  <span>{cat.name}</span>
                  <span class="h-px w-12 bg-gradient-to-l from-transparent to-primary-500/50"></span>
                </h3>
              )}
              <div class="flex flex-wrap justify-center gap-4">
                {cat.items.map((item, idx) => {
                  const ls = levelStyle(item.level);
                  return (
                    <div
                      key={idx}
                      class="group relative w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(25%-0.75rem)] lg:w-[140px] bg-gray-50 dark:bg-white/[0.03] backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/[0.06] p-4 hover:bg-gray-100 dark:hover:bg-white/[0.06] hover:border-primary-300 dark:hover:border-primary-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5"
                    >
                      <div class="flex flex-col items-center text-center">
                        {item.icon && (
                          <div class="w-12 h-12 mb-3 flex items-center justify-center transition-all duration-300">
                            <Icon name={item.icon} class="w-10 h-10" />
                          </div>
                        )}
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {item.name}
                        </span>
                        {showLevels && item.level && (
                          <div class="mt-2 w-full">
                            <div class="h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                              <div
                                class={`h-full ${ls.color} rounded-full transition-all duration-500`}
                                style={`width: ${ls.width}`}
                              >
                              </div>
                            </div>
                            <span class="text-xs text-gray-500 mt-1 capitalize">{item.level}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {style === "list" && (
        <div class="flex flex-wrap justify-center gap-3 mt-8">
          {categories.flatMap((cat) =>
            cat.items.map((tech, idx) => (
              <div
                key={`${cat.name}-${idx}`}
                class="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/[0.03] backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/[0.08] hover:border-primary-300 dark:hover:border-primary-500/30 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-300"
              >
                {tech.icon && (
                  <span class="text-gray-600 dark:text-gray-400">
                    <Icon name={tech.icon} class="w-5 h-5" />
                  </span>
                )}
                <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{tech.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ── contact-info ────────────────────────────────────────────────────────────

function coerceSocial(raw: unknown): Array<{ url: string; icon: string; label: string }> {
  if (Array.isArray(raw)) {
    return raw.flatMap((item) => {
      if (item && typeof item === "object") {
        const m = item as Record<string, unknown>;
        const url = safeHref(m.url) ?? safeHref(m.link) ?? "";
        if (!url) return [];
        return [{
          url,
          icon: str(m.icon) || "hero/link",
          label: str(m.label) || str(m.name),
        }];
      }
      if (typeof item === "string") {
        const url = safeHref(item);
        return url ? [{ url, icon: "hero/link", label: "" }] : [];
      }
      return [];
    });
  }
  if (typeof raw === "string") {
    const url = safeHref(raw);
    return url ? [{ url, icon: "hero/link", label: "" }] : [];
  }
  return [];
}

export function ContactInfo(
  { content, ctx }: { content: Record<string, unknown>; ctx: BlockContext },
) {
  const { t } = ctx;
  const title = str(content.title) || t("block_contact_title");
  const subtitle = str(content.subtitle);
  const visitTitle = str(content.visit_title) || t("block_contact_visit_title");
  const connectTitleRaw = str(content.connect_title);
  const connectTitleStandard = connectTitleRaw || t("block_contact_connect_title");
  const connectTitleSingle = connectTitleRaw || t("block_contact_connect_title_single");
  const connectText = str(content.text) || t("block_contact_default_text");

  const addressRaw = content.address;
  let addressLines: string[] = [];
  if (addressRaw && typeof addressRaw === "object" && !Array.isArray(addressRaw)) {
    addressLines = strArr((addressRaw as Record<string, unknown>).lines);
  } else if (typeof addressRaw === "string" && addressRaw.trim()) {
    addressLines = [addressRaw.trim()];
  }
  const officeHours = strArr(content.office_hours);
  const mapUrl = safeHref(content.map_url) ?? "";
  const mapEmbed = safeHref(content.map_embed) ?? "";
  const email = str(content.email);
  const phone = str(content.phone);
  const social = coerceSocial(content.social).filter((s) =>
    !(email && s.url.toLowerCase().startsWith("mailto:"))
  );

  const prospective = (content.prospective && typeof content.prospective === "object")
    ? content.prospective as Record<string, unknown>
    : {};
  const prospectiveTitle = str(prospective.title);
  const prospectiveText = str(prospective.text);
  const prospectiveButton = (prospective.button && typeof prospective.button === "object")
    ? prospective.button as Record<string, unknown>
    : {};
  const prospectiveButtonText = str(prospectiveButton.text);
  const prospectiveButtonUrl = safeHref(prospectiveButton.url) ?? "";

  const hasVisit = addressLines.length > 0 || officeHours.length > 0 || !!mapUrl;
  const hasConnect = !!(
    email || phone || social.length > 0 || prospectiveTitle || prospectiveText ||
    prospectiveButtonText || prospectiveButtonUrl
  );
  const isSingleCard = (hasVisit && !hasConnect) || (hasConnect && !hasVisit);
  const gridClass = isSingleCard ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2";
  const cardMaxWidth = isSingleCard ? "max-w-3xl mx-auto" : "";

  const formAction = safeHref(content.form_action) ?? "";
  const showForm = (content.show_form === true || !!str(content.form_action)) && !!formAction;

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div class="text-center mb-12">
        {title && (
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
          />
        )}
        {subtitle && (
          <p
            class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(subtitle) }}
          />
        )}
      </div>

      <div class={`grid ${gridClass} gap-8 lg:gap-12`}>
        {hasVisit && (
          <div
            class={`${cardMaxWidth} bg-white dark:bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/[0.08] p-8 hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:border-primary-300 dark:hover:border-primary-500/30 transition-all duration-300`}
          >
            <div class="flex items-center mb-6">
              <div class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-500/10 rounded-full flex items-center justify-center border border-primary-200 dark:border-primary-500/20">
                <Icon
                  name="hero/map-pin"
                  class="w-6 h-6 text-primary-600 dark:text-primary-400"
                />
              </div>
              <h3 class="ml-4 text-2xl font-bold text-gray-900 dark:text-white">{visitTitle}</h3>
            </div>
            <div class="space-y-4">
              {addressLines.length > 0 && (
                <div class="text-gray-600 dark:text-gray-300">
                  {addressLines.map((line) => <p>{line}</p>)}
                </div>
              )}
              {officeHours.length > 0 && (
                <div class="pt-4 border-t border-gray-200 dark:border-white/10">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                    {t("block_contact_office_hours")}
                  </h4>
                  <div class="text-gray-600 dark:text-gray-300 space-y-1">
                    {officeHours.map((line) => <p>{line}</p>)}
                  </div>
                </div>
              )}
              {mapUrl && (
                <a
                  href={mapUrl}
                  {...linkTarget(mapUrl)}
                  class="inline-flex items-center mt-4 px-4 py-2 bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 rounded-lg border border-primary-200 dark:border-primary-500/20 hover:bg-primary-200 dark:hover:bg-primary-500/20 hover:border-primary-300 dark:hover:border-primary-500/40 transition-all"
                >
                  <Icon name="hero/map" class="w-5 h-5 mr-2" />
                  {t("block_contact_view_on_map")}
                </a>
              )}
            </div>
          </div>
        )}

        {hasConnect && (
          <div
            class={`${cardMaxWidth} bg-white dark:bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/[0.08] p-8 lg:p-10 hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:border-primary-300 dark:hover:border-primary-500/30 transition-all duration-300`}
          >
            {isSingleCard
              ? (
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {connectTitleSingle}
                      </h3>
                      <p class="text-gray-600 dark:text-gray-400">{connectText}</p>
                    </div>
                    {email && (
                      <>
                        <a href={`mailto:${email}`} class="group flex items-center gap-3 text-left">
                          <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 group-hover:bg-primary-200 dark:group-hover:bg-primary-500/20 transition-all">
                            <Icon
                              name="hero/envelope"
                              class="w-6 h-6 text-primary-600 dark:text-primary-400"
                            />
                          </div>
                          <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {email}
                            </p>
                          </div>
                        </a>
                        <a
                          href={`mailto:${email}`}
                          class="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
                        >
                          <Icon name="hero/paper-airplane" class="w-5 h-5 mr-2" />
                          Send a message
                        </a>
                      </>
                    )}
                    {phone && (
                      <a href={`tel:${phone}`} class="flex items-center group">
                        <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 group-hover:bg-primary-200 dark:group-hover:bg-primary-500/20 transition-all mr-3">
                          <Icon
                            name="hero/phone"
                            class="w-6 h-6 text-primary-600 dark:text-primary-400"
                          />
                        </div>
                        <div>
                          <p class="text-sm text-gray-500 dark:text-gray-400">Call me</p>
                          <p class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {phone}
                          </p>
                        </div>
                      </a>
                    )}
                  </div>
                  {social.length > 0 && (
                    <div class="flex flex-col justify-center items-center md:items-start">
                      <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-5">
                        {t("block_contact_follow_me")}
                      </h4>
                      <div class="flex flex-wrap gap-4">
                        {social.map((s) => (
                          <a
                            href={s.url}
                            {...linkTarget(s.url)}
                            class="group flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:border-primary-300 dark:hover:border-primary-500/40 hover:scale-110 transition-all duration-300"
                            title={s.label || undefined}
                          >
                            <div class="text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              <Icon name={s.icon} class="w-7 h-7" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
              : (
                <>
                  <div class="flex items-center mb-6">
                    <div class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-500/10 rounded-full flex items-center justify-center border border-primary-200 dark:border-primary-500/20">
                      <Icon
                        name="hero/chat-bubble-left-right"
                        class="w-6 h-6 text-primary-600 dark:text-primary-400"
                      />
                    </div>
                    <h3 class="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
                      {connectTitleStandard}
                    </h3>
                  </div>
                  <div class="space-y-4">
                    <div class="space-y-3">
                      {email && (
                        <a
                          href={`mailto:${email}`}
                          class="flex items-center group p-3 -mx-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                          <div class="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mr-4">
                            <Icon
                              name="hero/envelope"
                              class="w-5 h-5 text-primary-600 dark:text-primary-400"
                            />
                          </div>
                          <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p class="text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {email}
                            </p>
                          </div>
                        </a>
                      )}
                      {phone && (
                        <a
                          href={`tel:${phone}`}
                          class="flex items-center group p-3 -mx-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                          <div class="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 mr-4">
                            <Icon
                              name="hero/phone"
                              class="w-5 h-5 text-primary-600 dark:text-primary-400"
                            />
                          </div>
                          <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                            <p class="text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {phone}
                            </p>
                          </div>
                        </a>
                      )}
                      {social.length > 0 && (
                        <div class="pt-4 border-t border-gray-200 dark:border-white/10">
                          <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                            {t("block_contact_follow_me")}
                          </h4>
                          <div class="flex flex-wrap gap-3">
                            {social.map((s) => (
                              <a
                                href={s.url}
                                {...linkTarget(s.url)}
                                class="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:border-primary-300 dark:hover:border-primary-500/40 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                                title={s.label || undefined}
                              >
                                <Icon name={s.icon} class="w-5 h-5" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

            {(prospectiveTitle || prospectiveText || prospectiveButtonText ||
              prospectiveButtonUrl) && (
              <div class="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  {prospectiveTitle || t("block_contact_prospective_title")}
                </h4>
                {prospectiveText && (
                  <p class="text-gray-600 dark:text-gray-300 mb-4">{prospectiveText}</p>
                )}
                {prospectiveButtonText && prospectiveButtonUrl && (
                  <a
                    href={prospectiveButtonUrl}
                    {...linkTarget(prospectiveButtonUrl)}
                    class="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
                  >
                    <Icon name="hero/user-plus" class="w-5 h-5 mr-2" />
                    {prospectiveButtonText}
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {mapEmbed && (
        <div class="mt-12 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08]">
          <div class="aspect-video">
            <iframe
              src={mapEmbed}
              class="w-full h-full border-0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title={t("block_contact_view_on_map")}
            />
          </div>
        </div>
      )}

      {showForm && (
        <div class="mt-12 max-w-2xl mx-auto">
          <div class="bg-white dark:bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/[0.08] p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("block_contact_form_title")}
            </h3>
            <form action={formAction} method="POST" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                  >
                    {t("block_contact_form_name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                  />
                </div>
                <div>
                  <label
                    for="form-email"
                    class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                  >
                    {t("block_contact_form_email")}
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    required
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label
                  for="subject"
                  class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                >
                  {t("block_contact_form_subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                />
              </div>
              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                >
                  {t("block_contact_form_message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                class="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
              >
                {t("block_contact_form_submit")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
