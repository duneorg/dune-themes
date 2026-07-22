/**
 * Interactive landing blocks — SSR markup with data-* hooks for blox.js.
 * Ports of blox/{faq,stats,pricing,logos} without Preact useState.
 */
import { Icon } from "../icon.tsx";
import {
  inlineMarkdown,
  linkTarget,
  markdownBlock,
  str,
} from "../../utils/blox.ts";
import { safeHref } from "../../utils/safe-url.ts";
import { contentItems } from "./shared.ts";

// ── faq ─────────────────────────────────────────────────────────────────────

const PLUS_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v5.5h5.5a.75.75 0 010 1.5h-5.5v5.5a.75.75 0 01-1.5 0v-5.5h-5.5a.75.75 0 010-1.5h5.5v-5.5A.75.75 0 0110 3z" clip-rule="evenodd"/></svg>`;

function FaqItem({ item }: { item: Record<string, unknown> }) {
  const question = str(item.question) || str(item.title);
  const answer = str(item.answer) || str(item.text);

  return (
    <div
      class="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
      data-faq-item
    >
      <button
        type="button"
        class="w-full py-5 px-6 flex items-start justify-between gap-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-800/50"
        data-faq-toggle
        aria-expanded="false"
      >
        <span
          class="font-semibold text-gray-900 dark:text-white text-base sm:text-lg leading-snug"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(question) }}
        />
        <span class="faq-icon mt-0.5 flex-shrink-0 h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 flex items-center justify-center transition-transform duration-300 ease-out">
          <span
            class="h-3.5 w-3.5 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: PLUS_SVG }}
          />
        </span>
      </button>
      <div class="grid transition-all duration-300 ease-out grid-rows-[0fr] opacity-0" data-faq-panel>
        <div class="overflow-hidden">
          <div
            class="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: markdownBlock(answer) }}
          />
        </div>
      </div>
    </div>
  );
}

export function FaqBlock({ content }: { content: Record<string, unknown> }) {
  const title = str(content.title);
  const subtitle = str(content.subtitle);
  const text = str(content.text);
  const items = contentItems(content);
  const button = (content.button && typeof content.button === "object")
    ? content.button as Record<string, unknown>
    : {};
  const buttonText = str(button.text);
  const buttonUrl = safeHref(button.url) ?? "";
  const buttonIcon = str(button.icon);

  return (
    <div class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        {(title || subtitle) && (
          <div class="text-center mb-10 lg:mb-14">
            {subtitle && (
              <p class="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
                {subtitle}
              </p>
            )}
            {title && (
              <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
              />
            )}
          </div>
        )}

        {text && (
          <div
            class="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: markdownBlock(text) }}
          />
        )}

        {items.length > 0 && (
          <div class="rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
            {items.map((item, i) => <FaqItem key={i} item={item} />)}
          </div>
        )}

        {buttonText && buttonUrl && (
          <div class="mt-10 text-center">
            <a
              href={buttonUrl}
              {...linkTarget(buttonUrl)}
              class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              {buttonText}
              {buttonIcon && (
                <Icon name={buttonIcon} class="inline-block" style="height:1rem;width:auto" />
              )}
            </a>
          </div>
        )}
      </div>
      <style>
        {`[data-faq-item].is-open [data-faq-panel]{grid-template-rows:1fr;opacity:1}
[data-faq-item].is-open .faq-icon{transform:rotate(45deg)}`}
      </style>
    </div>
  );
}

// ── stats ───────────────────────────────────────────────────────────────────

function parseTarget(statistic: string): number {
  if (!statistic) return 0;
  const raw = String(statistic).replace(/[^0-9.]/g, "");
  const num = Number(raw);
  return Number.isNaN(num) ? 0 : num;
}

function gridColsClass(count: number): string {
  if (count <= 1) return "lg:grid-cols-1";
  if (count === 2) return "lg:grid-cols-2";
  if (count >= 4) return "lg:grid-cols-4";
  return "lg:grid-cols-3";
}

const GRADIENT_NUMBER_CLS =
  "bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 dark:from-primary-400 dark:via-primary-300 dark:to-secondary-400 bg-clip-text text-transparent";
const SOLID_NUMBER_CLS = "text-gray-900 dark:text-white";

