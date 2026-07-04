/** @jsxImportSource preact */
/** Port of user-components/LinkButton.astro. */
import { h } from "preact";
import Icon from "./icon.tsx";

export default function LinkButton(
  { href, icon, iconPlacement = "end", variant = "primary", class: cls, children, ...attrs }: {
    href: string;
    icon?: string;
    iconPlacement?: "start" | "end";
    variant?: "primary" | "secondary" | "minimal";
    class?: string;
    children?: unknown;
    [key: string]: unknown;
  },
) {
  const classes = ["sl-link-button", "not-content", variant, cls].filter(Boolean).join(" ");
  return (
    <a href={href} class={classes} {...attrs}>
      {icon && iconPlacement === "start" && <Icon name={icon} size="1.5rem" />}
      {children}
      {icon && iconPlacement === "end" && <Icon name={icon} size="1.5rem" />}
    </a>
  );
}
