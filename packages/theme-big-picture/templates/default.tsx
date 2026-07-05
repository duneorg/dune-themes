/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const themeName = config?.theme?.name ?? "big-picture";
  const img = (file: string) => themeImage(themeName, file);
  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="one" class="main style2 right dark fullscreen">
          <div class="content box style2">
            <header>
              <h2>{page.frontmatter.title ?? "What I Do"}</h2>
            </header>
            {children && <div data-dune-body>{children}</div>}
            {!children && subtitle && <p>{String(subtitle)}</p>}
          </div>
          <a href="#two" class="button style2 down anchored">Next</a>
        </section>

        <section id="two" class="main style2 left dark fullscreen">
          <div class="content box style2">
            <header>
              <h2>Built for Dune</h2>
            </header>
            <p>
              Blog posts, search, archives, and inner pages with the Big Picture scroll-driven shell.
              Explore the <a href="/blog">blog</a>, <a href="/search">search</a>, or{" "}
              <a href="/archives">archives</a>.
            </p>
          </div>
          <a href="#work" class="button style2 down anchored">Next</a>
        </section>

        <section id="work" class="main style3 primary">
          <div class="content">
            <header>
              <h2>Gallery</h2>
              <p>Sample imagery from the upstream Big Picture template.</p>
            </header>
            <div class="gallery">
              {[1, 2, 3, 4, 5, 6].map((n, i) => (
                <article class={i % 2 === 0 ? "from-left" : "from-right"} key={n}>
                  <span class="image fit">
                    <img src={img(`thumbs/0${n}.jpg`)} alt="" />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" class="main style3 secondary">
          <div class="content">
            <header>
              <h2>Explore</h2>
              <p>Start with the blog or browse the about page for more on this demo site.</p>
            </header>
            <ul class="actions special">
              <li><a href="/blog" class="button">Read the Blog</a></li>
              <li><a href="/about" class="button">About</a></li>
            </ul>
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <header>
        <h2>{page.frontmatter.title}</h2>
        {subtitle && <p>{String(subtitle)}</p>}
      </header>
      {cover && (
        <span class="image fit">
          <img src={cover} alt="" />
        </span>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}

function showCredit(_name: string) {
  return null;
}
