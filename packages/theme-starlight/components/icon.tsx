/** @jsxImportSource preact */
/** Port of user-components/Icon.astro. The scoped style block became the
 * global `svg.sl-icon` rule; size/color are inlined as custom properties. */
import { h } from "preact";
import { Icons } from "./icons.ts";

export default function Icon(
  { name, label, size = "1em", color, class: cls }: {
    name: string;
    label?: string;
    size?: string;
    color?: string;
    class?: string;
  },
) {
  const a11y = label ? { "aria-label": label } : { "aria-hidden": true };
  const style = `--sl-icon-size:${size};${color ? `--sl-icon-color:${color};` : ""}`;
  return (
    <svg
      {...a11y}
      class={cls ? `sl-icon ${cls}` : "sl-icon"}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={style}
      dangerouslySetInnerHTML={{
        __html: (Icons as Record<string, string>)[name] ?? "",
      }}
    />
  );
}