function StatCard(
  { item, numbersGradient }: { item: Record<string, unknown>; numbersGradient: boolean },
) {
  const numberCls = numbersGradient ? GRADIENT_NUMBER_CLS : SOLID_NUMBER_CLS;
  const icon = str(item.icon);
  const statistic = str(item.statistic);
  return (
    <div class="stats-item group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div class="relative p-8 text-center">
        {icon && (
          <div class="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary-100 dark:bg-primary-900/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Icon name={icon} class="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
        )}
        <div class="mb-3">
          <h3
            class={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black ${numberCls} transition-colors duration-300 counter`}
            data-target={String(parseTarget(statistic))}
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(statistic) }}
          />
        </div>
        <p
          class="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(item.description)) }}
        />
        {str(item.sub_metric) && (
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">{str(item.sub_metric)}</p>
        )}
      </div>
    </div>
  );
}

function StatCompact(
  { item, numbersGradient }: { item: Record<string, unknown>; numbersGradient: boolean },
) {
  const numberCls = numbersGradient ? GRADIENT_NUMBER_CLS : SOLID_NUMBER_CLS;
  const icon = str(item.icon);
  const statistic = str(item.statistic);
  return (
    <div class="stats-item group p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
      {icon && (
        <div class="inline-flex items-center justify-center w-12 h-12 mb-4 bg-primary-100 dark:bg-primary-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <Icon name={icon} class="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
      )}
      <h3
        class={`text-3xl sm:text-4xl lg:text-5xl font-bold ${numberCls} mb-2 counter`}
        data-target={String(parseTarget(statistic))}
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(statistic) }}
      />
      <p
        class="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(item.description)) }}
      />
    </div>
  );
}

function StatMinimal(
  { item, numbersGradient }: { item: Record<string, unknown>; numbersGradient: boolean },
) {
  const numberCls = numbersGradient ? GRADIENT_NUMBER_CLS : SOLID_NUMBER_CLS;
  const icon = str(item.icon);
  const statistic = str(item.statistic);
  return (
    <div class="stats-item text-center group">
      {icon && (
        <div class="inline-flex items-center justify-center w-14 h-14 mb-4 bg-primary-100 dark:bg-primary-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
          <Icon name={icon} class="w-7 h-7 text-primary-600 dark:text-primary-400" />
        </div>
      )}
      <h3
        class={`text-3xl sm:text-4xl lg:text-5xl font-bold ${numberCls} mb-2 counter`}
        data-target={String(parseTarget(statistic))}
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(statistic) }}
      />
      <p
        class="text-sm font-medium text-gray-600 dark:text-gray-300"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(item.description)) }}
      />
    </div>
  );
}

export function StatsBlock(
  { content, design }: { content: Record<string, unknown>; design: Record<string, unknown> },
) {
  const title = str(content.title);
  const text = str(content.text);
  const items = contentItems(content);
  const layout = (str(design.layout) || "cards").toLowerCase();
  const numbersGradient = design.numbers_gradient === true;
  const count = Math.max(1, Math.min(items.length, 4));
  const lgCols = gridColsClass(count);
  const baseCols = count === 1 ? "grid-cols-1" : "grid-cols-2";

  return (
    <div class="py-8 sm:py-12 lg:py-16" data-stats-root>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || text) && (
          <div class="text-center mb-12 lg:mb-16">
            {title && (
              <h2
                class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
              />
            )}
            {text && (
              <p
                class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }}
              />
            )}
          </div>
        )}

        {layout === "cards" && (
          <div class={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-6 lg:gap-8`}>
            {items.map((item, idx) => (
              <StatCard key={idx} item={item} numbersGradient={numbersGradient} />
            ))}
          </div>
        )}

        {layout === "compact" && (
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div
              class={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-700`}
            >
              {items.map((item, idx) => (
                <StatCompact key={idx} item={item} numbersGradient={numbersGradient} />
              ))}
            </div>
          </div>
        )}

        {layout === "minimal" && (
          <div class={`grid ${baseCols} ${lgCols} gap-8 lg:gap-12`}>
            {items.map((item, idx) => (
              <StatMinimal key={idx} item={item} numbersGradient={numbersGradient} />
            ))}
          </div>
        )}

        {layout !== "cards" && layout !== "compact" && layout !== "minimal" && (
          <div class={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-6 lg:gap-8`}>
            {items.map((item, idx) => (
              <StatCard key={idx} item={item} numbersGradient={numbersGradient} />
            ))}
          </div>
        )}
      </div>

      <style>
        {`.stats-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .stats-item.animate {
          opacity: 1;
          transform: translateY(0);
        }
        .stats-item:nth-child(1) { transition-delay: 0ms; }
        .stats-item:nth-child(2) { transition-delay: 150ms; }
        .stats-item:nth-child(3) { transition-delay: 300ms; }
        .stats-item:nth-child(4) { transition-delay: 450ms; }
        .stats-item:nth-child(5) { transition-delay: 600ms; }`}
      </style>
    </div>
  );
}

