/** @jsxImportSource preact */
/** Port of _shortcodes/figure.html. */
import { h } from "preact";
import { safeHref } from "../../utils/safe-url.ts";

export default function Figure(
  { src, alt, caption, title, attr, attrlink, link, target, rel, width, height, align, class: cls }: any,
) {
  const classes = [align === "center" ? "align-center" : "", cls ?? ""].join(" ").trim();
  const img = (
    <img
      loading="lazy"
      src={align === "center" ? `${src}#center` : src}
      alt={alt ?? caption}
      width={width}
      height={height}
    />
  );
  return (
    <figure class={classes || undefined}>
      {link ? <a href={safeHref(link)} target={target} rel={rel}>{img}</a> : img}
      {(title || caption || attr) && (
        <figcaption>
          {title}
          {(caption || attr) && (
            <p>
              {caption}
              {attrlink ? <a href={safeHref(attrlink)}>{attr}</a> : attr}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
