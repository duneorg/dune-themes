/** @jsxImportSource preact */
/**
 * Sidebar live search — port of `_partials/docs/search.html` + `assets/search.js`
 * UX, backed by Dune's `/api/search` instead of a client-side Fuse.js index.
 *
 * Upstream behaviours preserved:
 * - results capped at 10
 * - `/` and ⌘/Ctrl+K focus the input
 * - section crumb in a `<small>` under each hit (when the API provides one)
 *
 * Dune adaptations:
 * - fetch URL is prefixed with `site.basePath` for path-prefix multisite hosting
 * - starts visible (upstream hides until JS runs; an island only hydrates when
 *   JS is available, so the `hidden` + reveal dance isn't needed)
 */
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface SearchHit {
  route: string;
  title: string;
  excerpt?: string;
  /** Optional section/parent label — shown like upstream's `<small>`. */
  section?: string;
}

interface Props {
  placeholder: string;
  /** `site.basePath` — empty string on a root-hosted site. */
  basePath?: string;
  noResultsLabel?: string;
}

export default function BookSearch({
  placeholder,
  basePath = "",
  noResultsLabel = "No results",
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [pending, setPending] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const input = inputRef.current;
      if (!input) return;

      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        input.focus();
        return;
      }

      if (input === document.activeElement) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (event.key === "/") {
        event.preventDefault();
        input.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setPending(false);
      setSearched(false);
      return;
    }
    setPending(true);
    const id = setTimeout(() => {
      const url =
        `${basePath}/api/search?q=${encodeURIComponent(query)}&limit=10`.replace(
          /([^:]\/)\/+/g,
          "$1",
        );
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          setResults(data.items ?? []);
          setSearched(true);
        })
        .catch(() => {
          setResults([]);
          setSearched(true);
        })
        .finally(() => setPending(false));
    }, 120);
    return () => clearTimeout(id);
  }, [query, basePath]);

  return (
    <div class="book-search">
      <input
        ref={inputRef}
        id="book-search-input"
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        maxlength={64}
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
      <div class={`book-search-spinner${pending ? "" : " hidden"}`}></div>
      <ul id="book-search-results">
        {results.map((r) => (
          <li key={r.route}>
            <a href={`${basePath}${r.route}`}>{r.title}</a>
            {r.section && <small>{r.section}</small>}
          </li>
        ))}
        {searched && !pending && results.length === 0 && (
          <li><span>{noResultsLabel}</span></li>
        )}
      </ul>
    </div>
  );
}