// ── pricing ─────────────────────────────────────────────────────────────────

const CHECK_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg>`;
const X_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/></svg>`;

function FeatureRow({ feature }: { feature: unknown }) {
  const text = typeof feature === "string"
    ? feature
    : feature && typeof feature === "object"
    ? str((feature as Record<string, unknown>).text)
    : "";
  const included = typeof feature === "string"
    ? true
    : feature && typeof feature === "object"
    ? (feature as Record<string, unknown>).included !== false
    : true;
  const note = feature && typeof feature === "object"
    ? str((feature as Record<string, unknown>).note)
    : "";

  return (
    <li class="flex items-start gap-3">
      <span
        class={`mt-0.5 h-5 w-5 flex-shrink-0 ${
          included ? "text-green-500 dark:text-green-400" : "text-gray-300 dark:text-gray-600"
        }`}
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: included ? CHECK_SVG : X_SVG }}
      />
      <span
        class={`text-sm leading-6 ${
          included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"
        }`}
      >
        {text}
        {note && <span class="ml-1 text-xs text-gray-400 dark:text-gray-500">({note})</span>}
      </span>
    </li>
  );
}

function PriceSlot(
  {
    price,
    price_suffix,
    price_note,
    price_note_monthly,
    price_note_yearly,
    period,
  }: {
    price: Record<string, unknown>;
    price_suffix: string;
    price_note: string;
    price_note_monthly: string;
    price_note_yearly: string;
    period: "monthly" | "yearly";
  },
) {
  const raw = period === "yearly" && price.yearly != null ? price.yearly : price.monthly;
  const currency = str(price.currency) || "$";
  const isContact = raw === "" || raw == null;
  const isFree = String(raw) === "0";
  const note = period === "yearly"
    ? (price_note_yearly || price_note)
    : (price_note_monthly || price_note);
  const attr = period === "monthly" ? "data-price-monthly" : "data-price-yearly";
  const hidden = period === "yearly";

  if (isContact) {
    return (
      <div class="mb-6" {...{ [attr]: true }} style={hidden ? "display:none" : undefined}>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{price_note || "Contact us"}</p>
      </div>
    );
  }

  if (isFree) {
    return (
      <div class="mb-6" {...{ [attr]: true }} style={hidden ? "display:none" : undefined}>
        <p class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Free</p>
        {note && <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{note}</p>}
      </div>
    );
  }

  return (
    <div class="mb-6" {...{ [attr]: true }} style={hidden ? "display:none" : undefined}>
      <div class="flex items-baseline gap-x-1">
        {currency && (
          <span class="text-2xl font-semibold text-gray-900 dark:text-white">{currency}</span>
        )}
        <span class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{str(raw)}</span>
        {price_suffix && (
          <span class="text-base text-gray-500 dark:text-gray-400 ml-1">{price_suffix}</span>
        )}
      </div>
      {note && <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{note}</p>}
    </div>
  );
}

