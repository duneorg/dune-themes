/** @jsxImportSource preact */
/**
 * Sidebar live search — port of _partials/docs/search.html + assets/search.js
 * UX, backed by Dune's /api/search instead of a client-side Fuse.js index.
 */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

interface Props {
  placeholder: string;
}

export default function BookSearch({ placeholder }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ route: string; title: string }>>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const id = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}&limit=10`)
        .then((r) => r.json())
        .then((data) => setResults(data.items ?? []))
        .catch(() => setResults([]));
    }, 120);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <div class="book-search">
      <input
        id="book-search-input"
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        maxlength={64}
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
      <div class="book-search-spinner hidden"></div>
      <ul id="book-search-results">
        {results.map((r) => (
          <li key={r.route}>
            <a href={r.route}>{r.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
