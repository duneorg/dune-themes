/**
 * Map block — MapLibre GL + OpenFreeMap (no API key).
 * SSR shell; canvas is initialised by static/blox.js.
 */
import { inlineMarkdown, linkTarget, str } from "../../utils/blox.ts";
import { safeHref } from "../../utils/safe-url.ts";

const HEIGHT_CLASS: Record<string, string> = {
  sm: "h-72 md:h-80",
  md: "h-96 md:h-[28rem]",
  lg: "h-[28rem] md:h-[36rem]",
  full: "h-[calc(100vh-4rem)]",
};

function num(v: unknown, fallback?: number): number | undefined {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number(v);
    if (!Number.isNaN(n)) return n;
  }
  return fallback;
}

function asMap(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, unknown> : {};
}

function asMaps(v: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(v)) {
    return v.filter((x): x is Record<string, unknown> => !!x && typeof x === "object");
  }
  return [];
}

function directionsUrl(
  location: Record<string, unknown>,
  override: string,
): string | undefined {
  const safe = safeHref(override);
  if (safe) return safe;
  const lat = num(location.lat);
  const lng = num(location.lng);
  if (lat == null || lng == null) return undefined;
  return `https://www.openstreetmap.org/directions?to=${lat}%2C${lng}`;
}

function MapCanvasShell(
  { config, heightCls }: { config: Record<string, unknown>; heightCls: string },
) {
  return (
    <div
      class={`relative overflow-hidden w-full ${heightCls} bg-gray-100 dark:bg-gray-800`}
      data-map-canvas
      data-map-config={JSON.stringify(config)}
      aria-label="Map"
      role="img"
    />
  );
}

function AddressCard(
  { content, location, ctaUrl }: {
    content: Record<string, unknown>;
    location: Record<string, unknown>;
    ctaUrl?: string;
  },
) {
  const cta = asMap(content.cta);
  const addressRaw = str(location.address);
  const addressLines = addressRaw
    ? addressRaw.split("\n").map((l) => l.trim()).filter(Boolean)
    : [];
  const phone = str(cta.phone);
  const email = str(cta.email);
  const hasItems = addressLines.length > 0 || !!phone || !!email;
  const directions = asMap(cta.directions);
  const directionsText = str(directions.text) || "Get directions";

  return (
    <div class="flex flex-col justify-center p-6 sm:p-8 bg-white dark:bg-gray-800">
      {str(content.title) && (
        <h2
          class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.title)) }}
        />
      )}
      {str(content.subtitle) && (
        <p
          class="text-base text-gray-600 dark:text-gray-400 mb-6"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.subtitle)) }}
        />
      )}

      {hasItems && (
        <ul class="space-y-3 mb-6">
          {addressLines.length > 0 && (
            <li class="flex items-start gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
              <svg
                class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>
                {addressLines.map((line) => <span class="block" key={line}>{line}</span>)}
              </span>
            </li>
          )}
          {phone && (
            <li class="flex items-start gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
              <svg
                class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <a href={`tel:${phone}`} class="hover:text-primary-600 dark:hover:text-primary-400">
                {phone}
              </a>
            </li>
          )}
          {email && (
            <li class="flex items-start gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
              <svg
                class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a
                href={`mailto:${email}`}
                class="hover:text-primary-600 dark:hover:text-primary-400 break-all"
              >
                {email}
              </a>
            </li>
          )}
        </ul>
      )}

      {ctaUrl && (
        <a
          href={ctaUrl}
          {...linkTarget(ctaUrl)}
          class="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:from-primary-700 hover:to-secondary-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          {directionsText}
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

export function MapBlock(
  { content, design }: {
    content: Record<string, unknown>;
    design: Record<string, unknown>;
  },
) {
  const location = asMap(content.location);
  const markers = asMaps(content.markers).map((m) => ({
    lat: num(m.lat),
    lng: num(m.lng),
    title: str(m.title) || undefined,
    description: str(m.description) || undefined,
    url: safeHref(m.url) || undefined,
  })).filter((m) => m.lat != null && m.lng != null);

  const provider = asMap(design.provider);
  const layout = str(design.layout) === "map-only" ? "map-only" : "side-by-side";
  const heightCls = HEIGHT_CLASS[str(design.height)] || HEIGHT_CLASS.md;
  const radius = str(design.border) === "none" ? "" : "rounded-3xl";
  const borderShadow = str(design.border) === "none"
    ? ""
    : "ring-1 ring-gray-200 dark:ring-gray-700 shadow-lg";

  const cta = asMap(content.cta);
  const directions = asMap(cta.directions);
  const ctaUrl = directionsUrl(location, str(directions.url));

  const mapConfig = {
    location: {
      lat: num(location.lat),
      lng: num(location.lng),
      address: str(location.address) || undefined,
    },
    zoom: num(content.zoom, 14) ?? 14,
    markers,
    style: str(design.style) || str(provider.style) || "streets",
    provider: str(provider.name) || "openfreemap",
    interactive: design.interactive !== false,
    attribution: design.attribution !== false,
    cooperative_gestures: design.cooperative_gestures === true,
  };

  if (layout === "map-only") {
    return (
      <div class="py-12 sm:py-16 px-4 sm:px-6 lg:px-8" data-map-root>
        <div class="max-w-7xl mx-auto">
          {(str(content.title) || str(content.subtitle)) && (
            <div class="text-center max-w-3xl mx-auto mb-8">
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
          <div class={`relative overflow-hidden ${heightCls} ${radius} ${borderShadow}`}>
            <MapCanvasShell config={mapConfig} heightCls="h-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="py-12 sm:py-16 px-4 sm:px-6 lg:px-8" data-map-root>
      <div class="max-w-7xl mx-auto">
        <div class={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden ${radius} ${borderShadow}`}>
          <AddressCard content={content} location={location} ctaUrl={ctaUrl} />
          <div class={`relative ${heightCls} order-first lg:order-last`}>
            <MapCanvasShell config={mapConfig} heightCls="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
