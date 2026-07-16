/** @jsxImportSource preact */
/** Port of layouts/search.html + assets/js/fastsearch.js. Upstream uses a
 * client-side Fuse.js index built from index.json; Dune has a server-side
 * search engine, so the same live-results UX (debounced input, ↑/↓ key
 * navigation) is backed by /api/search instead. Also renders server-side
 * results when the engine provides searchQuery/searchResults. */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import { SearchIcon } from "../components/icons.tsx";

export default function SearchTemplate(props: any) {
  const { page, children, Layout, searchQuery, searchResults, t, site } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const tr = t ?? ((k: string) => k);
  const fm = page?.frontmatter ?? {};
  const title = fm.title ?? tr("search.title");
  // Multisite path_prefix routing: root-relative hrefs rendered server-side
  // get basePath injected by Dune's response middleware, but this template's
  // own inline live-search JS builds hrefs/fetch URLs client-side after that
  // middleware has already run — bake basePath in here too.
  const basePath = site?.basePath ?? "";

  return (
    <LayoutComponent {...props} bodyClass="list">
      <header class="page-header">
        <h1>
          {title}&nbsp;<SearchIcon />
        </h1>
        {(fm.metadata?.description ?? fm.description) && (
          <div class="post-description">{fm.metadata?.description ?? fm.description}</div>
        )}
      </header>
      {children}
      <div id="searchbox" class="searchbox">
        <input
          id="searchInput"
          placeholder={fm.placeholder ?? `${title} ↵`}
          aria-label="search"
          type="search"
          autocomplete="off"
          maxlength={64}
          value={searchQuery ?? ""}
        />
        <ul id="searchResults" class="searchResults" aria-label="search results">
          {searchQuery && (searchResults ?? []).map((r: any) => (
            <li class="post-entry" key={r.route}>
              <header class="entry-header">{r.title}&nbsp;»</header>
              <a href={r.route} aria-label={r.title}></a>
            </li>
          ))}
        </ul>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
    (function () {
        const BASE = ${JSON.stringify(basePath)};
        const resList = document.getElementById('searchResults');
        const sInput = document.getElementById('searchInput');
        let first, last, current = null;

        function reset() {
            resList.innerHTML = '';
            sInput.focus();
        }

        function activeToggle(ae) {
            document.querySelectorAll('.focus').forEach(el => el.classList.remove('focus'));
            if (ae) { ae.focus(); document.activeElement.parentElement.classList.add('focus'); }
        }

        let timer;
        sInput.addEventListener('input', function () {
            clearTimeout(timer);
            const query = this.value.trim();
            if (!query) { resList.innerHTML = ''; return; }
            timer = setTimeout(() => {
                fetch(BASE + '/api/search?q=' + encodeURIComponent(query) + '&limit=10')
                    .then(res => res.json())
                    .then(data => {
                        const hits = data.items || [];
                        let resultSet = '';
                        for (const item of hits) {
                            resultSet += \`<li class="post-entry"><header class="entry-header">\${esc(item.title)}&nbsp;»</header><a href="\${esc(BASE + item.route)}" aria-label="\${esc(item.title)}"></a></li>\`;
                        }
                        resList.innerHTML = resultSet;
                        first = resList.firstChild;
                        last = resList.lastChild;
                    })
                    .catch(() => {});
            }, 150);
        });

        function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

        document.addEventListener('keydown', function (e) {
            const key = e.key;
            const ae = document.activeElement;
            const inbox = document.getElementById('searchbox').contains(ae);
            if (ae === sInput) {
                const elements = document.getElementsByClassName('focus');
                while (elements.length > 0) elements[0].classList.remove('focus');
            } else if (current) {
                current.classList.remove('focus');
            }
            if (key === 'Escape') {
                reset();
            } else if (!resList.children.length || !inbox) {
                return;
            } else if (key === 'ArrowDown') {
                e.preventDefault();
                if (ae == sInput) {
                    activeToggle(resList.firstChild.lastChild);
                } else if (ae.parentElement != last) {
                    activeToggle(ae.parentElement.nextSibling.lastChild);
                }
            } else if (key === 'ArrowUp') {
                e.preventDefault();
                if (ae.parentElement == first) {
                    activeToggle(sInput);
                } else if (ae != sInput) {
                    activeToggle(ae.parentElement.previousSibling.lastChild);
                }
            } else if (key === 'ArrowRight') {
                ae.click();
            }
        });
    })();
      ` }} />
    </LayoutComponent>
  );
}
