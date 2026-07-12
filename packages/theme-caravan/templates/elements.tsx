/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import { COLOR_SCHEMES } from "../utils/color-schemes.ts";

/**
 * Style guide — demonstrates every element caravan's stylesheet touches
 * (headings, text formatting, lists, tables, code, color schemes, sidebar
 * states, search) in one place, so a site builder can see what's available
 * without hunting across the real docs pages for examples.
 */
export default function ElementsTemplate(props: any) {
  const { page, children, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  return (
    <LayoutComponent {...props}>
      <h1>{page.frontmatter.title}</h1>
      {children}

      <h2>Headings</h2>
      <h1>Heading one</h1>
      <h2>Heading two</h2>
      <h3>Heading three</h3>
      <h4>Heading four</h4>
      <h5>Heading five</h5>
      <h6>Heading six</h6>

      <h2>Text formatting</h2>
      <p>
        A paragraph with <strong>bold</strong>, <em>italic</em>, <del>strikethrough</del>, and{" "}
        <code>inline code</code>. Links look like <a href="#">this one</a>, and here's a footnote-style
        reference<sup>1</sup> alongside a chemical formula H<sub>2</sub>O.
      </p>
      <blockquote>
        <p>A blockquote — set off with a left border and muted text color.</p>
      </blockquote>

      <h2>Lists</h2>
      <ul>
        <li>Unordered item one</li>
        <li>
          Unordered item two
          <ul>
            <li>Nested item</li>
          </ul>
        </li>
        <li>Unordered item three</li>
      </ul>
      <ol>
        <li>Ordered item one</li>
        <li>Ordered item two</li>
        <li>Ordered item three</li>
      </ol>

      <h2>Code</h2>
      <p>
        Inline: <code>const x = 1;</code>
      </p>
      <pre>
        <code>{`function greet(name) {
  return \`Hello, \${name}!\`;
}`}</code>
      </pre>

      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>color_scheme</td>
            <td>select</td>
            <td>blue</td>
          </tr>
          <tr>
            <td>show_search</td>
            <td>toggle</td>
            <td>true</td>
          </tr>
          <tr>
            <td>footer_text</td>
            <td>text</td>
            <td>""</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Color schemes</h2>
      <p>
        Each <code>color_scheme</code> option pairs a light and dark accent + sidebar tint. These are the
        actual values from <code>utils/color-schemes.ts</code>, not a mockup.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0">
        {Object.entries(COLOR_SCHEMES).map(([id, scheme]) => (
          <div key={id} style="border:1px solid var(--border-color);border-radius:0.25rem;overflow:hidden;width:11rem">
            <div style="display:flex">
              <div
                style={`flex:1;height:3rem;background:${scheme.light.menuBackground}`}
                title={`light menuBackground: ${scheme.light.menuBackground}`}
              />
              <div
                style={`flex:1;height:3rem;background:${scheme.dark.menuBackground}`}
                title={`dark menuBackground: ${scheme.dark.menuBackground}`}
              />
            </div>
            <div style="padding:0.5rem 0.6rem">
              <div style="font-weight:500;font-size:0.875rem">{scheme.label}</div>
              <div style="display:flex;gap:0.4rem;margin-top:0.3rem">
                <span
                  style={`display:inline-block;width:0.9rem;height:0.9rem;border-radius:50%;background:${scheme.light.accent}`}
                  title={`light accent: ${scheme.light.accent}`}
                />
                <span
                  style={`display:inline-block;width:0.9rem;height:0.9rem;border-radius:50%;background:${scheme.dark.accent}`}
                  title={`dark accent: ${scheme.dark.accent}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Sidebar navigation states</h2>
      <p>The three link states rendered by the sidebar (see <code>.book-menu-list</code> in the stylesheet):</p>
      <ul class="book-menu-list" style="max-width:16rem;border:1px solid var(--border-color);border-radius:0.25rem;padding:1rem 1.25rem">
        <li>
          <a href="#">Default state</a>
        </li>
        <li>
          <a href="#" class="in-section">In-section (bold, ancestor of current page)</a>
        </li>
        <li>
          <a href="#" class="active">Active (current page)</a>
        </li>
      </ul>

      <h3>Section expansion — <code>nav_expand</code></h3>
      <p>
        Sections with children render one of two ways, set by the{" "}
        <code>nav_expand</code> config option. Both auto-expand around
        whichever page is currently active — the difference is whether a
        chevron lets visitors toggle a section manually too.
      </p>
      <div style="display:flex;gap:2rem;flex-wrap:wrap;margin:1rem 0">
        <div>
          <p style="margin:0 0 0.5rem;font-size:0.875rem;color:var(--color-secondary)">
            <code>auto</code> (default) — no chevron, no manual toggle
          </p>
          <ul class="book-menu-list" style="max-width:14rem;border:1px solid var(--border-color);border-radius:0.25rem;padding:1rem 1.25rem">
            <li>
              <div class="nav-item-row">
                <a href="#">Guides</a>
              </div>
              <ul class="book-menu-list nested nested-auto-open">
                <li>
                  <div class="nav-item-row"><a href="#" class="active">Theming your site</a></div>
                </li>
                <li>
                  <div class="nav-item-row"><a href="#">Deployment</a></div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <p style="margin:0 0 0.5rem;font-size:0.875rem;color:var(--color-secondary)">
            <code>click</code> — adds a chevron, visitor can also toggle it
          </p>
          <ul class="book-menu-list" style="max-width:14rem;border:1px solid var(--border-color);border-radius:0.25rem;padding:1rem 1.25rem">
            <li>
              <div class="nav-item-row">
                <a href="#">Guides</a>
                <span class="nav-expand-toggle" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(90deg)">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
              <ul class="book-menu-list nested nested-auto-open">
                <li>
                  <div class="nav-item-row"><a href="#" class="active">Theming your site</a></div>
                </li>
                <li>
                  <div class="nav-item-row"><a href="#">Deployment</a></div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <h2>Section listing</h2>
      <p>What a section page's child listing looks like (see <code>templates/section.tsx</code>):</p>
      <ul class="book-section-list">
        <li>
          <a href="#">Child page one</a>
          <p>Optional description shown from the child page's frontmatter.</p>
        </li>
        <li>
          <a href="#">Child page two</a>
        </li>
      </ul>

      <h2>Search</h2>
      <p>The sidebar's live search dropdown (see <code>.book-search-results</code>):</p>
      <div class="book-search" style="max-width:20rem;position:relative">
        <input type="text" value="config" readonly />
        <ul class="book-search-results" style="position:static;box-shadow:none;margin-top:0.5rem">
          <li>
            <a href="#">Configuration</a>
          </li>
          <li>
            <a href="#">Theme config schema</a>
          </li>
        </ul>
      </div>
    </LayoutComponent>
  );
}
