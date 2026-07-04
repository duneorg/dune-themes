/** JSX typings for the Starlight custom elements used in the markup. */
import "preact";

declare module "preact" {
  // deno-lint-ignore no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "starlight-toc": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "mobile-starlight-toc": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "site-search": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "starlight-menu-button": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "starlight-theme-select": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "starlight-lang-select": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "sl-sidebar-state-persist": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "sl-sidebar-restore": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "starlight-tabs": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "starlight-tabs-restore": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
      "starlight-file-tree": h.JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>;
    }
  }
}
