/**
 * Error template — port of 404.html. Rendered by core for 404/500 with a
 * synthetic page carrying `frontmatter.statusCode` / `.message`. Suggests
 * recent pages from navAll like upstream's recommendations list.
 */
import type { TemplateProps } from "@dune/core/content/types";
import Layout from "../components/layout.tsx";
import { normalizeRoute } from "../utils/blox.ts";

export default function ErrorTemplate(props: TemplateProps) {
  const t = (props as unknown as { t?: (k: string) => string }).t ?? ((k: string) => k);
  const fm = props.page.frontmatter as Record<string, unknown>;
  const status = Number(fm.statusCode) || 404;
  const Frame = (props.Layout ?? Layout) as typeof Layout;

  const recent = (props.navAll ?? [])
    .filter((p) => p.visible && p.routable && p.title)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, 10);

  return (
    <Frame {...props}>
      <div class="flex flex-col justify-center">
        <article class="container mx-auto prose prose-slate lg:prose-xl dark:prose-invert">
          <h1 class="lg:text-6xl">
            {status === 404 ? t("page_not_found") : String(fm.message ?? "Error")}
          </h1>
          <p>{t("404_recommendations")}</p>
          {recent.length > 0 && (
            <>
              <h2>{t("user_profile_latest")}</h2>
              <ul>
                {recent.map((p) => (
                  <li key={p.route}>
                    <a href={normalizeRoute(p.route)}>{p.title}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      </div>
    </Frame>
  );
}
