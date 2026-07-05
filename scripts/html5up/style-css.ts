/**
 * Generate style.css that imports vendored HTML5 UP assets.
 */

export function styleCss(assets: { main: boolean; noscript: boolean; fontawesome: boolean }): string {
  const imports: string[] = [];
  if (assets.main) imports.push('@import url("./html5up/css/main.css");');
  if (assets.fontawesome) imports.push('@import url("./html5up/css/fontawesome-all.min.css");');
  if (assets.noscript) imports.push('@import url("./html5up/css/noscript.css");');

  return `${imports.join("\n")}

/* Dune content hooks */
.search-form { display: flex; gap: 0.5rem; margin: 1rem 0 1.5rem; flex-wrap: wrap; }
.search-form input[type="search"], .search-form input.text { flex: 1; min-width: 200px; }
.search-results ol { list-style: none; padding: 0; }
.search-results li { padding: 0.75rem 0; border-bottom: 1px solid rgba(0, 0, 0, 0.08); }
.error-page { text-align: center; padding: 2rem 0; }
.pagination { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 2rem; }
`;
}

export const PRELOAD_SCRIPT = `
(function(){
  window.addEventListener('load',function(){
    setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
  });
})();
`.trim();

export function html5UpCreditList(slug: string, name: string, showCredit: string): string {
  return `{${showCredit} && (
          <ul id="copyright">
            <li>&copy; {new Date().getFullYear()} {site?.title ?? "${name}"}.</li>
            <li>Design: <a href="https://html5up.net/${slug}">${name} by HTML5 UP</a></li>
          </ul>
        )}`;
}
