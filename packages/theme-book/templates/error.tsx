/** @jsxImportSource preact */
/** Port of layouts/404.html — standalone page, drifting-words hover effect. */
import { h } from "preact";

const NOT_FOUND_CSS = `
    .not-found {
      height: 100vh;
      width: 100vw;
    }

    .not-found h1 {
      font-size: 10vmin;
      font-weight: lighter;
      cursor: default;
    }

    .not-found h1 span {
      display: inline-block;
      transition: transform .2s ease-out, opacity .2s ease-out;
    }

    .not-found h1:hover span {
      transition-duration: 1s;
      transform: translate(var(--drift-x), var(--drift-y)) rotate(var(--rotate-end));
      opacity: 0;
    }

    .not-found h1:hover span:nth-child(1) {
      --drift-x: -1em;
      --drift-y: 1em;
      --rotate-end: -90deg;
    }

    .not-found h1:hover span:nth-child(2) {
      --drift-x: -1em;
      --drift-y: -2em;
      --rotate-end: 45deg;
    }

    .not-found h1:hover span:nth-child(3) {
      --drift-x: 3em;
      --drift-y: 1em;
      --rotate-end: 120deg;
    }
`;

export default function ErrorTemplate(props: any) {
  const { page, site, dir, themeConfig, t } = props;
  const status = page?.frontmatter?.statusCode ?? 404;
  const bookTheme = (themeConfig?.book_theme as string) ?? "auto";
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const words = status === 404
    ? [tr("Page", "Page"), tr("Not", "Not"), tr("Found", "Found")]
    : [tr("Server", "Server"), tr("Error", "Error"), String(status)];
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/` || "/";

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"} data-book-theme={bookTheme}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <title>{page?.frontmatter?.title ?? `${status}`}</title>
        <link rel="stylesheet" href="/themes/book/static/book.css" />
        <style dangerouslySetInnerHTML={{ __html: NOT_FOUND_CSS }} />
      </head>
      <body class="not-found flex justify-center align-center">
        <main class="text-center">
          <h1>
            {words.map((w, i) => [i > 0 ? " " : "", <span key={`${w}-${i}`}>{w}</span>])}
          </h1>
          <h3>
            <a href={homeHref}>{site?.title}</a>
          </h3>
        </main>
      </body>
    </html>
  );
}