function TierCard({ tier }: { tier: Record<string, unknown> }) {
  const name = str(tier.name);
  const badge = str(tier.badge);
  const description = str(tier.description);
  const price = (tier.price && typeof tier.price === "object")
    ? tier.price as Record<string, unknown>
    : {};
  const price_suffix = str(tier.price_suffix);
  const price_note = str(tier.price_note);
  const price_note_monthly = str(tier.price_note_monthly);
  const price_note_yearly = str(tier.price_note_yearly);
  const highlight = tier.highlight === true;
  const cta = (tier.cta && typeof tier.cta === "object")
    ? tier.cta as Record<string, unknown>
    : {};
  const features = Array.isArray(tier.features) ? tier.features : [];
  const ctaStyle = str(cta.style) || (highlight ? "primary" : "outline");
  const ctaText = str(cta.text);
  const ctaUrl = safeHref(cta.url) ?? "";
  const ctaIcon = str(cta.icon);

  const body = (
    <>
      <div class="mb-5">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
        {description && (
          <p class="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>

      <PriceSlot
        price={price}
        price_suffix={price_suffix}
        price_note={price_note}
        price_note_monthly={price_note_monthly}
        price_note_yearly={price_note_yearly}
        period="monthly"
      />
      <PriceSlot
        price={price}
        price_suffix={price_suffix}
        price_note={price_note}
        price_note_monthly={price_note_monthly}
        price_note_yearly={price_note_yearly}
        period="yearly"
      />

      {ctaText && ctaUrl && (
        <a
          href={ctaUrl}
          {...linkTarget(ctaUrl)}
          class={`mb-8 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            ctaStyle === "primary"
              ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-sm hover:shadow-md"
              : "ring-1 ring-inset ring-gray-300 dark:ring-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          }`}
        >
          {ctaText}
          {ctaIcon && <Icon name={ctaIcon} class="w-4 h-4 flex-shrink-0" />}
        </a>
      )}

      {features.length > 0 && (
        <ul class="mt-auto space-y-3 border-t border-gray-100 dark:border-gray-700/60 pt-6">
          {features.map((f, i) => <FeatureRow key={i} feature={f} />)}
        </ul>
      )}
    </>
  );

  if (highlight) {
    return (
      <div class="relative">
        {badge && (
          <div class="absolute -top-4 inset-x-0 flex justify-center z-10">
            <span class="inline-flex items-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-1 text-xs font-semibold text-white shadow-sm">
              {badge}
            </span>
          </div>
        )}
        <div class="rounded-3xl p-0.5 bg-gradient-to-br from-primary-500 to-secondary-500 shadow-2xl shadow-primary-500/20">
          <div class="flex flex-col rounded-3xl p-8 bg-white dark:bg-gray-900 h-full">{body}</div>
        </div>
      </div>
    );
  }

  return (
    <div class="relative flex flex-col rounded-3xl p-8 ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-200">
      {badge && (
        <div class="absolute -top-4 inset-x-0 flex justify-center">
          <span class="inline-flex items-center rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white shadow-sm">
            {badge}
          </span>
        </div>
      )}
      {body}
    </div>
  );
}

export function PricingBlock({ content }: { content: Record<string, unknown> }) {
  const title = str(content.title);
  const subtitle = str(content.subtitle);
  const billingToggle = (content.billing_toggle && typeof content.billing_toggle === "object")
    ? content.billing_toggle as Record<string, unknown>
    : {};
  const tiersRaw = content.tiers;
  const tiers = Array.isArray(tiersRaw)
    ? tiersRaw.filter((t): t is Record<string, unknown> => !!t && typeof t === "object")
    : [];

  const hasYearlyPrices = tiers.some((t) => {
    const p = t.price && typeof t.price === "object" ? t.price as Record<string, unknown> : {};
    return p.yearly != null && p.yearly !== p.monthly;
  });
  const showToggle = billingToggle.enabled === true && hasYearlyPrices;

  const colsClass = tiers.length === 1
    ? "max-w-sm mx-auto"
    : tiers.length === 2
    ? "max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 md:grid-cols-3";

  return (
    <div class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" data-pricing-root data-billing="monthly">
      <div class="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div class="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            {title && (
              <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
              />
            )}
            {subtitle && (
              <p
                class="text-lg text-gray-600 dark:text-gray-400"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(subtitle) }}
              />
            )}
          </div>
        )}

        {showToggle && (
          <div class="flex items-center justify-center gap-4 mb-10">
            <span
              class="text-sm font-semibold text-gray-900 dark:text-white"
              data-billing-label="monthly"
            >
              {str(billingToggle.monthly_label) || "Monthly"}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked="false"
              data-billing-toggle
              class="relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 bg-gray-300 dark:bg-gray-600"
            >
              <span class="sr-only">Toggle billing period</span>
              <span
                data-billing-knob
                class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0"
              />
            </button>
            <span
              class="flex items-center gap-2 text-sm font-normal text-gray-400 dark:text-gray-500"
              data-billing-label="yearly"
            >
              {str(billingToggle.yearly_label) || "Yearly"}
              {str(billingToggle.yearly_discount) && (
                <span class="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/20 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:text-green-400">
                  {str(billingToggle.yearly_discount)}
                </span>
              )}
            </span>
          </div>
        )}

        <div class={`grid gap-8 pt-6 ${colsClass}`}>
          {tiers.map((tier, i) => <TierCard key={i} tier={tier} />)}
        </div>
      </div>
    </div>
  );
}

// ── logos ───────────────────────────────────────────────────────────────────

const MARQUEE_CSS = `
@keyframes hbx-logos-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.hbx-logos-track {
  animation: hbx-logos-marquee var(--hbx-marquee-dur, 30s) linear infinite;
  will-change: transform;
}
.hbx-logos-track:hover { animation-play-state: paused; }
`;

const SLOT_W: Record<string, string> = { sm: "w-24", md: "w-32", lg: "w-40" };
const MAX_W: Record<string, string> = { sm: "3.5rem", md: "5rem", lg: "7rem" };
const HEIGHT: Record<string, string> = { sm: "1.75rem", md: "2.5rem", lg: "3.5rem" };
const FILTER: Record<string, string> = {
  grayscale: "grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
  white: "brightness-0 invert transition-all duration-300",
  color: "transition-all duration-300",
};

