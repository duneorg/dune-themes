/** @jsxImportSource preact */
import { h } from "preact";
import Head from "./head.tsx";
import Nav from "./nav.tsx";

/**
 * Base layout: semantic header / nav / main / footer with correct metadata,
 * RTL support, dark mode (config toggle + localStorage persistence).
 *
 * Child themes either inherit this as-is (it is resolved through the theme
 * chain via the `Layout` prop) or ship their own `components/layout.tsx`,
 * reusing `head.tsx` / `nav.tsx` via static imports.
 */
export default function Layout(props: any) {
  const { children, site, page, dir, themeConfig, t } = props;
  const tr = t ?? ((k: string) => k);
  const accent = themeConfig?.accent_color ?? "#0969da";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = themeConfig?.footer_text ?? "";

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"} class={defaultDark ? "dark" : ""}>
      <Head
        {...props}
        extra={
          <style dangerouslySetInnerHTML={{ __html: `:root{--accent:${accent}}` }} />
        }
      />
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var s=localStorage.getItem('dune-theme');
          if(s==='dark'||(s===null&&${defaultDark ? "true" : "false"})){document.documentElement.classList.add('dark')}
          else if(s==='light'){document.documentElement.classList.remove('dark')}})();
        ` }} />
        <header class="site-header">
          <a href="/" class="site-title">{site?.title}</a>
          <Nav {...props} />
          <button id="theme-toggle" aria-label={tr("theme.toggle")} title={tr("theme.toggle")}>◐</button>
        </header>
        <main>{children}</main>
        <footer class="site-footer">
          {footerText
            ? <span>{footerText}</span>
            : <span>&copy; {new Date().getFullYear()} {site?.title}</span>}
        </footer>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var b=document.getElementById('theme-toggle');
            if(b)b.addEventListener('click',function(){
              var d=document.documentElement.classList.toggle('dark');
              localStorage.setItem('dune-theme',d?'dark':'light');
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
