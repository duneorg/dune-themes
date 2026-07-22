/**
 * Layout blocks — ports of hero, steps, comparison-table, and dev-hero.
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
import type { BlockContext } from "./shared.ts";

// ── Shared helpers ──────────────────────────────────────────────────────────

const HIGHLIGHT_CLS =
  "bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 bg-clip-text text-transparent";

function renderTitle(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\[([^\]]+)\](?!\()/g, `<span class="${HIGHLIGHT_CLS}">$1</span>`)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

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

// ── hero ────────────────────────────────────────────────────────────────────

const ACTION_STYLES: Record<string, string> = {
  gradient:
    "rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:from-primary-500 hover:to-secondary-500 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
  solid:
    "rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
  outline:
    "rounded-full px-6 py-3 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors",
  ghost:
    "rounded-full px-6 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors",
  text:
    "text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors",
};

const SIZE_CLASSES: Record<string, string> = {
  compact: "py-16 sm:py-20 lg:py-24",
  default: "py-24 sm:py-32 lg:py-40",
  tall: "py-32 sm:py-48 lg:py-56",
  viewport: "min-h-screen flex flex-col justify-center py-16",
  none: "",
};

const LAYOUTS: Record<string, { container: string; grid: boolean; stacked: boolean; reverse: boolean }> = {
  centered: { container: "max-w-2xl", grid: false, stacked: false, reverse: false },
  "split-left": { container: "max-w-7xl", grid: true, stacked: false, reverse: false },
  "split-right": { container: "max-w-7xl", grid: true, stacked: false, reverse: true },
  stacked: { container: "max-w-6xl", grid: false, stacked: true, reverse: false },
};

const BADGE_COLORS: Record<string, string> = {
  primary: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

const STAR_FULL =
  `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 0 0-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69L9.05 2.927Z"/></svg>`;
const STAR_EMPTY =
  `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linejoin="round" d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 0 0-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69L9.05 2.927Z"/></svg>`;

function ActionButton(
  { action, defaultStyle }: { action: Record<string, unknown>; defaultStyle: string },
) {
  const href = safeHref(action.url);
  const text = str(action.text);
  if (!href || !text) return null;
  const styleKey = ACTION_STYLES[str(action.style)] ? str(action.style) : defaultStyle;
  const cls = ACTION_STYLES[styleKey] ?? ACTION_STYLES[defaultStyle];
  const icon = str(action.icon);
  const showTextArrow = styleKey === "text" && !icon;

  return (
    <a href={href} {...linkTarget(href)} class={`inline-flex items-center gap-2 ${cls}`}>
      <span
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }}
      />
      {icon && <Icon name={icon} class="inline-block" style="height: 1em;" />}
      {showTextArrow && <span aria-hidden="true">→</span>}
    </a>
  );
}

function StarStrip({ stars }: { stars: unknown }) {
  const n = Math.max(0, Math.min(5, Number(stars) || 0));
  const full = Math.floor(n);
  return (
    <div class="inline-flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          class="w-5 h-5 inline-block"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: i < full ? STAR_FULL : STAR_EMPTY }}
        />
      ))}
    </div>
  );
}

function HeroMedia({ media }: { media: Record<string, unknown> }) {
  const type = str(media.type) || "image";
  const src = str(media.src);
  const darkSrc = str(media.dark_src);
  const alt = str(media.alt);

  if (type === "video" && src) {
    return (
      <div class="relative">
        <video
          src={src}
          poster={str(media.poster) || undefined}
          autoplay={media.autoplay !== false}
          loop={media.loop !== false}
          muted={media.muted !== false}
          playsInline
          class="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10"
        />
      </div>
    );
  }

  if (!src) return null;
  return (
    <div class="relative">
      <img
        src={src}
        alt={alt}
        loading="eager"
        class={`w-full h-auto rounded-2xl shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 ${
          darkSrc ? "block dark:hidden" : ""
        }`}
      />
      {darkSrc && (
        <img
          src={darkSrc}
          alt={alt}
          loading="eager"
          class="hidden dark:block w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/10"
        />
      )}
    </div>
  );
}

export function HeroBlock(
  { content, design }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
  },
) {
  const sizeKey = SIZE_CLASSES[str(design.size)]
    ? str(design.size)
    : design.no_padding
    ? "none"
    : "default";
  const sizeClasses = SIZE_CLASSES[sizeKey] ?? SIZE_CLASSES.default;

  const layoutKey = LAYOUTS[str(design.layout)] ? str(design.layout) : "stacked";
  const layout = LAYOUTS[layoutKey] ?? LAYOUTS.stacked;

  const alignKey = str(design.alignment) === "left" || str(design.alignment) === "center"
    ? str(design.alignment)
    : layout.grid
    ? "left"
    : "center";
  const textAlign = alignKey === "left" ? "text-left" : "text-center";
  const flexAlign = alignKey === "left" ? "justify-start" : "justify-center";
  const mxAuto = alignKey === "left" ? "" : "mx-auto";

  const announcement = asMap(content.announcement);
  const badge = asMap(announcement.badge);
  const annLink = asMap(announcement.link);
  const annHref = safeHref(annLink.url);
  const badgeCls = BADGE_COLORS[str(badge.color)] ?? BADGE_COLORS.primary;

  const trust = asMap(content.trust);
  const primary = asMap(content.primary_action);
  const secondary = asMap(content.secondary_action);
  const media = asMap(content.media);
  const bg = asMap(design.background);
  const bgClass = str(bg.css_class) || str(design.css_class);
  const bgStyle = str(bg.css_style) || (typeof bg.color === "string" ? `background-color: ${bg.color};` : "");

  const contentStack = (
    <>
      {str(announcement.text) && (
        <div
          class={`hidden sm:mb-8 sm:flex ${alignKey === "left" ? "sm:justify-start" : "sm:justify-center"}`}
        >
          <div class="relative flex items-center gap-2 rounded-full pl-1 pr-4 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-300/30 hover:ring-gray-900/20 dark:hover:ring-gray-300/50 transition-all">
            {str(badge.text)
              ? <span class={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeCls}`}>{str(badge.text)}</span>
              : <span class="pl-2" />}
            <span
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(announcement.text)) }}
            />
            {str(annLink.text) && annHref && (
              <a href={annHref} {...linkTarget(annHref)} class="font-semibold text-primary-600 dark:text-primary-300">
                <span class="absolute inset-0" aria-hidden="true" />
                {str(annLink.text)} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      )}
      <div class={textAlign}>
        {str(content.eyebrow) && (
          <p
            class="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.eyebrow)) }}
          />
        )}
        {str(content.title) && (
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: renderTitle(str(content.title)) }}
          />
        )}
        {str(content.text) && (
          <p
            class={`mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl ${mxAuto}`}
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.text)) }}
          />
        )}
        {(safeHref(primary.url) || safeHref(secondary.url)) && (
          <div class={`mt-10 flex items-center ${flexAlign} gap-x-6 flex-wrap gap-y-3`}>
            <ActionButton action={primary} defaultStyle="gradient" />
            <ActionButton action={secondary} defaultStyle="text" />
          </div>
        )}
        {(trust.stars != null || str(trust.text)) && (
          <div class={`mt-8 flex items-center ${flexAlign} gap-3 flex-wrap`}>
            {trust.stars != null && <StarStrip stars={trust.stars} />}
            {str(trust.text) && (
              <span
                class="text-sm text-gray-600 dark:text-gray-400"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(trust.text)) }}
              />
            )}
          </div>
        )}
      </div>
    </>
  );

  const mediaEl = str(media.src) || str(media.type) === "video"
    ? <HeroMedia media={media} />
    : null;

  const wrap = (inner: ComponentChildren) => (
    <div class={`relative isolate px-6 lg:px-8 ${bgClass}`} style={bgStyle || undefined}>
      <div class={`mx-auto ${layout.container} ${sizeClasses}`}>{inner}</div>
    </div>
  );

  if (layout.grid) {
    return wrap(
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class={layout.reverse ? "lg:order-2" : ""}>{contentStack}</div>
        {mediaEl && <div class={layout.reverse ? "lg:order-1" : ""}>{mediaEl}</div>}
      </div>,
    );
  }

  if (layout.stacked) {
    return wrap(
      <>
        <div class="mx-auto max-w-3xl">{contentStack}</div>
        {mediaEl && <div class="mt-16">{mediaEl}</div>}
      </>,
    );
  }

  return wrap(contentStack);
}

// ── steps ───────────────────────────────────────────────────────────────────

function toRoman(n: number): string {
  const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let r = "";
  let rem = n;
  vals.forEach((v, i) => {
    while (rem >= v) {
      r += syms[i];
      rem -= v;
    }
  });
  return r;
}

function markerLabel(idx: number, numbering: string): string {
  const n = idx + 1;
  if (numbering === "roman") return toRoman(n);
  if (numbering === "alpha") return String.fromCharCode(64 + n);
  if (numbering === "padded") return String(n).padStart(2, "0");
  return String(n);
}

function StepMarker(
  { idx, icon, markerStyle, numbering, size = "sm" }: {
    idx: number;
    icon: string;
    markerStyle: string;
    numbering: string;
    size?: "sm" | "lg";
  },
) {
  if (markerStyle === "dot") {
    return <div class="w-3.5 h-3.5 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0 mt-1.5" />;
  }

  if (markerStyle === "icon" && icon && size === "lg") {
    return (
      <div class="w-14 h-14 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
        <Icon name={icon} class="inline-block" style="height:2.5rem;width:auto" />
      </div>
    );
  }

  const dim = size === "lg" ? "w-14 h-14 text-base" : "w-10 h-10 text-sm";
  const iconH = size === "lg" ? "1.75rem" : "1.25rem";
  const base = `${dim} flex items-center justify-center rounded-full flex-shrink-0 font-bold`;

  if (markerStyle === "icon" && icon) {
    return (
      <div class={`${base} bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300`}>
        <Icon name={icon} class="inline-block" style={`height:${iconH};width:auto`} />
      </div>
    );
  }

  return (
    <div class={`${base} bg-primary-600 dark:bg-primary-500 text-white`}>
      {markerLabel(idx, numbering)}
    </div>
  );
}

function StepBody({ step }: { step: Record<string, unknown> }) {
  const cta = asMap(step.cta);
  const ctaHref = safeHref(cta.url);
  const img = str(step.image) || str(step.img) || str(asMap(step.image).src);

  return (
    <>
      {(str(step.badge) || str(step.date)) && (
        <div class="flex items-center gap-2 mb-2">
          {str(step.date) && (
            <span class="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              {str(step.date)}
            </span>
          )}
          {str(step.badge) && (
            <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300">
              {str(step.badge)}
            </span>
          )}
        </div>
      )}
      {str(step.title) && (
        <h3
          class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(step.title)) }}
        />
      )}
      {str(step.text) && (
        <p
          class="text-gray-500 dark:text-gray-400 leading-relaxed"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(step.text)) }}
        />
      )}
      {img && (
        <img
          src={img}
          alt={str(step.title) || ""}
          class="mt-4 rounded-xl shadow-sm w-full object-cover max-h-60"
        />
      )}
      {str(cta.text) && ctaHref && (
        <a
          href={ctaHref}
          {...linkTarget(ctaHref)}
          class="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          {str(cta.text)}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </>
  );
}

export function StepsBlock(
  { content, design }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
  },
) {
  const steps = asMaps(content.items).length ? asMaps(content.items) : asMaps(content.steps);
  const layout = str(design.layout) || "vertical";
  const markerStyle = str(design.marker_style) || "number";
  const numbering = str(design.numbering) || "decimal";
  const connector = str(design.connector) || "line";
  const isDashed = connector === "dashed";
  const isCentered = layout === "horizontal" || layout === "timeline";
  const maxW = layout === "horizontal" ? "max-w-5xl" : layout === "timeline" ? "max-w-4xl" : "max-w-2xl";

  return (
    <div class="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class={`mx-auto ${maxW}`}>
        {(str(content.title) || str(content.subtitle) || str(content.text)) && (
          <div class={`mb-10 sm:mb-14 ${isCentered ? "text-center" : ""}`}>
            {str(content.subtitle) && (
              <p class="text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
                {str(content.subtitle)}
              </p>
            )}
            {str(content.title) && (
              <h2
                class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-3"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.title)) }}
              />
            )}
            {str(content.text) && (
              <p
                class={`text-lg text-gray-500 dark:text-gray-400 ${isCentered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.text)) }}
              />
            )}
          </div>
        )}

        {layout === "horizontal"
          ? (
            <>
              <ol class="sm:hidden space-y-8">
                {steps.map((step, i) => (
                  <li key={i} class="step-item flex gap-4 items-start">
                    <StepMarker
                      idx={i}
                      icon={str(step.icon)}
                      markerStyle={markerStyle}
                      numbering={numbering}
                    />
                    <div class="pt-0.5 flex-1 min-w-0">
                      <StepBody step={step} />
                    </div>
                  </li>
                ))}
              </ol>
              <div class="hidden sm:block">
                <div class="relative flex justify-around mb-6">
                  {connector !== "none" && (
                    <div
                      class={`absolute top-7 left-7 right-7 h-0.5 ${
                        isDashed
                          ? "border-t-2 border-dashed border-gray-200 dark:border-gray-700"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                  {steps.map((step, i) => (
                    <div key={i} class="step-item relative z-10 flex flex-col items-center">
                      <StepMarker
                        idx={i}
                        icon={str(step.icon)}
                        markerStyle={markerStyle}
                        numbering={numbering}
                        size="lg"
                      />
                    </div>
                  ))}
                </div>
                <div class="flex">
                  {steps.map((step, i) => {
                    const cta = asMap(step.cta);
                    const ctaHref = safeHref(cta.url);
                    return (
                      <div key={i} class="flex-1 text-center px-3">
                        {str(step.badge) && (
                          <span class="inline-block mb-1.5 px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300">
                            {str(step.badge)}
                          </span>
                        )}
                        {str(step.title) && (
                          <h3
                            class="text-base font-bold text-gray-900 dark:text-white mb-1.5"
                            // deno-lint-ignore react-no-danger
                            dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(step.title)) }}
                          />
                        )}
                        {str(step.text) && (
                          <p
                            class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
                            // deno-lint-ignore react-no-danger
                            dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(step.text)) }}
                          />
                        )}
                        {str(cta.text) && ctaHref && (
                          <a
                            href={ctaHref}
                            {...linkTarget(ctaHref)}
                            class="inline-flex items-center justify-center gap-1 mt-2 text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
                          >
                            {str(cta.text)} →
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )
          : layout === "timeline"
          ? (
            <div class="relative">
              <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2 hidden md:block" />
              <ol class="space-y-10 md:space-y-12">
                {steps.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  const cta = asMap(step.cta);
                  const ctaHref = safeHref(cta.url);
                  const img = str(step.image) || str(step.img) || str(asMap(step.image).src);
                  return (
                    <li
                      key={i}
                      class={`step-item flex items-start gap-4 md:gap-0 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div class={`flex-1 md:max-w-[calc(50%-2rem)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                        <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                          {(str(step.badge) || str(step.date)) && (
                            <div class="flex items-center gap-2 mb-3">
                              {str(step.date) && (
                                <span class="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                                  {str(step.date)}
                                </span>
                              )}
                              {str(step.badge) && (
                                <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300">
                                  {str(step.badge)}
                                </span>
                              )}
                            </div>
                          )}
                          {str(step.title) && (
                            <h3
                              class="text-base font-semibold text-gray-900 dark:text-white mb-2"
                              // deno-lint-ignore react-no-danger
                              dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(step.title)) }}
                            />
                          )}
                          {str(step.text) && (
                            <p
                              class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
                              // deno-lint-ignore react-no-danger
                              dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(step.text)) }}
                            />
                          )}
                          {img && (
                            <img
                              src={img}
                              alt={str(step.title) || ""}
                              class="mt-3 rounded-lg w-full object-cover max-h-48"
                            />
                          )}
                          {str(cta.text) && ctaHref && (
                            <a
                              href={ctaHref}
                              {...linkTarget(ctaHref)}
                              class="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                            >
                              {str(cta.text)} →
                            </a>
                          )}
                        </div>
                      </div>
                      <div class="relative z-10 flex-shrink-0">
                        <StepMarker
                          idx={i}
                          icon={str(step.icon)}
                          markerStyle={markerStyle}
                          numbering={numbering}
                        />
                      </div>
                      <div class="hidden md:block flex-1 md:max-w-[calc(50%-2rem)]" />
                    </li>
                  );
                })}
              </ol>
            </div>
          )
          : (
            <ol>
              {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                return (
                  <li key={i} class="step-item flex gap-5">
                    <div class="flex flex-col items-center flex-shrink-0">
                      <StepMarker
                        idx={i}
                        icon={str(step.icon)}
                        markerStyle={markerStyle}
                        numbering={numbering}
                      />
                      {!isLast && connector !== "none" && (
                        <div
                          class={`flex-1 w-0.5 my-2 ${
                            isDashed
                              ? "border-l-2 border-dashed border-gray-200 dark:border-gray-700"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                          style="min-height: 1.25rem"
                        />
                      )}
                    </div>
                    <div class={`flex-1 min-w-0 pt-0.5 ${isLast ? "pb-0" : "pb-10"}`}>
                      <StepBody step={step} />
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
      </div>
    </div>
  );
}

// ── comparison-table ────────────────────────────────────────────────────────

const CHECK_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg>`;
const X_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/></svg>`;
const MINUS_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3.75 10a.75.75 0 01.75-.75h11a.75.75 0 010 1.5h-11a.75.75 0 01-.75-.75z" clip-rule="evenodd"/></svg>`;

type Cell =
  | { kind: "check"; note?: string }
  | { kind: "cross"; note?: string }
  | { kind: "partial"; note?: string }
  | { kind: "text"; value: string; emphasis?: boolean; note?: string };

function resolveCell(raw: unknown): Cell {
  if (raw === true) return { kind: "check" };
  if (raw === false || raw == null || raw === "") return { kind: "cross" };
  if (typeof raw === "object") {
    const m = raw as Record<string, unknown>;
    if (m.value === true) return { kind: "check", note: str(m.note) || undefined };
    if (m.value === false) return { kind: "cross", note: str(m.note) || undefined };
    if (m.value === "partial" || m.partial) {
      return { kind: "partial", note: str(m.note) || str(m.value) || undefined };
    }
    return {
      kind: "text",
      value: str(m.value),
      emphasis: m.emphasis === true,
      note: str(m.note) || undefined,
    };
  }
  const s = String(raw).trim();
  if (s === "true" || s === "yes" || s === "✓") return { kind: "check" };
  if (s === "false" || s === "no" || s === "✗" || s === "—") return { kind: "cross" };
  if (s === "partial" || s === "limited") return { kind: "partial", note: s };
  return { kind: "text", value: s };
}

function CellContent({ cell, isHighlighted }: { cell: Cell; isHighlighted: boolean }) {
  const positiveColor = isHighlighted
    ? "text-primary-600 dark:text-primary-400"
    : "text-green-500 dark:text-green-400";

  if (cell.kind === "check") {
    return (
      <div class="flex items-center justify-center gap-1.5">
        <span
          class={`h-5 w-5 ${positiveColor}`}
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: CHECK_SVG }}
        />
        {cell.note && <span class="text-xs text-gray-500 dark:text-gray-400">{cell.note}</span>}
      </div>
    );
  }
  if (cell.kind === "cross") {
    return (
      <div class="flex items-center justify-center gap-1.5">
        <span
          class="h-5 w-5 text-gray-400 dark:text-gray-500"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: X_SVG }}
        />
        {cell.note && <span class="text-xs text-gray-500 dark:text-gray-400">{cell.note}</span>}
      </div>
    );
  }
  if (cell.kind === "partial") {
    return (
      <div class="flex items-center justify-center gap-1.5">
        <span
          class="h-5 w-5 text-amber-500 dark:text-amber-400"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: MINUS_SVG }}
        />
        {cell.note && <span class="text-xs text-gray-500 dark:text-gray-400">{cell.note}</span>}
      </div>
    );
  }
  const isStrong = cell.emphasis || isHighlighted;
  const weight = isStrong
    ? "font-semibold text-gray-900 dark:text-white"
    : "text-gray-700 dark:text-gray-300";
  return (
    <div class="text-center">
      <span class={`text-sm ${weight}`}>{cell.value}</span>
      {cell.note && <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cell.note}</div>}
    </div>
  );
}

export function ComparisonTable(
  { content, design }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
  },
) {
  const competitors = asMaps(content.competitors);
  const rows = asMaps(content.rows);
  const cta = asMap(content.cta);
  const ctaHref = safeHref(cta.url);
  const rowStriping = design.row_striping === true;
  const highlightIdx = competitors.findIndex((c) => c.highlight);
  const highlighted = highlightIdx >= 0 ? competitors[highlightIdx] : null;
  const colWidthPct = 100 / (competitors.length + 1.5);
  const labelColPct = colWidthPct * 1.5;
  const colLeftPct = labelColPct + colWidthPct * (highlightIdx >= 0 ? highlightIdx : 0);

  const ordered = highlightIdx >= 0
    ? [competitors[highlightIdx], ...competitors.filter((_, i) => i !== highlightIdx)]
    : competitors;

  return (
    <div class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" data-comparison-root>
      <div class="max-w-6xl mx-auto">
        {(str(content.title) || str(content.subtitle) || str(content.text)) && (
          <div class="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            {str(content.subtitle) && (
              <p class="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
                {str(content.subtitle)}
              </p>
            )}
            {str(content.title) && (
              <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.title)) }}
              />
            )}
            {str(content.text) && (
              <p
                class="text-lg text-gray-600 dark:text-gray-400"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.text)) }}
              />
            )}
          </div>
        )}

        {competitors.length > 0 && rows.length > 0 && (
          <>
            {/* Desktop table */}
            <div class="hidden md:block relative pt-5">
              <div class="relative rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 overflow-visible shadow-sm">
                {highlightIdx >= 0 && (
                  <div
                    class="absolute pointer-events-none rounded-2xl bg-primary-50/60 dark:bg-primary-900/20"
                    style={`top: -1.25rem; bottom: 0; left: calc(${colLeftPct}% - 4px); width: calc(${colWidthPct}% + 8px);`}
                  />
                )}
                {str(highlighted?.badge) && (
                  <div
                    class="absolute z-10"
                    style={`top: -1.25rem; left: calc(${colLeftPct + colWidthPct / 2}%); transform: translate(-50%, -50%);`}
                  >
                    <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-600 text-white shadow-md whitespace-nowrap">
                      {str(highlighted?.badge)}
                    </span>
                  </div>
                )}
                <table class="relative w-full">
                  <thead>
                    <tr>
                      <th class="text-left px-6 py-5 align-bottom" style={`width:${labelColPct}%`} />
                      {competitors.map((c, i) => (
                        <th key={i} class="px-6 py-5 align-bottom text-center" style={`width:${colWidthPct}%`}>
                          <div
                            class={`text-base font-bold ${
                              c.highlight
                                ? "text-primary-600 dark:text-primary-400"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {str(c.name)}
                          </div>
                          {str(c.tagline) && (
                            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 font-normal">
                              {str(c.tagline)}
                            </div>
                          )}
                          {str(c.badge) && !c.highlight && (
                            <div class="mt-2">
                              <span class="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                {str(c.badge)}
                              </span>
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      let dataIdx = -1;
                      return rows.map((row, ri) => {
                        if (row.category === true) {
                          return (
                            <tr key={ri}>
                              <td
                                colSpan={competitors.length + 1}
                                class="px-6 pt-8 pb-3 text-base font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700"
                              >
                                {str(row.feature)}
                              </td>
                            </tr>
                          );
                        }
                        dataIdx++;
                        const values = Array.isArray(row.values) ? row.values : [];
                        const isOdd = rowStriping && dataIdx % 2 === 1;
                        const cellBg = (ci: number) => {
                          if (row.highlight) return "bg-primary-100/50 dark:bg-primary-900/25";
                          if (isOdd && ci !== highlightIdx) return "bg-gray-50/70 dark:bg-gray-800/30";
                          return "";
                        };
                        return (
                          <tr key={ri} class="border-t border-gray-100 dark:border-gray-700/50">
                            <td class={`px-6 py-4 ${cellBg(-1)}`}>
                              <div class="text-sm font-medium text-gray-900 dark:text-white">
                                {str(row.feature)}
                              </div>
                              {str(row.note) && (
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {str(row.note)}
                                </div>
                              )}
                            </td>
                            {competitors.map((_, ci) => (
                              <td key={ci} class={`px-6 py-4 ${cellBg(ci)}`}>
                                <CellContent
                                  cell={resolveCell(values[ci])}
                                  isHighlighted={ci === highlightIdx}
                                />
                              </td>
                            ))}
                          </tr>
                        );
                      });
                    })()}
                    {str(cta.text) && ctaHref && (
                      <tr class="border-t border-gray-100 dark:border-gray-700/50">
                        <td class="px-6 py-6" />
                        {competitors.map((_, ci) => (
                          <td key={ci} class="px-6 py-6 text-center">
                            {ci === highlightIdx && (
                              <a
                                href={ctaHref}
                                {...linkTarget(ctaHref)}
                                class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                              >
                                {str(cta.text)}
                                {str(cta.icon) && (
                                  <Icon name={str(cta.icon)} class="inline-block" style="height:1rem;width:auto" />
                                )}
                              </a>
                            )}
                          </td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
                {highlightIdx >= 0 && (
                  <div
                    class="absolute pointer-events-none ring-2 ring-primary-500 dark:ring-primary-400 rounded-2xl"
                    style={`top: -1.25rem; bottom: 0; left: calc(${colLeftPct}% - 4px); width: calc(${colWidthPct}% + 8px);`}
                  />
                )}
              </div>
            </div>

            {/* Mobile stacked cards */}
            <div class="md:hidden space-y-4">
              {ordered.map((c) => {
                const ci = competitors.indexOf(c);
                const isYou = !!c.highlight;
                return (
                  <div
                    key={ci}
                    class={`rounded-2xl p-5 ${
                      isYou
                        ? "ring-2 ring-primary-500 bg-primary-50/40 dark:bg-primary-900/10"
                        : "ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <div class="flex items-baseline justify-between mb-4">
                      <div>
                        <div
                          class={`text-lg font-bold ${
                            isYou
                              ? "text-primary-600 dark:text-primary-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {str(c.name)}
                        </div>
                        {str(c.tagline) && (
                          <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {str(c.tagline)}
                          </div>
                        )}
                      </div>
                      {str(c.badge) && (
                        <span
                          class={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                            isYou
                              ? "bg-primary-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {str(c.badge)}
                        </span>
                      )}
                    </div>
                    <ul class="space-y-3">
                      {rows.filter((r) => !r.category).map((row, ri) => {
                        const values = Array.isArray(row.values) ? row.values : [];
                        return (
                          <li key={ri} class="flex items-start justify-between gap-4">
                            <div class="flex-1 min-w-0">
                              <div class="text-sm font-medium text-gray-900 dark:text-white">
                                {str(row.feature)}
                              </div>
                              {str(row.note) && (
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {str(row.note)}
                                </div>
                              )}
                            </div>
                            <div class="flex-shrink-0">
                              <CellContent
                                cell={resolveCell(values[ci])}
                                isHighlighted={isYou}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {isYou && str(cta.text) && ctaHref && (
                      <a
                        href={ctaHref}
                        {...linkTarget(ctaHref)}
                        class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-all duration-200"
                      >
                        {str(cta.text)}
                        {str(cta.icon) && (
                          <Icon name={str(cta.icon)} class="inline-block" style="height:1rem;width:auto" />
                        )}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── dev-hero ────────────────────────────────────────────────────────────────

export function DevHero(
  { content, design, ctx }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
    ctx: BlockContext;
  },
) {
  const { t } = ctx;
  const style = str(design.style) === "split" ? "split" : "centered";
  const avatarShape = str(design.avatar_shape).toLowerCase() === "square" ? "square" : "circle";
  const shapeClass = avatarShape === "circle" ? "rounded-full" : "rounded-2xl";
  const showStatus = content.show_status === true;
  const showScroll = content.show_scroll_indicator === true;

  const name = str(content.name) || str(content.title) || t("developer") || "Developer";
  const role = str(content.role) || str(content.tagline);
  const bio = str(content.bio);
  const avatar = str(content.avatar);
  const greeting = str(content.greeting);
  const namePrefix = str(content.name_prefix);
  const statusIcon = str(asMap(content.status).icon);
  const links = asMaps(content.links);
  const ctaButtons = asMaps(content.cta_buttons);

  const tw = asMap(content.typewriter);
  const twEnable = tw.enable === true;
  const twStrings = strArr(tw.strings).filter(Boolean);
  const twPrefix = str(tw.prefix);
  const useTypewriter = twEnable && twStrings.length > 0;

  const scrollTarget = safeHref(content.scroll_target) || "#projects";

  const socialLinks = (
    links.length > 0 && (
      <div
        class={`flex items-center gap-4 mb-8 ${style === "centered" ? "justify-center" : ""}`}
      >
        {links.map((link, i) => {
          const href = safeHref(link.url) || safeHref(link.link);
          if (!href) return null;
          const icon = str(link.icon) || "hero/link";
          const label = str(link.label) || str(link.name);
          return (
            <a
              key={i}
              href={href}
              {...linkTarget(href)}
              title={label || undefined}
              class={`${
                style === "centered" ? "w-12 h-12" : "w-10 h-10"
              } flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white hover:bg-primary-50 dark:hover:bg-primary-500/20 hover:border-primary-300 dark:hover:border-primary-500/50 transition-all duration-300`}
            >
              <Icon name={icon} class="w-5 h-5" />
            </a>
          );
        })}
      </div>
    )
  );

  const ctas = (
    ctaButtons.length > 0 && (
      <div class={`flex flex-wrap gap-4 ${style === "centered" ? "justify-center" : ""}`}>
        {ctaButtons.map((btn, idx) => {
          const href = safeHref(btn.url);
          const text = str(btn.text);
          if (!href || !text) return null;
          const isPrimary = idx === 0;
          return (
            <a
              key={idx}
              href={href}
              {...linkTarget(href)}
              class={`${
                isPrimary
                  ? "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-white border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/30"
              } px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2`}
            >
              {str(btn.icon) && <Icon name={str(btn.icon)} class="w-5 h-5" />}
              {text}
            </a>
          );
        })}
      </div>
    )
  );

  const typewriterOrRole = useTypewriter
    ? (
      <p
        class={`text-xl sm:text-2xl ${
          style === "centered" ? "md:text-3xl" : ""
        } text-gray-600 dark:text-gray-400 font-light mb-6 ${
          style === "centered" ? "min-h-[2em]" : "h-8"
        }`}
      >
        {twPrefix && <span>{twPrefix}{" "}</span>}
        <span
          data-typewriter
          data-strings={JSON.stringify(twStrings)}
          class="text-primary-600 dark:text-primary-400"
        />
        <span class="typewriter-cursor" />
      </p>
    )
    : role
    ? (
      <p
        class={`text-xl sm:text-2xl ${
          style === "centered" ? "md:text-3xl" : ""
        } text-gray-600 dark:text-gray-400 font-light mb-6`}
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(role) }}
      />
    )
    : null;

  const avatarBlock = avatar
    ? (
      <div class={style === "split" ? "flex-shrink-0" : "mb-8"}>
        <div class={`relative ${style === "centered" ? "inline-block" : ""}`}>
          <div
            class={`${
              style === "split" ? "w-48 h-48 md:w-64 md:h-64" : "w-32 h-32 md:w-40 md:h-40"
            } ${shapeClass} overflow-hidden ring-4 ring-gray-200 dark:ring-white/10 shadow-2xl shadow-primary-500/20 ${
              style === "centered" ? "mx-auto" : ""
            }`}
          >
            <img src={avatar} alt={name} class="w-full h-full object-cover" />
          </div>
          {showStatus && statusIcon && (
            <span
              class={`absolute ${
                style === "split" ? "bottom-2 right-2 w-12 h-12 text-2xl" : "bottom-0 right-0 w-10 h-10 text-xl"
              } flex items-center justify-center bg-white dark:bg-gray-900 rounded-full border-2 border-gray-200 dark:border-white/10 shadow-lg`}
            >
              {statusIcon}
            </span>
          )}
          {style === "split" && (
            <div
              class={`absolute -inset-2 ${
                avatarShape === "circle" ? "rounded-full" : "rounded-3xl"
              } border border-dashed border-gray-300 dark:border-white/10 animate-spin`}
              style="animation-duration: 30s;"
            />
          )}
        </div>
      </div>
    )
    : null;

  return (
    <div class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 pointer-events-none dark:block hidden">
        <div class="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          class="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 1s;"
        />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary-600/5 rounded-full blur-3xl" />
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      <div class="absolute inset-0 pointer-events-none dark:hidden">
        <div class="absolute top-1/4 -left-20 w-96 h-96 bg-primary-100 rounded-full blur-3xl" />
        <div class="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary-100 rounded-full blur-3xl" />
      </div>

      <div
        class={`relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 ${
          style === "centered" ? "text-center" : ""
        }`}
      >
        {style === "split"
          ? (
            <div class="flex flex-col md:flex-row items-center gap-12">
              {avatarBlock}
              <div class="text-center md:text-left">
                {greeting && (
                  <p class="text-primary-600 dark:text-primary-400 font-mono text-sm mb-4 flex items-center gap-2">
                    <span class="inline-block w-8 h-px bg-primary-500" />
                    {greeting}
                  </p>
                )}
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                  {namePrefix && (
                    <span class="text-gray-500 dark:text-gray-400 font-normal">{namePrefix}{" "}</span>
                  )}
                  <span class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    {name}
                  </span>
                </h1>
                {typewriterOrRole}
                {bio && (
                  <p
                    class="text-gray-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed"
                    // deno-lint-ignore react-no-danger
                    dangerouslySetInnerHTML={{ __html: markdownBlock(bio) }}
                  />
                )}
                {socialLinks}
                {ctas}
              </div>
            </div>
          )
          : (
            <>
              {avatarBlock}
              {greeting && (
                <p class="text-primary-600 dark:text-primary-400 font-mono text-sm mb-4 inline-flex items-center gap-2">
                  <span class="inline-block w-8 h-px bg-primary-500" />
                  {greeting}
                  <span class="inline-block w-8 h-px bg-primary-500" />
                </p>
              )}
              <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                {namePrefix && <span class="text-gray-500 font-normal">{namePrefix}{" "}</span>}
                <span class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>
              {typewriterOrRole}
              {bio && (
                <p
                  class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 text-lg leading-relaxed"
                  // deno-lint-ignore react-no-danger
                  dangerouslySetInnerHTML={{ __html: markdownBlock(bio) }}
                />
              )}
              {socialLinks}
              {ctas}
            </>
          )}

        {showScroll && (
          <a
            href={scrollTarget}
            class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
            aria-label={t("scroll_to_content") || "Scroll to content"}
          >
            <div class="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-white/20 group-hover:border-primary-400/50 flex items-start justify-center p-2 transition-colors">
              <div class="w-1 h-2 bg-gray-400 dark:bg-white/40 group-hover:bg-primary-400 rounded-full animate-pulse transition-colors" />
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