function logoItems(content: Record<string, unknown>): Array<Record<string, unknown>> {
  if (Array.isArray(content.logos)) {
    return content.logos.filter((x): x is Record<string, unknown> => !!x && typeof x === "object");
  }
  return contentItems(content);
}

function LogoItem(
  {
    item,
    logoStyle,
    logoSize,
  }: {
    item: Record<string, unknown>;
    logoStyle: string;
    logoSize: string;
  },
) {
  const height = HEIGHT[logoSize] ?? HEIGHT.md!;
  const maxW = MAX_W[logoSize] ?? MAX_W.md!;
  const slotW = SLOT_W[logoSize] ?? SLOT_W.md!;
  const itemStyle = str(item.style) || logoStyle;
  const filter = FILTER[itemStyle] ?? FILTER.grayscale!;
  const scale = typeof item.scale === "number" ? item.scale : 1;
  const scaleStyle = scale !== 1 ? `;transform:scale(${scale})` : "";
  const icon = str(item.icon);
  const image = (() => {
    const raw = item.image;
    if (typeof raw !== "string" || !raw) return "";
    return safeHref(raw) ?? (raw.startsWith("/") ? raw : "");
  })();
  const name = str(item.name);
  const url = safeHref(item.url) ?? "";

  let visual = null;
  if (icon) {
    visual = (
      <Icon
        name={icon}
        class={`inline-block ${filter}`}
        style={`height:${height};max-width:${maxW}${scaleStyle}`}
      />
    );
  } else if (image) {
    visual = (
      <img
        src={image}
        alt={name}
        class={`object-contain ${filter}`}
        style={`height:${height};width:auto;max-width:${maxW}${scaleStyle}`}
      />
    );
  } else if (name) {
    visual = <span class="font-semibold text-gray-400 dark:text-gray-500 text-sm">{name}</span>;
  } else {
    return null;
  }

  const cls = `flex items-center justify-center flex-shrink-0 ${slotW} py-3`;

  return url
    ? (
      <a href={url} class={cls} aria-label={name || undefined} {...linkTarget(url)}>
        {visual}
      </a>
    )
    : (
      <div class={cls} role="img" aria-label={name || undefined}>
        {visual}
      </div>
    );
}

export function LogosBlock(
  { content, design }: { content: Record<string, unknown>; design: Record<string, unknown> },
) {
  const items = logoItems(content);
  const title = str(content.title);
  const subtitle = str(content.subtitle);
  const cta = (content.cta && typeof content.cta === "object")
    ? content.cta as Record<string, unknown>
    : {};
  const layout = str(design.layout) || str(design.display_mode) || "row";
  const logoStyle = str(design.logo_style) || "grayscale";
  const logoSize = str(design.logo_size) || "md";
  const speed = typeof design.marquee_speed === "number" ? design.marquee_speed : 30;
  const ctaText = str(cta.text);
  const ctaUrl = safeHref(cta.url) ?? "";

  const cols = items.length <= 3
    ? "grid-cols-3"
    : items.length <= 4
    ? "grid-cols-2 sm:grid-cols-4"
    : items.length <= 6
    ? "grid-cols-3 sm:grid-cols-6"
    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";

  return (
    <div class="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div class="text-center mb-8">
            {title && (
              <p
                class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
              />
            )}
            {subtitle && (
              <p
                class="text-sm text-gray-400 dark:text-gray-500"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(subtitle) }}
              />
            )}
          </div>
        )}

        {layout === "marquee" && (
          <>
            <style>{MARQUEE_CSS}</style>
            <div
              class="overflow-hidden"
              style="mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
            >
              <div
                class="hbx-logos-track flex w-max items-center"
                style={`--hbx-marquee-dur:${speed}s`}
              >
                {[...items, ...items].map((item, i) => (
                  <LogoItem
                    key={i}
                    item={item}
                    logoStyle={logoStyle}
                    logoSize={logoSize}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {layout === "grid" && (
          <div class={`grid ${cols} gap-6 items-center`}>
            {items.map((item, i) => (
              <LogoItem key={i} item={item} logoStyle={logoStyle} logoSize={logoSize} />
            ))}
          </div>
        )}

        {layout !== "marquee" && layout !== "grid" && (
          <div class="flex flex-wrap items-center justify-center">
            {items.map((item, i) => (
              <LogoItem key={i} item={item} logoStyle={logoStyle} logoSize={logoSize} />
            ))}
          </div>
        )}

        {ctaText && ctaUrl && (
          <div class="mt-6 text-center">
            <a
              href={ctaUrl}
              {...linkTarget(ctaUrl)}
              class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {ctaText}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
